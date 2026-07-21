-- Phase 1 Schema Expansion for BBN NEWS Production Audit

-- 1. Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    site_name TEXT NOT NULL DEFAULT 'BBN NEWS',
    site_description TEXT,
    logo_url TEXT,
    social_links JSONB DEFAULT '{}'::jsonb,
    contact_email TEXT,
    contact_phone TEXT,
    rss_refresh_interval INTEGER DEFAULT 15,
    retention_days INTEGER DEFAULT 30,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Ensure only one row exists for global settings
CREATE UNIQUE INDEX IF NOT EXISTS settings_single_row ON public.settings ((true));

-- Insert default row if not exists
INSERT INTO public.settings (site_name, site_description, contact_email)
SELECT 'BBN NEWS', 'Delivering accurate, unbiased, and comprehensive news coverage.', 'contact@bbnnews.in'
WHERE NOT EXISTS (SELECT 1 FROM public.settings);

-- 2. Locations Table
CREATE TABLE IF NOT EXISTS public.locations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    type TEXT NOT NULL CHECK (type IN ('state', 'district', 'city')),
    parent_id UUID REFERENCES public.locations(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. User Saved Articles
CREATE TABLE IF NOT EXISTS public.saved_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, article_id)
);

-- 4. User Preferences
CREATE TABLE IF NOT EXISTS public.user_preferences (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE,
    theme TEXT DEFAULT 'system',
    email_notifications BOOLEAN DEFAULT true,
    preferred_categories JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Activity Logs (if it needs updating, we ensure it exists)
CREATE TABLE IF NOT EXISTS public.activity_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- RLS Policies
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activity_logs ENABLE ROW LEVEL SECURITY;

-- Settings: Read-only for public, all for authenticated admins (assuming admin role or similar, for now all auth users)
CREATE POLICY "Public read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Auth users full access settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');

-- Locations: Read-only for public, all for auth users
CREATE POLICY "Public read locations" ON public.locations FOR SELECT USING (true);
CREATE POLICY "Auth users full access locations" ON public.locations FOR ALL USING (auth.role() = 'authenticated');

-- Saved Articles: Users can only see and manage their own
CREATE POLICY "Users can manage their own saved articles" ON public.saved_articles 
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- User Preferences: Users can manage their own
CREATE POLICY "Users can manage their own preferences" ON public.user_preferences 
FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- Activity Logs: Only authenticated users can insert and read
CREATE POLICY "Auth users can read activity logs" ON public.activity_logs FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth users can insert activity logs" ON public.activity_logs FOR INSERT WITH CHECK (auth.role() = 'authenticated');
