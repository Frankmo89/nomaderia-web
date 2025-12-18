-- Create articles table for travel blog posts
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT NOT NULL,
  author TEXT DEFAULT 'NOMADERIA Team',
  read_time TEXT DEFAULT '5 min read',
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS articles_published_at_idx ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS articles_category_idx ON articles(category);

-- Enable Row Level Security
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON articles
  FOR SELECT
  TO public
  USING (true);

-- Create policy to allow authenticated insert (for n8n webhook)
CREATE POLICY "Allow authenticated insert" ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);
