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
- **Centro de diagnóstico por imagem:** vitrine com as cinco salas lado a lado (ressonância, tomografia, mamografia, ultrassom e densitometria); a sala escolhida se abre e a ficha mostra indicação, duração e preparo. No celular vira acordeão.
- **Quem somos:** fachada, fatos da clínica, vídeo em loop (com botão de som) e sala de espera.
- **Pré-agendamento:** formulário com rótulos flutuantes e validação.
- **Unidades:** abas com endereço, horário, telefone e mapa de cada unidade.
- **Dúvidas frequentes:** dez perguntas em dois grupos e atalho para o WhatsApp.
- **Fale com a gente:** telefone, gerência, ouvidoria e formulário de mensagem.

## Como é feito

HTML, CSS e JavaScript estáticos, sem build. Visual limpo e sóbrio, com animações discretas em GSAP (ScrollTrigger e SplitText) e rolagem suave com Lenis, todos em `assets/vendor/`. O monitor de ECG do painel do paciente é canvas. Fontes próprias (Atkinson Hyperlegible Next e Noto Serif no logotipo) em `assets/fonts/`.

- **Responsivo:** conferido de 320 a 1920 px de largura, incluindo notebooks de tela baixa (1280×720 e 1366×768).
- **Modo leve:** aparelhos fracos, economia de dados ou rede 2G recebem uma versão mais leve. O site também mede os quadros reais depois de abrir e se alivia sozinho se estiver lento. Para testar: `?leve=1` força o modo leve, `?leve=0` desliga.
- **Acessibilidade:** respeita "reduzir movimento" do sistema e todo o conteúdo aparece mesmo sem JavaScript.
- **Fotos:** tiradas do vídeo original da clínica em 1080p, com vários quadros fundidos para tirar o ruído de compressão.

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
