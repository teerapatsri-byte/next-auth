import { connect } from "@/lib/mysql_connect";

export async function GET(req: Request) {
  try {
    const { customer_name } = Object.fromEntries(new URL(req.url).searchParams);

    if (customer_name) {
      const [rows] = await connect.query(
        "SELECT * FROM customers WHERE customer_name LIKE ?  LIMIT 10",
        [`${customer_name}%`],
      );

      return Response.json({
        message: "ดึงข้อมูลลูกค้าจากการค้นหาสำเร็จ",
        customers: rows,
      });
    }

    const [rows] = await connect.query("SELECT * FROM customers  LIMIT 10");

    return Response.json({
      message: "ดึงข้อมูลลูกค้าสำเร็จ",
      customers: rows,
    });
  } catch (error) {
    console.error("Error during customers:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในการดึงข้อมูลลูกค้า",
      },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const { customer_name, customer_phone, email, tax_id, billing_address } =
      await req.json();

    await connect.query(
      "INSERT INTO customers (customer_type, customer_name, customer_phone, email, tax_id, billing_address, created_at) VALUES (? , ? , ? , ? , ? , ? , ?)",
      [
        "person",
        customer_name,
        customer_phone,
        email,
        tax_id,
        billing_address,
        new Date(),
      ],
    );

    return Response.json({
      message: "เพิ่มข้อมูลลูกค้าสำเร็จ",
    });
  } catch (error) {
    console.error("Error during customers:", error);
    return Response.json(
      {
        message: "เกิดข้อผิดพลาดในเพิ่มลูกค้า",
      },
      { status: 500 },
    );
  }
}
