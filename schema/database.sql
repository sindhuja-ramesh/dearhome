CREATE TABLE households (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    adults_count INT DEFAULT 3,
    children_count INT DEFAULT 1,
    cuisine_preference VARCHAR(50) DEFAULT 'North Indian'
);

CREATE TABLE pantry_items (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    household_id UUID REFERENCES households(id) ON DELETE CASCADE,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    current_quantity NUMERIC(10, 2) NOT NULL,
    unit VARCHAR(20) NOT NULL,
    min_threshold NUMERIC(10, 2) NOT NULL,
    daily_burn_rate NUMERIC(10, 3) DEFAULT 0.05
);
