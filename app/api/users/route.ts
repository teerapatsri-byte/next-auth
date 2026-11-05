import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const { first_name, last_name, email } = Object.fromEntries(
      new URL(req.url).searchParams,
    );

    if (first_name || last_name || email) {
      const [filteredRows] = await connect.query(
        "SELECT * FROM users WHERE first_name LIKE ? OR last_name LIKE ? OR email LIKE ? LIMIT 10",
        [`%${first_name}%`, `%${last_name}%`, `%${email}%`],
      );
      return Response.json({
        message: "ดึงข้อมูลผู้ใช้งานสำเร็จ",
        users: filteredRows,
      });
    } else {
      const [rows] = await connect.query("SELECT * FROM users LIMIT 10");
      return Response.json({
        message: "ดึงข้อมูลผู้ใช้งานสำเร็จ",
        users: rows,
      });
    }
    
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
