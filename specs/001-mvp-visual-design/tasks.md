# Tasks: OpenBy MVP Visual Design

**Input**: Design documents from `specs/001-mvp-visual-design/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`,
`contracts/visual-state-contract.md`, and `quickstart.md`

**Validation**: Project-owner manual inspection only. Do not create unit, integration, E2E,
snapshot, or UI tests for this feature.

**Organization**: Tasks are grouped by user story so each visual increment can be implemented and
reviewed independently.

**Revision status**: Checked tasks T001–T039 record the initial visual draft where completed. Their
preview controls, full-size Home cards, and fixed System behavior are superseded by the unchecked
revision tasks T041 onward. Checked history does not imply acceptance against the revised spec.
T034 is completed in this revision. T036 is intentionally skipped at the project owner's explicit
request for this implementation run; T040 remains exclusive project-owner acceptance.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it targets different files and has no dependency on another
  incomplete task in the same group
- **[Story]**: Maps the task to a user story from `spec.md`

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the existing mobile workspace for the specified visual identity.

- [X] T001 Add `@expo-google-fonts/manrope` with the Expo-compatible installer and update apps/mobile/package.json and pnpm-lock.yaml
- [X] T002 [P] Define the complete light/dark color, spacing, radius, elevation, and control-size tokens in apps/mobile/src/theme/tokens.ts
- [X] T003 [P] Define Manrope 400/500/600/700/800 family mappings in apps/mobile/src/theme/typography.ts
- [X] T004 [P] Define display-only product, status, trust, appearance, reminder, and per-screen preview-state types in apps/mobile/src/features/mvp-visual/types.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Build the shared visual foundation required by all five user stories.

**Critical**: No user-story route should be composed until this phase is complete.

- [X] T005 Create deterministic representative products and complete screen-state fixtures matching data-model.md in apps/mobile/src/features/mvp-visual/fixtures.ts
- [X] T006 Implement the initial explicit light, dark, and fixed System preview state plus Manrope loading in apps/mobile/src/theme/ThemeProvider.tsx; superseded by T044
- [X] T007 [P] Implement rounded cross-platform Expo Symbol mappings and category fallbacks in apps/mobile/src/components/ui/AppIcon.tsx
- [X] T008 [P] Implement shared screen, card, button, field, notice, status, and confirmation primitives with required dimensions in apps/mobile/src/components/ui/VisualPrimitives.tsx
- [X] T009 Implement the initial development-only fixture/theme selector in apps/mobile/src/components/preview/PreviewStateSelector.tsx; remove its route usage in T050, T052, T055, and T057
- [X] T010 Implement reusable Home/Scan/Preferences bottom navigation with an emphasized center Scan action in apps/mobile/src/components/navigation/BottomNavigation.tsx
- [X] T011 Configure the headerless Expo Router stack and shared theme provider without production services in apps/mobile/src/app/_layout.tsx

**Checkpoint**: The initial shared tokens, fixtures, primitives, typography, icons, and routing
shell are ready; revised appearance and navigation backgrounds depend on Phase 9.

---

## Phase 3: User Story 1 — Understand the Opened Inventory (Priority: P1) — MVP

**Goal**: The initial draft presents urgency-first product cards and direct Scan/Preferences
navigation; Phase 10 replaces its Home inventory presentation with the revised table and carousel.

**Independent Manual Review**: Inspect Home with mixed products and the empty variant; confirm the
most urgent product and remaining time dominate, required product details remain readable, and the
three bottom destinations are visually clear.

- [X] T012 [P] [US1] Implement the initial urgency-focused full-size card in apps/mobile/src/components/product/ProductCard.tsx; superseded for Home by T046 and T047
- [X] T013 [P] [US1] Implement the opened-container illustration, required copy, and first-scan action in apps/mobile/src/components/product/EmptyInventoryState.tsx
- [X] T014 [US1] Compose the initial Home summary, visual filters, product cards, and bottom navigation in apps/mobile/src/app/index.tsx; replace its inventory area in T050
- [X] T015 [US1] Prepare all Home variants for project-owner inspection using section 2 of specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: The initial User Story 1 draft is inspectable; revised Home acceptance depends on
Phase 10.

---

## Phase 4: User Story 2 — Scan and Confirm an Opening (Priority: P1)

**Goal**: Present the complete scan-first visual journey, recoverable scanner failures, known and
unknown lifetime confirmation, and the scoped loading/success states for scanning and adding.

**Independent Manual Review**: Follow the reachable simulated Home → Scanner → Confirm Opening
path and confirm all scanner and confirmation variants remain defined without requiring an in-app
preview selector for direct access to each one.

- [X] T016 [P] [US2] Implement the camera representation, dark overlay, lime reading frame, scan feedback, failure notices, and recovery actions in apps/mobile/src/components/scanner/ScannerVisuals.tsx
- [X] T017 [P] [US2] Implement product summary, trust badge, opening information, lifetime block, reminder section, and fixed actions in apps/mobile/src/components/product/ConfirmOpeningContent.tsx
- [X] T018 [US2] Compose ready, loading, success, permission-denied, unreadable, offline, lookup-failure, and unknown-barcode states in apps/mobile/src/app/scanner.tsx
- [X] T019 [US2] Compose known-lifetime, unknown-lifetime, adding, added, and discard-confirmation states in apps/mobile/src/app/confirm-opening.tsx
- [X] T020 [US2] Connect only the simulated Scanner, Confirm Opening, Report Unknown, cancel, and Home transitions in apps/mobile/src/features/mvp-visual/state.ts
- [X] T021 [US2] Prepare the complete scan/add journey for project-owner inspection using section 3 of specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: User Story 2 is independently inspectable without a camera, network, calculation,
persistence, or notification implementation.

---

## Phase 5: User Story 3 — Review an Opened Product (Priority: P2)

**Goal**: Present product details with dominant expiration status and clearly separated edit,
finish, delete, and confirmation treatments.

**Independent Manual Review**: Inspect reachable Product Details states and confirm fresh, soon,
expired, unknown-lifetime, delete-confirmation, and discard-confirmation variants remain defined
with consistent hierarchy and safety cues.

- [X] T022 [P] [US3] Implement semantic status header, product information cards, lifetime/reminder cards, and separated lifecycle actions in apps/mobile/src/components/product/ProductDetailsContent.tsx
- [X] T023 [US3] Compose all representative Product Details and confirmation variants without mutating fixture data in apps/mobile/src/app/product-details.tsx
- [X] T024 [US3] Prepare all Product Details variants for project-owner inspection using section 4 of specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: User Story 3 is independently inspectable with no real editing or deletion.

---

## Phase 6: User Story 4 — Report an Unknown Product (Priority: P2)

**Goal**: Present a recoverable unknown-barcode form whose unverified provenance remains visible
through ready, loading, and success states.

**Independent Manual Review**: Inspect the reachable report sequence and confirm its barcode,
fields, trust notice, action hierarchy, cancellation path, and retained unverified success state.

- [X] T025 [P] [US4] Implement the unknown-barcode summary, unverified notice, representative fields, and submit/cancel actions in apps/mobile/src/components/product/UnknownProductForm.tsx
- [X] T026 [US4] Compose ready, submitting, and submitted Report Unknown Product variants in apps/mobile/src/app/report-unknown.tsx
- [X] T027 [US4] Connect only the simulated report submission, cancellation, and return-Home transitions in apps/mobile/src/features/mvp-visual/state.ts
- [X] T028 [US4] Prepare all unknown-product variants for project-owner inspection using section 4 of specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: User Story 4 is independently inspectable and never presents submitted data as
trusted.

---

## Phase 7: User Story 5 — Review Preferences (Priority: P3)

**Goal**: The initial draft presents preference cards and notification states; Phase 12 replaces
the fixed System representation with device-responsive appearance.

**Independent Manual Review**: Inspect Light, Dark, and System choices and confirm every section
remains visible; retain notification-allowed and notification-denied variants without an in-app
preview selector.

- [X] T029 [P] [US5] Implement preference cards, appearance choices, permission status, amber recovery notice, privacy copy, and app information in apps/mobile/src/components/preferences/PreferencesContent.tsx
- [X] T030 [US5] Compose all representative preference and notification variants with bottom navigation in apps/mobile/src/app/preferences.tsx
- [X] T031 [US5] Connect the initial explicit Light, Dark, and fixed System choice in apps/mobile/src/theme/ThemeProvider.tsx; superseded by T044 and T053
- [X] T032 [US5] Prepare all Preferences variants for project-owner inspection using section 5 of specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: The initial Preferences draft is inspectable; revised System acceptance depends on
Phases 9 and 12. No persisted preference is required.

---

## Phase 8: Polish and Cross-Cutting Validation

**Purpose**: Finish the initial polish work and carry its remaining branding, lint, and owner
acceptance tasks through the revision phases below.

- [X] T033 Apply light/dark consistency, safe-area handling, long/missing text resilience, scrolling, keyboard avoidance, and portrait layout polish across apps/mobile/src/app and apps/mobile/src/components
- [X] T034 Replace remaining starter splash/icon colors and metadata with the OpenBy visual identity in apps/mobile/app.json and apps/mobile/assets/images after T043
- [X] T035 Audit the initial draft for placeholder UI, camera, network, SQLite, notification, account, synchronization, and device-theme integration under apps/mobile/src; revised System behavior is introduced in T044
- [ ] T036 Run and resolve mobile lint findings with `pnpm --filter @open-by/mobile lint` for apps/mobile; intentionally skipped for this run at the project owner's explicit request
- [X] T037 Run and resolve strict type errors with `pnpm --filter @open-by/mobile exec tsc --noEmit` for apps/mobile/tsconfig.json
- [X] T038 Apply and verify consistent repository formatting across all changed files in apps/mobile
- [X] T039 Reconcile the initial implemented routes and variants against specs/001-mvp-visual-design/contracts/visual-state-contract.md; revised contract coverage is checked in T058
- [ ] T040 Present all six screens and retained required variants for exclusive project-owner manual acceptance using specs/001-mvp-visual-design/quickstart.md after Phases 9–13; direct in-app selection of every variant is not required

---

## Phase 9: Revised Foundation (Blocking Prerequisites)

**Purpose**: Prepare hard-coded product examples, effective appearance, and navigation backgrounds
for the revised Home and Preferences work without choosing a table library.

- [X] T041 [P] Add searchable `categoryLabel`, Home result/selection shapes, and effective appearance types in apps/mobile/src/features/mvp-visual/types.ts
- [X] T042 Add categories, a hard-coded inventory extending beyond one portrait screen, and with/without-soon examples while retaining all existing visual variants in apps/mobile/src/features/mvp-visual/fixtures.ts
- [X] T043 [P] Set `userInterfaceStyle` to `automatic` while preserving OpenBy splash/icon configuration in apps/mobile/app.json; `expo-system-ui` is already installed
- [X] T044 Resolve Light, Dark, and device-responsive System to one effective palette during the session, without persistence, in apps/mobile/src/theme/ThemeProvider.tsx after T041
- [X] T045 Apply the effective background token through Expo Router's ThemeProvider and Stack `contentStyle`, update the native root view with the installed `expo-system-ui`, and align the status bar in apps/mobile/src/app/_layout.tsx

**Checkpoint**: Product fixtures, active palette, and moving-screen background are ready for the
revised story routes. T042 and T044 follow T041; T045 follows T043 and T044.

---

## Phase 10: Revised User Story 1 — Search the Opened Inventory (Priority: P1) — MVP

**Goal**: Replace Home's large product cards with an expiring-soon carousel above a searchable,
filterable, vertically scrollable table of the full hard-coded inventory.

**Independent Manual Review**: With an inventory extending beyond one portrait screen, locate a
product by partial name, brand, or category; combine search with All/Soon/Expired filters; inspect
no-results and empty-inventory states; open the correct product from a table entry or carousel item.

- [X] T046 [P] [US1] Build compact mobile table headers and product entries with 48-point touch targets, identity, status icon/text, and remaining or elapsed time in apps/mobile/src/components/home/HomeProductTable.tsx; use existing React Native primitives and no dedicated table library
- [X] T047 [P] [US1] Build the small horizontal expiring-soon carousel, including semantic status, remaining time, selected-product action, and absent-when-empty presentation in apps/mobile/src/components/home/HomeSoonCarousel.tsx
- [X] T048 [P] [US1] Build accessible partial-search input, 48-point All/Soon/Expired controls, and a distinct no-results message in apps/mobile/src/components/home/HomeInventoryControls.tsx
- [X] T049 [P] [US1] Derive case-insensitive name/brand/category search, combined status filters, urgency-ordered table entries, and an independent urgency-ordered soon carousel from fixtures in apps/mobile/src/features/mvp-visual/homeInventory.ts
- [X] T050 [US1] Replace Home card mapping with carousel above the complete table area, working search/filters, empty versus no-results states, scrolling, accurate inventory summary, selected fixture navigation, and no preview selector in apps/mobile/src/app/index.tsx
- [ ] T051 [US1] Manually review the revised Home journey and verify table/carousel behavior, readable portrait layout beyond one screen, and reachable Scan action using specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: Revised User Story 1 is independently reviewable with hard-coded data. T050
follows T042 and T046–T049; T051 follows T050.

---

## Phase 11: Revised User Story 3 — Open the Selected Product (Priority: P2)

**Goal**: Make Product Details correspond to the actual table entry or carousel item selected on
Home while retaining its existing status and confirmation variants.

**Independent Manual Review**: Select different products from Home and confirm details show the
matching identity, status, and expiration information without mutating fixture data.

- [X] T052 [US3] Read the selected fixture identity from navigation, show matching Product Details content and semantic status, restore that status after canceling a confirmation, keep a safe representative fallback, and remove the route's preview selector in apps/mobile/src/app/product-details.tsx
- [ ] T053 [US3] Manually review table and carousel selections against Product Details and retained status/confirmation examples using specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: Revised User Story 3 depends on Home selection from T050 and retains the existing
nonfunctional edit, finish, and delete treatment.

---

## Phase 12: Revised User Story 5 — Follow Device Appearance (Priority: P3)

**Goal**: Present Light, Dark, and System as real session-local appearance choices while retaining
the denied-notification visual example.

**Independent Manual Review**: Select System and change the device between light and dark in the
same session; confirm the screen palette follows without saving a preference.

- [X] T054 [US5] Remove the fixed-System preview explanation, retain Light/Dark/System choices and notification variants, and present the effective choice clearly in apps/mobile/src/components/preferences/PreferencesContent.tsx
- [X] T055 [US5] Compose Preferences without the preview selector while keeping Light/Dark/System controls and retained notification visual variants in apps/mobile/src/app/preferences.tsx
- [ ] T056 [US5] Manually review Light, Dark, System response, permission notice, and privacy copy using specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: Revised User Story 5 depends on T043–T045 and requires no persistence or real
notification permission service.

---

## Phase 13: Revised Polish and Owner Validation

**Purpose**: Remove remaining on-screen development controls and verify the final revised visual
contract across all routes and themes.

- [X] T057 Remove preview selector imports and on-screen controls from apps/mobile/src/app/scanner.tsx, apps/mobile/src/app/confirm-opening.tsx, and apps/mobile/src/app/report-unknown.tsx while retaining their fixture/state definitions
- [X] T058 Reconcile revised routes and retained variants with specs/001-mvp-visual-design/contracts/visual-state-contract.md, rerun strict TypeScript checks for apps/mobile/tsconfig.json, and format changed files under apps/mobile/src
- [ ] T059 Manually inspect push/pop transitions in Light, Dark, and System after a device-appearance change, confirm no white/dark fixed background or preview control appears, and review retained examples using specs/001-mvp-visual-design/quickstart.md

**Checkpoint**: T034 is complete. T036 was skipped for this run at the owner's explicit request;
T040 and visual device reviews remain pending owner acceptance. T059 follows T045 and all revised
story routes.

---

## Dependencies and Execution Order

### Phase dependencies

- **Phases 1–8 — Initial draft**: Checked work records the existing implementation; T034 has since
  been completed, T036 was skipped for this run, and T040 remains open. Initial checkpoints are
  not final acceptance against the revised spec.
- **Phase 9 — Revised Foundation**: Starts from the existing mobile shell and blocks revised Home,
  Product Details, Preferences, and final theme/navigation review.
- **Phase 10 — Revised US1**: Depends on Phase 9 and delivers the current Home MVP.
- **Phase 11 — Revised US3**: Depends on T050 so details receive the selected product identity.
- **Phase 12 — Revised US5**: Depends on Phase 9; it can proceed independently of Phase 10.
- **Phase 13 — Revised Polish**: Follows the revised story routes. T034 finishes branding; T036
  is skipped for this run at the owner's request; T040 is final project-owner acceptance.

### User-story dependencies

- **US1 (P1)**: Revised table/carousel work depends on hard-coded fixtures and the revised
  effective-theme foundation.
- **US2 (P1)**: Depends only on the shared foundation; its simulated unknown-barcode destination
  becomes complete when US4 is added.
- **US3 (P2)**: Its original details content reuses product primitives; selected-product navigation
  now depends on revised US1 Home composition.
- **US4 (P2)**: Depends only on the shared foundation; completes the recovery destination from US2.
- **US5 (P3)**: Depends on device-responsive effective appearance from Phase 9 and completes the
  live System choice without persistence.

### Within each user story

- Build story-specific components before composing their route.
- Retain every named visual-state example in code while removing preview controls from routes;
  direct in-app selection of every example is not required this stage.
- Finish with project-owner manual inspection of reachable flows and retained examples; never
  substitute an automated test.

## Parallel Opportunities

- T041 and T043 target separate type/config files; T042 and T044 follow T041, and T045 follows
  T043/T044.
- T046–T049 target separate table, carousel, controls, and derivation files after Phase 9.
- T052 and T054 target different story files after their respective dependencies are met.
- T034 follows T043 because both touch apps/mobile/app.json; it can proceed alongside later
  component cleanup after that configuration change.

## Parallel Examples

### User Story 1

```text
Task T046: Implement apps/mobile/src/components/home/HomeProductTable.tsx
Task T047: Implement apps/mobile/src/components/home/HomeSoonCarousel.tsx
Task T048: Implement apps/mobile/src/components/home/HomeInventoryControls.tsx
Task T049: Implement apps/mobile/src/features/mvp-visual/homeInventory.ts
```

### Revised User Story 3 and User Story 5

```text
Task T052: Update apps/mobile/src/app/product-details.tsx after Home selection is available
Task T054: Update apps/mobile/src/components/preferences/PreferencesContent.tsx after System is live
```

### Revised foundation

```text
Task T041: Update apps/mobile/src/features/mvp-visual/types.ts
Task T043: Update apps/mobile/app.json
```

## Implementation Strategy

### MVP first

1. Use the completed initial draft as the starting point and complete revised Phase 9.
2. Complete Phase 10 to deliver the current Home table/carousel MVP with hard-coded products.
3. Perform T051's independent manual Home review before moving to selected-product details.
4. Complete Phases 11 and 12, then final polish and owner acceptance.

### Incremental delivery

1. Initial draft → six screens, simulated journeys, and retained hard-coded visual examples.
2. Revised foundation → effective theme and navigation background aligned with the device.
3. Revised US1 → searchable/filterable table and independent expiring-soon carousel.
4. Revised US3 → Product Details for the selected table/carousel product.
5. Revised US5 → System appearance response and Preferences without preview controls.
6. Revised polish → remaining preview removal, branding, quality checks, and owner acceptance.

## Notes

- `[P]` means the task targets independent files and can be assigned concurrently.
- `[US1]`–`[US5]` provide direct traceability to the specification's user stories.
- Hard-coded fixtures are display inputs, not a production domain model; Home search/filter and
  System appearance response are session-local UI behavior.
- No dedicated table library is selected or added in this stage.
- Do not add backend work, production services, persistence, or automated tests.
- Commit after each task or coherent task group.
