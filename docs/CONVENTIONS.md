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
- Boolean state / predicate naming: prefix with `is`, `has`, `can`, `should`, `did`, `was`, `are` (arrays/plural), or `will` depending on tense/intent. Examples: `isLoading`, `hasError`, `canShowResults`, `shouldRetry`, `didFetch`, `wasCancelled`, `areItemsSelected`. Avoid generic `flag`, `ok`, `done`, or negated names (`isNotReady`)—invert logic instead (`isReady`). Predicate helpers use same prefixes: `isSelectedItem(item)`, `canRenderFooter(state)`. Never omit the prefix (avoid `loading = true`).

## 3. Vue Components

- Use `<script setup lang="ts">` everywhere.
- Order inside `<script setup>` (top → bottom):
  1. `defineProps` / props interface (types then call)
  2. `defineEmits`
  3. Hardcoded constants (pure, no reactive dependency) / enum-like maps
  4. Composable calls (e.g. query hooks, router, i18n) that do not depend on later refs
  5. Refs / reactive state (`ref`, `reactive`)
  6. Computed properties
  7. Watchers (`watch`, then `watchEffect` if any)
  8. Functions (helpers, event handlers, predicates) using `function name()` form
  9. Lifecycle hooks (all `onBeforeMount`, `onMounted`, `onUnmounted`, etc.)
- Optional props MUST declare explicit defaults via `withDefaults` wrapping `defineProps` (never rely on `prop ?? 'fallback'` all over the template). Example:
  ```ts
  const props = withDefaults(defineProps<{ size?: 'sm' | 'md'; label?: string }>(), {
    size: 'md',
    label: '',
  });
  ```
  This centralizes defaults, improves type inference (props.size always non-optional), and avoids scattered fallback logic.
- Rationale: deterministic scan path; top has contract + static data, bottom wires lifecycle.
- Import ordering:
  1. Node / external packages
  2. Aliased internal modules (`@/...`)
  3. Relative imports
  4. Blank line between groups; type-only imports first in a group.
- Import path strategy: use the `@/` alias whenever the target module is outside (above) the current file's directory; only use relative paths for siblings or descendants (avoid `../../..`).
- Lifecycle hooks placement:
  - Place ALL lifecycle hooks (`onBeforeMount`, `onMounted`, `onUnmounted`, etc.) at the very end of the `<script setup>` block after: state refs → computed → watchers → helpers / event handlers.
  - Rationale: reduces churn when adding logic, keeps a predictable scan order (top: dependencies, bottom: framework wiring).
  - If initial synchronous state must exist for first render, prefer either an inline initializer or `onBeforeMount` still placed at the bottom (not interleaved mid-file).
  - Avoid scattering hooks among logic sections.
- Function declarations: prefer `function doSomething()` over `const doSomething = () => {}` for component helpers/handlers to leverage hoisting (readability + order flexibility). Arrow/const functions allowed only when capturing lexical `this` (rare in `<script setup>`), creating immediately-invoked factories, or when typing generics is clearer with a const.
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

## 7. Unit Testing

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

## E2E Testing

- Location: all E2E specs live under `tests/e2e/`
- Naming: `<feature>.test.ts` (e.g. `home.test.ts`, `city-search.test.ts` if split later)
- One primary user flow per file (add additional tests in the same file when flows share setup)
- Prefer explicit `data-test` attributes for stable selectors (avoid brittle CSS/text selectors)
- Keep assertions focused on observable behavior (DOM + network patterns)
- Avoid conditional logic in tests (lint enforced via `eslint-plugin-playwright`)

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
