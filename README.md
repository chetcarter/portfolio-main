# Portfolio

Personal portfolio site for Chet Carter, built with Next.js and deployed on Vercel.

**Live:** [chetcarter.com](https://chetcarter.com)

## Stack

- **[Next.js 14](https://nextjs.org/)** (App Router) with **TypeScript**
- **[Tailwind CSS](https://tailwindcss.com/)** for styling
- **[Framer Motion](https://www.framer.com/motion/)** for animation
- **[Three.js](https://threejs.org/)** via [react-three-fiber](https://docs.pmnd.rs/react-three-fiber) and [drei](https://github.com/pmndrs/drei) — the interactive globe
- **[Lottie](https://lottiereact.com/)** for vector animations
- **[Sentry](https://sentry.io/)** for error monitoring

## Getting started

Requires Node 20 (the version CI builds against).

```bash
npm install
npm run dev
```

The dev server runs at [localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run deploy` | Deploy to Vercel production |

## Structure

```
app/           Next.js App Router entry, layout, and global styles
components/    Page sections (Hero, Grid, RecentProjects, …)
components/ui/ Reusable primitives
data/          Site content and Lottie animation JSON
lib/          Shared utilities
public/       Static assets
```

Page sections compose in [`app/page.tsx`](app/page.tsx); most copy, project entries, and links live in [`data/index.ts`](data/index.ts).

## CI

Every push and pull request to `main` runs lint, typecheck, and build in parallel via [GitHub Actions](.github/workflows/ci.yml). A single aggregate `ci` check gates merges, so `main` requires a green build, linear history, and a squash merge.

## License

Source code is [MIT licensed](LICENSE). Site content — copy, images, and personal likenesses — is © Chet Carter, all rights reserved. Feel free to reuse the code; please swap in your own content.
