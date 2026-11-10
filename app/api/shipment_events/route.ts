import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const [rows] = await connect.query(
      "SELECT * FROM shipment_events  LIMIT 10",
    );

    return Response.json({
      message: "ดึงข้อมูลประวัติการติดตามสินค้าสำเร็จ",
      shipment_events: rows,
    });
  } catch (error) {
    console.error("Error during shipment_events:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการติดตามสินค้า",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      shipment_id,
      status,
      location_name,
      description,
      occurred_at,
      created_by,
    } = await req.json();

    await connect.query(
      "INSERT INTO shipment_events (shipment_id, status, location_name, description, occurred_at, created_by, created_at) VALUES (? , ? , ? , ? , ? , ? , ?)",
      [
        shipment_id,
        status,
        location_name,
        description,
        occurred_at,
        created_by,
        new Date(),
      ],
    );

    return Response.json({
      message: "เพิ่มข้อมูลประวัติการติดตามสินค้าสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_events:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มประวัติการติดตามสินค้า",
      },
      { status: 500 },
    );
  }
}
