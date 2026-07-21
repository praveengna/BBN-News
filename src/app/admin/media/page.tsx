import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Upload, Video, Image as ImageIcon, Search } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function MediaLibraryPage() {
  const supabase = await createClient()
  
  // Try to fetch from a 'media' bucket. Fallback to empty if it doesn't exist yet.
  const { data: files } = await supabase.storage.from('media').list()
  
  const media = files?.filter(f => f.name !== '.emptyFolderPlaceholder').map(f => {
    const isVideo = f.metadata?.mimetype?.startsWith('video/')
    const url = supabase.storage.from('media').getPublicUrl(f.name).data.publicUrl
    return {
      id: f.id,
      name: f.name,
      type: isVideo ? 'video' : 'image',
      url
    }
  }) || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Media Library</h2>
          <p className="text-muted-foreground mt-1">Manage images, videos, and document uploads.</p>
        </div>
        <Button className="gap-2">
          <Upload className="w-4 h-4" /> Upload File
        </Button>
      </div>

      <div className="flex gap-4 items-center">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search media..." className="pl-9" />
        </div>
        <select className="flex h-9 w-[180px] rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          <option value="all">All Media</option>
          <option value="images">Images</option>
          <option value="videos">Videos</option>
        </select>
      </div>

      {media.length === 0 ? (
        <div className="text-center py-12 border rounded-md border-dashed">
          <p className="text-muted-foreground">No media found in the library.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {media.map((item) => (
            <Card key={item.id} className="overflow-hidden group relative cursor-pointer">
              <div className="aspect-square bg-muted relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                  style={{ backgroundImage: `url('${item.url}')` }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  {item.type === 'video' ? <Video className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 drop-shadow-md" /> : <ImageIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 drop-shadow-md" />}
                </div>
              </div>
              <CardContent className="p-2 border-t">
                <p className="text-xs font-medium truncate" title={item.name}>{item.name}</p>
              </CardContent>
            </Card>
          ))}
  
          <Card className="overflow-hidden border-dashed bg-transparent cursor-pointer hover:bg-muted/50 transition-colors flex flex-col items-center justify-center aspect-square text-muted-foreground hover:text-foreground">
            <Upload className="w-8 h-8 mb-2" />
            <span className="text-sm font-medium">Drop files here</span>
          </Card>
        </div>
      )}
    </div>
  )
}
