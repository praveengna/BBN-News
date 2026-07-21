-- Create Storage Bucket for RSS Images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('article-images', 'article-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS Policies
CREATE POLICY "Public Access to Article Images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'article-images');

CREATE POLICY "Service Role Access to Article Images" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'article-images');

-- Ensure Categories exist (World, Politics, Technology, India, etc)
INSERT INTO public.categories (slug, name) VALUES 
('world', 'World News'),
('india', 'India News'),
('politics', 'Politics'),
('technology', 'Technology'),
('business', 'Business'),
('sports', 'Sports'),
('entertainment', 'Entertainment'),
('city-news', 'City News')
ON CONFLICT (slug) DO NOTHING;

-- Seed Standard RSS Feeds
INSERT INTO public.rss_feeds (name, url, default_category_id)
SELECT 'Google News Top Stories', 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en', id FROM public.categories WHERE slug = 'india'
UNION ALL
SELECT 'BBC World News', 'http://feeds.bbci.co.uk/news/world/rss.xml', id FROM public.categories WHERE slug = 'world'
UNION ALL
SELECT 'Reuters Top News', 'http://feeds.reuters.com/reuters/topNews', id FROM public.categories WHERE slug = 'world'
UNION ALL
SELECT 'AP Top News', 'https://apnews.com/index.rss', id FROM public.categories WHERE slug = 'world'
UNION ALL
SELECT 'PM India Official', 'https://www.pmindia.gov.in/en/feed/', id FROM public.categories WHERE slug = 'india'
UNION ALL
SELECT 'MP Gov Press Releases', 'http://mpinfo.org/MPinfoStatic/rss/MPinfoRSS.xml', id FROM public.categories WHERE slug = 'politics'
ON CONFLICT DO NOTHING;
