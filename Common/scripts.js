(function () {
  const currentScript = document.currentScript;
  const rootPath = (currentScript && currentScript.dataset.root) || ".";
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const validLang = (value) => (value === "zh" || value === "ct") ? value : "en";
  const savedLang = validLang(localStorage.getItem("personal-site-language") || "en");
  const savedTheme = localStorage.getItem("personal-site-theme");
  const preferredTheme = savedTheme || (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  window.siteLang = savedLang;
  window.siteRoot = rootPath.replace(/\/$/, "");
  window.siteT = (key) => (window.SITE_TEXT[window.siteLang] || window.SITE_TEXT.en)[key] || key;

  function setTemplateText(value) {
    return (window.siteLang === "zh" || window.siteLang === "ct") ? String(value).replaceAll("{siteNameZh}", window.SITE_CONFIG.siteNameZh) : String(value).replaceAll("{siteName}", window.SITE_CONFIG.siteName);
  }
  function applyLanguage(lang) {
    window.siteLang = validLang(lang);
    localStorage.setItem("personal-site-language", window.siteLang);
    // Rebuild shared shell labels as a single source of truth when language changes.
    renderShell();
    applyTheme(document.body.getAttribute("data-bs-theme") || preferredTheme);
    document.documentElement.lang = (window.siteLang === "zh" || window.siteLang === "ct") ? "zh-Hant" : "en";
    $$('[data-i18n]').forEach((node) => {
      const key = node.getAttribute('data-i18n');
      const value = window.siteT(key);
      if (value !== key) node.textContent = setTemplateText(value);
    });
    $$('[data-i18n-placeholder]').forEach((node) => node.setAttribute('placeholder', window.siteT(node.dataset.i18nPlaceholder)));
    $$('[data-site-name]').forEach((node) => (window.siteLang ==="zh" || window.siteLang === "ct") ? node.textContent = window.SITE_CONFIG.siteNameZh : node.textContent = window.SITE_CONFIG.siteName);
    $$('[data-site-email]').forEach((node) => { node.textContent = window.SITE_CONFIG.email; if (node.tagName === 'A') node.href = `mailto:${window.SITE_CONFIG.email}`; });
    $$('[data-social]').forEach((node) => { const key = node.dataset.social; if (window.SITE_CONFIG.socials[key]) node.href = window.SITE_CONFIG.socials[key]; });
    $$('[data-site-title]').forEach((node) => { const key = node.dataset.siteTitle; if (window.siteT(key)) document.title = setTemplateText(window.siteT(key)); });
    const toggle = $('[data-action="language"]');
    if (toggle) toggle.textContent = window.siteT('lang.label');
    // Re-render components whose text/data is generated in page-specific scripts.
    document.dispatchEvent(new CustomEvent('site:languagechange', { detail: { lang: window.siteLang } }));
  }
  function applyTheme(theme, applyTransition = false) {
    const value = theme === 'dark' ? 'dark' : 'light';
    document.body.setAttribute('data-bs-theme', value);
    document.body.style.transition = applyTransition ? 'background-color .25s ease, color .25s ease' : '';
    document.documentElement.setAttribute('data-bs-theme', value);
    localStorage.setItem('personal-site-theme', value);
    const toggle = $('[data-action="theme"]');
    if (toggle) {
      toggle.textContent = value === 'dark' ? '🌞' : '🌚';
      toggle.setAttribute('aria-label', value === 'dark' ? window.SITE_TEXT[window.siteLang]["theme.toLight"] : window.SITE_TEXT[window.siteLang]["theme.toDark"]);
      toggle.setAttribute('title', value === 'dark' ? window.SITE_TEXT[window.siteLang]["theme.toLight"] : window.SITE_TEXT[window.siteLang]["theme.toDark"]);
    }
  }
  function navLink(key, href, active) {
    return `<a class="nav-link${active ? ' active' : ''}" data-i18n="${key}" ${active ? 'aria-current="page"' : ''} href="${href}">${window.siteT(key)}</a>`;
  }
  function renderShell() {
    const page = document.body.dataset.page || 'home';
    const navItems = [
      ['nav.home', `${window.siteRoot}/index.html`, 'home'], ['nav.about', `${window.siteRoot}/About/index.html`, 'about'],
      ['nav.projects', `${window.siteRoot}/Projects/index.html`, 'projects'], ['nav.music', `${window.siteRoot}/Music/index.html`, 'music'], ['nav.contact', `${window.siteRoot}/Contact/index.html`, 'contact']
    ];
    const header = $('#site-header');
    if (header) header.innerHTML = `
      <div class="site-header">
        <nav class="navbar navbar-expand-lg py-0" aria-label="Main navigation">
          <div class="container site-nav-wrap">
            <a class="navbar-brand" href="${window.siteRoot}/index.html" aria-label="Homepage"><span class="brand-mark"></span><span data-site-name></span></a>
            <div class="d-flex align-items-center gap-2 ms-auto order-lg-3">
              <div class="theme-language-controls"><button class="control-btn" type="button" data-action="theme" aria-label="Toggle theme">☾</button><button class="control-btn" type="button" data-action="language">中文</button></div>
              <button class="navbar-toggler ms-1 d-lg-none" type="button" data-bs-toggle="offcanvas" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-label="Open navigation"><span class="navbar-toggler-icon"></span></button>
            </div>
            <div class="collapse navbar-collapse order-lg-2" id="desktopNav"><ul class="navbar-nav ms-auto me-lg-3">${navItems.map(([key, href, id]) => `<li class="nav-item">${navLink(key, href, page === id)}</li>`).join('')}</ul></div>
          </div>
        </nav>
      </div>
      <div class="offcanvas offcanvas-end" tabindex="-1" id="mobileMenu" aria-labelledby="mobileMenuLabel">
        <div class="offcanvas-header border-bottom"><h5 class="offcanvas-title" id="mobileMenuLabel" data-i18n="nav.menu">${window.siteT('nav.menu')}</h5><button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button></div>
        <div class="offcanvas-body"><div class="accordion" id="mobileNavAccordion">${navItems.map(([key, href, id]) => navLink(key, href, page === id)).join('')}</div>
      </div>`;
    const footer = $('#site-footer');
    if (footer) footer.innerHTML = `
      <footer class="site-footer">
      <div class="container"><div class="footer-top"><div>
      <a class="navbar-brand mb-2" href="${window.siteRoot}/index.html"><span class="brand-mark"></span><span data-site-name></span></a>
      <p class="text-muted-site mb-0 small" data-i18n="footer.note"></p></div>
      <div class="footer-nav">${navItems.map(([key, href]) => `<a href="${href}" data-i18n="${key}"></a>`).join('')}</div></div>
      <div class="footer-bottom"><span>© <span id="currentYear"></span> <span data-site-name></span> · <span data-i18n="footer.rights"></span></span>
      <a href="#top" data-i18n="footer.top"></a></div></div></footer>`;
    const year = $('#currentYear'); if (year) year.textContent = new Date().getFullYear();
  }

  // Shared controls are delegated so they also work inside the injected mobile menu.
  document.addEventListener('click', (event) => {
    const action = event.target.closest('[data-action]')?.dataset.action;
    if (action === 'theme') applyTheme(document.body.getAttribute('data-bs-theme') === 'dark' ? 'light' : 'dark', true);
    if (action === 'language') applyLanguage((() => {
      if (window.siteLang === 'zh') return 'ct';
      else if (window.siteLang === 'ct') return 'en';
      else return 'zh';
    })());
  });

  renderShell();
  applyTheme(preferredTheme);
  applyLanguage(savedLang);

  // Progressive reveal on scroll. Content remains visible when IntersectionObserver is unavailable.
  const revealTargets = $$('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
    }), { threshold: 0.12 });
    revealTargets.forEach((node) => observer.observe(node));
  } else revealTargets.forEach((node) => node.classList.add('is-visible'));
})();
