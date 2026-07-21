import Link from "next/link"
import { getUser } from "@/lib/api/auth"
import { redirect } from "next/navigation"
import { 
  LayoutDashboard, 
  FileText, 
  Video, 
  Users, 
  Tags, 
  Settings, 
  LogOut,
  Menu
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/login/actions"

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getUser()
  
  if (!user || !['admin', 'editor', 'reporter'].includes(user.role)) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-zinc-950 text-zinc-400 hidden md:flex flex-col border-r border-zinc-800">
        <div className="h-16 flex items-center px-6 border-b border-zinc-800 shrink-0">
          <Link href="/admin" className="font-heading text-xl font-bold tracking-tight text-white">
            BBN NEWS <span className="text-primary text-xs uppercase ml-1">{user.role}</span>
          </Link>
        </div>
        <nav className="flex-1 py-6 flex flex-col gap-2 px-3">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 hover:text-white transition-colors">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Link>
          <Link href="/admin/articles" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 hover:text-white transition-colors">
            <FileText className="w-4 h-4" /> Articles
          </Link>
          <Link href="/admin/media" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 hover:text-white transition-colors">
            <Video className="w-4 h-4" /> Media & Video
          </Link>
          
          {['admin', 'editor'].includes(user.role) && (
            <>
              <div className="mt-4 px-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Taxonomies</div>
              <Link href="/admin/categories" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 hover:text-white transition-colors">
                <Tags className="w-4 h-4" /> Categories
              </Link>
              <Link href="/admin/tags" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 hover:text-white transition-colors">
                <Tags className="w-4 h-4" /> Tags
              </Link>
              <Link href="/admin/authors" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 hover:text-white transition-colors">
                <Users className="w-4 h-4" /> Authors
              </Link>
              <div className="mt-4 px-3 text-xs font-bold uppercase tracking-wider text-zinc-600">Automation</div>
              <Link href="/admin/rss" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 hover:text-white transition-colors">
                <LayoutDashboard className="w-4 h-4" /> RSS Aggregator
              </Link>
            </>
          )}

          {user.role === 'admin' && (
            <>
              <div className="mt-4 px-3 text-xs font-bold uppercase tracking-wider text-zinc-600">System</div>
              <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2 rounded hover:bg-zinc-800 hover:text-white transition-colors">
                <Settings className="w-4 h-4" /> Site Settings
              </Link>
            </>
          )}
        </nav>
        <div className="p-4 border-t border-zinc-800 shrink-0">
          <form action={logout}>
            <Button variant="ghost" className="w-full justify-start text-zinc-400 hover:text-white hover:bg-zinc-800">
              <LogOut className="w-4 h-4 mr-3" /> Sign Out
            </Button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b bg-background shrink-0">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-5 h-5" />
            </Button>
            <h1 className="font-heading font-semibold text-lg hidden sm:block">Admin Console</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              Logged in as <strong className="text-foreground">{user.email}</strong>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
