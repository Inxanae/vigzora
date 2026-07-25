/* ============================================================
   VIGZORA — interactions & motion (vanilla JS, no build step)
   ============================================================ */
(function(){
  "use strict";

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Loader ---------- */
  window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    const logo = loader.querySelector('.loader-logo');
    const bar = loader.querySelector('.loader-bar span');
    requestAnimationFrame(() => {
      logo.style.transition = 'opacity .8s ease, transform .8s ease';
      logo.style.opacity = '1';
      logo.style.transform = 'scale(1)';
      bar.style.transition = 'width 1.1s cubic-bezier(.16,.8,.28,1)';
      bar.style.width = '100%';
    });
    setTimeout(() => {
      loader.classList.add('is-hidden');
      document.body.classList.add('loaded');
      playHeroIntro();
    }, reduceMotion ? 100 : 1250);
  });

  /* ---------- Hero intro sequence ---------- */
  function playHeroIntro(){
    const lines = document.querySelectorAll('.hero-title .line span');
    const sub = document.querySelector('.hero-sub');
    const ctas = document.querySelector('.hero-ctas');
    const mark = document.querySelector('.hero-logo-mark');
    lines.forEach((el, i) => {
      el.style.transition = `transform .9s cubic-bezier(.16,.8,.28,1) ${i*0.12+0.05}s`;
      requestAnimationFrame(()=> el.style.transform = 'translateY(0)');
    });
    setTimeout(()=>{
      sub.style.transition = 'opacity .8s ease';
      sub.style.opacity = '1';
    }, 380);
    setTimeout(()=>{
      ctas.style.transition = 'opacity .8s ease';
      ctas.style.opacity = '1';
    }, 560);
    setTimeout(()=>{
      mark.style.transition = 'opacity 1s ease';
      mark.style.opacity = '1';
    }, 200);
  }

  /* ---------- Nav scroll state + mobile toggle ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');

    const toTop = document.getElementById('toTop');
    if (window.scrollY > 700) toTop.classList.add('show');
    else toTop.classList.remove('show');
  };
  document.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navToggle.classList.remove('open');
    navLinks.classList.remove('open');
  }));

  document.getElementById('toTop').addEventListener('click', () => {
    window.scrollTo({ top:0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion){
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          e.target.classList.add('in-view');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in-view'));
  }

  /* ---------- Cursor glow (desktop) ---------- */
  const glow = document.getElementById('cursor-glow');
  if (window.matchMedia('(hover:hover)').matches && !reduceMotion){
    window.addEventListener('mousemove', (e) => {
      glow.classList.add('active');
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    }, { passive:true });
  }

  /* ---------- Magnetic buttons ---------- */
  if (window.matchMedia('(hover:hover)').matches && !reduceMotion){
    document.querySelectorAll('.btn, .fbtn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width/2;
        const y = e.clientY - r.top - r.height/2;
        btn.style.transform = `translate(${x*0.18}px, ${y*0.3}px)`;
      });
      btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
    });
  }

  /* ---------- Services tabs ---------- */
  const stabs = document.querySelectorAll('.stab');
  const scards = document.querySelectorAll('.service-card');
  stabs.forEach(tab => {
    tab.addEventListener('click', () => {
      stabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const group = tab.dataset.tab;
      scards.forEach(c => c.classList.toggle('show', c.dataset.group === group));
    });
  });

  /* ---------- Portfolio: real studio work ---------- */
  const folioData = [
    { cat:'photography',label:'Photography', title:'Candid Character Study',   h:'tall', img:'assets/gallery/photography-01.jpg' },
    { cat:'photography',label:'Photography', title:'Golden Hour Candid',       h:'med',  img:'assets/gallery/photography-02.jpg' },
    { cat:'frames',     label:'Frames',      title:'Batch Memories, Framed',   h:'med',  img:'assets/gallery/frames-01.jpg' },
    { cat:'frames',     label:'Frames',      title:'Custom Collage Frame',     h:'tall', img:'assets/gallery/frames-02.jpg' },
    { cat:'wedding',    label:'Wedding',     title:'Pre-Wedding Story',        h:'tall', img:'assets/gallery/wedding-01.jpg' },
    { cat:'wedding',    label:'Wedding',     title:'Vazhi Thunaiye — The Vow',  h:'med',  img:'assets/gallery/wedding-02.jpg' },
    { cat:'portrait',   label:'Portrait',    title:'Editorial Portrait',        h:'tall', img:'assets/gallery/portrait-01.jpg' },
    { cat:'portrait',   label:'Portrait',    title:'Macro Detail Study',        h:'short',img:'assets/gallery/portrait-02.jpg' },
    { cat:'events',     label:'Events',      title:'Public Event Coverage',     h:'med',  img:'assets/gallery/events-01.jpg' },
    { cat:'events',     label:'Events',      title:'Festival Percussion',       h:'tall', img:'assets/gallery/events-02.jpg' },
  ];

  const folioGrid = document.getElementById('folioGrid');

  folioData.forEach((item) => {
    const el = document.createElement('div');
    el.className = 'folio-item';
    el.dataset.cat = item.cat;
    el.dataset.h = item.h;
    el.innerHTML = `
      <div class="ph"><img src="${item.img}" alt="${item.title} — VIGZORA ${item.label}" loading="lazy" /></div>
      <div class="folio-overlay">
        <span class="folio-cat">${item.label}</span>
        <span class="folio-title">${item.title}</span>
      </div>`;
    el.addEventListener('click', () => openLightbox(item));
    folioGrid.appendChild(el);
  });

  const filters = document.querySelectorAll('.ffilter');
  filters.forEach(f => {
    f.addEventListener('click', () => {
      filters.forEach(x => x.classList.remove('active'));
      f.classList.add('active');
      const val = f.dataset.filter;
      document.querySelectorAll('.folio-item').forEach(item => {
        const show = val === 'all' || item.dataset.cat === val;
        item.style.display = show ? '' : 'none';
      });
    });
  });

  /* ---------- Lightbox ---------- */
  const lightbox = document.getElementById('lightbox');
  const lbCat = document.getElementById('lbCat');
  const lbTitle = document.getElementById('lbTitle');
  const lbBox = document.getElementById('lbBox');
  function openLightbox(item){
    lbCat.textContent = item.label;
    lbTitle.textContent = item.title;
    lbBox.innerHTML = `<img src="${item.img}" alt="${item.title}" />`;
    lightbox.classList.add('open');
  }
  document.getElementById('lbClose').addEventListener('click', () => lightbox.classList.remove('open'));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.classList.remove('open'); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lightbox.classList.remove('open'); });

  /* ---------- Stat counters ---------- */
  const stats = document.querySelectorAll('.stat b');
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const suffix = el.dataset.suffix || '';
    const dur = 1600;
    const start = performance.now();
    function tick(now){
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  };
  if ('IntersectionObserver' in window){
    const statIO = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting){
          animateCount(e.target);
          statIO.unobserve(e.target);
        }
      });
    }, { threshold: 0.6 });
    stats.forEach(s => statIO.observe(s));
  } else {
    stats.forEach(s => s.textContent = s.dataset.count + (s.dataset.suffix||''));
  }

  /* ---------- Testimonial carousel ---------- */
  const track = document.getElementById('testTrack');
  let testIndex = 0;
  function testStep(dir){
    const cardWidth = track.querySelector('.test-card').getBoundingClientRect().width + 24;
    const max = track.children.length - 1;
    testIndex = Math.max(0, Math.min(max, testIndex + dir));
    track.style.transition = 'transform .6s cubic-bezier(.16,.8,.28,1)';
    track.style.transform = `translateX(${-testIndex * cardWidth}px)`;
  }
  document.getElementById('testNext').addEventListener('click', () => testStep(1));
  document.getElementById('testPrev').addEventListener('click', () => testStep(-1));

  /* ---------- Footer year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

})();
