# Getting the Cotidal site live

Everything in this folder is the finished website. There is no build step: the files you
see here are exactly the files the browser loads. Follow the steps in order.

Estimated time: 20 minutes for steps 1 to 4, then up to a few hours for DNS to settle.

---

## What is in the folder

```
index.html          Home
services.html       Services
about.html          About
contact.html        Contact
CNAME               Your custom domain (edit this, see step 5)
.nojekyll           Tells GitHub Pages to publish the files as they are
DEPLOY.md           This guide
README.md           Short technical notes
assets/
  site.css          All styling
  site.js           Mobile menu and contact form
  tokens/           Cotidal design tokens (colours, type, spacing)
  cotidal-*.svg     Logo lockups and icon marks
  favicon.png       Browser tab icon
  tom-fitzgerald.jpg  Founder photo used on the About page
```

Keep the folder structure exactly as it is. The pages reference `assets/...` by relative
path, so moving files will break images and styling.

---

## Step 1: Create the GitHub repository

1. Sign in at github.com and click the **+** in the top right, then **New repository**.
2. Name it `cotidal-website`.
3. Set it to **Public**. GitHub Pages needs a paid plan to publish from a private repo.
4. Do **not** tick "Add a README file". You want an empty repository.
5. Click **Create repository**.

Leave the page open. GitHub shows you a set of commands and an upload link.

---

## Step 2: Upload the files

The easiest route, no command line needed:

1. On the empty repository page, click **uploading an existing file**.
2. Open this `site` folder on your computer.
3. Select everything **inside** it (the four HTML files, `assets`, `CNAME`, `.nojekyll`,
   the two markdown files) and drag them into the browser window.
   Do not drag the `site` folder itself. The HTML files must sit at the top level of the
   repository, not inside a subfolder.
4. Scroll down, type a message such as `Initial site`, and click **Commit changes**.

If `.nojekyll` does not appear in the upload list, your operating system is hiding files
that start with a dot. On Mac press `Cmd + Shift + .` in Finder to show them. On Windows,
in File Explorer, go to View and tick "Hidden items".

If you prefer the command line:

```bash
cd path/to/site
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/cotidal-website.git
git push -u origin main
```

---

## Step 3: Turn on GitHub Pages

1. In the repository, click **Settings**, then **Pages** in the left sidebar.
2. Under **Source**, choose **Deploy from a branch**.
3. Set Branch to **main** and folder to **/ (root)**. Click **Save**.
4. Wait one to two minutes, then refresh the page. GitHub shows a green box with your
   temporary address: `https://YOUR-USERNAME.github.io/cotidal-website/`

Open that address and check all four pages. This is your site working. Everything from
here is about putting your own domain in front of it.

---

## Step 4: Edit the CNAME file

The repository contains a file called `CNAME` with one line in it. It currently reads:

```
cotidal.co.uk
```

If that is your domain, leave it. If you are using a different domain, click the file in
GitHub, click the pencil icon, replace the line with your domain (no `https://`, no
trailing slash), and commit.

---

## Step 5: DNS at IONOS

Sign in at ionos.co.uk, go to **Domains & SSL**, click your domain, then open the **DNS**
tab. You are going to add five records.

### 5a: Point the bare domain at GitHub

Add four **A records**, all with the same settings apart from the value:

| Type | Host name | Points to | TTL |
|---|---|---|---|
| A | @ | 185.199.108.153 | 1 hour |
| A | @ | 185.199.109.153 | 1 hour |
| A | @ | 185.199.110.153 | 1 hour |
| A | @ | 185.199.111.153 | 1 hour |

In the IONOS form, "Host name" may be labelled just that or shown as blank for the root
domain. Use `@` if the field accepts it, otherwise leave it empty.

All four are needed. They are GitHub's servers, and having four gives you redundancy.

### 5b: Point www at GitHub

Add one **CNAME record**:

| Type | Host name | Points to | TTL |
|---|---|---|---|
| CNAME | www | YOUR-USERNAME.github.io | 1 hour |

Replace `YOUR-USERNAME` with your actual GitHub username. Note the trailing `.io`, and
that this value has **no** repository name after it and **no** `https://`.

### 5c: Remove anything conflicting

IONOS often pre-fills a domain with records pointing at its own parking page or website
builder. Delete or overwrite:

- any existing **A record** on `@` that is not one of the four above
- any existing **CNAME** on `www` pointing somewhere else
- any **AAAA** records on `@`, unless you want to add GitHub's IPv6 addresses too

Leave MX records alone. Those handle your email and have nothing to do with the website.

---

## Step 6: Connect the domain in GitHub

1. Back in **Settings › Pages**, under **Custom domain**, type your domain and click
   **Save**. GitHub will check the DNS.
2. You may see "Domain's DNS record could not be verified" at first. That is normal.
   DNS changes take anywhere from ten minutes to a few hours to propagate.
3. Once the check passes, tick **Enforce HTTPS**. This box stays greyed out until GitHub
   has issued a certificate for your domain, which can take up to 24 hours after the DNS
   resolves. Come back and tick it.

When it is all done, `https://cotidal.co.uk` and `https://www.cotidal.co.uk` both load
your site, with a padlock in the address bar.

---

## Step 7: The contact form

Right now the form on the Contact page opens the visitor's own email application with
their message pre-filled and addressed to info@cotidal.co.uk. That works everywhere, but
it relies on the visitor having a mail app set up, and you will lose some enquiries.

To capture submissions properly, use a hosted form service. Formspree is the simplest:

1. Sign up at formspree.io and create a new form. Set the notification address to
   info@cotidal.co.uk.
2. Formspree gives you an endpoint that looks like `https://formspree.io/f/abcdwxyz`.
3. In GitHub, open `assets/site.js`, click the pencil icon, and find this line near the
   top of the contact form section:

   ```js
   var FORM_ENDPOINT = '';
   ```

   Change it to:

   ```js
   var FORM_ENDPOINT = 'https://formspree.io/f/abcdwxyz';
   ```

4. Commit. The site redeploys in about a minute. Send yourself a test message.

The email fallback stays in place, so if the service is ever unreachable the form still
works.

---

## Making changes later

Every commit to the `main` branch redeploys the site automatically, usually within a
minute. Two ways to edit:

- **In the browser.** Open the file in GitHub, click the pencil icon, edit, commit. Good
  for fixing a sentence or a phone number.
- **On your computer.** Edit the files locally, then `git add . && git commit -m "..."
  && git push`. Better for anything substantial.

To preview locally before pushing, just double-click `index.html`. Everything works from
the file system apart from the Google Fonts, which need an internet connection.

---

## Before you tell anyone about it

- **Client logos.** The five marks on the Home page are text placeholders, not real logos.
  Find `<div class="logo-row">` in `index.html`. Replace each
  `<span class="logo-mark">Name</span>` with `<img src="assets/logo-name.png" alt="Name">`
  once you have permission and the files, or delete the whole `logo-row` div.
- **Case studies.** The four on the Services page are drafts. Check the facts and the
  client sensitivity before launch.
- **Booking link.** Every "Book a Meeting" button points at
  `https://cal.com/tom-fitzgerald-seh8ar`. If that changes, search and replace it across
  all four HTML files.
- **Testimonial.** Confirm Guy at Catalyx is happy to be named.

---

## If something goes wrong

**The site shows a 404 after enabling Pages.** The HTML files are probably inside a
subfolder in the repository. `index.html` must be at the top level.

**The site loads but has no styling.** `assets/site.css` did not upload, or the `assets`
folder was renamed. Check the repository file list.

**Changes are not appearing.** Check the **Actions** tab in the repository for a failed
deployment, and hard refresh your browser (`Cmd/Ctrl + Shift + R`).

**The custom domain will not verify.** Use dnschecker.org to look up your domain and
confirm the four A records have propagated. If IONOS still shows its own records, they
were not deleted.

**HTTPS is greyed out.** Wait. Certificate issuing happens after DNS verification and can
take a day. If it is still greyed out after 48 hours, remove the custom domain in Settings
› Pages, save, then add it back.
