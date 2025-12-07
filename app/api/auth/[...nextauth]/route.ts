import { NextResponse } from 'next/server'

export function GET() {
  return NextResponse.json({ message: 'Authentication is temporarily disabled.' }, { status: 503 })
}

export function POST() {
  return NextResponse.json({ message: 'Authentication is temporarily disabled.' }, { status: 503 })
}
