"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MonitorPlay, Upload, Link as LinkIcon, Image as ImageIcon } from "lucide-react"

export default function NewVideoPage() {
  const [videoType, setVideoType] = useState<'youtube' | 'mp4'>('youtube')
  const [youtubeUrl, setYoutubeUrl] = useState("")
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null)

  const handleYoutubeExtract = () => {
    // Simple mock extraction
    const match = youtubeUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/)
    if (match && match[1]) {
      setThumbnailPreview(`https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`)
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Add Video</h2>
        <p className="text-muted-foreground mt-1">Import from YouTube or upload an MP4 directly.</p>
      </div>

      <div className="flex gap-4 border-b pb-4">
        <Button 
          variant={videoType === 'youtube' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setVideoType('youtube')}
        >
          <MonitorPlay className="w-4 h-4" /> YouTube Embed
        </Button>
        <Button 
          variant={videoType === 'mp4' ? 'default' : 'outline'} 
          className="gap-2"
          onClick={() => setVideoType('mp4')}
        >
          <Upload className="w-4 h-4" /> MP4 Upload
        </Button>
      </div>

      <form className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Video Title</label>
              <Input placeholder="Enter headline..." />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Category</label>
              <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option>Politics</option>
                <option>Crime</option>
                <option>Sports</option>
                <option>Business</option>
                <option>Technology</option>
              </select>
            </div>

            {videoType === 'youtube' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium block">YouTube URL</label>
                <div className="flex gap-2">
                  <Input 
                    placeholder="https://youtube.com/watch?v=..." 
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                  />
                  <Button type="button" variant="secondary" onClick={handleYoutubeExtract}>Extract</Button>
                </div>
                <p className="text-xs text-muted-foreground">Thumbnail and ID will be extracted automatically.</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Video File (.mp4)</label>
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                    <Upload className="w-8 h-8 text-muted-foreground mb-2" />
                    <span className="font-medium">Click to upload MP4</span>
                    <span className="text-xs text-muted-foreground mt-1">Max 500MB</span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">Duration (Manual)</label>
                  <Input placeholder="e.g. 05:30" />
                </div>
              </div>
            )}

            <div>
              <label className="text-sm font-medium mb-2 block">Description</label>
              <textarea 
                className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Video description..."
              />
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Thumbnail</label>
              <div className="aspect-video w-full rounded-lg border overflow-hidden bg-muted flex items-center justify-center relative">
                {thumbnailPreview ? (
                  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${thumbnailPreview}')` }} />
                ) : (
                  <div className="text-center text-muted-foreground flex flex-col items-center">
                    <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
                    <span className="text-sm font-medium">No Thumbnail</span>
                  </div>
                )}
              </div>
              {videoType === 'mp4' && (
                <Button type="button" variant="outline" className="w-full mt-4 gap-2">
                  <Upload className="w-4 h-4" /> Upload Custom Thumbnail
                </Button>
              )}
            </div>
            
            <div className="bg-muted p-4 rounded-lg space-y-4">
              <h4 className="font-bold">Publishing</h4>
              <div className="flex gap-4">
                <Button className="flex-1">Publish Video</Button>
                <Button variant="outline" className="flex-1">Save Draft</Button>
              </div>
            </div>
          </div>

        </div>
      </form>
    </div>
  )
}
