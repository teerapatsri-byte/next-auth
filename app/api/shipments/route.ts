import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const { tracking_number } = Object.fromEntries(
      new URL(req.url).searchParams,
    );

    if (tracking_number) {
      const [rows] = await connect.query(
        "SELECT * FROM shipments WHERE tracking_number LIKE ?  LIMIT 10",
        [`${tracking_number}%`],
      );

      return Response.json({
        message: "ดึงข้อมูลรายการขนส่งจากการค้นหาสำเร็จ",
        shipments: rows,
      });
    }

    const [rows] = await connect.query("SELECT * FROM shipments  LIMIT 10");

    return Response.json({
      message: "ดึงข้อมูลรายการขนส่งสำเร็จ",
      shipments: rows,
    });
  } catch (error) {
    console.error("Error during shipments:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const {
      tracking_number,
      customer_id,
      sender_name,
      sender_phone,
      pickup_address,
      pickup_province,
      recipient_name,
      recipient_phone,
      delivery_address,
      delivery_province,
      shipping_fee,
      scheduled_pickup_at,
      expected_delivery_at,
      delivered_at,
      note,
      created_by,
    } = await req.json();

    await connect.query(
      "INSERT INTO shipments (tracking_number, customer_id, sender_name, sender_phone, pickup_address, pickup_province, recipient_name, recipient_phone, delivery_address, delivery_province, shipping_fee, scheduled_pickup_at, expected_delivery_at, delivered_at, note, created_by, created_at) VALUES (? , ? , ? , ? , ? , ? , ? , ? ,? ,? ,? ,? ,? ,? ,? ,? ,? )",
      [
        tracking_number,
        customer_id,
        sender_name,
        sender_phone,
        pickup_address,
        pickup_province,
        recipient_name,
        recipient_phone,
        delivery_address,
        delivery_province,
        shipping_fee,
        scheduled_pickup_at,
        expected_delivery_at,
        delivered_at,
        note,
        created_by,
        new Date(),
      ],
    );

    return Response.json({
      message: "เพิ่มข้อมูลรายการขนส่งสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipments:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}
