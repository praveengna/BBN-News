"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

interface TOCItem {
  id: string
  text: string
  level: number
}

export function StickyTableOfContents() {
  const [headings, setHeadings] = useState<TOCItem[]>([])
  const [activeId, setActiveId] = useState<string>("")

  useEffect(() => {
    // In a real app with markdown, you'd extract headings from the AST.
    // For this prototype, we'll scan the DOM.
    const elements = Array.from(document.querySelectorAll('h2, h3'))
      .filter(el => el.id)
      .map(el => ({
        id: el.id,
        text: el.textContent || "",
        level: Number(el.tagName.substring(1))
      }))
    setTimeout(() => {
      setHeadings(elements)
    }, 0)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      { rootMargin: "0px 0px -80% 0px" }
    )

    elements.forEach(h => {
      const el = document.getElementById(h.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  if (headings.length === 0) return null

  return (
    <div className="sticky top-32 space-y-4">
      <h4 className="font-heading font-bold uppercase tracking-wider text-xs text-muted-foreground border-b pb-2">
        In This Article
      </h4>
      <nav className="space-y-2">
        {headings.map(h => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={cn(
              "block text-sm transition-colors hover:text-primary",
              h.level === 3 ? "ml-4" : "",
              activeId === h.id ? "text-primary font-bold" : "text-muted-foreground"
            )}
            onClick={(e) => {
              e.preventDefault()
              document.getElementById(h.id)?.scrollIntoView({ behavior: 'smooth' })
              setActiveId(h.id)
            }}
          >
            {h.text}
          </a>
        ))}
      </nav>
      
      {/* Sidebar Ad Placeholder */}
      <div className="mt-12 bg-muted/50 p-4 rounded-lg flex flex-col items-center justify-center text-center h-[250px] border border-dashed">
        <span className="text-xs uppercase text-muted-foreground font-bold tracking-wider mb-2">Advertisement</span>
        <div className="w-full h-full bg-zinc-200 dark:bg-zinc-800 rounded flex items-center justify-center">
          <span className="text-muted-foreground/50 font-bold">300 x 250</span>
        </div>
      </div>
    </div>
  )
}
