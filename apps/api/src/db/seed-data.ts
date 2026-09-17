export const seedBrands = [
  {
    id: '10000000-0000-4000-8000-000000000001',
    name: 'Lácteos Valle Claro',
    normalized_name: 'lacteos valle claro',
  },
  {
    id: '10000000-0000-4000-8000-000000000002',
    name: 'Salsa del Huerto',
    normalized_name: 'salsa del huerto',
  },
  {
    id: '10000000-0000-4000-8000-000000000003',
    name: 'Jugos Cordillera',
    normalized_name: 'jugos cordillera',
  },
];

export const seedProducts = [
  {
    id: '20000000-0000-4000-8000-000000000001',
    barcode: '7800000000001',
    brand_id: '10000000-0000-4000-8000-000000000001',
    name: 'Leche entera',
    quantity: '1 L',
    country_code: 'CL',
    created_at: new Date('2026-09-16T12:00:00.000Z'),
    updated_at: new Date('2026-09-16T12:00:00.000Z'),
  },
  {
    id: '20000000-0000-4000-8000-000000000002',
    barcode: '7800000000002',
    brand_id: '10000000-0000-4000-8000-000000000002',
    name: 'Salsa de tomate',
    quantity: '340 g',
    country_code: 'CL',
    created_at: new Date('2026-09-16T12:00:00.000Z'),
    updated_at: new Date('2026-09-16T12:00:00.000Z'),
  },
  {
    id: '20000000-0000-4000-8000-000000000003',
    barcode: '7800000000003',
    brand_id: '10000000-0000-4000-8000-000000000003',
    name: 'Jugo de naranja',
    quantity: '1.5 L',
    country_code: 'CL',
    created_at: new Date('2026-09-16T12:00:00.000Z'),
    updated_at: new Date('2026-09-16T12:00:00.000Z'),
  },
];

export const seedOpeningRules = [
  {
    id: '30000000-0000-4000-8000-000000000001',
    product_id: '20000000-0000-4000-8000-000000000001',
    duration_hours: 72,
    storage_condition: 'Refrigerado',
    instruction:
      'Mantener refrigerado después de abrir y consumir dentro de 3 días.',
    verification_status: 'verified' as const,
    confidence: 0.95,
    verified_at: new Date('2026-09-16T12:00:00.000Z'),
  },
  {
    id: '30000000-0000-4000-8000-000000000002',
    product_id: '20000000-0000-4000-8000-000000000002',
    duration_hours: 120,
    storage_condition: 'Refrigerado',
    instruction: 'Refrigerar después de abrir y consumir dentro de 5 días.',
    verification_status: 'verified' as const,
    confidence: 0.9,
    verified_at: new Date('2026-09-16T12:00:00.000Z'),
  },
  {
    id: '30000000-0000-4000-8000-000000000003',
    product_id: '20000000-0000-4000-8000-000000000003',
    duration_hours: 96,
    storage_condition: 'Refrigerado',
    instruction:
      'Una vez abierto, mantener refrigerado y consumir dentro de 4 días.',
    verification_status: 'verified' as const,
    confidence: 0.92,
    verified_at: new Date('2026-09-16T12:00:00.000Z'),
  },
];

export const seedEvidence = [
  {
    id: '40000000-0000-4000-8000-000000000001',
    opening_rule_id: '30000000-0000-4000-8000-000000000001',
    source_type: 'seed',
    source_url: 'https://example.test/valle-claro/leche-entera',
    extracted_text:
      'Después de abrir, conservar refrigerado y consumir dentro de 3 días.',
    content_hash:
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    retrieved_at: new Date('2026-09-16T12:00:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000002',
    opening_rule_id: '30000000-0000-4000-8000-000000000002',
    source_type: 'seed',
    source_url: 'https://example.test/salsa-del-huerto/salsa-de-tomate',
    extracted_text: 'Refrigerar después de abrir y consumir dentro de 5 días.',
    content_hash:
      'bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb',
    retrieved_at: new Date('2026-09-16T12:00:00.000Z'),
  },
  {
    id: '40000000-0000-4000-8000-000000000003',
    opening_rule_id: '30000000-0000-4000-8000-000000000003',
    source_type: 'seed',
    source_url: 'https://example.test/jugos-cordillera/jugo-de-naranja',
    extracted_text:
      'Una vez abierto, mantener refrigerado y consumir dentro de 4 días.',
    content_hash:
      'cccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc',
    retrieved_at: new Date('2026-09-16T12:00:00.000Z'),
  },
];
