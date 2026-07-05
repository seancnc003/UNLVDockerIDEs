/* Progressive enhancement only — every page works with JS disabled. */
(function () {
  'use strict';

  /* Copy-to-clipboard buttons on every code block */
  function initCopyButtons() {
    if (!navigator.clipboard) return;
    document.querySelectorAll('.codeblock').forEach(function (block) {
      var code = block.querySelector('pre');
      if (!code) return;
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'copy-btn';
      btn.textContent = 'Copy';
      btn.setAttribute('aria-label', 'Copy command to clipboard');
      btn.addEventListener('click', function () {
        navigator.clipboard.writeText(code.innerText.trim()).then(function () {
          btn.textContent = 'Copied';
          btn.classList.add('is-copied');
          setTimeout(function () {
            btn.textContent = 'Copy';
            btn.classList.remove('is-copied');
          }, 2000);
        });
      });
      block.appendChild(btn);
    });
  }

  /* Mobile navigation toggle */
  function initNavToggle() {
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.getElementById('site-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
    });
  }

  /* Footer year */
  function initYear() {
    var el = document.getElementById('year');
    if (el) el.textContent = new Date().getFullYear();
  }

  document.addEventListener('DOMContentLoaded', function () {
    initCopyButtons();
    initNavToggle();
    initYear();
  });
})();
