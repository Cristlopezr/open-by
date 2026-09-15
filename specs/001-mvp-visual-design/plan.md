# Implementation Plan: OpenBy MVP Visual Design

**Branch**: `001-mvp-visual-design` | **Date**: 2026-09-15 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `specs/001-mvp-visual-design/spec.md`

## Summary

Build the finished visual identity and six inspectable mobile screens inside the existing Expo
application. Home will show a small horizontal carousel of expiring-soon products above a searchable,
filterable table of the complete inventory. Products and visual-state examples remain hard-coded in
the mobile app; the table uses those examples and introduces no table dependency at this stage.
Expo Router provides the existing navigation, while the app and navigator share the effective light
or dark theme, including the background exposed during transitions. Development preview controls
leave the screens, but their visual-state examples remain in code. No production scanner, backend,
persistence, expiration calculation, notification, account, or synchronization behavior is added.

## Technical Context

**Language/Version**: TypeScript 6.0.3 with React 19.2.3 and React Native 0.86.3

**Primary Dependencies**: Existing Expo SDK 57.0.22, Expo Router 57.0.21, React Native, Expo Font
57.0.4, Expo Symbols 57.0.3, `expo-system-ui` 57.0.4, and `@expo-google-fonts/manrope`; no table
library is selected or added in this stage

**Storage**: N/A; representative product and visual-state data remain hard-coded in mobile fixtures;
search, filters, and theme choice are session-local UI state and are not persisted

**Testing**: No automated tests for this feature; project-owner manual inspection only. Linting and
TypeScript checking remain required code-quality checks and are not test execution.

**Target Platform**: Android and iOS mobile portrait layouts through Expo; Expo web may be used as a
convenient narrow-viewport review surface but is not a separate acceptance target

**Project Type**: Mobile application within the existing pnpm monorepo

**Performance Goals**: Search and filters update the hard-coded table without a blocking step, and
the inventory remains readable and scrollable when it extends beyond one portrait screen; no fixed
product count or production benchmark is imposed

**Constraints**: Six screens; representative products and simulated product journeys; local Home
search and filters; device-responsive System theme; light and dark palettes; theme-matched transition
background; Manrope typography; 48-point minimum controls; 56-point primary actions; 8-point layout
grid; no gradients; no on-screen development preview controls; no persistence

**Scale/Scope**: Six product screens, a carousel and table on Home, retained deterministic visual
variants, and two complete palettes; inventory size has no fixed acceptance count

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-checked after Phase 1 design.*

| Principle or gate | Pre-design result | Plan response |
|---|---|---|
| I. Local-First Personal Data | Pass | Hard-coded products and session-local search, filter, and theme choices remain in the mobile workspace and are neither persisted nor transmitted. |
| II. Scan-First Interaction | Pass | Home gives Scan the central, direct action and the visual flow includes recoverable scanner states. |
| III. Trusted Catalog Boundaries | Pass | Trusted and unverified fixtures use explicit, distinct provenance presentation; no catalog writes exist. |
| IV. Deterministic Expiration and Notification Integrity | Pass for visual scope | Dates and reminders are internally consistent representative values; unknown lifetime never receives an invented expiration. No calculation or scheduling is implemented. |
| V. Explicit System Boundaries | Pass | All work stays in `apps/mobile`; device appearance is read locally, and no backend, API, database, or cross-workspace behavior is introduced. |
| Automated verification gate | Exception documented | The specification explicitly prohibits automated tests for this stage, including its local UI interactions. See **Automated-test exception** below. |
| Dependency restraint | Pass | Existing Expo and React Native packages are reused; no table library or new package is introduced for this revision. |

### Automated-test exception

This feature retains the specification's exception to the constitution's automated-test completion
rule. It contains visual identity, hard-coded representative data, simulated product journeys, and
limited session-local Home search/filter and appearance behavior. The project owner requires
exclusive manual validation and prohibits unit, integration, E2E, snapshot, and UI tests for this
stage; that exception now also covers the added local interactions and theme response.

The accepted risks are undetected visual regressions, incorrect search/filter results, inconsistent
representative combinations, missed light/dark variants, a theme mismatch when System changes,
transition background flashes, broken simulated navigation, and reviewer subjectivity. Manual owner
review must cover inventories extending beyond one screen, combined search and filters, light/dark
device changes while System is selected, and push/pop transitions in each effective theme, as well
as the existing trust and recovery states. Formatting, linting, and type checking remain required;
no test command or test file will be added.

## Project Structure

### Documentation (this feature)

```text
specs/001-mvp-visual-design/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── visual-state-contract.md
├── checklists/
│   └── requirements.md
└── tasks.md                       # Existing implementation tasks; update after plan alignment
```

### Source Code (repository root)

```text
apps/mobile/
├── assets/
│   └── images/                    # Existing assets; add only justified visual assets
├── src/
│   ├── app/
│   │   ├── _layout.tsx            # Root stack, font loading, shared visual theme
│   │   ├── index.tsx              # Home
│   │   ├── scanner.tsx
│   │   ├── confirm-opening.tsx
│   │   ├── product-details.tsx
│   │   ├── report-unknown.tsx
│   │   └── preferences.tsx
│   ├── components/
│   │   ├── navigation/            # Shared bottom navigation and screen headers
│   │   ├── home/                  # Expiring-soon carousel, table, search, filters, no-results
│   │   ├── product/               # Product status, trust, reminder and details displays
│   │   └── ui/                    # Buttons, cards, fields, notices, dialogs, icons
│   ├── features/
│   │   └── mvp-visual/
│   │       ├── fixtures.ts        # Hard-coded products and retained screen variants
│   │       ├── state.ts           # Session-local UI choices and simulated journeys
│   │       └── types.ts           # Display-only fixture and state types
│   └── theme/
│       ├── ThemeProvider.tsx      # Light/dark/System choice and effective device theme
│       ├── tokens.ts              # Color, spacing, radius, typography, elevation
│       └── typography.ts          # Manrope family and weight mapping
├── app.json
└── package.json
```

**Structure Decision**: Implement only in the existing `apps/mobile` workspace. Keep route files
focused on screen composition, reusable visual elements under `src/components`, hard-coded data and
retained variants under one feature fixture module, and design tokens under `src/theme`. Remove the
preview selector from all route compositions; its display controls are not part of the planned
screen structure. Do not create backend, storage, service, or test modules for this feature.

## Implementation Approach

### Home inventory

- Replace Home's full-size product-card list with a compact table composed from the app's existing
  React Native primitives. Define readable mobile columns for product identity, semantic status,
  and remaining or elapsed time; a selected entry opens Product Details, where exact expiration and
  reminder information remain available. Pass the selected fixture identity to Product Details so
  its content corresponds to the entry or carousel item selected. Do not add or select a dedicated
  table library now.
- Keep representative products hard-coded in `fixtures.ts`. Add the category text needed for search
  and a Home example that extends beyond one portrait screen. Derive the table from these fixtures;
  do not add inventory persistence or production expiration calculations.
- Place a small horizontally scrollable carousel of expiring-soon products above the complete table
  area, including its search and filters. The carousel is derived from the same fixture collection,
  ordered by urgency within the soon status, and opens the corresponding Product Details. Hide it
  when no products are soon. The carousel continues to highlight soon products independently of the
  table's current search or filter, so it remains an overview of attention-needed items.
- Implement partial, case-insensitive search over product name, brand, and category and combine it
  with All, Soon, and Expired status filters for the table. Preserve urgency order in every result.
  Distinguish an empty inventory from a table with no search/filter matches. Keep search, filters,
  the carousel, and the bottom Scan action accessible while the table scrolls.

### Visual states and appearance

- Remove `PreviewStateSelector` from each route and all visible preview labels and controls. Retain
  the existing fixture/state definitions and visual variants; this stage does not require a new
  in-app route or selector for direct access to every variant.
- Set `userInterfaceStyle` to `automatic` in `app.json`; `expo-system-ui` is already installed for
  Android support. Resolve the effective palette from an explicit Light or Dark choice, or from the
  current device appearance when System is selected. Listen for device changes during the session;
  do not persist the choice. Feed the effective palette to all six screens and the status bar.
- Apply the same effective background token to Expo Router's navigation theme, the `Stack` scene
  `contentStyle`, and the native root view background. Keep the warm light background in Light mode
  and the defined dark background in Dark mode; avoid a fixed white or dark transition layer. Review
  both push and pop animations on Android and iOS in Light, Dark, and System after a device-theme
  change. Expo documents the [Stack background flash](https://docs.expo.dev/router/advanced/stack/),
  [automatic color themes](https://docs.expo.dev/develop/user-interface/color-themes/), and the
  [SDK 57 root-view background API](https://docs.expo.dev/versions/v57.0.0/sdk/system-ui/).

## Phase 0: Research Outcomes

[research.md](./research.md) now records the Home table/carousel, retained visual-state examples
without on-screen selectors, responsive System appearance, and theme-matched navigation background.
The dedicated table-library choice is intentionally deferred; hard-coded data and existing UI
primitives are sufficient for this stage, so it does not block the plan.

## Phase 1: Design Outcomes

- [data-model.md](./data-model.md) defines display-only fixture shapes and visual-state transitions;
  it is not a persistence or domain schema. It now includes Home search/filter derivation, the
  independent carousel, selected fixture identity, and effective-System rules.
- [visual-state-contract.md](./contracts/visual-state-contract.md) maps routes, required variants,
  Home table/carousel behavior, appearance and transition backgrounds. No API contract is needed.
- [quickstart.md](./quickstart.md) defines lint/type checks and the project-owner manual review
  flow, including Home search/filters, System response, and transition backgrounds without in-app
  preview selectors.

### Post-design Constitution Check

The revised design still passes Principles I–IV and the system-boundary portion of Principle V:
products remain representative and local to the mobile UI, provenance remains explicit, unknown
lifetime is never shown as a trusted expiration, and no backend boundary is crossed. The documented
automated-test exception now also covers local Home search/filter and device-responsive appearance.
The research, display model, visual contract, and manual guide are aligned with this revised plan.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|---|---|---|
| Automated tests are omitted despite the normal completion gate | The approved scope uses hard-coded products, simulated journeys, local search/filter, and device-responsive appearance while explicitly requiring owner-only manual validation | Adding any unit, integration, E2E, snapshot, or UI test would directly violate VAL-001 and VAL-002 |
