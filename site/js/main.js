(() => {
  const REC = false;

  // split text into letters, keeping inline elements (photo pills) in place
  document.querySelectorAll('.split').forEach(root => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden','true');
            [...part].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', i++); w.append(s); });
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.classList && n.classList.contains('ph')) {
          n.style.setProperty('--i', i++); n.setAttribute('aria-hidden','true');
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(root);
  });

  // 48 radial ticks
  const t = document.getElementById('ticks'); let s = '';
  for (let k = 0; k < 48; k++) { const a = k * 7.5; s += `<line x1="42" y1="2" x2="42" y2="${k % 4 ? 8 : 11}" stroke="currentColor" stroke-width="1" transform="rotate(${a} 42 42)"/>`; }
  t.innerHTML = s;

  // smooth, eased scroll for in-page links (menu, buttons)
  const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  let scrollAnim = null;
  function glideTo(y) {
    cancelAnimationFrame(scrollAnim);
    const start = scrollY, dist = y - start, t0 = performance.now();
    const dur = Math.min(1800, Math.max(900, Math.abs(dist) * .4));
    const step = now => { const t = Math.min(1, (now - t0) / dur); scrollTo(0, start + dist * ease(t)); if (t < 1) scrollAnim = requestAnimationFrame(step); };
    scrollAnim = requestAnimationFrame(step);
  }
  ['wheel', 'touchstart', 'keydown'].forEach(ev => addEventListener(ev, () => cancelAnimationFrame(scrollAnim), { passive: true }));
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = id ? document.getElementById(id) : document.body; if (!el) return;
    e.preventDefault();
    glideTo(id === 'top' ? 0 : el.getBoundingClientRect().top + scrollY);
  });

  // email: assembled in the browser so address-harvesting bots don't find it in the HTML
  const mail = document.getElementById('mail');
  if (mail) { const a = mail.dataset.u + '@' + mail.dataset.d; mail.textContent = a; mail.href = 'mailto:' + a; }

  // menu
  const mb = document.getElementById('menuBtn'), menu = document.getElementById('menu');
  mb.addEventListener('click', () => { const o = menu.classList.toggle('open'); mb.setAttribute('aria-expanded', o); });
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') { menu.classList.remove('open'); mb.setAttribute('aria-expanded', false); } });

  // video
  const vid = document.getElementById('vid'), v = document.getElementById('video');
  let musicWas = false;
  document.getElementById('playBtn').addEventListener('click', () => { vid.classList.add('open'); musicWas = !window.__music.audio.paused; if (musicWas) window.__music.stopM(); v.muted = false; v.play().catch(() => {}); });
  const close = () => { if (!vid.classList.contains('open')) return; vid.classList.remove('open'); v.pause(); if (musicWas) window.__music.playM(); };
  document.getElementById('vidClose').addEventListener('click', close);
  vid.addEventListener('click', e => { if (e.target === vid) close(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') close(); });


  // lightbox
  const items = [...document.querySelectorAll('.zoom')];
  const lb = document.getElementById('lb'), lbImg = document.getElementById('lbImg'), lbCap = document.getElementById('lbCap'), lbYear = document.getElementById('lbYear');
  let cur = 0, lastFocus = null;
  function show(i) {
    cur = (i + items.length) % items.length;
    const el = items[cur], img = el.querySelector('img');
    lbImg.src = img.src; lbImg.alt = img.alt;
    const cap = el.querySelector('figcaption');
    if (cap) { const sp = cap.querySelectorAll('span'); lbCap.innerHTML = sp[0].innerHTML; lbYear.textContent = sp[1].textContent; }
    else { lbCap.textContent = img.alt; lbYear.textContent = '2024–25'; }
  }
  function openLb(i) { lastFocus = document.activeElement; show(i); lb.classList.add('open'); document.getElementById('lbClose').focus(); }
  function closeLb() { lb.classList.remove('open'); if (lastFocus) lastFocus.focus(); }
  items.forEach((el, i) => {
    el.addEventListener('click', () => openLb(i));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); } });
  });
  document.getElementById('lbClose').addEventListener('click', closeLb);
  document.getElementById('lbPrev').addEventListener('click', () => show(cur - 1));
  document.getElementById('lbNext').addEventListener('click', () => show(cur + 1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowLeft') show(cur - 1); else if (e.key === 'ArrowRight') show(cur + 1);
  });

  // music: starts on the first click or key press, like the current site; the button toggles it
  const audio = document.getElementById('audio'), mBtn = document.getElementById('music'), mLabel = document.getElementById('musicLabel');
  audio.volume = .22;
  const setM = on => { mBtn.setAttribute('aria-pressed', on); mLabel.textContent = on ? 'Music on' : 'Music off'; };
  const playM = () => audio.play().then(() => setM(true)).catch(() => setM(false));
  const stopM = () => { audio.pause(); setM(false); };
  let userChose = false;
  mBtn.addEventListener('click', e => { e.stopPropagation(); userChose = true; audio.paused ? playM() : stopM(); });
  const first = e => { if (userChose || e.target.closest('#music, #playBtn, .vid, #soundBtn')) return; userChose = true; playM(); };
  addEventListener('pointerdown', first, { once: false });
  addEventListener('keydown', first);
  document.addEventListener('visibilitychange', () => { if (document.hidden && !audio.paused) { audio.pause(); audio._resume = true; } else if (!document.hidden && audio._resume) { audio._resume = false; playM(); } });
  window.__music = { audio, playM, stopM };

  // scroll-linked effects
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const stage = document.getElementById('stage'), photo = document.getElementById('photo'),
        cut = document.getElementById('cutout'), melt = document.getElementById('melt'),
        frameImg = document.getElementById('frameImg'), frame = document.getElementById('frame');
  const phone = matchMedia('(max-width:760px)');
  const finale = document.getElementById('contact'), card = document.getElementById('finaleCard');
  const intro = document.getElementById('top'), mask = document.getElementById('mask'), maskText = document.getElementById('maskText'),
        introCopy = document.getElementById('introCopy'), vidUi = document.getElementById('vidUi'), nav = document.getElementById('nav'), bgvid = document.getElementById('bgvid');
  let origin = null;
  const WORD = { w: 9840.0, upm: 2000, cap: 1500, stemX: 8467.0, stemY: -675.0 };
  const wordG = document.getElementById('wordG');
  function findOrigin() {
    // lay the traced word out like the CSS: min(max(15.6vw, 24svh), 17.5vw), cap middle at 56% height
    const vw = innerWidth, vh = innerHeight;
    const fs = Math.min(Math.max(.156 * vw, .24 * vh), .175 * vw), k = fs / WORD.upm;
    const tx = vw / 2 - WORD.w * k / 2, ty = .56 * vh + WORD.cap * k / 2;
    wordG.setAttribute('transform', `translate(${tx} ${ty}) scale(${k})`);
    origin = { x: tx + WORD.stemX * k, y: ty + WORD.stemY * k };
    mask.style.transformOrigin = `${origin.x}px ${origin.y}px`;
  }
  let lastBlur = -1;
  function apply(sy) {
    const vh = innerHeight;
    // landing: 0 → 1 across the first 1.6 screens of scroll
    const travel = intro.offsetHeight - vh;
    const p = Math.min(1, Math.max(0, sy / (travel * .75)));
    const e = p * p * p;
    if (!origin) findOrigin();
    const sc = reduced ? 1 : 1 + e * 90;
    const op = reduced ? 1 - Math.max(0, Math.min(1, (p - .25) / .35)) : 1 - Math.max(0, Math.min(1, (p - .55) / .3));
    mask.style.transform = `scale(${sc.toFixed(3)})`;
    mask.style.opacity = op.toFixed(3);
    mask.style.visibility = op <= 0 ? 'hidden' : 'visible';
    introCopy.style.opacity = Math.max(0, 1 - p * 5);
    const ui = Math.max(0, Math.min(1, (p - .8) / .2));
    vidUi.style.opacity = ui; vidUi.classList.toggle('on', ui > .5);
    nav.classList.toggle('light', p > .55 && sy < travel + vh * .5);
    // finale: reverse melt as it arrives
    const r = finale.getBoundingClientRect();
    const q = Math.max(0, Math.min(1, 1 - r.top / vh));
    const base = phone.matches ? 'translate(0,-50%)' : 'translate(-50%,-50%)';
    stage.style.transform = reduced ? base : `${base} translateY(${(1 - q) * -0.32 * vh}px)`;
    melt.style.height = (100 - 66 * q) + '%';
    melt.style.setProperty('--solid', ((1 - q) * 62) + '%');
    const b = reduced ? 0 : Math.round(6 * (1 - q) * 2) / 2;
    if (b !== lastBlur) { lastBlur = b; photo.style.filter = cut.style.filter = b ? `blur(${b}px)` : ''; }
    if (!reduced) {
      const fr = frame.getBoundingClientRect();
      const fq = Math.max(-1, Math.min(1, (fr.top + fr.height / 2 - vh / 2) / vh));
      frameImg.style.transform = `translateY(${fq * -7}%)`;
    }
  }
  addEventListener('resize', () => { origin = null; apply(scrollY); });
  // only decode the landing video while it's on screen
  new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) bgvid.play().catch(() => {}); else bgvid.pause(); }), { threshold: 0 }).observe(document.querySelector('.sticky'));

  // landing video sound
  const soundBtn = document.getElementById('soundBtn'), soundLabel = document.getElementById('soundLabel');
  let musicBefore = false;
  soundBtn.addEventListener('click', e => {
    e.stopPropagation();
    if (bgvid.muted) {
      musicBefore = !window.__music.audio.paused; if (musicBefore) window.__music.stopM();
      bgvid.muted = false; bgvid.currentTime = 0; bgvid.play().catch(() => {});
      soundBtn.setAttribute('aria-pressed', true); soundLabel.textContent = 'Sound off';
    } else {
      bgvid.muted = true; soundBtn.setAttribute('aria-pressed', false); soundLabel.textContent = 'Sound on';
      if (musicBefore) window.__music.playM();
    }
  });
  // mute the landing clip once it scrolls away
  new IntersectionObserver(es => es.forEach(en => { if (!en.isIntersecting && !bgvid.muted) soundBtn.click(); }), { threshold: 0 }).observe(document.querySelector('.sticky'));

  // reveals
  const reveals = [...document.querySelectorAll('.reveal')];

  if (!REC) {
    let ticking = false;
    addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { ticking = false; apply(scrollY); }); } }, { passive: true });
    addEventListener('resize', () => apply(scrollY));
    apply(scrollY);
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }), { threshold: 0, rootMargin: '0px 0px -18% 0px' });
    reveals.forEach(r => io.observe(r));
    requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('loaded')));
  } else {
    // recorder mode: deterministic 6.5s glide driven by a Web Animation
    document.documentElement.style.overflow = 'hidden';
    const page = document.getElementById('page');
    const secA = document.getElementById('statement'), secB = document.getElementById('facts');
    const s2 = secA.offsetTop, s3 = secB.offsetTop;
    const D = 6500, ease = 'cubic-bezier(.65,0,.35,1)';
    const anim = page.animate([
      { transform: 'translateY(0)', offset: 0 },
      { transform: 'translateY(0)', offset: 1950 / D, easing: ease },
      { transform: `translateY(${-s2}px)`, offset: 3350 / D },
      { transform: `translateY(${-s2}px)`, offset: 4250 / D, easing: ease },
      { transform: `translateY(${-s3}px)`, offset: 5550 / D },
      { transform: `translateY(${-s3}px)`, offset: 1 }
    ], { duration: D, fill: 'forwards' });
    document.body.classList.add('loaded');
    const fired = [false, false];
    (function loop() {
      const ty = new DOMMatrixReadOnly(getComputedStyle(page).transform).m42;
      apply(-ty);
      const ct = anim.currentTime || 0;
      if (!fired[0] && ct >= 2650) { secA.classList.add('in'); fired[0] = true; }
      if (!fired[1] && ct >= 4850) { secB.classList.add('in'); fired[1] = true; }
      if (anim.playState !== 'finished') requestAnimationFrame(loop); else apply(-ty);
    })();
  }
})();
