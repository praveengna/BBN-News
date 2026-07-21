"use client"

import { useState, useEffect } from "react"
import { Type, Share2, MessageCircle, Bookmark, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

export function ArticleReadingBar() {
  const [fontSize, setFontSize] = useState(18) // base font size in px
  const [copied, setCopied] = useState(false)

  // In a real app, this would use a React context to set a CSS variable on the article container
  useEffect(() => {
    document.documentElement.style.setProperty('--article-font-size', `${fontSize}px`)
  }, [fontSize])

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="sticky top-16 z-40 bg-background/95 backdrop-blur border-b py-2 mb-8 -mx-4 px-4 md:mx-0 md:px-0 shadow-sm transition-all">
      <div className="container max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" onClick={() => setFontSize(Math.max(14, fontSize - 2))} title="Decrease Font Size" className="h-8 w-8 p-0">
            <Type className="w-3 h-3" />
            <span className="sr-only">Decrease Font</span>
          </Button>
          <Button variant="ghost" size="sm" onClick={() => setFontSize(Math.min(24, fontSize + 2))} title="Increase Font Size" className="h-8 w-8 p-0">
            <Type className="w-4 h-4" />
            <span className="sr-only">Increase Font</span>
          </Button>
        </div>

        <div className="flex items-center gap-1 md:gap-2">
          <div className="hidden md:flex items-center gap-1 mr-4 border-r pr-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-blue-600 hover:text-blue-700 hover:bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-sky-500 hover:text-sky-600 hover:bg-sky-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full text-blue-700 hover:text-blue-800 hover:bg-blue-50">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={copyLink}>
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
          </div>
          
          <Button variant="outline" size="sm" className="gap-2 h-8 rounded-full hidden sm:flex">
            <Bookmark className="w-4 h-4" /> Save
          </Button>
          <Button variant="default" size="sm" className="gap-2 h-8 rounded-full">
            <MessageCircle className="w-4 h-4" /> 
            <span className="hidden sm:inline">Comment</span>
            <span className="sm:hidden">24</span>
          </Button>
        </div>
      </div>
    </div>
  )
}
