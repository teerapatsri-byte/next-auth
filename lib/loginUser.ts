// lib/loginUser.ts
import { connect } from "@/lib/mysql_connect";
import { compare } from "bcrypt-ts";

interface User {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export async function loginUser(email: string, password: string) {
  if (!email || !password) {
    return null;
  }

  const [rows] = (await connect.query(
    "SELECT first_name, last_name, email, password FROM users WHERE email = ?",
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
    email: user.email,
    name: user.first_name + " " + user.last_name,
  };
}