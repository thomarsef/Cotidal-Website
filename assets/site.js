/* Cotidal site behaviour */
(function () {
  var t = document.getElementById('navToggle'), l = document.getElementById('navLinks');
  if (t && l) t.addEventListener('click', function () {
    var open = l.getAttribute('data-open') === 'true';
    l.setAttribute('data-open', String(!open));
    t.setAttribute('aria-expanded', String(!open));
  });

  /* Contact form.
     Currently opens the visitor's email client with the message pre-filled.
     To switch to a hosted handler (Formspree, Netlify, etc.), set FORM_ENDPOINT
     below to the POST url and the form will submit over fetch instead. */
  var FORM_ENDPOINT = 'https://formspree.io/f/mzepralz';
  var TO = 'tom@cotidal.co.uk';
  var f = document.getElementById('contactForm');
  if (!f) return;
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!f.checkValidity()) { f.reportValidity(); return; }
    var d = {
      first: f.first.value.trim(), last: f.last.value.trim(),
      email: f.email.value.trim(), message: f.message.value.trim()
    };
    if (FORM_ENDPOINT) {
      fetch(FORM_ENDPOINT, {
        method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(d)
      }).then(function () { done(); }).catch(function () { mailto(d); });
      return;
    }
    mailto(d);
  });
  function mailto(d) {
    var subject = 'Website enquiry from ' + d.first + ' ' + d.last;
    var body = d.message + '\n\n' + d.first + ' ' + d.last + '\n' + d.email;
    window.location.href = 'mailto:' + TO + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    done();
  }
  function done() {
    var note = document.createElement('p');
    note.textContent = 'Thank you. Your message is ready to send from your email app. If nothing opened, email tom@cotidal.co.uk directly.';
    note.style.cssText = 'margin:18px 0 0;color:var(--text-strong);font-weight:600;font-size:15px';
    f.appendChild(note);
  }
})();
