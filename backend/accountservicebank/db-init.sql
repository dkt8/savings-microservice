-- db-init.sql
-- PostgreSQL initialization script for accountservicebank

-- 1) Create database (run as a superuser or postgres user)
-- CREATE DATABASE accountservicebank;

-- 2) Connect to the database
-- \c accountservicebank

CREATE TABLE IF NOT EXISTS saving_accounts (
    id UUID PRIMARY KEY,
    account_no VARCHAR(50) UNIQUE,
    customer_id VARCHAR(50),
    product_code VARCHAR(50),
    balance NUMERIC(18,2),
    currency VARCHAR(10),
    status VARCHAR(30),
    maturity_date DATE,
    created_at TIMESTAMP
);

INSERT INTO saving_accounts (id, account_no, customer_id, product_code, balance, currency, status, maturity_date, created_at)
VALUES
    ('8a7b9c2f-4f0d-4b0c-8dee-9c9670f67313', 'SA202600000001', 'KH001', 'TIET_KIEM_12TH', 10000000.00, 'VND', 'ACTIVE', CURRENT_DATE + INTERVAL '12 months', CURRENT_TIMESTAMP),
    ('1b3c6d78-91a2-4f8e-b5a2-7e0a1c2d3f45', 'SA202600000002', 'KH002', 'TIET_KIEM_06TH', 5000000.00, 'VND', 'FROZEN', CURRENT_DATE + INTERVAL '6 months', CURRENT_TIMESTAMP),
    ('2c4e8f90-a1b2-4c3d-9e0f-8a7b6c5d4e12', 'SA202600000003', 'KH003', 'TIET_KIEM_24TH', 20000000.00, 'VND', 'PENDING_APPROVAL', CURRENT_DATE + INTERVAL '24 months', CURRENT_TIMESTAMP);
