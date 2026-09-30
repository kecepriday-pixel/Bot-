/**
 * TYUSS_V0 — Julius WhatsApp Bot Website
 * Single-file Node.js website
 *
 * Jalankan:
 *   node index.js
 *
 * Buka:
 *   http://localhost:3000
 */

const http = require("http");

const PORT = process.env.PORT || 3000;

const html = `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>Julius | TYUSS_V0</title>

  <meta
    name="description"
    content="TYUSS_V0 — WhatsApp Bot project by Julius."
  />

  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    :root {
      --bg: #020811;
      --bg2: #071525;
      --cyan: #55eaff;
      --blue: #4c8dff;
      --light: #e8fbff;
      --muted: #8ca7b7;
      --card: rgba(8, 25, 43, 0.72);
      --border: rgba(85, 234, 255, 0.18);
    }

    html {
      scroll-behavior: smooth;
    }

    body {
      font-family: Inter, Arial, sans-serif;
      background:
        radial-gradient(circle at 50% 10%, rgba(41, 144, 255, .16), transparent 35%),
        linear-gradient(180deg, #020811, #04101d 50%, #020811);
      color: var(--light);
      min-height: 100vh;
      overflow-x: hidden;
    }

    /* BACKGROUND */

    .stars {
      position: fixed;
      inset: 0;
      pointer-events: none;
      z-index: -2;
      background-image:
        radial-gradient(circle, rgba(255,255,255,.7) 1px, transparent 1px),
        radial-gradient(circle, rgba(85,234,255,.45) 1px, transparent 1px);
      background-size: 70px 70px, 110px 110px;
      background-position: 0 0, 30px 30px;
      opacity: .22;
    }

    .orb {
      position: fixed;
      border-radius: 50%;
      filter: blur(90px);
      pointer-events: none;
      z-index: -1;
    }

    .orb.one {
      width: 300px;
      height: 300px;
      background: rgba(0, 174, 255, .15);
      top: 10%;
      left: -100px;
    }

    .orb.two {
      width: 350px;
      height: 350px;
      background: rgba(65, 105, 255, .12);
      right: -130px;
      bottom: 10%;
    }

    /* NAVBAR */

    nav {
      width: min(1100px, 92%);
      margin: auto;
      height: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .logo {
      font-size: 22px;
      font-weight: 900;
      letter-spacing: 2px;
      color: white;
    }

    .logo span {
      color: var(--cyan);
      text-shadow: 0 0 18px rgba(85,234,255,.8);
    }

    nav ul {
      list-style: none;
      display: flex;
      gap: 25px;
    }

    nav a {
      color: #a9c4d4;
      text-decoration: none;
      font-size: 14px;
      transition: .25s;
    }

    nav a:hover {
      color: var(--cyan);
    }

    /* HERO */

    .hero {
      width: min(1100px, 92%);
      min-height: calc(100vh - 80px);
      margin: auto;
      display: grid;
      grid-template-columns: 1.2fr .8fr;
      align-items: center;
      gap: 50px;
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 8px 13px;
      border: 1px solid var(--border);
      border-radius: 999px;
      background: rgba(85,234,255,.06);
      color: var(--cyan);
      font-size: 12px;
      margin-bottom: 22px;
    }

    .dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #59ffb1;
      box-shadow: 0 0 10px #59ffb1;
      animation: pulse 1.5s infinite;
    }

    @keyframes pulse {
      50% { opacity: .35; }
    }

    h1 {
      font-size: clamp(45px, 7vw, 85px);
      line-height: .95;
      letter-spacing: -4px;
    }

    h1 .blue {
      display: block;
      color: var(--cyan);
      text-shadow:
        0 0 15px rgba(85,234,255,.35),
        0 0 45px rgba(65,150,255,.18);
    }

    .hero p {
      color: var(--muted);
      line-height: 1.8;
      max-width: 600px;
      margin: 25px 0 30px;
      font-size: 16px;
    }

    .buttons {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .btn {
      display: inline-block;
      padding: 14px 22px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 700;
      font-size: 14px;
      transition: .25s;
    }

    .btn-primary {
      color: #001018;
      background: linear-gradient(135deg, #67f0ff, #4b9cff);
      box-shadow: 0 10px 35px rgba(56,174,255,.2);
    }

    .btn-secondary {
      color: var(--light);
      border: 1px solid var(--border);
      background: rgba(255,255,255,.025);
    }

    .btn:hover {
      transform: translateY(-3px);
    }

    /* SLIME */

    .visual {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 400px;
    }

    .slime-wrap {
      position: relative;
      width: 310px;
      height: 310px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .ring,
    .ring2 {
      position: absolute;
      border-radius: 50%;
      border: 1px solid rgba(85,234,255,.2);
    }

    .ring {
      width: 300px;
      height: 300px;
      animation: rotate 13s linear infinite;
      border-top-color: var(--cyan);
    }

    .ring2 {
      width: 250px;
      height: 250px;
      animation: rotateReverse 9s linear infinite;
      border-bottom-color: var(--blue);
    }

    @keyframes rotate {
      to { transform: rotate(360deg); }
    }

    @keyframes rotateReverse {
      to { transform: rotate(-360deg); }
    }

    .slime {
      position: relative;
      width: 175px;
      height: 145px;
      border-radius: 55% 55% 47% 47%;
      background:
        radial-gradient(circle at 35% 25%, rgba(255,255,255,.8), transparent 9%),
        linear-gradient(145deg, #7df7ff, #42baff 45%, #1767e8);
      box-shadow:
        0 0 30px rgba(85,234,255,.55),
        0 0 100px rgba(35,123,255,.3);
      animation: float 3.5s ease-in-out infinite;
    }

    @keyframes float {
      0%,100% { transform: translateY(0); }
      50% { transform: translateY(-15px); }
    }

    .eye {
      position: absolute;
      top: 64px;
      width: 10px;
      height: 15px;
      background: #07111c;
      border-radius: 50%;
    }

    .eye.left { left: 55px; }
    .eye.right { right: 55px; }

    .smile {
      position: absolute;
      width: 32px;
      height: 14px;
      left: 50%;
      top: 84px;
      transform: translateX(-50%);
      border-bottom: 3px solid #07111c;
      border-radius: 50%;
    }

    .float-label {
      position: absolute;
      bottom: 15px;
      font-size: 11px;
      color: var(--cyan);
      letter-spacing: 4px;
    }

    /* SECTIONS */

    section {
      width: min(1100px, 92%);
      margin: auto;
      padding: 100px 0;
    }

    .section-tag {
      color: var(--cyan);
      font-size: 12px;
      letter-spacing: 4px;
      margin-bottom: 10px;
    }

    .section-title {
      font-size: clamp(32px, 5vw, 50px);
      margin-bottom: 15px;
    }

    .section-desc {
      max-width: 650px;
      color: var(--muted);
      line-height: 1.7;
      margin-bottom: 45px;
    }

    /* FEATURES */

    .grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 18px;
    }

    .card {
      padding: 26px;
      min-height: 190px;
      border-radius: 18px;
      background: var(--card);
      border: 1px solid var(--border);
      backdrop-filter: blur(15px);
      transition: .3s;
    }

    .card:hover {
      transform: translateY(-6px);
      border-color: rgba(85,234,255,.5);
      box-shadow: 0 20px 50px rgba(0,0,0,.25);
    }

    .icon {
      width: 46px;
      height: 46px;
      display: grid;
      place-items: center;
      border-radius: 12px;
      background: rgba(85,234,255,.08);
      border: 1px solid rgba(85,234,255,.15);
      font-size: 21px;
      margin-bottom: 20px;
    }

    .card h3 {
      margin-bottom: 10px;
    }

    .card p {
      color: var(--muted);
      font-size: 14px;
      line-height: 1.65;
    }

    /* TERMINAL */

    .terminal {
      max-width: 850px;
      margin: auto;
      overflow: hidden;
      border-radius: 18px;
      border: 1px solid var(--border);
      background: #030a10;
      box-shadow: 0 30px 80px rgba(0,0,0,.4);
    }

    .terminal-top {
      height: 45px;
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 0 16px;
      border-bottom: 1px solid rgba(255,255,255,.05);
    }

    .terminal-top i {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #365064;
    }

    .terminal-body {
      padding: 25px;
      min-height: 250px;
      font-family: monospace;
      color: #8ca7b7;
      line-height: 1.9;
      font-size: 14px;
    }

    .terminal-body .cmd {
      color: var(--cyan);
    }

    .terminal-body .success {
      color: #64ffb0;
    }

    /* ABOUT */

    .about {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 40px;
      align-items: center;
    }

    .profile {
      padding: 35px;
      border-radius: 20px;
      background:
        linear-gradient(145deg, rgba(85,234,255,.08), rgba(75,100,255,.03));
      border: 1px solid var(--border);
    }

    .profile-name {
      font-size: 35px;
      font-weight: 900;
      margin-bottom: 7px;
    }

    .profile-role {
      color: var(--cyan);
      margin-bottom: 25px;
    }

    .profile p {
      color: var(--muted);
      line-height: 1.8;
    }

    .stats {
      margin-top: 25px;
      display: flex;
      gap: 30px;
    }

    .stat strong {
      display: block;
      color: white;
      font-size: 22px;
    }

    .stat span {
      color: var(--muted);
      font-size: 12px;
    }

    /* FOOTER */

    footer {
      text-align: center;
      padding: 50px 20px;
      color: #577080;
      font-size: 13px;
      border-top: 1px solid rgba(255,255,255,.04);
    }

    footer strong {
      color: var(--cyan);
    }

    /* RESPONSIVE */

    @media (max-width: 800px) {
      nav ul {
        display: none;
      }

      .hero {
        grid-template-columns: 1fr;
        text-align: center;
        padding-top: 70px;
      }

      .hero p {
        margin-left: auto;
        margin-right: auto;
      }

      .buttons {
        justify-content: center;
      }

      .visual {
        min-height: 350px;
      }

      .grid {
        grid-template-columns: 1fr;
      }

      .about {
        grid-template-columns: 1fr;
      }

      h1 {
        letter-spacing: -2px;
      }
    }
  </style>
</head>

<body>

  <div class="stars"></div>
  <div class="orb one"></div>
  <div class="orb two"></div>

  <nav>
    <div class="logo">JULIUS<span>.</span></div>

    <ul>
      <li><a href="#home">Home</a></li>
      <li><a href="#features">Features</a></li>
      <li><a href="#system">System</a></li>
      <li><a href="#about">Developer</a></li>
    </ul>
  </nav>

  <main>

    <div class="hero" id="home">

      <div>
        <div class="badge">
          <span class="dot"></span>
          TYUSS_V0 • SYSTEM ONLINE
        </div>

        <h1>
          WHATSAPP
          <span class="blue">BOT.</span>
        </h1>

        <p>
          TYUSS_V0 adalah project WhatsApp Bot yang dikembangkan oleh
          <strong style="color:white">Julius</strong>.
          Dibangun untuk automation, AI, management grup, entertainment,
          dan berbagai fitur dalam satu sistem.
        </p>

        <div class="buttons">
          <a class="btn btn-primary" href="#features">
            Explore Features
          </a>

          <a class="btn btn-secondary" href="#about">
            About Julius
          </a>
        </div>
      </div>

      <div class="visual">
        <div class="slime-wrap">
          <div class="ring"></div>
          <div class="ring2"></div>

          <div class="slime">
            <span class="eye left"></span>
            <span class="eye right"></span>
            <span class="smile"></span>
          </div>

          <div class="float-label">
            TYUSS CORE
          </div>
        </div>
      </div>

    </div>

    <section id="features">

      <div class="section-tag">BOT CAPABILITIES</div>
      <h2 class="section-title">Built for WhatsApp.</h2>

      <p class="section-desc">
        Satu bot dengan berbagai sistem untuk membantu mengelola grup,
        menjalankan perintah, menggunakan AI, dan memberikan pengalaman
        WhatsApp yang lebih interaktif.
      </p>

      <div class="grid">

        <div class="card">
          <div class="icon">✦</div>
          <h3>Artificial Intelligence</h3>
          <p>
            Integrasi fitur AI untuk percakapan, bantuan informasi,
            dan berbagai command pintar.
          </p>
        </div>

        <div class="card">
          <div class="icon">♜</div>
          <h3>Group Management</h3>
          <p>
            Sistem admin, promote, welcome, goodbye,
            anti-link dan berbagai fitur pengelolaan grup.
          </p>
        </div>

        <div class="card">
          <div class="icon">⚡</div>
          <h3>Fast Command</h3>
          <p>
            Command dirancang sederhana dan cepat
            agar fitur bot mudah digunakan langsung dari WhatsApp.
          </p>
        </div>

        <div class="card">
          <div class="icon">◇</div>
          <h3>Media Tools</h3>
          <p>
            Berbagai utilitas media untuk membantu memproses
            konten langsung melalui command bot.
          </p>
        </div>

        <div class="card">
          <div class="icon">🛡</div>
          <h3>Protection System</h3>
          <p>
            Anti-spam dan fitur moderasi membantu menjaga
            grup tetap lebih teratur.
          </p>
        </div>

        <div class="card">
          <div class="icon">∞</div>
          <h3>Expandable</h3>
          <p>
            TYUSS_V0 terus dikembangkan sehingga fitur baru
            dapat ditambahkan seiring perkembangan project.
          </p>
        </div>

      </div>

    </section>

    <section id="system">

      <div class="section-tag">SYSTEM</div>
      <h2 class="section-title">TYUSS Terminal</h2>

      <p class="section-desc">
        Status simulasi core system TYUSS_V0.
      </p>

      <div class="terminal">

        <div class="terminal-top">
          <i></i>
          <i></i>
          <i></i>
        </div>

        <div class="terminal-body" id="terminal">
          <div><span class="cmd">$</span> node tyuss_v0.js</div>
        </div>

      </div>

    </section>

    <section id="about">

      <div class="about">

        <div>
          <div class="section-tag">DEVELOPER</div>
          <h2 class="section-title">Behind TYUSS.</h2>

          <p class="section-desc">
            TYUSS merupakan project yang dibangun sebagai tempat
            belajar, bereksperimen, dan mengembangkan sistem bot
            WhatsApp menggunakan JavaScript dan Node.js.
          </p>
        </div>

        <div class="profile">

          <div class="profile-name">
            Julius
          </div>

          <div class="profile-role">
            Developer • TYUSS_V0
          </div>

          <p>
            Fokus mengembangkan project WhatsApp Bot dengan tampilan,
            fitur, dan identitas TYUSS sendiri. Project ini akan terus
            berkembang bersama pengalaman dan kemampuan coding yang
            dipelajari.
          </p>

          <div class="stats">

            <div class="stat">
              <strong>JS</strong>
              <span>LANGUAGE</span>
            </div>

            <div class="stat">
              <strong>Node</strong>
              <span>RUNTIME</span>
            </div>

            <div class="stat">
              <strong>V0</strong>
              <span>PROJECT</span>
            </div>

          </div>

        </div>

      </div>

    </section>

  </main>

  <footer>
    Designed for <strong>TYUSS_V0</strong>
    <br><br>
    © ${new Date().getFullYear()} Julius.
  </footer>

  <script>
    const terminal = document.getElementById("terminal");

    const logs = [
      ["Loading TYUSS Core...", ""],
      ["Connecting modules...", ""],
      ["AI module", "success"],
      ["Group manager", "success"],
      ["Protection system", "success"],
      ["Media tools", "success"],
      ["TYUSS_V0 ONLINE ✓", "success"]
    ];

    let index = 0;

    function addLog() {
      if (index >= logs.length) return;

      const div = document.createElement("div");

      if (logs[index][1] === "success") {
        div.innerHTML =
          '<span class="success">✓ ' +
          logs[index][0] +
          '</span>';
      } else {
        div.innerHTML =
          '<span class="cmd">></span> ' +
          logs[index][0];
      }

      terminal.appendChild(div);
      index++;

      setTimeout(addLog, 550);
    }

    setTimeout(addLog, 700);
  </script>

</body>
</html>`;

const server = http.createServer((req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
  });

  res.end(html);
});

server.listen(PORT, () => {
  console.log("----------------------------------");
  console.log(" TYUSS_V0 WEBSITE");
  console.log(" Developer : Julius");
  console.log(" Status    : ONLINE");
  console.log(\` Port      : \${PORT}\`);
  console.log("----------------------------------");
});
