import Link from "next/link"
import { AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 md:px-6 py-24 flex flex-col items-center justify-center text-center min-h-[50vh]">
      <AlertTriangle className="w-24 h-24 text-primary mb-8" />
      <h1 className="font-heading text-6xl md:text-8xl font-bold mb-4">404</h1>
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Page Not Found</h2>
      <p className="text-muted-foreground text-lg mb-10 max-w-md">
        The news article or page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Link href="/">
        <Button size="lg" className="px-8 font-bold uppercase tracking-wider">
          Return to Homepage
        </Button>
      </Link>
    </div>
  )
}
