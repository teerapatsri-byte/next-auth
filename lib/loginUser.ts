// lib/loginUser.ts
import { connect } from "@/lib/mysql_connect";
import { compare } from "bcrypt-ts";

interface User {
  user_id: number; // เพิ่มบรรทัดนี้
  username: string;
  email: string;
  password: string;
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    return null;
  }

  const [rows] = (await connect.query(
    "SELECT user_id, username , email, password FROM users WHERE email = ?", // เพิ่ม id
    [email],
  )) as [User[], any];

  const user = rows[0];

  if (!user) {
    return null;
  }

  const is_password = await compare(password, user.password);

  if (!is_password) {
    return null;
  }

  return {
    id: String(user.user_id), // NextAuth ต้องการ id เป็น string
    email: user.email,
    name: user.username,
  };
}
