-- Create leads table for storing customer inquiries
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  clientname TEXT NOT NULL,
  clientemail TEXT NOT NULL,
  phonewhatsapp TEXT NOT NULL,
  destination TEXT NOT NULL,
  budget TEXT,
  accommodation TEXT,
  fitness_level TEXT,
  travel_dates TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'planning', 'traveling', 'completed')),
  psychography TEXT,
  concerns TEXT,
  additional_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for faster queries
CREATE INDEX IF NOT EXISTS leads_status_idx ON leads(status);
CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS leads_clientemail_idx ON leads(clientemail);

-- Enable Row Level Security
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated read access
CREATE POLICY "Allow authenticated read access" ON leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow public insert (for form submissions)
CREATE POLICY "Allow public insert" ON leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated update
CREATE POLICY "Allow authenticated update" ON leads
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Function to update updated_at timestamp (reusable for any table)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
DROP TRIGGER IF EXISTS leads_updated_at_trigger ON leads;
CREATE TRIGGER leads_updated_at_trigger
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
