CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS saving_products (
    id UUID PRIMARY KEY,
    product_code VARCHAR(50) UNIQUE,
    product_name VARCHAR(255),
    tenor_months INT,
    interest_rate NUMERIC(10,4),
    currency VARCHAR(10),
    active BOOLEAN,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saving_accounts (
    id UUID PRIMARY KEY,
    account_no VARCHAR(50) UNIQUE,
    customer_id VARCHAR(50),
    product_code VARCHAR(50),
    balance NUMERIC(18,2),
    status VARCHAR(30),
    maturity_date DATE,
    created_at TIMESTAMP
);

CREATE TABLE IF NOT EXISTS saving_transactions (
    id UUID PRIMARY KEY,
    account_id UUID,
    txn_type VARCHAR(30),
    amount NUMERIC(18,2),
    idempotency_key VARCHAR(255),
    created_at TIMESTAMP
);

INSERT INTO saving_products (id, product_code, product_name, tenor_months, interest_rate, currency, active, created_at)
VALUES
    ('11111111-1111-1111-1111-111111111111', 'SP001', 'Tiết kiệm trách nhiệm', 6, 4.25, 'VND', true, NOW()),
    ('22222222-2222-2222-2222-222222222222', 'SP002', 'Tiết kiệm linh hoạt', 12, 5.10, 'VND', true, NOW()),
    ('33333333-3333-3333-3333-333333333333', 'SP003', 'Tiết kiệm Tết', 24, 5.75, 'VND', true, NOW())
ON CONFLICT (product_code) DO NOTHING;

INSERT INTO saving_accounts (id, account_no, customer_id, product_code, balance, status, maturity_date, created_at)
VALUES
    ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '0011001234567', 'CUST001', 'SP001', 25000000.00, 'ACTIVE', DATE '2026-12-01', NOW()),
    ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '0011001234568', 'CUST002', 'SP002', 76000000.00, 'ACTIVE', DATE '2027-05-01', NOW()),
    ('cccccccc-cccc-cccc-cccc-cccccccccccc', '0011001234569', 'CUST003', 'SP003', 120000000.00, 'ACTIVE', DATE '2028-01-01', NOW())
ON CONFLICT (account_no) DO NOTHING;

INSERT INTO saving_transactions (id, account_id, txn_type, amount, idempotency_key, created_at)
VALUES
    ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'DEPOSIT', 5000000.00, 'txn-20260526-001', NOW()),
    ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'DEPOSIT', 10000000.00, 'txn-20260526-002', NOW()),
    ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'cccccccc-cccc-cccc-cccc-cccccccccccc', 'WITHDRAW', 2500000.00, 'txn-20260526-003', NOW())
ON CONFLICT DO NOTHING;
