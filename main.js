/* Victoria Dental Practice — site scripts */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('primary-nav');

  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
      }
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        toggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        toggle.focus();
      }
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      header.classList.toggle('is-stuck', window.scrollY > 8);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(function (el) { el.classList.add('is-in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry, i) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var delay = parseInt(el.dataset.delay || '0', 10);
            setTimeout(function () { el.classList.add('is-in'); }, delay);
            io.unobserve(el);
          }
        });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
      reveals.forEach(function (el) { io.observe(el); });
    }
  }

  /* ---------- Open / closed indicator ----------
     Opening hours: Mon–Fri 08:30–17:00 (source: practice contact page).
     Computed in Europe/London so it is correct for visitors in any timezone. */
  var pill = document.querySelector('[data-open-status]');
  if (pill) {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/London',
        weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false
      }).formatToParts(new Date());

      var get = function (t) {
        var p = parts.find(function (x) { return x.type === t; });
        return p ? p.value : '';
      };
      var day = get('weekday');
      var mins = parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10);
      var weekday = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].indexOf(day) !== -1;
      var open = weekday && mins >= 510 && mins < 1020; /* 08:30–17:00 */

      pill.innerHTML = '<span class="dot"></span>' +
        (open ? 'Open now &middot; closes 5.00pm' : 'Closed now &middot; opens 8.30am');
      pill.classList.toggle('is-closed', !open);
    } catch (err) {
      pill.innerHTML = '<span class="dot"></span>Mon&ndash;Fri, 8.30am&ndash;5.00pm';
    }
  }

  /* ---------- Enquiry form: mailto fallback ----------
     The site is static, so the form composes an email rather than silently failing.
     Replace with a real endpoint (Formspree / Netlify Forms) when hosting. */
  var form = document.querySelector('[data-mailto-form]');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var data = new FormData(form);
      var v = function (k) { return (data.get(k) || '').toString().trim(); };

      var body = [
        'Name: ' + v('name'),
        'Phone: ' + v('phone'),
        'Email: ' + v('email'),
        'Patient status: ' + (v('status') || 'Not stated'),
        'Enquiry type: ' + (v('subject') || 'General enquiry'),
        'Preferred contact: ' + (v('preferred') || 'No preference'),
        '',
        'Message:',
        v('message'),
        '',
        '— Sent from victoriadentalpractice.net'
      ].join('\n');

      var href = 'mailto:enquiries@victoriadentalpractice.net' +
        '?subject=' + encodeURIComponent('Website enquiry — ' + (v('subject') || 'General') + ' — ' + v('name')) +
        '&body=' + encodeURIComponent(body);

      window.location.href = href;

      var msg = form.querySelector('[data-form-status]');
      if (msg) {
        msg.hidden = false;
        msg.focus();
      }
    });
  }

  /* ---------- Current year ---------- */
  var yr = document.querySelectorAll('[data-year]');
  yr.forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
})();
