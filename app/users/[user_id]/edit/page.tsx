"use client";

import Sidebar from "@/app/components/sidebar";
import { useEffect, useState } from "react";
import { use } from "react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

interface UserEditPageProps {
  params: Promise<{
    user_id: string;
  }>;
}

function UserEditPage({ params }: UserEditPageProps) {
  const { user_id } = use(params);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [isActive, setIsActive] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/users/${user_id}`);

        if (!res.ok) {
          throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้งานได้");
        }

        const result = await res.json();

        setUsername(result.user.username ?? "");
        setEmail(result.user.email ?? "");
        setPhone(result.user.phone ?? "");
        setRole(result.user.role ?? "");
        setIsActive(result.user.is_active ?? false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user_id]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/users/" + user_id, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: username,
          phone: phone,
          role: role,
          is_active: isActive,
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
          <form className="max-w-sm space-y-2" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ชื่อผู้ใช้
              </label>
              <input
                type="text"
                name="username"
                id="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="John"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                อีเมล
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                เบอร์โทรศัพท์
              </label>
              <input
                type="text"
                name="phone"
                id="phone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                placeholder="0812345678"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor="role"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                ตำแหน่งผู้ใช้งาน
              </label>
              <select
                id="role"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option>เลือกตำแหน่ง</option>
                {[
                  { label: "ผู้ดูแลระบบ", value: "admin" },
                  { label: "ผู้ใช้งานทั่วไป", value: "user" },
                ].map((item, idx) => (
                  <option value={item.value} key={idx}>
                    {item.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                สถานะผู้ใช้งาน
              </label>
              <div className="flex">
                {[
                  { label: "ใช้งาน", value: true, checked: isActive },
                  { label: "ไม่ใช้งาน", value: false, checked: !isActive },
                ].map((item, idx) => (
                  <div className="flex items-center me-4" key={idx}>
                    <input
                      id={idx.toString()}
                      type="radio"
                      name="inline-radio-group"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      onChange={(e) => setIsActive(item.value)}
                      checked={item.checked}
                    />
                    <label
                      htmlFor={idx.toString()}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {item.label}
                    </label>
                  </div>
                ))}
              </div>
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
