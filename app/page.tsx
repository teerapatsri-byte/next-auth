"use client";

import { useState } from "react";

const shipments = [
  {
    id: "SHP-2026-001",
    customer: "บริษัท กรีนมาร์เก็ต จำกัด",
    route: "กรุงเทพฯ → สุราษฎร์ธานี",
    date: "6 พ.ย. 2569",
    status: "กำลังจัดส่ง",
    progress: 65,
  },
  {
    id: "SHP-2026-002",
    customer: "คุณวราภรณ์ ใจดี",
    route: "สุราษฎร์ธานี → ภูเก็ต",
    date: "6 พ.ย. 2569",
    status: "รอรับสินค้า",
    progress: 15,
  },
  {
    id: "SHP-2026-003",
    customer: "บริษัท เซาท์เทรด จำกัด",
    route: "นครศรีธรรมราช → หาดใหญ่",
    date: "5 พ.ย. 2569",
    status: "จัดส่งสำเร็จ",
    progress: 100,
  },
  {
    id: "SHP-2026-004",
    customer: "คุณธนพล สุขสวัสดิ์",
    route: "กรุงเทพฯ → ชุมพร",
    date: "6 พ.ย. 2569",
    status: "กำลังจัดส่ง",
    progress: 45,
  },
];

const statuses = {
  กำลังจัดส่ง: "bg-blue-50 text-blue-700",
  รอรับสินค้า: "bg-amber-50 text-amber-700",
  จัดส่งสำเร็จ: "bg-emerald-50 text-emerald-700",
};

function Icon({ name, className = "h-5 w-5" }) {
  const paths = {
    box: (
      <>
        <path d="m12 3 9 5v8l-9 5-9-5V8l9-5Z" />
        <path d="m3 8 9 5 9-5M12 13v8M7.5 5.5l9 5" />
      </>
    ),
    search: (
      <>
        <circle cx="10.5" cy="10.5" r="6.5" />
        <path d="m16 16 4 4" />
      </>
    ),
    truck: (
      <>
        <path d="M3 5h11v12H3zM14 9h4l3 4v4h-7" />
        <circle cx="7" cy="18" r="2" />
        <circle cx="17" cy="18" r="2" />
      </>
    ),
    check: <path d="m5 12 4 4L19 6" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  };

  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("ทั้งหมด");

  const filteredShipments = shipments.filter((shipment) => {
    const matchesQuery = [
      shipment.id,
      shipment.customer,
      shipment.route,
    ].some((value) =>
      value.toLowerCase().includes(query.trim().toLowerCase())
    );

    return (
      matchesQuery &&
      (filter === "ทั้งหมด" || shipment.status === filter)
    );
  });

  const stats = [
    {
      label: "รายการทั้งหมด",
      value: shipments.length,
      icon: "box",
      color: "bg-orange-50 text-orange-600",
    },
    {
      label: "กำลังจัดส่ง",
      value: shipments.filter((s) => s.status === "กำลังจัดส่ง").length,
      icon: "truck",
      color: "bg-blue-50 text-blue-600",
    },
    {
      label: "จัดส่งสำเร็จ",
      value: shipments.filter((s) => s.status === "จัดส่งสำเร็จ").length,
      icon: "check",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "รอรับสินค้า",
      value: shipments.filter((s) => s.status === "รอรับสินค้า").length,
      icon: "clock",
      color: "bg-amber-50 text-amber-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f6fa] text-slate-800">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-5 lg:px-8">
          <a href="#" className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-500 text-white">
              <Icon name="box" className="h-7 w-7" />
            </span>
            <div>
              <p className="text-xl font-black tracking-tight">
                CARGO<span className="text-orange-500">FLOW</span>
              </p>
              <p className="text-xs text-slate-500">
                ระบบบริหารจัดการขนส่งสินค้า
              </p>
            </div>
          </a>

          <div className="flex items-center gap-3">
            <span className="hidden rounded-full bg-slate-100 px-3 py-1.5 text-xs text-slate-500 sm:block">
              โหมดสาธิต
            </span>
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              CF
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-7 px-5 py-8 lg:px-8">
        <section className="relative overflow-hidden rounded-3xl bg-[#13243b] px-6 py-9 text-white sm:p-10">
          <div className="pointer-events-none absolute -right-16 -top-24 h-80 w-80 rounded-full border-[45px] border-white/5" />

          <div className="relative grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 text-xs font-semibold tracking-[0.2em] text-orange-300">
                MOVE SMART. DELIVER BETTER.
              </p>
              <h1 className="text-3xl font-bold leading-snug sm:text-4xl">
                ทุกการขนส่ง
                <br />
                <span className="text-orange-400">
                  จัดการได้ในที่เดียว
                </span>
              </h1>
              <p className="mt-4 max-w-md text-sm leading-7 text-slate-300">
                ติดตามสินค้า ตรวจสอบสถานะ และดูภาพรวมการจัดส่ง
                เพื่อให้ทุกปลายทางเป็นเรื่องง่าย
              </p>
              <a
                href="#shipments"
                className="mt-6 inline-flex items-center gap-3 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold transition hover:bg-orange-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-300"
              >
                ดูรายการขนส่ง
                <Icon name="arrow" />
              </a>
            </div>

            <div className="rounded-2xl border border-white/15 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-slate-300">
                  ตัวอย่างเส้นทางขนส่ง
                </span>
                <Icon name="truck" className="h-6 w-6 text-orange-400" />
              </div>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-orange-400 ring-4 ring-orange-400/15" />
                <div className="h-px flex-1 border-t border-dashed border-slate-500" />
                <span className="rounded-xl bg-orange-500 p-3">
                  <Icon name="truck" className="h-6 w-6" />
                </span>
                <div className="h-px flex-1 border-t border-dashed border-slate-500" />
                <span className="h-3 w-3 rounded-full bg-white ring-4 ring-white/10" />
              </div>

              <div className="mt-4 flex justify-between text-sm font-medium">
                <span>กรุงเทพฯ</span>
                <span>สุราษฎร์ธานี</span>
              </div>
              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs text-slate-300">
                <span className="h-2 w-2 rounded-full bg-blue-400" />
                SHP-2026-001 · อยู่ระหว่างการขนส่ง
              </div>
            </div>
          </div>
        </section>

        <section
          aria-label="สรุปรายการขนส่ง"
          className="grid grid-cols-2 gap-4 lg:grid-cols-4"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-slate-200/80 bg-white p-5"
            >
              <div className={`inline-flex rounded-xl p-3 ${stat.color}`}>
                <Icon name={stat.icon} />
              </div>
              <p className="mt-4 text-sm text-slate-500">{stat.label}</p>
              <p className="mt-2 text-3xl font-bold tracking-tight">
                {stat.value}
                <span className="ml-2 text-xs font-normal text-slate-400">
                  รายการ
                </span>
              </p>
            </div>
          ))}
        </section>

        <section
          id="shipments"
          className="scroll-mt-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white"
        >
          <div className="flex flex-col justify-between gap-5 p-6 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold">รายการขนส่ง</h2>
              <p className="mt-1 text-sm text-slate-500">
                ตรวจสอบและติดตามสถานะสินค้าของคุณ
              </p>
            </div>

            <div className="relative w-full sm:w-80">
              <span className="pointer-events-none absolute left-3 top-3 text-slate-400">
                <Icon name="search" />
              </span>
              <input
                type="search"
                aria-label="ค้นหาเลขพัสดุ ลูกค้า หรือเส้นทาง"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="ค้นหาเลขพัสดุ ลูกค้า หรือเส้นทาง"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-10 pr-3 text-sm outline-none transition focus:border-orange-400 focus:ring-2 focus:ring-orange-100"
              />
            </div>
          </div>

          <div
            aria-label="กรองสถานะการขนส่ง"
            className="flex gap-2 overflow-x-auto px-6 pb-5"
          >
            {["ทั้งหมด", "กำลังจัดส่ง", "รอรับสินค้า", "จัดส่งสำเร็จ"].map(
              (status) => (
                <button
                  key={status}
                  type="button"
                  aria-pressed={filter === status}
                  onClick={() => setFilter(status)}
                  className={`whitespace-nowrap rounded-lg px-4 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-orange-500 ${
                    filter === status
                      ? "bg-slate-900 text-white"
                      : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {status}
                </button>
              )
            )}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-y border-slate-100 bg-slate-50 text-xs text-slate-500">
                <tr>
                  {["เลขที่ขนส่ง / ลูกค้า", "เส้นทาง", "วันที่", "สถานะ", "ความคืบหน้า"].map(
                    (heading) => (
                      <th key={heading} scope="col" className="px-6 py-4 font-medium">
                        {heading}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredShipments.map((shipment) => (
                  <tr
                    key={shipment.id}
                    className="transition hover:bg-orange-50/30"
                  >
                    <td className="px-6 py-5">
                      <p className="font-semibold text-slate-900">
                        {shipment.id}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">
                        {shipment.customer}
                      </p>
                    </td>
                    <td className="px-6 py-5 text-slate-600">
                      {shipment.route}
                    </td>
                    <td className="whitespace-nowrap px-6 py-5 text-slate-500">
                      {shipment.date}
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${statuses[shipment.status]}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {shipment.status}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <progress
                          aria-label={`ความคืบหน้า ${shipment.id}`}
                          value={shipment.progress}
                          max="100"
                          className="h-1.5 w-20 overflow-hidden rounded-full [&::-webkit-progress-bar]:bg-slate-100 [&::-webkit-progress-value]:bg-orange-500 [&::-moz-progress-bar]:bg-orange-500"
                        />
                        <span className="text-xs text-slate-500">
                          {shipment.progress}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredShipments.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-14 text-center text-slate-500">
                      ไม่พบรายการที่ตรงกับการค้นหา
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div
            aria-live="polite"
            className="border-t border-slate-100 px-6 py-4 text-xs text-slate-400"
          >
            แสดง {filteredShipments.length} จาก {shipments.length} รายการ
          </div>
        </section>

        <footer className="pb-4 text-center text-xs text-slate-400">
          CARGOFLOW · ระบบบริหารจัดการขนส่งสินค้า
        </footer>
      </main>
    </div>
  );
}