# Victoria Dental Practice — website

A complete static rebuild of victoriadentalpractice.net. No build step, no
framework, no dependencies. Nine pages of hand-written HTML, one stylesheet, one
small JavaScript file.

---

## Getting it online

**Option A — drag and drop (easiest).** Go to [app.netlify.com/drop](https://app.netlify.com/drop)
and drag this whole folder onto the page. It is live in about ten seconds on a
temporary address; you can then point the real domain at it from Netlify's DNS
settings. Cloudflare Pages and Vercel work the same way.

**Option B — existing hosting.** Upload the contents of this folder (not the
folder itself) to your web host's public directory — usually `public_html`,
`www` or `htdocs` — over FTP or the host's file manager. Everything uses
relative paths, so it works from the domain root without any configuration.

**Option C — look at it first.** Double-click `index.html`. It opens in your
browser and every page works offline, apart from the map, which needs an
internet connection.

### One thing to fix on the server

The current site runs on plain HTTP and its HTTPS URLs redirect in a loop. That
costs you in Google rankings and shows visitors a "Not secure" warning. Any of
the hosts above give you a free SSL certificate automatically. If you stay with
your existing host, ask them to enable Let's Encrypt and force HTTPS.

---

## What's in the folder

```
index.html            Home
treatments.html       Treatments & fees (full price list)
emergencies.html      Same-day emergency information
team.html             The dentists, plus patient comments
new-patients.html     Registering, first visit, nervous patients
faqs.html             Questions and oral-health advice
contact.html          Address, hours, directions, enquiry form
vacancies.html        Hygienist vacancy
privacy.html          Privacy notice (template — see notes)
404.html              Page-not-found

assets/css/style.css  The whole design system
assets/js/main.js     Menu, open/closed indicator, enquiry form
assets/img/           Favicon and social-share image
sitemap.xml           For Google Search Console
robots.txt
_build/               The Python scripts that generated the pages (optional)
```

---

## Editing it

**Text and prices.** Open the `.html` file in any text editor and change the
words. The fee tables are ordinary HTML tables — find the price, type over it.

**Colours.** Everything comes from variables at the top of
`assets/css/style.css`. Changing `--teal-700` changes every button, link and
heading accent across all nine pages.

**Opening hours.** They appear in three places if they ever change: the strip at
the top of every page, the card on the homepage, and the contact page. The
"Open now / Closed now" badge is driven by `assets/js/main.js` — the times are
in the `open` calculation near the bottom (currently 08:30–17:00, Mon–Fri).

**Regenerating.** If you would rather edit once than nine times, the scripts in
`_build/` produce every page from shared templates. Run `python3 build.py`,
`python3 build_pages.py`, `python3 build_pages2.py` from inside `_build/`.

---

## The enquiry form

The contact form currently opens a pre-filled email in the visitor's own mail
app. That works everywhere and stores nothing, but it does depend on them having
email set up.

To have submissions arrive in your inbox instead, sign up for a free
[Formspree](https://formspree.io) account and change the opening `<form>` tag in
`contact.html` to:

```html
<form class="card" action="https://formspree.io/f/YOUR_ID" method="POST">
```

then delete the `data-mailto-form` attribute. Netlify Forms works similarly —
add `netlify` to the form tag and it just works.

---

## Photography

The site is designed to look complete without photographs, which is why it
launches as-is. It will look considerably better with three or four real ones:

- The shopfront on Victoria Road North — this doubles as reassurance that
  visitors have found the right door
- A reception or waiting-room shot
- Head-and-shoulders portraits of each dentist, replacing the initials on
  `team.html`
- One surgery interior

Anywhere you see `.person__avatar`, dropping in an `<img>` will work without
touching the CSS.

---

## Accessibility and performance notes

- Every page has one `<h1>`, a skip link, visible focus rings, and labelled
  form fields
- Colour contrast meets WCAG AA throughout
- Respects `prefers-reduced-motion`
- No cookies, no trackers, no analytics — nothing that needs a consent banner
- Two external requests only: Google Fonts and the OpenStreetMap tile for the
  map. Self-host the fonts if you want the page fully independent.
