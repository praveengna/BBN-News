import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Save } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { updateSettings } from "../actions"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: settings } = await supabase.from('settings').select('*').single()

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Site Settings</h2>
          <p className="text-muted-foreground mt-1">Configure global platform behavior and SEO.</p>
        </div>
      </div>

      <form action={updateSettings} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
            <CardDescription>Basic details about the news platform.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Site Name</label>
              <Input name="site_name" defaultValue={settings?.site_name || "BBN NEWS"} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Site Tagline / Description</label>
              <Input name="site_description" defaultValue={settings?.site_description || "Global Premium Newsroom"} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Contact Email</label>
              <Input name="contact_email" defaultValue={settings?.contact_email || "bhaskarbreaking@gmail.com"} type="email" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>RSS Automation</CardTitle>
            <CardDescription>Configure the background news fetching engine.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-2">
              <label className="text-sm font-medium">Refresh Interval (Minutes)</label>
              <Input name="rss_refresh_interval" defaultValue={settings?.rss_refresh_interval || 15} type="number" min={5} />
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium">Article Retention Policy (Days)</label>
              <Input name="retention_days" defaultValue={settings?.retention_days || 30} type="number" min={1} />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" className="gap-2">
            <Save className="w-4 h-4" /> Save All Settings
          </Button>
        </div>
      </form>
    </div>
  )
}
