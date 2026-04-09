"use client";
import { Icon } from "@iconify/react";

const reporteData = [
  { ncf: "B01-00000901", fecha: "09/04/2025", descripcion: "Bolsas kraft personalizadas", monto: "RD$ 15,000", itbis: "RD$ 2,700", total: "RD$ 17,700" },
  { ncf: "B01-00000900", fecha: "08/04/2025", descripcion: "Bolsas plásticas x100", monto: "RD$ 8,500", itbis: "RD$ 1,530", total: "RD$ 10,030" },
  { ncf: "B01-00000899", fecha: "07/04/2025", descripcion: "Tote bags algodón x50", monto: "RD$ 12,000", itbis: "RD$ 2,160", total: "RD$ 14,160" },
  { ncf: "B01-00000898", fecha: "05/04/2025", descripcion: "Bolsas papel kraft x200", monto: "RD$ 6,400", itbis: "RD$ 1,152", total: "RD$ 7,552" },
  { ncf: "B01-00000897", fecha: "04/04/2025", descripcion: "Gift bags premium x30", monto: "RD$ 9,000", itbis: "RD$ 1,620", total: "RD$ 10,620" },
  { ncf: "B01-00000896", fecha: "03/04/2025", descripcion: "Bolsas yute ecológico x80", monto: "RD$ 11,200", itbis: "RD$ 2,016", total: "RD$ 13,216" },
  { ncf: "B01-00000895", fecha: "02/04/2025", descripcion: "Bolsas nonwoven corporativas x100", monto: "RD$ 14,800", itbis: "RD$ 2,664", total: "RD$ 17,464" },
  { ncf: "B01-00000894", fecha: "01/04/2025", descripcion: "Bolsas laminadas full color x60", monto: "RD$ 9,200", itbis: "RD$ 1,656", total: "RD$ 10,856" },
];

export default function ConsumidoresFinalesPage() {
  const totalBase = "RD$ 86,100";
  const totalITBIS = "RD$ 15,498";
  const totalGeneral = "RD$ 101,598";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Reporte Consumidores Finales</h1>
          <p className="text-sm text-darklink mt-1">Comprobantes Fiscales B01 — Abril 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2.5 border border-[#4A7C3F] text-[#4A7C3F] rounded-xl text-sm font-semibold hover:bg-green-50 transition-colors">
            <Icon icon="solar:file-text-linear" height={16} />
            Exportar Excel
          </button>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-[#C8541A] text-white rounded-xl text-sm font-semibold hover:bg-[#a8440e] transition-colors">
            <Icon icon="solar:document-linear" height={16} />
            Exportar PDF
          </button>
        </div>
      </div>

      {/* Filtros período */}
      <div className="rounded-2xl shadow-md bg-background p-4 flex flex-wrap gap-4 items-center">
        <div>
          <label className="text-xs text-darklink font-medium block mb-1">Desde</label>
          <input type="date" defaultValue="2025-04-01" className="border border-border rounded-lg px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="text-xs text-darklink font-medium block mb-1">Hasta</label>
          <input type="date" defaultValue="2025-04-30" className="border border-border rounded-lg px-3 py-2 text-sm" />
        </div>
        <button className="mt-5 px-4 py-2 bg-[#1E3A5F] text-white rounded-lg text-sm font-semibold">Filtrar</button>
      </div>

      {/* Totales */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Base Gravable", val: totalBase, color: "#1E3A5F" },
          { label: "ITBIS 18%", val: totalITBIS, color: "#C8541A" },
          { label: "Total General", val: totalGeneral, color: "#4A7C3F" },
        ].map((t, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background p-5 text-center">
            <p className="text-2xl font-bold" style={{ color: t.color }}>{t.val}</p>
            <p className="text-sm text-darklink mt-1">{t.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1E3A5F]/5">
              <tr>
                {["NCF", "Fecha", "Descripción", "Monto base", "ITBIS 18%", "Total"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {reporteData.map((r, i) => (
                <tr key={i} className="border-t border-border hover:bg-gray-50 dark:hover:bg-white/5">
                  <td className="px-5 py-3.5 font-mono text-xs text-[#1E3A5F] font-semibold">{r.ncf}</td>
                  <td className="px-5 py-3.5 text-xs text-darklink">{r.fecha}</td>
                  <td className="px-5 py-3.5 text-dark dark:text-white">{r.descripcion}</td>
                  <td className="px-5 py-3.5 text-darklink">{r.monto}</td>
                  <td className="px-5 py-3.5 text-[#C8541A]">{r.itbis}</td>
                  <td className="px-5 py-3.5 font-semibold text-dark dark:text-white">{r.total}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#1E3A5F]/10 font-bold">
              <tr>
                <td colSpan={3} className="px-5 py-4 text-sm text-[#1E3A5F] font-bold uppercase">TOTALES ({reporteData.length} comprobantes)</td>
                <td className="px-5 py-4 text-dark dark:text-white">{totalBase}</td>
                <td className="px-5 py-4 text-[#C8541A]">{totalITBIS}</td>
                <td className="px-5 py-4 text-[#4A7C3F]">{totalGeneral}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
