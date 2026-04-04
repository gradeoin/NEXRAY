(function () {
  if (window.__NEXRAY_MASCOT_ACTIVE__) return;
  window.__NEXRAY_MASCOT_ACTIVE__ = true;

  function initMascot() {
    const isMobile = window.innerWidth <= 768;

    /* ─── Styles ─────────────────────────────────────────────── */
    const st = document.createElement('style');
    st.textContent = `
      /* ── SHARED ─────────────────────────────── */
      .nxm-wrap{position:fixed;z-index:2147483647;pointer-events:none;transition:all .45s cubic-bezier(.175,.885,.32,1.275)}

      /* ── DESKTOP side-peek (right only) ─────── */
      @media(min-width:769px){
        .nxm-wrap{top:55%;transform:translateY(-50%);width:140px;height:140px}
        .nxm-right{right:-80px}
        .nxm-right.nxm-active{right:-12px;pointer-events:auto}
        .nxm-paw{display:block}
      }

      /* ── MOBILE top-peek (eyes only) ─────────── */
      @media(max-width:768px){
        .nxm-wrap{left:50%;top:-52px;transform:translateX(-50%);width:90px;height:90px}
        .nxm-wrap.nxm-active{top:-12px;pointer-events:auto}
        /* hide body gradient, keep eye whites only */
        .nxm-body{background:transparent!important;border:none!important;box-shadow:none!important}
        .nxm-ear,.m-nose,.nxm-paw{display:none!important}
        .nxm-eye{background:rgba(255,255,255,.9)!important;box-shadow:0 0 12px rgba(0,56,255,.5)!important}
      }

      /* ── BODY ────────────────────────────────── */
      .nxm-body{
        width:105px;height:105px;
        background:linear-gradient(135deg,#0038FF,#001A99);
        border-radius:50%;position:relative;
        box-shadow:0 16px 45px rgba(0,56,255,.45);
        cursor:pointer;pointer-events:auto;
        border:3px solid #fff;
        display:flex;align-items:center;justify-content:center;
        transition:transform .3s ease;
      }
      .nxm-body:hover{transform:scale(1.08)}

      /* ears */
      .nxm-ear{
        width:0;height:0;
        border-left:11px solid transparent;
        border-right:11px solid transparent;
        border-bottom:22px solid #0038FF;
        position:absolute;top:-10px;
      }
      .nxm-ear-l{left:16px;transform:rotate(-15deg)}
      .nxm-ear-r{right:16px;transform:rotate(15deg)}

      /* eyes */
      .nxm-eye{
        width:30px;height:30px;background:#fff;
        border-radius:50%;position:absolute;top:26px;
        display:flex;align-items:center;justify-content:center;overflow:hidden;
        transition:height .1s ease;
      }
      .nxm-el{left:16px}.nxm-er{right:16px}
      .nxm-pupil{width:12px;height:12px;background:#0f172a;border-radius:50%;transition:transform .04s linear}
      .nxm-blink .nxm-eye{height:3px!important}

      /* nose */
      .m-nose{
        width:6px;height:4px;background:#CCFF00;border-radius:50%;
        position:absolute;top:62px;left:49px;
        box-shadow:0 0 8px #CCFF00;
      }

      /* paw */
      .nxm-paw{
        position:absolute;width:48px;height:36px;
        background:linear-gradient(90deg,#0038FF,#CCFF00);
        border:3px solid #fff;border-radius:22px;
        top:45px;z-index:-1;transition:transform .4s cubic-bezier(.175,.885,.32,1.275);
        display:flex;align-items:center;justify-content:center;
        font-family:'Space Grotesk',sans-serif;font-weight:900;
        font-size:9px;color:#fff;letter-spacing:.5px;
        display:none;
      }
      .nxm-right .nxm-paw{right:88px;transform:scale(0)}
      .nxm-active .nxm-paw{transform:scale(1) translateX(26px)}

      /* ── EXPLORE MENU ────────────────────────── */
      .nxm-menu{
        position:absolute;background:#fff;
        border:3px solid #0038FF;border-radius:24px;
        padding:16px;width:250px;
        box-shadow:0 25px 70px rgba(0,0,0,.22);
        display:none;flex-direction:column;gap:10px;
        pointer-events:auto;
      }
      .nxm-right .nxm-menu{right:118px;top:-60px}
      @media(max-width:768px){
        .nxm-menu{left:50%!important;right:auto!important;
          transform:translateX(-50%)!important;top:78px!important}
      }
      .nxm-menu.show{display:flex;animation:nxm-pop .4s cubic-bezier(.175,.885,.32,1.275)}
      @keyframes nxm-pop{from{opacity:0;transform:scale(.8) translateY(20px)}to{opacity:1;transform:scale(1) translateY(0)}}

      .nxm-menu-title{
        font-weight:900;font-size:.8rem;letter-spacing:.12em;
        color:#0038FF;text-align:center;text-transform:uppercase;
        padding-bottom:8px;border-bottom:2px solid rgba(0,56,255,.1);
      }
      .nxm-item{
        display:flex;align-items:center;gap:12px;
        padding:10px 14px;border-radius:14px;
        background:#f8fafc;color:#0f172a;
        font-weight:700;font-size:.88rem;text-decoration:none;
        cursor:pointer;transition:all .2s;border:1px solid rgba(0,56,255,.06);
      }
      .nxm-item svg{width:18px;height:18px;stroke:#0038FF;flex-shrink:0}
      .nxm-item:hover{background:#0038FF;color:#fff}
      .nxm-item:hover svg{stroke:#CCFF00}

      .nxm-menu-toggle{
        position:absolute; right:4px; top:-8px;
        width:26px; height:26px; border-radius:999px;
        background:var(--bg, #fff); border:2px solid var(--brand, #0038FF);
        color:var(--brand, #0038FF); font-size:16px; font-weight:900; line-height:1;
        display:flex; align-items:center; justify-content:center;
        cursor:pointer; pointer-events:auto;
        box-shadow:0 4px 12px var(--brand-glow, rgba(0,56,255,.2));
      }
      .nxm-menu-toggle:hover{background:var(--brand, #0038FF);color:var(--bg, #fff)}
    `;
    document.head.appendChild(st);

    /* ─── Build Mascot HTML ─────────────────────────────────── */
    const wrap = document.createElement('div');
    wrap.className = 'nxm-wrap nxm-right';

    const menuSVGs = {
      guide:`<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`,
      resources:`<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
      blog:`<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
      share:`<svg viewBox="0 0 24 24" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>`,
    };

    // Determine root path for links
    const isGuide = window.location.pathname.includes('/guide/');
    const root = isGuide ? '../' : '';

    wrap.innerHTML = `
      <div class="nxm-paw">NEX</div>
      <div class="nxm-body">
        <div class="nxm-ear nxm-ear-l"></div>
        <div class="nxm-ear nxm-ear-r"></div>
        <div class="nxm-eye nxm-el"><div class="nxm-pupil nxm-p"></div></div>
        <div class="nxm-eye nxm-er"><div class="nxm-pupil nxm-p"></div></div>
        <div class="m-nose"></div>
      </div>
      <button class="nxm-menu-toggle" aria-label="Toggle mascot menu">+</button>
      <div class="nxm-menu">
        <div class="nxm-menu-title">Nexray Navigator</div>
        <a href="${root}guide/stage1.html" class="nxm-item">${menuSVGs.guide} Start the Guide</a>
        <a href="${root}resources.html" class="nxm-item">${menuSVGs.resources} Resources</a>
        <a href="${root}blog/index.html" class="nxm-item">${menuSVGs.blog} Nexray Blog</a>
        <div class="nxm-item" id="nxm-share">${menuSVGs.share} Share Nexray</div>
      </div>
    `;
    document.body.appendChild(wrap);

    /* ─── Events ─────────────────────────────────────────────── */
    const menu = wrap.querySelector('.nxm-menu');
    const body = wrap.querySelector('.nxm-body');
    const toggleBtn = wrap.querySelector('.nxm-menu-toggle');

    body.addEventListener('click', e => { e.stopPropagation(); menu.classList.toggle('show'); });
    toggleBtn.addEventListener('click', e => { e.stopPropagation(); menu.classList.toggle('show'); });
    wrap.querySelector('#nxm-share').addEventListener('click', () => {
      if (navigator.share) navigator.share({ title: 'Nexray — Learn Web Dev', url: window.location.href });
      else { navigator.clipboard.writeText(window.location.href); alert('Link copied!'); }
    });
    document.addEventListener('click', () => menu.classList.remove('show'));

    /* ─── Blinking ───────────────────────────────────────────── */
    function blink() {
      wrap.classList.add('nxm-blink');
      setTimeout(() => wrap.classList.remove('nxm-blink'), 120);
      setTimeout(blink, 3500 + Math.random() * 3000);
    }
    setTimeout(blink, 2000);

    /* ─── Mouse / Touch Tracker ──────────────────────────────── */
    function track(cx, cy) {
      const w = window.innerWidth;
      if (w > 768) {
        wrap.classList.add('nxm-right');
        wrap.classList.toggle('nxm-active', cx > w - 160);
      } else {
        wrap.classList.toggle('nxm-active', cy < 110);
      }
      wrap.querySelectorAll('.nxm-p').forEach(p => {
        const r = p.getBoundingClientRect();
        const dx = cx - (r.left + r.width / 2), dy = cy - (r.top + r.height / 2);
        const a = Math.atan2(dy, dx), d = Math.min(6, Math.hypot(dx, dy) / 28);
        p.style.transform = `translate(${Math.cos(a) * d}px,${Math.sin(a) * d}px)`;
      });
    }
    document.addEventListener('mousemove', e => track(e.clientX, e.clientY), { passive: true });
    document.addEventListener('touchmove', e => { const t = e.touches[0]; track(t.clientX, t.clientY); }, { passive: true });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initMascot);
  else initMascot();
})();
