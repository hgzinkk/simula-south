import React, { useMemo, useState } from "react";

const SALARIO_BASE = 1621;

const categoriasMercado = [
  {
    id: "basicos",
    nome: "Alimentos básicos",
    icone: "🍚",
    tipo: "essencial",
    itens: [
      { nome: "Arroz 5kg", preco: 24.99 },
      { nome: "Feijão preto 1kg", preco: 6.99 },
      { nome: "Feijão carioca 1kg", preco: 7.49 },
      { nome: "Açúcar refinado União", preco: 5.49 },
      { nome: "Café 500g Pilão", preco: 30.99 },
      { nome: "Macarrão ninho Fortaleza", preco: 5.99 },
      { nome: "Macarrão espaguete 500g", preco: 4.49 },
      { nome: "Óleo de soja 900ml", preco: 7.99 },
      { nome: "Farinha de trigo 1kg", preco: 5.49 },
      { nome: "Sal 1kg", preco: 2.49 },
      { nome: "Molho de tomate", preco: 2.99 },
      { nome: "Extrato de tomate", preco: 3.49 },
      { nome: "Alho 100g", preco: 3.49 },
      { nome: "Cebola (kg)", preco: 4.99 },
      { nome: "Fubá 1kg", preco: 3.99 },
      { nome: "Flocão de milho (cuscuz)", preco: 2.99 },
      { nome: "Miojo", preco: 2.49 },
      { nome: "Aveia 500g", preco: 5.99 },
      { nome: "Biscoito cream cracker", preco: 4.49 },
      { nome: "Pão francês (kg)", preco: 12.99 },
      { nome: "Pão de forma", preco: 7.49 },
    ],
  },
  {
    id: "laticinios",
    nome: "Laticínios e frios",
    icone: "🧀",
    tipo: "essencial",
    itens: [
      { nome: "Leite integral 1L", preco: 4.79 },
      { nome: "Leite desnatado 1L", preco: 5.29 },
      { nome: "Iogurte bandeja", preco: 7.99 },
      { nome: "Iogurte natural", preco: 4.99 },
      { nome: "Queijo muçarela 200g", preco: 9.49 },
      { nome: "Queijo prato 200g", preco: 10.49 },
      { nome: "Presunto 200g", preco: 7.99 },
      { nome: "Mortadela 200g", preco: 4.99 },
      { nome: "Requeijão", preco: 8.49 },
      { nome: "Manteiga 200g", preco: 9.99 },
      { nome: "Cream cheese", preco: 8.99 },
      { nome: "Queijo ralado", preco: 6.49 },
    ],
  },
  {
    id: "hortifruti",
    nome: "Hortifruti e legumes",
    icone: "🥕",
    tipo: "essencial",
    itens: [
      { nome: "Tomate (kg)", preco: 5.99 },
      { nome: "Batata inglesa (kg)", preco: 6.49 },
      { nome: "Batata-doce (kg)", preco: 5.99 },
      { nome: "Cenoura (kg)", preco: 3.99 },
      { nome: "Repolho (unidade)", preco: 4.49 },
      { nome: "Abobrinha (kg)", preco: 4.99 },
      { nome: "Chuchu (kg)", preco: 2.99 },
      { nome: "Pimentão (kg)", preco: 7.99 },
      { nome: "Alface (unidade)", preco: 3.49 },
      { nome: "Banana (kg)", preco: 5.49 },
      { nome: "Maçã (kg)", preco: 8.99 },
      { nome: "Laranja (kg)", preco: 4.99 },
    ],
  },
  {
    id: "carnes",
    nome: "Carnes e proteínas",
    icone: "🥩",
    tipo: "essencial",
    itens: [
      { nome: "Carne moída (kg)", preco: 19.99 },
      { nome: "Linguiça (kg)", preco: 14.99 },
      { nome: "Peito de frango (kg)", preco: 17.99 },
      { nome: "Coxa e sobrecoxa (kg)", preco: 13.99 },
      { nome: "Filé de frango (kg)", preco: 21.99 },
      { nome: "Bisteca suína (kg)", preco: 18.99 },
      { nome: "Costela bovina (kg)", preco: 24.99 },
      { nome: "Acém (kg)", preco: 29.99 },
      { nome: "Patinho (kg)", preco: 34.99 },
      { nome: "Alcatra peça (kg)", preco: 32.99 },
      { nome: "Contra filé (kg)", preco: 36.99 },
      { nome: "Salsicha 500g", preco: 8.49 },
      { nome: "Hambúrguer congelado", preco: 12.99 },
      { nome: "Ovos (dúzia)", preco: 9.99 },
      { nome: "Sardinha enlatada", preco: 4.49 },
      { nome: "Atum enlatado", preco: 8.99 },
    ],
  },
  {
    id: "bebidas",
    nome: "Bebidas",
    icone: "🥤",
    tipo: "misto",
    itens: [
      { nome: "Chá (caixa)", preco: 3.49 },
      { nome: "Água mineral 5L", preco: 5.49 },
      { nome: "Café solúvel", preco: 12.99 },
      { nome: "Achocolatado líquido", preco: 4.49, naoEssencial: true },
      { nome: "Refrigerante lata", preco: 3.49, naoEssencial: true },
      { nome: "Refrigerante 2L", preco: 8.99, naoEssencial: true },
      { nome: "Suco em pó", preco: 1.49, naoEssencial: true },
      { nome: "Suco de caixinha 1L", preco: 5.99, naoEssencial: true },
      { nome: "Água de coco", preco: 6.49, naoEssencial: true },
    ],
  },
  {
    id: "higiene",
    nome: "Higiene pessoal",
    icone: "🪥",
    tipo: "essencial",
    itens: [
      { nome: "Creme dental", preco: 3.99 },
      { nome: "Escova de dente", preco: 4.49 },
      { nome: "Shampoo", preco: 9.99 },
      { nome: "Condicionador", preco: 11.99 },
      { nome: "Sabonete", preco: 2.49 },
      { nome: "Papel higiênico 4 rolos", preco: 6.99 },
      { nome: "Desodorante", preco: 8.99 },
      { nome: "Absorvente", preco: 7.49 },
    ],
  },
  {
    id: "limpeza",
    nome: "Limpeza",
    icone: "🧼",
    tipo: "essencial",
    itens: [
      { nome: "Água sanitária", preco: 3.49 },
      { nome: "Esponja", preco: 1.99 },
      { nome: "Sabão em barra", preco: 6.49 },
      { nome: "Desinfetante", preco: 5.99 },
      { nome: "Detergente", preco: 2.79 },
      { nome: "Sabão em pó", preco: 10.99 },
      { nome: "Amaciante", preco: 9.49 },
      { nome: "Pano de chão", preco: 4.99 },
      { nome: "Papel toalha", preco: 5.49 },
    ],
  },
  {
    id: "naoEssenciais",
    nome: "Não essenciais",
    icone: "🍪",
    tipo: "naoEssencial",
    itens: [
      { nome: "Biscoito wafer", preco: 2.99, naoEssencial: true },
      { nome: "Salgadinho pequeno", preco: 2.49, naoEssencial: true },
      { nome: "Achocolatado em pó", preco: 6.99, naoEssencial: true },
      { nome: "Pizza congelada", preco: 15.99, naoEssencial: true },
      { nome: "Batata frita congelada", preco: 14.99, naoEssencial: true },
      { nome: "Sorvete 1,5L", preco: 18.99, naoEssencial: true },
      { nome: "Chocolate em barra", preco: 5.99, naoEssencial: true },
      { nome: "Bombom caixa", preco: 12.99, naoEssencial: true },
      { nome: "Biscoito recheado", preco: 3.49, naoEssencial: true },
      { nome: "Pipoca de micro-ondas", preco: 4.99, naoEssencial: true },
    ],
  },
];

const opcoesInvestimento = [
  {
    nome: "Reserva de emergência",
    risco: "Baixo",
    retornoMensal: 0.8,
    seguranca: 5,
    retorno: 2,
    perda: 1,
  },
  {
    nome: "CDB",
    risco: "Baixo",
    retornoMensal: 1.0,
    seguranca: 4,
    retorno: 3,
    perda: 1,
  },
  {
    nome: "Tesouro Direto",
    risco: "Baixo",
    retornoMensal: 0.9,
    seguranca: 5,
    retorno: 2,
    perda: 1,
  },
  {
    nome: "Fundos imobiliários",
    risco: "Médio",
    retornoMensal: 1.2,
    seguranca: 3,
    retorno: 4,
    perda: 2,
  },
];

function formatarMoeda(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

function barra(valor, cor = "#0f172a") {
  return (
    <div
      style={{
        width: "100%",
        height: 6,
        background: "#e5e7eb",
        borderRadius: 999,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${(valor / 5) * 100}%`,
          height: "100%",
          background: cor,
          borderRadius: 999,
        }}
      />
    </div>
  );
}

export default function App() {
  const [busca, setBusca] = useState("");
  const [categoriaAberta, setCategoriaAberta] = useState("basicos");
  const [carrinho, setCarrinho] = useState({});
  const [contas, setContas] = useState({
    aluguel: "",
    energia: "",
    transporte: "",
    internet: "",
    agua: "",
  });
  const [investimentoSelecionado, setInvestimentoSelecionado] = useState(
    opcoesInvestimento[0].nome
  );
  const [valorInvestimento, setValorInvestimento] = useState("");
  const [rodadaConfirmada, setRodadaConfirmada] = useState(false);

  const investimentoAtual = opcoesInvestimento.find(
    (item) => item.nome === investimentoSelecionado
  );

  const mapaProdutos = useMemo(() => {
    const mapa = {};
    categoriasMercado.forEach((categoria) => {
      categoria.itens.forEach((item) => {
        mapa[item.nome] = {
          ...item,
          categoria: categoria.nome,
          iconeCategoria: categoria.icone,
          naoEssencial:
            item.naoEssencial === true || categoria.tipo === "naoEssencial",
        };
      });
    });
    return mapa;
  }, []);

  const categoriasFiltradas = useMemo(() => {
    return categoriasMercado
      .map((categoria) => ({
        ...categoria,
        itens: categoria.itens.filter((item) =>
          item.nome.toLowerCase().includes(busca.toLowerCase())
        ),
      }))
      .filter((categoria) => categoria.itens.length > 0);
  }, [busca]);

  const totalCarrinho = useMemo(() => {
    return Object.entries(carrinho).reduce((acc, [nome, qtd]) => {
      const produto = mapaProdutos[nome];
      if (!produto) return acc;
      return acc + produto.preco * qtd;
    }, 0);
  }, [carrinho, mapaProdutos]);

  const totalEssenciaisMercado = useMemo(() => {
    return Object.entries(carrinho).reduce((acc, [nome, qtd]) => {
      const produto = mapaProdutos[nome];
      if (!produto || produto.naoEssencial) return acc;
      return acc + produto.preco * qtd;
    }, 0);
  }, [carrinho, mapaProdutos]);

  const totalNaoEssenciaisMercado = useMemo(() => {
    return Object.entries(carrinho).reduce((acc, [nome, qtd]) => {
      const produto = mapaProdutos[nome];
      if (!produto || !produto.naoEssencial) return acc;
      return acc + produto.preco * qtd;
    }, 0);
  }, [carrinho, mapaProdutos]);

  const totalContas = useMemo(() => {
    return Object.values(contas).reduce(
      (acc, valor) => acc + (parseFloat(valor) || 0),
      0
    );
  }, [contas]);

  const valorInvestirNumero = parseFloat(valorInvestimento) || 0;

  const saldoFinal =
    SALARIO_BASE - totalCarrinho - totalContas - valorInvestirNumero;

  const rendimentoMes =
    valorInvestirNumero * ((investimentoAtual?.retornoMensal || 0) / 100);

  const patrimonioMes = Math.max(0, valorInvestirNumero + rendimentoMes);
  const patrimonioAno = patrimonioMes * 12;
  const rendimentoAno = rendimentoMes * 12;

  const notaGeral = useMemo(() => {
    let nota = 100;

    const percentualMercado = totalCarrinho / SALARIO_BASE;
    const percentualContas = totalContas / SALARIO_BASE;
    const percentualNaoEssencial = totalNaoEssenciaisMercado / SALARIO_BASE;
    const percentualInvestimento = valorInvestirNumero / SALARIO_BASE;

    if (saldoFinal < 0) nota -= 45;
    if (saldoFinal >= 0 && saldoFinal < 100) nota -= 15;
    if (percentualNaoEssencial > 0.08) nota -= 12;
    if (percentualNaoEssencial > 0.15) nota -= 12;
    if (percentualContas > 0.55) nota -= 10;
    if (percentualMercado > 0.4) nota -= 8;
    if (valorInvestirNumero === 0) nota -= 8;
    if (percentualInvestimento > 0.2 && saldoFinal < 0) nota -= 10;

    return Math.max(0, Math.round(nota));
  }, [
    saldoFinal,
    totalCarrinho,
    totalContas,
    totalNaoEssenciaisMercado,
    valorInvestirNumero,
  ]);

  const classificacao =
    notaGeral >= 85
      ? "Excelente"
      : notaGeral >= 70
      ? "Boa"
      : notaGeral >= 50
      ? "Atenção"
      : "Crítica";

  const adicionarItem = (nome) => {
    setCarrinho((prev) => ({
      ...prev,
      [nome]: (prev[nome] || 0) + 1,
    }));
  };

  const removerItem = (nome) => {
    setCarrinho((prev) => {
      const atual = prev[nome] || 0;
      if (atual <= 1) {
        const copia = { ...prev };
        delete copia[nome];
        return copia;
      }
      return {
        ...prev,
        [nome]: atual - 1,
      };
    });
  };

  const reiniciarTudo = () => {
    setBusca("");
    setCategoriaAberta("basicos");
    setCarrinho({});
    setContas({
      aluguel: "",
      energia: "",
      transporte: "",
      internet: "",
      agua: "",
    });
    setInvestimentoSelecionado(opcoesInvestimento[0].nome);
    setValorInvestimento("");
    setRodadaConfirmada(false);
  };

  const alertas = [];
  if (saldoFinal < 0) {
    alertas.push("Seu orçamento estourou. Você está gastando acima do salário mínimo.");
  }
  if (
    totalNaoEssenciaisMercado > totalEssenciaisMercado * 0.35 &&
    totalNaoEssenciaisMercado > 0
  ) {
    alertas.push("Os não essenciais estão pesando demais no orçamento.");
  }
  if (valorInvestirNumero > 0 && saldoFinal < 50) {
    alertas.push("O valor investido está alto demais para a sobra atual do mês.");
  }
  if (totalContas > SALARIO_BASE * 0.5) {
    alertas.push("As contas fixas já consomem mais da metade da renda.");
  }
  if (valorInvestirNumero === 0) {
    alertas.push("Mesmo com pouco, separar uma parte para reserva pode melhorar sua segurança financeira.");
  }

  const cardStyle = {
    background: "#fff",
    borderRadius: 18,
    padding: 16,
    boxShadow: "0 8px 24px rgba(15,23,42,0.05)",
    border: "1px solid #e5e7eb",
  };

  const smallCardStyle = {
    ...cardStyle,
    padding: 14,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f6fb",
        padding: 16,
        fontFamily:
          'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        color: "#0f172a",
      }}
    >
      <div style={{ maxWidth: 1080, margin: "0 auto" }}>
        <div style={{ ...cardStyle, marginBottom: 16 }}>
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  color: "#64748b",
                  textTransform: "uppercase",
                  marginBottom: 6,
                }}
              >
                Protótipo interativo
              </div>
              <h1 style={{ margin: 0, fontSize: 32, lineHeight: 1.1 }}>
                Simula-South
              </h1>
              <p
                style={{
                  margin: "10px 0 0",
                  color: "#475569",
                  fontSize: 15,
                  maxWidth: 700,
                  lineHeight: 1.45,
                }}
              >
                Simulação baseada no salário mínimo para mostrar como decisões
                do mês pesam no orçamento de uma família.
              </p>
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                onClick={() => setRodadaConfirmada(true)}
                style={{
                  background: "#0f172a",
                  color: "#fff",
                  border: "none",
                  borderRadius: 14,
                  padding: "10px 16px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Confirmar rodada
              </button>
              <button
                onClick={reiniciarTudo}
                style={{
                  background: "#e2e8f0",
                  color: "#0f172a",
                  border: "none",
                  borderRadius: 14,
                  padding: "10px 16px",
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: "pointer",
                }}
              >
                Reiniciar
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {[
            { label: "Salário mínimo", valor: SALARIO_BASE },
            { label: "Mercado", valor: totalCarrinho },
            { label: "Não essenciais", valor: totalNaoEssenciaisMercado },
            { label: "Contas", valor: totalContas },
            { label: "Investimento", valor: valorInvestirNumero },
            { label: "Saldo final", valor: saldoFinal },
          ].map((item) => (
            <div key={item.label} style={smallCardStyle}>
              <div
                style={{
                  color: "#64748b",
                  fontWeight: 600,
                  fontSize: 12,
                  marginBottom: 6,
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontWeight: 800,
                  fontSize: 22,
                  color:
                    item.label === "Saldo final" && item.valor < 0
                      ? "#b91c1c"
                      : "#0f172a",
                }}
              >
                {formatarMoeda(item.valor)}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.8fr 0.95fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          <div style={{ display: "grid", gap: 16 }}>
            <section style={cardStyle}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 12,
                  flexWrap: "wrap",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <div>
                  <h2 style={{ margin: 0, fontSize: 24 }}>1. Mercado</h2>
                  <p style={{ margin: "6px 0 0", color: "#64748b", fontSize: 14 }}>
                    Monte o carrinho usando categorias e busca.
                  </p>
                </div>

                <div
                  style={{
                    background: "#0f172a",
                    color: "#fff",
                    borderRadius: 16,
                    padding: "10px 14px",
                    minWidth: 180,
                  }}
                >
                  <div style={{ fontSize: 12, opacity: 0.8 }}>
                    Total do carrinho
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 800 }}>
                    {formatarMoeda(totalCarrinho)}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: 14 }}>
                <input
                  type="text"
                  placeholder="Buscar produto..."
                  value={busca}
                  onChange={(e) => setBusca(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: "1px solid #dbe2ea",
                    outline: "none",
                    fontSize: 14,
                    background: "#f8fafc",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  gap: 8,
                  overflowX: "auto",
                  paddingBottom: 6,
                  marginBottom: 16,
                }}
              >
                {categoriasMercado.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => setCategoriaAberta(categoria.id)}
                    style={{
                      border: "none",
                      cursor: "pointer",
                      borderRadius: 999,
                      padding: "9px 13px",
                      background:
                        categoriaAberta === categoria.id ? "#0f172a" : "#e2e8f0",
                      color:
                        categoriaAberta === categoria.id ? "#fff" : "#0f172a",
                      fontWeight: 700,
                      fontSize: 13,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {categoria.icone} {categoria.nome}
                  </button>
                ))}
              </div>

              <div style={{ display: "grid", gap: 14 }}>
                {categoriasFiltradas
                  .filter((categoria) =>
                    busca ? true : categoria.id === categoriaAberta
                  )
                  .map((categoria) => (
                    <div key={categoria.id}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          marginBottom: 10,
                        }}
                      >
                        <div style={{ fontSize: 20 }}>{categoria.icone}</div>
                        <h3 style={{ margin: 0, fontSize: 20 }}>{categoria.nome}</h3>
                      </div>

                      <div style={{ display: "grid", gap: 8 }}>
                        {categoria.itens.map((item) => {
                          const qtd = carrinho[item.nome] || 0;
                          return (
                            <div
                              key={item.nome}
                              style={{
                                background: "#f8fafc",
                                border: "1px solid #e5e7eb",
                                borderRadius: 14,
                                padding: 10,
                                display: "flex",
                                justifyContent: "space-between",
                                gap: 10,
                                alignItems: "center",
                                flexWrap: "wrap",
                              }}
                            >
                              <div>
                                <div
                                  style={{
                                    fontWeight: 700,
                                    fontSize: 15,
                                    marginBottom: 3,
                                  }}
                                >
                                  {item.nome}
                                </div>
                                <div style={{ color: "#64748b", fontSize: 13 }}>
                                  {formatarMoeda(item.preco)}
                                  {(item.naoEssencial ||
                                    categoria.tipo === "naoEssencial") && (
                                    <span
                                      style={{
                                        marginLeft: 8,
                                        background: "#fef3c7",
                                        color: "#92400e",
                                        padding: "3px 7px",
                                        borderRadius: 999,
                                        fontWeight: 700,
                                        fontSize: 11,
                                      }}
                                    >
                                      Não essencial
                                    </span>
                                  )}
                                </div>
                              </div>

                              <div
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 8,
                                }}
                              >
                                <button
                                  onClick={() => removerItem(item.nome)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 10,
                                    border: "none",
                                    background: "#e2e8f0",
                                    cursor: "pointer",
                                    fontWeight: 800,
                                    fontSize: 16,
                                  }}
                                >
                                  −
                                </button>
                                <div
                                  style={{
                                    minWidth: 20,
                                    textAlign: "center",
                                    fontWeight: 800,
                                    fontSize: 15,
                                  }}
                                >
                                  {qtd}
                                </div>
                                <button
                                  onClick={() => adicionarItem(item.nome)}
                                  style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 10,
                                    border: "none",
                                    background: "#0f172a",
                                    color: "#fff",
                                    cursor: "pointer",
                                    fontWeight: 800,
                                    fontSize: 16,
                                  }}
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0, fontSize: 24 }}>2. Contas</h2>
              <p style={{ marginTop: 0, color: "#64748b", fontSize: 14 }}>
                Preencha os custos fixos do mês.
              </p>

              <div style={{ display: "grid", gap: 10 }}>
                {[
                  ["aluguel", "Aluguel"],
                  ["energia", "Energia"],
                  ["transporte", "Transporte"],
                  ["internet", "Internet"],
                  ["agua", "Água"],
                ].map(([chave, label]) => (
                  <div
                    key={chave}
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 150px",
                      gap: 10,
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        background: "#f8fafc",
                        borderRadius: 14,
                        padding: "12px 14px",
                        border: "1px solid #e5e7eb",
                        fontWeight: 700,
                        fontSize: 15,
                      }}
                    >
                      {label}
                    </div>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={contas[chave]}
                      onChange={(e) =>
                        setContas((prev) => ({
                          ...prev,
                          [chave]: e.target.value,
                        }))
                      }
                      placeholder="0,00"
                      style={{
                        padding: "12px 14px",
                        borderRadius: 14,
                        border: "1px solid #dbe2ea",
                        fontSize: 14,
                        background: "#fff",
                      }}
                    />
                  </div>
                ))}
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0, fontSize: 24 }}>3. Investimento</h2>
              <p style={{ marginTop: 0, color: "#64748b", fontSize: 14 }}>
                Escolha um investimento e simule quanto pretende guardar.
              </p>

              <div style={{ display: "grid", gap: 10 }}>
                <select
                  value={investimentoSelecionado}
                  onChange={(e) => setInvestimentoSelecionado(e.target.value)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: "1px solid #dbe2ea",
                    fontSize: 14,
                    background: "#fff",
                  }}
                >
                  {opcoesInvestimento.map((opcao) => (
                    <option key={opcao.nome} value={opcao.nome}>
                      {opcao.nome}
                    </option>
                  ))}
                </select>

                <input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Valor para investir"
                  value={valorInvestimento}
                  onChange={(e) => setValorInvestimento(e.target.value)}
                  style={{
                    padding: "12px 14px",
                    borderRadius: 14,
                    border: "1px solid #dbe2ea",
                    fontSize: 14,
                    background: "#fff",
                  }}
                />

                <div style={{ color: "#64748b", fontWeight: 600, fontSize: 13 }}>
                  Máximo disponível hoje:{" "}
                  {formatarMoeda(Math.max(0, SALARIO_BASE - totalCarrinho - totalContas))}
                </div>

                <div
                  style={{
                    background: "#f8fafc",
                    border: "1px solid #e5e7eb",
                    borderRadius: 16,
                    padding: 14,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 10,
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 20 }}>
                        {investimentoAtual.nome}
                      </div>
                      <div style={{ color: "#64748b", fontWeight: 600, fontSize: 13 }}>
                        Risco: {investimentoAtual.risco}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#64748b", fontWeight: 600, fontSize: 12 }}>
                        Retorno mensal
                      </div>
                      <div style={{ fontWeight: 800, fontSize: 22 }}>
                        {investimentoAtual.retornoMensal}%
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "grid", gap: 10 }}>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 5,
                          fontSize: 13,
                        }}
                      >
                        <span>Segurança</span>
                        <strong>{investimentoAtual.seguranca}/5</strong>
                      </div>
                      {barra(investimentoAtual.seguranca, "#10b981")}
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 5,
                          fontSize: 13,
                        }}
                      >
                        <span>Potencial de retorno</span>
                        <strong>{investimentoAtual.retorno}/5</strong>
                      </div>
                      {barra(investimentoAtual.retorno, "#0ea5e9")}
                    </div>

                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 5,
                          fontSize: 13,
                        }}
                      >
                        <span>Chance de perda</span>
                        <strong>{investimentoAtual.perda}/5</strong>
                      </div>
                      {barra(investimentoAtual.perda, "#f59e0b")}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0, fontSize: 24 }}>4. Alertas inteligentes</h2>
              <div style={{ display: "grid", gap: 10 }}>
                {rodadaConfirmada ? (
                  alertas.length ? (
                    alertas.map((alerta, idx) => (
                      <div
                        key={idx}
                        style={{
                          background: "#fff7ed",
                          color: "#9a3412",
                          border: "1px solid #fed7aa",
                          borderRadius: 14,
                          padding: 14,
                          fontWeight: 600,
                          fontSize: 14,
                        }}
                      >
                        {alerta}
                      </div>
                    ))
                  ) : (
                    <div
                      style={{
                        background: "#ecfdf5",
                        color: "#065f46",
                        border: "1px solid #a7f3d0",
                        borderRadius: 14,
                        padding: 14,
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Boa organização. Seu mês está equilibrado.
                    </div>
                  )
                ) : (
                  <>
                    <div
                      style={{
                        background: "#fffbeb",
                        color: "#92400e",
                        border: "1px solid #fde68a",
                        borderRadius: 14,
                        padding: 14,
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Monte o carrinho, preencha as contas e defina o investimento.
                    </div>
                    <div
                      style={{
                        background: "#fffbeb",
                        color: "#92400e",
                        border: "1px solid #fde68a",
                        borderRadius: 14,
                        padding: 14,
                        fontWeight: 600,
                        fontSize: 14,
                      }}
                    >
                      Os alertas aparecem depois que você confirmar a rodada.
                    </div>
                  </>
                )}
              </div>
            </section>
          </div>

          <aside style={{ display: "grid", gap: 16 }}>
            <section style={cardStyle}>
              <h2 style={{ marginTop: 0, fontSize: 22 }}>Carrinho</h2>
              {Object.keys(carrinho).length === 0 ? (
                <p style={{ color: "#64748b", marginBottom: 0, fontSize: 14 }}>
                  Nada no carrinho.
                </p>
              ) : (
                <div style={{ display: "grid", gap: 8 }}>
                  {Object.entries(carrinho).map(([nome, qtd]) => {
                    const produto = mapaProdutos[nome];
                    const subtotal = produto.preco * qtd;
                    return (
                      <div
                        key={nome}
                        style={{
                          background: "#f8fafc",
                          borderRadius: 14,
                          padding: 12,
                          border: "1px solid #e5e7eb",
                        }}
                      >
                        <div style={{ fontWeight: 700, fontSize: 14 }}>{nome}</div>
                        <div style={{ color: "#64748b", marginTop: 4, fontSize: 13 }}>
                          {qtd}x • {formatarMoeda(subtotal)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0, fontSize: 22 }}>Resumo e nota geral</h2>
              <div style={{ display: "grid", gap: 10 }}>
                <div>
                  <div style={{ color: "#64748b", marginBottom: 3, fontSize: 12 }}>
                    Patrimônio do mês
                  </div>
                  <strong style={{ fontSize: 19 }}>
                    {rodadaConfirmada ? formatarMoeda(patrimonioMes) : "-"}
                  </strong>
                </div>
                <div>
                  <div style={{ color: "#64748b", marginBottom: 3, fontSize: 12 }}>
                    Rendimento do mês
                  </div>
                  <strong style={{ fontSize: 19 }}>
                    {rodadaConfirmada ? formatarMoeda(rendimentoMes) : "-"}
                  </strong>
                </div>
                <div>
                  <div style={{ color: "#64748b", marginBottom: 3, fontSize: 12 }}>
                    Patrimônio do ano
                  </div>
                  <strong style={{ fontSize: 19 }}>
                    {rodadaConfirmada ? formatarMoeda(patrimonioAno) : "-"}
                  </strong>
                </div>
                <div>
                  <div style={{ color: "#64748b", marginBottom: 3, fontSize: 12 }}>
                    Rendimento do ano
                  </div>
                  <strong style={{ fontSize: 19 }}>
                    {rodadaConfirmada ? formatarMoeda(rendimentoAno) : "-"}
                  </strong>
                </div>
                <div>
                  <div style={{ color: "#64748b", marginBottom: 3, fontSize: 12 }}>
                    Nota
                  </div>
                  <strong style={{ fontSize: 26 }}>
                    {rodadaConfirmada ? notaGeral : "-"}
                  </strong>
                </div>
                <div>
                  <div style={{ color: "#64748b", marginBottom: 3, fontSize: 12 }}>
                    Classificação
                  </div>
                  <strong
                    style={{
                      fontSize: 19,
                      color:
                        classificacao === "Excelente"
                          ? "#047857"
                          : classificacao === "Boa"
                          ? "#0369a1"
                          : classificacao === "Atenção"
                          ? "#b45309"
                          : "#b91c1c",
                    }}
                  >
                    {rodadaConfirmada ? classificacao : "Aguardando análise"}
                  </strong>
                </div>
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0, fontSize: 22 }}>Comparação visual</h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 10,
                }}
              >
                {[
                  {
                    titulo: "Cenário atual",
                    valor: rodadaConfirmada ? saldoFinal : null,
                  },
                  {
                    titulo: "Sem não essenciais",
                    valor: rodadaConfirmada
                      ? saldoFinal + totalNaoEssenciaisMercado
                      : null,
                  },
                  {
                    titulo: "Impacto extras",
                    valor: rodadaConfirmada ? totalNaoEssenciaisMercado : null,
                  },
                  {
                    titulo: "Disciplina extra",
                    valor: rodadaConfirmada
                      ? totalNaoEssenciaisMercado + rendimentoMes
                      : null,
                  },
                ].map((card) => (
                  <div
                    key={card.titulo}
                    style={{
                      background: "#f8fafc",
                      borderRadius: 14,
                      padding: 12,
                      border: "1px solid #e5e7eb",
                    }}
                  >
                    <div
                      style={{
                        color: "#64748b",
                        fontWeight: 600,
                        marginBottom: 6,
                        fontSize: 12,
                      }}
                    >
                      {card.titulo}
                    </div>
                    <div style={{ fontWeight: 800, fontSize: 18 }}>
                      {card.valor === null ? "-" : formatarMoeda(card.valor)}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section style={cardStyle}>
              <h2 style={{ marginTop: 0, fontSize: 22 }}>Notificações</h2>
              <div style={{ display: "grid", gap: 10 }}>
                <div
                  style={{
                    background: "#eff6ff",
                    color: "#1d4ed8",
                    border: "1px solid #bfdbfe",
                    borderRadius: 14,
                    padding: 12,
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  Confirme a rodada para ver o resumo do mês e a projeção do ano.
                </div>
                <div
                  style={{
                    background: "#eff6ff",
                    color: "#1d4ed8",
                    border: "1px solid #bfdbfe",
                    borderRadius: 14,
                    padding: 12,
                    fontWeight: 600,
                    fontSize: 13,
                  }}
                >
                  Enquanto isso, os indicadores ficam bloqueados e aparecem em cinza.
                </div>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}