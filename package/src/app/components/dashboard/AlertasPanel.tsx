"use client";
import { Icon } from "@iconify/react";

const alertas = [
  {
    tipo: "⚠️ Cotización",
    mensaje: "COT-0231 de La Sirena vence en 1 día",
    tiempo: "hace 2h",
    urgente: true,
  },
  {
    tipo: "🔴 Pago vencido",
    mensaje: "Factura FAC-0882 de Joyería Ámbar — 45 días vencida",
    tiempo: "hace 1d",
    urgente: true,
  },
  {
    tipo: "📦 Entrega próxima",
    mensaje: "ORD-1044 debe entregarse mañana (Joyería Ámbar)",
    tiempo: "hace 3h",
    urgente: true,
  },
  {
    tipo: "✅ Aprobada",
    mensaje: "Cotización COT-0229 de Hotel Caribe Tours aprobada",
    tiempo: "hace 4h",
    urgente: false,
  },
  {
    tipo: "💬 WhatsApp",
    mensaje: "Cliente Farmacia Carol solicitó cotización adicional",
    tiempo: "hace 6h",
    urgente: false,
  },
  {
    tipo: "📋 Nueva orden",
    mensaje: "ORD-1048 asignada a Carlos M. — 5,000 bolsas kraft",
    tiempo: "ayer",
    urgente: false,
  },
];

export default function AlertasPanel() {
  return (
    <div className="rounded-2xl shadow-md bg-background p-6 w-full h-full">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-base font-semibold text-dark dark:text-white">Alertas y Actividad</h5>
        <span className="text-xs bg-red-100 text-red-600 font-bold px-2 py-0.5 rounded-full">3 urgentes</span>
      </div>
      <div className="flex flex-col gap-0">
        {alertas.map((a, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 py-3 border-b border-border last:border-0 ${
              a.urgente ? "bg-red-50/40 dark:bg-red-900/10 -mx-2 px-2 rounded-lg" : ""
            }`}
          >
            <span className="text-base mt-0.5 flex-shrink-0">{a.tipo.split(" ")[0]}</span>
            <div className="flex-1 min-w-0">
              <p className="text-xs text-darklink font-medium">{a.tipo.split(" ").slice(1).join(" ")}</p>
              <p className="text-sm text-dark dark:text-white leading-snug truncate">{a.mensaje}</p>
            </div>
            <span className="text-[10px] text-darklink whitespace-nowrap flex-shrink-0">{a.tiempo}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
