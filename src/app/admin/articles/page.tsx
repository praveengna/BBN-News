import { getAdminArticles, deleteArticle } from "@/lib/api/articles"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { revalidatePath } from "next/cache"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { FileEdit, Trash2, Plus, UserPlus, CheckSquare } from "lucide-react"

export default async function AdminArticlesPage() {
  const articles = await getAdminArticles()

  async function handleDelete(formData: FormData) {
    "use server"
    const id = formData.get("id") as string
    if (id) {
      await deleteArticle(id)
      revalidatePath("/admin/articles")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Newsroom Management</h2>
          <p className="text-muted-foreground mt-1">Manage articles, editorial queue, and assignments.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" className="gap-2">
            <CheckSquare className="w-4 h-4" /> Bulk Actions
          </Button>
          <Link href="/admin/articles/new">
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> New Article
            </Button>
          </Link>
        </div>
      </div>

      <div className="border rounded-md bg-background">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[30px]"><input type="checkbox" className="rounded" /></TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Assignee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {articles.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                  No articles found. Create one to get started.
                </TableCell>
              </TableRow>
            ) : (
              articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell><input type="checkbox" className="rounded" /></TableCell>
                  <TableCell className="font-medium max-w-[250px] truncate">
                    {article.title}
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      article.status === 'published' ? 'default' : 
                      article.status === 'review' ? 'destructive' : 
                      article.status === 'draft' ? 'secondary' : 'outline'
                    }>
                      {article.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{article.categories?.name || 'Uncategorized'}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{article.authors?.name || 'Unassigned'}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    {new Date(article.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="ghost" size="icon" title="Assign Reporter">
                        <UserPlus className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Link href={`/admin/articles/${article.id}`}>
                        <Button variant="ghost" size="icon" title="Edit">
                          <FileEdit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <form action={handleDelete}>
                        <input type="hidden" name="id" value={article.id} />
                        <Button variant="ghost" size="icon" type="submit" title="Delete" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </form>
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
