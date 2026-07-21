import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileEdit, Trash2, Plus, MonitorPlay, Video } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function AdminVideosPage() {
  const supabase = await createClient()
  const { data: videos, error } = await supabase.from('videos').select('*').order('created_at', { ascending: false })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Videos</h2>
          <p className="text-muted-foreground mt-1">Manage video content, YouTube embeds, and MP4 uploads.</p>
        </div>
        <Link href="/admin/videos/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> New Video
          </Button>
        </Link>
      </div>

      <div className="flex items-center justify-between gap-4">
        <Input placeholder="Search videos..." className="max-w-sm" />
        <div className="flex gap-2">
          <select className="flex h-9 w-40 rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
            <option value="all">All Categories</option>
            <option value="politics">Politics</option>
            <option value="sports">Sports</option>
          </select>
        </div>
      </div>

      <div className="border rounded-md bg-background overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead className="w-[40%]">Title</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Views</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!videos || videos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No videos found. Click 'New Video' to add one.
                </TableCell>
              </TableRow>
            ) : (
              videos.map(video => (
                <TableRow key={video.id}>
                  <TableCell>
                    {video.type === 'youtube' ? (
                      <div className="bg-red-100 text-red-600 p-2 rounded w-fit"><MonitorPlay className="w-4 h-4" /></div>
                    ) : (
                      <div className="bg-blue-100 text-blue-600 p-2 rounded w-fit"><Video className="w-4 h-4" /></div>
                    )}
                  </TableCell>
                  <TableCell className="font-medium">{video.title}</TableCell>
                  <TableCell>{video.category}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{video.duration}</TableCell>
                  <TableCell className="text-muted-foreground text-sm">{video.views || 0}</TableCell>
                  <TableCell>
                    <Badge variant={video.status === 'published' ? 'default' : 'secondary'}>
                      {video.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon">
                        <FileEdit className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="text-red-500">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
