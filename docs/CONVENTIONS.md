# Project Conventions

A concise reference of agreed conventions for code, tests, structure, and workflow.

## 1. Directory & Separation of Concerns (SoC)

- `src/components/`: Reusable or feature UI components only (no global config/constants).
- `src/config/`: Static, domain-oriented configuration objects (barrel exported via `index.ts`).
- `src/models/`: Shared TypeScript domain & view model types (e.g. `TabItem`).
- `src/queries/`: Data-fetching hooks (TanStack Query definitions & query key logic).
- `src/utils/`: Pure, framework-agnostic helpers (date, formatting, mapping, color).
- `src/api/`: HTTP clients / adapters (axios instance, request helpers).
- Tests colocated: `Something.ts` → `Something.spec.ts` beside it.
- Keep config & model imports shallow (`@/config`, `@/models/*`).

## 2. Naming

- Prefer explicit, semantic function names (e.g. `convertToTimezone` vs `toZoned`).
- Past-tense renames: `unixSecondsToDate` → `unixTimeToDate` (avoid ambiguous units).
- Component props use natural, explicit names (`locationName`, `loading`).
- Emits follow `update:propName` pattern for v-model compatibility.
- Types/interfaces: Domain-focused (`TabItem`, `WeatherCondition`).
- Avoid abbreviations unless industry-standard (e.g. `tz` avoided → `timezone`).

## 3. Vue Components

- Use `<script setup lang="ts">` everywhere.
- Import ordering:
  1. Node / external packages
  2. Aliased internal modules (`@/...`)
  3. Relative imports
  4. Blank line between groups; type-only imports first in a group.
- Import path strategy: use the `@/` alias whenever the target module is outside (above) the current file's directory; only use relative paths for siblings or descendants (avoid `../../..`).
- Keep lifecycle hooks (e.g. `onMounted`) after reactive/computed definitions.
- Use computed properties for derivations; watchers only for side-effects.
- Inline editable patterns (e.g. `UserName`):
  - Activate edit mode automatically if initial value empty.
  - Stay in edit mode on blank commit (trim & guard before emit).
  - Escape key cancels (restores display mode, no emit).
  - Commit on blur or Enter.
  - Accessibility: `role="button"`, `tabindex`, `aria-label`, keyboard Enter/Space triggers.
- Event naming:
  - Templates use kebab-case (`@tab-selected`) while `defineEmits` can use camelCase (`tabSelected`) – Vue normalizes.
  - Use `update:propName` only for v-model style prop sync.
  - Prefer specific, intent-focused names over generic `change` (`tabSelected`, `refreshRequested`).
  - Imperative present-tense for user-triggered actions (`refreshRequested`, `retry`); result/state events only when needed (`loaded`, `failed`).
  - No `on` prefix on emitted event names (consumer already uses `@`).
  - Consumer-side handler function names DO use `on` prefix for clarity (`onTabSelected`, `onRefreshRequested`).
  - Single payload argument; if multiple data points needed wrap in an object for forward-compatible extension.
- Conditional rendering: prefer `v-if` / small `<template>` blocks over cascaded ternaries in templates.
- Skeleton states: derive a single `showSkeleton` boolean; avoid duplicating loading checks.
- Override logic example: `CurrentWeatherCard` uses `locationName` prop when it differs from API value.

## 4. State & Data

- TanStack Query manages all server-derived data (caching, staleness, refetch, de-dupe).
- Do not introduce Pinia until meaningful non-server global state emerges (preferences, UI layout, theming persistence).
- Keep query filter objects inside computed wrappers for stable references.
- Co-locate query composition with consuming feature when scope is narrow.

## 5. Utilities & Helpers

- Pure, side-effect free.
- Provide wrapper abstractions for 3rd-party libs (e.g. timezone conversion) to isolate external API changes.
- Date utilities include: `convertToTimezone`, `formatHour`, `unixTimeToDate`.
- Add lightweight JSDoc summaries (no redundant `@param` / `@return` when obvious from types).
- Avoid direct library calls in components when a utility already exists.

## 6. Styling & Design Tokens

- Tailwind CSS v4 with custom tokens (`@theme`) for colors, radii, spacing, etc.
- Prefer semantic color utilities (e.g. mapping temperature → token via helper) over hard-coded hex values.
- Safelist / explicit generation strategy for dynamic background classes.
- Keep class lists intentional, grouped by role (layout | spacing | typography | color | state).

## 7. Testing

- Framework: Vitest + `@vue/test-utils` + `jsdom` environment.
- Config lives inside `vite.config.ts` (no standalone `vitest.config.ts`).
- File co-location: `Name.spec.ts` beside implementation (`ComponentName.vue` / `utility.ts`).
- Naming: `ComponentName.spec.ts`, `utilityName.spec.ts` (camelCase or PascalCase consistent with target).
- Prefer `test()` over `it()`. Use `describe()` only for logically grouping a narrow subset of related behaviors.
- Keep helpers minimal; local `setup()` factory when repeated mounting logic exists.
- Avoid noise comments like “Component tests without describe wrapper per convention”.
- Use `nextTick()` when asserting post-mount reactive effects (e.g. auto-focus / auto-edit logic).
- Assertions: guard optional arrays from `wrapper.emitted()` before indexing (`events?.[0]?.[0]`).
- Test coverage focus progression: utilities → isolated components → interaction/integration (planned) → E2E (planned).

## 8. Accessibility

- Interactive non-native elements (e.g. `<span>` acting as button) must include `role="button"`, `tabindex="0"`, `aria-*` labels, and keyboard event handlers (Enter/Space).
- Truncation + accessible names: prefer visible labels; avoid relying solely on `title` attributes.

## 9. Linting & Formatting

- ESLint + Prettier: trust auto-fixes; keep code minimal after format.
- Always wrap single-line `if` / `else` bodies in braces (style consistency & future diff safety).
- Maintain blank lines between import groups and before export blocks when logical sections change.

## 10. Commit Messages

- Concise, generic, max ~100 characters (e.g. `test: add component tests`, `docs: update README structure`).
- Separate environment/test infra setup from actual spec additions.
- Use conventional prefixes: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `build:`.

## 11. Error & Feedback (Planned)

- Centralized error handling layer (query error boundaries / fallback UI).
- Toast / notification component for user-friendly transient messages (especially network issues or stale refresh events).

## 12. Asset Strategy (Planned)

- Migrate to local curated weather icons (`public/images`) for consistency, performance, and offline resilience (replacing remote API icons) once mapping table is defined.

## 13. Future Testing Roadmap

- Integration tests for cross-component behavior (timeline + forecast + selection state).
- E2E (Playwright) for core flows: city switch, loading transitions, error recovery.
- API mocking with `msw` for deterministic network scenarios & fixtures.
- Coverage thresholds introduced after broader suite maturity.

## 14. When Adding New Code Checklist

- Does it belong in `config`, `models`, or `utils` instead of a component?
- Is there an existing helper (avoid duplicate logic)?
- Are props/events named consistently (`update:x` pattern)?
- Is accessibility handled for any interactive element?
- Are tests colocated & using `test()` with minimal helpers?
- Are imports ordered & grouped correctly?

---

Keep this document lean—update only when a convention is adopted or revised.
