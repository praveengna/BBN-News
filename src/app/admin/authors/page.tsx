import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getAuthors } from "@/lib/api/taxonomies"
import { Trash2, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { addAuthor, deleteAuthor } from "../actions"

export default async function AuthorsPage() {
  const authors = await getAuthors()

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Authors</h2>
          <p className="text-muted-foreground mt-1">Manage reporter and editor profiles.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4 border p-4 rounded-md bg-background">
          <h3 className="font-semibold text-lg">Add New Author</h3>
          <form action={addAuthor} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input name="name" placeholder="John Doe" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Bio</label>
              <textarea 
                name="bio"
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                placeholder="Author bio"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Twitter Handle</label>
              <Input name="twitter_handle" placeholder="@johndoe" />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Avatar URL</label>
              <Input name="avatar_url" placeholder="https://..." />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Plus className="w-4 h-4" /> Add Author
            </Button>
          </form>
        </div>

        <div className="md:col-span-2 border rounded-md bg-background overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Author</TableHead>
                <TableHead>Twitter</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!authors || authors.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No authors found.
                  </TableCell>
                </TableRow>
              ) : (
                authors.map((a: any) => (
                  <TableRow key={a.id}>
                    <TableCell className="font-medium flex items-center gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarImage src={a.avatar_url || ''} />
                        <AvatarFallback>{a.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      {a.name}
                    </TableCell>
                    <TableCell className="text-muted-foreground">{a.twitter_handle}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <form action={deleteAuthor.bind(null, a.id)}>
                          <Button type="submit" variant="ghost" size="icon" title="Delete" className="text-red-500 hover:text-red-600">
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
    </div>
  )
}
