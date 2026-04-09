"use client";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const gastos = [
  { id: "GAS-088", fecha: "09/04/2025", categoria: "Materias Primas", descripcion: "Bobinas de papel kraft 80g", monto: "RD$ 28,500", aprobadoPor: "Gerencia", estado: "Aprobado" },
  { id: "GAS-087", fecha: "08/04/2025", categoria: "Servicios Públicos", descripcion: "Electricidad — marzo 2025", monto: "RD$ 8,200", aprobadoPor: "Admin", estado: "Aprobado" },
  { id: "GAS-086", fecha: "07/04/2025", categoria: "Logística", descripcion: "Flota de entrega — gasolina", monto: "RD$ 4,800", aprobadoPor: "Gerencia", estado: "Aprobado" },
  { id: "GAS-085", fecha: "05/04/2025", categoria: "Materias Primas", descripcion: "Tintas de impresión 4 colores", monto: "RD$ 15,200", aprobadoPor: "Gerencia", estado: "Aprobado" },
  { id: "GAS-084", fecha: "04/04/2025", categoria: "Mantenimiento", descripcion: "Servicio técnico impresora UV", monto: "RD$ 12,000", aprobadoPor: "Gerencia", estado: "Pendiente" },
  { id: "GAS-083", fecha: "02/04/2025", categoria: "Marketing", descripcion: "Publicidad en Instagram/Facebook", monto: "RD$ 5,000", aprobadoPor: "Admin", estado: "Aprobado" },
  { id: "GAS-082", fecha: "01/04/2025", categoria: "Nómina", descripcion: "Salarios — semana 1 abril", monto: "RD$ 45,000", aprobadoPor: "Gerencia", estado: "Aprobado" },
  { id: "GAS-081", fecha: "31/03/2025", categoria: "Alquiler", descripcion: "Renta taller productivo — abril", monto: "RD$ 22,000", aprobadoPor: "Gerencia", estado: "Aprobado" },
];

const categoriaColors: Record<string, string> = {
  "Materias Primas": "#1E3A5F",
  "Nómina": "#C8541A",
  "Alquiler": "#D4A017",
  "Servicios Públicos": "#4A7C3F",
  "Logística": "#C8B89A",
  "Mantenimiento": "#7c3aed",
  "Marketing": "#06b6d4",
};

const estadoStyles: Record<string, string> = {
  Aprobado: "bg-green-100 text-green-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
  Rechazado: "bg-red-100 text-red-600",
};

export default function GastosPage() {
  const chartOptions: any = {
    chart: { fontFamily: "inherit", foreColor: "#7b8fa3", toolbar: { show: false } },
    colors: ["#1E3A5F", "#C8541A", "#D4A017", "#4A7C3F", "#C8B89A", "#7c3aed", "#06b6d4"],
    plotOptions: { bar: { horizontal: false, borderRadius: 5, columnWidth: "55%" } },
    dataLabels: { enabled: false },
    xaxis: { categories: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"], axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `RD$ ${(v/1000).toFixed(0)}k` } },
    legend: { show: false },
    grid: { borderColor: "#e2e8f020", strokeDashArray: 3 },
    tooltip: { theme: "dark", y: { formatter: (v: number) => `RD$ ${v.toLocaleString()}` } },
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Registro de Gastos</h1>
          <p className="text-sm text-darklink mt-1">Control de gastos operativos — Abril 2025</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a] shadow-sm">
          <Icon icon="solar:add-circle-linear" height={18} />
          Registrar Gasto
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Gastos Abril", val: "RD$ 140,700", color: "#C8541A", bg: "bg-orange-50" },
          { label: "Materias Primas", val: "RD$ 43,700", color: "#1E3A5F", bg: "bg-blue-50" },
          { label: "Nómina", val: "RD$ 45,000", color: "#D4A017", bg: "bg-yellow-50" },
          { label: "Otros Costos", val: "RD$ 52,000", color: "#4A7C3F", bg: "bg-green-50" },
        ].map((k, i) => (
          <div key={i} className={`rounded-2xl shadow-md bg-background p-5 border-l-4`} style={{ borderLeftColor: k.color }}>
            <p className="text-2xl font-bold text-dark dark:text-white">{k.val}</p>
            <p className="text-sm text-darklink mt-1">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-2xl shadow-md bg-background p-6">
        <h5 className="font-semibold text-dark dark:text-white mb-1">Gastos Mensuales por Categoría</h5>
        <p className="text-sm text-darklink mb-3">Comparativo 6 meses — Materias Primas vs Nómina vs Otros</p>
        <Chart options={chartOptions} series={[
          { name: "Materias Primas", data: [38000, 42000, 35000, 43700, 0, 0] },
          { name: "Nómina", data: [40000, 40000, 42000, 45000, 0, 0] },
          { name: "Otros", data: [35000, 38000, 40000, 52000, 0, 0] },
        ]} type="bar" height="240px" width="100%" />
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h5 className="font-semibold text-dark dark:text-white">Detalle de Gastos</h5>
          <span className="text-sm text-darklink">{gastos.length} registros</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1E3A5F]/5">
              <tr>
                {["ID", "Fecha", "Categoría", "Descripción", "Monto", "Aprobado por", "Estado", ""].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {gastos.map((g, i) => (
                <tr key={i} className="border-t border-border hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-5 py-3.5 font-mono text-xs text-darklink">{g.id}</td>
                  <td className="px-5 py-3.5 text-xs text-darklink">{g.fecha}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: categoriaColors[g.categoria] || "#888" }}></div>
                      <span className="text-xs font-medium text-dark dark:text-white">{g.categoria}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-darklink">{g.descripcion}</td>
                  <td className="px-5 py-3.5 font-semibold text-dark dark:text-white">{g.monto}</td>
                  <td className="px-5 py-3.5 text-darklink">{g.aprobadoPor}</td>
                  <td className="px-5 py-3.5"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[g.estado]}`}>{g.estado}</span></td>
                  <td className="px-5 py-3.5">
                    <button className="p-1.5 rounded-lg hover:bg-[#1E3A5F]/10 text-[#1E3A5F]"><Icon icon="solar:eye-linear" height={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
