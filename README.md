# Weather App

Modernized weather app prototype using:

- Vue 3 + TypeScript
- Vite
- Tailwind CSS v4
- ESLint
- Prettier

## Scripts

- `npm run dev` – start dev server
- `npm run build` – production build
- `npm run preview` – preview production build
- `npm run lint` – run ESLint
- `npm run lint:fix` – auto-fix ESLint issues
- `npm run type-check` – strict TypeScript project check via vue-tsc

## Structure

```
index.html        # Vue mount point
src/main.ts       # App bootstrap
src/App.vue       # Root component
src/styles.css    # global styling, making use of tailwind design tokens
src/api/client.ts # axios instance (agnostic)
.env.sample       # example environment variables
```

## Design Tokens

Defined in `src/styles.css` under `@theme`: colors, radii, spacing, fonts, container widths.

## Formatting & Linting

- Prettier config at `prettier.config.js`
- ESLint config `eslint.config.js`

## Environment Configuration

Environment variables follow Vite's `import.meta.env` convention. Only checked-in example is `.env.sample` (safe to commit). Runtime private values belong in local (ignored) env files.

Variables used:

- `VITE_WEATHERAPI_KEY` – WeatherAPI key (client-exposed; treat with care)

`.env.local` is for local development only and is **git ignored**. Use platform-specific secrets in production deploys.

## Development

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create your local env file (dev only):
   ```bash
   cp .env.sample .env.local
   # edit .env.local and set
   # VITE_WEATHERAPI_KEY=YOUR_REAL_KEY
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```
4. Open the printed local URL (default: http://localhost:5173).

Access the key in code (once wired) via:

```ts
import.meta.env.VITE_WEATHERAPI_KEY;
```

For production: configure the variable in your hosting provider's environment (do not commit `.env.local`).
