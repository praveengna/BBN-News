-- Custom types
CREATE TYPE user_role AS ENUM ('super_admin', 'admin', 'managing_editor', 'editor', 'video_editor', 'reporter', 'guest_author', 'reader');
CREATE TYPE article_status AS ENUM ('draft', 'review', 'scheduled', 'published', 'archived');

-- USERS (Extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'reader'::user_role NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- CATEGORIES
CREATE TABLE public.categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- TAGS
CREATE TABLE public.tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- AUTHORS (For bylines, could map to profiles but kept separate for guest authors)
CREATE TABLE public.authors (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  profile_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  bio TEXT,
  avatar_url TEXT,
  twitter_handle TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ARTICLES
CREATE TABLE public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  summary TEXT,
  content TEXT, -- rich text / HTML
  featured_image TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES public.authors(id) ON DELETE SET NULL,
  city TEXT,
  district TEXT,
  status article_status DEFAULT 'draft'::article_status NOT NULL,
  seo_title TEXT,
  seo_description TEXT,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  assigned_to UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  due_date TIMESTAMPTZ,
  is_auto_generated BOOLEAN DEFAULT false,
  source_url TEXT UNIQUE -- Prevent duplicate imports and provide attribution
);

-- ARTICLE REVISIONS (Version Control)
CREATE TABLE public.article_revisions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  content_snapshot TEXT NOT NULL,
  revision_note TEXT,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- NEWSROOM ACTIVITY LOGS
CREATE TABLE public.activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  target_type TEXT,
  target_id UUID,
  details JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RSS FEEDS (For automated aggregation)
CREATE TABLE public.rss_feeds (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  default_category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  is_active BOOLEAN DEFAULT true,
  last_fetched_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- RSS LOGS
CREATE TABLE public.rss_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  feed_id UUID REFERENCES public.rss_feeds(id) ON DELETE CASCADE,
  status TEXT NOT NULL, -- 'success', 'error'
  items_processed INTEGER DEFAULT 0,
  items_added INTEGER DEFAULT 0,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- ARTICLE TAGS (Many-to-many)
CREATE TABLE public.article_tags (
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

-- VIDEOS
CREATE TABLE public.videos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  youtube_id TEXT,
  duration TEXT, -- e.g. "12:34"
  views INTEGER DEFAULT 0,
  thumbnail_url TEXT,
  category_id UUID REFERENCES public.categories(id) ON DELETE SET NULL,
  status article_status DEFAULT 'draft'::article_status NOT NULL,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- COMMENTS
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- BOOKMARKS
CREATE TABLE public.bookmarks (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  PRIMARY KEY (user_id, article_id)
);

-- VIEWS (Analytics)
CREATE TABLE public.views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES public.articles(id) ON DELETE CASCADE,
  viewer_ip TEXT,
  viewed_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- BREAKING NEWS
CREATE TABLE public.breaking_news (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  created_by UUID REFERENCES public.profiles(id) ON DELETE SET NULL
);

-- SITE SETTINGS
CREATE TABLE public.site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);


-- ROW LEVEL SECURITY (RLS) POLICIES

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.article_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.breaking_news ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_feeds ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.rss_logs ENABLE ROW LEVEL SECURITY;

ALTER TABLE public.article_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Helper function to check roles
CREATE OR REPLACE FUNCTION public.check_user_role(required_role text)
RETURNS boolean AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() 
    AND (role::text = required_role OR role::text IN ('admin', 'super_admin'))
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles: Anyone can read their own, admin can read all
CREATE POLICY "Users can read own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Admins can manage all profiles" ON public.profiles FOR ALL USING (public.check_user_role('admin'));

-- Article Revisions: Editors+ can manage, Reporters can read/write their own article revisions
CREATE POLICY "Editors manage revisions" ON public.article_revisions FOR ALL USING (public.check_user_role('editor'));
CREATE POLICY "Reporters insert revisions" ON public.article_revisions FOR INSERT WITH CHECK (public.check_user_role('reporter') AND auth.uid() = created_by);
CREATE POLICY "Reporters read own article revisions" ON public.article_revisions FOR SELECT USING (public.check_user_role('reporter'));

-- Activity Logs: Admins read all, Editors read all, System inserts
CREATE POLICY "Editors read activity logs" ON public.activity_logs FOR SELECT USING (public.check_user_role('editor'));
CREATE POLICY "Users insert activity logs" ON public.activity_logs FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Taxonomies: Public read, Editor+ write
CREATE POLICY "Public read categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Editor+ manage categories" ON public.categories FOR ALL USING (public.check_user_role('editor'));

CREATE POLICY "Public read tags" ON public.tags FOR SELECT USING (true);
CREATE POLICY "Editor+ manage tags" ON public.tags FOR ALL USING (public.check_user_role('editor'));

CREATE POLICY "Public read authors" ON public.authors FOR SELECT USING (true);
CREATE POLICY "Editor+ manage authors" ON public.authors FOR ALL USING (public.check_user_role('editor'));

-- Articles: Public read published, Reporter+ write (with status checks)
CREATE POLICY "Public read published articles" ON public.articles FOR SELECT USING (status = 'published');
CREATE POLICY "Reporters can read all articles" ON public.articles FOR SELECT USING (public.check_user_role('reporter'));
CREATE POLICY "Reporters can insert articles" ON public.articles FOR INSERT WITH CHECK (public.check_user_role('reporter') AND auth.uid() = created_by);
CREATE POLICY "Reporters can update own articles" ON public.articles FOR UPDATE USING (public.check_user_role('reporter') AND auth.uid() = created_by);
CREATE POLICY "Editors can manage all articles" ON public.articles FOR ALL USING (public.check_user_role('editor'));

-- Videos: Public read published, Editor+ write
CREATE POLICY "Public read published videos" ON public.videos FOR SELECT USING (status = 'published');
CREATE POLICY "Editors manage videos" ON public.videos FOR ALL USING (public.check_user_role('editor'));

-- Breaking News: Public read active, Editor+ manage
CREATE POLICY "Public read active breaking news" ON public.breaking_news FOR SELECT USING (is_active = true);
CREATE POLICY "Editors manage breaking news" ON public.breaking_news FOR ALL USING (public.check_user_role('editor'));

-- Settings: Public read, Admin manage
CREATE POLICY "Public read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins manage settings" ON public.site_settings FOR ALL USING (public.check_user_role('admin'));

-- Bookmarks: Users manage their own
CREATE POLICY "Users manage own bookmarks" ON public.bookmarks FOR ALL USING (auth.uid() = user_id);

-- Comments: Public read approved, Users write
CREATE POLICY "Public read approved comments" ON public.comments FOR SELECT USING (is_approved = true);
CREATE POLICY "Users insert comments" ON public.comments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Editors manage comments" ON public.comments FOR ALL USING (public.check_user_role('editor'));

-- Views: Public insert, Admin read
CREATE POLICY "Public insert views" ON public.views FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read views" ON public.views FOR SELECT USING (public.check_user_role('admin'));

-- RSS: Admins manage, service role manages
CREATE POLICY "Admins manage rss feeds" ON public.rss_feeds FOR ALL USING (public.check_user_role('admin'));
CREATE POLICY "Admins manage rss logs" ON public.rss_logs FOR ALL USING (public.check_user_role('admin'));
