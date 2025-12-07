import { NextAuthOptions } from 'next-auth'

// Authentication is disabled; this placeholder configuration prevents
// runtime errors if the options are imported elsewhere.
export const authOptions: NextAuthOptions = {
  providers: [],
  session: { strategy: 'jwt' },
}
