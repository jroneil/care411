
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    return NextResponse.json({
      message: 'Signup temporarily disabled while authentication is offline',
      user: {
        id: 'temp-user',
        email,
        role: 'ADMIN',
      }
    })
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
