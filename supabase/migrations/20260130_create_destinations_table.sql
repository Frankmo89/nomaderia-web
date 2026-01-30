-- Migración: Crear tabla destinations
CREATE TABLE IF NOT EXISTS destinations (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    country TEXT NOT NULL,
    difficulty_tier INTEGER NOT NULL CHECK (difficulty_tier BETWEEN 1 AND 4),
    gear_list TEXT[] NOT NULL,
    base_cost NUMERIC(10,2) NOT NULL,
    estimated_flight_cost NUMERIC(10,2) NOT NULL,
    physical_reqs TEXT NOT NULL,
    surcharge_fee NUMERIC(10,2) DEFAULT 0,
    season_start DATE NOT NULL,
    season_end DATE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Índices útiles
CREATE INDEX IF NOT EXISTS idx_destinations_difficulty ON destinations(difficulty_tier);
CREATE INDEX IF NOT EXISTS idx_destinations_cost ON destinations(base_cost, estimated_flight_cost);
