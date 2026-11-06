import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const { product_name } = Object.fromEntries(new URL(req.url).searchParams);

    if (product_name) {
      const [rows] = await connect.query(
        "SELECT * FROM products WHERE product_name LIKE ?  LIMIT 10",
        [`${product_name}%`],
      );

      return Response.json({
        message: "ดึงข้อมูลสินค้าจากการค้นหาสำเร็จ",
        products: rows,
      });
    }

    const [rows] = await connect.query("SELECT * FROM products  LIMIT 10");

    return Response.json({
      message: "ดึงข้อมูลสินค้าสำเร็จ",
      products: rows,
    });
  } catch (error) {
    console.error("Error during products:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลสินค้า",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { name, price } = await req.json();

    await connect.query(
      "INSERT INTO products (product_name , product_price , created_at) VALUES (? , ? , ?)",
      [name, price, new Date()],
    );

    return Response.json({
      message: "เพิ่มข้อมูลสินค้าสำเร็จ",
    });
  } catch (error) {
    console.error("Error during products:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มสินค้า",
      },
      { status: 500 },
    );
  }
}
