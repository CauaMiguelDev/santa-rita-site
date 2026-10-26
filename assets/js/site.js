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
    { id: 'tag', nome: 'Taguatinga Norte', curto: 'Taguatinga', selo: 'Matriz', codigo: 'QND 47', end: 'Lote 10, Taguatinga Norte, Brasília-DF',
      hora: 'Seg a sex, 7h às 18h', tel: '+556133551105', fone: '(61) 3355-1105',
      rota: 'https://www.google.com/maps/search/?api=1&query=Cl%C3%ADnica%20Santa%20Rita%20QND%2047%20Lote%2010%20Taguatinga%20Norte%20Bras%C3%ADlia',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('-15.8044546,-48.0669338') + '&z=16&hl=pt-BR&output=embed' },
    { id: 'agl', nome: 'Águas Lindas de Goiás', curto: 'Águas Lindas', codigo: 'Quadra 39', end: 'Lote 16, Av. Jardim Brasília, Águas Lindas de Goiás-GO',
      hora: 'Seg a sex, 7h às 17h', wa: '5561992581800', fone: '(61) 99258-1800',
      rota: 'https://maps.app.goo.gl/fxjeTxy9A7zMZPn46',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('-15.7224299,-48.2879671') + '&z=16&hl=pt-BR&output=embed' },
    { id: 'rf', nome: 'Riacho Fundo', codigo: 'CLN 07', end: 'Bloco F, Lote 01/02, Riacho Fundo-DF',
      hora: 'Seg a sex, 7h às 17h', wa: '5561992889508', fone: '(61) 99288-9508',
      rota: 'https://maps.app.goo.gl/HZ3EsojS985XRf58A',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('CLN 7 Bloco F, Riacho Fundo, Brasília - DF') + '&z=16&hl=pt-BR&output=embed' },
    { id: 'sad', nome: 'Santo Antônio do Descoberto', curto: 'Santo Antônio', codigo: 'Quadra 56', end: 'Lote 16, Centro, Santo Antônio do Descoberto-GO',
      hora: 'Seg a sex, 7h às 17h', wa: '5561992582301', fone: '(61) 99258-2301',
      rota: 'https://maps.app.goo.gl/hwdCSNE7oAck1Nwp8',
      mapa: 'https://maps.google.com/maps?q=' + encodeURIComponent('-15.9460449,-48.2653426') + '&z=16&hl=pt-BR&output=embed' },
    { id: 'sob', nome: 'Sobradinho 1', curto: 'Sobradinho', codigo: 'Quadra 10', end: 'Área 01, Lojas 03, 04 e 05, Sobradinho-DF',
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
    const mapa = $('[data-u-mapa]', painelU);
    const seleciona = (id, foca) => {
      const u = UNIDADES.find(x => x.id === id);
      if (!u) return;
      $$('.aba', abas).forEach(b => { const s = b.dataset.u === id; b.setAttribute('aria-selected', s); b.tabIndex = s ? 0 : -1; if (s && foca) b.focus(); });
      moveLuz();
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

  const fundo = null; // fundo sólido: sem WebGL atrás da página

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

  /* ---------- sem bibliotecas ou com movimento reduzido ---------- */
  if (!temGsap || reduz) {
    html.classList.remove('carregando', 'intro');
    $$('[data-selo]').forEach(sl => sl.classList.add('visto'));
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

  /* ---------- hero: entrada calma ---------- */
  const hero = $('[data-hero]');
  const entradaHero = (() => {
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
    tl.fromTo('[data-hero-titulo]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: .9 }, .05)
      .fromTo('[data-hero-item]', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: .8, stagger: .1 }, .2)
      .fromTo('[data-hero-foto]', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, .1)
      .fromTo('[data-hero-foto] img', { scale: 1.05 }, { scale: 1, duration: 1.6, ease: 'power2.out' }, .1)
      .fromTo('[data-hero-chip]', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: .7, stagger: .1 }, .5);
    $$('[data-hero-conta]', hero).forEach(n => {
      const obj = { v: 0 };
      n.textContent = '0';
      tl.to(obj, { v: +n.dataset.heroConta, duration: 1.6, onUpdate: () => { n.textContent = Math.round(obj.v); } }, .6);
    });
    return tl;
  })();
  html.classList.remove('carregando', 'intro');
  (window.srT || []).forEach(clearTimeout);
  entradaHero.play();

  // prepara o texto um pouco antes de ele entrar na tela, em vez de fatiar tudo na abertura
  const perto = (el, fn) => ScrollTrigger.create({ trigger: el, start: () => `top bottom+=${Math.round(innerHeight * .35)}`, once: true, onEnter: fn });

  /* ---------- títulos: sobem e aparecem ---------- */
  $$('[data-palavras]').forEach(h => gsap.from(h, { y: 18, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: h, start: 'top 90%' } }));

  /* ---------- declaração: acende palavra por palavra ---------- */
  const decl = $('[data-declaracao]');
  if (decl && window.SplitText && !leve) perto(decl, () => {
    const sp = SplitText.create(decl, { type: 'words' });
    gsap.fromTo(sp.words, { opacity: .14 }, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: decl, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  });

  /* ---------- caixas: entrada em cascata ---------- */
  const caixas = $$('[data-card]').filter(c => !c.closest('.hero'));
  gsap.set(caixas, { opacity: 0, y: 24 });
  ScrollTrigger.batch(caixas, {
    start: 'top 90%', once: true,
    onEnter: lote => {
      gsap.to(lote, { opacity: 1, y: 0, duration: .8, stagger: .06, ease: 'power3.out', overwrite: true, clearProps: 'transform,opacity' });
    }
  });
  $$('[data-lista]').forEach(l => gsap.from(l.children, { x: -16, opacity: 0, duration: .7, stagger: .06, ease: 'power3.out', scrollTrigger: { trigger: l, start: 'top 88%' } }));
  $$('.petala:not([data-hero-foto]) > img, .moldura > img').forEach(img => gsap.from(img, { scale: 1.05, duration: 1.2, ease: 'power2.out', scrollTrigger: { trigger: img.parentElement, start: 'top 92%' } }));

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

  /* ---------- números que contam ---------- */
  $$('[data-conta]').forEach(n => {
    const alvo = +n.dataset.conta, obj = { v: 0 };
    n.textContent = '0';
    gsap.to(obj, { v: alvo, duration: 2, ease: 'expo.out', onUpdate: () => { n.textContent = Math.round(obj.v); }, scrollTrigger: { trigger: n, start: 'top 90%' } });
  });

  /* ---------- selos de seção: o traço cresce quando a seção chega ---------- */
  $$('[data-selo]').forEach(selo => ScrollTrigger.create({ trigger: selo, start: 'top 92%', once: true, onEnter: () => selo.classList.add('visto') }));

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
