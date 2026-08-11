# Cotidal website

Static site, no build step. Push the contents of `site/` to a GitHub repository and enable
GitHub Pages (Settings › Pages › Deploy from a branch › `main` / root).

## Files

```
index.html      Home
services.html   Services
about.html      About
contact.html    Contact
assets/site.css Styles (imports the Cotidal design tokens in assets/tokens/)
assets/site.js  Mobile nav + contact form handling
assets/         Logos, favicon, founder photo
.nojekyll       Stops GitHub Pages running Jekyll over the files
```

## Contact form

The form currently opens the visitor's own email client with the message pre-filled.
To switch to a hosted handler, open `assets/site.js` and set:

```js
var FORM_ENDPOINT = 'https://formspree.io/f/xxxxxxx';
```

Any endpoint that accepts a JSON POST works (Formspree, Formsubmit, Basin, a Cloudflare
Worker). The mailto route stays as the fallback if the request fails.

For Netlify instead of GitHub Pages, add `netlify` and `name="contact"` attributes to the
`<form>` tag in `contact.html` and Netlify Forms will capture submissions with no JS.

## Before launch

- Client logos on the Home page are text placeholders (`.logo-mark` spans in `index.html`).
  Swap each for an `<img>` once permission is confirmed, or delete the `<div class="logo-row">`.
- The four case studies on `services.html` are draft copy pending fact and sensitivity checks.
- "Book a Meeting" points at https://cal.com/tom-fitzgerald-seh8ar throughout.
- Add a `CNAME` file containing your domain if you are using a custom domain.
