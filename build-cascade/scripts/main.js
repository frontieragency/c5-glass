// Lite layout (sandstone) — minimal interactions.
(function () {
  var burger = document.getElementById('wcBurger');
  var mobile = document.getElementById('wcMobile');
  if (burger && mobile) {
    burger.addEventListener('click', function () {
      var open = mobile.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    mobile.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') { mobile.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); }
    });
  }
  var header = document.getElementById('wcTop');
  if (header) {
    var onScroll = function () { header.classList.toggle('is-stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }
  var y = document.querySelector('[data-year]');
  if (y) { y.textContent = new Date().getFullYear(); }

  // Extended contact form: auto-format phone to (xxx) xxx-xxxx, 10 digits max.
  var phone = document.querySelector('.wc-phone-input');
  if (phone) {
    var fmtPhone = function (v) {
      var d = v.replace(/\D/g, '').slice(0, 10);
      if (d.length > 6) return '(' + d.slice(0, 3) + ') ' + d.slice(3, 6) + '-' + d.slice(6);
      if (d.length > 3) return '(' + d.slice(0, 3) + ') ' + d.slice(3);
      if (d.length > 0) return '(' + d.slice(0, 3);
      return '';
    };
    phone.addEventListener('input', function () { phone.value = fmtPhone(phone.value); });
  }

  // Extended contact form: file-upload filename + drag highlight (no-op elsewhere).
  var drop = document.getElementById('wcDrop');
  if (drop) {
    var input = drop.querySelector('input[type="file"]');
    var cta = drop.querySelector('.wc-upload__cta');
    var base = cta ? cta.innerHTML : '';
    var show = function () {
      if (cta) cta.innerHTML = (input.files && input.files.length)
        ? '<strong>' + input.files[0].name + '</strong>' : base;
      drop.classList.toggle('is-filled', !!(input.files && input.files.length));
    };
    if (input) input.addEventListener('change', show);
    ['dragenter', 'dragover'].forEach(function (e) {
      drop.addEventListener(e, function (ev) { ev.preventDefault(); drop.classList.add('is-drag'); });
    });
    ['dragleave', 'drop'].forEach(function (e) {
      drop.addEventListener(e, function (ev) { ev.preventDefault(); drop.classList.remove('is-drag'); });
    });
    drop.addEventListener('drop', function (ev) {
      if (input && ev.dataTransfer && ev.dataTransfer.files.length) { input.files = ev.dataTransfer.files; show(); }
    });
  }
})();
