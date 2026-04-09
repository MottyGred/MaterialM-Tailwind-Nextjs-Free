"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const eventosDelMes: Record<number, { id: string; cliente: string; color: string; estado: string }[]> = {
  8: [{ id: "ORD-1043", cliente: "Naturista Verde", color: "bg-green-500", estado: "Lista" }],
  10: [{ id: "ORD-1047", cliente: "Farmacia Carol", color: "bg-green-500", estado: "Lista" }],
  12: [{ id: "ORD-1048", cliente: "Supermercados Nac.", color: "bg-blue-600", estado: "Producción" }],
  14: [{ id: "ORD-1044", cliente: "Joyería Ámbar", color: "bg-red-500", estado: "Producción" }],
  15: [{ id: "ORD-1046", cliente: "La Sirena", color: "bg-yellow-500", estado: "Diseño" }],
  17: [{ id: "ORD-1042", cliente: "Panadería El Sol", color: "bg-yellow-500", estado: "Diseño" }],
  20: [{ id: "ORD-1041", cliente: "Hotel Caribe", color: "bg-gray-400", estado: "Pendiente" }],
  22: [{ id: "ORD-1040", cliente: "Dist. Hidalgo", color: "bg-blue-600", estado: "Producción" }],
  25: [{ id: "ORD-1039", cliente: "Salón Bella", color: "bg-yellow-500", estado: "Diseño" }],
};

const DAYS_OF_WEEK = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
const MONTH_START_DOW = 2; // April 2025 starts on Tuesday
const DAYS_IN_MONTH = 30;

export default function CalendarioPage() {
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const cells: (number | null)[] = [
    ...Array(MONTH_START_DOW).fill(null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];

  const eventosDelDia = selectedDay ? (eventosDelMes[selectedDay] || []) : [];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Calendario de Órdenes</h1>
          <p className="text-sm text-darklink mt-1">Vista mensual — Abril 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-2 border border-border rounded-xl text-sm text-darklink hover:border-[#1E3A5F]">
            <Icon icon="solar:alt-arrow-left-linear" height={14} /> Anterior
          </button>
          <span className="flex items-center px-4 py-2 bg-[#1E3A5F] text-white rounded-xl text-sm font-semibold">Abril 2025</span>
          <button className="flex items-center gap-1 px-3 py-2 border border-border rounded-xl text-sm text-darklink hover:border-[#1E3A5F]">
            Siguiente <Icon icon="solar:alt-arrow-right-linear" height={14} />
          </button>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex gap-4 flex-wrap">
        {[
          { color: "bg-gray-400", label: "Pendiente" },
          { color: "bg-yellow-500", label: "En Diseño" },
          { color: "bg-blue-600", label: "En Producción" },
          { color: "bg-green-500", label: "Lista / Entregada" },
          { color: "bg-red-500", label: "Urgente" },
        ].map((l, i) => (
          <div key={i} className="flex items-center gap-2 text-sm text-darklink">
            <span className={`w-3 h-3 rounded-full ${l.color}`}></span>
            {l.label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 rounded-2xl shadow-md bg-background p-6">
          <div className="grid grid-cols-7 gap-1 mb-2">
            {DAYS_OF_WEEK.map(d => (
              <div key={d} className="text-center text-xs font-semibold text-darklink uppercase py-2">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              const eventos = day ? (eventosDelMes[day] || []) : [];
              const isSelected = day === selectedDay;
              const isToday = day === 9;
              return (
                <div
                  key={i}
                  onClick={() => day && setSelectedDay(day)}
                  className={`min-h-[80px] p-2 rounded-xl border cursor-pointer transition-all ${
                    !day ? "border-transparent" :
                    isSelected ? "border-[#1E3A5F] bg-[#1E3A5F]/5" :
                    isToday ? "border-[#C8541A] bg-orange-50/50" :
                    "border-border hover:border-[#1E3A5F]/40 hover:bg-gray-50"
                  }`}
                >
                  {day && (
                    <>
                      <span className={`text-xs font-bold ${isToday ? "text-[#C8541A]" : "text-dark dark:text-white"}`}>
                        {day}
                      </span>
                      <div className="flex flex-col gap-0.5 mt-1">
                        {eventos.map((ev, j) => (
                          <div key={j} className={`text-white text-[9px] font-semibold px-1.5 py-0.5 rounded-md truncate ${ev.color}`}>
                            {ev.id}
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Day detail */}
        <div className="rounded-2xl shadow-md bg-background p-6">
          <h5 className="font-semibold text-dark dark:text-white mb-1">
            {selectedDay ? `${selectedDay} de Abril, 2025` : "Selecciona un día"}
          </h5>
          <p className="text-sm text-darklink mb-4">
            {selectedDay ? `${eventosDelDia.length} órdenes programadas` : "Haz clic en cualquier día del calendario"}
          </p>
          {!selectedDay && (
            <div className="text-center py-8 text-darklink">
              <Icon icon="solar:calendar-linear" height={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Ningún día seleccionado</p>
            </div>
          )}
          {selectedDay && eventosDelDia.length === 0 && (
            <div className="text-center py-8 text-darklink">
              <Icon icon="solar:check-circle-linear" height={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm">Sin entregas programadas</p>
            </div>
          )}
          {eventosDelDia.map((ev, i) => (
            <div key={i} className="rounded-xl border border-border p-4 mb-3 hover:shadow-md transition-shadow">
              <div className={`text-xs font-bold text-white ${ev.color} inline-block px-2 py-0.5 rounded-md mb-2`}>{ev.estado}</div>
              <p className="font-semibold text-dark dark:text-white text-sm">{ev.id}</p>
              <p className="text-xs text-darklink mt-0.5">{ev.cliente}</p>
              <button className="mt-3 text-xs text-[#1E3A5F] font-semibold hover:underline">Ver detalle →</button>
            </div>
          ))}
          {selectedDay && (
            <button className="mt-4 w-full py-2 border border-dashed border-[#1E3A5F] text-[#1E3A5F] rounded-xl text-sm font-semibold hover:bg-[#1E3A5F]/5 transition-colors">
              + Programar entrega
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
