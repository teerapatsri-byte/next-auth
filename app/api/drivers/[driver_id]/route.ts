import { connect } from "@/lib/mysql_connect";

interface Driver {
  driver_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ driver_id: string }> },
) {
  try {
    const { driver_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM drivers WHERE driver_id = ?",
      [driver_id],
    )) as [Driver[], any];

    const driver = rows[0];

    return Response.json({
      message: "ดึงข้อมูลพนักงานขับรถสำเร็จ",
      driver: driver,
    });
  } catch (error) {
    console.error("Error during driver:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลพนักงานขับรถ",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ driver_id: string }> },
) {
  try {
    const { driver_id } = await params;
    const { license_number, license_expiry, is_active } = await req.json();

    await connect.query(
      "UPDATE drivers SET user_id = ? , license_number  = ?  , license_expiry = ? , is_active = ? ,  updated_at = ?  WHERE driver_id = ? ",
      [null, license_number, license_expiry, is_active, new Date(), driver_id],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during drivers:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขพนักงานขับรถ",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ driver_id: string }> },
) {
  try {
    const { driver_id } = await params;

    await connect.query("DELETE  FROM drivers WHERE driver_id = ?", [
      driver_id,
    ]);

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during drivers:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลพนักงานขับรถ",
      },
      { status: 500 },
    );
  }
}
