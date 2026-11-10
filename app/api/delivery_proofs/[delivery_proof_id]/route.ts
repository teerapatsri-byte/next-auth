import { connect } from "@/lib/mysql_connect";

interface DeliveryProof {
  delivery_proof_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ delivery_proof_id: string }> },
) {
  try {
    const { delivery_proof_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM delivery_proofs WHERE delivery_proof_id = ?",
      [delivery_proof_id],
    )) as [DeliveryProof[], any];

    const delivery_proof = rows[0];

    return Response.json({
      message: "ดึงข้อมูลหลักฐานการส่งมอบสำเร็จ",
      delivery_proof: delivery_proof,
    });
  } catch (error) {
    console.error("Error during delivery_proof:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลหลักฐานการส่งมอบ",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ delivery_proof_id: string }> },
) {
  try {
    const { delivery_proof_id } = await params;
    const { shipment_event_id, received_by, photo_key, signature_key } =
      await req.json();

    await connect.query(
      "UPDATE delivery_proofs SET shipment_event_id = ? , received_by  = ?  , photo_key = ? , signature_key = ?  , updated_at = ? WHERE delivery_proof_id = ? ",
      [
        shipment_event_id,
        received_by,
        photo_key,
        signature_key,
        new Date(),
        delivery_proof_id,
      ],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during delivery_proofs:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขหลักฐานการส่งมอบ",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ delivery_proof_id: string }> },
) {
  try {
    const { delivery_proof_id } = await params;

    await connect.query(
      "DELETE  FROM delivery_proofs WHERE delivery_proof_id = ?",
      [delivery_proof_id],
    );

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during delivery_proofs:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลหลักฐานการส่งมอบ",
      },
      { status: 500 },
    );
  }
}
