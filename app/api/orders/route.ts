import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const [rows] = await connect.query("SELECT * FROM orders LIMIT 10");

    return Response.json({
      message: "ดึงข้อมูลออเดอร์สำเร็จ",
      orders: rows,
    });
  } catch (error) {
    console.error("Error during orders:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { user_id, product_id } = await req.json();

    await connect.query(
      "INSERT INTO orders (user_id, product_id , created_at) VALUES (? , ? , ?)",
      [user_id, product_id, new Date()],
    );

    return Response.json({
      message: "เพิ่มข้อมูลออเดอร์สำเร็จ",
    });
  } catch (error) {
    console.error("Error during orders:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการเพิ่มออเดอร์",
      },
      { status: 500 },
    );
  }
}
