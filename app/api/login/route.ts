// app/api/login/route.ts
import { loginUser } from "@/lib/loginUser";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await loginUser(email, password);

    if (!user) {
      return Response.json(
        { message: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 },
      );
    }

    return Response.json({
      message: "เข้าสู่ระบบสำเร็จ",
      user,
    });
  } catch (error) {
    console.error("Error during login:", error);
    return Response.json(
      { message: "เกิดข้อผิดพลาดในการเข้าสู่ระบบ" },
      { status: 500 },
    );
  }
}