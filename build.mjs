#!/usr/bin/env node
/* ============================================================
   normanchella.com — static page generator
   ------------------------------------------------------------
   Reads content.json and writes index.html. All your text lives
   in content.json — edit that, run `npm run build`, done.

   Light formatting you can use inside any text value:
     **bold**        ==highlight==        *italic*
     [link text](https://example.com)

   Run:  npm run build   (or: node build.mjs)
   ============================================================ */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const c = JSON.parse(await fs.readFile(path.join(__dirname, "content.json"), "utf8"));

const esc = (s = "") =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/* tiny inline formatter: escape, then links / bold / highlight / italic */
function inline(s = "") {
  s = esc(s);
  s = s.replace(/\[([^\]]+)\]\((https?:[^)]+|mailto:[^)]+)\)/g,
        (_, t, u) => `<a href="${u}">${t}</a>`);
  s = s.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  s = s.replace(/==([^=]+)==/g, '<span class="hl">$1</span>');
  s = s.replace(/(^|[^*])\*([^*]+)\*(?!\*)/g, "$1<em>$2</em>");
  return s;
}

const linkRow = (l) =>
  `        <li><a href="${l.url}">${esc(l.label)}${l.tag ? ` <span class="tag">${esc(l.tag)}</span>` : ""}</a></li>`;

const showCard = (s) =>
  `        <a class="card${s.feature ? " feature" : ""}" href="${s.url}">
          <span class="name">${esc(s.name)}</span><span class="meta">${esc(s.meta || "")}</span>
        </a>`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(c.name)}</title>
<meta name="description" content="${esc(c.metaDescription || "")}">
<link rel="canonical" href="${c.siteUrl}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(c.name)}">
<meta property="og:title" content="${esc(c.name)}">
<meta property="og:description" content="${esc(c.tagline || "")}">
<meta property="og:url" content="${c.siteUrl}">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="#141d28">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Overlock:ital,wght@0,400;0,700;1,400&family=Raleway:wght@600;700;800&display=swap">
<link rel="stylesheet" href="assets/styles.css">
</head>
<body>
<div class="wrap">

  <header class="hero">
    <span class="mark">${esc(c.kicker || "")}</span>
    <h1>${esc(c.title)}</h1>
    <p class="tagline">${esc(c.tagline || "")}</p>
  </header>

  <main>
    <section>
      <h2>About me</h2>
      ${c.about.map((p, i) => `<p class="${i === 0 ? "lead" : ""}">${inline(p)}</p>`).join("\n      ")}
    </section>

    <section>
      <h2>Currently</h2>
      ${c.currently.map((p) => `<p>${inline(p)}</p>`).join("\n      ")}
    </section>

    <section>
      <h2>Previously</h2>
      <p class="fine">${inline(c.previously)}</p>
    </section>

    <section>
      <h2>Why · How · What</h2>
      <p><strong>Why:</strong> ${inline(c.whyHowWhat.why)}</p>
      <p><strong>How:</strong> ${inline(c.whyHowWhat.how)}</p>
      <p><strong>What:</strong> ${inline(c.whyHowWhat.what)}</p>
      <p class="fine"><em>${inline(c.closing)}</em></p>
    </section>

    <section>
      <h2>My shows</h2>
      <div class="grid">
${c.shows.map(showCard).join("\n")}
      </div>
    </section>

    <section>
      <h2>Work with me</h2>
      <ul class="links">
${c.workWith.map(linkRow).join("\n")}
      </ul>
    </section>

    <section>
      <h2>Reach out</h2>
      <ul class="links">
${c.contact.map(linkRow).join("\n")}
      </ul>
    </section>

    <section>
      <h2>Support</h2>
      <ul class="links">
${c.support.map(linkRow).join("\n")}
      </ul>
    </section>
  </main>

  <footer>
    <p>${esc(c.footer || "")} · <a class="eterna" href="https://eterna.garden">Eterna</a> · &copy; <span id="y"></span> ${esc(c.name)}</p>
  </footer>
</div>
<script>document.getElementById('y').textContent = new Date().getFullYear();</script>
</body>
</html>
`;

await fs.writeFile(path.join(__dirname, "index.html"), html);
console.log("✓ Built index.html from content.json");
