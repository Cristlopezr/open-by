# Visual State Contract

This contract defines the visible UI behavior and retained visual-state examples for owner review.
It is not an API contract and introduces no backend or persistence boundary. Retained examples need
not all be directly selectable in the application during this review stage.

## Global presentation

- Every product status uses color, text, and an icon together.
- Every route supports the complete light and dark token sets.
- System follows the current device appearance and responds to changes during the same session;
  Light and Dark remain explicit choices. Theme choice is not persisted.
- Screens, the navigation stack, and the root background use the active palette's main background
  during push and pop transitions; no fixed white or dark layer may appear behind a moving screen.
- No application screen displays development preview selectors, labels, or controls. Required
  visual-state examples remain in the feature even when direct selection is unavailable.
- Content respects the 8-point grid, 20-point horizontal margins, 18-point card corners, and
  14-point field/button corners.
- Interactive-looking controls are at least 48 points high; primary actions are 56 points high.
- Manrope weights follow VR-005, shadows remain minimal, and gradients are prohibited.

## Route and state matrix

| Route | Required states | Required transition or exit |
|---|---|---|
| `/` | Mixed and extended inventories, empty, expiring-soon carousel with/without items, table search/filter results and no-results, product status/content edge cases | Scan opens `/scanner`; Preferences opens `/preferences`; a table entry or carousel item opens `/product-details` for that product |
| `/scanner` | Ready, loading, success, camera denied, unreadable, offline, lookup failure, unknown barcode | Success proceeds to `/confirm-opening`; unknown barcode proceeds to `/report-unknown`; close returns Home |
| `/confirm-opening` | Known lifetime, unknown lifetime, adding, added, discard confirmation | Add sequence returns Home; cancel returns Scanner |
| `/product-details` | Fresh, soon, expired, unknown lifetime, delete confirmation, discard confirmation | Secondary edits remain visually subordinate; finish and delete remain separated |
| `/report-unknown` | Ready, submitting, submitted | Submit sequence preserves unverified provenance; cancel and completion return Home |
| `/preferences` | Light, dark, System following device appearance, notifications allowed/denied | Home returns to `/`; Scan opens `/scanner` |

## Home inventory behavior

- The small horizontal carousel sits above the complete table area, including search and filters.
  It shows `soon` products ordered by urgency, with identity, status, and remaining time; it is
  absent when no products are soon. Search and status filters apply to the table, not the carousel.
- The compact table presents the full hard-coded inventory in urgency order. Each entry identifies
  the product and shows semantic status and remaining or elapsed time. Selection opens the matching
  Product Details fixture. Exact expiration and reminder information remain available in details.
- Search matches partial name, brand, and category text without case sensitivity. All, Soon, and
  Expired status filters combine with search and produce derived table results. All includes fresh
  and unknown-lifetime products. A nonempty inventory with no matches shows a no-results state;
  an empty inventory shows the first-scan state.
- The table remains readable and scrollable when it extends beyond one mobile portrait screen.
  Search, filters, and the bottom Scan destination remain accessible while navigating results.

## Recovery presentation

| State | Required visible recovery |
|---|---|
| Camera denied | Explanation plus an action intended to open permission settings |
| Unreadable barcode | Retry guidance and a visible retry action |
| No connection | Offline explanation and a visible retry action |
| Lookup failure | Failure explanation and retry or report path |
| Unknown barcode | Direct path to Report Unknown Product |
| Notifications denied | Amber notice and recovery action without blocking other preferences |

Recovery actions only need simulated transitions in this feature.

## Trust and expiration presentation

- Trusted catalog content and user-submitted unverified content must use distinct labels and visual
  treatment wherever provenance appears.
- An unverified submission must remain unverified in ready, submitting, and submitted states.
- Known-lifetime fixtures show recommended lifetime and a representative expiration date.
- Unknown-lifetime fixtures show a neutral unavailable state and no invented expiration date.

## Loading and success scope

Dedicated loading and success states are required only for:

1. Barcode scanning.
2. Adding a product from Confirm Opening.
3. Submitting an unknown product.

No loading or success variant is required for other actions.
