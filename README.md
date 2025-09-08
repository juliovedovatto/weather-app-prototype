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
```

## Design Tokens

Defined in `src/styles.css` under `@theme`: colors, radii, spacing, fonts, container widths.

## Formatting & Linting

- Prettier config at `prettier.config.js`
- ESLint config `eslint.config.js`

## Development

Install dependencies and start dev server:

```bash
npm install
npm run dev
```

Open the printed local URL (default: http://localhost:5173).
