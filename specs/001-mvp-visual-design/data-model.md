# Display Model: OpenBy MVP Visual Design

This feature has no persistent data model. Product and visual-state examples are hard-coded fixtures
inside `apps/mobile`; they are never stored or transmitted. Home search, filters, and theme choice
are session-local UI state derived from these examples.

## Product Fixture

| Field | Meaning | Rules |
|---|---|---|
| `id` | Stable fixture identifier | Unique within the fixture catalog; not a production identity |
| `name` | Product display name | May be long or absent in an edge-case fixture |
| `brand` | Brand display text | May be long or absent in an edge-case fixture |
| `categoryLabel` | Searchable product category | Present even when name or brand is missing; separate from the icon mapping |
| `barcode` | Representative barcode text | Display-only; never scanned or queried |
| `image` | Optional bundled image reference | When absent, `categoryIcon` is required |
| `categoryIcon` | Cross-platform symbol mapping | Used as the required image fallback |
| `openedAtLabel` | Representative opening date/time | Preformatted and not parsed |
| `lifetimeLabel` | Recommended post-opening lifetime | May be unavailable |
| `expirationLabel` | Representative expiration date | Must be absent when lifetime is unknown |
| `remainingLabel` | Remaining or elapsed time text | Must agree with `status` |
| `status` | `fresh`, `soon`, `expired`, or `unknown` | Always shown with color, text, and icon |
| `urgencyRank` | Representative ordering key | Fixture-only number for urgency-first Home ordering; never calculated from dates |
| `trust` | `trusted` or `unverified` | Unverified must never use trusted presentation |
| `reminderLabel` | Representative reminder state | Display-only; never schedules a notification |

## Appearance Choice

| Value | Presentation |
|---|---|
| `light` | Uses the complete light token palette |
| `dark` | Uses the complete dark token palette |
| `system` | Uses the current device appearance and updates when that appearance changes during the session |

The effective palette is `light` or `dark`: explicit choices win; `system` resolves from the device.
The choice and effective palette are not persisted. The same effective background token applies to
the screens, navigation stack, and native root view.

## Home Inventory View

| Value | Meaning | Rules |
|---|---|---|
| Product fixtures | Complete representative inventory | Hard-coded; no fixed count or production data source |
| Search text | Current partial query | Matches name, brand, and `categoryLabel` without case sensitivity |
| Status filter | `all`, `soon`, or `expired` | Combines with search; `all` includes fresh and unknown-lifetime products |
| Table results | Visible products | Derived from fixtures, search, and filter; ordered by urgency |
| Carousel products | Expiring-soon highlights | Derived from all `soon` fixtures independently of table search/filter; hidden if empty |
| Selected product | Fixture identity | Table and carousel selections open matching Product Details content |

An empty inventory uses the first-scan state. A nonempty inventory with no matching table entries
uses a separate no-results state. The table remains readable and scrollable when results extend
beyond one portrait screen.

## Screen-State Catalog

| Screen | Required fixture states |
|---|---|
| Home | Mixed and extended inventories, empty inventory, carousel with/without soon products, search/filter results and no-results, fresh, soon, expired, unknown lifetime, missing image, long/missing text |
| Scanner | Ready, loading, success, camera denied, unreadable barcode, no connection, lookup failure, unknown barcode |
| Confirm Opening | Known lifetime, unknown lifetime, adding, added, discard confirmation |
| Opened Product Details | Fresh, soon, expired, unknown lifetime, delete confirmation, discard confirmation |
| Report Unknown Product | Ready, submitting, submitted |
| Preferences | Light selected, dark selected, System following device appearance, notification allowed, notification denied |

Loading and success are required only for barcode scanning, adding a product, and submitting an
unknown product. Other actions may show their required normal, error, empty, or confirmation state
without additional loading or success variants.

## Relationships and consistency rules

- Home table entries, carousel highlights, and Product Details variants reference the same product
  fixture shapes and selected identity.
- A `status` controls semantic color, icon, status text, and remaining/elapsed wording as one unit.
- `unknown` lifetime always removes trusted expiration output and uses a neutral unavailable state.
- `unverified` trust remains visible on Confirm Opening and Report Unknown Product.
- Search and filter changes derive visible table results without calculating or mutating product data.
- The carousel remains based on all `soon` products when table search or filters change.
- Retained visual-state variants do not require visible in-app preview controls or direct selection
  during this review stage.
- All fixture combinations must render in both light and dark palettes.

## Transitions and local UI responses

```text
Home -> Scanner
Scanner ready -> loading -> success -> Confirm Opening
Scanner unknown barcode -> Report Unknown Product
Confirm Opening ready -> adding -> added -> Home
Report Unknown Product ready -> submitting -> submitted -> Home
Home -> Opened Product Details
Home <-> Preferences
Home search/filter -> derived table results -> selected Product Details
Home carousel item -> selected Product Details
Device appearance change + System selected -> matching effective palette and navigation background
```

Product journeys remain simulated; Home search/filter and System appearance response are local UI
behaviors on hard-coded examples.
