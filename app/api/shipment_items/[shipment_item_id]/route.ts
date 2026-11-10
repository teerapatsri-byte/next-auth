import { connect } from "@/lib/mysql_connect";

interface ShipmentItem {
  shipment_item_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ shipment_item_id: string }> },
) {
  try {
    const { shipment_item_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM shipment_items WHERE shipment_item_id = ?",
      [shipment_item_id],
    )) as [ShipmentItem[], any];

    const shipment_item = rows[0];

    return Response.json({
      message: "ดึงข้อมูลสินค้าในรายการขนส่งสำเร็จ",
      shipment_item: shipment_item,
    });
  } catch (error) {
    console.error("Error during shipment_item:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้าในรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ shipment_item_id: string }> },
) {
  try {
    const { shipment_item_id } = await params;
    const {
      shipment_id,
      description,
      quantity,
      unit_weight_kg,
      length_cm,
      width_cm,
      height_cm,
      is_fragile,
    } = await req.json();

    await connect.query(
      "UPDATE shipment_items SET shipment_id = ? , description  = ?  , quantity = ? , unit_weight_kg = ? ,  length_cm = ? , width_cm = ?  , height_cm = ?  , is_fragile = ?, updated_at = ? WHERE shipment_item_id = ? ",
      [
        shipment_id,
        description,
        quantity,
        unit_weight_kg,
        length_cm,
        width_cm,
        height_cm,
        is_fragile,
        new Date(),
        shipment_item_id,
      ],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_items:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขสินค้าในรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ shipment_item_id: string }> },
) {
  try {
    const { shipment_item_id } = await params;

    await connect.query(
      "DELETE  FROM shipment_items WHERE shipment_item_id = ?",
      [shipment_item_id],
    );

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during shipment_items:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลสินค้าในรายการขนส่ง",
      },
      { status: 500 },
    );
  }
}
