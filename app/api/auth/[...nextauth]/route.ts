// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { loginUser } from "@/lib/loginUser";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const email = credentials?.email;
          const password = credentials?.password;

          if (!email || !password) return null;

          const user = await loginUser(email, password);
          return user ?? null;
        } catch (e) {
          console.error("authorize error:", e);
          return null;
        }
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
  callbacks: {
    async redirect({ url, baseUrl }) {
      // ถ้า url ที่ขอ redirect เป็น relative path (ขึ้นต้นด้วย /) ให้ไปที่ domain ปัจจุบัน (baseUrl)
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // ถ้า url เป็น absolute URL แต่ origin ตรงกับ baseUrl ก็ให้ไปได้
      else if (new URL(url).origin === baseUrl) return url;
      // ถ้าไม่ตรงเลย (เช่น domain แปลกปลอม) บังคับกลับ baseUrl เพื่อความปลอดภัย
      return baseUrl;
    },
  },
});

export { handler as GET, handler as POST };
