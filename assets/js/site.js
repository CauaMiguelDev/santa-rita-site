(() => {
  'use strict';
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const html = document.documentElement;
  const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const leve = html.classList.contains('leve');
  const fino = matchMedia('(hover: hover) and (pointer: fine)').matches && !leve;
  const temGsap = !!(window.gsap && window.ScrollTrigger);
  const WA = '556133551107';
  const waLink = (num, msg) => `https://wa.me/${num}?text=${encodeURIComponent(msg)}`;

  /* =========================================================
     DADOS
     ========================================================= */
  const UNIDADES = [
    { id: 'tag', lat: -15.8044, lng: -48.0669, nome: 'Taguatinga Norte', curto: 'Taguatinga', selo: 'Matriz', codigo: 'QND 47', end: 'Lote 10, Taguatinga Norte, Brasília-DF',
      hora: 'Seg a sex, 7h às 18h', tel: '+556133551105', fone: '(61) 3355-1105',
      rota: 'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica%20Santa%20Rita%20QND%2047%20Lote%2010%20Taguatinga%20Norte%20Bras%C3%ADlia',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('-15.8044546,-48.0669338') + '&z=16&hl=pt-BR&output=embed' },
    { id: 'agl', lat: -15.7224, lng: -48.2880, nome: 'Águas Lindas de Goiás', curto: 'Águas Lindas', codigo: 'Quadra 39', end: 'Lote 16, Av. Jardim Brasília, Águas Lindas de Goiás-GO',
      hora: 'Seg a sex, 7h às 17h', wa: '5561992581800', fone: '(61) 99258-1800',
      rota: 'https://maps.app.goo.gl/fxjeTxy9A7zMZPn46',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('-15.7224299,-48.2879671') + '&z=16&hl=pt-BR&output=embed' },
    { id: 'rf', lat: -15.8810, lng: -48.0180, nome: 'Riacho Fundo', codigo: 'CLN 07', end: 'Bloco F, Lote 01/02, Riacho Fundo-DF',
      hora: 'Seg a sex, 7h às 17h', wa: '5561992889508', fone: '(61) 99288-9508',
      rota: 'https://maps.app.goo.gl/HZ3EsojS985XRf58A',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('CLN 7 Bloco F, Riacho Fundo, Brasília - DF') + '&z=16&hl=pt-BR&output=embed' },
    { id: 'sad', lat: -15.9460, lng: -48.2653, nome: 'Santo Antônio do Descoberto', curto: 'Santo Antônio', codigo: 'Quadra 56', end: 'Lote 16, Centro, Santo Antônio do Descoberto-GO',
      hora: 'Seg a sex, 7h às 17h', wa: '5561992582301', fone: '(61) 99258-2301',
      rota: 'https://maps.app.goo.gl/hwdCSNE7oAck1Nwp8',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('-15.9460449,-48.2653426') + '&z=16&hl=pt-BR&output=embed' },
    { id: 'sob', lat: -15.6444, lng: -47.7933, nome: 'Sobradinho 1', curto: 'Sobradinho', codigo: 'Quadra 10', end: 'Área 01, Lojas 03, 04 e 05, Sobradinho-DF',
      hora: 'Seg a sex, 7h às 17h', wa: '5561992534533', fone: '(61) 99253-4533',
      rota: 'https://maps.app.goo.gl/ycBaumqh7qRLPnGV6',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('-15.6444156,-47.7932658') + '&z=16&hl=pt-BR&output=embed' }
  ];

  /* =========================================================
     BÁSICO (funciona sem bibliotecas)
     ========================================================= */
  $$('[data-ano]').forEach(el => { el.textContent = new Date().getFullYear(); });

  // aberto / fechado pela hora de Brasília (matriz: seg a sex, 7h às 18h)
  const status = () => {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Sao_Paulo', weekday: 'short', hour: 'numeric', minute: 'numeric', hourCycle: 'h23'
    }).formatToParts(new Date()).map(x => [x.type, x.value]));
    const dia = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(p.weekday);
    const min = +p.hour * 60 + +p.minute;
    const util = dia >= 1 && dia <= 5;
    if (util && min >= 420 && min < 1080) return { aberto: true, txt: 'Aberto agora, até 18h' };
    if (util && min < 420) return { aberto: false, txt: 'Fechado, abre hoje às 7h' };
    if (dia >= 1 && dia <= 4) return { aberto: false, txt: 'Fechado, abre amanhã às 7h' };
    return { aberto: false, txt: 'Fechado, abre segunda às 7h' };
  };
  const pintaStatus = () => {
    const s = status();
    $$('[data-status]').forEach(el => { el.textContent = s.txt; el.classList.toggle('aberto', s.aberto); });
  };
  pintaStatus();
  setInterval(pintaStatus, 60000);

  /* ---------- botões: o rótulo ganha uma cópia logo abaixo para rolar no hover ---------- */
  $$('.botao').forEach(b => {
    const nos = [...b.childNodes].filter(n => n.nodeType === 1 ? !n.matches('svg, .botao__ico') : n.textContent.trim());
    if (!nos.length) return;
    const rotulo = document.createElement('span'), rolo = document.createElement('span');
    rotulo.className = 'botao__rotulo'; rolo.className = 'botao__rolo';
    rotulo.append(rolo);
    b.insertBefore(rotulo, nos[0]);
    rolo.append(...nos);
    // a cor entra pelo lado em que o cursor chegou e sai pelo lado em que ele foi embora
    if (fino) ['pointerenter', 'pointerleave'].forEach(t => b.addEventListener(t, e => {
      const r = b.getBoundingClientRect();
      b.style.setProperty('--origem', e.clientX - r.left < r.width / 2 ? 'left center' : 'right center');
    }));
  });

  /* ---------- a luz segue o cursor: nas caixas, no céu da noite e no rodapé ---------- */
  if (fino) {
    $$('[data-card]').forEach(c => c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      c.style.setProperty('--mx', `${e.clientX - r.left}px`);
      c.style.setProperty('--my', `${e.clientY - r.top}px`);
    }, { passive: true }));
    [['[data-noite]', '[data-ceu]'], ['[data-rodape]', '[data-rodape-luz]']].forEach(([a, l]) => {
      const area = $(a), luzA = $(l);
      if (!area || !luzA || reduz) return;
      let ultimo = null;
      area.addEventListener('pointermove', e => {
        if (!ultimo) requestAnimationFrame(() => {
          const r = area.getBoundingClientRect();
          luzA.style.setProperty('--dx', `${ultimo.clientX - r.left}px`);
          luzA.style.setProperty('--dy', `${ultimo.clientY - r.top}px`);
          ultimo = null;
        });
        ultimo = e;
      }, { passive: true });
    });
  }

  /* ---------- especialidades: busca que entende o paciente ---------- */
  const CHAVES = {
    Alergologia: 'alergia rinite asma coceira',
    Angiologia: 'veia varizes circulacao perna',
    Cardiologia: 'coracao pressao arritmia infarto peito',
    'Clínica Médica': 'clinico geral check up rotina adulto',
    Dermatologia: 'pele mancha acne cabelo unha',
    Endocrinologia: 'diabetes tireoide hormonio peso',
    Gastroenterologia: 'estomago intestino figado azia barriga',
    Ginecologia: 'mulher preventivo papanicolau menstruacao',
    Infectologia: 'infeccao virus febre',
    Mastologia: 'mama seio outubro rosa',
    Neurologia: 'cabeca enxaqueca dor de cabeca memoria nervo',
    Nutrição: 'dieta alimentacao emagrecer peso',
    Ortopedia: 'osso coluna joelho fratura ombro',
    Otorrinolaringologia: 'ouvido nariz garganta sinusite',
    Pneumologia: 'pulmao respiracao falta de ar tosse',
    Psiquiatria: 'ansiedade depressao mental sono',
    Reumatologia: 'artrite dor nas juntas lupus',
    Urologia: 'urina rim prostata'
  };
  const normaliza = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
  const busca = $('[data-busca]');
  if (busca) {
    const itens = $$('[data-esp-lista] li').map(li => {
      const nome = $('.esp__nome', li).firstChild.textContent.trim();
      return { li, alvo: normaliza(li.textContent + ' ' + (CHAVES[nome] || '')) };
    });
    const vazio = $('[data-esp-vazio]'), pergunta = $('[data-esp-pergunta]');
    busca.addEventListener('input', () => {
      const q = normaliza(busca.value);
      let n = 0;
      itens.forEach(({ li, alvo }) => { const ok = !q || alvo.includes(q); li.hidden = !ok; n += ok; });
      vazio.hidden = n > 0;
      if (!n) pergunta.href = waLink(WA, `Olá! Gostaria de agendar uma consulta de ${busca.value.trim()}.`);
      if (temGsap && !reduz) gsap.fromTo(itens.filter(i => !i.li.hidden).map(i => i.li), { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: .45, stagger: .015, ease: 'expo.out', overwrite: true });
    });
    // o placeholder digita sugestões até a pessoa tocar no campo
    if (!reduz) {
      const ideias = ['cardiologia', 'pele', 'coração', 'diabetes', 'ginecologia', 'coluna'];
      let i = 0, k = 0, apaga = false, parado = false;
      const passo = () => {
        if (parado) return;
        const w = ideias[i];
        k += apaga ? -1 : 1;
        busca.placeholder = `Busque: ${w.slice(0, k)}${apaga || k < w.length ? '' : '…'}`;
        let t = apaga ? 35 : 85;
        if (!apaga && k === w.length) { apaga = true; t = 1500; }
        else if (apaga && k === 0) { apaga = false; i = (i + 1) % ideias.length; t = 300; }
        setTimeout(passo, t);
      };
      new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); setTimeout(passo, 600); } }).observe(busca);
      busca.addEventListener('focus', () => { parado = true; busca.placeholder = 'Digite a especialidade ou o que sente'; });
    }
  }

  /* ---------- três cuidados: o cartão acende o seu coração ---------- */
  const cuidados = $('[data-cuidados]');
  if (cuidados) {
    const acende = id => { if (id) cuidados.dataset.ativo = id; else delete cuidados.dataset.ativo; };
    $$('[data-porta]', cuidados).forEach(p => {
      p.addEventListener('pointerenter', () => acende(p.dataset.porta));
      p.addEventListener('focus', () => acende(p.dataset.porta));
      p.addEventListener('blur', () => acende(null));
    });
    $('.cuidados__lista', cuidados).addEventListener('pointerleave', () => acende(null));
    // no toque, acende o cartão que passa pelo meio da tela
    if (!fino) {
      const io = new IntersectionObserver(ents => ents.forEach(e => { if (e.isIntersecting) acende(e.target.dataset.porta); }), { rootMargin: '-45% 0px -45% 0px' });
      $$('[data-porta]', cuidados).forEach(p => io.observe(p));
    }
  }

  /* ---------- unidades: abas, painel e mapa ---------- */
  const abas = $('[data-abas]');
  const painelU = $('[data-unidade]');
  if (abas && painelU) {
    UNIDADES.forEach((u, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'aba'; b.id = `aba-${u.id}`;
      b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', 'unidade-painel');
      b.setAttribute('aria-selected', i === 0); b.tabIndex = i === 0 ? 0 : -1;
      b.dataset.u = u.id; b.textContent = u.curto || u.nome;
      abas.appendChild(b);
    });
    // a luz da aba selecionada desliza até a nova escolha
    const luzAba = document.createElement('span');
    luzAba.className = 'abas__luz';
    luzAba.setAttribute('aria-hidden', 'true');
    abas.prepend(luzAba);
    abas.classList.add('com-luz');
    const moveLuz = () => {
      const b = $('.aba[aria-selected="true"]', abas);
      if (!b) return;
      luzAba.style.width = `${b.offsetWidth}px`;
      luzAba.style.height = `${b.offsetHeight}px`;
      luzAba.style.transform = `translate(${b.offsetLeft}px, ${b.offsetTop}px)`;
    };
    requestAnimationFrame(moveLuz);
    addEventListener('resize', moveLuz, { passive: true });
    document.fonts && document.fonts.ready.then(moveLuz);
    /* mapa ilustrado do DF: as rotas saem da matriz em Taguatinga até cada unidade */
    const mapaDF = $('[data-mapa-df]'), pinos = $('[data-pinos]');
    if (mapaDF && pinos) {
      const proj = (lat, lng) => [(lng + 48.42) / 1.14 * 1000, (-15.42 - lat) / 0.70 * 600];
      const VB = { x: 30, y: 110, w: 760, h: 440 };
      const NS = 'http://www.w3.org/2000/svg';
      const el = (tag, at) => { const n = document.createElementNS(NS, tag); for (const k in at) n.setAttribute(k, at[k]); mapaDF.appendChild(n); return n; };
      mapaDF.setAttribute('viewBox', `${VB.x} ${VB.y} ${VB.w} ${VB.h}`);
      el('path', { d: 'M118 69H974V540H281L158 394L118 240Z', class: 'mapa-df__limite' });
      el('text', { x: 772, y: 536, 'text-anchor': 'end', class: 'mapa-df__nome' }).textContent = 'DISTRITO FEDERAL';
      el('text', { x: 44, y: 540, class: 'mapa-df__goias' }).textContent = 'GOIÁS';
      // o Lago Paranoá e o Plano Piloto (o avião de Lúcio Costa) para orientar quem olha
      el('path', { d: 'M505 250C530 238 560 250 572 268C590 290 612 300 606 322C600 345 572 352 556 372C545 386 520 384 514 368C508 350 528 336 522 318C516 300 492 292 492 274C492 262 497 254 505 250Z', class: 'mapa-df__lago' });
      el('path', { d: 'M468 255Q432 318 470 372', class: 'mapa-df__plano' });
      el('path', { d: 'M428 312L512 324', class: 'mapa-df__plano' });
      el('text', { x: 470, y: 402, 'text-anchor': 'middle', class: 'mapa-df__ref' }).textContent = 'Plano Piloto';
      const [mx, my] = proj(UNIDADES[0].lat, UNIDADES[0].lng);
      UNIDADES.forEach((u, i) => {
        const [x, y] = proj(u.lat, u.lng);
        if (i) el('path', { d: `M${mx} ${my}Q${(mx + x) / 2} ${(my + y) / 2 - 60} ${x} ${y}`, class: 'mapa-df__rota', 'data-rota': u.id, pathLength: 1 });
        const p = document.createElement('button');
        p.type = 'button'; p.className = 'pino' + (i ? '' : ' ativo'); p.dataset.u = u.id; p.tabIndex = -1;
        p.setAttribute('aria-hidden', 'true');
        p.style.left = `${(x - VB.x) / VB.w * 100}%`; p.style.top = `${(y - VB.y) / VB.h * 100}%`;
        p.innerHTML = `<span class="pino__rotulo">${u.curto || u.nome}</span><span class="pino__ponto"></span>`;
        pinos.appendChild(p);
      });
      pinos.addEventListener('click', e => { const p = e.target.closest('.pino'); if (p) seleciona(p.dataset.u); });
    }
    const mapa = $('[data-u-mapa]', painelU);
    const seleciona = (id, foca) => {
      const u = UNIDADES.find(x => x.id === id);
      if (!u) return;
      try { localStorage.setItem('sr-unidade', id); } catch (e) { /* navegação privada */ }
      $$('.aba', abas).forEach(b => { const s = b.dataset.u === id; b.setAttribute('aria-selected', s); b.tabIndex = s ? 0 : -1; if (s && foca) b.focus(); });
      moveLuz();
      if (pinos) $$('.pino', pinos).forEach(p => p.classList.toggle('ativo', p.dataset.u === id));
      if (mapaDF) $$('[data-rota]', mapaDF).forEach(r => r.classList.toggle('ativa', r.dataset.rota === id));
      painelU.setAttribute('aria-labelledby', `aba-${id}`);
      painelU.classList.add('trocando');
      setTimeout(() => {
        $('[data-u-nome]', painelU).textContent = u.nome;
        const cod = $('[data-u-codigo]', painelU);
        cod.hidden = !u.codigo;
        cod.textContent = u.codigo || '';
        $('[data-u-end]', painelU).textContent = u.end;
        $('[data-u-hora]', painelU).textContent = u.hora;
        const c = $('[data-u-contato]', painelU);
        c.href = u.tel ? `tel:${u.tel}` : waLink(u.wa, `Olá! Gostaria de agendar um horário na unidade ${u.nome} da Clínica Santa Rita.`);
        if (u.tel) { c.removeAttribute('target'); c.removeAttribute('rel'); } else { c.target = '_blank'; c.rel = 'noopener'; }
        $('[data-u-contato-ico]', painelU).setAttribute('href', u.tel ? '#i-phone' : '#i-wa');
        $('[data-u-contato-txt]', painelU).textContent = u.fone;
        $('[data-u-rota]', painelU).href = u.rota;
        if (mapa.getAttribute('src') !== u.mapa) { mapa.src = u.mapa; mapa.title = `Mapa da unidade ${u.nome} da Clínica Santa Rita`; }
        painelU.classList.remove('trocando');
      }, reduz ? 0 : 200);
    };
    abas.addEventListener('click', e => { const b = e.target.closest('.aba'); if (b) seleciona(b.dataset.u); });
    abas.addEventListener('keydown', e => {
      const lista = $$('.aba', abas), i = lista.indexOf(document.activeElement);
      if (i < 0) return;
      const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
      let alvo = d ? lista[(i + d + lista.length) % lista.length] : null;
      if (e.key === 'Home') alvo = lista[0];
      if (e.key === 'End') alvo = lista[lista.length - 1];
      if (alvo) { e.preventDefault(); seleciona(alvo.dataset.u, true); }
    });
    try {
      const guardada = localStorage.getItem('sr-unidade');
      if (guardada && guardada !== 'tag' && UNIDADES.some(u => u.id === guardada)) seleciona(guardada);
    } catch (e) { /* navegação privada */ }
  }

  /* ---------- pré-agendamento: vai para forms/contato.php como no site antigo ---------- */
  const agendar = $('#form-agendar');
  if (agendar) {
    const esp = $('#campo-especialidade'), exa = $('#campo-exame');
    const syncTipo = () => {
      const exame = agendar.elements.select.value === 'div2';
      esp.hidden = exame; exa.hidden = !exame;
      $('#especialidade').required = !exame; $('#exame').required = exame;
    };
    agendar.addEventListener('change', e => { if (e.target.name === 'select') syncTipo(); });
    syncTipo();
    const data = $('#date');
    const hoje = new Date();
    hoje.setMinutes(hoje.getMinutes() - hoje.getTimezoneOffset());
    data.min = hoje.toISOString().slice(0, 10);
    data.addEventListener('input', () => {
      const dia = data.value ? new Date(data.value + 'T12:00').getDay() : 1;
      data.setCustomValidity(dia === 0 || dia === 6 ? 'Atendemos de segunda a sexta. Escolha um dia útil.' : '');
    });
    const erro = $('#agendar-erro');
    agendar.addEventListener('submit', e => {
      if (agendar.checkValidity()) return;
      e.preventDefault();
      agendar.classList.add('was-validated');
      const primeiro = agendar.querySelector(':invalid:not(fieldset)');
      erro.textContent = primeiro.validationMessage || 'Confira os campos destacados.';
      erro.hidden = false;
      primeiro.focus();
    });
  }
  // telefone com máscara (61) 99999-9999
  const tel = $('#tel');
  if (tel) tel.addEventListener('input', () => {
    const d = tel.value.replace(/\D/g, '').slice(0, 11);
    const meio = d.length > 10 ? 7 : 6;
    tel.value = d.length > 6 ? `(${d.slice(0, 2)}) ${d.slice(2, meio)}-${d.slice(meio)}` : d.length > 2 ? `(${d.slice(0, 2)}) ${d.slice(2)}` : d;
    tel.setCustomValidity(d.length >= 10 ? '' : 'Informe o telefone com DDD.');
  });
  // selo de campo certo ao sair dele
  $$('.campo__caixa input').forEach(inp => {
    const marca = () => inp.parentElement.classList.toggle('valido', inp.value.trim() !== '' && inp.checkValidity() && inp.type !== 'date');
    inp.addEventListener('blur', marca);
    inp.addEventListener('input', () => { if (inp.parentElement.classList.contains('valido')) marca(); });
  });

  /* ---------- contato: mesmo contrato do php-email-form antigo (o servidor responde "OK") ---------- */
  const contato = $('#form-contato');
  if (contato) {
    const st = $('.formulario__status', contato);
    const env = $('button[type=submit]', contato), envTxt = $('.botao__txt', env);
    const mostra = (msg, ok) => { st.textContent = msg; st.className = 'formulario__status ' + (ok ? 'ok' : 'erro'); st.hidden = false; };
    contato.addEventListener('submit', async e => {
      e.preventDefault();
      if (!contato.checkValidity()) { contato.classList.add('was-validated'); contato.querySelector(':invalid').focus(); return; }
      env.disabled = true; envTxt.textContent = 'Enviando…';
      try {
        const r = await fetch(contato.action, { method: 'POST', body: new FormData(contato), headers: { 'X-Requested-With': 'XMLHttpRequest' } });
        const t = (await r.text()).trim();
        if (!r.ok || t !== 'OK') throw new Error(t);
        mostra('Mensagem enviada. Obrigado! Responderemos em breve.', true);
        contato.reset(); contato.classList.remove('was-validated');
        $$('.valido', contato).forEach(c => c.classList.remove('valido'));
      } catch {
        mostra('Não foi possível enviar agora. Fale com a gente pelo WhatsApp (61) 3355-1107 ou pelo telefone (61) 3355-1105.', false);
      } finally {
        env.disabled = false; envTxt.textContent = 'Enviar mensagem';
      }
    });
  }

  /* ---------- vídeo: 720p de 11 MB, mudo e em loop ----------
     Só baixa quando chega perto da tela e só roda enquanto está visível. Com movimento reduzido
     não toca sozinho: ganha os controles normais. */
  const video = $('[data-video]');
  if (video) {
    const som = $('[data-video-som]');
    if (reduz || html.classList.contains('economia')) { video.controls = true; video.preload = 'none'; video.src = video.dataset.src; }
    else new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        if (!video.src) video.src = video.dataset.src;
        video.play().catch(() => {});
      } else video.pause();
    }, { rootMargin: '200px 0px' }).observe(video);
    if (som) som.addEventListener('click', () => {
      video.muted = !video.muted;
      if (!video.muted) video.play().catch(() => {});
      som.setAttribute('aria-pressed', String(!video.muted));
      $('use', som).setAttribute('href', video.muted ? '#i-mudo' : '#i-som');
      $('span', som).textContent = video.muted ? 'Ativar som' : 'Desativar som';
    });
  }

  /* ---------- fundo: a luz dos sheds atravessa a página ----------
     Faixas diagonais de sol, como a luz zenital dos hospitais de Lelé, que derivam devagar sozinhas
     (a rolagem não mexe nelas). Meia resolução e até 30 quadros;
     sem WebGL, no modo leve ou com quadros lentos, fica o mesmo desenho parado do CSS. */
  const luzDeBrasilia = () => {
    if (leve) return;
    const cv = document.createElement('canvas');
    const gl = cv.getContext('webgl', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });
    if (!gl) return;
    const sh = (tipo, src) => { const x = gl.createShader(tipo); gl.shaderSource(x, src); gl.compileShader(x); return x; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, `precision mediump float;
uniform vec2 r,m;uniform float t,d,o;
float faixa(float s,float l,float m){float f=fract(s);return smoothstep(0.,m,f)*(1.-smoothstep(l-m,l,f));}
void main(){
  vec2 q=gl_FragCoord.xy/r.y;q.y+=o;
  float a=mix(1.02,2.12,d);
  float s=dot(q,vec2(cos(a),sin(a)));
  float s1=s*1.55+t*.019,s2=s*3.2-t*.029+.37;
  float luz=faixa(s1,.36,.13)+faixa(s2,.17,.06)*.45;
  float aleta=faixa(s1+.012,.03,.012)*.6;
  luz*=mix(.72,1.,gl_FragCoord.y/r.y);
  vec2 p0=gl_FragCoord.xy/r.y,pm=m/r.y;
  float foco=exp(-dot(p0-pm,p0-pm)*9.);
  luz=luz*(1.+.6*foco)+foco*.22;
  vec3 sombra=vec3(.846,.862,.888),concreto=vec3(.922,.933,.948);
  vec3 sol=mix(mix(vec3(.975,.987,1.),vec3(1.),smoothstep(0.,.5,d)),vec3(1.,.99,.975),smoothstep(.5,1.,d));
  vec3 c=mix(mix(sombra,concreto,.55+.45*sin(s*2.1+.6)*.5+.225),sol,clamp(luz,0.,1.));
  c-=aleta*.035;
  vec2 b=vec2((.22+.18*sin(t*.06))*r.x/r.y,.72+.16*cos(t*.045));
  c=mix(c,vec3(.84,.15,.17),exp(-dot(p0-b,p0-b)*2.4)*.07);
  c+=(fract(sin(dot(gl_FragCoord.xy+t,vec2(12.9898,78.233)))*43758.5453)-.5)/255.;
  gl_FragColor=vec4(c,1.);
}`));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
    const u = n => gl.getUniformLocation(pr, n);
    const uR = u('r'), uT = u('t'), uD = u('d'), uO = u('o'), uM = u('m');
    // a luz do fundo vai até o cursor devagar (só com mouse)
    const cursor = { x: -9999, y: -9999, ax: -9999, ay: -9999 };
    if (fino) addEventListener('pointermove', e => { cursor.x = e.clientX * .5; cursor.y = (innerHeight - e.clientY) * .5; if (cursor.ax < -999) { cursor.ax = cursor.x; cursor.ay = cursor.y; } }, { passive: true });
    cv.className = 'fundo-luz';
    cv.setAttribute('aria-hidden', 'true');
    document.body.prepend(cv);
    const mede = () => {
      cv.width = Math.ceil(innerWidth * .5); cv.height = Math.ceil(innerHeight * .5);
      gl.viewport(0, 0, cv.width, cv.height);
      gl.uniform2f(uR, cv.width, cv.height);
    };
    mede();
    let alturaAntes = innerHeight;
    // no celular a barra de endereço muda a altura ao rolar: só remede quando a largura ou a altura mudam de verdade
    addEventListener('resize', () => { if (cv.width !== Math.ceil(innerWidth * .5) || Math.abs(innerHeight - alturaAntes) > 120) { alturaAntes = innerHeight; mede(); } }, { passive: true });
    let ultimo = 0, rodando = true, sonda = null;
    const pinta = agora => {
      gl.uniform1f(uT, reduz ? 0 : agora / 1000);
      gl.uniform1f(uD, .42);
      gl.uniform1f(uO, 0);
      cursor.ax += (cursor.x - cursor.ax) * .08; cursor.ay += (cursor.y - cursor.ay) * .08;
      gl.uniform2f(uM, cursor.ax, cursor.ay);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const quadro = agora => {
      if (!rodando) return;
      requestAnimationFrame(quadro);
      if (document.hidden || agora - ultimo < 32) return;
      ultimo = agora;
      pinta(agora);
      if (sonda) {
        if (!sonda.t0) sonda.t0 = agora;
        sonda.n++;
        // menos de 20 quadros por segundo de fundo: o aparelho está sofrendo, o fundo para
        if (agora - sonda.t0 > 3000) { if (sonda.n / ((agora - sonda.t0) / 1000) < 20) { rodando = false; cv.remove(); } sonda = null; }
      }
    };
    requestAnimationFrame(t => { pinta(t); cv.classList.add('pronto'); });
    if (reduz) return;
    requestAnimationFrame(quadro);
    setTimeout(() => { sonda = { t0: 0, n: 0 }; }, 2500);
    document.addEventListener('visibilitychange', () => { if (sonda) sonda = { t0: 0, n: 0 }; });
  };
  luzDeBrasilia();

  /* ---------- monitor cardíaco: traçado PQRST de verdade ----------
     A onda é a soma de cinco gaussianas (P, Q, R, S, T), cada batimento com um ritmo levemente diferente.
     O feixe varre da esquerda para a direita, apaga um trecho logo à frente e deixa um rastro que esmaece,
     como num monitor de UTI. O BPM e o coração batem no pico R. */
  const ondaECG = f => {
    const g = (c, w, a) => a * Math.exp(-((f - c) ** 2) / (2 * w * w));
    return g(.17, .024, .12) + g(.355, .009, -.12) + g(.385, .0095, 1) + g(.415, .011, -.26) + g(.63, .045, .3);
  };
  // oximetria: o pulso chega ao dedo depois do pico R, sobe rápido, desce devagar e tem o entalhe dicrótico
  const ondaPleth = f => {
    const d = f - .6;
    return Math.exp(-(d * d) / (2 * (d < 0 ? .035 : .085) ** 2)) + .2 * Math.exp(-((f - .82) ** 2) / .0018);
  };
  const ESTILOS_ECG = {
    monitor: { vel: 92, amp: .32, base: .5, cor: '#FF4D55', espessura: 2, brilho: 9, rastro: .1, vao: 20, ponto: '#fff', pleth: { base: .95, amp: .2, cor: '#DCE3EB' } },
    linha: { vel: 140, amp: .6, base: .7, cor: null, espessura: 1.6, brilho: 0, rastro: .08, vao: 56, ponto: null },
    'linha-clara': { vel: 140, amp: .6, base: .66, cor: '#FF6B70', espessura: 1.6, brilho: 7, rastro: .08, vao: 56, ponto: '#fff' }
  };
  let ecgPasso = leve ? 2 : 1;
  const monitores = $$('[data-ecg]').map(cv => {
    const e = { ...ESTILOS_ECG[cv.dataset.ecg] };
    if (leve) e.brilho = 0;
    if (!e.cor) e.cor = getComputedStyle(html).getPropertyValue('--vermelho').trim() || '#D7262B';
    if (!e.ponto) e.ponto = e.cor;
    const ctx = cv.getContext('2d');
    const caixa = cv.parentElement.querySelector('[data-bpm-caixa]');
    const bpm = caixa && $('[data-bpm]', caixa);
    const spo2 = cv.parentElement.querySelector('[data-spo2]');
    const m = { e, w: 1, h: 1, buf: null, buf2: null, x: 0, fase: Math.random(), periodo: .84, visivel: false, sobra: 0 };
    m.mede = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const w = Math.max(1, Math.round(cv.clientWidth)), h = Math.max(1, cv.clientHeight);
      // no celular a barra de endereço dispara resize a cada rolagem: só recomeça o traçado se o tamanho mudou
      if (m.buf && w === m.w && h === m.h) return;
      m.w = w; m.h = h;
      cv.width = m.w * dpr; cv.height = m.h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      m.buf = new Float32Array(m.w).fill(NaN);
      if (e.pleth) m.buf2 = new Float32Array(m.w).fill(NaN);
      m.x = 0;
    };
    m.avanca = px => {
      for (let k = 0; k < px; k++) {
        const antes = m.fase;
        m.fase += 1 / (e.vel * m.periodo);
        if (antes < .385 && m.fase >= .385 && bpm) {
          bpm.textContent = Math.round(60 / m.periodo);
          caixa.classList.remove('bate'); void caixa.offsetWidth; caixa.classList.add('bate');
          if (spo2 && Math.random() < .12) spo2.textContent = [97, 98, 98, 99][Math.floor(Math.random() * 4)];
        }
        if (m.fase >= 1) { m.fase -= 1; m.periodo = .76 + Math.random() * .14; }
        const col = m.x % m.w;
        m.buf[col] = m.h * e.base - ondaECG(m.fase) * m.h * e.amp + (Math.random() - .5) * .5;
        if (m.buf2) m.buf2[col] = m.h * e.pleth.base - ondaPleth(m.fase) * m.h * e.pleth.amp;
        for (let v = 1; v <= e.vao; v++) { m.buf[(col + v) % m.w] = NaN; if (m.buf2) m.buf2[(col + v) % m.w] = NaN; }
        m.x = (m.x + 1) % m.w;
      }
    };
    const traco = (buf, cor, brilho, ponto) => {
      const w = m.w;
      ctx.strokeStyle = cor; ctx.shadowColor = cor; ctx.shadowBlur = brilho;
      const cabeca = (m.x - 1 + w) % w;
      // do mais novo (idade 0) ao mais velho, em trechos que vão apagando
      for (let a = 0; a < w; a += 6) {
        ctx.globalAlpha = 1 - (a / w) * (1 - e.rastro);
        ctx.beginPath();
        let caneta = false, antes = -1;
        for (let k = a; k <= Math.min(a + 6, w - 1); k++) {
          const col = (cabeca - k + w) % w, y = buf[col];
          if (Number.isNaN(y) || antes === 0) { caneta = false; antes = col; if (Number.isNaN(y)) continue; }
          if (!caneta) { ctx.moveTo(col, y); caneta = true; } else ctx.lineTo(col, y);
          antes = col;
        }
        ctx.stroke();
      }
      const y = buf[cabeca];
      if (!Number.isNaN(y)) {
        ctx.globalAlpha = 1; ctx.shadowBlur = 14; ctx.fillStyle = ponto;
        ctx.beginPath(); ctx.arc(cabeca, y, e.espessura + 1, 0, Math.PI * 2); ctx.fill();
      }
    };
    m.desenha = () => {
      ctx.clearRect(0, 0, m.w, m.h);
      ctx.lineWidth = e.espessura; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
      traco(m.buf, e.cor, e.brilho, e.ponto);
      if (m.buf2) traco(m.buf2, e.pleth.cor, e.brilho * .6, '#fff');
      ctx.globalAlpha = 1; ctx.shadowBlur = 0;
    };
    m.mede();
    new IntersectionObserver(([en]) => { m.visivel = en.isIntersecting; }).observe(cv);
    return m;
  });
  if (monitores.length) {
    const estatico = () => monitores.forEach(m => { m.mede(); m.avanca(Math.round(m.w * .82)); m.desenha(); });
    addEventListener('resize', () => (reduz ? estatico() : monitores.forEach(m => m.mede())), { passive: true });
    if (reduz) estatico();
    else {
      let antes = performance.now(), quadroEcg = 0;
      const loop = agora => {
        if (++quadroEcg % ecgPasso) { requestAnimationFrame(loop); return; }
        const dt = Math.min(.12, (agora - antes) / 1000); // mantém o tempo real mesmo com poucos quadros
        antes = agora;
        if (!document.hidden) monitores.forEach(m => {
          if (!m.visivel) return;
          m.sobra += m.e.vel * dt;
          const px = Math.floor(m.sobra);
          m.sobra -= px;
          if (px) m.avanca(px);
          m.desenha();
        });
        requestAnimationFrame(loop);
      };
      requestAnimationFrame(loop);
    }
  }

  /* ---------- navegação ---------- */
  const nav = $('[data-nav]');
  const navMenu = $('[data-nav-menu]');
  const luz = $('[data-nav-luz]');
  const links = $$('.nav__link');
  let atual = null, sobreLink = null;
  const poeLuz = alvo => {
    links.forEach(l => l.classList.toggle('na-luz', !sobreLink && l === alvo));
    if (!alvo || !alvo.offsetParent) { luz.classList.remove('on'); return; }
    const nr = navMenu.getBoundingClientRect(), lr = alvo.getBoundingClientRect();
    luz.style.width = `${lr.width}px`;
    luz.style.transform = `translate(${lr.left - nr.left}px, ${lr.top - nr.top}px)`;
    luz.classList.add('on');
    luz.classList.toggle('atual', !sobreLink && alvo === atual);
  };
  links.forEach(l => {
    l.addEventListener('pointerenter', () => { sobreLink = l; poeLuz(l); });
    l.addEventListener('focus', () => { sobreLink = l; poeLuz(l); });
    l.addEventListener('blur', () => { sobreLink = null; poeLuz(atual); });
  });
  navMenu.addEventListener('pointerleave', () => { sobreLink = null; poeLuz(atual); });
  addEventListener('resize', () => poeLuz(sobreLink || atual));
  const defineAtual = id => {
    atual = links.find(l => l.getAttribute('href') === '#' + id) || null;
    links.forEach(l => l.removeAttribute('aria-current'));
    if (atual) atual.setAttribute('aria-current', 'true');
    if (!sobreLink) poeLuz(atual);
  };

  // menu do celular: abre num círculo a partir do botão
  const menu = $('[data-menu]');
  const abrir = $('[data-menu-abrir]');
  const fechar = $('[data-menu-fechar]');
  let lenis = null;
  const abreMenu = () => {
    const r = abrir.getBoundingClientRect();
    menu.style.setProperty('--cx', `${r.left + r.width / 2}px`);
    menu.style.setProperty('--cy', `${r.top + r.height / 2}px`);
    menu.hidden = false;
    abrir.setAttribute('aria-expanded', 'true');
    lenis ? lenis.stop() : (document.body.style.overflow = 'hidden');
    requestAnimationFrame(() => requestAnimationFrame(() => menu.classList.add('aberto')));
    fechar.focus();
  };
  const fechaMenu = (volta = true) => {
    menu.classList.remove('aberto');
    abrir.setAttribute('aria-expanded', 'false');
    lenis ? lenis.start() : (document.body.style.overflow = '');
    setTimeout(() => { menu.hidden = true; }, reduz ? 0 : 800);
    if (volta) abrir.focus();
  };
  abrir.addEventListener('click', abreMenu);
  fechar.addEventListener('click', () => fechaMenu());
  menu.addEventListener('click', e => { if (e.target.closest('a')) fechaMenu(false); });
  menu.addEventListener('keydown', e => {
    if (e.key !== 'Tab') return;
    const foco = $$('a, button', menu), prim = foco[0], ult = foco[foco.length - 1];
    if (e.shiftKey && document.activeElement === prim) { e.preventDefault(); ult.focus(); }
    else if (!e.shiftKey && document.activeElement === ult) { e.preventDefault(); prim.focus(); }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) fechaMenu(); });

  // botões de contato rápido
  const flut = $('.flutuante');
  const barraMovel = $('.barra-movel');
  const acoesHero = $('[data-hero-acoes]');
  if (barraMovel && acoesHero) new IntersectionObserver(([e]) => barraMovel.classList.toggle('no-hero', e.isIntersecting)).observe(acoesHero);

  const heroEl = $('[data-hero]');
  if (heroEl) new IntersectionObserver(([e]) => heroEl.classList.toggle('parado', !e.isIntersecting)).observe(heroEl);

  /* ---------- sem bibliotecas ou com movimento reduzido ---------- */
  if (!temGsap || reduz) {
    html.classList.remove('carregando', 'intro');
    (window.srT || []).forEach(clearTimeout);
    const ioNav = new IntersectionObserver(ents => ents.forEach(e => {
      if (e.isIntersecting) defineAtual(e.target.id);
      else if (atual && atual.getAttribute('href') === '#' + e.target.id) defineAtual(null);
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main > section[id]').forEach(s => ioNav.observe(s));
    const prog = $('[data-progresso]');
    let max = 0;
    const mede = () => { max = html.scrollHeight - innerHeight; };
    mede(); addEventListener('resize', mede); addEventListener('load', mede);
    addEventListener('scroll', () => {
      nav.classList.toggle('compacto', scrollY > 60);
      prog.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      if (flut) flut.classList.toggle('escondido', scrollY < innerHeight * .7 || scrollY > max - 500);
      const tb = $('[data-topo]');
      if (tb) { tb.classList.toggle('escondido', scrollY < innerHeight * 1.2); tb.style.setProperty('--p', (max > 0 ? scrollY / max : 0).toFixed(3)); }
    }, { passive: true });
    return;
  }

  /* =========================================================
     MOVIMENTO (GSAP + ScrollTrigger + SplitText + Lenis)
     ========================================================= */
  const comeca = () => {
  gsap.registerPlugin(ScrollTrigger);
  if (window.SplitText) gsap.registerPlugin(SplitText);
  gsap.set('.h', { transformOrigin: '50% 50%' });

  // rolagem suave
  if (window.Lenis && !leve) {
    lenis = new Lenis({ lerp: .11, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  const topoDoc = el => { let y = 0; for (let e = el.closest('.pin-spacer') || el; e; e = e.offsetParent) y += e.offsetTop; return y; };
  const destinoDe = alvo => {
    if (typeof alvo === 'number') return alvo;
    const respiro = alvo.matches('section') ? parseFloat(getComputedStyle(alvo).paddingTop) : 0;
    return Math.max(0, topoDoc(alvo) + respiro - (nav.offsetHeight + 28));
  };
  // descendo por âncora, as entradas que passam voando já terminam no clique
  const adianta = destino => {
    const y = lenis ? lenis.scroll : scrollY;
    if (destino - y < innerHeight) return;
    ScrollTrigger.getAll().filter(st => !st.vars.scrub && !st.pin && st.trigger && st.start > y && st.start < destino && st.animation
      && st.trigger.getBoundingClientRect().bottom + y < destino).forEach(st => { st.animation.progress(1); st.kill(); });
  };
  const rolaPara = (alvo, aoChegar) => {
    const destino = destinoDe(alvo);
    adianta(destino);
    if (!lenis) { scrollTo({ top: destino, behavior: 'smooth' }); return aoChegar && setTimeout(aoChegar, 900); }
    const duration = Math.min(1.8, Math.max(.9, .7 + Math.abs(destino - lenis.scroll) / 9000));
    lenis.scrollTo(destino, { duration, easing: t => (1 - Math.cos(Math.PI * t)) / 2, onComplete: aoChegar });
  };
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute('href') === '#') return;
    const id = a.getAttribute('href');
    const alvo = id === '#inicio' ? 0 : $(id);
    if (alvo === null) return;
    e.preventDefault();
    rolaPara(alvo);
    history.replaceState(null, '', id === '#inicio' ? location.pathname + location.search : id);
    const foco = alvo || $('#inicio');
    if (!foco.hasAttribute('tabindex')) foco.setAttribute('tabindex', '-1');
    foco.focus({ preventScroll: true });
  });

  // topo: compacto, some ao descer, volta ao subir, progresso da página
  const prog = $('[data-progresso]'), topoBt = $('[data-topo]');
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: s => {
      const y = s.scroll();
      nav.classList.toggle('compacto', y > 60);
      nav.classList.toggle('oculto', s.direction === 1 && y > 500 && menu.hidden);
      if (barraMovel) barraMovel.classList.toggle('recolhida', s.direction === 1 && y > 400 && menu.hidden);
      prog.style.transform = `scaleX(${s.progress})`;
      if (flut) flut.classList.toggle('escondido', y < innerHeight * .7 || y > s.end - 600);
      if (topoBt) { topoBt.classList.toggle('escondido', y < innerHeight * 1.2); topoBt.style.setProperty('--p', s.progress.toFixed(3)); }
    }
  });
  $$('main > section[id]').forEach(sec => ScrollTrigger.create({
    trigger: sec, start: 'top 50%', end: 'bottom 50%',
    // ao sair de uma seção sem entrar em outra do menu, o destaque se apaga
    onToggle: s => { if (s.isActive) defineAtual(sec.id); else if (atual && atual.getAttribute('href') === '#' + sec.id) defineAtual(null); }
  }));

  const desenha = path => { path.setAttribute('pathLength', '1'); gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 }); return path; };

  /* ---------- hero: os três corações se encontram ----------
     A sala de ressonância sobe dentro do arco, os corações do símbolo chegam de três lados e se juntam atrás dela,
     o título sobe da máscara e a última palavra passa por consulta, coleta e ressonância, fazendo bater o coração
     de cada cuidado, até parar em "mensagem": o símbolo bate inteiro e o botão do WhatsApp chama. */
  const hero = $('[data-hero]');
  const simbolo = $('[data-hero-simbolo]', hero);
  const coracao = n => $(`[data-hc="${n}"]`, hero);
  const bate = alvo => gsap.fromTo(alvo, { scale: 1 }, { keyframes: { scale: [1, 1.12, .97, 1.04, 1] }, duration: .8, ease: 'power1.inOut', transformOrigin: '50% 50%', overwrite: 'auto' });
  let partido = null, giroFinal = '';
  const entradaHero = (() => {
    const titulo = $('[data-hero-titulo]', hero);
    const giro = $('[data-hero-giro]', titulo), final = giroFinal = giro.textContent, rotulo = titulo.textContent;
    const passos = [['consulta.', 'topo'], ['coleta.', 'esq'], ['ressonância.', 'dir']];
    // a quebra das linhas é medida com a palavra mais longa, para nenhuma troca empurrar a linha
    if (window.SplitText) {
      giro.textContent = 'ressonância.';
      partido = SplitText.create(titulo, { type: 'lines,words', mask: 'lines', linesClass: 'linha' });
      titulo.setAttribute('aria-label', rotulo);
    }
    const palavras = partido ? partido.words.slice(0, -1) : titulo;
    const ultima = partido ? partido.words[partido.words.length - 1] : null;
    if (ultima) ultima.textContent = passos[0][0];
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' }, onComplete: vivaHero });
    tl.fromTo('[data-hero-arco]', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2 }, .1)
      .fromTo('[data-hero-arco] img', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.28 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.7, ease: 'expo.inOut' }, .2)
      .fromTo(simbolo, { opacity: 0 }, { opacity: 1, duration: .7, ease: 'power1.out' }, .3)
      .fromTo(coracao('esq'), { x: -46, y: 30, rotation: -20 }, { x: 0, y: 0, rotation: 0, duration: 1.6 }, .35)
      .fromTo(coracao('dir'), { x: 46, y: 30, rotation: 20 }, { x: 0, y: 0, rotation: 0, duration: 1.6 }, .45)
      .fromTo(coracao('topo'), { y: -46, rotation: -12 }, { y: 0, rotation: 0, duration: 1.6 }, .55)
      .fromTo(titulo, { opacity: 0 }, { opacity: 1, duration: .01 }, .25)
      .fromTo(palavras, { yPercent: 115, rotate: 5 }, { yPercent: 0, rotate: 0, duration: 1.25, stagger: .07 }, .25);
    if (ultima) {
      let t = .25 + palavras.length * .07;
      tl.fromTo(ultima, { yPercent: 115, rotate: 5 }, { yPercent: 0, rotate: 0, duration: .8 }, t)
        .add(() => bate(coracao('topo')), t + .3);
      passos.slice(1).concat([[final, null]]).forEach(([txt, h]) => {
        t += .78;
        tl.to(ultima, { yPercent: -115, duration: .24, ease: 'power2.in' }, t)
          .call(() => { ultima.textContent = txt; }, null, t + .25)
          .fromTo(ultima, { yPercent: 115 }, { yPercent: 0, duration: .55, immediateRender: false }, t + .25)
          .add(() => bate(h ? coracao(h) : simbolo), t + .4);
      });
    }
    tl.fromTo('[data-hero-item]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, stagger: .12 }, .75)
      .fromTo('[data-hero-chip]', { opacity: 0, scale: .6, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, stagger: .15, ease: 'back.out(1.6)' }, 1.05);
    $$('[data-hero-conta]', hero).forEach(n => {
      const obj = { v: 0 };
      n.textContent = '0';
      tl.to(obj, { v: +n.dataset.heroConta, duration: 1.9, onUpdate: () => { n.textContent = Math.round(obj.v); } }, 1.15);
    });
    return tl;
  })();
  // depois da entrada: o título volta a ser texto normal (quebra de linha nativa), o botão chama,
  // os selos flutuam, o símbolo respira e o palco segue o cursor; os laços param fora da tela
  function vivaHero() {
    if (partido) {
      partido.revert();
      $('[data-hero-giro]', hero).textContent = giroFinal;
      $('[data-hero-titulo]', hero).removeAttribute('aria-label');
    }
    $('.hero__agendar', hero).classList.add('chama');
    const lacos = leve ? [] : [
      ...$$('[data-hero-chip]', hero).map((c, i) => gsap.to(c, { yPercent: i % 2 ? 7 : -7, duration: 3.2 + i * .7, ease: 'sine.inOut', yoyo: true, repeat: -1 })),
      gsap.to(simbolo, { scale: 1.025, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1, transformOrigin: '50% 60%' })
    ];
    ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: s => lacos.forEach(t => (s.isActive ? t.resume() : t.pause())) });
    if (leve || !fino) return;
    const camadas = $$('[data-prof]', hero).map(el => ({ p: +el.dataset.prof, x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }) }));
    const sx = gsap.quickTo(simbolo, 'x', { duration: 1.6, ease: 'power3' }), sy = gsap.quickTo(simbolo, 'y', { duration: 1.6, ease: 'power3' });
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      camadas.forEach(c => { c.x(nx * c.p); c.y(ny * c.p); });
      sx(-nx * 22); sy(-ny * 22);
    });
    hero.addEventListener('pointerleave', () => { camadas.forEach(c => { c.x(0); c.y(0); }); sx(0); sy(0); });
  }
  html.classList.remove('carregando', 'intro');
  (window.srT || []).forEach(clearTimeout);
  entradaHero.play();

  // botões magnéticos: seguem o cursor alguns pixels
  if (fino) $$('.botao').forEach(b => {
    const mx = gsap.quickTo(b, 'x', { duration: .6, ease: 'power3' }), my = gsap.quickTo(b, 'y', { duration: .6, ease: 'power3' });
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      mx(((e.clientX - r.left) / r.width - .5) * 14);
      my(((e.clientY - r.top) / r.height - .5) * 12);
    });
    b.addEventListener('pointerleave', () => { mx(0); my(0); });
  });

  // prepara o texto um pouco antes de ele entrar na tela, em vez de fatiar tudo na abertura
  const perto = (el, fn) => ScrollTrigger.create({ trigger: el, start: () => `top bottom+=${Math.round(innerHeight * .35)}`, once: true, onEnter: fn });

  /* ---------- títulos: as palavras sobem da linha e uma faixa de sol passa por cima ---------- */
  $$('[data-palavras]').forEach(h => perto(h, () => {
    const parte = window.SplitText && !leve;
    const alvo = parte ? SplitText.create(h, { type: 'words', mask: 'words' }).words : h;
    gsap.from(alvo, {
      ...(parte ? { yPercent: 105, stagger: .06 } : { y: 18, opacity: 0 }),
      duration: .9, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 88%' },
      onComplete: () => h.classList.add('luz-passa')
    });
  }));

  /* ---------- sheds: o perfil do telhado se desenha uma vez quando chega ---------- */
  $$('.sheds').forEach(sd => gsap.fromTo(sd, { clipPath: 'inset(0 100% 0 0)' }, { clipPath: 'inset(0 0% 0 0)', duration: 1.6, ease: 'power2.inOut', scrollTrigger: { trigger: sd, start: 'top 92%' } }));

  /* ---------- declaração: acende palavra por palavra ---------- */
  const decl = $('[data-declaracao]');
  if (decl && window.SplitText && !leve) perto(decl, () => {
    const sp = SplitText.create(decl, { type: 'words' });
    gsap.fromTo(sp.words, { opacity: .14 }, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: decl, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  });

  /* ---------- caixas: entrada em cascata ---------- */
  const caixas = $$('[data-card]').filter(c => !c.closest('.hero'));
  gsap.set(caixas, { opacity: 0, y: 44, scale: .97 });
  ScrollTrigger.batch(caixas, {
    start: 'top 90%', once: true,
    onEnter: lote => {
      gsap.to(lote, { opacity: 1, y: 0, scale: 1, duration: 1.1, stagger: .08, ease: 'expo.out', overwrite: true, clearProps: 'transform,opacity' });
    }
  });
  $$('[data-lista]').forEach(l => gsap.from(l.children, { x: -16, opacity: 0, duration: .7, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: l, start: 'top 88%' } }));
  $$('.petala > img, .moldura > img, .exame-card__foto img').filter(img => !img.closest('.bento__foto, .sobre__fachada, .sobre__espera')).forEach(img => gsap.from(img, { scale: 1.14, duration: 1.6, ease: 'power3.out', clearProps: 'transform', scrollTrigger: { trigger: img.parentElement, start: 'top 92%' } }));

  /* ---------- três cuidados: os corações se juntam com a rolagem ---------- */
  if (cuidados && !leve) {
    const s = $('[data-simbolo-grande]', cuidados);
    const d = innerWidth < 760 ? 12 : 26; // no celular os corações começam mais perto para não sair da tela
    const tl = gsap.timeline({ scrollTrigger: { trigger: cuidados, start: 'top 85%', end: 'center 55%', scrub: 1 } });
    tl.fromTo($('.h--topo', s), { y: -d, rotation: -12 }, { y: 0, rotation: 0, ease: 'none' }, 0)
      .fromTo($('.h--esq', s), { x: -d, y: d * .6, rotation: -18 }, { x: 0, y: 0, rotation: 0, ease: 'none' }, 0)
      .fromTo($('.h--dir', s), { x: d, y: d * .6, rotation: 18 }, { x: 0, y: 0, rotation: 0, ease: 'none' }, 0);
    // quando se encontram, batem uma vez
    ScrollTrigger.create({ trigger: cuidados, start: 'center 55%', once: true, onEnter: () => gsap.to(s, { keyframes: { scale: [1, 1.08, .98, 1.04, 1] }, duration: .9, ease: 'power1.inOut', transformOrigin: '50% 50%' }) });
  }

  /* ---------- paralaxe: as fotos andam um pouco mais devagar que a página ---------- */
  if (!leve) $$('.bento__foto img, .sobre__fachada > img, .sobre__espera > img').forEach(img => gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } }));

  /* ---------- a noite se abre de ponta a ponta enquanto chega ---------- */
  const noiteSec = $('[data-noite]');
  if (noiteSec && !leve) gsap.fromTo(noiteSec, { clipPath: 'inset(0% 4% 0% 4% round 56px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', ease: 'none', scrollTrigger: { trigger: noiteSec, start: 'top bottom', end: 'top 25%', scrub: true } });
  // os números dos passos acendem em sequência
  const passos = $('[data-passos]');
  if (passos) gsap.from($$('.passo__n', passos), { scale: 0, rotation: -90, duration: .8, stagger: .18, ease: 'back.out(2)', scrollTrigger: { trigger: passos, start: 'top 80%' } });

  /* ---------- mapa: as rotas saem da matriz e os pinos caem no lugar ---------- */
  const mapaSec = $('.mapa-df');
  if (mapaSec) {
    const tlMapa = gsap.timeline({ scrollTrigger: { trigger: mapaSec, start: 'top 75%' } });
    tlMapa.fromTo($$('.mapa-df__rota', mapaSec), { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, stagger: .12, ease: 'power2.inOut' })
      .from($$('.pino', mapaSec), { y: -24, scale: .4, opacity: 0, duration: .8, stagger: .1, ease: 'back.out(2)' }, .3);
  }

  /* ---------- chamada: os corações se juntam e sobem com a rolagem ---------- */
  const chamada = $('[data-chamada]');
  if (chamada) {
    const cs = $('[data-chamada-simbolo]', chamada);
    if (!leve) gsap.fromTo($('.chamada__palco', chamada), { yPercent: 22, scale: .82 }, { yPercent: -4, scale: 1, ease: 'none', scrollTrigger: { trigger: chamada, start: 'top bottom', end: 'bottom bottom', scrub: true } });
    gsap.timeline({ scrollTrigger: { trigger: chamada, start: 'top 65%' } })
      .from($('.h--esq', cs), { x: -44, y: 26, rotation: -18, opacity: 0, duration: 1.4, ease: 'expo.out' })
      .from($('.h--dir', cs), { x: 44, y: 26, rotation: 18, opacity: 0, duration: 1.4, ease: 'expo.out' }, '<.1')
      .from($('.h--topo', cs), { y: -44, rotation: -12, opacity: 0, duration: 1.4, ease: 'expo.out' }, '<.1')
      .add(() => bate(cs), '-=.5');
  }

  /* ---------- cartões que inclinam em 3D sob o cursor ---------- */
  if (fino) {
    $$('.exame-card, .passo').forEach(c => { c.dataset.tilt = ''; });
    $$('[data-tilt]').forEach(c => {
      const rx = gsap.quickTo(c, 'rotationX', { duration: .8, ease: 'power3' });
      const ry = gsap.quickTo(c, 'rotationY', { duration: .8, ease: 'power3' });
      const ty = gsap.quickTo(c, 'y', { duration: .8, ease: 'power3' });
      c.addEventListener('pointerenter', () => gsap.set(c, { transformPerspective: 1100 }));
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        rx(-((e.clientY - r.top) / r.height - .5) * 6);
        ry(((e.clientX - r.left) / r.width - .5) * 8);
        ty(-6);
      });
      c.addEventListener('pointerleave', () => { rx(0); ry(0); ty(0); });
    });
  }

  /* ---------- números que contam ---------- */
  $$('[data-conta]').forEach(n => {
    const alvo = +n.dataset.conta, obj = { v: 0 };
    n.textContent = '0';
    gsap.to(obj, { v: alvo, duration: 2, ease: 'expo.out', onUpdate: () => { n.textContent = Math.round(obj.v); }, scrollTrigger: { trigger: n, start: 'top 90%' } });
  });

  /* ---------- textos de apoio: sobem e aparecem ---------- */
  $$('.secao .lead, .declaracao__apoio').forEach(p => gsap.from(p, { y: 14, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: p, start: 'top 92%' } }));

  /* ---------- especialidades: as linhas entram em cascata e os ícones pulam ---------- */
  const espLista = $('[data-esp-lista]');
  if (espLista) {
    const linhas = [...espLista.children];
    gsap.from(linhas, { opacity: 0, y: 10, duration: .6, stagger: .02, ease: 'power3.out', scrollTrigger: { trigger: espLista, start: 'top 88%' } });
  }

  const laco = $('[data-laco]');
  if (laco && html.classList.contains('rosa')) gsap.to(desenha(laco), { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: laco, start: 'top 85%' } });

  // recalcula depois das imagens e fontes
  addEventListener('load', () => (window.requestIdleCallback || (f => setTimeout(f, 300)))(() => ScrollTrigger.refresh(), { timeout: 2000 }));

  // endereço com #seção: a página abre parada na seção
  const idInicial = (() => { try { return decodeURIComponent(location.hash.slice(1)); } catch (e) { return ''; } })();
  const inicial = idInicial && document.getElementById(idInicial);
  if (inicial) {
    const vai = () => { ScrollTrigger.refresh(); const y = destinoDe(inicial); lenis ? lenis.scrollTo(y, { immediate: true, force: true }) : scrollTo(0, y); };
    requestAnimationFrame(vai);
    if (document.readyState !== 'complete') addEventListener('load', () => requestAnimationFrame(vai), { once: true });
  }
  };
  Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 1200))]).then(comeca);
})();
