import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const BASE_URL = process.env.NEXTAUTH_URL ?? "http://localhost:3000";
        const res = await fetch(BASE_URL + "/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        console.log("login status:", res.status);
        const text = await res.text();
        console.log("login body:", text); // ดูว่าเป็น JSON จริงไหม หรือเป็นหน้า Vercel protection

        const result = JSON.parse(text);
        const user = result.user;

        if (res.ok && user) return user;
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
});

export { handler as GET, handler as POST };
