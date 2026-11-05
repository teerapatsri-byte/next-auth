"use client";

import Sidebar from "@/app/components/sidebar";
import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface ProductEditPageProps {
  params: Promise<{
    product_id: string;
  }>;
}

function ProductPage({ params }: ProductEditPageProps) {
  const { product_id } = use(params);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/products/" + product_id);
      const data = await res.json();
      console.log(data);
      setName(data?.product?.product_name);
      setPrice(data?.product?.product_price);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  useEffect(() => {
    fetchData();
  }, [product_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/products/" + product_id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          price: price,
        }),
      });

      const result = await res.json();

      alert(result.message);
      router.push("/products");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาด");
    }
  };

  return (
    <>
      <Sidebar />
      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4  rounded-lg dark:border-gray-700 mb-3">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-2xl my-2">Edit Products</h2>
          </div>
          <div className="p-4    rounded-lg dark:border-gray-700">
            <form className="max-w-sm" onSubmit={handleSubmit}>
              {/* ชื่อ */}
              <div className="mb-5">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ชื่อ
                </label>

                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="John"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="first_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  ราคา
                </label>

                <input
                  type="text"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="0.00"
                  value={price ?? 0}
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
              </div>

              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
              >
                บันทึก
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductPage;
