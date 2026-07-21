"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, AlertCircle } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"

export function BreakingNewsPopup() {
  const [isVisible, setIsVisible] = useState(false)
  const [breakingStory, setBreakingStory] = useState<{title: string, url: string} | null>(null)

  useEffect(() => {
    async function fetchBreakingNews() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('articles')
        .select('title, slug, published_at')
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(1)
        .single()

      if (!error && data) {
        // Consider it "breaking" only if it's less than 3 hours old
        const diffHours = (new Date().getTime() - new Date(data.published_at).getTime()) / (1000 * 60 * 60)
        if (diffHours < 3) {
          setBreakingStory({
            title: data.title,
            url: `/article/${data.slug}`
          })
          // Small delay before popping up
          setTimeout(() => setIsVisible(true), 2000)
        }
      }
    }

    fetchBreakingNews()
  }, [])

  return (
    <AnimatePresence>
      {isVisible && breakingStory && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:w-96 bg-red-600 text-white shadow-2xl rounded-xl overflow-hidden z-50 border border-red-500"
        >
          <div className="p-4 flex items-start gap-4">
            <div className="shrink-0 mt-1 animate-pulse">
              <AlertCircle className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold uppercase tracking-wider text-xs mb-1 text-red-200">Breaking News</h4>
              <Link href={breakingStory.url} onClick={() => setIsVisible(false)}>
                <p className="font-heading font-bold text-lg leading-tight hover:underline cursor-pointer">
                  {breakingStory.title}
                </p>
              </Link>
            </div>
            <button 
              onClick={() => setIsVisible(false)}
              className="shrink-0 text-red-200 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          {/* Progress Bar (Auto dismiss after 15 seconds) */}
          <motion.div 
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 15, ease: "linear" }}
            onAnimationComplete={() => setIsVisible(false)}
            className="h-1 bg-red-800"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
