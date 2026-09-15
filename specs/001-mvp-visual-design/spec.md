# Feature Specification: OpenBy MVP Visual Design

**Feature Branch**: `001-mvp-visual-design`

**Created**: 2026-09-14

**Status**: Draft

**Input**: User description: "Create the finished visual identity, navigation, six MVP screens,
and all required visual states for OpenBy without implementing production functionality."

**Validation**: Manual inspection by the project owner only; automated tests are out of scope.

## Clarifications

### Session 2026-09-14

- Q: Which actions need specific loading and success visual states? → A: Barcode scanning, adding a
  product, and submitting an unknown product.

### Session 2026-09-15

- Home uses a searchable, filterable product table for the full inventory, with a small horizontal
  carousel of expiring-soon products above the table area.
- Visual-state examples remain in the feature, but preview controls do not appear in application
  screens; those examples need not be directly selectable during this review stage.
- Selecting System follows the device's current light or dark appearance without requiring saved
  theme preferences.
- The background exposed during screen transitions follows the active light or dark palette.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Understand the Opened Inventory (Priority: P1)

As a user, I can open the app, see products nearing expiration, find an item in a large inventory,
and understand how to start adding another product.

**Why this priority**: Home communicates the product's main value and provides the entry point to
its primary action.

**Independent Manual Review**: Inspect Home with representative inventories that extend beyond
one screen and confirm that the expiring-soon carousel, product table, search, filters, and
intended scan action are visually clear.

**Acceptance Scenarios**:

1. **Given** products with different states, **When** Home is displayed, **Then** expiring-soon
   products appear in a small carousel above the table area, and the full inventory appears in an
   urgency-ordered table with remaining time easy to compare.
2. **Given** no opened products, **When** Home is displayed, **Then** the user sees the empty-state
   illustration, message, and prominent first-scan action.
3. **Given** any Home state, **When** the user views the bottom navigation, **Then** Home, emphasized
   Scan, and Preferences destinations are visible.
4. **Given** a large inventory and an incomplete recollection of a product, **When** the
   user enters part of its name, brand, or category in search, **Then** matching table entries are
   shown and the user can open the intended product.
5. **Given** a mixed-status inventory, **When** the user selects All, Soon, or Expired, **Then** the
   table shows only matching products; an empty result explains that nothing matches.

---

### User Story 2 - Scan and Confirm an Opening (Priority: P1)

As a user, I can enter the scanner from Home, understand how to position a barcode, see recoverable
failure states, and review a product before visually confirming that it was opened.

**Why this priority**: Barcode scanning is the primary product-opening path and must demonstrate a
complete, low-friction visual journey.

**Independent Manual Review**: Inspect Home, the representative Scanner states, and Confirm Opening
as a simulated sequence and confirm that each visual state and intended transition is complete.

**Acceptance Scenarios**:

1. **Given** the Home representation, **When** the intended Scan path is inspected, **Then** it clearly
   identifies Scanner as the direct next screen, including its reading frame, instructions, close
   action, and flash control.
2. **Given** a representative successful-scan state, **When** the simulated sequence is inspected,
   **Then** it includes visual success feedback followed by Confirm Opening with product, trust,
   opening time, lifetime, expiration, reminder, and action hierarchy.
3. **Given** a scanner failure state, **When** it is displayed, **Then** the cause and a recovery
   action are clear.
4. **Given** a product with unknown lifetime, **When** confirmation is displayed, **Then** no invented
   expiration is shown and the unavailable state is explicit.
5. **Given** representative loading and success states for adding a product, **When** they are
   inspected, **Then** each state clearly communicates that the intended action is in progress or
   complete.

---

### User Story 3 - Review an Opened Product (Priority: P2)

As a user, I can inspect an opened product, understand its current expiration status, and recognize
the available edit, finish, and delete actions without confusing destructive and safe actions.

**Why this priority**: Product details support continued use after the opening flow and must make
status and lifecycle actions unambiguous.

**Independent Manual Review**: Inspect Product Details for fresh, expiring-soon, expired, and
unknown-lifetime examples and confirm information hierarchy and action separation in each state.

**Acceptance Scenarios**:

1. **Given** an opened product with known lifetime, **When** details are displayed, **Then** its status
   and remaining or elapsed time are visually dominant.
2. **Given** separate representative variants for opening-time and reminder changes, **When** they
   are compared, **Then** expiration, status, and reminder information are visually consistent.
3. **Given** the user chooses Delete or discards an edit, **When** confirmation is required, **Then**
   a complete confirmation state clearly distinguishes the destructive or dismissive action.

---

### User Story 4 - Report an Unknown Product (Priority: P2)

As a user, I can understand that a scanned product is missing from the catalog and complete a clear
submission form whose unverified status is visible throughout the flow.

**Why this priority**: A recoverable unknown-barcode path prevents the primary journey from ending
without a useful next step while protecting catalog trust.

**Independent Manual Review**: Inspect Report Unknown Product with a representative barcode and
confirm that the form, provenance notice, intended submission action, and cancellation path are
visually complete.

**Acceptance Scenarios**:

1. **Given** an unknown barcode, **When** the report screen appears, **Then** the barcode and an
   explanation of the missing catalog entry are visible.
2. **Given** the report form, **When** the user reviews it, **Then** product name, brand, package size,
   estimated lifetime, lifetime unit, and unverified provenance are clearly presented.
3. **Given** representative loading and successful-submission states, **When** they are inspected,
   **Then** progress and success are clearly communicated without presenting the product as trusted.

---

### User Story 5 - Review Preferences (Priority: P3)

As a user, I can understand notification, appearance, privacy, and application preferences and can
recognize how to recover when notification permission is disabled.

**Why this priority**: Preferences support customization and transparency but are not required to
demonstrate the primary inventory and scanning journeys.

**Independent Manual Review**: Inspect Preferences in light, dark, system-theme, and
denied-notification states and confirm that every section remains visually accessible and System
reflects the device appearance.

**Acceptance Scenarios**:

1. **Given** Preferences, **When** it is displayed, **Then** Notifications, Appearance, Data and
   Privacy, and About OpenBy appear as distinct card-based sections.
2. **Given** notification permission is disabled, **When** Preferences is displayed, **Then** an amber
   notice provides a recovery action without blocking other settings.
3. **Given** Data and Privacy, **When** an unregistered user reads it, **Then** it clearly states that
   personal inventory remains local.
4. **Given** System is selected, **When** the device appearance is light or dark or changes between
   them, **Then** the application uses the corresponding palette without requiring a saved theme
   preference.

### Edge Cases

- Product names and brands are unusually long or missing.
- Catalog products have no photograph and require a category-icon fallback.
- Inventory is empty, contains only unknown-lifetime items, or contains many mixed-status items.
- Search or status filters produce no matching products, or no products are expiring soon.
- Remaining time is very short, very long, exactly zero, or already elapsed.
- A status must remain understandable to a user who cannot distinguish its associated color.
- Camera or notification permission is denied permanently or has not yet been requested.
- A barcode is unreadable, unknown, or cannot be looked up because there is no connection.
- A user cancels confirmation, discards edited information, or requests product deletion.
- Content is displayed in both light and dark appearance modes.
- A screen transition exposes the background behind a moving screen in either appearance mode.
- Loading, success, error, and no-data states appear without hiding relevant actions.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The feature MUST provide finished visual representations of Home, Scanner, Confirm
  Opening, Opened Product Details, Report Unknown Product, and Preferences.
- **FR-002**: All six screens MUST be available for manual inspection, and their intended navigation
  relationships MUST be represented through static or simulated transitions.
- **FR-003**: Bottom navigation MUST expose Home on the left, an emphasized Scan action in the
  center, and Preferences on the right.
- **FR-004**: Home MUST visually present Scan as a direct, one-step destination.
- **FR-005**: Representative visual states MUST cover normal, error, empty, and confirmation states
  where applicable. Loading and successful-completion states MUST be represented for barcode
  scanning, adding a product, and submitting an unknown product.
- **FR-006**: Product and journey examples MUST remain representative rather than production data.
  Home search and filters and device-responsive appearance MAY operate on those examples without
  functional barcode scanning, backend queries, local persistence, real notification scheduling,
  accounts, or synchronization.
- **FR-007**: Expiration states MUST combine color, text, and an icon and MUST NOT rely on color alone.
- **FR-008**: Products without images MUST use an appropriate category icon on a softly colored
  surface without degrading the layout.
- **FR-009**: Required visual-state examples MUST be retained without displaying development
  preview controls in application screens; direct selection of every example is not required for
  this stage's manual review.

### Validation Requirements

- **VAL-001**: This feature MUST be validated exclusively through manual inspection by the project
  owner.
- **VAL-002**: Automated tests MUST NOT be created for this feature, including unit, integration,
  end-to-end, snapshot, and UI tests.
- **VAL-003**: The implementation plan MUST document this exception to the constitution's automated
  testing rule, including the visual-only rationale and the risk of relying on manual review.

### Visual Identity Requirements

- **VR-001**: The direction MUST be "Fresh Pantry": clean, warm, modern, domestic, fresh, organized,
  and trustworthy.
- **VR-002**: The interface MUST NOT appear medical, childish, corporate, or like a generic template.
- **VR-003**: Layouts MUST use warm backgrounds, light surfaces, generous whitespace, rounded cards
  where appropriate, strong typographic hierarchy, and minimal shadows.
- **VR-004**: The interface MUST NOT use gradients or excessive decorative effects.
- **VR-005**: Manrope MUST be used throughout: weights 700 or 800 for titles, 400 or 500 for body
  content, and 600 for labels and buttons.
- **VR-006**: Remaining-time and expiration figures MUST have greater typographic prominence than
  surrounding information.
- **VR-007**: Layouts MUST follow an 8-point grid with 20-point horizontal margins, 18-point card
  corners, and 14-point field and button corners.
- **VR-008**: Touch controls MUST be at least 48 points high, and primary actions MUST be 56 points
  high.
- **VR-009**: Icons MUST be simple and rounded and MUST use a consistent line weight.
- **VR-010**: The complete experience MUST support both defined light and dark palettes.
- **VR-011**: Backgrounds visible during navigation transitions MUST match the main background of
  the active palette, including when System changes the active palette.

#### Light Palette

| Role | Value |
|------|-------|
| Main background | `#F6F7F2` |
| Primary surface | `#FFFFFF` |
| Secondary surface | `#EDF2EB` |
| Primary text | `#17211C` |
| Secondary text | `#66736C` |
| Borders | `#DCE4DC` |
| Primary green | `#176B4D` |
| Pressed primary green | `#10543C` |
| Lime accent | `#D7F171` |
| Fresh product | `#2F855A` |
| Expiring soon | `#D99024` |
| Expired | `#CC4B4B` |
| Information | `#347C98` |
| Unknown or unverified | `#6B7280` |

#### Dark Palette

| Role | Value |
|------|-------|
| Main background | `#101713` |
| Primary surface | `#18211C` |
| Secondary surface | `#202C25` |
| Primary text | `#F2F6F2` |
| Secondary text | `#A8B5AC` |
| Borders | `#34443A` |
| Primary green | `#66D19E` |
| Lime accent | `#D7F171` |
| Fresh product | `#67C58D` |
| Expiring soon | `#F0B84B` |
| Expired | `#EF7772` |
| Information | `#69B4CF` |
| Unknown or unverified | `#A8B0AB` |

### Screen Requirements

#### Home

- **SR-001**: Home MUST show the OpenBy name and a concise inventory summary in its top area.
- **SR-002**: Home MUST present a compact, vertically scrollable product table for the complete
  inventory, with search and All, Soon, and Expired filters in the table area.
- **SR-003**: Each table entry MUST identify the product through its name and available brand or
  category, show its expiration status and remaining or elapsed time, and open Product Details when
  selected. Exact expiration and reminder information MUST remain available in Product Details.
- **SR-004**: Table entries MUST be ordered with the most urgent first. Expired entries MUST use red
  as an accent without sacrificing readability or relying on color alone.
- **SR-005**: The empty state MUST show an opened-container illustration, the message "You have no
  opened products yet," and a prominent "Scan my first product" action.
- **SR-030**: A small horizontal carousel above the entire table area MUST highlight products
  expiring soon, with each item showing product identity, remaining time, and status and opening
  Product Details when selected. It MUST be absent when no products are expiring soon.
- **SR-031**: Search MUST match partial product names, brands, and categories; search and status
  filters MUST narrow the table together and show a clear no-results state when nothing matches.
- **SR-032**: Home MUST remain usable when the inventory extends beyond one screen: the table
  header and entries MUST be readable on a mobile portrait screen, and the table MUST scroll
  without covering search, filters, or the primary Scan destination.

#### Scanner

- **SR-006**: Scanner MUST fill the screen with a camera representation covered by a dark overlay and
  a central rectangular reading area defined by four lime-colored corners.
- **SR-007**: Scanner MUST show a close action, "Scan product" title, flash control, and the instruction
  "Center the barcode inside the frame."
- **SR-008**: The simulated scan sequence MUST include a distinct brief-success visual state before
  the Confirm Opening representation.
- **SR-009**: Scanner MUST provide complete, recoverable states for denied camera permission,
  unreadable barcode, no connection, and lookup failure; each state MUST visibly present its
  intended recovery action without requiring that action to function.

#### Confirm Opening

- **SR-010**: Confirm Opening MUST begin with a product summary showing name, brand, barcode, and
  catalog trust status.
- **SR-011**: The screen MUST allow visual review of the opening date and time.
- **SR-012**: A highlighted soft-green block MUST show recommended lifetime and a representative
  expiration date when lifetime data is available.
- **SR-013**: Reminder configuration MUST follow expiration information and clearly state when the
  user will be notified.
- **SR-014**: "Add product" MUST remain fixed at the bottom, with a secondary cancel action visually
  identified as returning to Scanner.
- **SR-015**: Unknown lifetime MUST produce a neutral unavailable state and MUST NOT display an
  invented expiration date.

#### Opened Product Details

- **SR-016**: The header MUST use the product's semantic status color and prominently show either
  "Expires in..." or "Expired... ago."
- **SR-017**: Separate cards MUST present product information, opening date, recommended lifetime,
  expiration date, and reminder status.
- **SR-018**: Opening-date and reminder actions MUST be secondary; "Mark as finished" and "Delete"
  MUST appear separately at the bottom to reduce mistakes.

#### Report Unknown Product

- **SR-019**: The screen MUST begin with the scanned barcode and explain that the product is not in
  the catalog.
- **SR-020**: A blue-gray information block MUST explain that submitted data remains unverified until
  reviewed and is not trusted catalog information.
- **SR-021**: The form MUST present product name, brand, quantity or package size, estimated lifetime
  after opening, and lifetime unit.
- **SR-022**: Unverified provenance MUST remain visible throughout the flow.
- **SR-023**: "Submit product" MUST be the primary action, with a secondary cancel action visually
  identified as returning Home.

#### Preferences

- **SR-024**: Preferences MUST use card-based sections for Notifications, Appearance, Data and
  Privacy, and About OpenBy.
- **SR-025**: Notifications MUST show permission status and default reminder lead time.
- **SR-026**: Appearance MUST present light, dark, and system options.
- **SR-033**: Selecting System MUST use the device's current appearance and respond to appearance
  changes during the same app session; no saved preference is required for this feature.
- **SR-027**: Data and Privacy MUST explain that inventory remains local without an account.
- **SR-028**: About OpenBy MUST show the version and basic application information.
- **SR-029**: The disabled-notification representation MUST include an amber notice and visible
  recovery action without visually blocking the remaining preferences.

### Required Visual States

- **VS-001**: The feature MUST include complete representations for empty inventory, fresh product,
  expiring-soon product, expired product, unknown-lifetime product, and unverified product.
- **VS-002**: The feature MUST include complete representations for camera permission denied,
  notification permission denied, no connection, and unknown barcode.
- **VS-003**: The feature MUST include complete deletion and discard confirmations.
- **VS-004**: The feature MUST include loading and successful-action feedback for barcode scanning,
  adding a product, and submitting an unknown product.
- **VS-005**: Required visual-state examples MUST remain in the feature without visible preview
  selectors or other development controls on application screens. Direct selection of every example
  is not required during this stage's manual review.

### Key Entities

- **Opened Product Display**: Representative product identity, brand, category, optional image, opening date,
  expiration information, remaining time, status, trust level, and reminder state shown in the UI.
- **Catalog Product Display**: Representative product information and whether it is trusted or
  unverified.
- **Expiration State**: Fresh, expiring soon, expired, or lifetime unknown, expressed through color,
  text, and icon.
- **Appearance Preference**: Light, dark, or system-selected presentation; System follows the
  device's current appearance.
- **Notification Preference**: Representative permission state and default reminder lead time.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Manual inspection confirms that all six required screens are visually complete and
  contain no unfinished or placeholder UI.
- **SC-002**: Manual inspection confirms that every intended navigation relationship is represented
  and that Home presents Scanner as a direct, one-step destination.
- **SC-003**: Project-owner review confirms that 100% of required normal, empty, error, and
  confirmation examples remain defined; loading and success examples remain defined for barcode
  scanning, adding a product, and submitting an unknown product, with no such examples required for
  other actions. Any failure example includes a recovery action. Direct in-app selection of every
  example is not an acceptance condition for this stage.
- **SC-004**: Manual inspection confirms that 100% of expiration states combine color, text, and an
  icon and remain distinguishable without color alone.
- **SC-005**: Manual inspection confirms that all touch controls meet the 48-point minimum and all
  primary actions meet the 56-point height requirement.
- **SC-006**: With an inventory that extends beyond one screen, manual inspection confirms that
  expiring-soon products are visible in the carousel, the most urgent table entries appear first,
  and a product can be found through partial-name, brand, or category search and opened without
  scanning every entry.
- **SC-007**: On every screen that displays catalog trust, manual inspection confirms that trusted
  and unverified information are visibly distinct.
- **SC-008**: Manual inspection of all six screens in light and dark presentations confirms the same
  content hierarchy, status meanings, actions, and complete states.
- **SC-009**: In both light and dark modes, manual inspection confirms that 100% of observed screen
  transitions expose only the active palette's main background behind moving screens.
- **SC-010**: Manual inspection confirms that System matches the device in both light and dark
  appearance and updates after an appearance change in the same session.
- **SC-011**: Project-owner review confirms that all required visual-state examples remain in the
  feature and that no application screen displays development preview controls.

## Assumptions

- Product data and scanning journeys remain representative; Home search, status filtering, and
  response to device appearance work on these examples during the current session.
- Mobile portrait orientation is the primary review format for the MVP designs.
- Product state, ordering, expiration values, permission states, and submission outcomes may be
  assigned directly to representative content because their production logic is out of scope.
- System follows device appearance during the current session; theme selection does not require
  local persistence in this visual feature.
- The table's visual layout is specified here; selection of a table library is deferred to planning.
- Exact motion timing is not prescribed; feedback motion remains brief and does not delay the next
  user action.
- Functional barcode scanning, backend queries, local persistence, real notification scheduling,
  accounts, and synchronization remain outside this specification.
- Automated unit, integration, end-to-end, snapshot, and UI tests are intentionally excluded; the
  project owner performs validation through manual inspection of the application and retained
  visual-state examples.
