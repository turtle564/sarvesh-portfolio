(() => {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  document.documentElement.classList.add('js');
  const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp01 = gsap.utils.clamp(0, 1);

  // One motion vocabulary for the whole page: arrivals decelerate, exits are quicker.
  const EASE_IN = 'power3.out', EASE_OUT = 'power2.in', ENTER = 0.55, EXIT = 0.35;

  /* ───────── text split into letters (keeps inline elements in place) ───────── */
  $$('.split').forEach(root => {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) { frag.append(document.createTextNode(' ')); return; }
            const w = document.createElement('span'); w.className = 'w'; w.setAttribute('aria-hidden', 'true');
            [...part].forEach(c => { const s = document.createElement('span'); s.className = 'ch'; s.textContent = c; s.style.setProperty('--i', i++); w.append(s); });
            frag.append(w);
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1) walk(n);
      });
    };
    walk(root);
  });

  // 48 radial ticks on the play badge
  const t = $('#ticks'); let s = '';
  for (let k = 0; k < 48; k++) s += `<line x1="42" y1="2" x2="42" y2="${k % 4 ? 8 : 11}" stroke="currentColor" stroke-width="1" transform="rotate(${k * 7.5} 42 42)"/>`;
  t.innerHTML = s;

  /* ───────── glide to sections (interruptible: any wheel/touch/key cancels it) ───────── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]'); if (!a) return;
    const id = a.getAttribute('href').slice(1);
    const el = document.getElementById(id); if (!el) return;
    e.preventDefault();
    const y = id === 'top' ? 0 : el.getBoundingClientRect().top + scrollY;
    const dist = Math.abs(y - scrollY);
    // longer trips take a little longer, but never drag: duration grows with the square root of distance
    gsap.to(window, { scrollTo: { y, autoKill: true }, duration: gsap.utils.clamp(0.7, 1.6, 0.25 + Math.sqrt(dist) / 70), ease: 'power3.inOut' });
  });

  // email, assembled here so harvesting bots don't find it in the HTML
  const mail = $('#mail');
  if (mail) { const a = mail.dataset.u + '@' + mail.dataset.d; mail.textContent = a; mail.href = 'mailto:' + a; }

  /* ───────── menu (eases open; CSS handles the motion) ───────── */
  const mb = $('#menuBtn'), menu = $('#menu');
  const setMenu = open => { menu.classList.toggle('open', open); mb.setAttribute('aria-expanded', open); };
  mb.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
  menu.addEventListener('click', e => { if (e.target.tagName === 'A') setMenu(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('open')) { setMenu(false); mb.focus(); } });

  /* ───────── music ───────── */
  const audio = $('#audio'), mBtn = $('#music'), mLabel = $('#musicLabel');
  audio.volume = 0.22;
  const setM = on => { mBtn.setAttribute('aria-pressed', on); mLabel.textContent = on ? 'Music on' : 'Music off'; };
  const playM = () => audio.play().then(() => setM(true)).catch(() => setM(false));
  const stopM = () => { audio.pause(); setM(false); };
  let userChose = false;
  mBtn.addEventListener('click', e => { e.stopPropagation(); userChose = true; audio.paused ? playM() : stopM(); });
  const first = e => { if (userChose || e.target.closest('#music, #playBtn, .vid, #soundBtn')) return; userChose = true; playM(); };
  addEventListener('pointerdown', first);
  addEventListener('keydown', first);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && !audio.paused) { audio.pause(); audio._resume = true; }
    else if (!document.hidden && audio._resume) { audio._resume = false; playM(); }
  });

  /* ───────── video overlay (play badge) ───────── */
  const vid = $('#vid'), v = $('#video');
  let musicWas = false;
  $('#playBtn').addEventListener('click', () => {
    vid.classList.add('open'); musicWas = !audio.paused; if (musicWas) stopM(); v.muted = false; v.play().catch(() => {});
    if (!reduced) gsap.fromTo(v, { scale: 0.94, autoAlpha: 0 }, { scale: 1, autoAlpha: 1, duration: ENTER, ease: EASE_IN });
  });
  const closeVid = () => { if (!vid.classList.contains('open')) return; vid.classList.remove('open'); v.pause(); if (musicWas) playM(); };
  $('#vidClose').addEventListener('click', closeVid);
  vid.addEventListener('click', e => { if (e.target === vid) closeVid(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeVid(); });

  /* ───────── photo viewer: the photo grows out of its thumbnail ───────── */
  const items = $$('.zoom');
  const lb = $('#lb'), lbImg = $('#lbImg'), lbCap = $('#lbCap'), lbYear = $('#lbYear');
  let cur = 0, lastFocus = null, lbBusy = null;
  const thumbOf = i => items[i].querySelector('img');
  function fill(i) {
    cur = (i + items.length) % items.length;
    const el = items[cur], img = thumbOf(cur);
    lbImg.src = img.src; lbImg.alt = img.alt;
    const cap = el.querySelector('figcaption');
    if (cap) { const sp = cap.querySelectorAll('span'); lbCap.innerHTML = sp[0].innerHTML; lbYear.textContent = sp[1].textContent; }
    else { lbCap.textContent = img.alt; lbYear.textContent = '2024–25'; }
  }
  // the transform that puts the big image over the thumbnail (uniform scale, so nothing stretches)
  function fromThumb(i) {
    const a = thumbOf(i).getBoundingClientRect(), b = lbImg.getBoundingClientRect();
    if (!b.width || !a.width) return { x: 0, y: 0, scale: 0.9 };
    return { x: (a.left + a.width / 2) - (b.left + b.width / 2), y: (a.top + a.height / 2) - (b.top + b.height / 2), scale: Math.min(a.width / b.width, a.height / b.height) };
  }
  async function openLb(i) {
    lastFocus = document.activeElement; fill(i);
    lb.classList.add('open'); $('#lbClose').focus();
    if (reduced) return;
    try { await lbImg.decode(); } catch (e) {}
    if (lbBusy) lbBusy.kill();
    lbBusy = gsap.timeline()
      .fromTo(lb, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'none' }, 0)
      .from(lbImg, { ...fromThumb(i), duration: ENTER + 0.1, ease: EASE_IN }, 0)
      .from('#lb figcaption', { autoAlpha: 0, y: 8, duration: 0.3, ease: EASE_IN }, 0.3);
  }
  function closeLb() {
    if (!lb.classList.contains('open')) return;
    const done = () => { lb.classList.remove('open'); gsap.set([lb, lbImg], { clearProps: 'all' }); if (lastFocus) lastFocus.focus(); };
    if (reduced) return done();
    if (lbBusy) lbBusy.kill();
    lbBusy = gsap.timeline({ onComplete: done })
      .to(lbImg, { ...fromThumb(cur), duration: EXIT, ease: EASE_OUT }, 0)
      .to(lb, { opacity: 0, duration: EXIT, ease: 'none' }, 0.05);
  }
  function step(d) {
    if (reduced) return fill(cur + d);
    gsap.to(lbImg, { autoAlpha: 0, x: -24 * d, duration: 0.16, ease: EASE_OUT, onComplete: () => {
      fill(cur + d);
      gsap.fromTo(lbImg, { autoAlpha: 0, x: 24 * d }, { autoAlpha: 1, x: 0, duration: 0.3, ease: EASE_IN });
    } });
  }
  items.forEach((el, i) => {
    el.addEventListener('click', () => openLb(i));
    el.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(i); } });
  });
  $('#lbClose').addEventListener('click', closeLb);
  $('#lbPrev').addEventListener('click', () => step(-1));
  $('#lbNext').addEventListener('click', () => step(1));
  lb.addEventListener('click', e => { if (e.target === lb) closeLb(); });
  addEventListener('keydown', e => {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') closeLb(); else if (e.key === 'ArrowLeft') step(-1); else if (e.key === 'ArrowRight') step(1);
  });

  /* ───────── 1 · landing: zoom through the H ───────── */
  const intro = $('#top'), mask = $('#mask'), wordG = $('#wordG'), introCopy = $('#introCopy'),
        vidUi = $('#vidUi'), nav = $('#nav'), bgvid = $('#bgvid');
  const WORD = { w: 9840.0, upm: 2000, cap: 1500, stemX: 8467.0, stemY: -675.0 };
  const ZOOM = 90;
  function layoutWord() {
    const vw = innerWidth, vh = innerHeight;
    const fs = Math.min(Math.max(0.156 * vw, 0.24 * vh), 0.175 * vw), k = fs / WORD.upm;
    const tx = vw / 2 - WORD.w * k / 2, ty = 0.56 * vh + WORD.cap * k / 2;
    wordG.setAttribute('transform', `translate(${tx} ${ty}) scale(${k})`);
    mask.style.transformOrigin = `${tx + WORD.stemX * k}px ${ty + WORD.stemY * k}px`;
  }
  layoutWord();
  addEventListener('resize', layoutWord);

  const landing = { p: 0 };
  const drawLanding = () => {
    const p = landing.p;
    // Exponential zoom: each bit of scroll multiplies the size by the same factor,
    // so the zoom feels even-paced instead of crawling, then lurching.
    const scale = reduced ? 1 : Math.pow(ZOOM, p);
    const fade = reduced ? clamp01((p - 0.25) / 0.35) : clamp01((p - 0.55) / 0.3);
    mask.style.transform = `scale(${scale.toFixed(4)})`;
    mask.style.opacity = (1 - fade).toFixed(3);
    mask.style.visibility = fade >= 1 ? 'hidden' : 'visible';
    introCopy.style.opacity = clamp01(1 - p * 5);
    const ui = clamp01((p - 0.8) / 0.2);
    vidUi.style.opacity = ui; vidUi.classList.toggle('on', ui > 0.5);
  };
  ScrollTrigger.create({
    trigger: intro, start: 'top top', end: 'bottom bottom',
    onUpdate: self => {
      const p = clamp01(self.progress / 0.75);
      // a short, damped catch-up gives the scroll a little weight without lagging behind the finger
      gsap.to(landing, { p, duration: reduced ? 0 : 0.35, ease: 'power2.out', overwrite: true, onUpdate: drawLanding });
      nav.classList.toggle('light', p > 0.55 && self.progress < 1);
    },
    onToggle: self => { if (self.isActive) bgvid.play().catch(() => {}); }
  });
  drawLanding();
  // the landing clip only decodes while it's on screen
  // measured on the whole landing section: the sticky video itself never 'moves' while pinned
  ScrollTrigger.create({ trigger: intro, start: 'top bottom', end: 'bottom top',
    onToggle: self => { if (self.isActive) bgvid.play().catch(() => {}); else { bgvid.pause(); if (!bgvid.muted) toggleSound(); } } });

  // landing clip sound
  const soundBtn = $('#soundBtn'), soundLabel = $('#soundLabel');
  let musicBefore = false;
  function toggleSound() {
    if (bgvid.muted) {
      musicBefore = !audio.paused; if (musicBefore) stopM();
      bgvid.muted = false; bgvid.currentTime = 0; bgvid.play().catch(() => {});
      soundBtn.setAttribute('aria-pressed', true); soundLabel.textContent = 'Sound off';
    } else {
      bgvid.muted = true; soundBtn.setAttribute('aria-pressed', false); soundLabel.textContent = 'Sound on';
      if (musicBefore) playM();
    }
  }
  soundBtn.addEventListener('click', e => { e.stopPropagation(); toggleSound(); });

  /* ───────── reading progress ───────── */
  gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });

  /* ───────── section reveals (the letter-by-letter rise stays in CSS) ───────── */
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }),
    { threshold: 0, rootMargin: '0px 0px -18% 0px' });
  $$('.reveal').forEach(r => io.observe(r));
  requestAnimationFrame(() => requestAnimationFrame(() => document.body.classList.add('loaded')));

  if (!reduced) {
    // portrait drifts gently inside its frame
    gsap.fromTo('#frameImg', { yPercent: 6 }, { yPercent: -6, ease: 'none',
      scrollTrigger: { trigger: '#frame', start: 'top bottom', end: 'bottom top', scrub: true } });

    // gallery: each photo wipes up as it arrives, a beat apart (no more than ~3 at once)
    ScrollTrigger.batch('.gallery .img', { start: 'top 88%', once: true,
      onEnter: els => {
        const imgs = els.map(e => e.querySelector('img'));
        gsap.timeline({ onComplete: () => { els.forEach(e => e.classList.add('shown')); gsap.set(els, { clearProps: 'clipPath' }); gsap.set(imgs, { clearProps: 'transform' }); } })
          .fromTo(els, { clipPath: 'inset(100% 0% 0% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.inOut', stagger: 0.09 }, 0)
          .fromTo(imgs, { scale: 1.12 }, { scale: 1, duration: 1.3, ease: EASE_IN, stagger: 0.09 }, 0.1);
      } });
  }

  /* ───────── 7 · finale: the paper parts to show the sunset ───────── */
  const stage = $('#stage'), melt = $('#melt');
  const phone = matchMedia('(max-width:760px)');
  ScrollTrigger.create({
    trigger: '#contact', start: 'top bottom', end: 'top top', scrub: reduced ? true : 0.5,
    onUpdate: self => {
      const q = self.progress;
      const base = phone.matches ? 'translate(0,-50%)' : 'translate(-50%,-50%)';
      // the photo drifts at a third of the scroll speed, so it feels further away than the page
      stage.style.transform = reduced ? base : `${base} translateY(${(1 - q) * -0.32 * innerHeight}px)`;
      melt.style.height = (100 - 66 * q) + '%';
      melt.style.setProperty('--solid', ((1 - q) * 62) + '%');
    }
  });

  /* ───────── dust in the low sun (Proton): the page's only particles ───────── */
  const canvas = $('#dust');
  if (!reduced && window.Proton && canvas) {
    const ctx = canvas.getContext('2d');
    const size = () => { const r = canvas.getBoundingClientRect(), d = Math.min(2, devicePixelRatio || 1); canvas.width = r.width * d; canvas.height = r.height * d; ctx.setTransform(1, 0, 0, 1, 0, 0); };
    size(); addEventListener('resize', size);
    const proton = new Proton();
    const em = new Proton.Emitter();
    em.rate = new Proton.Rate(new Proton.Span(2, 3), 0.3);           // a sparse, steady trickle
    em.addInitialize(new Proton.Position(new Proton.RectZone(0, 0, canvas.width, canvas.height)));
    em.addInitialize(new Proton.Radius(1.4, 3.6));
    em.addInitialize(new Proton.Life(6, 11));
    em.addInitialize(new Proton.Velocity(new Proton.Span(0.05, 0.22), new Proton.Span(70, 110), 'polar')); // drifting right, barely rising
    em.addBehaviour(new Proton.Color(['#FFE9BF', '#FFD58A', '#FFF6E2']));
    em.addBehaviour(new Proton.Alpha(new Proton.Span(0.55, 0.9), 0));
    em.addBehaviour(new Proton.RandomDrift(6, 3, 0.25));
    em.addBehaviour(new Proton.Gravity(-0.01));
    em.emit();
    proton.addEmitter(em);
    proton.addRenderer(new Proton.CanvasRenderer(canvas));
    let running = false, raf = 0;
    const tick = () => { proton.update(); raf = requestAnimationFrame(tick); };
    const run = on => { if (on === running) return; running = on; if (on) tick(); else cancelAnimationFrame(raf); };
    // only while the finale is on screen and the tab is visible
    ScrollTrigger.create({ trigger: '#contact', start: 'top 60%', end: 'bottom top', onToggle: self => run(self.isActive && !document.hidden) });
    document.addEventListener('visibilitychange', () => { if (document.hidden) run(false); else run(ScrollTrigger.isInViewport('#contact', 0.4)); });
  }

  document.fonts && document.fonts.ready.then(() => ScrollTrigger.refresh());
})();
