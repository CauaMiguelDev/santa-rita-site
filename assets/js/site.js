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
  const embaralha = (el, final) => {
    if (reduz || !final) { el.textContent = final; return; }
    const abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let q = 0;
    (function passo() {
      q++;
      el.textContent = [...final].map((ch, k) => (ch === ' ' || q > 4 + k * 2) ? ch : abc[Math.random() * abc.length | 0]).join('');
      if (q < 5 + final.length * 2) setTimeout(passo, 38); else el.textContent = final;
    })();
  };
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
        embaralha(cod, u.codigo);
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

  /* ---------- fundo vivo: as ondas da parede da recepção em WebGL ----------
     Um shader de tela cheia, sem biblioteca: as linhas ondulam com o tempo, se curvam e ficam
     vermelhas perto do cursor e deslizam com a rolagem. Sem WebGL, fica o desenho parado do CSS. */
  const fundoVivo = () => {
    if (leve) return;
    const cv = document.createElement('canvas');
    cv.className = 'fundo-vivo';
    cv.setAttribute('aria-hidden', 'true');
    const gl = cv.getContext('webgl', { antialias: false, alpha: false, depth: false, powerPreference: 'low-power' });
    if (!gl) return;
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;
uniform vec2 u_res;uniform float u_t;uniform vec2 u_m;uniform float u_s;uniform vec3 u_cor;uniform float u_calor;uniform float u_forca;
float h(vec2 p){return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1.,0.)),u.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),u.x),u.y);}
float fbm(vec2 p){float v=0.,k=.5;for(int i=0;i<3;i++){v+=k*n(p);p=p*2.03+vec2(1.7,9.2);k*=.5;}return v;}
void main(){
  vec2 uv=gl_FragCoord.xy/u_res;
  float a=u_res.x/u_res.y;
  vec2 p=vec2(uv.x*a,uv.y);
  float d=distance(p,vec2(u_m.x*a,u_m.y));
  float perto=exp(-d*d*11.);
  /* luz e sombra macias que derivam devagar, como luz de janela na parede */
  vec2 q=p*1.1+vec2(u_t*.018,-u_t*.012-u_s*.01);
  float w=fbm(q+vec2(sin(u_t*.05),cos(u_t*.04))*.6);
  /* camada de trás: linhas finas e densas que andam mais devagar com a rolagem (profundidade) */
  float yb=uv.y*27.+u_s*.45;
  float fb=fract(yb+sin(p.x*2.1-u_t*.3+floor(yb)*.7)*.2+(n(vec2(p.x*1.1-u_t*.07,floor(yb)*.41))-.5)*.38);
  float tb=1.-smoothstep(0.,27.*1.1/u_res.y,min(fb,1.-fb));
  /* camada da frente: as ondas da recepção */
  float linhas=16.;
  float y=uv.y*linhas+u_s;
  float faixa=floor(y);
  float onda=sin(p.x*2.6+u_t*.55+faixa*.9)*.28
            +(n(vec2(p.x*1.4+u_t*.12,faixa*.37))-.5)*.5
            +perto*sin(p.x*14.-u_t*2.2)*.24;
  float f=fract(y+onda);
  float traco=1.-smoothstep(0.,linhas*1.7/u_res.y,min(f,1.-f));
  /* de vez em quando um pulso vermelho corre por uma das linhas, como um batimento */
  float ciclo=u_t*.09+h(vec2(faixa,3.))*7.;
  float cx=fract(ciclo)*(a+.8)-.4;
  float pulso=exp(-pow((p.x-cx)/.11,2.))*step(.62,h(vec2(faixa,floor(ciclo))));
  vec2 c2=vec2(a*(.72+.2*sin(u_t*.13)),.62+.22*cos(u_t*.11));
  float claro=exp(-pow(distance(p,c2),2.)*2.4);
  float quente=exp(-pow(distance(p,vec2(a*(.88+.06*sin(u_t*.07)),.9)),2.)*2.6);
  vec3 col=vec3(.961,.961,.965);
  col=mix(col,vec3(1.),claro*.55+smoothstep(.5,.85,w)*.5);
  col=mix(col,vec3(.9,.905,.92),smoothstep(.48,.18,w)*.4);
  col=mix(col,u_cor,perto*.07*u_calor+quente*.03);
  col=mix(col,vec3(.5,.53,.58),tb*.032*u_forca);
  col=mix(col,mix(vec3(.43,.46,.51),u_cor,perto*.85*u_calor),traco*(.055+perto*.24*u_calor)*u_forca);
  col=mix(col,u_cor,traco*pulso*.42*u_forca);
  col-=(1.-f)*.006;
  col*=1.-.035*pow(length(uv-.5)*1.4,2.);
  col+=(h(floor(gl_FragCoord.xy))-.5)*.022;
  gl_FragColor=vec4(col,1.);
}`;
    const shader = (tipo, src) => { const s = gl.createShader(tipo); gl.shaderSource(s, src); gl.compileShader(s); return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null; };
    const v = shader(gl.VERTEX_SHADER, vs), f = shader(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return;
    const prog = gl.createProgram();
    gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = nome => gl.getUniformLocation(prog, nome);
    const uRes = u('u_res'), uT = u('u_t'), uM = u('u_m'), uS = u('u_s'), uCor = u('u_cor');
    // o vermelho só acompanha um cursor de verdade; no toque, as ondas ficam cinzas e mais leves atrás do texto
    gl.uniform1f(u('u_calor'), fino ? 1 : 0);
    const forca = () => gl.uniform1f(u('u_forca'), innerWidth < 760 ? .55 : 1);
    forca();
    addEventListener('resize', forca, { passive: true });
    const hex = getComputedStyle(html).getPropertyValue('--vermelho').trim().replace('#', '');
    gl.uniform3f(uCor, ...[0, 2, 4].map(i => parseInt(hex.slice(i, i + 2), 16) / 255));
    let escala = Math.min(devicePixelRatio || 1, 1) * (innerWidth > 1600 ? .7 : .85);
    const mede = () => {
      cv.width = Math.round(innerWidth * escala); cv.height = Math.round(innerHeight * escala);
      gl.viewport(0, 0, cv.width, cv.height); gl.uniform2f(uRes, cv.width, cv.height);
    };
    mede();
    addEventListener('resize', mede, { passive: true });
    document.body.prepend(cv);
    // o cursor puxa a luz devagar; no toque, ela passeia sozinha
    let mx = .7, my = .6, alvoX = .7, alvoY = .6, tocou = false;
    addEventListener('pointermove', e => { if (e.pointerType === 'mouse') { tocou = true; alvoX = e.clientX / innerWidth; alvoY = 1 - e.clientY / innerHeight; } }, { passive: true });
    const desenha = t => {
      if (!tocou) { alvoX = .55 + .3 * Math.sin(t * .00021); alvoY = .55 + .25 * Math.cos(t * .00017); }
      mx += (alvoX - mx) * .05; my += (alvoY - my) * .05;
      gl.uniform1f(uT, t / 1000);
      gl.uniform2f(uM, mx, my);
      gl.uniform1f(uS, scrollY / innerHeight * 16 * .35);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    desenha(0);
    cv.classList.add('pronto');
    html.classList.add('fundo-ok'); // o grão passa a vir do próprio shader
    if (reduz) { addEventListener('scroll', () => desenha(0), { passive: true }); return; }
    // quando o centro de imagem ou o rodapé (opacos) cobrem a tela inteira, o fundo não precisa ser desenhado
    const opacos = $$('.exames, .rodape');
    let coberto = false, passo = 1, quadro = 0, parado = false;
    const confere = () => { coberto = opacos.some(el => { const r = el.getBoundingClientRect(); return r.top <= 0 && r.bottom >= innerHeight; }); };
    addEventListener('scroll', confere, { passive: true }); confere();
    const loop = t => {
      if (parado) return;
      if (!document.hidden && !coberto && ++quadro % passo === 0) desenha(t);
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
    return {
      // aparelho lento: metade da resolução e metade dos quadros; muito lento: fica parado no último quadro
      alivia: muito => { if (muito) { parado = true; return; } passo = 2; escala = Math.min(escala, .5); mede(); }
    };
  };
  const fundo = fundoVivo();

  /* ---------- aparelho fraco de verdade: mede os quadros e alivia ----------
     A detecção pelo hardware (no <head>) erra para os dois lados. Aqui o site mede 3 s de quadros reais,
     depois da abertura; abaixo de 40 por segundo ele corta o desfoque de vidro, o grão, os brilhos dos
     traçados e reduz o fundo animado, e guarda a decisão para as próximas páginas da visita. */
  const alivia = fps => {
    html.classList.add('leve');
    try { sessionStorage.setItem('sr-leve', '1'); } catch (er) {}
    if (fundo) fundo.alivia(fps < 24);
    ecgPasso = 2;
    monitores.forEach(m => { m.e.brilho = 0; });
  };
  if (!leve && !reduz && !/leve=0/.test(location.search)) setTimeout(() => {
    let n = 0, inicio = 0;
    // aba escondida: recomeça a medida para não confundir pausa com lentidão
    document.addEventListener('visibilitychange', () => { n = 0; inicio = 0; });
    const conta = t => {
      if (!inicio) inicio = t;
      n++;
      if (t - inicio < 3000) { requestAnimationFrame(conta); return; }
      const fps = n * 1000 / (t - inicio);
      if (fps < 40) alivia(fps);
    };
    requestAnimationFrame(conta);
  }, 2500);

  /* ---------- onda do clique nos botões ---------- */
  if (!reduz) document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.botao');
    if (!b) return;
    const r = b.getBoundingClientRect();
    const o = document.createElement('span');
    o.className = 'onda-clique';
    o.style.left = `${e.clientX - r.left}px`;
    o.style.top = `${e.clientY - r.top}px`;
    b.appendChild(o);
    setTimeout(() => o.remove(), 700);
  });

  /* ---------- risco vermelho desenhado à mão sob as palavras-chave ---------- */
  const RISCO = '<svg class="risco" viewBox="0 0 200 12" preserveAspectRatio="none" aria-hidden="true"><path d="M3 8.5C45 3.5 110 2.5 197 6.5"/></svg>';
  const risca = (el, anima) => {
    if (!el || $('.risco', el)) return;
    el.insertAdjacentHTML('beforeend', RISCO);
    if (!anima || !temGsap || reduz) return;
    const p = $('.risco path', el);
    p.setAttribute('pathLength', '1');
    gsap.fromTo(p, { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: .9, ease: 'power2.inOut' });
  };
  if (!temGsap || reduz) { $$('.destaque').forEach(el => risca(el)); risca($('[data-hero-giro]')); }

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

  /* ---------- centro de imagem no celular: carrossel de salas ---------- */
  const listaEx = $('[data-ex-lista]'), pontosEx = $('[data-ex-pontos]');
  const cartoesEx = $$('.exame', listaEx || undefined);
  if (listaEx && pontosEx && cartoesEx.length) {
    cartoesEx.forEach(c => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('aria-label', `Ver ${$('h3', c).textContent}`);
      b.addEventListener('click', () => listaEx.scrollTo({ left: c.offsetLeft - (listaEx.clientWidth - c.offsetWidth) / 2, behavior: reduz ? 'auto' : 'smooth' }));
      pontosEx.appendChild(b);
    });
    const marcaPonto = i => [...pontosEx.children].forEach((b, k) => b.setAttribute('aria-current', String(k === i)));
    let listaVisivel = false;
    const atualiza = () => {
      const centro = listaEx.scrollLeft + listaEx.clientWidth / 2;
      let i = 0, menor = Infinity;
      cartoesEx.forEach((c, k) => { const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centro); if (d < menor) { menor = d; i = k; } });
      marcaPonto(i);
      if (listaVisivel) cartoesEx[i].classList.add('visto');
    };
    if (!reduz) html.classList.add('revela-ex');
    new IntersectionObserver(([en]) => { listaVisivel = en.isIntersecting; if (listaVisivel) atualiza(); }, { threshold: .3 }).observe(listaEx);
    let pedido = 0;
    listaEx.addEventListener('scroll', () => { cancelAnimationFrame(pedido); pedido = requestAnimationFrame(atualiza); }, { passive: true });
    marcaPonto(0);
  }

  /* ---------- luz nas caixas e botões ---------- */
  if (fino) {
    $$('[data-card]').forEach(c => {
      c.addEventListener('pointermove', e => {
        const r = c.getBoundingClientRect();
        c.style.setProperty('--mx', `${e.clientX - r.left}px`);
        c.style.setProperty('--my', `${e.clientY - r.top}px`);
        c.style.setProperty('--px', ((e.clientX - r.left) / r.width - .5).toFixed(3));
        c.style.setProperty('--py', ((e.clientY - r.top) / r.height - .5).toFixed(3));
      });
      c.addEventListener('pointerleave', () => { c.style.setProperty('--px', 0); c.style.setProperty('--py', 0); });
    });
    // a cor do botão entra pelo lado do cursor
    $$('.botao').forEach(b => {
      const lado = e => { const r = b.getBoundingClientRect(); b.style.setProperty('--origem', e.clientX < r.left + r.width / 2 ? 'left center' : 'right center'); };
      b.addEventListener('pointerenter', lado);
      b.addEventListener('pointerleave', lado);
    });
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
    if (!a || a.getAttribute('href') === '#' || a.closest('.exames__indice') && exST) return;
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
  const prog = $('[data-progresso]');
  ScrollTrigger.create({
    start: 0, end: 'max',
    onUpdate: s => {
      const y = s.scroll();
      nav.classList.toggle('compacto', y > 60);
      nav.classList.toggle('oculto', s.direction === 1 && y > 500 && menu.hidden);
      if (barraMovel) barraMovel.classList.toggle('recolhida', s.direction === 1 && y > 400 && menu.hidden);
      prog.style.transform = `scaleX(${s.progress})`;
      if (flut) flut.classList.toggle('escondido', y < innerHeight * .7 || y > s.end - 600);
    }
  });
  $$('main > section[id]').forEach(sec => ScrollTrigger.create({
    trigger: sec, start: 'top 50%', end: 'bottom 50%',
    // ao sair de uma seção sem entrar em outra do menu, o destaque se apaga
    onToggle: s => { if (s.isActive) defineAtual(sec.id); else if (atual && atual.getAttribute('href') === '#' + sec.id) defineAtual(null); }
  }));

  const quebra = (alvo, tipo = 'lines,words') => window.SplitText ? SplitText.create(alvo, { type: tipo, mask: 'lines', linesClass: 'linha' }) : null;
  const desenha = path => { path.setAttribute('pathLength', '1'); gsap.set(path, { strokeDasharray: 1, strokeDashoffset: 1 }); return path; };

  /* ---------- hero: entrada ---------- */
  const hero = $('[data-hero]');
  const entradaHero = (() => {
    const titulo = $('[data-hero-titulo]', hero);
    const giro = $('[data-hero-giro]', titulo), final = giro.textContent, rotulo = titulo.textContent;
    const passos = ['família.', 'prevenção.'];
    if (window.SplitText) giro.textContent = passos[0];
    const sp = quebra(titulo);
    if (sp) titulo.setAttribute('aria-label', rotulo);
    const palavras = sp ? sp.words.slice(0, -1) : [titulo];
    const ultima = sp ? sp.words[sp.words.length - 1] : null;
    const tl = gsap.timeline({ paused: true, defaults: { ease: 'expo.out' }, onComplete: vivaHero });
    tl.fromTo('[data-hero-luz]', { opacity: 0, scale: .55 }, { opacity: 1, scale: 1, duration: 2.2 }, 0)
      .fromTo('[data-hero-foto]', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 1.2 }, .1)
      .fromTo('[data-hero-foto] img', { clipPath: 'inset(100% 0% 0% 0%)', scale: 1.3 }, { clipPath: 'inset(0% 0% 0% 0%)', scale: 1, duration: 1.7, ease: 'expo.inOut' }, .15)
      .fromTo(titulo, { opacity: 0 }, { opacity: 1, duration: .01 }, .25)
      .fromTo(palavras, { yPercent: 118, rotate: 5 }, { yPercent: 0, rotate: 0, duration: 1.25, stagger: .08 }, .25);
    if (ultima) {
      let t = .25 + palavras.length * .08;
      tl.fromTo(ultima, { yPercent: 118, rotate: 5 }, { yPercent: 0, rotate: 0, duration: .8 }, t);
      passos.slice(1).concat(final).forEach(txt => {
        t += .7;
        tl.to(ultima, { yPercent: -118, duration: .26, ease: 'power2.in' }, t)
          .call(() => { ultima.textContent = txt; }, null, t + .27)
          .fromTo(ultima, { yPercent: 118 }, { yPercent: 0, duration: .6, immediateRender: false }, t + .27);
      });
      // a palavra final pousa e ganha o risco vermelho
      // (o revert devolve o texto do momento da divisão: a palavra final volta a ser "saúde.")
      tl.call(() => { sp.revert(); const g = $('[data-hero-giro]', hero); g.textContent = final; g.classList.add('brilha'); risca(g, true); }, null, t + 1);
    }
    tl.fromTo('[data-hero-item]', { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 1.1, stagger: .12 }, .8)
      .fromTo('[data-hero-chip]', { opacity: 0, scale: .6, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 1.1, stagger: .14, ease: 'back.out(1.6)' }, 1.05);
    $$('[data-hero-conta]', hero).forEach(n => {
      const obj = { v: 0 };
      n.textContent = '0';
      tl.to(obj, { v: +n.dataset.heroConta, duration: 1.9, onUpdate: () => { n.textContent = Math.round(obj.v); } }, 1.2);
    });
    if (!leve) gsap.to('[data-hero-palco]', { yPercent: -7, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
    return tl;
  })();
  // depois da entrada: o botão bate, os chips flutuam, a luz respira e o palco segue o cursor
  function vivaHero() {
    $('.hero__agendar', hero).classList.add('chama');
    const lacos = leve ? [] : [
      ...$$('[data-hero-chip]', hero).map((c, i) => gsap.to(c, { yPercent: i % 2 ? 7 : -7, duration: 3.2 + i * .6, ease: 'sine.inOut', yoyo: true, repeat: -1 })),
      gsap.to('[data-hero-luz]', { scale: 1.05, duration: 4.5, ease: 'sine.inOut', yoyo: true, repeat: -1 })
    ];
    ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: s => { lacos.forEach(t => s.isActive ? t.resume() : t.pause()); hero.classList.toggle('parado', !s.isActive); } });
    if (!fino) return;
    const camadas = $$('[data-prof]', hero).map(el => ({ p: +el.dataset.prof, x: gsap.quickTo(el, 'x', { duration: 1.2, ease: 'power3' }), y: gsap.quickTo(el, 'y', { duration: 1.2, ease: 'power3' }) }));
    const l = $('[data-hero-luz]', hero);
    const lx = gsap.quickTo(l, 'x', { duration: 1.6, ease: 'power3' }), ly = gsap.quickTo(l, 'y', { duration: 1.6, ease: 'power3' });
    hero.addEventListener('pointermove', e => {
      const r = hero.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - .5, ny = (e.clientY - r.top) / r.height - .5;
      camadas.forEach(c => { c.x(nx * c.p); c.y(ny * c.p); });
      lx(nx * 40); ly(ny * 40);
    });
    hero.addEventListener('pointerleave', () => { camadas.forEach(c => { c.x(0); c.y(0); }); lx(0); ly(0); });
  }
  const comecaHero = () => { html.classList.remove('carregando'); entradaHero.play(); };

  /* ---------- abertura: os três corações se encontram e batem ---------- */
  const cortina = $('.cortina');
  if (html.classList.contains('intro') && cortina && scrollY < 40) {
    (window.srT || []).forEach(clearTimeout);
    if (lenis) lenis.stop();
    const letras = window.SplitText ? SplitText.create('.cortina__marca .wordmark', { type: 'chars', mask: 'chars' }) : null;
    const tc = gsap.timeline({ defaults: { ease: 'expo.out' }, onComplete: () => { html.classList.remove('intro'); if (lenis) lenis.start(); ScrollTrigger.refresh(); } });
    tc.from('.cortina .h--topo', { y: -46, rotation: -14, opacity: 0, duration: 1.2 }, .1)
      .from('.cortina .h--esq', { x: -46, y: 30, rotation: -24, opacity: 0, duration: 1.2 }, .22)
      .from('.cortina .h--dir', { x: 46, y: 30, rotation: 24, opacity: 0, duration: 1.2 }, .34)
      .fromTo('.cortina__luz', { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, duration: 1.6, ease: 'power2.out' }, .7)
      .to('.cortina__simbolo', { keyframes: { scale: [1, 1.14, .97, 1.08, 1] }, duration: .9, ease: 'power1.inOut' }, 1.05)
      .from(letras ? letras.chars : '.cortina__marca .wordmark', { yPercent: 110, opacity: 0, duration: 1, stagger: .03 }, .9)
      .to('.cortina__pular', { opacity: 0, duration: .3 }, 2.1)
      .to('.cortina__marca', { y: -16, opacity: 0, filter: 'blur(6px)', duration: .7, ease: 'power2.in' }, 2.25)
      .add(comecaHero, 2.45)
      .to(cortina, { yPercent: -100, duration: 1.1, ease: 'expo.inOut' }, 2.5);
    cortina.addEventListener('click', () => tc.timeScale(4));
  } else {
    html.classList.remove('intro');
    (window.srT || []).forEach(clearTimeout);
    comecaHero();
  }

  // prepara o texto um pouco antes de ele entrar na tela, em vez de fatiar tudo na abertura
  const perto = (el, fn) => ScrollTrigger.create({ trigger: el, start: () => `top bottom+=${Math.round(innerHeight * .35)}`, once: true, onEnter: fn });

  /* ---------- títulos: palavras sobem de uma máscara ---------- */
  $$('[data-palavras]').forEach(h => perto(h, () => {
    const sp = quebra(h);
    if (!sp) { $$('.destaque', h).forEach(el => risca(el)); return; }
    // as palavras sobem; quando assentam, a palavra-chave ganha o risco desenhado
    gsap.from(sp.words, {
      yPercent: 118, rotate: 4, duration: 1.1, stagger: .04, ease: 'expo.out', scrollTrigger: { trigger: h, start: 'top 88%' },
      onComplete: () => { sp.revert(); $$('.destaque', h).forEach(el => risca(el, true)); }
    });
  }));

  /* ---------- declaração: acende palavra por palavra ---------- */
  const decl = $('[data-declaracao]');
  if (decl && window.SplitText && !leve) perto(decl, () => {
    const sp = SplitText.create(decl, { type: 'words' });
    gsap.fromTo(sp.words, { opacity: .14 }, { opacity: 1, stagger: .1, ease: 'none', scrollTrigger: { trigger: decl, start: 'top 80%', end: 'bottom 45%', scrub: true } });
  });

  /* ---------- caixas: entrada em cascata ---------- */
  const caixas = $$('[data-card]').filter(c => !c.closest('.hero'));
  gsap.set(caixas, { opacity: 0, y: 56 });
  ScrollTrigger.batch(caixas, {
    start: 'top 90%', once: true,
    onEnter: lote => {
      gsap.to(lote, { opacity: 1, y: 0, duration: 1.1, stagger: .08, ease: 'expo.out', overwrite: true, clearProps: 'transform,opacity' });
      // os ícones de dentro chegam um pouco depois, com um pulo
      const icos = lote.flatMap(c => $$('.ico, .canais .i, .sobre__fato-ico, .ajuda__ico, .bento__lista .ico', c));
      if (icos.length) gsap.from(icos, { scale: 0, rotate: -45, duration: .8, stagger: .05, delay: .3, ease: 'back.out(2.2)', clearProps: 'transform' });
    }
  });
  $$('[data-lista]').forEach(l => gsap.from(l.children, { x: -24, opacity: 0, duration: .9, stagger: .08, ease: 'expo.out', scrollTrigger: { trigger: l, start: 'top 85%' } }));
  $$('.petala:not([data-hero-foto]) > img, .moldura > img').forEach(img => gsap.from(img, { scale: 1.3, duration: 1.8, ease: 'expo.out', scrollTrigger: { trigger: img.parentElement, start: 'top 88%' } }));

  // inclinação 3D nos cartões dos três cuidados
  if (fino) $$('[data-tilt]').forEach(c => {
    const rx = gsap.quickTo(c, 'rotationX', { duration: .8, ease: 'power3' });
    const ry = gsap.quickTo(c, 'rotationY', { duration: .8, ease: 'power3' });
    const ty = gsap.quickTo(c, 'y', { duration: .8, ease: 'power3' });
    c.addEventListener('pointerenter', () => gsap.set(c, { transformPerspective: 1100 }));
    c.addEventListener('pointermove', e => {
      const r = c.getBoundingClientRect();
      rx(-((e.clientY - r.top) / r.height - .5) * 7);
      ry(((e.clientX - r.left) / r.width - .5) * 9);
      ty(-6);
    });
    c.addEventListener('pointerleave', () => { rx(0); ry(0); ty(0); });
  });

  // botões magnéticos
  if (fino) $$('[data-ima]').forEach(b => {
    const mx = gsap.quickTo(b, 'x', { duration: .6, ease: 'power3' });
    const my = gsap.quickTo(b, 'y', { duration: .6, ease: 'power3' });
    b.addEventListener('pointermove', e => {
      const r = b.getBoundingClientRect();
      mx(((e.clientX - r.left) / r.width - .5) * 14);
      my(((e.clientY - r.top) / r.height - .5) * 12);
    });
    b.addEventListener('pointerleave', () => { mx(0); my(0); });
  });

  // paralaxe das fotos
  if (!leve) $$('[data-paralaxe]').forEach(img => {
    const v = +img.dataset.paralaxe || 7;
    gsap.fromTo(img, { yPercent: -v }, { yPercent: v, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
  });

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

  /* ---------- selos de seção: o ícone gira para dentro e o rótulo se decifra letra a letra ---------- */
  const SINAIS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+';
  const embaralha = el => {
    const final = el.textContent, inicio = performance.now(), dur = 750;
    el.style.minWidth = el.offsetWidth + 'px';
    const passo = t => {
      const k = Math.min(1, (t - inicio) / dur), prontos = Math.floor(k * final.length);
      el.textContent = final.slice(0, prontos) + [...final.slice(prontos)].map(c => c === ' ' ? ' ' : SINAIS[Math.random() * SINAIS.length | 0]).join('');
      if (k < 1) requestAnimationFrame(passo); else { el.textContent = final; el.style.minWidth = ''; }
    };
    requestAnimationFrame(passo);
  };
  $$('[data-selo]').forEach(selo => {
    const ico = $('.selo-secao__ico', selo), txt = $('[data-embaralha]', selo);
    gsap.set(ico, { scale: 0, rotate: -120 });
    ScrollTrigger.create({ trigger: selo, start: 'top 90%', once: true, onEnter: () => {
      selo.classList.add('visto');
      gsap.to(ico, { scale: 1, rotate: 0, duration: 1, ease: 'back.out(2)' });
      if (txt) embaralha(txt);
    } });
  });

  /* ---------- textos de apoio: as linhas sobem da máscara, uma depois da outra ---------- */
  $$('.secao .lead, .declaracao__apoio').filter(p => !p.closest('.exame')).forEach(p => perto(p, () => {
    const sp = quebra(p, 'lines');
    if (!sp) return;
    gsap.from(sp.lines, { yPercent: 100, opacity: 0, duration: 1, stagger: .09, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 90%' }, onComplete: () => sp.revert() });
  }));

  /* ---------- especialidades: as linhas entram em cascata e os ícones pulam ---------- */
  const espLista = $('[data-esp-lista]');
  if (espLista) {
    const linhas = [...espLista.children];
    gsap.from(linhas, { opacity: 0, y: 18, duration: .8, stagger: .03, ease: 'expo.out', scrollTrigger: { trigger: espLista, start: 'top 85%' } });
    gsap.from($$('.esp__ico', espLista), { scale: 0, rotate: -60, duration: .8, stagger: .03, delay: .15, ease: 'back.out(2.2)', clearProps: 'transform', scrollTrigger: { trigger: espLista, start: 'top 85%' } });
  }

  const laco = $('[data-laco]');
  if (laco && html.classList.contains('rosa')) gsap.to(desenha(laco), { strokeDashoffset: 0, duration: 2, ease: 'power2.inOut', scrollTrigger: { trigger: laco, start: 'top 85%' } });

  /* ---------- centro de imagem ----------
     No desktop a seção fica parada enquanto a rolagem troca de sala. Com WebGL, a foto nova se dissolve
     sobre a anterior numa diagonal de borda macia, com um recuo de zoom quase imperceptível.
     Sem WebGL, as fotos simplesmente se cruzam. O texto troca junto, linha a linha. */
  let exST = null;
  const palco = $('[data-exames-palco]');
  const exames = $$('.exame', palco);
  const exLinks = $$('[data-ex-link]', palco);
  const exLuz = $('[data-ex-luz]', palco);
  let exAtivo = 0;
  const visorEl = $('[data-visor]', palco);
  const visorNome = visorEl && $('[data-visor-nome]', visorEl), visorNum = visorEl && $('[data-visor-num]', visorEl);
  const exNumero = $('[data-ex-numero]', palco), exSecao = $('[data-exames]');
  const marcaExame = i => {
    exAtivo = i;
    exLinks.forEach((a, k) => { a.classList.toggle('ativo', k === i); a.classList.toggle('feito', k < i); });
    const a = exLinks[i];
    const leg = exames[i] && $('.exame__legenda', exames[i]);
    if (leg && visorNome && visorNome.textContent !== $('span', leg).textContent) {
      visorNome.textContent = $('span', leg).textContent; visorNum.textContent = $('.num', leg).textContent;
      if (temGsap && !reduz) gsap.fromTo([visorNome, visorNum], { yPercent: 110, opacity: 0 }, { yPercent: 0, opacity: 1, duration: .7, stagger: .06, ease: 'expo.out', overwrite: true });
    }
    if (exNumero && exNumero.textContent !== String(i + 1).padStart(2, '0')) {
      exNumero.textContent = String(i + 1).padStart(2, '0');
      if (temGsap && !reduz) gsap.fromTo(exNumero, { yPercent: 30, opacity: 0, filter: 'blur(10px)' }, { yPercent: 0, opacity: 1, filter: 'blur(0px)', duration: 1.1, ease: 'expo.out', overwrite: true });
    }
    if (exSecao) exSecao.style.setProperty('--bx', (18 + i * 16) + '%');
    if (exLuz && a) Object.assign(exLuz.style, { left: a.offsetLeft + 'px', top: a.offsetTop + 'px', width: a.offsetWidth + 'px', height: a.offsetHeight + 'px', opacity: 1 });
  };

  const criaVisor = () => {
    const tela = $('[data-visor-tela]', visorEl);
    const opcoes = { antialias: false, alpha: false, depth: false, premultipliedAlpha: false };
    const gl2 = tela.getContext('webgl2', opcoes), gl = gl2 || tela.getContext('webgl', opcoes);
    if (!gl) return null;
    const vs = 'attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}';
    /* a sala nova entra como uma folha por cima da anterior, pelo lado para onde se rola. A borda é nítida
       (com antisserrilhado) e projeta uma sombra macia; por dentro da folha a foto anda só 30% do caminho
       (paralaxe) e assenta com um leve recuo de zoom; a sala que sai recua 15% e escurece. O mouse move a
       foto dentro da moldura. */
    const fs = `precision mediump float;
varying vec2 v;uniform sampler2D u_a,u_b;uniform vec2 u_ea,u_eb,u_m,u_res;uniform float u_p,u_dir;
vec2 cobre(vec2 uv,vec2 e,float z){return (uv-.5)*e/z+.5;}
void main(){
  float p=u_p;
  float x=u_dir>0.?1.-v.x:v.x;
  float borda=mix(-.03,1.03,p);
  float aa=1.5/u_res.x;
  float k=1.-smoothstep(borda-aa,borda+aa,x);
  float vivo=step(.001,p)*step(p,.999);
  vec2 par=u_m*.012;
  vec3 a=texture2D(u_a,cobre(v+vec2(u_dir*p*.15,0.)+par,u_ea,1.02+.04*p)).rgb;
  vec3 b=texture2D(u_b,cobre(v+vec2(-u_dir*(1.-p)*.3,0.)+par,u_eb,1.1-.08*p)).rgb;
  float sombra=exp(-max(x-borda,0.)*22.)*(1.-k)*vivo;
  a*=(1.-.28*p*vivo)*(1.-.45*sombra);
  float fio=exp(-max(borda-x,0.)*70.)*k*vivo;
  gl_FragColor=vec4(mix(a,b,k)+fio*.07,1.);
}`;
    const sh = (t, src) => { const o = gl.createShader(t); gl.shaderSource(o, src); gl.compileShader(o); return gl.getShaderParameter(o, gl.COMPILE_STATUS) ? o : null; };
    const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
    if (!v || !f) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, v); gl.attachShader(prog, f); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const u = n => gl.getUniformLocation(prog, n);
    const U = { a: u('u_a'), b: u('u_b'), ea: u('u_ea'), eb: u('u_eb'), p: u('u_p'), dir: u('u_dir'), m: u('u_m'), res: u('u_res') };
    gl.uniform1i(U.a, 0); gl.uniform1i(U.b, 1);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    let estado = { a: 0, b: 1, p: 0, dir: 1 }, mouse = [0, 0];
    const escala = e => { const r = tela.width / tela.height; return e > r ? [r / e, 1] : [1, e / r]; };
    // uma textura por sala; até a foto chegar, um pixel grafite. Os envios para a placa vão numa fila, um por quadro
    const fila = [];
    let andando = false;
    const anda = () => {
      if (andando) return;
      andando = true;
      const passo = async () => { const job = fila.shift(); if (!job) { andando = false; return; } await job(); requestAnimationFrame(passo); };
      requestAnimationFrame(passo);
    };
    const salas = exames.map(ex => {
      const img = $('img', ex), t = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([21, 23, 27, 255]));
      [gl.TEXTURE_WRAP_S, gl.TEXTURE_WRAP_T].forEach(k => gl.texParameteri(gl.TEXTURE_2D, k, gl.CLAMP_TO_EDGE));
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      const sala = { t, ar: 1 };
      const carrega = new Image();
      carrega.decoding = 'async';
      carrega.onload = () => fila.push(async () => {
        let fonte = carrega, invertida = false;
        if (gl2 && window.createImageBitmap) {
          // ImageBitmap decodifica fora da thread principal; a inversão vertical vem da própria criação
          try { fonte = await createImageBitmap(carrega, { imageOrientation: 'flipY' }); invertida = true; } catch (er) { fonte = carrega; }
        } else if (!gl2) {
          // WebGL1 só gera mipmap em potência de 2: a foto é redesenhada em 2048×1024 (a proporção real fica em sala.ar)
          fonte = document.createElement('canvas'); fonte.width = 2048; fonte.height = 1024;
          fonte.getContext('2d').drawImage(carrega, 0, 0, 2048, 1024);
        }
        gl.bindTexture(gl.TEXTURE_2D, t);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, !invertida);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, fonte);
        gl.generateMipmap(gl.TEXTURE_2D);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        sala.ar = carrega.naturalWidth / carrega.naturalHeight;
        desenha();
      }) && anda();
      carrega.src = img.getAttribute('src');
      return sala;
    });
    function desenha() {
      const A = salas[estado.a], B = salas[estado.b];
      gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, A.t);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, B.t);
      gl.uniform2f(U.ea, ...escala(A.ar)); gl.uniform2f(U.eb, ...escala(B.ar));
      gl.uniform1f(U.p, estado.p); gl.uniform1f(U.dir, estado.dir); gl.uniform2f(U.m, mouse[0], mouse[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    const mede = () => {
      const dpr = Math.min(devicePixelRatio || 1, 1.5);
      tela.width = Math.max(1, Math.round(tela.clientWidth * dpr)); tela.height = Math.max(1, Math.round(tela.clientHeight * dpr));
      gl.viewport(0, 0, tela.width, tela.height); gl.uniform2f(U.res, tela.width, tela.height);
      desenha();
    };
    return { mede, mostra: (a, b, p, dir = estado.dir) => { estado = { a, b, p, dir }; desenha(); }, olha: (x, y) => { mouse = [x, y]; desenha(); } };
  };
  const mm = gsap.matchMedia();
  if (!leve) mm.add('(min-width: 1025px)', () => {
    html.classList.add('pan-ex');
    const n = exames.length;
    const fotos = exames.map(e => $('.exame__foto', e));
    const textos = exames.map(e => $('.exame__texto', e));
    let visor = null;
    const mede = () => { if (visor) visor.mede(); marcaExame(exAtivo); };
    // o WebGL do visor só nasce quando a seção chega perto: na abertura do site ele não pesa nada
    if (visorEl && window.WebGLRenderingContext) html.classList.add('visor-ok');
    else gsap.set(fotos.slice(1), { autoAlpha: 0 });
    const ligaVisor = () => {
      if (visor || !html.classList.contains('visor-ok')) return;
      visor = criaVisor();
      if (!visor) { html.classList.remove('visor-ok'); fotos.forEach((f, k) => gsap.set(f, { autoAlpha: k === exAtivo ? 1 : 0 })); return; }
      Object.assign(est, { a: exAtivo, b: exAtivo, p: 1 });
      visor.mede(); visor.mostra(exAtivo, exAtivo, 1);
    };
    requestAnimationFrame(mede);
    addEventListener('resize', mede);
    gsap.set(textos.slice(1), { autoAlpha: 0 });
    // o texto segue o mesmo índice das abas: nunca fica meio apagado numa parada
    let atualEx = 0;
    const mostraTexto = i => {
      if (i === atualEx) return;
      const t = textos[i];
      gsap.to(textos[atualEx], { autoAlpha: 0, duration: .35, ease: 'power1.out', overwrite: 'auto' });
      gsap.set(t, { autoAlpha: 1 });
      // camadas: topo, título, texto e botões sobem; as linhas de informação chegam da direita; o ícone gira para dentro
      gsap.fromTo(t.children, { autoAlpha: 0, y: 18 }, { autoAlpha: 1, y: 0, duration: .75, stagger: .06, delay: .18, ease: 'power3.out', overwrite: true });
      gsap.fromTo($$('.exame__info > div', t), { x: 34, autoAlpha: 0 }, { x: 0, autoAlpha: 1, duration: .9, stagger: .08, delay: .35, ease: 'expo.out', overwrite: true });
      gsap.fromTo($('.exame__ico', t), { rotate: -90, scale: .3 }, { rotate: 0, scale: 1, duration: 1, delay: .2, ease: 'back.out(2)', overwrite: true });
      atualEx = i;
    };
    /* a rolagem só escolhe a sala: cada exame tem a sua faixa de rolagem e a troca da foto roda sozinha,
       com duração fixa, então a imagem nunca fica parada no meio da passagem. Sem snap, para não brigar
       com a rolagem suave; a aba ativa mostra quanto falta para a próxima sala. */
    const est = { a: 0, b: 0, p: 1 };
    const abas = $('.exames__indice', palco);
    const janela = visorEl && $('.visor__janela', visorEl);
    let troca = null, olha = null, solta = null, pendente = null;
    ScrollTrigger.create({ trigger: palco, start: () => `top bottom+=${innerHeight * 1.2}`, once: true, onEnter: ligaVisor });
    const passa = i => {
      const de = est.b;
      if (i === de) return;
      const dir = i > de ? 1 : -1;
      Object.assign(est, { a: de, b: i, p: 0 });
      troca = gsap.to(est, {
        p: 1, duration: 1.2, ease: 'power3.inOut', onUpdate: () => visor.mostra(est.a, est.b, est.p, dir),
        onComplete: () => { const prox = pendente; pendente = null; if (prox !== null && prox !== est.b) passa(prox); }
      });
    };
    const vaiPara = (i, de) => {
      if (visor) {
        if (troca && troca.isActive()) { pendente = i; troca.timeScale(2.4); return; }
        passa(i);
      } else if (html.classList.contains('visor-ok')) {
        // o visor ainda não nasceu (chegada direta pelo link): ele já abre na sala certa
        Object.assign(est, { a: i, b: i, p: 1 });
      } else {
        gsap.to(fotos[de], { autoAlpha: 0, duration: .8, ease: 'power1.out', overwrite: true });
        gsap.fromTo(fotos[i], { autoAlpha: 0, scale: 1.04 }, { autoAlpha: 1, scale: 1, duration: 1.1, ease: 'power2.out', overwrite: true });
      }
    };
    // o mouse move a foto um pouco por dentro do quadro (paralaxe)
    if (visorEl && fino) {
      const m = { x: 0, y: 0 };
      const aplica = () => visor && visor.olha(m.x, m.y);
      olha = e => {
        const r = visorEl.getBoundingClientRect();
        gsap.to(m, { x: (e.clientX - r.left) / r.width - .5, y: .5 - (e.clientY - r.top) / r.height, duration: 1.1, ease: 'power3', overwrite: true, onUpdate: aplica });
      };
      solta = () => gsap.to(m, { x: 0, y: 0, duration: 1.4, ease: 'power3', overwrite: true, onUpdate: aplica });
      visorEl.addEventListener('pointermove', olha);
      visorEl.addEventListener('pointerleave', solta);
    }
    exST = ScrollTrigger.create({
      trigger: palco, start: 'top top', end: () => `+=${n * innerHeight * .7}`, pin: true, invalidateOnRefresh: true,
      onUpdate: s => {
        const total = Math.min(n - .001, s.progress * n);
        const i = Math.floor(total), local = total - i;
        if (i !== exAtivo) { const de = exAtivo; marcaExame(i); vaiPara(i, de); }
        mostraTexto(i);
        if (abas) abas.style.setProperty('--carga', local.toFixed(3));
      }
    });
    // entrada: o palco sobe e cresce um pouco enquanto a seção chega
    gsap.fromTo(html.classList.contains('visor-ok') ? visorEl : fotos[0], { clipPath: 'inset(10% 16% 10% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none', scrollTrigger: { trigger: palco, start: 'top 85%', end: 'top top', scrub: true } });
    gsap.fromTo(abas, { y: 40, opacity: 0 }, { y: 0, opacity: 1, ease: 'none', scrollTrigger: { trigger: palco, start: 'top 90%', end: 'top 30%', scrub: true } });
    marcaExame(0);
    const clique = e => {
      const a = e.target.closest('[data-ex-link]');
      if (!a || !exST) return;
      e.preventDefault();
      rolaPara(exST.start + ((+a.dataset.exLink + .5) / n) * (exST.end - exST.start));
    };
    palco.addEventListener('click', clique);
    return () => {
      html.classList.remove('pan-ex', 'visor-ok'); exST = null;
      palco.removeEventListener('click', clique); removeEventListener('resize', mede);
      if (troca) troca.kill();
      if (olha) { visorEl.removeEventListener('pointermove', olha); visorEl.removeEventListener('pointerleave', solta); }
      gsap.set([...fotos, ...textos, ...textos.flatMap(t => [...t.children]), abas, visorEl, janela, exNumero].filter(Boolean), { clearProps: 'all' });
    };
  });

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
