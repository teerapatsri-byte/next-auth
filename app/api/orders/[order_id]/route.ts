import { connect } from "@/lib/mysql_connect";

interface Order {
  user_id: string;
  product_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ order_id: string }> },
) {
  try {
    const { order_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM orders WHERE order_id = ?",
      [order_id],
    )) as [Order[], any];

    const product = rows[0];

    return Response.json({
      message: "ดึงข้อมูลออเดอร์สำเร็จ",
      product: product,
    });
  } catch (error) {
    console.error("Error during order:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลออเดอร์",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ order_id: string }> },
) {
  try {
    const { order_id } = await params;
    const { user_id, product_id } = await req.json();

    await connect.query(
      "UPDATE orders SET user_id = ? , product_id  = ? , updated_at = ? WHERE order_id = ? ",
      [user_id, product_id, new Date(), order_id],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during orders:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขออเดอร์",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ order_id: string }> },
) {
  try {
    const { order_id } = await params;

    await connect.query("DELETE  FROM orders WHERE order_id = ?", [order_id]);

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลออเดอร์",
      },
      { status: 500 },
    );
  }
}
