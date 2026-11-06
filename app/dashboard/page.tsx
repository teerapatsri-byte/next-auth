"use client";

import { useEffect, useState } from "react";
import Sidebar from "../components/sidebar";

interface Stat {
  title: string;
  value: string;
}

function DashboardPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/dashboard");
      const data = await res.json();
      console.log(data);
      setStats(data?.stats);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
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
        <div className="p-4  rounded-lg dark:border-gray-700">
          <h1 className="font-bold text-4xl mb-2">ระบบขนส่งสินค้า</h1>
          <div className="grid grid-cols-3 gap-4 mb-4">
            {stats.map((item, idx) => (
              <div
                className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                key={idx}
              >
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {item.title}
                </h5>
                <p className="font-normal text-gray-700 dark:text-gray-400">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default DashboardPage;
