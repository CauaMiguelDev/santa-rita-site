# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/JS, drop-in replacement for `https://clinicasantarita.com.br/site/index.html`. No build step, no jQuery. Motion libraries are self-hosted in `assets/vendor/` (GSAP 3.13, ScrollTrigger, SplitText, Lenis, the same set as the partner site Cemtra); the animated background is raw WebGL (no Three.js). Must keep the server's existing relative paths working: `assets/img/…`, `videos/Rita.mp4`, `rosa.jpg`, `forms/contato.php` (pré-agendamento, plain POST) and `forms/contact.php` (contact, AJAX via the old php-email-form contract: response body `OK` = success).

## Users

Patients from the Distrito Federal and entorno (Taguatinga, Águas Lindas, Riacho Fundo, Santo Antônio do Descoberto, Sobradinho), mostly on phones, often arriving to book a consultation or imaging exam, check lab results, or find the nearest unit. Wide age range, including older patients; many prefer WhatsApp or a phone call over forms.

## Product Purpose

Policlínica with 25+ years: medical consultations across many specialties, own laboratory, specialized radiology center (ressonância, tomografia, ultrassonografia, densitometria, mamografia digital), cardiology exams (ECG, espirometria, MAPA/Holter), exame toxicológico, convênios. Success = the visitor books via WhatsApp (61) 3355-1107 or calls (61) 3355-1105 within seconds, or reaches results / patient panel.

## Positioning

Everything health-related in one place, close to home: consultations + own lab + imaging center in the same network of 5 units across DF and entorno.

## Operating Context

- Primary action: WhatsApp booking (61) 3355-1107. Secondary: call (61) 3355-1105, pré-agendamento form.
- External destinations: lab results `https://www.rico.uniexames.com.br/logins/login`, patient panel `https://clinicasantarita.com.br/exames/painel_paciente.php`, Medicina do Trabalho `https://cemtradf.com.br/`, Trabalhe Conosco `https://clinicasantarita.com.br/tcn/trabalhe-conosco.html`.
- Hours: seg–sex 07:00–18:00 in Taguatinga; other units close at 17:00.
- Units: Matriz Taguatinga (QND 47, lote 10, Taguatinga Norte), Águas Lindas (Quadra 39, lote 16, Av. Jardim Brasília; WhatsApp 61 99258-1800), Riacho Fundo (CLN 07, Bloco F, Lote 01/02; 61 99288-9508), Santo Antônio do Descoberto (Quadra 56 lote 16, Centro; 61 99258-2301), Sobradinho 1 (Quadra 10, Área 01, Lojas 03, 04 e 05, per the clinic's Google listing; WhatsApp 61 99253-4533).
- Emails: ouvidoria@clinicasantarita.com.br, gerencia@clinicasantarita.com.br. Instagram: @clinicasantaritadf.
- Seasonal campaigns (Outubro Rosa) run on top of the base identity and must be removable in one switch.

## Capabilities and Constraints

- Partners: Clínica Cemtra, Grupo ConSaúde.
- Open decision: the old copy says both "mais de 30 especialidades" and "mais de 50 especialidades"; the client must confirm the number. Until then the site states no number.
- No real newsletter backend exists; do not ship a newsletter form.
- `videos/Rita.mp4` is 141 MB; must never autoplay on load.
- Facebook / X / LinkedIn links in the old site all pointed to Instagram; only Instagram is confirmed.

## Brand Commitments

- Base identity (facade signage, `assets/img/logo.png`): red heart over silver/grey tri-petal symbol; serif wordmark "Clínica.Santa.Rita" with red dots as separators; tagline "Cuidando da sua saúde"; red band carrying "Consultas · Laboratório · Imagem · Tel 3355-1105".
- Outubro Rosa campaign identity (`assets/img/logo_rosa.jpg`): same symbol in purple/violet/pink, wordmark in pink. Switched off for now by the user (`data-campanha="off"`).
- The user pinned the site palette to the facade: red, gray and white. Pink is campaign-only; navy or dark-navy themes were rejected.
- The user wants the partner site Cemtra (https://cauamigueldev.github.io/cemtra-site/, source in ../Cemtra) as the method reference: animated background, scroll animations, animated text, animated buttons, rich cards.

## Evidence on Hand

- Real photos: `assets/img/slide/RNM_PC.jpeg` (Siemens Magnetom MRI room), `assets/img/slide/TOMO_PC.jpeg` (CT room), `assets/img/about.png` (Taguatinga facade), `rosa.jpg` (Outubro Rosa campaign art).
- `videos/Rita.mp4` (90 s, 1080p, 141 MB) is real footage of the clinic: drone of the facade, reception with the 3D logo wall, waiting room, lab, consulting rooms, MRI, CT, mammography, ultrasound, densitometry, X-ray. Frames extracted from it live in `assets/img/novo/` with provenance embedded.
- Stock photos: exam images `Rnm.jpg`, `Eco.jpg`, `DO.jpg`, `MAMA.jpg`, `TOMO.jpg`; gallery-1..8 (several show surgery and COVID imagery that does not represent the clinic).
- No testimonials, ratings, doctor names, or prices on hand; do not fabricate them.

## Product Principles

1. Booking is one tap away from every screen.
2. Real place over stock promise: show the clinic's own rooms and facade first.
3. Plain Portuguese a 70-year-old patient reads without effort.
4. Campaigns decorate; they never replace the base identity or block the content.

## Accessibility & Inclusion

Older patients and low-end Android phones on mobile data: large tap targets, high contrast, readable body size, light page weight, reduced-motion respected.
