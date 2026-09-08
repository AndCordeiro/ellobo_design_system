# Changesets

This folder is managed by [Changesets](https://github.com/changesets/changesets).

- Run `npm run changeset` to describe a change and pick `patch`, `minor` or `major`.
- Run `npm run version` to apply pending changesets: bumps `package.json`, updates `CHANGELOG.md`
  and regenerates `src/version.ts`.
- Versioning never publishes. Releases happen through the `release.yml` workflow after the
  Version PR is merged into `main`.
