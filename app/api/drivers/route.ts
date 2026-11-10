import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const { license_number } = Object.fromEntries(
      new URL(req.url).searchParams,
    );

    if (license_number) {
      const [rows] = await connect.query(
        "SELECT * FROM drivers WHERE license_number LIKE ?  LIMIT 10",
        [`${license_number}%`],
      );

      return Response.json({
        message: "ดึงข้อมูลพนักงานขับรถจากการค้นหาสำเร็จ",
        drivers: rows,
      });
    }

    const [rows] = await connect.query("SELECT * FROM drivers  LIMIT 10");

    return Response.json({
      message: "ดึงข้อมูลพนักงานขับรถสำเร็จ",
      drivers: rows,
    });
  } catch (error) {
    console.error("Error during drivers:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลพนักงานขับรถ",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { license_number, license_expiry, is_active } = await req.json();

    await connect.query(
      "INSERT INTO drivers (user_id, license_number, license_expiry, is_active, created_at) VALUES (? , ? , ? , ? , ?)",
      [null, license_number, license_expiry, is_active, new Date()],
    );

    return Response.json({
      message: "เพิ่มข้อมูลพนักงานขับรถสำเร็จ",
    });
  } catch (error) {
    console.error("Error during drivers:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มพนักงานขับรถ",
      },
      { status: 500 },
    );
  }
}
