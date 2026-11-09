import { connect } from "@/lib/mysql_connect";
import { hash } from "bcrypt-ts";

export async function POST(req: Request) {
  try {
    const { username, email, password, phone } = await req.json();
    const hash_password = await hash(password, 10);

    await connect.query(
      "INSERT INTO users (username , email , password , phone , role , is_active , created_at) VALUES ( ? , ? , ? , ? , ? , ?  , ?)",
      [username, email, hash_password, phone, "admin", true, new Date()],
    );

    return Response.json({
      message: "สมัครสมาชิกสำเร็จ",
    });
  } catch (error) {
    console.error("Error during registration:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการสมัครสมาชิก",
      },
      { status: 500 },
    );
  }
}
