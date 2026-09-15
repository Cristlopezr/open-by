# Phase 0 Research: OpenBy MVP Visual Design

## Existing mobile stack

**Decision**: Implement the feature in the existing Expo SDK 57 and React Native mobile workspace
using strict TypeScript and Expo Router.

**Rationale**: The workspace already contains the required runtime and a file-based router entry
point. Keeping the change inside `apps/mobile` avoids unnecessary infrastructure and preserves the
constitutional mobile/backend boundary.

**Alternatives considered**: A separate prototype application or design-only web project was
rejected because it would duplicate the existing app and would not validate the real mobile shell.

## Navigation composition

**Decision**: Use the existing root Expo Router stack for the six routes and render a reusable,
custom bottom navigation on Home and Preferences. The emphasized center Scan action pushes the
full-screen Scanner route; Confirm Opening, Product Details, and Report Unknown Product remain
task routes without bottom navigation.

**Rationale**: Expo Router supports stack-based route layouts, while a custom shared bottom bar
provides exact control over the required center Scan treatment and keeps it off focused task
screens. This is a small, current abstraction shared by multiple screens.

**Alternatives considered**: Native tabs were rejected because their styling is platform-owned and
the Expo API is marked alpha. A nested tab/stack hierarchy was rejected as unnecessary for six
static or simulated screens.

**Reference**: [Expo Router navigation layouts](https://docs.expo.dev/router/basics/navigation-layouts/)

## Representative state delivery

**Decision**: Keep every required visual variant as a typed, hard-coded fixture, but remove the
development preview selector from application screens. Simulated product journeys may continue to
switch among predefined states. Search and filters on Home operate locally on the same hard-coded
products. No scanner, API, database, or notification service is used.

**Rationale**: Deterministic fixtures preserve visual coverage without placing review controls in
the user's interface. Local search and filters demonstrate how the inventory can be explored while
keeping representative values separate from production data. Direct access to every variant is not
required during this review stage.

**Alternatives considered**: Real services, local persistence, generated random data, and
production state machines were rejected as out of scope. A new component-catalog dependency was
rejected as unnecessary. Keeping the preview selector in the application was rejected because it
crowds the actual screens with development controls.

## Home inventory presentation

**Decision**: Replace the large Home product cards with a compact, vertically scrollable table
built from existing React Native primitives and hard-coded product fixtures. Keep All, Soon, and
Expired filters and add partial search by product name, brand, and category. Place a small horizontal
carousel of expiring-soon products above the entire table area. A table entry or carousel item opens
details for the selected fixture.

**Rationale**: The table makes status and remaining time easier to compare when the inventory spans
multiple screens. Search and filters help locate a product even when its full name is not
remembered. The carousel highlights the items needing near-term attention without replacing the
complete inventory. It remains independent of the table's current search and filter.

**Alternatives considered**: Full-size cards for every product consume too much vertical space.
A dedicated table library is not selected at this stage because the data is hard-coded and the
mobile presentation can be composed from existing primitives; that choice remains open for later
production work.

## Theme and typography

**Decision**: Keep the specified palettes and layout values in typed design tokens and load Manrope
through the existing Expo Font support. Light and Dark use their explicit palettes; System uses the
device's current appearance and responds when it changes during the session. Configure Expo for
automatic appearance, using the already installed `expo-system-ui` support on Android. The theme
choice remains session-local and is not saved.

**Rationale**: Shared tokens keep all six screens aligned, while the font package satisfies VR-005.
System must behave like its label rather than remaining on a predetermined palette. Expo documents
automatic appearance and device color-scheme observation.

**Alternatives considered**: System fonts were rejected because they violate the specified visual
identity. Bundling manually downloaded font files was rejected because the maintained font package
is clearer and easier to review. A fixed System preview palette was rejected because it does not
follow the device.

**References**: [Expo Fonts guide](https://docs.expo.dev/develop/user-interface/fonts/),
[Expo color themes](https://docs.expo.dev/develop/user-interface/color-themes/)

## Navigation background during transitions

**Decision**: Feed the effective OpenBy palette to Expo Router's navigation theme and the root
`Stack` scene background, and synchronize the native root-view background with the same token.
Check push and pop transitions in Light, Dark, and System after changing the device appearance.

**Rationale**: During a slide transition the moving screen exposes the navigator or root background.
A fixed white or dark value mismatches one of OpenBy's palettes. Expo identifies a white flash as a
navigation-theme mismatch and exposes scene and root-background controls.

**Alternatives considered**: A fixed dark transition color would show the inverse problem in Light
mode. Disabling the slide animation would hide the symptom rather than align the underlying theme.

**References**: [Expo Router Stack](https://docs.expo.dev/router/advanced/stack/),
[Expo SystemUI SDK 57](https://docs.expo.dev/versions/v57.0.0/sdk/system-ui/)

## Icons and illustrations

**Decision**: Reuse the installed Expo Symbols package for rounded, consistently weighted icons,
with explicit cross-platform symbol mappings and fallbacks. Build the small empty-state container
illustration from the same visual primitives unless a dedicated local asset is demonstrably needed.

**Rationale**: This meets VR-009 and the category fallback requirements without adding another icon
or illustration dependency.

**Alternatives considered**: Adding a second icon library or remote image service was rejected as
unnecessary. Product photography is optional because the spec permits category-icon fallbacks.

**Reference**: [Expo Symbols documentation](https://docs.expo.dev/versions/latest/sdk/symbols/)

## Validation strategy and constitutional exception

**Decision**: Use linting and TypeScript checking as engineering gates, followed exclusively by the
project owner's structured manual review. Do not create or run automated unit, integration, E2E,
snapshot, or UI tests for this feature.

**Rationale**: The scope contains no production inventory service, but Home search/filter and theme
response are local behaviors. VAL-001–VAL-003 still establish manual-only validation. The plan
records the enlarged exception, its risks, and owner review scenarios required by the constitution.

**Alternatives considered**: Snapshot and UI automation were rejected because the user explicitly
excluded them. Omitting all quality checks was rejected because linting and type checking remain
constitutional completion gates and are not tests.
