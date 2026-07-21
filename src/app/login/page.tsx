"use client"

import { useState } from 'react'
import { login } from './actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock } from 'lucide-react'

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setIsLoading(true)
    setError(null)
    const result = await login(formData)
    if (result?.error) {
      setError(result.error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md p-8 bg-background rounded-lg shadow-lg border">
        <div className="flex justify-center mb-8">
          <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
            <Lock className="w-8 h-8" />
          </div>
        </div>
        <h1 className="text-2xl font-bold font-heading text-center mb-2 uppercase">BBN NEWS Staff</h1>
        <p className="text-muted-foreground text-center mb-8">Enter your credentials to access the newsroom.</p>
        
        <form action={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium" htmlFor="email">Email address</label>
            <Input id="email" name="email" type="email" placeholder="reporter@bbnnews.com" required className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium" htmlFor="password">Password</label>
            <Input id="password" name="password" type="password" required className="mt-1" />
          </div>
          
          {error && (
            <div className="p-3 bg-red-100 text-red-800 border border-red-200 rounded text-sm">
              {error}
            </div>
          )}
          
          <Button type="submit" className="w-full font-bold uppercase tracking-wider" disabled={isLoading}>
            {isLoading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>
        
        <div className="mt-6 text-center text-xs text-muted-foreground">
          Protected by Supabase Auth & RLS
        </div>
      </div>
    </div>
  )
}
