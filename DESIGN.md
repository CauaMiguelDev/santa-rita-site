---
name: Clínica Santa Rita
description: Policlínica do DF vestida com a fachada, branco e cinza-claro, grafite, os cinzas do símbolo e o vermelho da faixa como luz e pulso.
colors:
  vermelho: "#D7262B"
  vermelho-claro: "#F0464B"
  vermelho-texto: "#B51D23"
  tinta: "#1C1F24"
  tinta-2: "#4B5058"
  tinta-3: "#6E7682"
  prata: "#B9C0C9"
  fundo: "#F5F5F6"
  fundo-2: "#ECEDEF"
  fundo-3: "#DFE1E4"
  branco: "#FFFFFF"
  noite: "#15171B"
  noite-2: "#1F2228"
  wordmark: "#23262B"
  linha: "rgba(28, 31, 36, .09)"
  wa: "#128048"
  ok: "#17924F"
  erro: "#C0352B"
  rosa: "#D61F69"
  rosa-claro: "#F0559A"
  rosa-texto: "#AD1457"
typography:
  display:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(3rem, 7vw, 6rem)"
    fontWeight: 800
    lineHeight: 0.94
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(2.3rem, 4.6vw, 4rem)"
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "clamp(1.8rem, 3vw, 2.6rem)"
    fontWeight: 800
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  title-sm:
    fontFamily: "Atkinson Hyperlegible Next, Segoe UI, system-ui, -apple-system, sans-serif"
    fontSize: "1.18rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "-0.02em"
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
  lg: "28px"
  md: "20px"
  sm: "16px"
  pill: "999px"
  petala: "44% 26px 44% 26px / 38% 26px 38% 26px"
  ico-petala: "22px"
spacing:
  pad: "clamp(18px, 4vw, 48px)"
  secao: "clamp(84px, 9vw, 132px)"
  nav-h: "72px"
  container: "1320px"
components:
  button-primario:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.branco}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "56px"
  button-primario-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  button-contorno:
    backgroundColor: "rgba(255,255,255,.55)"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "56px"
  button-contorno-hover:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  button-claro:
    backgroundColor: "{colors.branco}"
    textColor: "{colors.tinta}"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "56px"
  button-claro-hover:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.branco}"
  card-vidro:
    backgroundColor: "rgba(255,255,255,.78)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.lg}"
    padding: "28px"
  card-grafite:
    backgroundColor: "rgba(255,255,255,.05)"
    textColor: "{colors.branco}"
    rounded: "{rounded.lg}"
    padding: "18px"
  card-resultados:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.branco}"
    rounded: "{rounded.lg}"
    padding: "30px"
  moldura-petala:
    backgroundColor: "{colors.fundo-3}"
    rounded: "{rounded.petala}"
  input-campo:
    backgroundColor: "rgba(255,255,255,.88)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.sm}"
    padding: "0 48px 0 52px"
    height: "58px"
  input-busca:
    backgroundColor: "rgba(255,255,255,.9)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "62px"
  chip-ficha:
    backgroundColor: "rgba(255,255,255,.88)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 22px"
    height: "48px"
  chip-ficha-selected:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  aba:
    backgroundColor: "rgba(255,255,255,.78)"
    textColor: "{colors.tinta-2}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "48px"
  aba-selected:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  atalho:
    backgroundColor: "rgba(255,255,255,.72)"
    textColor: "{colors.tinta}"
    rounded: "{rounded.pill}"
    padding: "0 18px 0 12px"
    height: "44px"
  petala-ico:
    backgroundColor: "{colors.branco}"
    rounded: "{rounded.ico-petala}"
    size: "64px"
  nav-link:
    textColor: "{colors.tinta-2}"
    rounded: "{rounded.pill}"
    padding: "0 15px"
    height: "42px"
  nav-link-atual:
    backgroundColor: "{colors.tinta}"
    textColor: "{colors.branco}"
  faixa:
    backgroundColor: "{colors.vermelho}"
    textColor: "{colors.branco}"
    padding: "22px 0 18px"
  flutuante-wa:
    backgroundColor: "{colors.wa}"
    textColor: "{colors.branco}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "64px"
---

# Design System: Clínica Santa Rita

## Overview

**Creative North Star: "Três Corações, Um Lugar"**

A Santa Rita se apresenta com a própria fachada: chão branco e cinza-claro, voz em grafite, os dois cinzas do símbolo como apoio e o vermelho da faixa da fachada como luz e pulso. O símbolo de três corações (consulta, laboratório e imagem) não é decoração, é o mecanismo da página: ele se monta na abertura, acende o cuidado que o visitante aponta e marca a passagem da faixa vermelha. Atrás de tudo, um fundo vivo em WebGL desenha as ondas dos painéis da recepção, ondulando com o tempo, a rolagem e (só com mouse) o cursor.

A densidade é generosa e muito legível: uma família só, Atkinson Hyperlegible Next, em 800 nos títulos e 400 a 1.125rem no corpo, pensada para pacientes mais velhos no celular. A matéria de toda caixa é vidro branco fosco, aceso por uma luz vermelha que segue o cursor no preenchimento e numa borda mascarada. Fotos reais da clínica vivem em molduras de pétala (dois cantos opostos inteiros, como os lóbulos dos corações). Há um único capítulo grafite, o Centro de Imagem, tratado como a tela de um visualizador, e o rodapé.

O mundo recusa o modelo de clínica com cartões brancos e médico de banco de imagem, as placas de sinalização chapadas da versão 1 (arquivada em `.impeccable/v1-sinalizacao`), temas azul-marinho e o rosa fora da campanha.

**Key Characteristics:**
- Chão claro (#F5F5F6) com ondas vivas da recepção; vidro branco como superfície; grafite (#1C1F24) como voz.
- Um vermelho de fachada (#D7262B): botão principal, faixa, cartão de resultados, luz do cursor, foco, pulso. Como texto, só o tom escuro (#B51D23).
- Os três corações do símbolo como ícones, mecanismo e ritmo (abertura, Três cuidados, atalhos, faixa).
- Fotos reais em pétala, com anel branco e sombra quente.
- Um capítulo grafite: Centro de Imagem (visualizador com grade e mira) e rodapé.
- Outubro Rosa é uma classe removível que troca o vermelho por rosa; desligada hoje.

## Colors

Branco, cinza-claro e grafite carregam tudo; o vermelho da faixa é o único acento de marca e aparece como luz, pulso e ação.

### Primary
- **Vermelho da Fachada** (vermelho): o botão principal, a faixa inclinada, o cartão "Resultados de exames", o círculo de ícone em hover, o selo de código das unidades, o ícone aberto do FAQ, a barra de progresso da navegação (3px), o anel de foco (2.5px, offset 3px), a seleção de texto, o cursor dos campos, os riscos à mão, o traço de ECG e a luz do cursor no vidro. Também é o coração de cima do símbolo (`--sym-b`).
- **Vermelho Aceso** (vermelho-claro): brilho dentro dos gradientes (abertura, hero, cartão de resultados) e todo vermelho sobre o grafite: linha de varredura, ponto e barra do índice dos exames, mira, pulso do rodapé.
- **Vermelho-Texto** (vermelho-texto): a única forma de vermelho como texto ou ícone fino sobre claro: palavra que gira no hero, links-seta, setas em hover, ícones de fatos e horários, número "25 anos", links do FAQ.

### Secondary
- **Prata do Símbolo** (prata): o coração da direita (`--sym-c`), o halo prateado no canto do hero, a barra de rolagem e os cabeçalhos de coluna do rodapé. O coração da esquerda usa o cinza `tinta-3` (`--sym-a`).

### Neutral
- **Grafite-Tinta** (tinta): texto principal, botão de menu, ficha e aba selecionadas, destaque deslizante da seção atual, varredura de hover do botão principal, botão "Ligar" da barra móvel.
- **Tinta Média** (tinta-2): leads, descrições, links de navegação em repouso.
- **Tinta Clara** (tinta-3): setas em repouso, ícones de campo, notas; mesmo valor do cinza do símbolo.
- **Chão** (fundo): fundo da página, da abertura e do menu do celular.
- **Chão Sombra** (fundo-2): círculo do ícone do FAQ, base do mapa.
- **Chão Fundo** (fundo-3): base das molduras em pétala antes da foto carregar; hover do ícone do FAQ.
- **Branco** (branco): base do vidro, ícones circulares, botão claro, texto sobre vermelho e grafite.
- **Noite Grafite** (noite) e **Noite Grafite 2** (noite-2): fundo do Centro de Imagem e do rodapé; base das fotos de exame.
- **Wordmark** (wordmark): a cor do nome "Clínica.Santa.Rita" no claro.
- **Linha** (linha): divisores de 1px em listas dentro de cartões (canais, fatos, especialidades, FAQ, menu).
- **Verde WhatsApp** (wa): só o botão flutuante e o botão WhatsApp da barra móvel.
- **Ok / Erro** (ok, erro): só estados de formulário.

### Campanha (Outubro Rosa)
- **Rosa** (rosa), **Rosa Aceso** (rosa-claro), **Rosa-Texto** (rosa-texto): substituem `vermelho`, `vermelho-claro` e `vermelho-texto` quando `<html>` recebe a classe `.rosa` (via `data-campanha="auto|rosa|off"`; hoje `off`). Na mesma troca o símbolo veste violeta e rosa (#9900FF, #CC33FF, #FF99FF) e o wordmark fica rosa (#E8368E). Aparecem também a seção da campanha e as etiquetas "Outubro Rosa" em Mastologia e Mamografia.

### Named Rules
**The One Red Rule.** Existe um vermelho, o da faixa da fachada. Ele é ação (botão principal), luz (cursor, foco, brilhos) e pulso (ECG, anéis). Superfícies inteiras em vermelho são só três: a faixa, o cartão de resultados e o botão principal.

**The Dark Red Text Rule.** Vermelho como texto sobre claro usa sempre `vermelho-texto`. `vermelho` e `vermelho-claro` só viram traço fino ou texto sobre o grafite.

**The Switchable Campaign Rule.** Toda cor de marca passa pelas variáveis (`--vermelho*`, `--sym-*`, `--wordmark`) para que a classe `.rosa` troque a campanha inteira num só interruptor. Nenhum vermelho fixo no código de componente.

**The Soft Wash Rule.** Lavagens radiais vermelhas nos fundos de seção ficam entre 9% e 14% (hero até 26% no núcleo, rodapé 22% sobre o grafite). Aquecem o chão; não o pintam.

## Typography

**Display Font:** Atkinson Hyperlegible Next (variável 200–800, auto-hospedada; com Segoe UI, system-ui)
**Body Font:** Atkinson Hyperlegible Next (mesma família)
**Wordmark:** Noto Serif 500, subconjunto só com as letras de "Clínica.Santa.Rita"

**Character:** Uma sem-serifa desenhada para baixa visão, usada pesada (800) com tracking negativo nos títulos e em 400 no corpo. A serifa existe só no nome da clínica, com os pontos em vermelho, como na fachada.

### Hierarchy
- **Display** (800, clamp(3rem, 7vw, 6rem), 0.94, -0.035em): só o título do hero, máximo 9.5ch; no celular clamp(2.7rem, 12.5vw, 3.6rem). A última palavra gira (família, prevenção, saúde) em Vermelho-Texto.
- **Headline** (800, clamp(2.3rem, 4.6vw, 4rem), 1.02, -0.04em): título de seção, máximo 17ch, `text-wrap: balance`, revelado palavra a palavra. A declaração do "sobre" usa clamp(1.9rem, 4.1vw, 3.6rem), 1.12, máximo 26ch.
- **Title** (800, clamp(1.8rem, 3vw, 2.6rem), -0.035em): nome do exame e da unidade. Cartões menores: 1.35–1.6rem (portas, painéis, formulário).
- **Title-sm** (800, 1.18rem, -0.02em): nome de especialidade e pergunta do FAQ.
- **Body** (400, 1.125rem, 1.6): texto corrido, `text-wrap: pretty`; respostas até 60ch. **Lead** em clamp(1.08rem, 1.3vw, 1.2rem) na Tinta Média, máximo 48ch (hero 42ch, até 1.27rem).
- **Label** (750, 1.03rem, -0.005em): botões, fichas, abas, rótulos de campo (0.95rem), status. Navegação em 650.
- **Wordmark** (Noto Serif 500, 1.4rem; grande clamp(1.8rem, 4.4vw, 2.8rem)): só o nome da clínica, pontos em `vermelho` (campanha: wordmark rosa).
- **Gigante do rodapé** (800, clamp(4rem, 17.5vw, 17rem), 0.78, -0.06em): "Santa Rita" um degrau acima do grafite (#2A2E36), letras subindo uma a uma.

### Named Rules
**The No Kicker Rule.** Nenhum sobretítulo ou eyebrow acima de títulos; o título abre a seção. Caixa-alta espaçada existe só na assinatura do logotipo ("Cuidando da sua saúde", 0.58rem, 0.22em), nos cabeçalhos de coluna do rodapé (0.78rem, 0.16em, prata) e na etiqueta da campanha.

**The Readable First Rule.** Corpo nunca abaixo de 1.125rem/400 em texto corrido, apoio nunca abaixo de 0.9rem; títulos em 800. Números sempre `tabular-nums`.

**The Serif Is The Name Rule.** Noto Serif só no wordmark. Nenhum título ou texto usa serifa.

## Layout

Contêiner de 1320px com respiro lateral fluido (`pad`). Toda seção usa o mesmo ritmo (`secao`, clamp(84px, 9vw, 132px)); o rodapé abre com clamp(96px, 10vw, 140px). Cabeçalhos de seção são uma grade de duas colunas (título à esquerda, lead alinhado embaixo à direita), virando uma coluna em 1024px. As composições são assimétricas em pares 5/7 ou 7/5 (Três cuidados, agendamento, unidades, FAQ, contato, campanha); o hero é 1.08/0.92; o laboratório é um bento 5/4/3 com a foto em duas linhas; o "sobre" é um bento de 12 colunas (7+5); especialidades em 3 colunas de texto (2 em 1024px, 1 em 640px).

Centro de Imagem: no desktop com movimento (≥1025px, sem `.leve`) o palco é fixado por 100svh; abas em pílula no topo e, abaixo, a caixa da foto e a ficha do exame em 1.15/0.85, com encaixe por sala. Abaixo de 1025px as salas viram um carrossel horizontal com scroll-snap (cartão de min(86%, 440px)) e pontos embaixo.

Pontos de quebra: 1180px (navegação vira botão de menu), 1024px (grades em uma coluna), 760px (`nav-h` 62px, botão flutuante vira barra inferior em pílula com WhatsApp e Ligar, ondas do fundo mais fracas), 640px e 560px (ajustes de lista e formulário).

**The One Rhythm Rule.** Seção nova usa `padding-block: var(--secao)` e o contêiner; não inventa espaçamento vertical.

## Elevation & Depth

Profundidade híbrida: vidro branco translúcido com desfoque sobre o chão vivo, sombras longas e difusas com spread negativo, realce interno branco de 1px no topo, e um grão fino fixo (ruído SVG a 3.5%, multiply). Sombras sob vermelho e sob fotos em pétala são quentes (mistura do vermelho), nunca cinza puro. Não há sombra dura deslocada. No modo `.leve` o desfoque cai e o vidro vira branco 97%.

### Shadow Vocabulary
- **Vidro em repouso** (`inset 0 1px 0 #fff, 0 1px 2px rgba(28,31,36,.05), 0 30px 60px -34px rgba(28,31,36,.32)`): todo cartão de vidro.
- **Vidro aceso** (`inset 0 1px 0 #fff, 0 1px 2px rgba(28,31,36,.05), 0 44px 80px -36px color-mix(in srgb, var(--vermelho) 40%, rgba(60,10,12,.6))`): hover com ponteiro fino, junto com subida de 5px.
- **Moldura pétala** (`0 0 0 9px rgba(255,255,255,.6), 0 50px 90px -40px color-mix(in srgb, var(--vermelho) 38%, rgba(40,10,12,.6))`): fotos reais no claro. No grafite: anel branco 6% e sombra preta.
- **Vermelho aceso** (`inset 0 1px 0 rgba(255,255,255,.25), 0 18px 34px -16px color-mix(in srgb, var(--vermelho) 85%, transparent)`): botão principal; variações no cartão de resultados, na faixa e no botão do vídeo.
- **Flutuante** (`inset 0 0 0 1px rgba(255,255,255,.95), 0 18px 44px -24px rgba(28,31,36,.45)`): navegação compacta e barra móvel.
- **Ícone** (`inset 0 0 0 1px rgba(28,31,36,.1), 0 8px 18px -12px rgba(28,31,36,.4)`): círculos brancos de ícone e pétalas-ícone.

### Named Rules
**The Lit Glass Rule.** Toda caixa é vidro branco e toda caixa interativa acende: um brilho branco (240px) e um vermelho a 12% (460px) seguem o cursor no preenchimento, e uma borda vermelha mascarada de 1.5px acende ao redor, em hover e `focus-within`.

**The Warm Shadow Rule.** Sombra sob vermelho ou sob foto emoldurada mistura o vermelho; sombra sob vidro neutro é tinta.

## Shapes

A regra de forma está no cabeçalho do CSS: cartões 28px, mídias internas 20px, campos 16px, botões, fichas, abas e atalhos em pílula. A geometria-assinatura é a **pétala** (`44% 26px 44% 26px / 38% 26px 38% 26px`): dois cantos opostos inteiros, tirados dos lóbulos dos corações, em toda foto real (hero, laboratório, fachada, espera, salas de exame). Ícones são círculos (46px) ou pétalas-ícone quadradas de 22px (64px; 54px/18px no celular). O logo da recepção no hero e o botão do vídeo são círculos com anéis que pulsam. A faixa vermelha é um retângulo inclinado -2° e mais largo que a tela.

**The Shape Ladder Rule.** 28 → 20 → 16 → pílula, de fora para dentro; fotos sempre em pétala, nunca em retângulo arredondado comum.

## Components

### Buttons
Pílulas com círculo de ícone à esquerda e uma varredura de cor que entra pelo lado de onde o cursor chegou.
- **Shape:** pílula (999px); alturas 46 / 56 / 64px (sm / padrão / lg), círculo de ícone 34 / 40 / 46px.
- **Primário:** fundo Vermelho, texto Branco, peso 750, círculo de ícone branco 20%. Hover (ponteiro fino): Tinta varre a partir do lado de entrada (`scaleX`, 0.6s, expo out), círculo vira branco com ícone vermelho e gira -12°. Um brilho diagonal atravessa o botão a cada 5.5s. Os CTAs principais são magnéticos (seguem o ponteiro); o do hero dá duas batidas no ícone depois que o hero monta.
- **Contorno:** branco 55% com desfoque 8px e anel interno 1.5px Tinta; varredura Tinta, texto Branco.
- **Claro (sobre escuro ou vermelho):** Branco, texto Tinta, ícone em círculo Vermelho; varredura Vermelha.
- **Clique:** onda circular a partir do ponto tocado (0.65s). **Ativo:** escala 0.97. **Foco:** anel Vermelho 2.5px, offset 3px.
- **Link-seta:** texto 750 em Vermelho-Texto com sublinhado de 2px que cresce da esquerda e seta que avança 4px.

### Chips
- **Atalhos do hero:** pílula 44px, branco 72% com desfoque, mini-coração do símbolo à esquerda que gira -12° no hover.
- **Fichas (formulário):** pílula 48px, branco 88% com anel 1px; selecionada vira Tinta; pressão 0.95.
- **Abas de unidade:** pílula 48px, branco 78%; um indicador Tinta desliza até a aba selecionada (texto Branco).
- **Chips de vidro do hero:** status aberto (ponto verde pulsando), resultados (ícone em círculo vermelho), "25 anos" (número em Vermelho-Texto).
- **Selo de código:** etiqueta vermelha de raio 10px com texto branco 800, para o código da unidade.

### Cards / Containers
- **Corner Style:** 28px; mapa e mídias internas 20px.
- **Background:** vidro claro (gradiente branco 90%→66% com reflexo superior, blur 18px, saturate 150%); no grafite, branco 7%→2% com borda branca 9%.
- **Shadow Strategy:** Vidro em repouso / Vidro aceso.
- **Border:** 1px branco 95%.
- **Internal Padding:** 20–44px (clamp em formulário, campanha e unidade).
- **Listas internas:** itens separados por divisores `linha`, nunca caixas aninhadas (canais, fatos, especialidades, FAQ).
- **Cartão de resultados:** o único cartão vermelho: gradiente radial do Vermelho Aceso ao vermelho escurecido, ondas brancas a 14% deslizando, seta grande que avança no hover.
- **Portas (Três cuidados):** linha de vidro com pétala-ícone do coração do serviço, título e seta; ao apontar, o coração correspondente acende no símbolo grande e os outros esmaecem.

### Inputs / Fields
- **Style:** 58px de altura, raio 16px, borda 1px tinta 15%, fundo branco 88%, ícone à esquerda em Tinta Clara; busca em pílula de 62px.
- **Rótulo flutuante:** o rótulo mora dentro da caixa (`campo--flutua`), no lugar do placeholder; ao focar ou preencher sobe e encolhe para 78% no topo da caixa. Selects e data usam `campo--fixo`, com o rótulo sempre no alto.
- **Hover:** borda tinta 30%.
- **Focus:** fundo branco, borda Vermelha, halo `0 0 0 5px` vermelho 14%, ícone em Vermelho-Texto com escala 1.1–1.12.
- **Error:** borda Erro, fundo #FFF6F5. **Válido:** selo circular Ok com check à direita.

### Navigation
- **Desktop:** barra transparente que, ao rolar, se contrai (1320 → 1180px, 0.8s) numa pílula de vidro branco. Links em pílula 42px, peso 650, Tinta Média; um destaque deslizante segue o hover (tinta 6%) e marca a seção atual em Tinta com texto Branco. Esconde ao descer, volta ao subir; barra de progresso Vermelha de 3px no topo.
- **Celular (<1180px):** botão circular Tinta de 52px; o menu abre num recorte circular a partir do botão, sobre o chão com brilho vermelho; links grandes (800) com divisores e seta vermelha.
- **Contato rápido:** botão WhatsApp flutuante em pílula verde (64px) que revela "Agendar" no hover; abaixo de 760px, barra inferior de vidro com WhatsApp e Ligar.

### Símbolo dos três corações (assinatura)
Três símbolos SVG separados (esquerda cinza, topo vermelho, direita prata) compõem o logo. Na abertura (uma vez por sessão) os corações chegam e se montam com uma luz vermelha crescendo atrás; em Três cuidados cada serviço acende o seu coração; nos atalhos e na faixa aparecem como mini-corações (na faixa, o coração vermelho vira branco).

### Faixa da fachada (assinatura)
A faixa vermelha da fachada como letreiro corrido: inclinada -2°, texto branco 800 com mini-símbolos, anda com a rolagem, acelera com a velocidade e inverte com a direção.

### Fundo vivo (assinatura)
WebGL puro, fixo atrás da página: linhas de onda dos painéis da recepção que ondulam com tempo, rolagem e cursor, sobre uma luz macia que deriva (fbm) e uma segunda camada de linhas finas que anda mais devagar (profundidade); de vez em quando um pulso vermelho corre por uma das linhas. O tom vermelho só acompanha um ponteiro fino; no toque as ondas ficam cinzas, e abaixo de 760px o traço cai para 55%. Sem WebGL (ou `.leve`), um padrão SVG estático de ondas a 6% fica no lugar.

### Centro de Imagem (assinatura)
Capítulo grafite calmo: uma luz vermelha distante no canto e um brilho prata no canto oposto, sem grade. A foto da sala fica numa moldura de vidro escuro (28px, com a foto num recorte de 20px, grão fino por cima e um leve "respirar" de zoom), com a legenda da sala e o número numa barra de vidro. Ao lado, a ficha do exame: ícone vermelho em quadrado arredondado, selo ("Sem radiação", "Baixa dose"), título, descrição, três blocos com ícone (indicado para, duração, antes do exame), o botão de agendar e o link "Dúvidas sobre o preparo?". Abas em pílula com um realce branco que desliza até a sala atual. No desktop, um shader WebGL faz a sala nova entrar como uma folha por cima da anterior, pelo lado para onde se rola: borda nítida com sombra macia, a foto desliza só 30% por dentro (paralaxe) e assenta com leve recuo de zoom, a antiga recua e escurece (1,2 s, power3.inOut). Pedidos no meio da passagem entram em fila (a atual acelera), então a imagem nunca pula. Texturas com mipmap (WebGL2, ou redesenhadas em 2048×1024 no WebGL1) para não cintilar.

### Pulso e riscos
O painel do paciente é um monitor multiparâmetro em canvas: tela grafite com papel milimetrado vermelho, ECG PQRST (soma de cinco gaussianas, ritmo levemente variável a cada batida), curva de oximetria (Pleth) com entalhe dicrótico, feixe que varre, apaga à frente e deixa rastro que esmaece, e coluna de números com FC (o coração bate no pico R) e SpO₂. O mesmo traço corre como faixa fina no pé do hero (só ≥1025px) e no topo do rodapé. O risco vermelho feito à mão sublinha só duas expressões: a palavra que gira no hero e "mesmo lugar." em Três cuidados.

### Moldura de foto (Sobre)
Passe-partout branco de 8px, foto num recorte de 20px, grão fino e degradê escuro embaixo; legenda numa pílula de vidro escuro com ícone num círculo vermelho; na fachada, um selo branco "25+ anos de cuidado". Vídeo (8 colunas) e sala de espera (4) têm a mesma altura.

### Vídeo
O vídeo da clínica (720p, 11 MB) roda sozinho, mudo e em loop, só enquanto está visível; um botão de vidro liga o som. Com movimento reduzido, não toca sozinho e ganha os controles.

### Dúvidas frequentes
Perguntas agrupadas em "Agendamento e atendimento" e "Exames e resultados", cada grupo num cartão de vidro com divisores; ao lado, fixo no desktop, um cartão "Ainda ficou com dúvida?" com WhatsApp e telefone (no celular, depois das perguntas).

### Rodapé
Grafite com o símbolo, o wordmark em Noto Serif, Instagram e três colunas de links (Navegue, Para você, Parceiros); links externos levam a seta presa à última palavra. Fecha só com o copyright, sem crédito de desenvolvedor nem wordmark gigante.

### Selos, ícones e efeitos de texto
Cada seção abre com um selo: ícone num círculo branco (pulsando em anel vermelho) que entra girando, rótulo em versalete vermelho que se decifra letra a letra e um traço que cresce. As 18 especialidades têm ícones próprios (traço 1.8px, círculo cinza que fica vermelho no hover). A palavra-chave em vermelho (o "saúde." do hero e o "mesmo lugar.") recebe um reflexo que passa a cada 6s. Os textos de apoio sobem linha a linha; as fotos abrem como cortina que se afasta das bordas; os ícones de dentro das caixas chegam com um pulo depois da caixa.

### Fotos
Tiradas do vídeo original em 1080p: para cada foto, o quadro certo é achado por correspondência de imagem, sete quadros vizinhos são alinhados e fundidos (tira o ruído de compressão), e depois vêm contraste local e nitidez. Exames em 1440×1080 e 960×720 (4:3), com srcset.

### Motion
GSAP + ScrollTrigger + SplitText, rolagem suave com Lenis. Títulos revelam palavra a palavra de dentro de máscaras de linha; a declaração do "sobre" acende palavra a palavra; o título de cada sala de exame entra letra a letra saindo do desfoque. Fotos em paralaxe, cartões inclinam sob o cursor. Abertura só na primeira visita da sessão (sessionStorage), nunca com âncora na URL nem com movimento reduzido. Ease padrão `cubic-bezier(.16, 1, .3, 1)`; `cubic-bezier(.77, 0, .175, 1)` no recorte do menu. Anéis pulsantes (2.8s) no logo do hero, no vídeo e no WhatsApp. `.leve` (≤4 núcleos, ≤4 GB, economia de dados, rede 2G ou `?leve=1`) desliga blur, WebGL, Lenis, paralaxe e o palco fixado. Além disso, uma sonda mede 3 s de quadros reais depois da abertura: abaixo de 40 fps a página liga `.leve` na hora (sem desfoque de vidro, grão, brilhos de traçado e animações de repintura), corta o fundo animado pela metade (ou o para, abaixo de 24 fps), desenha o ECG a cada dois quadros e guarda a decisão na sessão. O fundo também para quando o centro de imagem ou o rodapé cobrem a tela inteira. Com economia de dados, o vídeo não toca sozinho. Telas de notebook baixas (≤860px de altura) ganham um palco de exames compacto. Com `prefers-reduced-motion`: sem animações, transições a 1ms; sem JS todo o conteúdo fica visível.

## Do's and Don'ts

### Do:
- **Do** usar vidro branco como a matéria de toda caixa, com a luz vermelha do cursor no preenchimento e na borda.
- **Do** emoldurar toda foto real da clínica em pétala, com anel branco e sombra quente.
- **Do** passar toda cor de marca pelas variáveis (`--vermelho*`, `--sym-*`, `--wordmark`) para que o Outubro Rosa troque tudo num interruptor.
- **Do** usar `vermelho-texto` (#B51D23) para qualquer vermelho em texto sobre claro.
- **Do** manter a escada de raios 28 / 20 / 16 / pílula.
- **Do** usar `padding-block: var(--secao)` em toda seção nova.
- **Do** separar itens dentro de um cartão com divisores `linha`, não com caixas internas.
- **Do** dar a cada efeito um caminho estático equivalente (reduced-motion, sem JS e `.leve`).
- **Do** deixar o WhatsApp a um toque em toda tela (botão flutuante ou barra móvel).

### Don't:
- **Don't** trazer de volta a linguagem da v1: placas de sinalização chapadas como sistema de cartões e seções.
- **Don't** usar tema azul-marinho ou fundo escuro além do capítulo grafite (Centro de Imagem) e do rodapé.
- **Don't** usar rosa fora da classe `.rosa` da campanha.
- **Don't** colocar cartões de avaliação do Google ou notas embutidas.
- **Don't** afirmar número de especialidades ("50 especialidades") sem confirmação da clínica.
- **Don't** usar `vermelho` ou `vermelho-claro` como cor de texto sobre fundo claro.
- **Don't** colocar sobretítulos ou eyebrows acima de títulos.
- **Don't** usar o risco feito à mão em mais palavras; ele marca só as duas ideias centrais.
- **Don't** aninhar vidro dentro de vidro ou usar sombras duras deslocadas.
