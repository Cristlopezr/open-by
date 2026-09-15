# Quickstart and Manual Validation

## Prerequisites

- Node.js compatible with the repository toolchain
- pnpm 12.4.1
- An Android/iOS device or simulator for portrait review
- Optional desktop browser with a narrow mobile viewport for faster layout inspection

## Install and start

From the repository root:

```powershell
pnpm install
pnpm dev:mobile
```

Open the Expo development URL on the chosen review surface. Application screens must contain no
Visual preview selectors or other development controls. Review the visible journeys in the app and
confirm separately that the required visual-state examples remain defined in the feature; direct
in-app selection of every example is not required for this stage.

## Code-quality checks

Run these checks after implementation:

```powershell
pnpm --filter @open-by/mobile lint
pnpm --filter @open-by/mobile exec tsc --noEmit
```

Do not create or run automated unit, integration, E2E, snapshot, or UI tests for this feature.

## Project-owner manual review

### 1. Global visual identity

- Inspect all six screens in light and dark presentations.
- Confirm Manrope typography, palette values, spacing, radii, minimal shadows, and absence of
  gradients.
- Measure that every touch control is at least 48 points high and every primary action is 56 points.
- Select Light and Dark and confirm the defined palettes. Select System with the device in light
  appearance, then change the device to dark and back during the same app session; confirm the
  screens and status bar follow each change without requiring a saved preference.
- Navigate forward and back between screens in each effective theme. During the slide animation,
  confirm that the background behind the moving screen uses the active palette's main background,
  including after a device appearance change with System selected.

### 2. Home and navigation

- Inspect Home with a hard-coded inventory that extends beyond one portrait screen, plus the empty,
  long-text, missing-text, and missing-image examples where reachable.
- Confirm the small expiring-soon carousel sits above the complete table area, contains only soon
  products, opens matching Product Details, and disappears when no products are soon.
- Confirm the table is readable and scrollable, shows the most urgent entries first, and opens
  details for the selected product.
- Enter partial name, brand, and category queries; select All, Soon, and Expired filters; confirm
  search and filters combine on the table while the carousel remains an independent overview.
  Confirm a no-matches message differs from the empty-inventory first-scan state.
- Confirm search, filters, and the center Scan action remain accessible while the table scrolls.
- Confirm Home, emphasized center Scan, and Preferences navigation relationships.

### 3. Scanner and Confirm Opening

- Inspect the reachable Scanner journey and confirm the ready, loading, and success feedback.
  Review retained camera-denied, unreadable, offline, lookup-failure, and unknown-barcode examples
  without requiring an in-app preview selector for direct access to each one.
- Confirm each failure shows its intended recovery and the unknown barcode leads to reporting.
- Inspect reachable known/unknown lifetime, adding, added, and discard-confirmation variants; review
  any remaining examples as retained feature definitions.
- Confirm unknown lifetime never displays an expiration date.

### 4. Product Details and unknown-product reporting

- Inspect reachable Product Details states and retain fresh, soon, expired, unknown, and
  delete/discard-confirmation examples in the feature.
- Confirm destructive actions are separate from secondary edit actions.
- Inspect the reachable report journey and confirm that ready, submitting, and submitted examples
  retain unverified provenance throughout.

### 5. Preferences

- Inspect Light, Dark, and System as live choices and confirm System responds to the device.
  Confirm notification-allowed and notification-denied examples remain defined.
- Confirm the amber permission notice includes recovery without blocking other sections.
- Confirm the privacy text states that unregistered inventory remains local.

### 6. Final acceptance

- Compare the result against every FR, VAL, VR, SR, VS, and SC entry in [spec.md](./spec.md).
- Record project-owner approval only after the visible screens and journeys are complete and all
  required visual-state examples are retained. Direct in-app selection of every example is not an
  acceptance condition for this stage.
- Treat any missing required example, visible preview control, placeholder UI, incorrect table
  search/filter result, mismatched System theme or transition background, trust ambiguity, invented
  unknown-lifetime expiration, or non-recoverable failure presentation as a failed manual review.
