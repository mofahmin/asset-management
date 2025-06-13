/*import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
//import { PrismaAdapter } from "@next-auth/prisma-adapter"
//import prisma from "@/lib/prisma"

export const authOptions: NextAuthOptions = {
  //adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // In a real app, you would fetch the user from your database
        // For now, we'll simulate a successful login for demonstration
        const user = {
          id: "1",
          name: "Ahmad Bin Abdullah",
          email: "ahmad@example.com",
          role: "Pegawai Aset",
          masjidId: "1",
        }

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as any).role
        token.masjidId = (user as any).masjidId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
        session.user.role = token.role as string
        session.user.masjidId = token.masjidId as string
      }
      return session
    },
  },
}
*/
