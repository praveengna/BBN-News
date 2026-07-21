"use client"

import { TrendingUp, TrendingDown, CloudRain, Sun } from "lucide-react"

export function TopBar() {
  return (
    <div className="w-full bg-muted/40 border-b text-xs py-1">
      <div className="container mx-auto px-4 md:px-6 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 overflow-hidden whitespace-nowrap">
          <div className="flex items-center gap-2 font-mono">
            <span className="font-bold">BSE SENSEX</span>
            <span>72,500.00</span>
            <span className="text-green-600 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+1.2%</span>
          </div>
          <div className="flex items-center gap-2 font-mono hidden sm:flex">
            <span className="font-bold">NIFTY 50</span>
            <span>22,100.00</span>
            <span className="text-green-600 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+0.9%</span>
          </div>
          <div className="flex items-center gap-2 font-mono hidden md:flex">
            <span className="font-bold">S&P 500</span>
            <span>5,100.00</span>
            <span className="text-red-600 flex items-center"><TrendingDown className="w-3 h-3 mr-1" />-0.4%</span>
          </div>
          <div className="flex items-center gap-2 font-mono hidden lg:flex">
            <span className="font-bold">GOLD</span>
            <span>$2,050.00</span>
            <span className="text-green-600 flex items-center"><TrendingUp className="w-3 h-3 mr-1" />+0.1%</span>
          </div>
        </div>
        
        <div className="flex items-center gap-4 shrink-0">
          <div className="flex items-center gap-2 font-semibold">
            <Sun className="w-4 h-4 text-yellow-500" />
            <span>New Delhi 28°C</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 font-semibold border-l pl-4">
            <CloudRain className="w-4 h-4 text-blue-400" />
            <span>London 14°C</span>
          </div>
        </div>
      </div>
    </div>
  )
}
