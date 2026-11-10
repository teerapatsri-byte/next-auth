import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const [rows] = await connect.query(
      "SELECT * FROM delivery_proofs  LIMIT 10",
    );

    return Response.json({
      message: "ดึงข้อมูลหลักฐานการส่งมอบสำเร็จ",
      delivery_proofs: rows,
    });
  } catch (error) {
    console.error("Error during delivery_proofs:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลหลักฐานการส่งมอบ",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { shipment_event_id, received_by, photo_key, signature_key } =
      await req.json();

    await connect.query(
      "INSERT INTO delivery_proofs (shipment_event_id, received_by, photo_key, signature_key, created_at) VALUES (? , ? , ? , ? , ? )",
      [shipment_event_id, received_by, photo_key, signature_key, new Date()],
    );

    return Response.json({
      message: "เพิ่มข้อมูลหลักฐานการส่งมอบสำเร็จ",
    });
  } catch (error) {
    console.error("Error during delivery_proofs:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มหลักฐานการส่งมอบ",
      },
      { status: 500 },
    );
  }
}
