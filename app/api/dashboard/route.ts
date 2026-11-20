import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const [userRows] = (await connect.query(
      "SELECT COUNT(user_id) as countUser FROM users",
    )) as [{ countUser: number }[], any];

    const user = userRows[0];

    return Response.json({
      message: "ดึงข้อมูลสำเร็จ",
      stats: [{ title: "จำนวนผู้ใช้งาน", value: user.countUser + " " + "คน" }],
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
