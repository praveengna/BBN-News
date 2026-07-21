import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save, Send, Image as ImageIcon, History, Type, Bold, Italic, Link2, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { getCategories, getAuthors } from "@/lib/api/taxonomies"

export default async function NewArticlePage() {
  const categories = await getCategories()
  const authors = await getAuthors()

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/articles">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <h2 className="text-3xl font-bold tracking-tight">Create Article</h2>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-sm text-muted-foreground mr-4">
            <CheckCircle2 className="w-4 h-4 text-green-500" /> Autosaved just now
          </div>
          <Button variant="outline" className="gap-2">
            <History className="w-4 h-4" /> Revisions
          </Button>
          <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Send className="w-4 h-4" /> Submit for Review
          </Button>
        </div>
      </div>

      <form className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Title</label>
                <Input placeholder="Breaking News Headline" className="text-lg font-bold" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Summary / Excerpt</label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Brief summary for the homepage..."
                />
              </div>
              <div className="border rounded-md overflow-hidden">
                {/* Mock Rich Text Toolbar */}
                <div className="bg-muted/50 border-b p-2 flex items-center gap-1">
                  <Button variant="ghost" size="icon" type="button" className="h-8 w-8"><Type className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" type="button" className="h-8 w-8"><Bold className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" type="button" className="h-8 w-8"><Italic className="w-4 h-4" /></Button>
                  <div className="w-px h-4 bg-border mx-1" />
                  <Button variant="ghost" size="icon" type="button" className="h-8 w-8"><Link2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" type="button" className="h-8 w-8"><ImageIcon className="w-4 h-4" /></Button>
                </div>
                <textarea 
                  className="flex min-h-[400px] w-full bg-transparent px-4 py-4 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none resize-none"
                  placeholder="Support for Rich Text and Markdown..."
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>SEO Optimization</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">SEO Title</label>
                <Input placeholder="Leave blank to use article title" />
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Meta Description</label>
                <textarea 
                  className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  placeholder="Search engine snippet..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Status</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="draft">Draft</option>
                  <option value="review">Awaiting Review</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="published">Published</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Assignee (Reporter)</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="">Unassigned</option>
                  <option value="user_id_1">Jane Doe</option>
                  <option value="user_id_2">John Smith</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Category</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="">Select a category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block">Byline (Author Display)</label>
                <select className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option value="">Select an author</option>
                  {authors.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                </select>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Media Manager</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-muted/50 transition-colors">
                <ImageIcon className="w-8 h-8 text-muted-foreground mb-2" />
                <p className="text-sm font-medium">Click to upload Featured Image</p>
                <p className="text-xs text-muted-foreground">Supports JPG, PNG, WEBP</p>
              </div>
              <div>
                <label className="text-sm font-medium mb-1 block text-muted-foreground">Or image URL</label>
                <Input placeholder="https://..." />
              </div>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}
