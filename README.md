# Internet Object Playground

An interactive editor for [Internet Object](https://www.internetobject.org) — a schema-first, JSON-compatible data format that carries the same data in a fraction of the bytes.

Write a schema, write a document, and watch it parse, validate, and expand into JSON as you type. No install, no signup.

**▶ [play.internetobject.org](https://play.internetobject.org/)**

![The Internet Object Playground: schema and document editors on the left, JSON output on the right](public/screenshot.jpeg)

## What you can do here

- **See the savings.** Every document shows how much smaller it is than the equivalent JSON — the example above is 71.95% smaller.
- **Convert JSON to IO.** Paste any JSON and the playground infers a schema and rewrites it in Internet Object form.
- **Separate schema from data.** Toggle the schema into its own pane to see how IO keeps structure out of the payload.
- **Catch errors as you type.** Parse and validation errors are listed as you go; click one to jump straight to it in the editor.
- **Write with the schema's help.** The editors complete member names, `choices`, `$schema` references and variables from the schema you have actually written, and — because Internet Object records are positional — show which field the caret is on as you move along a row.
- **Share what you build.** Any document can be turned into a link that restores the exact editor state.
- **Learn from examples.** A library of samples covers the basics through to schemas, collections, and edge cases.

It stays responsive on large documents by parsing in a Web Worker, works on mobile, and follows your system's light or dark theme.

## JSON to IO

The fastest way to understand Internet Object is to see it hold *your* data.

Hit **JSON to IO**, paste any JSON object or array, and the playground works out a schema from the shape of your data, then rewrites the document against it — keys lifted out into the schema, values left as a compact positional row. You get back a working Internet Object document and the schema that describes it, ready to edit, plus the size difference against the JSON you started from.

It handles nested objects, arrays, and collections, and infers types (string, number, bool, date) from the values it finds. The feature is marked *Experimental*: schema inference is a best guess at intent, so treat the result as a strong first draft rather than a finished schema — you will often want to tighten a type, mark a member optional, or name things better.

## Run it locally

```bash
corepack enable      # once per machine
pnpm install
pnpm dev             # http://localhost:4000
```

**This project uses pnpm.** Not a preference — four different lockfiles once accumulated here, and
each package manager's install undid the last one's work. `preinstall` now refuses anything else.

### Developing against a local build of the library

`internet-object` is declared as `file:../io-js2` — which package managers **copy** rather than
link, so what gets installed is a snapshot of the library taken at `pnpm install` time. That is
fine for building and shipping, and useless while you are changing the library. In dev the
playground reads your working tree directly instead.

**Clone them side by side and there is nothing to configure:**

```
your-projects/
├── InternetObject-js/      ← the library (or io-js2)
└── InternetObject-Playground/
```

```bash
pnpm dev
```

The dev server says which library it picked up, every time it starts:

```
internet-object: ../InternetObject-js/src  (live source — no build step needed)
```

Then **edit the library and reload the page.** That is the whole loop — no rebuild in the library,
no re-install here, no `pnpm link`. `pnpm build:watch` in the library is *not* needed for this and
does not feed the playground.

#### The three modes

| You want | Do this |
| -------- | ------- |
| A sibling checkout (the usual case) | Nothing — `../io-js2` and `../InternetObject-js` are both found automatically |
| A library somewhere else | `IO_LOCAL_PATH=<path to the library>` — relative to this repo, or absolute |
| The installed package, as a user gets it | `IO_LOCAL=0` |

These are read by `vite.config.ts` at startup, so they are shell variables — a `.env` file will not
work for them:

```bash
# bash / zsh
IO_LOCAL_PATH=../forks/io-experiment pnpm dev
IO_LOCAL=0 pnpm dev
```

```powershell
# PowerShell
$env:IO_LOCAL_PATH='../forks/io-experiment'; pnpm dev
$env:IO_LOCAL=0; pnpm dev
```

#### Dev and build differ, on purpose

| | Library it resolves |
| --- | --- |
| `pnpm dev` | your local source, when a checkout is found |
| `pnpm build`, `pnpm build:check`, `pnpm preview`, CI | the **installed dependency**, always — the snapshot copy in `node_modules` |

A production build has to exercise a real installed package rather than a working tree, so the alias
is deliberately dev-only. To get library changes into a production build, build the library and run
`pnpm install` here to refresh the snapshot. **The build will never quietly pick up your working
tree**, which is the point.

#### If the playground seems to be running an old library

It is worth knowing the shape of this, because it is easy to lose an afternoon to.

1. **Check the startup line.** If it says *"the installed copy"*, no local checkout was found —
   `IO_LOCAL_PATH` will fix it.
2. **Look at an error code.** Codes are renamed occasionally, and a stale library gives itself away:
   if the problem list says `invalid-range` where the current library says `mismatched-min`, you are
   not running what you think you are.
3. **`node_modules/.ignored_internet-object` exists?** An install displaced a hand-made link. Do not
   re-link — the alias above is the supported route, and an install cannot undo it.
4. **Still stale?** Clear vite's pre-bundle cache: `rm -rf node_modules/.vite`.

<details>
<summary>Why an alias, rather than <code>pnpm link</code></summary>

`internet-object` is declared as `file:../io-js2`, and pnpm **copies** a `file:` dependency into its
store rather than linking it. The copy is a snapshot taken at install time, so nothing that happens
in the library afterwards reaches the playground — and `tsup --watch` writes to a directory the
playground never reads. Vite then pre-bundles that copy into `node_modules/.vite/deps`, so even
refreshing the copy by hand can leave old code being served.

A hand-made link fixes it until the next install silently displaces it, renaming it to
`node_modules/.ignored_internet-object` without a word. That happened here, and the playground ran a
two-week-old library until an error code gave it away.

The alias lives in `vite.config.ts`: committed, identical on every machine, and an install cannot
undo it. It also excludes the library from `optimizeDeps`, so vite stops caching it.

</details>

## Development

| Script | Purpose |
| ------ | ------- |
| `pnpm dev` | Start the dev server on port 4000 |
| `pnpm build` | Production build into `build/` |
| `pnpm build:check` | Type-check, then build |
| `pnpm preview` | Serve the production build locally |
| `pnpm test` | Run tests in watch mode |
| `pnpm test:run` | Run tests once (CI) |
| `pnpm audit` | Check dependencies for vulnerabilities |
| `pnpm security:audit` | Full security audit |

Built with React 19, TypeScript, MUI, Monaco, and Vite. The playground is versioned by publish date (`YYYYMMDD`), stamped into the build and printed in the browser console.

## Documentation

- **[Accessibility](./docs/ACCESSIBILITY.md)** — WCAG 2.1 AA, keyboard navigation, screen readers
- **[Web Worker](./docs/WEB_WORKER.md)** — how background parsing keeps the editor responsive
- **[Autocomplete](./docs/autocomplete.md)** — how schema-aware completion is built, and why the work is split across threads
- **[Security](./SECURITY-AUDIT.md)** — audit guidelines, and the [quick reference](./SECURITY-QUICK-REF.md)

For the format itself, see the [specification](https://docs.internetobject.org).

## License

Copyright © 2019–2026 ManiarTech® (Maniar Technologies).

The **Internet Object Playground** is licensed under the
[GNU Affero General Public License v3.0](LICENSE) (AGPL-3.0-only).

You are free to use, study, modify, and self-host it. The one condition: if you run a
modified version of the playground and let anyone else use it over a network, you must
make your modified source available to those users under the same license. In short —
host it freely, but give your changes back.

> **Note:** this copyleft applies to the *playground* only. The `internet-object`
> library itself is separately licensed under the permissive
> [Apache License 2.0](https://github.com/maniartech/InternetObject-js), so using
> Internet Object in your own application places no obligations on you — commercial or
> closed-source use is fine, and it carries an explicit patent grant.

*Internet Object* is a trade name and unregistered (common-law) trademark of Maniar
Technologies. The AGPL grants rights to the *code*, not to the name or the logos — so if
you publish a fork or host a modified instance, please give it your own name and
branding.
