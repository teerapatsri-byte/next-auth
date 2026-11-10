import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const [rows] = await connect.query(
      "SELECT * FROM shipment_items  LIMIT 10",
    );

    return Response.json({
      message: "ดึงข้อมูลสินค้าในรายการขนส่งสำเร็จ",
      shipment_items: rows,
    });
  } catch (error) {
    console.error("Error during shipment_items:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าในรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      shipment_id,
      description,
      quantity,
      unit_weight_kg,
      length_cm,
      width_cm,
      height_cm,
      is_fragile,
    } = await req.json();

    await connect.query(
      "INSERT INTO shipment_items (shipment_id, description, quantity, unit_weight_kg, length_cm, width_cm, height_cm, is_fragile, created_at) VALUES (? , ? , ? , ? , ? , ? , ? , ? , ?)",
      [
        shipment_id,
        description,
        quantity,
        unit_weight_kg,
        length_cm,
        width_cm,
        height_cm,
        is_fragile,
        new Date(),
      ],
    );

    return Response.json({
      message: "เพิ่มข้อมูลสินค้าในรายการขนส่งสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_items:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มสินค้าในรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}
