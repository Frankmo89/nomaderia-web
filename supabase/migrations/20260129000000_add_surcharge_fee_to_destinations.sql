-- Migration: Add surcharge_fee and is_surcharge_free to destinations
ALTER TABLE destinations
ADD COLUMN surcharge_fee NUMERIC DEFAULT 0;

ALTER TABLE destinations
ADD COLUMN is_surcharge_free BOOLEAN DEFAULT FALSE;