import { connect } from "@/lib/mysql_connect";

interface ShipmentEvent {
  shipment_event_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shipment_event_id: string }> },
) {
  try {
    const { shipment_event_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM shipment_events WHERE shipment_event_id = ?",
      [shipment_event_id],
    )) as [ShipmentEvent[], any];

    const shipment_event = rows[0];

    return Response.json({
      message: "ดึงข้อมูลประวัติการติดตามสินค้าสำเร็จ",
      shipment_event: shipment_event,
    });
  } catch (error) {
    console.error("Error during shipment_event:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลประวัติการติดตามสินค้า",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ shipment_event_id: string }> },
) {
  try {
    const { shipment_event_id } = await params;
    const { shipment_id, status, location_name, description, occurred_at } =
      await req.json();

    await connect.query(
      "UPDATE shipment_events SET shipment_id = ? , status  = ?  , location_name = ? , description = ? ,  occurred_at = ?   , updated_at = ? WHERE shipment_event_id = ? ",
      [
        shipment_id,
        status,
        location_name,
        description,
        occurred_at,
        new Date(),
        shipment_event_id,
      ],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_events:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขประวัติการติดตามสินค้า",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ shipment_event_id: string }> },
) {
  try {
    const { shipment_event_id } = await params;

    await connect.query(
      "DELETE  FROM shipment_events WHERE shipment_event_id = ?",
      [shipment_event_id],
    );

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_events:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลประวัติการติดตามสินค้า",
      },
      { status: 500 },
    );
  }
}
