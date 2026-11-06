"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";
import Swal from "sweetalert2";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
}

function UserPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const fetchData = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setUsers(data?.users);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const params = new URLSearchParams();
    params.append("first_name", firstName.trim());
    params.append("last_name", lastName.trim());
    setLoading(true);
    try {
      const response = await fetch(`/api/users?${params.toString()}`);

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.users);
      setUsers(result.users);
    } catch (err) {
      console.log("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const resultAlert = await Swal.fire({
        title: "คุณแน่ใจใช่ไหม?",
        text: "ว่าจะลบข้อมูลนี้!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "ใช่",
        cancelButtonText: "ยกเลิก",
      });

      if (resultAlert.isConfirmed) {
        const res = await fetch("/api/users/" + id, {
          method: "DELETE",
        });
        const result = await res.json();

        console.log(result);
        Swal.fire({
          title: "ลบแล้ว!",
          text: "ข้อมูลของคุณถูกลบแล้ว.",
          icon: "success",
        });
      }

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
        <h2 className="font-bold text-2xl my-2">Users</h2>

        <div className="w-full max-w-full p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
          <form className="space-y-6" onSubmit={handleSearch} method="GET">
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
                  name="first_name"
                  id="first_name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  placeholder="ทดสอบ"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="last_name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  นามสกุล
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  placeholder="ระบบ"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                  onChange={(e) => setLastName(e.target.value)}
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
        <div className="p-4  rounded-lg dark:border-gray-700">
          <div className="relative overflow-x-auto">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {["ลำดับ", "ชื่อ-สกุล", "อีเมล", "ดำเนินการ"].map(
                    (item, idx) => (
                      <th scope="col" className="px-6 py-3" key={idx}>
                        {item}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {users.length > 0 ? (
                  users.map((item, idx) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                      key={item.id}
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {idx + 1}
                      </th>
                      <td className="px-6 py-4">
                        {item.first_name + " " + item.last_name}
                      </td>
                      <td className="px-6 py-4">{item.email}</td>
                      <td className="px-6 py-4 text-left ">
                        <a
                          href={"/users/" + item.id + "/edit"}
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline mx-2"
                        >
                          แก้ไข
                        </a>
                        <button
                          className="font-medium text-red-600 dark:text-red-500 hover:underline mx-2"
                          onClick={() => handleDelete(item.id)}
                        >
                          ลบ
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200">
                    <td colSpan={4} className="px-6 py-4 text-center">
                      ไม่มีข้อมูลผู้ใช้งาน
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserPage;
