"use client";
import dynamic from "next/dynamic";
import { Icon } from "@iconify/react";
const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const cotizacionesSeguimiento = [
  { id: "COT-0233", cliente: "La Sirena Supermercados", vendedor: "Ana Rodríguez", total: "RD$ 67,500", vence: "10/04/2025", diasRestantes: 1, estado: "Pendiente" },
  { id: "COT-0227", cliente: "Salón Bella Image", vendedor: "Ana Rodríguez", total: "RD$ 18,500", vence: "13/04/2025", diasRestantes: 4, estado: "Pendiente" },
  { id: "COT-0226", cliente: "Distribuidora Hidalgo", vendedor: "Pedro Soto", total: "RD$ 75,000", vence: "11/04/2025", diasRestantes: 2, estado: "Pendiente" },
  { id: "COT-0235", cliente: "Supermercados Nacional", vendedor: "Ana Rodríguez", total: "RD$ 85,000", vence: "23/04/2025", diasRestantes: 14, estado: "Pendiente" },
  { id: "COT-0234", cliente: "Farmacia Carol", vendedor: "Luis Méndez", total: "RD$ 28,400", vence: "22/04/2025", diasRestantes: 13, estado: "Pendiente" },
];

export default function SeguimientoPage() {
  const urgentes = cotizacionesSeguimiento.filter(c => c.diasRestantes <= 3);

  const chartOptions: any = {
    chart: { fontFamily: "inherit", foreColor: "#7b8fa3", toolbar: { show: false } },
    colors: ["#1E3A5F", "#C8541A", "#4A7C3F", "#D4A017", "#C8B89A"],
    plotOptions: { bar: { horizontal: false, borderRadius: 6, columnWidth: "50%", distributed: true } },
    dataLabels: { enabled: true, formatter: (v: number) => `${v}%`, style: { fontSize: "11px", colors: ["#fff"] } },
    xaxis: { categories: ["Ana R.", "Luis M.", "Carla V.", "Pedro S.", "María T."], axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: (v: number) => `${v}%` } },
    legend: { show: false },
    grid: { borderColor: "#e2e8f020", strokeDashArray: 3 },
    tooltip: { theme: "dark", y: { formatter: (v: number) => `${v}% tasa de conversión` } },
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Seguimiento de Cotizaciones</h1>
        <p className="text-sm text-darklink mt-1">Monitoreo y alertas de cotizaciones pendientes</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Tasa de Conversión", val: "72%", icon: "solar:chart-2-linear", color: "#1E3A5F", bg: "bg-blue-50" },
          { label: "Pendientes", val: "5", icon: "solar:clock-circle-linear", color: "#D4A017", bg: "bg-yellow-50" },
          { label: "Próx. a vencer (≤3d)", val: urgentes.length.toString(), icon: "solar:danger-triangle-linear", color: "#C8541A", bg: "bg-orange-50" },
          { label: "Expiradas este mes", val: "3", icon: "solar:close-circle-linear", color: "#6b7280", bg: "bg-gray-100" },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background p-5">
            <span className={`w-11 h-11 rounded-xl flex items-center justify-center ${k.bg} mb-3`}>
              <Icon icon={k.icon} style={{ color: k.color }} height={22} />
            </span>
            <p className="text-2xl font-bold text-dark dark:text-white">{k.val}</p>
            <p className="text-sm text-darklink mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Alert urgentes */}
      {urgentes.length > 0 && (
        <div className="rounded-2xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4">
          <div className="flex items-center gap-2 mb-3">
            <Icon icon="solar:danger-triangle-bold" className="text-red-500" height={20} />
            <h5 className="font-semibold text-red-700 dark:text-red-400">⚠️ {urgentes.length} cotizaciones vencen en los próximos 3 días</h5>
          </div>
          <div className="flex flex-col gap-2">
            {urgentes.map((c, i) => (
              <div key={i} className="flex items-center justify-between bg-white dark:bg-white/10 rounded-xl px-4 py-2.5">
                <div>
                  <span className="font-mono text-xs text-[#1E3A5F] font-bold">{c.id}</span>
                  <span className="mx-2 text-darklink">·</span>
                  <span className="text-sm font-medium text-dark dark:text-white">{c.cliente}</span>
                  <span className="text-sm text-darklink"> — {c.total}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.diasRestantes <= 1 ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
                    {c.diasRestantes === 1 ? "¡Vence mañana!" : `${c.diasRestantes} días`}
                  </span>
                  <button className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center gap-1">
                    <Icon icon="solar:chat-line-linear" height={13} />
                    Recordatorio
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Conversion Chart */}
      <div className="rounded-2xl shadow-md bg-background p-6">
        <h5 className="text-base font-semibold text-dark dark:text-white mb-1">Tasa de Conversión por Vendedor</h5>
        <p className="text-sm text-darklink mb-3">% de cotizaciones aprobadas sobre total emitido</p>
        <Chart options={chartOptions} series={[{ name: "Conversión", data: [78, 65, 82, 55, 70] }]} type="bar" height="220px" width="100%" />
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h5 className="font-semibold text-dark dark:text-white">Cotizaciones Pendientes</h5>
        </div>
        <table className="w-full text-sm">
          <thead className="bg-[#1E3A5F]/5">
            <tr>
              {["ID", "Cliente", "Vendedor", "Total", "Vence", "Días restantes", "Acciones"].map(h => (
                <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cotizacionesSeguimiento.map((c, i) => (
              <tr key={i} className={`border-t border-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${c.diasRestantes <= 3 ? "bg-red-50/30" : ""}`}>
                <td className="px-5 py-3.5 font-mono text-xs text-[#1E3A5F] font-bold">{c.id}</td>
                <td className="px-5 py-3.5 font-medium text-dark dark:text-white">{c.cliente}</td>
                <td className="px-5 py-3.5 text-darklink">{c.vendedor}</td>
                <td className="px-5 py-3.5 font-semibold text-dark dark:text-white">{c.total}</td>
                <td className={`px-5 py-3.5 text-xs font-medium ${c.diasRestantes <= 3 ? "text-red-600 font-bold" : "text-darklink"}`}>{c.vence}</td>
                <td className="px-5 py-3.5">
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.diasRestantes <= 1 ? "bg-red-100 text-red-700" : c.diasRestantes <= 3 ? "bg-orange-100 text-orange-700" : "bg-yellow-100 text-yellow-700"}`}>
                    {c.diasRestantes === 1 ? "¡Mañana!" : `${c.diasRestantes}d`}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <div className="flex gap-2">
                    <button className="text-xs bg-[#1E3A5F] text-white px-3 py-1.5 rounded-lg hover:bg-[#162d4a]">Ver</button>
                    <button className="text-xs bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600">WhatsApp</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
