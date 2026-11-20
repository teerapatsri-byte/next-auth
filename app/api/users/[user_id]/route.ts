import { connect } from "@/lib/mysql_connect";

interface User {
  user_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> },
) {
  try {
    const { user_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM users WHERE user_id = ?",
      [user_id],
    )) as [User[], any];

    const user = rows[0];

    return Response.json({
      message: "ดึงข้อมูลผู้ใช้งานสำเร็จ",
      user: user,
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้งาน",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> },
) {
  try {
    const { user_id } = await params;
    const { username, phone, role, is_active } = await req.json();

    await connect.query(
      "UPDATE users SET username = ?  , phone = ?  , role = ? , is_active = ?  , updated_at = ? WHERE user_id = ? ",
      [username, phone, role, is_active, new Date(), user_id],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขผู้ใช้งาน",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ user_id: string }> },
) {
  try {
    const { user_id } = await params;

    await connect.query("DELETE  FROM users WHERE user_id = ?", [user_id]);

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลผู้ใช้งาน",
      },
      { status: 500 },
    );
  }
}
