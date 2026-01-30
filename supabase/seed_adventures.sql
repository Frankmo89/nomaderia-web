-- Seed realista para tabla destinations
INSERT INTO destinations (name, country, difficulty_tier, gear_list, base_cost, estimated_flight_cost, physical_reqs, surcharge_fee, season_start, season_end)
VALUES
-- Nevado de Toluca
('Nevado de Toluca', 'México', 2, ARRAY['Botas de montaña', 'Ropa térmica', 'Impermeable', 'Guantes', 'Gorro'], 150, 0, 'Caminata de 6-8h, altitud >4000m, buena condición física, no requiere experiencia técnica.', 0, '2026-11-01', '2027-03-31'),
-- Pico de Orizaba
('Pico de Orizaba', 'México', 4, ARRAY['Botas de alta montaña', 'Crampones', 'Piolet', 'Casco', 'Ropa térmica', 'Guantes técnicos'], 450, 0, 'Ascenso técnico, uso de crampones y piolet, experiencia previa en alta montaña, excelente condición física.', 0, '2026-10-01', '2027-04-30'),
-- Torres del Paine
('Torres del Paine', 'Chile', 3, ARRAY['Botas de trekking', 'Bastones', 'Ropa impermeable', 'Carpa', 'Saco de dormir -5°C'], 1500, 800, 'Trekking de varios días, clima variable, buena resistencia física, experiencia en senderismo prolongado.', 0, '2026-11-01', '2027-03-31'),
-- Yosemite
('Yosemite', 'USA', 2, ARRAY['Botas de senderismo', 'Ropa cómoda', 'Protector solar', 'Gorra', 'Mochila ligera'], 400, 500, 'Senderos bien marcados, dificultad baja a media, accesible para principiantes activos.', 100, '2026-05-01', '2026-10-31');
