-- Migration Script: RSS Engine Updates

-- 1. Modify rss_feeds table
ALTER TABLE rss_feeds
ADD COLUMN IF NOT EXISTS publisher TEXT,
ADD COLUMN IF NOT EXISTS language TEXT DEFAULT 'en',
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS state TEXT,
ADD COLUMN IF NOT EXISTS district TEXT,
ADD COLUMN IF NOT EXISTS category_name TEXT,
ADD COLUMN IF NOT EXISTS priority INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS refresh_interval INTEGER DEFAULT 10,
ADD COLUMN IF NOT EXISTS last_successful_fetch TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS error_count INTEGER DEFAULT 0,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- 2. Modify articles table
ALTER TABLE articles
ADD COLUMN IF NOT EXISTS guid TEXT,
ADD COLUMN IF NOT EXISTS canonical_url TEXT,
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS state TEXT;
-- note: 'district' already exists in the articles table.

-- Create indexes for deduplication
CREATE INDEX IF NOT EXISTS idx_articles_guid ON articles(guid);
CREATE INDEX IF NOT EXISTS idx_articles_canonical_url ON articles(canonical_url);

-- (Optional) If you want to ensure unique GUIDs and Canonical URLs, uncomment below:
-- ALTER TABLE articles ADD CONSTRAINT unique_article_guid UNIQUE (guid);
-- ALTER TABLE articles ADD CONSTRAINT unique_canonical_url UNIQUE (canonical_url);
