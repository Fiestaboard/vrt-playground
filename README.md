# VRT Playground

A hands-on playground for [`fiestaboard/visual-regression-action`](https://github.com/Fiestaboard/visual-regression-action): a fake "Fiesta Mission Control" dashboard (three static pages), a Playwright script that captures 6 screenshots (3 pages × desktop + mobile), and the full artifact-baseline VRT flow — no screenshots committed to git.

## Try the whole loop

1. **Open the demo PR** (or make your own — see below). Its `Visual tests` check is red because it intentionally changes the accent color, adds a page, and deletes one.
2. On the PR, find the **sticky comment** posted by the action → click **Download the full visual report**.
3. Unzip, open `index.html`. Hit **Review changes** and step through with **← →**. Try the **Swipe** (`S`), **Overlay** (`O`), and **Side-by-side** (`D`) views; scroll to zoom, drag to pan.
4. Press **`A`** to approve / **`R`** to reject each change. The command bar at the bottom builds a `/vrt approve …` command as you go.
5. **Copy it, paste it as a PR comment.** The `VRT approvals` workflow reruns the failed check automatically (watch for the 🚀 reaction), and the check goes green.
6. Merge — main rebuilds and publishes the new baseline. Done. No baseline files, no "update snapshots" commit.

## Make your own visual change

```bash
git checkout -b my-change
# edit site/styles.css (try --accent), add/delete a site/*.html page, tweak copy…
git commit -am "try a visual change" && git push -u origin my-change
gh pr create --fill
```

Any `site/*.html` page is captured automatically, so adding a page shows up as ✨ added and deleting one as 🗑️ removed.

## Run capture locally

```bash
npm install
npx playwright install chromium
npm run capture   # writes screenshots/ (gitignored)
```

## How it's wired

- [`.github/workflows/vrt.yml`](.github/workflows/vrt.yml) — pushes to `main` publish the `vrt-baseline` artifact; PRs compare against it and report (sticky comment + step summary + downloadable HTML report).
- [`.github/workflows/vrt-approvals.yml`](.github/workflows/vrt-approvals.yml) — `/vrt approve …` PR comments from maintainers rerun the failed check so approvals take effect with zero clicks.
