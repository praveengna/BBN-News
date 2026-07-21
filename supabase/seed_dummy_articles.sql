-- =========================================================
-- BBN NEWS - DUMMY SEED SCRIPT
-- Run this in your Supabase SQL Editor to populate the homepage immediately
-- =========================================================

-- 1. Insert Categories
INSERT INTO public.categories (slug, name) VALUES 
('world', 'World News'),
('india', 'India News'),
('politics', 'Politics'),
('technology', 'Technology'),
('business', 'Business'),
('sports', 'Sports'),
('entertainment', 'Entertainment'),
('madhya-pradesh', 'Madhya Pradesh')
ON CONFLICT (slug) DO NOTHING;

-- 2. Create a Dummy System Author
INSERT INTO public.authors (id, name, slug, bio, avatar_url)
VALUES (
  '00000000-0000-0000-0000-000000000000', 
  'BBN Staff', 
  'bbn-staff', 
  'Official editorial team of BBN News.', 
  'https://images.unsplash.com/photo-1579294691456-f01832104bd3?q=80&w=200&auto=format&fit=crop'
)
ON CONFLICT (id) DO NOTHING;

-- 3. Insert Dummy Articles (Multiple per category so grids look full)
-- NOTE: We use random UUIDs for the articles

INSERT INTO public.articles (title, slug, summary, content, category_id, status, published_at, featured_image, source_url)
SELECT 
  'Global Markets Rally Amidst Tech Surge',
  'global-markets-rally-' || substr(md5(random()::text), 1, 6),
  'Tech stocks pushed major indices to new highs today as investors bet heavily on AI advancements.',
  '<p>Full content for global markets rally.</p>',
  id,
  'published',
  now(),
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop',
  'https://example.com/markets'
FROM public.categories WHERE slug = 'business'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.articles (title, slug, summary, content, category_id, status, published_at, featured_image, source_url)
SELECT 
  'Election Commission Announces Polling Dates',
  'election-commission-dates-' || substr(md5(random()::text), 1, 6),
  'The much awaited polling dates for the upcoming state assembly elections have been revealed.',
  '<p>Full content for elections.</p>',
  id,
  'published',
  now() - interval '2 hours',
  'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=2070&auto=format&fit=crop',
  'https://example.com/politics'
FROM public.categories WHERE slug = 'politics'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.articles (title, slug, summary, content, category_id, status, published_at, featured_image, source_url)
SELECT 
  'New Tech Hub Announced in Bhopal',
  'bhopal-tech-hub-' || substr(md5(random()::text), 1, 6),
  'The Chief Minister today laid the foundation stone for a massive 500-acre IT park in the capital.',
  '<p>Full content for IT park.</p>',
  id,
  'published',
  now() - interval '5 hours',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop',
  'https://example.com/mp'
FROM public.categories WHERE slug = 'madhya-pradesh'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.articles (title, slug, summary, content, category_id, status, published_at, featured_image, source_url)
SELECT 
  'Team India Clinches Historic Series Victory',
  'india-series-victory-' || substr(md5(random()::text), 1, 6),
  'A stunning performance by the middle order secured a 3-1 series win overseas.',
  '<p>Full content for sports.</p>',
  id,
  'published',
  now() - interval '1 day',
  'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2069&auto=format&fit=crop',
  'https://example.com/sports'
FROM public.categories WHERE slug = 'sports'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.articles (title, slug, summary, content, category_id, status, published_at, featured_image, source_url)
SELECT 
  'SpaceX Launches Revolutionary Satellite',
  'spacex-launch-' || substr(md5(random()::text), 1, 6),
  'The new satellite network promises gigabit speeds to the most remote corners of the globe.',
  '<p>Full content for space.</p>',
  id,
  'published',
  now() - interval '2 days',
  'https://images.unsplash.com/photo-1541185933-ef5d8ed016c2?q=80&w=2070&auto=format&fit=crop',
  'https://example.com/tech'
FROM public.categories WHERE slug = 'technology'
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.articles (title, slug, summary, content, category_id, status, published_at, featured_image, source_url)
SELECT 
  'Award Winning Director Announces Next Epic',
  'director-epic-' || substr(md5(random()::text), 1, 6),
  'The highly anticipated historical drama will begin filming in Rajasthan next month.',
  '<p>Full content for entertainment.</p>',
  id,
  'published',
  now() - interval '3 days',
  'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=2059&auto=format&fit=crop',
  'https://example.com/ent'
FROM public.categories WHERE slug = 'entertainment'
ON CONFLICT (slug) DO NOTHING;

-- Gallery Articles
INSERT INTO public.articles (title, slug, summary, content, category_id, status, published_at, featured_image, source_url)
SELECT 
  'In Pictures: The Great Migration',
  'in-pictures-' || substr(md5(random()::text), 1, 6),
  'Stunning photos of the annual wildlife migration.',
  '<p>Full content.</p>',
  id,
  'published',
  now(),
  'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=2068&auto=format&fit=crop',
  'https://example.com/gallery1'
FROM public.categories WHERE slug = 'world'
ON CONFLICT (slug) DO NOTHING;

-- Duplicate a few times to fill grids
INSERT INTO public.articles (title, slug, summary, content, category_id, status, published_at, featured_image, source_url)
SELECT title || ' (Update)', slug || '-up', summary, content, category_id, status, published_at - interval '1 hour', featured_image, source_url 
FROM public.articles;

-- 4. Seed Standard RSS Feeds
INSERT INTO public.rss_feeds (name, url, default_category_id, is_active)
SELECT 'Google News Top Stories', 'https://news.google.com/rss?hl=en-IN&gl=IN&ceid=IN:en', id, true FROM public.categories WHERE slug = 'india'
UNION ALL
SELECT 'BBC World News', 'http://feeds.bbci.co.uk/news/world/rss.xml', id, true FROM public.categories WHERE slug = 'world'
UNION ALL
SELECT 'AP Top News', 'https://apnews.com/index.rss', id, true FROM public.categories WHERE slug = 'world'
ON CONFLICT DO NOTHING;
