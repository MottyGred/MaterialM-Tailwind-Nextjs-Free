"use client";
import { Icon } from "@iconify/react";

const kpis = [
  {
    label: "Ventas del Día",
    value: "RD$ 48,250",
    change: "+12.4%",
    up: true,
    icon: "solar:dollar-minimalistic-linear",
    color: "bg-[#1E3A5F]",
    light: "bg-blue-50",
    textColor: "text-[#1E3A5F]",
  },
  {
    label: "Cotizaciones Pendientes",
    value: "23",
    change: "+3 hoy",
    up: true,
    icon: "solar:document-text-linear",
    color: "bg-[#D4A017]",
    light: "bg-yellow-50",
    textColor: "text-[#D4A017]",
  },
  {
    label: "Órdenes en Producción",
    value: "17",
    change: "5 urgentes",
    up: false,
    icon: "solar:bag-5-linear",
    color: "bg-[#4A7C3F]",
    light: "bg-green-50",
    textColor: "text-[#4A7C3F]",
  },
  {
    label: "Pagos por Cobrar",
    value: "RD$ 186,400",
    change: "+8 clientes",
    up: false,
    icon: "solar:card-2-linear",
    color: "bg-[#C8541A]",
    light: "bg-orange-50",
    textColor: "text-[#C8541A]",
  },
];

export default function KPICards() {
  return (
    <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
      {kpis.map((kpi, i) => (
        <div
          key={i}
          className="rounded-2xl shadow-md bg-background p-5 flex flex-col gap-3"
        >
          <div className="flex items-center justify-between">
            <span
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${kpi.light}`}
            >
              <Icon icon={kpi.icon} className={kpi.textColor} height={26} />
            </span>
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                kpi.up
                  ? "bg-green-100 text-green-700"
                  : "bg-orange-100 text-orange-700"
              }`}
            >
              {kpi.change}
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold text-dark dark:text-white">
              {kpi.value}
            </p>
            <p className="text-sm text-darklink mt-0.5">{kpi.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
