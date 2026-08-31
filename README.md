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

### Working on the library at the same time

The playground reads the [`internet-object`](https://github.com/maniartech/InternetObject-js)
library from a **sibling checkout** while the dev server is running. Edit the library, reload the
page — that is the whole loop. No rebuild, no re-install, no link.

`pnpm dev` prints which library it is using at startup:

```
internet-object: ../io-js2/src  (live source — no build step needed)
```

`../io-js2` and `../InternetObject-js` are both found automatically; set `IO_LOCAL_PATH` for any
other layout, or `IO_LOCAL=0` to use the installed package instead.

> **`pnpm build` deliberately does not do this.** A production build resolves the real dependency,
> because it has to exercise what a user actually installs. So `dist` correctness is still checked
> against the published package, never against your working tree.

<details>
<summary>Why it works this way</summary>

`internet-object` is declared as `file:../io-js2`, and pnpm **copies** a `file:` dependency into its
store rather than linking it — the copy is a snapshot taken at install time. Vite then pre-bundles
that copy into `node_modules/.vite/deps`. So a rebuild of the library reached the playground through
neither path, and `tsup --watch` writes to a directory the playground never reads.

A hand-made link solves it until the next install silently displaces it (look for
`node_modules/.ignored_internet-object` — that is what a displaced link looks like). The dev alias
lives in `vite.config.ts` instead: committed, shared by every machine, and an install cannot undo it.

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
