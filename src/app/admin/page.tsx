import { getAdminStats, getAdminArticles } from "@/lib/api/articles"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, FileText, Eye, Clock, CheckCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function AdminDashboard() {
  const stats = await getAdminStats()
  const latestArticles = await getAdminArticles()
  const recentDrafts = latestArticles.filter(a => a.status === 'draft').slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard Overview</h2>
        <Link href="/admin/articles/new">
          <Button>New Article</Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Review (Drafts)</CardTitle>
            <Eye className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.drafts}</div>
            <p className="text-xs text-muted-foreground">Awaiting editorial approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scheduled</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.scheduled}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Needs Attention (Editorial Queue)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentDrafts.length === 0 ? (
                <p className="text-sm text-muted-foreground">No drafts awaiting review.</p>
              ) : (
                recentDrafts.map(article => (
                  <div key={article.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg border-l-4 border-orange-500">
                    <div>
                      <p className="font-medium line-clamp-1">{article.title || 'Untitled Article'}</p>
                      <p className="text-xs text-muted-foreground">
                        Draft created on {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <Link href={`/admin/articles/${article.id}`}>
                      <Button variant="outline" size="sm">Review</Button>
                    </Link>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Activity Log</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground border-b pb-2">System online. No recent manual actions to display.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
