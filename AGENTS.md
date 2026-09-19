# OpenBy project instructions

## Product context

OpenBy helps users track products after opening them and know how long
they remain usable.

Opened products are stored locally in SQLite on the mobile device.

The public backend catalog is currently queried only by barcode.
Users cannot browse or filter the backend product catalog.

If a barcode is unknown, the user may submit a request to add the
product. The request flow uses the public brand search to select an
existing brand.

User accounts and server-side synchronization of personal inventories
are future features and are not yet designed.

## Domain rules

- A catalog product is public only when it is active and has a verified
  opening rule.
- Products without a verified opening rule remain valid administrative
  records but are not returned by the public barcode lookup.
- Brands are created and managed only by administrators.
- Public brand search is used when submitting unknown-product requests.
- Do not filter public brand search based on existing products.

## Working rules

- Implement only what the issue explicitly requires.
- Do not invent caching, auditing, authorization, or additional business rules.
- Ask before changing the domain model or adding new endpoints.
- Prefer the simplest implementation that satisfies the current use case.
- Do not create tests unless explicitly requested.