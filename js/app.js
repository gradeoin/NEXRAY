(function () {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  // Mobile nav toggle
  const toggle = $('[data-nav-toggle]');
  const menu = $('[data-nav-menu]');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      const isOpen = menu.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu when clicking a link (mobile)
    $$('.nav-menu a', document).forEach(a => {
      a.addEventListener('click', () => {
        if (menu.classList.contains('is-open')) {
          menu.classList.remove('is-open');
          toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        menu.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Slash to focus search on stage pages
  const searchInput = $('[data-page-search]');
  if (searchInput) {
    document.addEventListener('keydown', (e) => {
      if (e.key === '/' && !isTypingInInput(e.target)) {
        e.preventDefault();
        searchInput.focus();
      }
    });

    // Simple in-page search: highlights matching text in paragraphs/list items/code blocks
    const searchable = $$('p, li, h2, h3, h4, code', document)
      .filter(el => !el.closest('nav') && !el.closest('header.site-header'));

    const originalHTML = new Map();
    searchable.forEach(el => originalHTML.set(el, el.innerHTML));

    let lastQuery = '';

    searchInput.addEventListener('input', () => {
      const q = searchInput.value.trim();
      if (q === lastQuery) return;
      lastQuery = q;

      // reset
      searchable.forEach(el => (el.innerHTML = originalHTML.get(el)));

      if (!q) return;

      const safe = escapeRegExp(q);
      const re = new RegExp(`(${safe})`, 'ig');

      searchable.forEach(el => {
        // avoid wrecking large code blocks by limiting
        const html = originalHTML.get(el);
        if (!html) return;

        // Don't highlight inside tags
        const textOnly = stripTags(html);
        if (!textOnly.toLowerCase().includes(q.toLowerCase())) return;

        // Best-effort highlight by replacing in HTML string (works well for our content)
        el.innerHTML = html.replace(re, '<mark class="mk">$1</mark>');
      });

      const firstMark = $('mark.mk');
      if (firstMark) firstMark.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }

  // Contact form: autosave draft + submit -> download JSON
  const form = $('[data-contact-form]');
  if (form) {
    const status = $('[data-draft-status]');
    const clearBtn = $('[data-clear-draft]');
    const key = 'nexray_contact_draft_v1';

    // Load draft
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        const draft = JSON.parse(raw);
        for (const [k, v] of Object.entries(draft)) {
          const field = form.elements[k];
          if (field) field.value = v;
        }
        setStatus('Draft: loaded from device');
      } else {
        setStatus('Draft: not saved yet');
      }
    } catch {
      setStatus('Draft: not saved yet');
    }

    const saveDraft = () => {
      const data = Object.fromEntries(new FormData(form).entries());
      localStorage.setItem(key, JSON.stringify(data));
      setStatus('Draft: saved locally');
    };

    const debouncedSave = debounce(saveDraft, 450);
    form.addEventListener('input', debouncedSave);

    clearBtn?.addEventListener('click', () => {
      localStorage.removeItem(key);
      form.reset();
      setStatus('Draft: cleared');
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = Object.fromEntries(new FormData(form).entries());
      const payload = {
        ...data,
        submittedAt: new Date().toISOString(),
        userAgent: navigator.userAgent
      };

      downloadJson(payload, `nexray-contact-${Date.now()}.json`);
      setStatus('Submitted: downloaded JSON (upgrade to API in Stage 3)');
      localStorage.removeItem(key);
      form.reset();
    });

    function setStatus(text) {
      if (status) status.textContent = text;
    }
  }

  // Utility
  function debounce(fn, wait) {
    let t = null;
    return function (...args) {
      clearTimeout(t);
      t = setTimeout(() => fn.apply(this, args), wait);
    };
  }

  function isTypingInInput(target) {
    if (!target || !(target instanceof HTMLElement)) return false;
    const tag = target.tagName.toLowerCase();
    return tag === 'input' || tag === 'textarea' || tag === 'select' || target.isContentEditable;
  }

  function escapeRegExp(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function stripTags(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || '';
  }

  function downloadJson(obj, filename) {
    const blob = new Blob([JSON.stringify(obj, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }
})();