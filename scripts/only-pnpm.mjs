#!/usr/bin/env node
/**
 * This project uses **pnpm**. Refuse any other package manager.
 *
 * Not pedantry. Until 2026-08-31 this repository carried FOUR committed lockfiles — `bun.lock`,
 * `package-lock.json`, `pnpm-lock.yaml` and `yarn.lock` — all written on the same day, because
 * different machines reached for different tools. They resolve differently, and each one's install
 * undoes the last.
 *
 * That is not a tidiness problem; it cost real debugging time. An install from a second package
 * manager displaced a hand-made link to the local `internet-object` library, renaming it to
 * `node_modules/.ignored_internet-object` without a word, and the playground then ran a copy of the
 * library that was a fortnight stale. The symptom was a sample document quietly reporting fewer
 * errors than it should.
 *
 * `packageManager` in package.json tells corepack which one to use. This tells a human, at the
 * moment they would otherwise create the mess.
 */
const agent = process.env.npm_config_user_agent ?? '';

// Set by CI images, container builds, and `pnpm install --ignore-scripts`. An escape hatch that has
// to be typed is enough; the point is to stop the accident, not to win an argument.
if (process.env.IO_ALLOW_ANY_PM === '1') process.exit(0);

if (!agent.startsWith('pnpm')) {
  const used = agent.split('/')[0] || 'that package manager';
  console.error(`
  ✗ This project uses pnpm, and you ran ${used}.

    Installing with anything else rewrites node_modules in a way pnpm does not expect. It has
    silently displaced the local library link here before, and the playground then ran a stale
    copy for two weeks.

      corepack enable
      pnpm install

    Set IO_ALLOW_ANY_PM=1 if you genuinely need to override this.
`);
  process.exit(1);
}
