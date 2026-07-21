export function AdSlot({ type = "mpu", className = "" }: { type?: "mpu" | "leaderboard", className?: string }) {
  const dimensions = type === "leaderboard" ? "w-full max-w-[728px] h-[90px]" : "w-[300px] h-[250px]"
  
  return (
    <div className={`bg-muted border border-border flex items-center justify-center text-xs text-muted-foreground font-mono mx-auto ${dimensions} ${className}`}>
      Advertisement Placeholder
    </div>
  )
}
