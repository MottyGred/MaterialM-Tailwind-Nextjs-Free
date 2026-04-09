"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const columnas = ["Por Hacer", "En Progreso", "En Revisión", "Completado"];

const tareasIniciales: Record<string, { id: string; titulo: string; asignado: string; prioridad: string; fecha: string; etiqueta: string }[]> = {
  "Por Hacer": [
    { id: "T-019", titulo: "Diseñar arte para Supermercados Nacional", asignado: "Luis R.", prioridad: "Alta", fecha: "12/04", etiqueta: "Diseño" },
    { id: "T-020", titulo: "Cotizar papel kraft importado", asignado: "Ana R.", prioridad: "Normal", fecha: "15/04", etiqueta: "Compras" },
    { id: "T-021", titulo: "Actualizar precios en catálogo online", asignado: "María T.", prioridad: "Baja", fecha: "20/04", etiqueta: "Admin" },
  ],
  "En Progreso": [
    { id: "T-015", titulo: "Producción bolsas kraft x5000 — Nal.", asignado: "Carlos M.", prioridad: "Urgente", fecha: "12/04", etiqueta: "Producción" },
    { id: "T-016", titulo: "Enviar recordatorio de pago a Ámbar", asignado: "Pedro S.", prioridad: "Alta", fecha: "10/04", etiqueta: "Cobranza" },
  ],
  "En Revisión": [
    { id: "T-011", titulo: "Revisar arte final tote bags La Sirena", asignado: "Carlos M.", prioridad: "Alta", fecha: "15/04", etiqueta: "Diseño" },
    { id: "T-012", titulo: "Verificar calidad bolsas Farmacia Carol", asignado: "Marta G.", prioridad: "Normal", fecha: "10/04", etiqueta: "Calidad" },
  ],
  "Completado": [
    { id: "T-008", titulo: "Entrega ORD-1043 Naturista Verde ✅", asignado: "Pedro L.", prioridad: "Normal", fecha: "08/04", etiqueta: "Entrega" },
    { id: "T-009", titulo: "Factura FAC-0905 enviada a Café SD", asignado: "Ana R.", prioridad: "Normal", fecha: "07/04", etiqueta: "Facturación" },
    { id: "T-010", titulo: "Cotización COT-0228 aprobada", asignado: "Carla V.", prioridad: "Alta", fecha: "06/04", etiqueta: "Ventas" },
  ],
};

const prioridadStyles: Record<string, string> = {
  Urgente: "bg-red-100 text-red-700",
  Alta: "bg-orange-100 text-orange-700",
  Normal: "bg-blue-100 text-blue-700",
  Baja: "bg-gray-100 text-gray-500",
};

const etiquetaStyles: Record<string, string> = {
  Diseño: "bg-purple-100 text-purple-700",
  Producción: "bg-blue-100 text-blue-700",
  Entrega: "bg-green-100 text-green-700",
  Cobranza: "bg-red-100 text-red-600",
  Admin: "bg-gray-100 text-gray-600",
  Ventas: "bg-yellow-100 text-yellow-700",
  Facturación: "bg-indigo-100 text-indigo-700",
  Calidad: "bg-teal-100 text-teal-700",
  Compras: "bg-amber-100 text-amber-700",
};

export default function TareasPage() {
  const [tareas] = useState(tareasIniciales);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Gestión de Tareas</h1>
          <p className="text-sm text-darklink mt-1">Tablero Kanban — flujo de trabajo del equipo</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a] shadow-sm">
          <Icon icon="solar:add-circle-linear" height={18} />
          Nueva Tarea
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-4 gap-3">
        {columnas.map((col, i) => (
          <div key={i} className="rounded-xl bg-background shadow-sm border border-border p-3 text-center">
            <p className="text-xl font-bold text-dark dark:text-white">{tareas[col]?.length || 0}</p>
            <p className="text-xs text-darklink mt-0.5">{col}</p>
          </div>
        ))}
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {columnas.map((col, ci) => {
          const colColors = ["border-gray-300", "border-[#D4A017]", "border-[#C8541A]", "border-[#4A7C3F]"];
          const colBg = ["bg-gray-50", "bg-yellow-50/50", "bg-orange-50/50", "bg-green-50/50"];
          return (
            <div key={ci} className={`rounded-2xl ${colBg[ci]} dark:bg-white/3 border-t-4 ${colColors[ci]} p-4 flex flex-col gap-3 min-h-[400px]`}>
              <div className="flex items-center justify-between mb-1">
                <h3 className="font-bold text-sm text-dark dark:text-white">{col}</h3>
                <span className="w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center text-xs font-bold text-darklink">
                  {tareas[col]?.length || 0}
                </span>
              </div>
              {(tareas[col] || []).map((t, ti) => (
                <div key={ti} className="rounded-xl bg-background shadow-sm border border-border p-4 hover:shadow-md transition-all cursor-pointer group">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${etiquetaStyles[t.etiqueta] || "bg-gray-100 text-gray-600"}`}>{t.etiqueta}</span>
                    <Icon icon="solar:menu-dots-bold" height={14} className="text-darklink opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="text-sm font-semibold text-dark dark:text-white leading-snug">{t.titulo}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-1.5">
                      <div className="w-6 h-6 rounded-full bg-[#1E3A5F]/15 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-[#1E3A5F]">{t.asignado.split(" ")[0][0]}{t.asignado.split(" ")[1]?.[0]}</span>
                      </div>
                      <span className="text-xs text-darklink">{t.asignado}</span>
                    </div>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${prioridadStyles[t.prioridad]}`}>{t.prioridad}</span>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    <Icon icon="solar:calendar-linear" height={11} className="text-darklink" />
                    <span className="text-[10px] text-darklink">{t.fecha}</span>
                    <span className="text-[10px] font-mono text-darklink/60 ml-auto">{t.id}</span>
                  </div>
                </div>
              ))}
              <button className="mt-1 w-full py-2.5 border border-dashed border-border rounded-xl text-xs text-darklink hover:border-[#1E3A5F] hover:text-[#1E3A5F] transition-colors">
                + Agregar tarea
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
