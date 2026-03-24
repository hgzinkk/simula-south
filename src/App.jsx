import { useMemo, useState } from "react";

function BarRow({ label, value, color }) {
  return (
    <div>
      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
        <span>{label}</span>
        <span>{value}/5</span>
      </div>
      <div className="grid grid-cols-5 gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`h-2 rounded-full ${i < value ? color : "bg-slate-200"}`}
          />
        ))}
      </div>
    </div>
  );
}

function ImpactCard({ title, value }) {
  return (
    <div className="rounded-2xl p-4 border border-slate-200 bg-slate-50">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-xl font-bold mt-2">{value}</p>
    </div>
  );
}

export default function App() {
  const saldoInicial = 1621;

  const produtosBase = [
    { id: 1, nome: "Papel higiênico Cotton (11 leve 12)", categoria: "Higiene e Limpeza", valor: 14.99 },
    { id: 2, nome: "Amaciante Ypê", categoria: "Higiene e Limpeza", valor: 8.99 },
    { id: 3, nome: "Detergente Ypê", categoria: "Higiene e Limpeza", valor: 2.59 },
    { id: 4, nome: "Sabonete Palmolive 68g", categoria: "Higiene e Limpeza", valor: 2.49 },
    { id: 5, nome: "Desodorante Bozzano 150ml", categoria: "Higiene e Limpeza", valor: 11.99 },
    { id: 6, nome: "Inseticida Raid 248g", categoria: "Higiene e Limpeza", valor: 12.99 },

    { id: 7, nome: "Arroz 5kg", categoria: "Alimentos básicos", valor: 24.99 },
    { id: 8, nome: "Feijão preto 1kg", categoria: "Alimentos básicos", valor: 6.99 },
    { id: 9, nome: "Açúcar refinado União", categoria: "Alimentos básicos", valor: 5.49 },
    { id: 10, nome: "Café 500g Pilão", categoria: "Alimentos básicos", valor: 30.99 },
    { id: 11, nome: "Leite integral 1L Italac", categoria: "Alimentos básicos", valor: 4.79 },
    { id: 12, nome: "Óleo Soya", categoria: "Alimentos básicos", valor: 7.49 },
    { id: 13, nome: "Farinha de trigo Granfino", categoria: "Alimentos básicos", valor: 5.49 },
    { id: 14, nome: "Macarrão ninho Fortaleza", categoria: "Alimentos básicos", valor: 5.99 },

    { id: 15, nome: "Alcatra peça (kg)", categoria: "Hortifruti e carnes", valor: 32.99 },
    { id: 16, nome: "Tomate (kg)", categoria: "Hortifruti e carnes", valor: 5.99 },
    { id: 17, nome: "Alface (unidade)", categoria: "Hortifruti e carnes", valor: 2.99 },
    { id: 18, nome: "Frango inteiro (kg)", categoria: "Hortifruti e carnes", valor: 11.99 },
    { id: 19, nome: "Batata (kg)", categoria: "Hortifruti e carnes", valor: 4.49 },
    { id: 20, nome: "Banana (kg)", categoria: "Hortifruti e carnes", valor: 3.99 },

    { id: 21, nome: "Filtro de café", categoria: "Outros", valor: 4.99 },

    { id: 22, nome: "Chocolate", categoria: "Não essenciais", valor: 8.99 },
    { id: 23, nome: "Refrigerante 2L", categoria: "Não essenciais", valor: 9.99 },
    { id: 24, nome: "Biscoito recheado", categoria: "Não essenciais", valor: 4.99 },
    { id: 25, nome: "Salgadinho", categoria: "Não essenciais", valor: 7.49 },
    { id: 26, nome: "Sorvete pote", categoria: "Não essenciais", valor: 16.99 },
    { id: 27, nome: "Suco de caixinha", categoria: "Não essenciais", valor: 6.49 },
  ];

  const contasBase = [
    { id: 1, nome: "Aluguel" },
    { id: 2, nome: "Energia" },
    { id: 3, nome: "Transporte" },
    { id: 4, nome: "Internet" },
    { id: 5, nome: "Água" },
  ];

  const investimentos = {
    reserva: { label: "Reserva de emergência", taxa: 0.008, risco: "Baixo" },
    poupanca: { label: "Poupança", taxa: 0.006, risco: "Baixo" },
    tesouro: { label: "Tesouro Selic", taxa: 0.009, risco: "Baixo" },
    cdb: { label: "CDB", taxa: 0.011, risco: "Baixo" },
    lci: { label: "LCI/LCA", taxa: 0.01, risco: "Baixo" },
    fii: { label: "Fundos Imobiliários", taxa: 0.015, risco: "Médio" },
    etf: { label: "ETF", taxa: 0.018, risco: "Médio" },
    acoes: { label: "Ações", taxa: 0.025, risco: "Médio/Alto" },
    cripto: { label: "Criptoativos", taxa: 0.04, risco: "Alto" },
  };

  const [valoresContas, setValoresContas] = useState({});
  const [contasSelecionadas, setContasSelecionadas] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [investimento, setInvestimento] = useState("");
  const [tipoInvestimento, setTipoInvestimento] = useState("reserva");
  const [rodadaConfirmada, setRodadaConfirmada] = useState(false);
  const [carregandoAnalise, setCarregandoAnalise] = useState(false);

  const investimentoInfo = investimentos[tipoInvestimento];

  function atualizarValorConta(id, valor) {
    setRodadaConfirmada(false);
    setValoresContas((prev) => ({ ...prev, [id]: valor === "" ? "" : valor }));
  }

  function alternarConta(contaId) {
    setRodadaConfirmada(false);
    setContasSelecionadas((prev) =>
      prev.includes(contaId)
        ? prev.filter((id) => id !== contaId)
        : [...prev, contaId]
    );
  }

  function adicionarProduto(produto) {
    setRodadaConfirmada(false);
    setCarrinho((prev) => {
      const existente = prev.find((item) => item.id === produto.id);
      if (existente) {
        return prev.map((item) =>
          item.id === produto.id
            ? {
                ...item,
                quantidade: item.quantidade + 1,
                subtotal: (item.quantidade + 1) * item.valor,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          ...produto,
          quantidade: 1,
          subtotal: produto.valor,
        },
      ];
    });
  }

  function aumentarQuantidade(produtoId) {
    setRodadaConfirmada(false);
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === produtoId
          ? {
              ...item,
              quantidade: item.quantidade + 1,
              subtotal: (item.quantidade + 1) * item.valor,
            }
          : item
      )
    );
  }

  function diminuirQuantidade(produtoId) {
    setRodadaConfirmada(false);
    setCarrinho((prev) =>
      prev
        .map((item) =>
          item.id === produtoId
            ? {
                ...item,
                quantidade: item.quantidade - 1,
                subtotal: (item.quantidade - 1) * item.valor,
              }
            : item
        )
        .filter((item) => item.quantidade > 0)
    );
  }

  function removerProduto(produtoId) {
    setRodadaConfirmada(false);
    setCarrinho((prev) => prev.filter((item) => item.id !== produtoId));
  }

  function confirmarRodada() {
    setRodadaConfirmada(false);
    setCarregandoAnalise(true);
    setTimeout(() => {
      setCarregandoAnalise(false);
      setRodadaConfirmada(true);
    }, 1200);
  }

  function reiniciar() {
    setValoresContas({});
    setContasSelecionadas([]);
    setCarrinho([]);
    setInvestimento("");
    setTipoInvestimento("reserva");
    setRodadaConfirmada(false);
    setCarregandoAnalise(false);
  }

  const gastoMercado = carrinho.reduce((total, item) => total + item.subtotal, 0);

  const gastoEssencial = carrinho
    .filter(
      (item) =>
        item.categoria === "Alimentos básicos" ||
        item.categoria === "Hortifruti e carnes"
    )
    .reduce((total, item) => total + item.subtotal, 0);

  const gastoSuperfluo = carrinho
    .filter(
      (item) =>
        item.categoria === "Higiene e Limpeza" ||
        item.categoria === "Outros" ||
        item.categoria === "Não essenciais"
    )
    .reduce((total, item) => total + item.subtotal, 0);

  const gastoNaoEssencial = carrinho
    .filter((item) => item.categoria === "Não essenciais")
    .reduce((total, item) => total + item.subtotal, 0);

  const totalContas = contasSelecionadas.reduce((total, contaId) => {
    return total + (Number(valoresContas[contaId]) || 0);
  }, 0);

  const saldoAntesInvestimento = saldoInicial - gastoMercado - totalContas;

  const investimentoNumerico = Math.min(
    Math.max(Number(investimento) || 0, 0),
    Math.max(saldoAntesInvestimento, 0)
  );

  const percentualInvestido = saldoInicial > 0 ? investimentoNumerico / saldoInicial : 0;

  const riscoPerda = useMemo(() => {
    if (!rodadaConfirmada) return 0;
    if (tipoInvestimento !== "cripto" && tipoInvestimento !== "acoes") return 0;

    const baseNumero =
      Math.round((gastoMercado + totalContas + investimentoNumerico) * 100) % 100;
    const houvePerda = baseNumero < 12;

    if (!houvePerda) return 0;

    const percentualPerda = tipoInvestimento === "cripto" ? 0.35 : 0.2;
    return Number((investimentoNumerico * percentualPerda).toFixed(2));
  }, [rodadaConfirmada, tipoInvestimento, gastoMercado, totalContas, investimentoNumerico]);

  const rendimento = useMemo(() => {
    if (!rodadaConfirmada) return 0;
    const bruto = investimentoNumerico * investimentoInfo.taxa;
    return Number((bruto - riscoPerda).toFixed(2));
  }, [rodadaConfirmada, investimentoNumerico, investimentoInfo.taxa, riscoPerda]);

  const saldoAtual = saldoInicial - gastoMercado - totalContas - investimentoNumerico;
  const patrimonioFinal = saldoAtual + investimentoNumerico + rendimento;

  const resultadoMensal = {
    patrimonio: Number((saldoAtual + investimentoNumerico + rendimento).toFixed(2)),
    rendimento: Number(rendimento.toFixed(2)),
  };

  const resultadoAnual = useMemo(() => {
    const patrimonioAno =
      saldoAtual + investimentoNumerico * Math.pow(1 + investimentoInfo.taxa, 12) - riscoPerda;
    const rendimentoAno = patrimonioAno - saldoAtual - investimentoNumerico;

    return {
      patrimonio: Number(patrimonioAno.toFixed(2)),
      rendimento: Number(rendimentoAno.toFixed(2)),
      sobraProjetada: Number((saldoAtual * 12).toFixed(2)),
    };
  }, [saldoAtual, investimentoNumerico, investimentoInfo.taxa, riscoPerda]);

  const notaGeral = useMemo(() => {
    if (!rodadaConfirmada) return 0;

    let nota = 10;

    if (gastoNaoEssencial >= saldoInicial * 0.02) nota -= 2;
    if (gastoNaoEssencial >= saldoInicial * 0.05) nota -= 1;
    if (gastoSuperfluo > gastoEssencial && gastoSuperfluo > 0) nota -= 2;
    if (totalContas === 0) nota -= 2;
    if (investimentoNumerico === 0) nota -= 2;
    if (riscoPerda > 0) nota -= 2;
    if (saldoAtual < saldoInicial * 0.05) nota -= 2;
    if (saldoAtual < 0) nota -= 3;

    if ((tipoInvestimento === "acoes" || tipoInvestimento === "cripto") && percentualInvestido >= 0.2) {
      nota -= 2;
    }
    if ((tipoInvestimento === "acoes" || tipoInvestimento === "cripto") && percentualInvestido >= 0.35) {
      nota -= 2;
    }
    if (tipoInvestimento === "cripto" && percentualInvestido >= 0.5) {
      nota -= 2;
    }

    if (
      investimentoNumerico >= saldoInicial * 0.1 &&
      tipoInvestimento !== "acoes" &&
      tipoInvestimento !== "cripto"
    ) {
      nota += 1;
    }

    if (nota < 1) nota = 1;
    if (nota > 10) nota = 10;
    return nota;
  }, [
    rodadaConfirmada,
    gastoNaoEssencial,
    gastoSuperfluo,
    gastoEssencial,
    totalContas,
    investimentoNumerico,
    riscoPerda,
    saldoAtual,
    tipoInvestimento,
    percentualInvestido,
    saldoInicial,
  ]);

  const faixaNota = useMemo(() => {
    if (!rodadaConfirmada) {
      return {
        cor: "bg-slate-100 text-slate-400 border-slate-300",
        label: "Aguardando análise",
      };
    }
    if (notaGeral <= 4) return { cor: "bg-red-100 text-red-700 border-red-200", label: "Baixa" };
    if (notaGeral <= 7) return { cor: "bg-amber-100 text-amber-700 border-amber-200", label: "Média" };
    if (notaGeral <= 9) return { cor: "bg-emerald-100 text-emerald-700 border-emerald-200", label: "Boa" };
    return { cor: "bg-sky-100 text-sky-700 border-sky-200", label: "Excelente" };
  }, [rodadaConfirmada, notaGeral]);

  const notificacoes = useMemo(() => {
    if (!rodadaConfirmada) {
      return [
        "Confirme a rodada para ver o resumo do mês e a projeção do ano inteiro.",
        "Enquanto isso, os indicadores ficam bloqueados e aparecem em cinza.",
      ];
    }

    const lista = [
      `Neste mês, seu patrimônio estimado ficou em R$ ${resultadoMensal.patrimonio.toFixed(2)}.`,
      `Se você repetir esse padrão por 12 meses, sua sobra acumulada pode chegar a R$ ${resultadoAnual.sobraProjetada.toFixed(2)}.`,
      `Mantendo o investimento atual, a projeção anual de patrimônio vai para R$ ${resultadoAnual.patrimonio.toFixed(2)}.`,
    ];

    if (riscoPerda > 0) {
      lista.push(`Nesta simulação, o investimento de risco sofreu uma perda de R$ ${riscoPerda.toFixed(2)}.`);
    }

    return lista;
  }, [rodadaConfirmada, resultadoMensal.patrimonio, resultadoAnual.sobraProjetada, resultadoAnual.patrimonio, riscoPerda]);

  const alertas = useMemo(() => {
    if (!rodadaConfirmada) {
      return [
        "Monte o carrinho, marque as contas e defina o investimento.",
        "Os alertas aparecem depois que você confirmar a rodada.",
      ];
    }

    const lista = [];
    if (gastoNaoEssencial > 0) {
      lista.push(
        `Você gastou R$ ${gastoNaoEssencial.toFixed(2)}, o que representa ${((gastoNaoEssencial / saldoInicial) * 100).toFixed(1)}% do salário mínimo.`
      );
    }
    if (gastoSuperfluo > gastoEssencial && gastoSuperfluo > 0) {
      lista.push("Você gastou mais com itens não essenciais do que com itens básicos.");
    }
    if (totalContas === 0) lista.push("Nenhuma conta foi marcada. Isso deixa a simulação menos realista.");
    if (investimentoNumerico === 0) lista.push("Você não investiu nada nesta rodada.");
    if ((tipoInvestimento === "acoes" || tipoInvestimento === "cripto") && percentualInvestido >= 0.2) {
      lista.push("Você colocou uma parte alta da renda em investimento de risco. Isso derruba a segurança do planejamento.");
    }
    if (riscoPerda > 0) {
      lista.push(`Nesta simulação, seu investimento de maior risco sofreu uma perda de R$ ${riscoPerda.toFixed(2)}.`);
    }
    if (saldoAtual < saldoInicial * 0.05) {
      lista.push("Seu caixa final ficou muito baixo em relação ao salário mínimo.");
    }
    if (lista.length === 0) {
      lista.push("Sua rodada ficou equilibrada entre consumo, contas e investimento.");
    }
    return lista;
  }, [
    rodadaConfirmada,
    gastoNaoEssencial,
    gastoSuperfluo,
    gastoEssencial,
    totalContas,
    investimentoNumerico,
    riscoPerda,
    saldoAtual,
    saldoInicial,
    percentualInvestido,
    tipoInvestimento,
  ]);

  const categorias = useMemo(() => {
    const ordem = [
      "Alimentos básicos",
      "Hortifruti e carnes",
      "Higiene e Limpeza",
      "Não essenciais",
      "Outros",
    ];
    const agrupado = {};
    ordem.forEach((categoria) => {
      agrupado[categoria] = produtosBase.filter((p) => p.categoria === categoria);
    });
    return agrupado;
  }, []);

  const cardBloqueado = !rodadaConfirmada;

  function riskBars(kind) {
    const map = {
      reserva: { seguranca: 5, retorno: 2, perda: 1 },
      poupanca: { seguranca: 5, retorno: 2, perda: 1 },
      tesouro: { seguranca: 5, retorno: 2, perda: 1 },
      cdb: { seguranca: 4, retorno: 2, perda: 1 },
      lci: { seguranca: 4, retorno: 2, perda: 1 },
      fii: { seguranca: 3, retorno: 3, perda: 2 },
      etf: { seguranca: 3, retorno: 3, perda: 2 },
      acoes: { seguranca: 2, retorno: 4, perda: 4 },
      cripto: { seguranca: 1, retorno: 5, perda: 5 },
    };
    return map[kind] || map.reserva;
  }

  const barras = riskBars(tipoInvestimento);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto space-y-5">
        <header className="bg-white rounded-3xl shadow-sm border border-slate-200 p-5">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="text-center lg:text-left w-full">
              <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">
                Protótipo interativo
              </p>
              <h1 className="text-3xl md:text-4xl font-bold mt-2">Simula-South</h1>
              <p className="text-slate-600 mt-2 max-w-3xl mx-auto lg:mx-0">
                Simulação baseada no salário mínimo para mostrar como decisões do mês pesam no orçamento de uma família.
              </p>
            </div>

            <div className="flex gap-3 flex-wrap justify-center lg:justify-end">
              <button
                onClick={confirmarRodada}
                disabled={carregandoAnalise}
                className={`rounded-2xl px-4 py-3 font-medium transition ${
                  carregandoAnalise
                    ? "bg-slate-400 text-white cursor-not-allowed"
                    : "bg-slate-900 text-white hover:opacity-90"
                }`}
              >
                {carregandoAnalise ? "Calculando..." : "Confirmar rodada"}
              </button>

              <button
                onClick={reiniciar}
                className="rounded-2xl bg-slate-100 text-slate-900 px-4 py-3 font-medium hover:bg-slate-200 transition"
              >
                Reiniciar
              </button>
            </div>
          </div>
        </header>

        <section className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {[
            ["Salário mínimo", saldoInicial],
            ["Mercado", gastoMercado],
            ["Não essenciais", gastoNaoEssencial],
            ["Contas", totalContas],
            ["Investimento", investimentoNumerico],
            ["Saldo final", saldoAtual],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white border border-slate-200 rounded-2xl p-3 text-center shadow-sm"
            >
              <p className="text-xs text-slate-500">{label}</p>
              <p className="font-bold">R$ {Number(value).toFixed(2)}</p>
            </div>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">1. Mercado</h2>
            <div className="space-y-4 max-h-[620px] overflow-auto pr-1">
              {Object.entries(categorias).map(([categoria, produtos]) => (
                <div key={categoria}>
                  <h3 className="font-semibold mb-2">{categoria}</h3>
                  <div className="grid md:grid-cols-2 gap-2">
                    {produtos.map((produto) => (
                      <div
                        key={produto.id}
                        className="flex justify-between items-center bg-slate-50 p-2 rounded-xl gap-2"
                      >
                        <div className="text-sm min-w-0">
                          <p className="leading-tight">{produto.nome}</p>
                          <p className="text-xs text-slate-500">
                            R$ {produto.valor.toFixed(2)}
                          </p>
                        </div>
                        <button
                          onClick={() => adicionarProduto(produto)}
                          className="bg-slate-900 text-white px-3 py-1.5 rounded-xl text-sm"
                        >
                          +
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-xl font-semibold">Carrinho</h2>
              <div className="rounded-2xl bg-slate-900 text-white px-4 py-3 text-center min-w-[150px]">
                <p className="text-xs text-slate-300">Total do carrinho</p>
                <p className="text-xl font-bold mt-1">R$ {gastoMercado.toFixed(2)}</p>
              </div>
            </div>

            <div className="space-y-3 max-h-[620px] overflow-auto pr-1">
              {carrinho.length === 0 ? (
                <p className="text-slate-500 text-sm">Nada no carrinho</p>
              ) : (
                carrinho.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-slate-50 p-3 rounded-xl gap-3"
                  >
                    <div className="text-sm min-w-0">
                      <p>{item.nome}</p>
                      <p className="text-xs text-slate-500">
                        {item.quantidade}x • R$ {item.subtotal.toFixed(2)}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => diminuirQuantidade(item.id)}
                        className="rounded-lg bg-slate-200 px-2 py-1"
                      >
                        -
                      </button>
                      <span className="min-w-[20px] text-center">{item.quantidade}</span>
                      <button
                        onClick={() => aumentarQuantidade(item.id)}
                        className="rounded-lg bg-slate-900 text-white px-2 py-1"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removerProduto(item.id)}
                        className="rounded-lg bg-red-100 text-red-700 px-2 py-1 text-xs"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-5">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">2. Contas</h2>
            <div className="space-y-3">
              {contasBase.map((conta) => (
                <div
                  key={conta.id}
                  className="flex justify-between items-center gap-3 bg-slate-50 p-3 rounded-xl"
                >
                  <span>{conta.nome}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={valoresContas[conta.id] || ""}
                      onChange={(e) => atualizarValorConta(conta.id, e.target.value)}
                      className="border rounded-lg px-2 py-1 w-24"
                      placeholder="0,00"
                    />
                    <button
                      onClick={() => alternarConta(conta.id)}
                      className={`rounded-lg px-3 py-1 text-sm ${
                        contasSelecionadas.includes(conta.id)
                          ? "bg-emerald-700 text-white"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      {contasSelecionadas.includes(conta.id) ? "OK" : "Marcar"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">3. Investimento</h2>

            <select
              value={tipoInvestimento}
              onChange={(e) => {
                setRodadaConfirmada(false);
                setTipoInvestimento(e.target.value);
              }}
              className="w-full mb-3 p-3 border rounded-2xl"
            >
              <option value="reserva">Reserva de emergência</option>
              <option value="poupanca">Poupança</option>
              <option value="tesouro">Tesouro Selic</option>
              <option value="cdb">CDB</option>
              <option value="lci">LCI/LCA</option>
              <option value="fii">Fundos Imobiliários</option>
              <option value="etf">ETF</option>
              <option value="acoes">Ações</option>
              <option value="cripto">Criptoativos</option>
            </select>

            <input
              type="number"
              placeholder="Valor para investir"
              value={investimento}
              onChange={(e) => {
                setRodadaConfirmada(false);
                setInvestimento(e.target.value);
              }}
              className="w-full p-3 border rounded-2xl"
            />

            <p className="text-xs text-slate-500 mt-2">
              Máximo disponível: R$ {Math.max(saldoAntesInvestimento, 0).toFixed(2)}
            </p>

            <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium">{investimentoInfo.label}</p>
                  <p className="text-xs text-slate-500">Risco: {investimentoInfo.risco}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-slate-500">Retorno mensal</p>
                  <p className="font-bold">{(investimentoInfo.taxa * 100).toFixed(1)}%</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <BarRow label="Segurança" value={barras.seguranca} color="bg-emerald-500" />
                <BarRow label="Potencial de retorno" value={barras.retorno} color="bg-sky-500" />
                <BarRow label="Chance de perda" value={barras.perda} color="bg-amber-500" />
              </div>

              {(tipoInvestimento === "cripto" || tipoInvestimento === "acoes") && (
                <p className="text-xs text-amber-700 mt-3">
                  Atenção: essa opção pode ter perda considerável em alguns cenários.
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-4 md:grid-cols-2 gap-4">
          {[
            ["Patrimônio do mês", rodadaConfirmada ? `R$ ${resultadoMensal.patrimonio.toFixed(2)}` : "-"],
            ["Rendimento do mês", rodadaConfirmada ? `R$ ${resultadoMensal.rendimento.toFixed(2)}` : "-"],
            ["Patrimônio do ano", rodadaConfirmada ? `R$ ${resultadoAnual.patrimonio.toFixed(2)}` : "-"],
            ["Rendimento do ano", rodadaConfirmada ? `R$ ${resultadoAnual.rendimento.toFixed(2)}` : "-"],
          ].map(([label, value]) => (
            <div
              key={label}
              className={`rounded-3xl p-5 shadow-sm border ${
                cardBloqueado
                  ? "bg-slate-100 border-slate-300 text-slate-400"
                  : "bg-white border-slate-200"
              }`}
            >
              <p className="text-sm">{label}</p>
              <p className="text-2xl font-bold mt-2">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid lg:grid-cols-2 gap-5">
          <div className={`rounded-3xl p-5 shadow-sm border ${faixaNota.cor}`}>
            <div className="flex items-center justify-between gap-4 mb-4">
              <h2 className="text-xl font-semibold">Resumo e nota geral</h2>
              <div className="text-right">
                <p className="text-xs opacity-80">Nota</p>
                <p className="text-2xl font-bold">{rodadaConfirmada ? `${notaGeral}/10` : "-"}</p>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Patrimônio final</span>
                <strong>{rodadaConfirmada ? `R$ ${patrimonioFinal.toFixed(2)}` : "-"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Rendimento</span>
                <strong>{rodadaConfirmada ? `R$ ${rendimento.toFixed(2)}` : "-"}</strong>
              </div>
              <div className="flex justify-between">
                <span>Classificação</span>
                <strong>{faixaNota.label}</strong>
              </div>
            </div>
          </div>

          <div
            className={`rounded-3xl p-5 shadow-sm border ${
              cardBloqueado
                ? "bg-slate-100 border-slate-300 text-slate-400"
                : "bg-white border-slate-200"
            }`}
          >
            <h2 className="text-xl font-semibold mb-4">Comparação visual de impacto</h2>

            <div className="grid grid-cols-2 gap-3">
              <ImpactCard
                title="Cenário atual"
                value={rodadaConfirmada ? `R$ ${patrimonioFinal.toFixed(2)}` : "-"}
              />
              <ImpactCard
                title="Sem não essenciais"
                value={rodadaConfirmada ? `R$ ${(patrimonioFinal + gastoNaoEssencial).toFixed(2)}` : "-"}
              />
              <ImpactCard
                title="Impacto dos não essenciais"
                value={rodadaConfirmada ? `- R$ ${gastoNaoEssencial.toFixed(2)}` : "-"}
              />
              <ImpactCard
                title="Disciplina extra"
                value={
                  rodadaConfirmada
                    ? `R$ ${(patrimonioFinal + (saldoAtual >= 100 ? saldoAtual * 0.05 : 0)).toFixed(2)}`
                    : "-"
                }
              />
            </div>
          </div>
        </section>

        <section className="grid lg:grid-cols-2 gap-5">
          <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-amber-900">4. Alertas inteligentes</h2>
            <div className="mt-4 space-y-3">
              {alertas.map((alerta) => (
                <div
                  key={alerta}
                  className="bg-white/70 border border-amber-100 rounded-2xl p-4 text-amber-900 text-sm"
                >
                  {alerta}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-sky-50 border border-sky-200 rounded-3xl p-5 shadow-sm">
            <h2 className="text-xl font-semibold text-sky-900">5. Notificações financeiras</h2>
            <div className="mt-4 space-y-3">
              {notificacoes.map((item) => (
                <div
                  key={item}
                  className="bg-white/80 border border-sky-100 rounded-2xl p-4 text-sky-950 text-sm"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
