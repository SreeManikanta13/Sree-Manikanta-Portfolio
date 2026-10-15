# Sree Manikanta — portfolio & product showcase

A product-focused portfolio built with Next.js App Router, React, strict TypeScript, Tailwind CSS, and Recharts. Includes professional experience, eight structured case studies, a fictional investment dashboard, and an interactive component/localization lab.

## Run locally

Requires Node.js 22 and npm. No API keys, database, accounts, or external backend are required.

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

```sh
npm run build
npm start
```

Deploy to a host supporting Next.js and Node.js (for example, Vercel), using `npm run build`. This is not configured as a static GitHub Pages export.

## Routes and structure

- `/`: professional introduction, about, expandable experience timeline, featured work, engineering workflow, skills, and contact.
- `/projects`: searchable, category-filtered case studies.
- `/projects/[slug]`: statically generated, structured case-study pages.
- `/fintech`: fictional portfolio performance, allocation, holdings, and transactions.
- `/lab`: shared component states, validated fictional workflows, and localization examples.

Important files:

| Area                                                  | Files                            |
| ----------------------------------------------------- | -------------------------------- |
| Central profile, links, and navigation                | `src/data/profile.ts`            |
| Experience, skills, and workflow                      | `src/data/experience.ts`         |
| Case-study content                                    | `src/data/projects.ts`           |
| Financial snapshot and typed fictional data           | `src/data/financial.ts`          |
| Portfolio calculations and filters                    | `src/lib/portfolio.ts`           |
| Locale-aware formatting                               | `src/lib/format.ts`              |
| Shared buttons, metrics, dialog, tooltip, empty state | `src/components/ui.tsx`          |
| Dashboard and chart components                        | `src/components/dashboard/`      |
| Component lab and fictional transaction validation    | `src/components/lab/`            |
| Design tokens, responsive styles, reduced motion      | `src/app/globals.css`            |
| Page metadata, shared navigation and footer           | `src/app/layout.tsx`             |
| Focused unit and browser tests                        | `tests/`, `playwright.config.ts` |
| Automated checks                                      | `.github/workflows/quality.yml`  |

Server components render the professional content and route metadata. Client components own local interactive state. No unnecessary global store or backend service is used. Fonts are system fonts, so builds do not depend on a font CDN.

## Updating content

1. **Profile:** edit `src/data/profile.ts` for contact details and destinations. `siteUrl` stays `null` until the site is deployed.
2. **Resume:** the published PDF is `public/Sree-Manikanta-Resume.pdf` (`resumePath`). Replace that file to update it, and check it contains only information you intend to publish.
3. **LinkedIn:** `linkedInUrl` is shown in the contact section. Set it to `null` to hide the link.
4. **SEO:** set `siteUrl` to the actual deployment origin to configure the metadata base. Update title, description, Open Graph, and Twitter metadata in `src/app/layout.tsx` as needed.
5. **Experience:** edit the typed content in `src/data/experience.ts`. Professional tools remain separate from tools newly demonstrated in this portfolio.
6. **Case studies:** edit `src/data/projects.ts`; each case includes context, role, approach, decisions, trade-offs, outcome, technologies, and an optional demo link. New slugs become generated routes.
7. **Financial demo:** edit `src/data/financial.ts` and keep snapshot values, units, price histories, and transaction amounts consistent with `src/lib/portfolio.ts`. Dashboard filters affect holdings; selected ranges affect portfolio history and period metrics. See the on-screen scope notes.
8. **Lab examples:** edit `src/components/lab/`. Inputs are local demonstrations, not submitted transactions or connected financial accounts.

## Honesty and privacy boundaries

All investment data is original and fictional, using a fixed historical snapshot—not live quotes, investment advice, real accounts, or employer/customer data. Currency switches format the **same nominal amount**; they do not perform exchange-rate conversion.

Professional content uses only the supplied profile. There are no invented metrics, testimonials, personal photos, team sizes, or migration durations. Transaction/bulk-operation and KYC responsibilities were not substantiated in the supplied experience: those case studies explicitly mark missing verification. The workflow and new React architecture are illustrative, not confidential production implementations. AI-assisted checks support human review; they do not guarantee correctness.

Still needed from the owner:

- Final deployment URL for metadata base configuration.
- Verified transaction/bulk-operation and KYC/onboarding details, if those employment case studies should be expanded.
- Optional real profile photo and any additional verified project details.

## Quality checks

```sh
npm run lint
npm run typecheck
npm run format:check
npm run build
npx playwright install --with-deps chromium
npm run test:unit
npm run test:e2e
npm test
npm audit
```

`npm run format` applies formatting. Playwright starts a server automatically: a development server locally (reusing one if already running) and the production build (`npm start`, after `npm run build`) in CI. Test reports, browser downloads, and build output must not be committed. Tests cover formatting/content invariants, navigation, project exploration, dashboard interactions, and component workflows.

The lint configuration uses TypeScript, React Hooks, and JSX accessibility rules. The scaffold's Next-specific ESLint preset was replaced because its transitive globbing dependency had an unpatched advisory at implementation time. The application runtime remains Next.js.

Accessibility includes semantic headings and tables, explicit control labels, a skip link, visible focus states, keyboard-friendly native dialogs, chart data alternatives, responsive navigation, and reduced-motion support.
