import { NextResponse } from 'next/server'
import { runRSSAggregation } from '@/lib/aggregation/rss'

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET

    // Secure the endpoint so only the authorized cron scheduler can run it
    if (authHeader !== `Bearer ${cronSecret}`) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

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

// Support GET for easy manual triggering if CRON_SECRET is not strict, 
// but we keep POST for best security practices. 
// We'll allow GET only in development for testing.
export async function GET(request: Request) {
  if (process.env.NODE_ENV !== 'development') {
    return new NextResponse('Method not allowed', { status: 405 })
  }
  
  const result = await runRSSAggregation()
  return NextResponse.json(result)
}
