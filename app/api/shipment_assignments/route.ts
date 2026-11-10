import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const [rows] = await connect.query(
      "SELECT * FROM shipment_assignments  LIMIT 10",
    );

    return Response.json({
      message: "ดึงข้อมูลประวัติการมอบหมายงานสำเร็จ",
      shipment_assignments: rows,
    });
  } catch (error) {
    console.error("Error during shipment_assignments:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการมอบหมายงาน",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      shipment_id,
      driver_id,
      vehicle_id,
      assigned_by,
      assigned_at,
      ended_at,
      note,
    } = await req.json();

    await connect.query(
      "INSERT INTO shipment_assignments (shipment_id, driver_id, vehicle_id, assigned_by, assigned_at, ended_at, note, created_at) VALUES (? , ? , ? , ? , ? , ? , ? , ?)",
      [
        shipment_id,
        driver_id,
        vehicle_id,
        assigned_by,
        assigned_at,
        ended_at,
        note,
        new Date(),
      ],
    );

    return Response.json({
      message: "เพิ่มข้อมูลประวัติการมอบหมายงานสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_assignments:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มประวัติการมอบหมายงาน",
      },
      { status: 500 },
    );
  }
}
