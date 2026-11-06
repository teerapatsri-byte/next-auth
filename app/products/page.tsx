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
  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data?.products);
    } catch (error) {
      console.log("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("product_name", productName.trim());
    setLoading(true);
    try {
      const response = await fetch(`/api/products?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log("Search result:", result);
      setProducts(result.products);
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setLoading(false);
    }
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }
  return (
    <>
      <Sidebar />
      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg dark:border-gray-700 space-y-4 mb-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl my-2">Products</h2>

            <Link
              href="/products/add"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              เพิ่ม
            </Link>
          </div>
          <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form className="space-y-6" method="GET" onSubmit={handleSearch}>
              <h5 className="text-xl font-medium text-gray-900 dark:text-white">
                ค้นหา
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <label
                    htmlFor="first_name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    ชื่อ
                  </label>
                  <input
                    type="text"
                    name="product_name"
                    id="product_name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="ทดสอบ"
                    onChange={(e) => setProductName(e.target.value)}
                    value={productName}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                ค้นหา
              </button>
            </form>
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
                        แก้ไข
                      </Link>
                      <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
                        onClick={() => handleDelete(item.product_id)}
                      >
                        ลบ
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
