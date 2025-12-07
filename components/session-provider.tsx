
'use client'

import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

// Authentication is disabled, so we simply render children without
// setting up NextAuth.
export function SessionProvider({ children }: Props) {
  return <>{children}</>
}
