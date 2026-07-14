/**
 * Greets anyone who opens the devtools console.
 *
 * The console is a real surface for a developer-facing tool: the people who open it are exactly
 * the audience for Internet Object. It doubles as the AGPL §13 source offer — a network-hosted
 * instance has to tell its users where the source lives, and this is one of the places we say so.
 */

const LOGO = `
██╗ ███████████╗
╚═╝ ╚══════════╝
██╗ ▄█████████▄
██║ ██╔══════██╗
██║ ██║      ██║
██║ ██║      ██║
██║ ▀█████████▀║
╚═╝  ╚═════════╝
`;

const ACCENT = '#3b9dff'; // palette.dark.accent
const INK = '#e6edf3';
const DIM = '#9aa5b1';

const SOURCE_URL = 'https://github.com/maniartech/InternetObject-Playground';
const DOCS_URL = 'https://docs.internetobject.org';
const SITE_URL = 'https://www.internetobject.org';

export function printConsoleBanner(): void {
  // Only clear in production. In dev the console carries Vite's HMR output and our own errors,
  // and wiping it would be actively hostile to the person working on the playground.
  if (import.meta.env.PROD) {
    console.clear();
  }

  console.log(`%c${LOGO}`, `color:${ACCENT};font-weight:bold;line-height:1.15`);

  console.log(
    `%cInternet Object%c — a schema-first, JSON-sized-down data format.\n` +
      `%cYou're in the Playground. Type on the left, watch it parse on the right.`,
    `color:${ACCENT};font-size:14px;font-weight:700`,
    `color:${INK};font-size:14px`,
    `color:${DIM};font-size:12px`,
  );

  // Version is the publish date (YYYYMMDD) — the playground ships continuously, so "which build am
  // I looking at" is the only question a version needs to answer here. Stamped at build time.
  console.log(
    `%cBuild  %c${__APP_VERSION__}`,
    `color:${DIM}`,
    `color:${INK};font-family:monospace`,
  );

  console.log(
    `%cLearn  %c${DOCS_URL}\n` + `%cAbout  %c${SITE_URL}\n` + `%cSource %c${SOURCE_URL}  (AGPL-3.0)`,
    `color:${DIM}`,
    `color:${ACCENT}`,
    `color:${DIM}`,
    `color:${ACCENT}`,
    `color:${DIM}`,
    `color:${ACCENT}`,
  );

  console.log(
    `%cFound a bug, or made it better? Pull requests are welcome.`,
    `color:${DIM};font-style:italic`,
  );
}
