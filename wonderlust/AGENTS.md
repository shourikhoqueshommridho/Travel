# Commands

- `npm run dev` — dev server (Turbopack). `npm run build` / `npm start` for prod build/serve.
- `npm run lint` — bare `eslint` over the repo (flat config in `eslint.config.mjs`). No tests exist; verify changes with `lint` + `npm run build`.
- Path alias: `@/*` → `./src/*`.

# Stack quirks (verified, not defaults)

- **Next.js 16.4.3 with `cacheComponents` + `partialPrefetching` + `reactCompiler` enabled** in `next.config.ts`. Consequences:
  - Uncached data access outside `<Suspense>` is a **build error** under Cache Components.
  - Legacy route segment config (`dynamic`, `dynamicParams`, `revalidate`, `fetchCache`, `runtime`) is unsupported/ignored — don't add it.
  - React Compiler is on: don't add manual `memo`/`useMemo`/`useCallback` unless needed outside render optimization, and never violate the Rules of Hooks (compiler assumes they hold).
- **Tailwind v4, CSS-first**: no tailwind config file; theme lives in `src/app/globals.css` (`@import "tailwindcss"` etc.). Tailwind compiles via the `turbopack.rules` entry in `next.config.ts`, not PostCSS.
- **shadcn/ui is the `base-nova` style — primitives come from `@base-ui/react`, NOT Radix.** Check existing imports in `src/components/ui/*` before assuming standard shadcn: e.g. `import { Button as ButtonPrimitive } from "@base-ui/react/button"`.
- `cn()` is re-exported from the `cn` npm package in `src/lib/utils.ts` (not clsx + tailwind-merge).
- Routing uses typed routes: layout props are `LayoutProps<"/">`, route params are typed. `next dev` regenerates types into `.next/dev/types` (already in `tsconfig.include`).
- Windows machine; most examples in shell docs use bash syntax — adapt for PowerShell or use bundled tooling.

# Structure

- App Router only: `src/app/` (routes), custom section components in `src/components/` (e.g. `Hero`, `Search`), generated shadcn components in `src/components/ui/` (don't hand-edit; regenerate via shadcn CLI using `components.json`).
- Static images live in `public/img/` (Banner, CTA, destination images image1–6, testimonial persons).
- No database/API layer yet — destination data currently has no source of truth.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
