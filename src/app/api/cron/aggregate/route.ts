import { NextResponse } from 'next/server'
import { runRSSAggregation } from '@/lib/aggregation/rss'

// Shared auth check - accepts either Bearer token or ?secret= query param
function isAuthorized(request: Request): boolean {
  const cronSecret = process.env.CRON_SECRET

  // If no secret is configured, allow in development only
  if (!cronSecret) {
    return process.env.NODE_ENV === 'development'
  }

  // Check Authorization header (Bearer token)
  const authHeader = request.headers.get('authorization')
  if (authHeader === `Bearer ${cronSecret}`) return true

  // Check ?secret= query param (for simple GET-based cron services)
  const url = new URL(request.url)
  if (url.searchParams.get('secret') === cronSecret) return true

  return false
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const result = await runRSSAggregation()
    if (result.error) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
    return NextResponse.json({ success: true, ...result })
  } catch (error: any) {
    console.error('Cron Aggregation Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// GET is supported in all environments — secured via secret param or Bearer token
export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return new NextResponse('Unauthorized - pass ?secret=YOUR_CRON_SECRET or Authorization: Bearer header', { status: 401 })
  }

  try {
    const result = await runRSSAggregation()
    if (result.error) {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 })
    }
    return NextResponse.json({ success: true, ...result })
  } catch (error: any) {
    console.error('Cron Aggregation Error:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}
