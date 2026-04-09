"use client";
import { Icon } from "@iconify/react";

const pagosPendientes = [
  { id: "FAC-0908", cliente: "La Sirena Supermercados", monto: "RD$ 67,500", diasVencida: 32, email: "cuentas@lasirena.com", telefono: "809-555-1234" },
  { id: "FAC-0904", cliente: "Tienda Naturista Verde", monto: "RD$ 31,800", diasVencida: 55, email: "pagos@naturistav.com", telefono: "809-555-5678" },
  { id: "FAC-0897", cliente: "Boutique Glamour", monto: "RD$ 15,600", diasVencida: 78, email: "admin@bglamour.com", telefono: "809-555-9012" },
  { id: "FAC-0882", cliente: "Joyería Ámbar", monto: "RD$ 21,000", diasVencida: 45, email: "finanzas@ambar.com", telefono: "809-555-3456" },
  { id: "FAC-0909", cliente: "Farmacia Carol", monto: "RD$ 28,400", diasVencida: 0, email: "cuentas@fcarol.com", telefono: "809-555-7890" },
  { id: "FAC-0906", cliente: "Joyería Ámbar", monto: "RD$ 21,000", diasVencida: 0, email: "finanzas@ambar.com", telefono: "809-555-3456" },
  { id: "FAC-0903", cliente: "Panadería El Sol", monto: "RD$ 24,000", diasVencida: 0, email: "admin@elsol.com", telefono: "809-555-2345" },
];

function getAntiguedadLabel(dias: number) {
  if (dias === 0) return { label: "No vencida", color: "bg-green-100 text-green-700" };
  if (dias <= 30) return { label: "0–30 días", color: "bg-yellow-100 text-yellow-700" };
  if (dias <= 60) return { label: "31–60 días", color: "bg-orange-100 text-orange-700" };
  if (dias <= 90) return { label: "61–90 días", color: "bg-red-100 text-red-600" };
  return { label: "+90 días", color: "bg-red-200 text-red-800 font-bold" };
}

export default function PagosPendientesPage() {
  const totalPendiente = pagosPendientes.reduce((_, p) => _, 0);

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Pagos Pendientes</h1>
        <p className="text-sm text-darklink mt-1">Cuentas por cobrar — antigüedad de deuda</p>
      </div>

      {/* Aging buckets */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "No vencidas", val: "RD$ 73,400", count: 3, color: "#4A7C3F", bg: "bg-green-50", border: "border-green-200" },
          { label: "0–30 días", val: "RD$ 67,500", count: 1, color: "#D4A017", bg: "bg-yellow-50", border: "border-yellow-200" },
          { label: "31–60 días", val: "RD$ 52,800", count: 2, color: "#C8541A", bg: "bg-orange-50", border: "border-orange-200" },
          { label: "+60 días", val: "RD$ 15,600", count: 1, color: "#dc2626", bg: "bg-red-50", border: "border-red-200" },
        ].map((b, i) => (
          <div key={i} className={`rounded-2xl shadow-md bg-background p-5 border-l-4 ${b.border}`}>
            <p className="text-xl font-bold text-dark dark:text-white">{b.val}</p>
            <p className="text-sm" style={{ color: b.color }}>{b.label}</p>
            <p className="text-xs text-darklink mt-1">{b.count} factura(s)</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="px-6 py-4 border-b border-border flex items-center justify-between">
          <h5 className="font-semibold text-dark dark:text-white">Detalle de cuentas por cobrar</h5>
          <span className="text-sm text-[#C8541A] font-bold">Total: RD$ 209,300</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1E3A5F]/5">
              <tr>
                {["Factura", "Cliente", "Monto", "Antigüedad", "Días vencida", "Contacto", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pagosPendientes.map((p, i) => {
                const { label, color } = getAntiguedadLabel(p.diasVencida);
                return (
                  <tr key={i} className="border-t border-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-5 py-3.5 font-mono text-xs text-[#1E3A5F] font-bold">{p.id}</td>
                    <td className="px-5 py-3.5 font-medium text-dark dark:text-white">{p.cliente}</td>
                    <td className="px-5 py-3.5 font-semibold text-dark dark:text-white">{p.monto}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${color}`}>{label}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      {p.diasVencida > 0 ? (
                        <span className={`font-bold ${p.diasVencida > 60 ? "text-red-600" : p.diasVencida > 30 ? "text-orange-600" : "text-yellow-600"}`}>
                          {p.diasVencida} días
                        </span>
                      ) : (
                        <span className="text-green-600 font-medium">Al día</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="text-xs text-darklink">
                        <p>{p.email}</p>
                        <p>{p.telefono}</p>
                      </div>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5">
                        <button className="text-xs bg-green-100 text-green-700 px-2.5 py-1.5 rounded-lg font-semibold hover:bg-green-200">Registrar pago</button>
                        <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-600" title="WhatsApp">
                          <Icon icon="solar:chat-line-linear" height={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
