import { connect } from "@/lib/mysql_connect";

interface Product {
  product_id: string;
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ product_id: string }> },
) {
  try {
    const { product_id } = await params;
    const [rows] = (await connect.query(
      "SELECT *  FROM products WHERE product_id = ?",
      [product_id],
    )) as [Product[], any];

    const product = rows[0];

    return Response.json({
      message: "ดึงข้อมูลสินค้าสำเร็จ",
      product: product,
    });
  } catch (error) {
    console.error("Error during product:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า",
      },
      { status: 500 },
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ product_id: string }> },
) {
  try {
    const { product_id } = await params;
    const { name, price } = await req.json();

    await connect.query(
      "UPDATE products SET product_name = ? , product_price  = ? , updated_at = ? WHERE product_id = ? ",
      [name, price, new Date(), product_id],
    );

    return Response.json({
      message: "แก้ไขข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการแก้ไขสินค้า",
      },
      { status: 500 },
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ product_id: string }> },
) {
  try {
    const { product_id } = await params;

    await connect.query("DELETE  FROM products WHERE product_id = ?", [
      product_id,
    ]);

    return Response.json({
      message: "ลบข้อมูลสำเร็จ",
    });
  } catch (error) {
    console.error("Error during users:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการลบข้อมูลสินค้า",
      },
      { status: 500 },
    );
  }
}
