import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Play, Plus, Trash2, Activity, RefreshCw } from "lucide-react"
import { createClient } from "@/lib/supabase/server"
import { addFeed, deleteFeed, toggleFeedStatus, triggerManualSync } from "./actions"

export default async function RSSManagerPage() {
  const supabase = await createClient()
  
  // Try to fetch feeds, but gracefully handle if schema isn't updated yet
  const { data: feeds, error } = await supabase
    .from('rss_feeds')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-6 max-w-[1400px]">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">RSS Aggregation</h2>
          <p className="text-muted-foreground mt-1">Manage automated news feeds. Engine runs dynamically based on feed intervals.</p>
        </div>
        <div className="flex gap-4">
          <form action={triggerManualSync}>
            <Button className="gap-2" variant="default" type="submit">
              <RefreshCw className="w-4 h-4" /> Force Sync All
            </Button>
          </form>
          <Button className="gap-2" variant="outline">
            <Activity className="w-4 h-4" /> View Logs
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md border border-red-200 mb-6">
          <p className="font-bold">Database Schema Error</p>
          <p className="text-sm">It looks like the RSS schema hasn't been updated yet. Please execute <code>supabase/schema_rss_update.sql</code> in your Supabase SQL Editor.</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1 space-y-4 border p-6 rounded-xl bg-card shadow-sm h-fit">
          <h3 className="font-semibold text-lg border-b pb-2">Add New Source</h3>
          <form action={addFeed} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Source Name</label>
              <Input name="name" placeholder="e.g. Times of India - World" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">RSS URL</label>
              <Input name="url" placeholder="https://..." type="url" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Publisher</label>
              <Input name="publisher" placeholder="e.g. Hindustan Times" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium mb-1 block">Country</label>
                <Input name="country" placeholder="India" defaultValue="India" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">State</label>
                <Input name="state" placeholder="Madhya Pradesh" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="text-sm font-medium mb-1 block">District</label>
                <Input name="district" placeholder="Guna" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <Input name="category_name" placeholder="Politics" />
              </div>
            </div>
            <Button type="submit" className="w-full gap-2 mt-4">
              <Plus className="w-4 h-4" /> Add Source
            </Button>
          </form>
        </div>

        <div className="lg:col-span-3 border rounded-xl bg-card shadow-sm overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Category/Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Errors</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(!feeds || feeds.length === 0) && (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                    No RSS feeds found. Add one to get started.
                  </TableCell>
                </TableRow>
              )}
              {feeds?.map(feed => (
                <TableRow key={feed.id}>
                  <TableCell>
                    <div className="font-bold">{feed.name}</div>
                    <div className="text-xs text-muted-foreground max-w-[200px] truncate">{feed.url}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{feed.category_name || feed.default_category_id || 'Auto'}</div>
                    {(feed.state || feed.district) && (
                      <div className="text-xs text-muted-foreground">{[feed.district, feed.state].filter(Boolean).join(', ')}</div>
                    )}
                  </TableCell>
                  <TableCell>
                    <form action={toggleFeedStatus.bind(null, feed.id, feed.is_active)}>
                      <button type="submit">
                        <Badge variant="default" className={feed.is_active ? "bg-green-600 hover:bg-green-700 cursor-pointer" : "bg-zinc-500 hover:bg-zinc-600 cursor-pointer"}>
                          {feed.is_active ? 'Active' : 'Disabled'}
                        </Badge>
                      </button>
                    </form>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {feed.last_fetched_at ? new Date(feed.last_fetched_at).toLocaleString() : 'Never'}
                    <div className="text-xs">{feed.status === 'error' ? 'Last fetch failed' : 'Success'}</div>
                  </TableCell>
                  <TableCell>
                    {feed.error_count > 0 ? (
                      <span className="text-red-500 font-bold">{feed.error_count}</span>
                    ) : (
                      <span className="text-green-500">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <form action={deleteFeed.bind(null, feed.id)}>
                        <Button type="submit" variant="ghost" size="icon" title="Delete" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/50">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
