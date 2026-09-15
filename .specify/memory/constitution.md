<!--
Sync Impact Report
- Version change: unratified draft -> 1.0.0
- Modified principles:
  - Template Principle 1 -> I. Local-First Personal Data
  - Template Principle 2 -> II. Scan-First Interaction
  - Template Principle 3 -> III. Trusted Catalog Boundaries
  - Template Principle 4 -> IV. Deterministic Expiration and Notification Integrity
  - Template Principle 5 -> V. Explicit System Boundaries and Verification
- Added sections:
  - Product and Engineering Constraints
  - Development Workflow and Quality Gates
- Removed sections: none
- Follow-up TODOs: none
-->
# OpenBy Constitution

## Core Principles

### I. Local-First Personal Data
The application MUST remain usable without an account, with personal inventory data stored locally
on the user's device. Personal inventory data from unregistered users MUST NOT be sent to or stored
by the backend. Users who choose to register MAY store and synchronize their personal inventory
through the backend. This preserves user control over where personal data is stored.

### II. Scan-First Interaction
Barcode scanning MUST remain the primary path for opening a product. The opening flow MUST remain
fast and low-friction and MUST provide a recoverable path when barcode lookup fails. Changes that
affect this flow MUST avoid unnecessary user input, network round trips, and blocking UI because
speed and simplicity are the core product promise.

### III. Trusted Catalog Boundaries
The backend MUST own the shared product catalog and its product-lifetime data. User-submitted
product information MUST be marked unverified and stored separately from trusted catalog data
until an explicit validation process promotes it. APIs, database schemas, and application UI MUST
preserve this provenance; unverified data MUST NOT silently overwrite, merge into, or appear as
trusted catalog data. This boundary protects expiration guidance from accidental or malicious
catalog contamination.

### IV. Deterministic Expiration and Notification Integrity
Expiration information MUST be deterministic and derived from explicit product and opening data.
Identical inputs MUST produce identical outputs, with time-zone and calendar behavior covered by
tests. The UI MUST distinguish unavailable lifetime data from calculated expiration information;
it MUST NOT invent a shelf life or present an estimate as trusted fact. Notifications MUST remain
consistent with the current product state.

### V. Explicit System Boundaries and Verification
Mobile concerns and backend catalog concerns MUST remain separated by documented contracts. New
behavior MUST be implemented in the owning workspace; cross-boundary behavior MUST include
integration or contract coverage. Features MAY be implemented before their tests, but MUST NOT be
considered complete until relevant automated tests are written and passing. Backend automated
tests MUST use Vitest as the test runner. Defects involving expiration calculation, trust
provenance, local persistence, or notification lifecycle MUST receive regression tests because
failures in these areas can mislead users or violate data boundaries.

## Product and Engineering Constraints

- Barcode lookup failures, offline conditions, denied camera access, and denied notification
  permission MUST have recoverable user-facing states.
- Shared contracts and migrations MUST be explicit and reviewable. Database changes MUST include
  a migration strategy, and API changes MUST document compatibility impact.
- Dependencies and abstractions MUST have a demonstrated current product or maintenance need.

## Development Workflow and Quality Gates

Feature specifications and implementation plans that create, store, modify, or transmit data MUST
identify whether that data is local or shared and which trust level applies. Before a data-related
change is considered complete, its implementation MUST be checked to verify that unregistered
users' personal inventory does not cross the backend boundary and that unverified submissions
cannot enter trusted catalog paths.

Changes MUST pass formatting, type checking, and relevant automated tests for every affected
workspace before they are considered complete. Changes to scanning, expiration calculations,
local persistence, notifications, API contracts, catalog validation, or database access MUST
include focused tests for normal behavior and material failure cases. Manual device verification
MUST supplement automated coverage when behavior depends on camera, operating-system permissions,
background notification scheduling, or platform-specific time handling.

Any exception to a constitutional rule MUST be documented in the implementation plan with its
rationale and risks.

## Governance

This constitution is the highest-priority project governance document. Specifications, plans,
tasks, reviews, and implementation decisions MUST comply with it. If another project document
conflicts with this constitution, this constitution governs.

Amendments MUST be proposed as an explicit constitution change, explain the motivation and impact,
and include any required migration or remediation plan. Approval requires review by the project
maintainers before dependent feature work is accepted. Compliance MUST be reviewed during feature
planning and again before a feature is considered complete.

After initial ratification, versions follow semantic versioning: MAJOR for removal or incompatible
redefinition of a principle, MINOR for a new principle or materially expanded governance, and PATCH
for non-semantic clarification. The Last Amended date MUST change whenever the constitution content
changes; the Ratified date records the original adoption and MUST remain unchanged.

**Version**: 1.0.0 | **Ratified**: 2026-09-14 | **Last Amended**: 2026-09-14
