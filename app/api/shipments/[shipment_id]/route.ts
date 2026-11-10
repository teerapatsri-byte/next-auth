import { connect } from "@/lib/mysql_connect";

interface Shipment {
  shipment_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shipment_id: string }> },
) {
  try {
    const { shipment_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM shipments WHERE shipment_id = ?",
      [shipment_id],
    )) as [Shipment[], any];

    const shipment = rows[0];

    return Response.json({
      message: "ดึงข้อมูลรายการขนส่งสำเร็จ",
      shipment: shipment,
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

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ shipment_id: string }> },
) {
  try {
    const { shipment_id } = await params;
    const {
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
    } = await req.json();

    await connect.query(
      "UPDATE shipments SET customer_id = ? , sender_name  = ?  , sender_phone = ? , pickup_address = ? ,  pickup_province = ? , recipient_name = ?  , recipient_phone = ? , delivery_address = ? , delivery_province = ? , shipping_fee = ? , scheduled_pickup_at = ? , expected_delivery_at = ? , delivered_at = ? , note = ? , updated_at = ? WHERE shipment_id = ? ",
      [
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
        new Date(),
        shipment_id,
      ],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipments:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ shipment_id: string }> },
) {
  try {
    const { shipment_id } = await params;

    await connect.query("DELETE  FROM shipments WHERE shipment_id = ?", [
      shipment_id,
    ]);

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipments:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}
