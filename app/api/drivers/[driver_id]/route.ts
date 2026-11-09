import { connect } from "@/lib/mysql_connect";

interface Customer {
  customer_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ customer_id: string }> },
) {
  try {
    const { customer_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM customers WHERE customer_id = ?",
      [customer_id],
    )) as [Customer[], any];

    const customer = rows[0];

    return Response.json({
      message: "ดึงข้อมูลลูกค้าสำเร็จ",
      customer: customer,
    });
  } catch (error) {
    console.error("Error during customer:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ customer_id: string }> },
) {
  try {
    const { customer_id } = await params;
    const {
      customer_type,
      customer_name,
      customer_phone,
      email,
      tax_id,
      billing_address,
    } = await req.json();

    await connect.query(
      "UPDATE customers SET customer_type = ? , customer_name  = ?  , customer_phone = ? , email = ? ,  tax_id = ? , billing_address = ?  , updated_at = ? WHERE customer_id = ? ",
      [
        customer_type,
        customer_name,
        customer_phone,
        email,
        tax_id,
        billing_address,
        new Date(),
        customer_id,
      ],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during customers:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขลูกค้า",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ customer_id: string }> },
) {
  try {
    const { customer_id } = await params;

    await connect.query("DELETE  FROM customers WHERE customer_id = ?", [
      customer_id,
    ]);

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during customers:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลลูกค้า",
      },
      { status: 500 },
    );
  }
}
