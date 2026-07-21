"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Search, FileText, User, MapPin } from "lucide-react"

export function CommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 50)
    }
  }, [open])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      setOpen(false)
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const performQuickSearch = (term: string) => {
    setOpen(false)
    router.push(`/search?q=${encodeURIComponent(term)}`)
  }

  if (!open) return null

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 transition-opacity" 
        onClick={() => setOpen(false)}
      />
      <div className="fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] bg-zinc-950 border border-zinc-800 shadow-2xl rounded-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-white">
        
        <form onSubmit={handleSearch} className="flex items-center px-4 py-4 border-b border-zinc-800">
          <Search className="w-5 h-5 text-zinc-500 mr-3" />
          <input
            ref={inputRef}
            className="flex-1 bg-transparent border-none outline-none text-lg placeholder:text-zinc-500"
            placeholder="Search news, topics, reporters..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="flex gap-1">
            <kbd className="bg-zinc-800 text-zinc-400 px-2 py-1 rounded text-xs font-medium font-sans">ESC</kbd>
          </div>
        </form>

        <div className="p-4 max-h-[60vh] overflow-y-auto custom-scrollbar">
          {!query ? (
            <div className="text-center py-8 text-zinc-500">
              <p>Start typing to search news, topics, or reporters...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2">Suggestions</h3>
              <ul className="space-y-1">
                <li>
                  <button onClick={() => performQuickSearch(query)} className="w-full text-left flex items-center px-2 py-3 rounded-md hover:bg-zinc-900 transition-colors">
                    <FileText className="w-4 h-4 mr-3 text-zinc-400" />
                    <div>
                      <div className="text-sm font-medium">Search for &quot;{query}&quot; in Articles</div>
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => performQuickSearch(query)} className="w-full text-left flex items-center px-2 py-3 rounded-md hover:bg-zinc-900 transition-colors">
                    <User className="w-4 h-4 mr-3 text-zinc-400" />
                    <div>
                      <div className="text-sm font-medium">Search for &quot;{query}&quot; in Reporters</div>
                    </div>
                  </button>
                </li>
                <li>
                  <button onClick={() => performQuickSearch(query)} className="w-full text-left flex items-center px-2 py-3 rounded-md hover:bg-zinc-900 transition-colors">
                    <MapPin className="w-4 h-4 mr-3 text-zinc-400" />
                    <div>
                      <div className="text-sm font-medium">Search for &quot;{query}&quot; in Locations</div>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
        
        <div className="bg-zinc-900/50 p-3 border-t border-zinc-800 text-xs text-zinc-500 flex items-center justify-between">
          <span>Search powered by BBN News Engine</span>
          <div className="flex gap-4">
            <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1.5 rounded">↑</kbd> <kbd className="bg-zinc-800 px-1.5 rounded">↓</kbd> to navigate</span>
            <span className="flex items-center gap-1"><kbd className="bg-zinc-800 px-1.5 rounded">↵</kbd> to select</span>
          </div>
        </div>
      </div>
    </>
  )
}
