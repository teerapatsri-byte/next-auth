import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const { plate_number } = Object.fromEntries(new URL(req.url).searchParams);

    if (plate_number) {
      const [rows] = await connect.query(
        "SELECT * FROM vehicles WHERE plate_number LIKE ?  LIMIT 10",
        [`${plate_number}%`],
      );

      return Response.json({
        message: "ดึงข้อมูลรถขนส่งจากการค้นหาสำเร็จ",
        vehicles: rows,
      });
    }

    const [rows] = await connect.query("SELECT * FROM vehicles  LIMIT 10");

    return Response.json({
      message: "ดึงข้อมูลรถขนส่งสำเร็จ",
      vehicles: rows,
    });
  } catch (error) {
    console.error("Error during vehicles:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลรถขนส่ง",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { plate_number, plate_province, vehicle_type, capacity_kg, status } =
      await req.json();

    await connect.query(
      "INSERT INTO vehicles (plate_number, plate_province, vehicle_type, capacity_kg, status, created_at) VALUES (? , ? , ? , ? , ? , ? )",
      [
        plate_number,
        plate_province,
        vehicle_type,
        capacity_kg,
        status,
        new Date(),
      ],
    );

    return Response.json({
      message: "เพิ่มข้อมูลรถขนส่งสำเร็จ",
    });
  } catch (error) {
    console.error("Error during vehicles:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มรถขนส่ง",
      },
      { status: 500 },
    );
  }
}
