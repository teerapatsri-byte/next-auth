import { connect } from "@/lib/mysql_connect";

interface Vehicles {
  vehicle_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ vehicle_id: string }> },
) {
  try {
    const { vehicle_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM vehicles WHERE vehicle_id = ?",
      [vehicle_id],
    )) as [Vehicles[], any];

    const vehicle = rows[0];

    return Response.json({
      message: "ดึงข้อมูลรถขนส่งสำเร็จ",
      vehicle: vehicle,
    });
  } catch (error) {
    console.error("Error during vehicle:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลรถขนส่ง",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ vehicle_id: string }> },
) {
  try {
    const { vehicle_id } = await params;
    const { plate_number, plate_province, vehicle_type, capacity_kg, status } =
      await req.json();

    await connect.query(
      "UPDATE vehicles SET plate_number = ? , plate_province  = ?  , vehicle_type = ? , capacity_kg = ? ,  status = ? , updated_at = ?   WHERE vehicle_id = ? ",
      [
        plate_number,
        plate_province,
        vehicle_type,
        capacity_kg,
        status,
        new Date(),
        vehicle_id,
      ],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during vehicles:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขรถขนส่ง",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ vehicle_id: string }> },
) {
  try {
    const { vehicle_id } = await params;

    await connect.query("DELETE  FROM vehicles WHERE vehicle_id = ?", [
      vehicle_id,
    ]);

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during vehicles:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลรถขนส่ง",
      },
      { status: 500 },
    );
  }
}
