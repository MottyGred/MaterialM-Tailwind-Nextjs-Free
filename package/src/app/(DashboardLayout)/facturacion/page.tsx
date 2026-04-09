"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const facturas = [
  { id: "FAC-0910", cliente: "Supermercados Nacional", monto: "RD$ 85,000", estado: "Pagada", fecha: "12/03/2025", vence: "12/04/2025", orden: "ORD-1021" },
  { id: "FAC-0909", cliente: "Farmacia Carol", monto: "RD$ 28,400", estado: "Pendiente", fecha: "05/04/2025", vence: "05/05/2025", orden: "ORD-1034" },
  { id: "FAC-0908", cliente: "La Sirena Supermercados", monto: "RD$ 67,500", estado: "Vencida", fecha: "08/02/2025", vence: "08/03/2025", orden: "ORD-1015" },
  { id: "FAC-0907", cliente: "Hotel Caribe Tours", monto: "RD$ 42,600", estado: "Pagada", fecha: "01/04/2025", vence: "01/05/2025", orden: "ORD-1032" },
  { id: "FAC-0906", cliente: "Joyería Ámbar", monto: "RD$ 21,000", estado: "Pendiente", fecha: "09/04/2025", vence: "09/05/2025", orden: "ORD-1044" },
  { id: "FAC-0905", cliente: "Café Santo Domingo", monto: "RD$ 19,200", estado: "Pagada", fecha: "28/03/2025", vence: "28/04/2025", orden: "ORD-1029" },
  { id: "FAC-0904", cliente: "Tienda Naturista Verde", monto: "RD$ 31,800", estado: "Vencida", fecha: "15/01/2025", vence: "15/02/2025", orden: "ORD-0998" },
  { id: "FAC-0903", cliente: "Panadería El Sol", monto: "RD$ 24,000", estado: "Pendiente", fecha: "02/04/2025", vence: "02/05/2025", orden: "ORD-1037" },
];

const estadoStyles: Record<string, string> = {
  Pagada: "bg-green-100 text-green-700",
  Pendiente: "bg-yellow-100 text-yellow-700",
  Vencida: "bg-red-100 text-red-600",
};

export default function FacturacionPage() {
  const [showPreview, setShowPreview] = useState(false);
  const [previewFac, setPreviewFac] = useState<typeof facturas[0] | null>(null);

  const totalPagado = "RD$ 174,800";
  const totalPendiente = "RD$ 73,600";
  const totalVencido = "RD$ 99,300";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Facturación</h1>
          <p className="text-sm text-darklink mt-1">Registro y gestión de facturas</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a] transition-colors shadow-sm">
          <Icon icon="solar:add-circle-linear" height={18} />
          Nueva Factura
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {[
          { label: "Total Cobrado", val: totalPagado, icon: "solar:check-circle-linear", color: "#4A7C3F", bg: "bg-green-50", sub: "Este mes" },
          { label: "Pendiente de Cobro", val: totalPendiente, icon: "solar:clock-circle-linear", color: "#D4A017", bg: "bg-yellow-50", sub: "3 facturas" },
          { label: "Facturas Vencidas", val: totalVencido, icon: "solar:danger-triangle-linear", color: "#C8541A", bg: "bg-red-50", sub: "2 facturas" },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background p-5 flex items-center gap-4">
            <span className={`w-14 h-14 rounded-2xl flex items-center justify-center ${k.bg} flex-shrink-0`}>
              <Icon icon={k.icon} style={{ color: k.color }} height={28} />
            </span>
            <div>
              <p className="text-2xl font-bold text-dark dark:text-white">{k.val}</p>
              <p className="text-sm text-darklink">{k.label}</p>
              <p className="text-xs text-darklink mt-0.5">{k.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h5 className="font-semibold text-dark dark:text-white">Listado de Facturas</h5>
          <button className="flex items-center gap-1.5 text-sm text-darklink border border-border rounded-lg px-3 py-1.5 hover:border-[#1E3A5F] hover:text-[#1E3A5F]">
            <Icon icon="solar:download-linear" height={15} />
            Exportar
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1E3A5F]/5">
              <tr>
                {["N° Factura", "Cliente", "Orden", "Monto", "Emisión", "Vencimiento", "Estado", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {facturas.map((f, i) => (
                <tr key={i} className="border-t border-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-[#1E3A5F] font-bold">{f.id}</td>
                  <td className="px-5 py-3.5 font-medium text-dark dark:text-white">{f.cliente}</td>
                  <td className="px-5 py-3.5 font-mono text-xs text-darklink">{f.orden}</td>
                  <td className="px-5 py-3.5 font-semibold text-dark dark:text-white">{f.monto}</td>
                  <td className="px-5 py-3.5 text-xs text-darklink">{f.fecha}</td>
                  <td className={`px-5 py-3.5 text-xs font-medium ${f.estado === "Vencida" ? "text-red-600 font-bold" : "text-darklink"}`}>{f.vence}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[f.estado]}`}>{f.estado}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => { setPreviewFac(f); setShowPreview(true); }} className="p-1.5 rounded-lg hover:bg-[#1E3A5F]/10 text-[#1E3A5F] transition-colors" title="Ver PDF">
                        <Icon icon="solar:document-linear" height={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Email">
                        <Icon icon="solar:letter-linear" height={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors" title="WhatsApp">
                        <Icon icon="solar:chat-line-linear" height={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PDF Preview Modal */}
      {showPreview && previewFac && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPreview(false)}>
          <div className="bg-white rounded-2xl max-w-xl w-full shadow-2xl p-8" onClick={e => e.stopPropagation()}>
            {/* Invoice Preview */}
            <div className="border-b-4 border-[#1E3A5F] pb-5 mb-5 flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 bg-[#1E3A5F] rounded-lg flex items-center justify-center">
                    <Icon icon="solar:leaf-linear" className="text-white" height={16} />
                  </div>
                  <div>
                    <p className="font-bold text-[#1E3A5F] text-lg leading-tight">Haladás</p>
                    <p className="text-xs text-[#C8541A] font-medium uppercase tracking-widest">Taller Creativo</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">RNC: 1-32-456789-0</p>
                <p className="text-xs text-gray-500">Santo Domingo, República Dominicana</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-[#1E3A5F]">FACTURA</p>
                <p className="text-sm font-mono text-gray-600">{previewFac.id}</p>
                <p className="text-xs text-gray-400 mt-1">Emisión: {previewFac.fecha}</p>
                <p className="text-xs text-gray-400">Vence: {previewFac.vence}</p>
              </div>
            </div>
            <div className="mb-5">
              <p className="text-xs text-gray-400 uppercase mb-1">Facturar a</p>
              <p className="font-bold text-gray-800">{previewFac.cliente}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 mb-5">
              <div className="flex justify-between text-sm py-1.5 border-b border-gray-200">
                <span className="text-gray-600">Descripción</span>
                <span className="text-gray-600">Monto</span>
              </div>
              <div className="flex justify-between text-sm py-2">
                <span className="text-gray-800">Bolsas personalizadas (Ref: {previewFac.orden})</span>
                <span className="font-semibold text-gray-800">{previewFac.monto}</span>
              </div>
              <div className="flex justify-between text-sm py-1 border-t border-gray-200 mt-2">
                <span className="text-gray-500">ITBIS (18%)</span>
                <span className="text-gray-600">RD$ {(parseInt(previewFac.monto.replace(/\D/g, "")) * 0.18).toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-bold text-[#1E3A5F] text-lg mt-2 pt-2 border-t-2 border-[#1E3A5F]/20">
                <span>Total</span>
                <span>{previewFac.monto}</span>
              </div>
            </div>
            <span className={`inline-block text-xs font-bold px-3 py-1.5 rounded-full mb-4 ${estadoStyles[previewFac.estado]}`}>{previewFac.estado}</span>
            <div className="flex gap-2 justify-end">
              <button onClick={() => setShowPreview(false)} className="px-4 py-2 text-sm border border-gray-200 rounded-lg text-gray-600">Cerrar</button>
              <button className="px-4 py-2 text-sm bg-[#1E3A5F] text-white rounded-lg font-semibold">Descargar PDF</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
