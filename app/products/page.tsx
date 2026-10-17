"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Link from "next/link";

interface Product {
  product_id: number;
  product_name: string;
  product_price: string;
  created_at: string;
  updated_at: string | null;
}

const formatDate = (date: string | null) => {
  if (!date) return "-";

  return new Date(date).toLocaleString("th-TH", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  console.log("products :", products);

  const fetchData = async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data?.products);
  };

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch("/api/products/" + id, {
        method: "DELETE",
      });
      const result = await res.json();

      console.log(result);

      alert("ลบข้อมูลสำเร็จ");
      fetchData();
    } catch (err) {
      console.log(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <Sidebar />
      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg dark:border-gray-700 mb-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl my-2">Products</h2>

            <Link
              href="/products/add"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              เพิ่ม
            </Link>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {[
                    "ลำดับ",
                    "ชื่อ",
                    "ราคา",
                    "วันที่สร้าง",
                    "วันที่แก้ไข",
                    "ดำเนินการ",
                  ].map((item, idx) => (
                    <th scope="col" className="px-6 py-3" key={idx}>
                      {item}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((item, idx) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                    key={item.product_id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {idx + 1}
                    </th>
                    <td className="px-6 py-4">{item.product_name}</td>
                    <td className="px-6 py-4">{item.product_price ?? 0}</td>
                    <td className="px-6 py-4">{formatDate(item.created_at)}</td>
                    <td className="px-6 py-4">
                      {formatDate(item.updated_at) ?? "-"}
                    </td>
                    <td className="px-6 py-4 text-left ">
                      <Link
                        href={"/products/" + item.product_id + "/edit"}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
                        onClick={() => handleDelete(item.product_id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
