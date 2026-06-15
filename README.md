# normanchella.com — static site

A lean static replacement for the current Carrd page. Your personal
"business card" and an identity-layer **extension of Eterna**.

```
content.json        ← ALL your text lives here — edit this
build.mjs           ← turns content.json into index.html
index.html          ← generated page (don't edit by hand)
assets/styles.css   ← styling + brand tokens (top of the file)
```

## Editing your text
Open `content.json`, change any text, then run `npm run build`. No HTML needed.
Inside any text value you can use light formatting:

```
**bold**     ==highlight==     *italic*     [link text](https://example.com)
```

Add or remove shows / links by editing the arrays in `content.json`.

## Preview locally
```bash
npm run serve      # builds, then serves at http://localhost:8081
```
(Or just open the generated `index.html` directly in a browser.)

## Deploy
Upload these files to any static host. Same two options as Tempered Fables:

- **GitHub Pages:** push to a repo, Settings → Pages → deploy from branch
  (`main` / root). Add `normanchella.com` as the custom domain.
- **Cloudflare Pages:** connect the repo, no build command, output dir `/`.

Since there's no build step, you can even drag-and-drop the folder into
Netlify/Cloudflare or commit straight to a Pages branch.

## Branding
Themed as **Hydrangea Meridian (Universe 0)** from the Eterna Brand Design
Guide v1.0 — the "present-day / this is home" universe. Deep navy `#141d28`,
warm amber `#FFBE49` titles, bright-purple `#C26EFF` accent, green external
links, body **Overlock**, headings **Raleway** (Google Fonts). Dark-first,
per the brand's no-light-mode principle.

## Customising
- **Colours / fonts:** tokens at the top of `assets/styles.css`.
- **Copy & links:** edit `index.html` directly — content mirrors your current
  Carrd page (bio, shows, work-with-me, contact, support).
- **Show cover art:** the shows are currently styled text cards. To use real
  artwork, drop images into `assets/` and swap the `.card` markup for
  `<img>`s.
