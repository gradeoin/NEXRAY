(function () {
  'use strict';

  if (window.__NEXRAY_MASCOT_ACTIVE__) return;
  window.__NEXRAY_MASCOT_ACTIVE__ = true;

  function initMascot() {
    var style = document.createElement('style');
    style.textContent = `
      .nxm-cat-wrap{position:fixed;right:-110px;bottom:20px;width:88px;height:88px;z-index:1301;pointer-events:none;opacity:0;transform:translateY(8px);transition:right .45s ease,opacity .35s ease,transform .35s ease}
      .nxm-cat-wrap.show{right:14px;opacity:1;transform:translateY(0)}
      .nxm-cat{position:relative;width:88px;height:88px;border-radius:50%;background:linear-gradient(135deg,#0038FF,#001A99);border:2px solid #fff;box-shadow:0 10px 28px rgba(0,56,255,.30)}
      .nxm-ear{position:absolute;top:-9px;width:0;height:0;border-left:10px solid transparent;border-right:10px solid transparent;border-bottom:18px solid #0038FF}
      .nxm-ear.l{left:12px;transform:rotate(-16deg)}
      .nxm-ear.r{right:12px;transform:rotate(16deg)}
      .nxm-eye{position:absolute;top:24px;width:24px;height:24px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;transition:height .15s ease}
      .nxm-eye.l{left:13px}.nxm-eye.r{right:13px}
      .nxm-p{width:9px;height:9px;border-radius:50%;background:#0f172a;transition:transform .08s linear}
      .nxm-nose{position:absolute;left:41px;top:54px;width:6px;height:4px;border-radius:999px;background:#CCFF00;box-shadow:0 0 8px rgba(204,255,0,.7)}
      .nxm-tail{position:absolute;right:-12px;bottom:18px;width:22px;height:12px;border:3px solid #0038FF;border-left:none;border-radius:0 12px 12px 0;background:transparent}
      .nxm-cat-wrap.sleep .nxm-eye{height:3px}
      .nxm-cat-wrap.sleep::after{content:'zZ';position:absolute;right:74px;top:-6px;color:#64748b;font:800 11px/1 Inter,system-ui,sans-serif;letter-spacing:.04em;opacity:.8}
      .nxm-cat-wrap.running{top:68px;bottom:auto;right:auto;left:-110px;opacity:1;transform:none;animation:nxm-run 1.8s linear infinite}
      @keyframes nxm-run{0%{left:-110px}100%{left:calc(100vw + 20px)}}
      @media (max-width:768px){
        .nxm-cat-wrap{width:74px;height:74px;bottom:16px;right:-96px}
        .nxm-cat-wrap.show{right:10px}
        .nxm-cat{width:74px;height:74px}
        .nxm-eye{top:20px;width:20px;height:20px}
        .nxm-eye.l{left:11px}.nxm-eye.r{right:11px}
        .nxm-nose{left:34px;top:47px}
        .nxm-tail{right:-10px;bottom:14px}
      }
    `;
    document.head.appendChild(style);

    var wrap = document.createElement('div');
    wrap.className = 'nxm-cat-wrap';
    wrap.innerHTML = `
      <div class="nxm-cat" aria-hidden="true">
        <div class="nxm-ear l"></div>
        <div class="nxm-ear r"></div>
        <div class="nxm-eye l"><div class="nxm-p"></div></div>
        <div class="nxm-eye r"><div class="nxm-p"></div></div>
        <div class="nxm-nose"></div>
        <div class="nxm-tail"></div>
      </div>
    `;
    document.body.appendChild(wrap);

    var pupils = wrap.querySelectorAll('.nxm-p');
    var running = false;
    var sleepTimer = null;
    var cycleTimer = null;
    var hideTimer = null;

    function showFor(ms) {
      if (running) return;
      wrap.classList.add('show');
      if (hideTimer) clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (!running) wrap.classList.remove('show');
      }, ms || 5000);
    }

    function scheduleAppearance() {
      var delay = 12000 + Math.random() * 18000;
      cycleTimer = setTimeout(function () {
        showFor(4200 + Math.random() * 2600);
        scheduleAppearance();
      }, delay);
    }

    function setRunning(on) {
      running = on;
      wrap.classList.toggle('running', !!on);
      if (!on) {
        wrap.classList.remove('sleep');
        showFor(3200);
      }
    }

    function resetIdle() {
      wrap.classList.remove('sleep');
      if (sleepTimer) clearTimeout(sleepTimer);
      sleepTimer = setTimeout(function () {
        if (!running) {
          wrap.classList.add('show');
          wrap.classList.add('sleep');
        }
      }, 10000);
    }

    function updateRunState() {
      var loader = document.getElementById('page-loader');
      if (!loader) {
        setRunning(false);
        return;
      }
      var hidden = loader.classList.contains('hidden') || loader.style.display === 'none';
      setRunning(!hidden);
    }

    var raf = 0;
    var lastMouseX = window.innerWidth;
    var lastMouseY = window.innerHeight / 2;

    function trackPupils() {
      raf = 0;
      if (running || wrap.classList.contains('sleep')) return;

      pupils.forEach(function (p) {
        var r = p.getBoundingClientRect();
        var dx = lastMouseX - (r.left + r.width / 2);
        var dy = lastMouseY - (r.top + r.height / 2);
        var ang = Math.atan2(dy, dx);
        var dist = Math.min(4, Math.hypot(dx, dy) / 45);
        p.style.transform = 'translate(' + (Math.cos(ang) * dist).toFixed(2) + 'px,' + (Math.sin(ang) * dist).toFixed(2) + 'px)';
      });
    }

    document.addEventListener('mousemove', function (e) {
      lastMouseX = e.clientX;
      lastMouseY = e.clientY;
      if (!raf) raf = requestAnimationFrame(trackPupils);
      resetIdle();

      if (!running && !wrap.classList.contains('show') && Math.random() < 0.012) {
        showFor(2000);
      }
    }, { passive: true });

    ['scroll', 'keydown', 'touchstart', 'click'].forEach(function (evt) {
      document.addEventListener(evt, resetIdle, { passive: true });
    });

    window.addEventListener('load', function () {
      updateRunState();
      setTimeout(updateRunState, 300);
    });

    var loaderNode = document.getElementById('page-loader');
    if (loaderNode && 'MutationObserver' in window) {
      var observer = new MutationObserver(updateRunState);
      observer.observe(loaderNode, { attributes: true, attributeFilter: ['class', 'style'] });
    }

    updateRunState();
    resetIdle();
    scheduleAppearance();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMascot);
  } else {
    initMascot();
  }
})();
