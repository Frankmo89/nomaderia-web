-- seed_smart_travel.sql
-- Parques caros (Big 11) con recargo activo
INSERT INTO destinations (name, country, surcharge_fee, is_surcharge_free) VALUES
('Yosemite', 'USA', 100, FALSE),
('Grand Canyon', 'USA', 100, FALSE),
('Yellowstone', 'USA', 100, FALSE),
('Zion', 'USA', 100, FALSE),
('Bryce Canyon', 'USA', 100, FALSE),
('Glacier', 'USA', 100, FALSE),
('Grand Teton', 'USA', 100, FALSE),
('Rocky Mountain', 'USA', 100, FALSE),
('Olympic', 'USA', 100, FALSE),
('Sequoia', 'USA', 100, FALSE),
('Acadia', 'USA', 100, FALSE);

-- Alternativas en USA sin recargo
INSERT INTO destinations (name, country, surcharge_fee, is_surcharge_free) VALUES
('Death Valley', 'USA', 0, TRUE),
('Joshua Tree', 'USA', 0, TRUE),
('Valley of Fire', 'USA', 0, TRUE),
('Great Basin', 'USA', 0, TRUE),
('Canyonlands', 'USA', 0, TRUE);

-- Destinos top en LatAm
INSERT INTO destinations (name, country, surcharge_fee, is_surcharge_free) VALUES
('Nevado de Toluca', 'México', 0, TRUE),
('Iztaccíhuatl', 'México', 0, TRUE),
('Torres del Paine', 'Chile', 0, TRUE);