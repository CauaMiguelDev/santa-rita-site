---
name: Clínica Santa Rita
description: Policlínica do DF como um prédio de luz, concreto branco, faixas de sol que derivam e o vermelho da fachada como única cor.
colors:
  vermelho: "#D7262B"
  vermelho-claro: "#F0464B"
  vermelho-texto: "#B51D23"
  tinta: "#1C1F24"
  tinta-2: "#4B5058"
  tinta-3: "#6E7682"
  prata: "#B9C0C9"
  fundo: "#EEF1F4"
  fundo-2: "#E6E9EE"
  fundo-3: "#D8DDE3"
  borda-fina: "#E1E5EA"
  branco: "#FFFFFF"
  noite: "#15171B"
  wordmark: "#23262B"
  linha: "rgba(28, 31, 36, .09)"
  ok: "#17924F"
  erro: "#C0352B"
  rosa: "#D61F69"
  rosa-claro: "#F0559A"
  rosa-texto: "#AD1457"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 5.4vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.2rem, 4vw, 3.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.03em"
  title:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  body:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  body-lead:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.08rem, 1.3vw, 1.2rem)"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.03rem"
    fontWeight: 750
    lineHeight: 1
    letterSpacing: "-0.005em"
  wordmark:
    fontFamily: "Noto Serif, Georgia, Times New Roman, serif"
    fontSize: "1.4rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "-0.01em"
rounded:
  pilula: "999px"
  painel: "28px"
  foto: "22px"
  cartao: "20px"
  campo: "16px"
  arco: "999px 999px 28px 28px"
  abobada: "50% 50% 22px 22px / 30% 30% 22px 22px"
spacing:
  pad: "clamp(18px, 4vw, 48px)"
  secao: "clamp(84px, 9vw, 132px)"
  nav: "72px"
  max: "1320px"
  gap-cartoes: "20px"
components:
  button-primary:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.branco}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    height: "56px"
    padding: "0 26px 0 8px"
  button-primary-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  button-outline:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pilula}"
    height: "56px"
    padding: "0 26px"
  button-outline-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  panel:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.painel}"
  exam-card:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.cartao}"
    padding: "20px 24px 22px"
  tab:
    backgroundColor: "transparent"
    textColor: "{colors.tinta-2}"
    rounded: "{rounded.pilula}"
    height: "48px"
    padding: "0 20px"
  tab-selected:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  input:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    rounded: "{rounded.campo}"
    height: "58px"
    padding: "0 48px 0 52px"
  hero-chip:
    backgroundColor: "rgba(255,255,255,.8)"
    textColor: "{colors.tinta}"
    rounded: "18px"
    padding: "12px 18px 12px 12px"
---

# Design System: Clínica Santa Rita

## Overview

**Creative North Star: "Luz de Brasília"**

A clínica como um prédio de luz, à maneira dos hospitais da Rede Sarah, de Lelé: concreto branco curvo, luz zenital que entra pelos sheds em faixas e uma única cor, o vermelho da fachada. O fundo da página é a parede de concreto iluminada: faixas diagonais de sol derivam devagar por conta própria (WebGL), sem depender da rolagem. Sobre ele, painéis brancos lisos; as fotos reais das salas entram por janelas em arco.

A densidade é de site de clínica que um paciente de 70 anos lê sem esforço: corpo grande (18px), contraste alto, alvos de toque de 44px ou mais, reserva com um toque em toda tela. O movimento é generoso no hero (método da Cemtra, a pedido do usuário: entrada encenada, palavra que gira, parallax do ponteiro) e contido no resto (palavras que sobem uma vez, uma faixa de sol que passa, sheds que se desenham uma vez).

Rejeitados e confirmados: temas azul-marinho ou escuros, rosa fora de campanha, página de cartões brancos sobre fundo chapado.

**Key Characteristics:**
- Três cores trabalhando: branco/concreto, grafite e vermelho da fachada. A luz é efeito, nunca uma quarta cor.
- Fundo vivo de faixas de luz, só no tempo; fallback em CSS com o mesmo desenho parado.
- Janelas em arco e abóbada para fotos; pílulas para tudo que se aperta.
- Estado legível: o escolhido fica sólido, o resto em contorno tracejado.
- Sheds (perfil do telhado em dente de serra) entre capítulos e no alto do rodapé.

## Colors

Concreto frio e grafite com um só vermelho; tudo que não é vermelho é cinza-azulado de concreto.

### Primary
- **Vermelho da Fachada** (vermelho): o botão principal (WhatsApp), o ícone que acende no hover, foco, seleção de texto, órbita tracejada do hero, barra de progresso. Também é a cor do WhatsApp: o token `--wa` aponta para ele.
- **Vermelho-Texto** (vermelho-texto): toda palavra vermelha sobre claro (palavra que gira no título, números de destaque, links de seta, selos de exame). Nunca use o vermelho puro em texto pequeno.
- **Vermelho Aceso** (vermelho-claro): só sobre fundo escuro (cartão grafite, rodapé) e no miolo do gradiente do cartão de resultados.

### Neutral
- **Grafite-Tinta** (tinta): texto, varredura do hover dos botões, aba e ficha selecionadas, botão de ligar na barra móvel.
- **Tinta Média / Tinta Clara** (tinta-2, tinta-3): texto de apoio e leads; rótulos, setas e ícones em repouso.
- **Concreto** (fundo, fundo-2, fundo-3): chão da página, fundo dos círculos de ícone, fundo de foto ainda carregando.
- **Prata do Símbolo** (prata): o terceiro coração do símbolo, títulos de coluna do rodapé; o traço tracejado e dos sheds usa o mesmo cinza.
- **Borda Fina** (borda-fina): fio de 1px de todo painel e cartão branco.
- **Noite** (noite): só o rodapé e o sexto cartão do centro de imagem.
- **OK / Erro** (ok, erro): apenas validação de formulário. Não são cores de marca.

### Named Rules
**The Three Colors Rule.** Branco, grafite e o vermelho da fachada; nenhuma quarta cor trabalha. O WhatsApp é vermelho, não verde; o status "aberto" é vermelho, não verde.

**The Campaign Switch Rule.** Rosa (rosa, rosa-claro, rosa-texto) só existe sob a classe `.rosa`, que troca os tokens de vermelho e do símbolo; desligar a classe devolve a identidade base.

## Typography

**Display/Body Font:** Atkinson Hyperlegible Next (com Segoe UI, system-ui)
**Wordmark:** Noto Serif 500, subconjunto só com as letras de "Clínica.Santa.Rita"

**Character:** Uma família só, de legibilidade clínica, em peso alto e entreletra fechada nos títulos; a serifa aparece apenas na marca, com os pontos em vermelho.

### Hierarchy
- **Display** (700, clamp(3rem, 5.4vw, 5.5rem), 1): título do hero, máx. 12ch; a última palavra em vermelho-texto.
- **Headline** (700, clamp(2.2rem, 4vw, 3.5rem), 1.05): título de seção. A declaração do "sobre" sobe para clamp(2.2rem, 5vw, 4.4rem).
- **Title** (800, 1.35–1.6rem, 1.1–1.15): títulos de painel, pergunta do FAQ, nome de exame (700, 1.38rem).
- **Body** (400, 1.125rem, 1.6): texto corrido; lead em tinta-2, 42–48ch.
- **Label** (750, 1.03rem): botões, abas, fichas, links de seta.

### Named Rules
**The Real Heading Rule.** Grupos e seções são nomeados por títulos de verdade em caixa normal, nunca por sobretítulo em caixa alta espaçada; o selo de seção e o risco desenhado estão desligados.

**The Rising Word Rule.** Títulos sobem da própria linha (máscara por palavra) uma vez e depois uma faixa de sol passa por cima uma vez.

## Layout

Coluna de até 1320px com margem lateral fluida (pad); seções com respiro vertical fluido (secao). Cabeçalhos de seção em duas colunas (título à esquerda, lead à direita, alinhados pela base) que viram uma coluna abaixo de 1024px. Grades de conteúdo 5/7 (texto/painel); centro de imagem em 3 → 2 → 1 colunas com 20px de vão.

Entre capítulos, uma faixa de sheds de 46px desenhada em traço fino. O hero ocupa 100svh em duas colunas (texto 1.04fr, palco 0.96fr); abaixo de 1024px vira uma coluna na ordem título → palco (a sala) → lead → botões → fatos, para o primeiro viewport mostrar a clínica.

Breakpoints: 1180px (nav vira botão de menu), 1024px (uma coluna), 760px (celular: barra móvel WhatsApp + ligar, fotos de borda a borda), 640px, 400px, 360px.

**The Full-Bleed Photo Rule.** No celular (≤760px) as fotos vão até a borda da tela, recortadas, nunca encolhidas: o bento do laboratório, a fachada e os cartões de exame perdem a margem lateral e o canto inferior, mantendo só o arco no alto.

## Elevation & Depth

Híbrido discreto: painéis brancos com fio de 1px e uma sombra difusa e baixa; a profundidade forte fica com a luz do fundo e com as fotos. Sem vidro nos painéis; o vidro (blur) só aparece nos selos flutuantes do hero e na barra móvel; a nav compacta é branca opaca.

### Shadow Vocabulary
- **Painel** (`0 1px 2px rgba(28,31,36,.05), 0 20px 44px -26px rgba(28,31,36,.34)`): todo painel e cartão em repouso.
- **Painel alto** (`0 2px 6px rgba(28,31,36,.06), 0 34px 64px -30px rgba(28,31,36,.42)`): painel apontado, que sobe 5px.
- **Foto** (`0 30px 60px -38px rgba(28,31,36,.5)`): molduras de foto.
- **Vermelho** (`0 14px 28px -16px color-mix(in srgb, var(--vermelho) 85%, transparent)`): só o que é vermelho (botão principal, botão flutuante, cartão de resultados).

### Named Rules
**The Sun Pass Rule.** No hover, uma faixa de sol (gradiente branco a 105°) atravessa o painel uma vez; nunca em loop, nunca com movimento reduzido.

## Shapes

Curvas de concreto: pílulas para tudo que se aperta (botões, abas, fichas, nav, busca), painéis com 28px, cartões de exame com 20px, fotos com 22px, campos com 16px. Fotos de sala entram por janelas: o arco do hero (alto inteiramente redondo, base 28px) e a abóbada dos cartões de exame e do laboratório. O laboratório no hero é redondo, com órbita tracejada vermelha girando em 40s. O alto do rodapé é recortado no perfil dos sheds por máscara.

## Components

### Buttons
Pílulas firmes, com a cor entrando pelo lado em que o cursor chega.
- **Shape:** pílula (999px), 56px de altura (46px sm, 64px lg); com ícone, o ícone fica num círculo de 40px colado à esquerda.
- **Primary:** vermelho com texto branco; ícone do WhatsApp num círculo branco translúcido.
- **Hover / Focus:** uma camada grafite varre a partir do lado de entrada (`--origem` medido no ponteiro), em 0.6s; o rótulo rola para cima e é substituído pela cópia de baixo (sombra de texto deslocada 1.6em); o ícone gira −12°. O botão segue o cursor alguns pixels (ímã, 14×12px). `:focus-visible` mostra o mesmo estado do hover.
- **Calling ring:** depois da entrada do hero, o botão principal emite um anel do ícone três vezes e para.
- **Outline:** branco com contorno grafite de 1.5px; no hover vira grafite com texto branco.
- **Claro:** branco sobre fundo escuro; a varredura é vermelha.

### Chips (abas de unidade e fichas do formulário)
- **Style:** pílula de 48px, fundo transparente, contorno tracejado 1.5px em cinza prata.
- **State:** selecionada vira grafite sólida com texto branco; nas abas uma luz grafite desliza até a escolhida. A unidade escolhida fica salva (`localStorage` `sr-unidade`) e volta marcada.

### Cards / Containers
- **Corner Style:** painel 28px; cartão de exame 20px (reto e de borda a borda no celular).
- **Background:** branco opaco; o sexto cartão de exames e o rodapé em noite.
- **Shadow Strategy:** Painel → Painel alto no hover, com subida de 5px e Sun Pass.
- **Border:** 1px borda-fina.
- **Internal Padding:** 20–34px fluido.
- **Ícones dentro:** círculo de concreto (fundo-2) com ícone tinta-2 em repouso; no hover vira vermelho com ícone branco.

### Inputs / Fields
- **Style:** 58px, raio 16px, fio grafite a 15%, ícone à esquerda, rótulo que flutua para cima ao escrever.
- **Focus:** fundo branco, borda vermelha e halo vermelho a 14% de 5px; ícone e rótulo em vermelho-texto.
- **Error / OK:** borda erro e fundo #FFF6F5; o válido ganha um selo verde (ok) que surge à direita.

### Navigation
Barra em pílula fixa no topo; ao rolar, compacta para 1180px e vira branca opaca com fio e sombra. Links em tinta-2 (650), uma luz desliza sob o link apontado e fica grafite no atual. Some ao descer, volta ao subir. Abaixo de 1180px, botão redondo grafite abre o menu num círculo a partir dele; abaixo de 760px, barra móvel no rodapé com WhatsApp e ligar.

### Hero (signature)
À direita, a sala de ressonância num arco, com o símbolo dos três corações atrás dele. A entrada, sem nada ligado à rolagem: a foto se revela de baixo para cima (clip-path) enquanto os três corações chegam de três lados e se encontram; o título sobe de uma máscara por linha e a última palavra passa por consulta → coleta → ressonância, cada uma fazendo bater o seu coração, até parar em "mensagem", quando o símbolo bate inteiro. Os selos de vidro (25+ anos com contador, a matriz com status ao vivo) e o laboratório redondo surgem com mola; depois a divisão de texto é desfeita, selos e símbolo flutuam em laços que pausam fora da tela, e o palco segue o ponteiro em camadas (`data-prof`). Abaixo dos botões, uma linha de fatos com ícones vermelhos e links sublinhados em vermelho.

### Background (signature)
No método da Cemtra, sem WebGL: concreto liso com três planos de cor que flutuam devagar (branco no alto à esquerda, vermelho a 11% à direita, cinza do símbolo embaixo), um grão fino por cima e desenhos de linha em algumas seções: o contorno dos três corações que se desenha em Especialidades, um traçado de ECG com um pulso vermelho no Laboratório, um anel tracejado com raios girando em Dúvidas. Especialidades e Unidades ficam num plano branco com uma curva vermelha no alto.

### Cards: caixas vivas
Na chegada, cada caixa sobe de baixo desdobrando em 3D (de −12° a 0, 1.2s, expo.out, em cascata) e uma faixa de luz branca desce por ela uma vez. No hover, uma luz vermelha corre em volta da borda (gradiente cônico girando, 3.4s por volta), o preenchimento claro segue o cursor, o ícone dá um salto e os cartões menores (cuidados, laboratório, exames, ajuda, passos) inclinam em 3D. Nas listas, a linha apontada ganha um fundo vermelho a 9% que entra pela esquerda e o nome fica em vermelho-texto.

### Pré-agendamento: a noite (signature)
Seção grafite (`noite`) que se abre de ponta a ponta com a rolagem (clip-path de 4% com cantos de 56px até a largura total). Uma brasa vermelha deriva no céu, uma luz vermelha segue o cursor e um traçado de ECG claro corre na base. Três passos numerados (os números acendem em sequência), cartões de canal (WhatsApp, telefone) e o formulário num painel branco.

### Unidades: mapa do DF
Mapa ilustrado (limite do DF tracejado, Lago Paranoá e o avião do Plano Piloto como referência), com rotas que saem da matriz em Taguatinga até cada unidade. As rotas se desenham e os pinos caem no lugar quando o mapa chega; pino e aba são o mesmo estado: o escolhido fica grafite com ponto vermelho e radar, e a rota dele fica vermelha. No celular só o pino ativo mostra o nome.

### Dúvidas e chamada
Cada pergunta é um cartão; aberto, ganha um véu vermelho a 5% e o título em vermelho-texto. O cartão de ajuda tem um balão vermelho com três pontos digitando. Antes do contato, a chamada final: os três corações se juntam e sobem com a rolagem atrás do convite, com um anel tracejado girando.

### Contato
Um painel só, com cantos de 36px: à esquerda, a noite sobre a parede da marca (foto a 26%, brasa vermelha no canto), com os quatro canais em linhas de vidro escuro (ícone vermelho ou grafite, rótulo pequeno, valor forte, seta que avança) e o endereço da matriz com o status ao vivo; à direita, o formulário, com temas rápidos tracejados (Sugestão, Elogio, Reclamação, Outro assunto) que preenchem o assunto e ficam sólidos quando escolhidos.

### Rodapé
Abre na noite, com uma brasa vermelha e o contorno dos três corações flutuando em branco a 14%, a frase "Cuidando da saúde do DF e entorno há mais de 25 anos." e as cinco cidades em fichas de vidro. Depois, as colunas: marca com status ao vivo e botões, Navegue, Para você e Parceiros, Unidades com telefone e Contato. Na base, o botão vermelho de voltar ao topo.

### Fotos
Além das salas de exame, fotos tiradas do vídeo da clínica: a sala do ecocardiograma num arco e os eletrodos do eletro num círculo com órbita no topo de Especialidades (com três pontos: agendamento em um toque, exames do coração e 5 unidades), a recepção da matriz em Dúvidas e a parede com a marca em Contato. Todas com o mesmo tratamento de luz do dia e paralaxe leve.

### Centro de imagem: rolagem para o lado (método dos serviços da Cemtra)
O palco fica parado enquanto a página rola e os cartões andam da direita para a esquerda; à esquerda, o título, o texto, o contador "1 de 5" e uma barra de progresso vermelha. Cartões brancos (ícone vermelho, texto, fichas das indicações, duração e preparo, link de agendar) alternam com salas em arco, com a foto real e um vidro escuro por cima. No fim, "Também realizamos" com os outros exames. No celular o título fica em cima e os cartões andam embaixo; sem o palco (movimento reduzido, tela deitada muito baixa) viram grade.

### Do:
- **Do** manter exatamente três cores trabalhando: concreto/branco, grafite e vermelho (#D7262B); texto vermelho sempre em vermelho-texto.
- **Do** usar pílulas para tudo que se aperta e janelas em arco ou abóbada para fotos de salas.
- **Do** mostrar o estado escolhido sólido em grafite e as opções restantes em contorno tracejado.
- **Do** dar a todo hover um equivalente em `:focus-visible`.
- **Do** oferecer fallback parado para cada movimento: modo leve, movimento reduzido e aparelho lento.
- **Do** levar as fotos até a borda da tela no celular, recortando em vez de encolher.

### Don't:
- **Don't** usar verde para o WhatsApp ou para "aberto"; verde é só validação de formulário.
- **Don't** ligar o fundo de luz ou o hero à rolagem.
- **Don't** usar rosa fora da classe de campanha, nem temas azul-marinho ou escuros.
- **Don't** nomear seções com sobretítulo em caixa alta espaçada; use títulos de verdade.
- **Don't** deixar brilho em loop nos botões ou anéis pulsando para sempre; o chamado acontece um número contado de vezes.
- **Don't** pôr vidro (blur) nos painéis; eles são concreto branco opaco.
