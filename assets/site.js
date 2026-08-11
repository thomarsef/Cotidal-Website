/* Cotidal site behaviour */
(function () {
  var t = document.getElementById('navToggle'), l = document.getElementById('navLinks');
  if (t && l) t.addEventListener('click', function () {
    var open = l.getAttribute('data-open') === 'true';
    l.setAttribute('data-open', String(!open));
    t.setAttribute('aria-expanded', String(!open));
  });
  /* Contact form.
     Posts to FORM_ENDPOINT when set, and falls back to the visitor's email
     client if the request fails or the endpoint is blank. */
  var FORM_ENDPOINT = 'https://formspree.io/f/mzepralz';
  var TO = 'tom@cotidal.co.uk';
  var f = document.getElementById('contactForm');
  if (!f) return;
  var sent = false;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (sent) return;
    if (!f.checkValidity()) { f.reportValidity(); return; }
    var d = {
      first: f.first.value.trim(), last: f.last.value.trim(),
      email: f.email.value.trim(), message: f.message.value.trim()
    };
    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(d)
      }).then(function (r) {
        if (r.ok) { f.reset(); done(false); } else { mailto(d); }
      }).catch(function () { mailto(d); });
      return;
    }
    mailto(d);
  });
  function mailto(d) {
    var subject = 'Website enquiry from ' + d.first + ' ' + d.last;
    var body = d.message + '\n\n' + d.first + ' ' + d.last + '\n' + d.email;
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    done(true);
  }
  function done(viaEmailApp) {
    sent = true;
    var note = document.createElement('p');
    note.textContent = viaEmailApp
      ? 'Thank you. Your message is ready to send from your email app. If nothing opened, email ' + TO + ' directly.'
      : 'Thank you. Your message has been received and I will come back to you shortly.';
    note.style.cssText = 'margin:18px 0 0;color:var(--text-strong);font-weight:600;font-size:15px';
    f.appendChild(note);
  }
})();
