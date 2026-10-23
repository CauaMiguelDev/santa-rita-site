# Clínica Santa Rita — site

Site institucional da Clínica Santa Rita, policlínica com laboratório próprio e centro de diagnóstico por imagem em Taguatinga (DF), com unidades em Águas Lindas, Riacho Fundo, Santo Antônio do Descoberto e Sobradinho.

HTML, CSS e JavaScript estáticos, sem build. Animações com GSAP (ScrollTrigger e SplitText) e rolagem suave com Lenis, todos em `assets/vendor/`. O fundo animado, o visor do centro de imagem e os monitores de ECG são WebGL e canvas puros.

## Rodar localmente

```bash
python -m http.server 8080
```

Depois abra http://localhost:8080.

## Publicar

Suba para a pasta `/site/` do servidor:

- `index.html`
- `assets/` (css, js, vendor, fonts, img/novo, video)

Os formulários enviam para `forms/contato.php` e `forms/contact.php`, que já existem no servidor.

## Ajustes rápidos

- **Outubro Rosa:** em `index.html`, `data-campanha="off"` desliga; `"auto"` liga sozinho em outubro; `"rosa"` força.
- **Modo leve:** aparelhos fracos, economia de dados ou rede 2G recebem a versão leve; o site também mede os quadros reais e alivia sozinho. Para testar: `?leve=1` força, `?leve=0` desliga.
- **Versões dos arquivos:** ao alterar `site.css` ou `site.js`, aumente o `?v=` nos links do `index.html` para o navegador não usar a cópia antiga.

Direção de design em `DESIGN.md`; contexto do projeto em `PRODUCT.md`.
