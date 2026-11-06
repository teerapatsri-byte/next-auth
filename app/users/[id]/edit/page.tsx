"use client";

import Sidebar from "@/app/components/sidebar";
import { useEffect, useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface UserEditPageProps {
  params: Promise<{
    id: string;
  }>;
}

function UserEditPage({ params }: UserEditPageProps) {
  const { id } = use(params);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${id}`);

        if (!res.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้งานได้");
        }

        const result = await res.json();

        console.log(result);

        setFirstName(result.user.first_name ?? "");
        setLastName(result.user.last_name ?? "");
        setEmail(result.user.email ?? "");
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/" + id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
        }),
      });

      const result = await res.json();

      console.log(result);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: result.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (err) {
      console.log(err);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        showConfirmButton: false,
        timer: 1500,
      });
    }
    router.push("/users");
  };

  return (
    <>
      <Sidebar />

      {/* Main content */}
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <p className="mb-5 text-2xl font-semibold text-gray-900 dark:text-white">
            แก้ไขผู้ใช้งาน
          </p>
          <form className="max-w-sm" onSubmit={handleSubmit}>
            {/* ชื่อ */}
            <div className="mb-5">
              <label
                htmlFor="first_name"
                className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อ
              </label>
              <span className="text-red-500">*</span>
              <input
                type="text"
                id="first_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            {/* นามสกุล */}
            <div className="mb-5">
              <label
                htmlFor="last_name"
                className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                นามสกุล
              </label>
              <span className="text-red-500">*</span>
              <input
                type="text"
                id="last_name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อีเมล
              </label>

              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@flowbite.com"
                readOnly
                value={email}
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
    </>
  );
}

export default UserEditPage;
