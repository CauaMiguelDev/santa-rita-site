# Clínica Santa Rita — site

**No ar:** https://cauamigueldev.github.io/santa-rita-site/

Site institucional da Clínica Santa Rita, policlínica com laboratório próprio e centro de diagnóstico por imagem. A matriz fica em Taguatinga (DF) e há unidades em Águas Lindas, Riacho Fundo, Santo Antônio do Descoberto e Sobradinho. Atendimento de segunda a sexta: Taguatinga das 7h às 18h, as demais unidades até as 17h.

- WhatsApp para agendamento: (61) 3355-1107
- Telefone: (61) 3355-1105
- Instagram: [@clinicasantaritadf](https://www.instagram.com/clinicasantaritadf/)

## O que tem na página

- **Início:** chamada para agendar pelo WhatsApp e status de aberto/fechado em tempo real.
- **Consulta, laboratório e imagem:** os três serviços no mesmo endereço, com o símbolo dos três corações acendendo o serviço escolhido.
- **Especialidades:** 18 especialidades com ícones próprios e busca; cada uma abre o WhatsApp com o pedido já escrito.
- **Laboratório:** resultados online, painel do paciente com monitor de ECG e oximetria, exame toxicológico e convênios.
- **Centro de diagnóstico por imagem:** cinco cartões (ressonância, tomografia, mamografia, ultrassom e densitometria) com foto da sala, indicação, duração, preparo e link para agendar, mais um cartão com os outros exames.
- **Quem somos:** fachada, fatos da clínica, vídeo em loop (com botão de som) e sala de espera.
- **Pré-agendamento:** formulário com rótulos flutuantes e validação.
- **Unidades:** abas com endereço, horário, telefone e mapa de cada unidade.
- **Dúvidas frequentes:** dez perguntas em dois grupos e atalho para o WhatsApp.
- **Fale com a gente:** telefone, gerência, ouvidoria e formulário de mensagem.

## Como é feito

HTML, CSS e JavaScript estáticos, sem build. Direção visual **Luz de Brasília**: a clínica como um prédio de luz, inspirado nos hospitais da Rede Sarah, de Lelé. Concreto branco, janelas com o alto curvo, faixas de luz zenital e o perfil dos telhados em shed. Animações em GSAP (ScrollTrigger e SplitText) e rolagem suave com Lenis, todos em `assets/vendor/`. Fontes próprias (Atkinson Hyperlegible Next e Noto Serif no logotipo) em `assets/fonts/`.

- **Hero (método da Cemtra):** os três corações do símbolo chegam de três lados e se juntam atrás da sala de ressonância em arco. O título sobe de uma máscara e a última palavra passa por consulta, coleta e ressonância, fazendo bater o coração de cada cuidado, até parar em "mensagem". Depois, os selos flutuam e o palco segue o cursor. Nada no hero depende da rolagem.
- **Botões:** a cor varre a partir do lado em que o cursor entra, o rótulo rola para cima, o botão segue o cursor de leve e o WhatsApp principal chama com um anel.
- **Fundo de luz:** um shader WebGL desenha faixas de sol diagonais que derivam devagar. Roda em meia resolução e até 30 quadros. Sem WebGL, o CSS mostra o mesmo desenho parado.
- **Efeitos:** os títulos sobem palavra por palavra e uma faixa de luz passa por cima. As caixas recebem a faixa de sol no hover. As fotos entram com zoom e o perfil dos sheds se desenha entre os capítulos.
- **Unidade lembrada:** a unidade escolhida fica marcada quando o visitante volta.
- **Responsivo:** conferido de 320 a 1920 px de largura, incluindo notebooks de tela baixa (1280×720 e 1366×768).
- **Modo leve:** aparelhos fracos, economia de dados ou rede 2G recebem uma versão sem fundo animado. O fundo também mede os quadros reais depois de abrir e para sozinho se estiver lento. Para testar: `?leve=1` força o modo leve, `?leve=0` desliga.
- **Acessibilidade:** respeita "reduzir movimento" do sistema e todo o conteúdo aparece mesmo sem JavaScript.
- **Fotos:** tiradas do vídeo original da clínica em 1080p, com vários quadros fundidos para tirar o ruído de compressão e um tratamento de cor de luz do dia.

## Rodar localmente

```bash
python -m http.server 8080
```

Depois abra http://localhost:8080.

## Publicar

**GitHub Pages:** cada `git push` na `main` atualiza o link acima em um ou dois minutos. Ali os formulários de pré-agendamento e de contato não enviam, porque dependem dos arquivos PHP do servidor da clínica; WhatsApp, telefone e mapas funcionam normalmente.

**Servidor da clínica:** suba para a pasta `/site/`:

- `index.html`
- `assets/` (css, js, vendor, fonts, img/novo, video)

Os formulários enviam para `forms/contato.php` e `forms/contact.php`, que já existem no servidor.

## Ajustes rápidos

- **Outubro Rosa:** em `index.html`, `data-campanha="off"` desliga; `"auto"` liga sozinho em outubro; `"rosa"` força.
- **Versões dos arquivos:** ao alterar `site.css` ou `site.js`, aumente o `?v=` nos links do `index.html` para o navegador não usar a cópia antiga.

Direção de design em `DESIGN.md`; contexto do projeto em `PRODUCT.md`.
