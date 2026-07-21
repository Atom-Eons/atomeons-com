const RAW_ROOT =
  "https://raw.githubusercontent.com/Atom-Eons/atomeons-com/main/public/ae-brawl";

const DOCUMENTS = new Set([
  "ae-brawl-technical-manual.md",
  "about-atomeons-submission-packet.md",
  "devpost-submission-copy.md",
]);

const page = String.raw`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>AE Brawl — Build the fighter. Lead the machine.</title>
  <meta name="description" content="AE Brawl is Atom Eons' OpenAI Build Week project: a cinematic fight-discovery experience powered by Lead MCP and custom image generation.">
  <link rel="canonical" href="https://atomeons.com/brawl">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Atom Eons">
  <meta property="og:title" content="AE Brawl — Build the fighter. Lead the machine.">
  <meta property="og:description" content="Fight-discovery for the city after dark. Bruce Lee discipline, Double Dragon energy, and an accountable agent layer underneath.">
  <meta property="og:url" content="https://atomeons.com/brawl">
  <meta property="og:image" content="https://atomeons.com/brawl/vibe.png">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#090a08">
  <style>
    :root{--ink:#10100d;--night:#080908;--paper:#f5f0e6;--acid:#dcff00;--red:#ff392e;--line:rgba(16,16,13,.18);font-family:Inter,Arial,sans-serif;color:var(--ink);background:var(--paper)}
    *{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:var(--paper)}a{color:inherit}.mono{font:800 10px/1.2 ui-monospace,SFMono-Regular,Consolas,monospace;letter-spacing:.15em;text-transform:uppercase}.nav{position:fixed;z-index:20;left:0;right:0;top:0;display:flex;justify-content:space-between;align-items:center;padding:18px clamp(18px,4vw,64px);color:#fff;background:linear-gradient(#080908dd,transparent)}.nav a{text-decoration:none;font-weight:900;letter-spacing:-.04em}.nav span{color:var(--acid)}
    .hero{position:relative;isolation:isolate;min-height:100svh;display:grid;align-items:end;overflow:hidden;padding:104px clamp(20px,5vw,76px) 42px;background:var(--night);color:var(--paper)}.hero-media{position:absolute;inset:0;z-index:-2}.hero-media img{width:100%;height:100%;object-fit:cover;filter:saturate(.8) contrast(1.12)}.hero-media:after{content:"";position:absolute;inset:0;background:linear-gradient(90deg,#080908f7 0%,#08090896 50%,#080908dd 100%),radial-gradient(circle at 56% 52%,#ff392e3d,transparent 33rem)}.scan{position:absolute;inset:0;opacity:.18;background:repeating-linear-gradient(0deg,#ffffff15 0 1px,transparent 1px 5px);mix-blend-mode:overlay}.hero-inner{max-width:1100px}.kicker{color:var(--acid)}h1,h2,h3,p{margin-top:0}h1{max-width:7ch;margin:18px 0 0;font-size:clamp(80px,17vw,250px);line-height:.78;letter-spacing:-.085em;text-transform:uppercase}h1 small{display:block;margin-top:25px;color:var(--acid);font-size:clamp(27px,4.4vw,68px);line-height:.92;letter-spacing:-.055em;text-transform:none}.deck{max-width:790px;margin:30px 0 0;color:#f5f0e6d9;font-size:clamp(18px,1.7vw,28px);line-height:1.22}.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:34px}.button{padding:14px 18px;border:1px solid #f5f0e688;background:#f5f0e612;color:#fff;text-decoration:none;font:850 10px/1 ui-monospace,monospace;letter-spacing:.12em;text-transform:uppercase}.button.primary{border-color:var(--acid);background:var(--acid);color:var(--night)}
    .plate{position:absolute;right:clamp(20px,5vw,76px);bottom:42px;width:min(300px,38vw);padding:16px;border:1px solid #ffffff55;background:#080908b8;backdrop-filter:blur(18px)}.plate b{display:block;color:var(--red);font-size:12px}.plate strong{display:block;font-size:clamp(32px,5vw,68px);line-height:.88;letter-spacing:-.07em}.plate small{color:#ffffff9b}
    .section{max-width:1600px;margin:auto;padding:clamp(72px,9vw,138px) clamp(20px,5vw,80px)}.section h2{max-width:12ch;margin:14px 0 0;font-size:clamp(48px,7vw,116px);line-height:.86;letter-spacing:-.075em}.section-head{display:grid;grid-template-columns:minmax(260px,.48fr) minmax(260px,.52fr);gap:40px;align-items:end}.section-head p{color:#10100db8;font-size:clamp(16px,1.2vw,20px);line-height:1.45}.grid{display:grid;margin-top:48px;grid-template-columns:repeat(3,minmax(0,1fr));gap:1px;border:1px solid var(--ink);background:var(--ink)}.card{min-height:235px;padding:clamp(20px,2.3vw,34px);background:#fffdf7}.card .num{color:#10100d78}.card h3{margin:25px 0 0;font-size:clamp(26px,2.7vw,48px);line-height:.94;letter-spacing:-.06em}.card p{color:#10100daf;font-size:clamp(15px,1.1vw,19px);line-height:1.43}.rounds{grid-template-columns:repeat(4,minmax(0,1fr))}.rounds .card:nth-child(even){background:var(--night);color:var(--paper)}.rounds .card:nth-child(even) p{color:#f5f0e6b8}
    .manual{display:grid;grid-template-columns:minmax(280px,.48fr) minmax(0,.52fr);gap:48px;border-top:1px solid var(--line);border-bottom:1px solid var(--line)}.list{margin:0;padding:0;list-style:none}.list li{padding:20px 0;border-bottom:1px solid var(--line);color:#10100db8;font-size:clamp(16px,1.15vw,20px);line-height:1.45}.list li:last-child{border:0}.packets .card{display:grid;align-content:space-between;color:var(--ink);text-decoration:none}.packets .card:nth-child(2){background:#e6dccb}.packets .card:nth-child(3){background:var(--acid)}.packets small{font:750 10px/1.35 ui-monospace,monospace;letter-spacing:.08em;text-transform:uppercase;color:#10100d99}
    .check{display:grid;margin-top:45px;border-top:1px solid var(--ink)}.row{display:grid;grid-template-columns:minmax(160px,.27fr) minmax(0,1fr);gap:25px;padding:19px 0;border-bottom:1px solid var(--line)}.row strong{font-size:clamp(18px,1.6vw,28px);line-height:1.08;letter-spacing:-.04em}.night{max-width:none;background:var(--night);color:var(--paper)}.night .inner{max-width:1440px;margin:auto}.night .list li{color:#f5f0e6b8;border-color:#ffffff29}.night .list strong{color:var(--acid)}.final{max-width:none;background:radial-gradient(circle at 80% 20%,#ff392e30,transparent 24rem),var(--night);color:var(--paper)}.final .inner{max-width:1440px;margin:auto}.status{display:inline-flex;align-items:center;gap:8px;margin-top:26px;color:#f5f0e6aa}.status:before{content:"";width:8px;height:8px;border-radius:50%;background:var(--acid);box-shadow:0 0 18px var(--acid);animation:pulse 2s ease-in-out infinite}@keyframes pulse{50%{opacity:.35;transform:scale(.7)}}
    @media(max-width:980px){.section-head,.manual{grid-template-columns:1fr}.grid,.rounds{grid-template-columns:1fr}.plate{position:relative;right:auto;bottom:auto;width:100%;margin-top:40px}.row{grid-template-columns:1fr;gap:8px}}
    @media(max-width:640px){.nav span{display:none}.hero{min-height:900px}h1{font-size:clamp(72px,27vw,122px)}}
    @media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}.status:before{animation:none}}
  </style>
</head>
<body>
  <nav class="nav"><a href="/">ATOM EONS</a><span class="mono">OPENAI BUILD WEEK // V56</span></nav>
  <main>
    <section class="hero">
      <div class="hero-media" aria-hidden="true"><img src="/brawl/vibe.png" alt=""><i class="scan"></i></div>
      <div class="hero-inner">
        <p class="mono kicker">Submission stage / controlled chaos</p>
        <h1>AE Brawl<small>Fight-discovery for the city after dark.</small></h1>
        <p class="deck">A cinematic AI-powered experience for finding the right gym, night, discipline, and story. Bruce Lee discipline cut with Double Dragon pressure—built as a safe, consent-first product judges can understand in one pass.</p>
        <div class="actions"><a class="button primary" href="#proof">See the proof</a><a class="button" href="#machine">Lead MCP</a><a class="button" href="#packets">Judge packets</a></div>
        <p class="mono status">Live build / GitHub commit 0de2bc9</p>
      </div>
      <div class="plate" aria-hidden="true"><b>AE</b><strong>BRAWL</strong><small class="mono">Human readable / machine led</small></div>
    </section>

    <section class="section" id="proof">
      <p class="mono">The one-line</p><h2>Not a fight app. A story engine for disciplined human movement.</h2>
      <div class="grid">
        <article class="card"><span class="mono num">01 / USER</span><h3>Make the city feel alive.</h3><p>Choose a discipline, find a signal, scout the room, and leave with a safe first-night story.</p></article>
        <article class="card"><span class="mono num">02 / JUDGE</span><h3>See one coherent product.</h3><p>UX, safety boundary, agent structure, and demo path work as one object instead of a pile of technical claims.</p></article>
        <article class="card"><span class="mono num">03 / ATOM EONS</span><h3>Build culture-grade AI.</h3><p>Visual mythology, practical routing, and accountable documentation—without hype fog.</p></article>
      </div>
    </section>

    <section class="section" id="machine">
      <div class="section-head"><div><p class="mono">Lead MCP / four rounds</p><h2>The machine stays underneath the experience.</h2></div><p>The visitor is never forced to admire infrastructure. Intent comes in. A safe route comes out. Real-world data, fictional codenames, safety rules, and submission proof stay separated.</p></div>
      <div class="grid rounds">
        <article class="card"><span class="mono num">01 / SIGNAL</span><h3>Catch intent.</h3><p>Start with discipline, energy, location, and the kind of night the person wants.</p></article>
        <article class="card"><span class="mono num">02 / ROUTE</span><h3>Lead, don’t dump.</h3><p>Turn attention into one clear, testable next action instead of another directory.</p></article>
        <article class="card"><span class="mono num">03 / GUARD</span><h3>Keep the story honest.</h3><p>Fiction creates mythology. Verification governs real places, people, and claims.</p></article>
        <article class="card"><span class="mono num">04 / PACKET</span><h3>Leave receipts.</h3><p>The output becomes a judge path, README spine, video script, and research record.</p></article>
      </div>
    </section>

    <section class="section manual">
      <div><p class="mono">AE research doc</p><h2>Innovation claims a judge can test.</h2></div>
      <ul class="list"><li>Cinematic discovery moves from signal to dossier to action without menu fatigue.</li><li>Lead MCP converts human intent into bounded, inspectable next steps.</li><li>The fiction/real boundary keeps entertainment mythology away from unverified venue claims.</li><li>Consent-first combat UX sells energy while rejecting unsupervised or non-consensual contact.</li><li>The page doubles as judging surface, README companion, and video-script spine.</li></ul>
    </section>

    <section class="section packets" id="packets">
      <div class="section-head"><div><p class="mono">Submission packets</p><h2>Three judge-facing files.</h2></div><p>Download the technical argument, the Atom Eons context, or the ready-to-use Devpost copy.</p></div>
      <div class="grid"><a class="card" href="/brawl/ae-brawl-technical-manual.md"><span class="mono num">01 / MANUAL</span><h3>AE Brawl Technical Manual</h3><small>Lead MCP, UX model, safety rules, innovation notes</small></a><a class="card" href="/brawl/about-atomeons-submission-packet.md"><span class="mono num">02 / ABOUT</span><h3>About Atom Eons</h3><small>Founder and company context for judges and press</small></a><a class="card" href="/brawl/devpost-submission-copy.md"><span class="mono num">03 / DEVPOST</span><h3>Submission Copy</h3><small>Description, video sequence, repo notes, checklist</small></a></div>
    </section>

    <section class="section night">
      <div class="inner"><p class="mono kicker">Demo video / under three minutes</p><h2>Shoot the experience, then expose the machine.</h2><ol class="list"><li><strong>0:00–0:20</strong> — AE Brawl and the problem: people want movement, story, and local signal—not another dead directory.</li><li><strong>0:20–1:10</strong> — Show discipline, location signal, dossier, Scout mode, StoryDrop, and safety language.</li><li><strong>1:10–1:55</strong> — Explain Lead MCP: intent comes in, safe route comes out, real and fictional layers stay separate.</li><li><strong>1:55–2:35</strong> — Explain Codex: product page, UX structure, checks, documentation, and packet built as one system.</li><li><strong>2:35–2:55</strong> — Close on the promise: make the city playable while keeping consent, supervision, and truth visible.</li></ol></div>
    </section>

    <section class="section final"><div class="inner"><p class="mono kicker">Final submit state</p><h2>Make them feel the room. Then give them the receipts.</h2><div class="actions"><a class="button primary" href="https://openai.devpost.com/">Open Devpost</a><a class="button" href="/contact">Contact Atom Eons</a></div></div></section>
  </main>
</body>
</html>`;

export default {
  async fetch(request) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/ae-brawl")) {
      const suffix = url.pathname.slice("/ae-brawl".length);
      return Response.redirect(`${url.origin}/brawl${suffix}`, 301);
    }

    if (url.pathname === "/brawl" || url.pathname === "/brawl/") {
      return new Response(page, {
        headers: {
          "content-type": "text/html; charset=UTF-8",
          "cache-control": "public, max-age=120, s-maxage=300",
          "x-atom-eons-release": "AE-BRAWL-V56-0de2bc9",
        },
      });
    }

    if (url.pathname === "/brawl/vibe.png") {
      const image = await fetch(`${RAW_ROOT}/ae-brawl-v56-vibe.png`, {
        cf: { cacheEverything: true, cacheTtl: 86400 },
      });
      return new Response(image.body, {
        status: image.status,
        headers: {
          "content-type": "image/png",
          "cache-control": "public, max-age=86400",
        },
      });
    }

    const file = url.pathname.slice("/brawl/".length);
    if (DOCUMENTS.has(file)) {
      const document = await fetch(`${RAW_ROOT}/${file}`, {
        cf: { cacheEverything: true, cacheTtl: 300 },
      });
      return new Response(document.body, {
        status: document.status,
        headers: {
          "content-type": "text/markdown; charset=UTF-8",
          "content-disposition": `attachment; filename="${file}"`,
          "cache-control": "public, max-age=300",
        },
      });
    }

    return new Response("Not found", { status: 404 });
  },
};
