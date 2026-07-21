import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { getTags } from "@/lib/api/taxonomies"
import { Trash2, Plus } from "lucide-react"
import { addTag, deleteTag } from "../actions"

export default async function TagsPage() {
  const tags = await getTags()

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tags</h2>
          <p className="text-muted-foreground mt-1">Manage article keywords and topics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-4 border p-4 rounded-md bg-background">
          <h3 className="font-semibold text-lg">Add New Tag</h3>
          <form action={addTag} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input name="name" placeholder="e.g. Elections" required />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Slug</label>
              <Input name="slug" placeholder="elections" required />
            </div>
            <Button type="submit" className="w-full gap-2">
              <Plus className="w-4 h-4" /> Add Tag
            </Button>
          </form>
        </div>

        <div className="md:col-span-2 border rounded-md bg-background overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {!tags || tags.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                    No tags found.
                  </TableCell>
                </TableRow>
              ) : (
                tags.map((t: any) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell className="text-muted-foreground">{t.slug}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <form action={deleteTag.bind(null, t.id)}>
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
