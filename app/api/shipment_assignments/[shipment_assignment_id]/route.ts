import { connect } from "@/lib/mysql_connect";

interface ShipmentAssignment {
  shipment_assignment_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shipment_assignment_id: string }> },
) {
  try {
    const { shipment_assignment_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM shipment_assignments WHERE shipment_assignment_id = ?",
      [shipment_assignment_id],
    )) as [ShipmentAssignment[], any];

    const shipment_assignment = rows[0];

    return Response.json({
      message: "ดึงข้อมูลประวัติการมอบหมายงานสำเร็จ",
      shipment_assignment: shipment_assignment,
    });
  } catch (error) {
    console.error("Error during shipment_assignment:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการมอบหมายงาน",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ shipment_assignment_id: string }> },
) {
  try {
    const { shipment_assignment_id } = await params;
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
      "UPDATE shipment_assignments SET shipment_id = ? , driver_id  = ?  , vehicle_id = ? , assigned_by = ? ,  assigned_at = ? , ended_at = ?  , note = ? , updated_at = ? WHERE shipment_assignment_id = ? ",
      [
        shipment_id,
        driver_id,
        vehicle_id,
        assigned_by,
        assigned_at,
        ended_at,
        note,
        new Date(),
        shipment_assignment_id,
      ],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_assignments:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขประวัติการมอบหมายงาน",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ shipment_assignment_id: string }> },
) {
  try {
    const { shipment_assignment_id } = await params;

    await connect.query(
      "DELETE  FROM shipment_assignments WHERE shipment_assignment_id = ?",
      [shipment_assignment_id],
    );

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_assignments:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลประวัติการมอบหมายงาน",
      },
      { status: 500 },
    );
  }
}
