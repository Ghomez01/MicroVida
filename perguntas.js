export const perguntasJogo = {
  animal: [
    {
      pergunta: "Falta de nutriente: Sua célula está com pouca energia.",
      opcoes: [
        { texto: "A) Absorver nutrientes", efeito: { energia: 30, estabilidade: -5, evolucao: 15 } },
        { texto: "B) Quebrar reservas", efeito: { energia: 25, saude: -10, evolucao: 10 } },
        { texto: "C) Reduzir atividades", efeito: { energia: 5, estabilidade: -5, evolucao: 5 } },
        { texto: "D) Ignorar", efeito: { energia: -15, saude: -5 } },
      ]
    },
    {
      pergunta: "Um vírus tenta invadir sua célula.",
      opcoes: [
        { texto: "A) Ativar defesa", efeito: { defesa: 25, energia: -10, evolucao: 15 } },
        { texto: "B) Produzir enzimas", efeito: { defesa: 15, estabilidade: -5, evolucao: 10 } },
        { texto: "C) Ignorar", efeito: { saude: -15, defesa: -5 } },
        { texto: "D) Expulsar invasor", efeito: { defesa: 30, energia: -15, evolucao: 15 } },
      ]
    },
    {
      pergunta: "Há toxinas no ambiente.",
      opcoes: [
        { texto: "A) Expulsar toxinas", efeito: { saude: 25, energia: -10, evolucao: 15 } },
        { texto: "B) Armazenar toxinas", efeito: { saude: -10, estabilidade: 15, evolucao: 5 } },
        { texto: "C) Ignorar", efeito: { saude: -15 } },
        { texto: "D) Produzir enzimas", efeito: { saude: 30, energia: -15, evolucao: 15 } },
      ]
    },
    {
      pergunta: "A respiração celular está comprometida (Falta de O2).",
      opcoes: [
        { texto: "A) Reduzir consumo", efeito: { energia: -5, estabilidade: 10, evolucao: 5 } },
        { texto: "B) Aumentar captação", efeito: { energia: 25, estabilidade: -10, evolucao: 15 } },
        { texto: "C) Ignorar", efeito: { energia: -15, saude: -10 } },
        { texto: "D) Usar vias alternativas", efeito: { energia: 30, saude: -15, evolucao: 20 } },
      ]
    },
    {
      pergunta: "A membrana celular foi danificada.",
      opcoes: [
        { texto: "A) Reparar membrana", efeito: { saude: 30, energia: -10, evolucao: 15 } },
        { texto: "B) Ignorar", efeito: { saude: -20 } },
        { texto: "C) Reforçar estrutura", efeito: { defesa: 20, energia: -10, evolucao: 10 } },
        { texto: "D) Adaptar permeabilidade", efeito: { estabilidade: 25, defesa: -10, evolucao: 15 } },
      ]
    },
    {
      pergunta: "A célula está gastando muita energia.",
      opcoes: [
        { texto: "A) Reduzir atividades", efeito: { energia: 25, estabilidade: -5, evolucao: 10 } },
        { texto: "B) Aumentar produção ATP", efeito: { energia: 35, estabilidade: -15, evolucao: 20 } },
        { texto: "C) Ignorar", efeito: { energia: -20 } },
        { texto: "D) Usar reservas", efeito: { energia: 20, saude: -5, evolucao: 10 } },
      ]
    },
    {
      pergunta: "Resíduos estão se acumulando.",
      opcoes: [
        { texto: "A) Usar lisossomos", efeito: { saude: 25, energia: -10, evolucao: 15 } },
        { texto: "B) Ignorar", efeito: { saude: -15 } },
        { texto: "C) Expulsar resíduos", efeito: { estabilidade: 25, energia: -10, evolucao: 15 } },
        { texto: "D) Armazenar", efeito: { estabilidade: -15, saude: 5 } },
      ]
    },
    {
      pergunta: "Ocorreu uma alteração genética (Mutação).",
      opcoes: [
        { texto: "A) Reparar DNA", efeito: { estabilidade: 30, energia: -10, evolucao: 20 } },
        { texto: "B) Ignorar", efeito: { saude: -15, estabilidade: -15 } },
        { texto: "C) Adaptar mutação", efeito: { defesa: 20, estabilidade: -10, evolucao: 10 } },
        { texto: "D) Destruir material", efeito: { saude: 20, energia: -15, evolucao: 10 } },
      ]
    },
    {
      pergunta: "A produção de ATP na mitocôndria está baixa.",
      opcoes: [
        { texto: "A) Reparar mitocôndria", efeito: { energia: 35, saude: -5, evolucao: 20 } },
        { texto: "B) Produzir mais mitocôndrias", efeito: { energia: 30, estabilidade: -10, evolucao: 15 } },
        { texto: "C) Ignorar", efeito: { energia: -25 } },
        { texto: "D) Reduzir consumo", efeito: { energia: 15, estabilidade: -10, evolucao: 5 } },
      ]
    },
    {
      pergunta: "O ambiente está pressionando a célula.",
      opcoes: [
        { texto: "A) Reforçar estrutura", efeito: { defesa: 30, energia: -15, evolucao: 15 } },
        { texto: "B) Adaptar formato", efeito: { estabilidade: 30, defesa: -10, evolucao: 15 } },
        { texto: "C) Ignorar", efeito: { saude: -20 } },
        { texto: "D) Fugir do ambiente", efeito: { estabilidade: 25, energia: -15, evolucao: 10 } },
      ]
    }
  ],
  vegetal: [
    {
      pergunta: "A célula está com pouca luz para fotossíntese.",
      opcoes: [
        { texto: "A) Aumentar captação", efeito: { energia: 25, estabilidade: -10, evolucao: 15 } },
        { texto: "B) Reduzir atividades", efeito: { energia: 15, saude: -5, evolucao: 5 } },
        { texto: "C) Usar reservas vacúolo", efeito: { energia: 20, estabilidade: -10, evolucao: 10 } },
        { texto: "D) Ignorar", efeito: { energia: -20 } },
      ]
    },
    {
      pergunta: "A célula vegetal está desidratando.",
      opcoes: [
        { texto: "A) Absorver água", efeito: { saude: 30, energia: -10, evolucao: 20 } },
        { texto: "B) Fechar estômatos", efeito: { estabilidade: 25, energia: -5, evolucao: 15 } },
        { texto: "C) Ignorar", efeito: { saude: -20 } },
        { texto: "D) Usar reservas", efeito: { saude: 20, estabilidade: -10, evolucao: 10 } },
      ]
    },
    {
      pergunta: "A luz está muito intensa (Excesso).",
      opcoes: [
        { texto: "A) Reduzir fotossíntese", efeito: { estabilidade: 25, energia: -5, evolucao: 10 } },
        { texto: "B) Ignorar", efeito: { saude: -20 } },
        { texto: "C) Dissipar energia", efeito: { saude: 25, energia: -15, evolucao: 15 } },
        { texto: "D) Aumentar produção", efeito: { energia: 35, saude: -15, evolucao: 20 } },
      ]
    },
    {
      pergunta: "Um fungo tenta atacar a parede celular.",
      opcoes: [
        { texto: "A) Reforçar parede", efeito: { defesa: 35, energia: -15, evolucao: 20 } },
        { texto: "B) Produzir químicos", efeito: { defesa: 25, estabilidade: -10, evolucao: 15 } },
        { texto: "C) Ignorar", efeito: { saude: -20 } },
        { texto: "D) Isolar área", efeito: { estabilidade: 25, energia: -10, evolucao: 15 } },
      ]
    },
    {
      pergunta: "A fotossíntese (produção de glicose) está baixa.",
      opcoes: [
        { texto: "A) Ativar cloroplasto", efeito: { energia: 30, estabilidade: -10, evolucao: 20 } },
        { texto: "B) Usar reservas", efeito: { energia: 25, estabilidade: -10, evolucao: 15 } },
        { texto: "C) Ignorar", efeito: { energia: -20 } },
        { texto: "D) Reduzir consumo", efeito: { energia: 15, saude: -5, evolucao: 5 } },
      ]
    },
    {
      pergunta: "O vacúolo está sobrecarregado.",
      opcoes: [
        { texto: "A) Liberar conteúdo", efeito: { estabilidade: 30, energia: -10, evolucao: 15 } },
        { texto: "B) Armazenar mais", efeito: { estabilidade: -15, saude: 10, evolucao: 5 } },
        { texto: "C) Ignorar", efeito: { saude: -15 } },
        { texto: "D) Reorganizar", efeito: { estabilidade: 25, energia: -5, evolucao: 15 } },
      ]
    },
    {
      pergunta: "Poucos nutrientes disponíveis no solo.",
      opcoes: [
        { texto: "A) Absorver mais", efeito: { energia: 25, estabilidade: -10, evolucao: 15 } },
        { texto: "B) Reduzir crescimento", efeito: { estabilidade: 25, energia: -5, evolucao: 10 } },
        { texto: "C) Ignorar", efeito: { saude: -20 } },
        { texto: "D) Usar reservas", efeito: { energia: 20, estabilidade: -10, evolucao: 10 } },
      ]
    },
    {
      pergunta: "A estrutura da parede celular está comprometida.",
      opcoes: [
        { texto: "A) Reparar parede", efeito: { defesa: 35, energia: -15, evolucao: 20 } },
        { texto: "B) Ignorar", efeito: { saude: -25 } },
        { texto: "C) Reforçar estrutura", efeito: { defesa: 30, estabilidade: -10, evolucao: 15 } },
        { texto: "D) Adaptar forma", efeito: { estabilidade: 25, defesa: -10, evolucao: 15 } },
      ]
    },
    {
      pergunta: "Muito oxigênio está sendo gerado (Estresse).",
      opcoes: [
        { texto: "A) Liberar oxigênio", efeito: { estabilidade: 30, evolucao: 15 } },
        { texto: "B) Ignorar", efeito: { saude: -15 } },
        { texto: "C) Reduzir fotossíntese", efeito: { estabilidade: 25, energia: -10, evolucao: 10 } },
        { texto: "D) Armazenar", efeito: { estabilidade: -15, energia: 5 } },
      ]
    },
    {
      pergunta: "Mudanças drásticas no ambiente externo.",
      opcoes: [
        { texto: "A) Adaptar metabolismo", efeito: { estabilidade: 30, energia: -15, evolucao: 20 } },
        { texto: "B) Ignorar", efeito: { saude: -25 } },
        { texto: "C) Reduzir atividades", efeito: { energia: 25, saude: -10, evolucao: 10 } },
        { texto: "D) Reforçar estruturas", efeito: { defesa: 30, energia: -15, evolucao: 15 } },
      ]
    }
  ]
};