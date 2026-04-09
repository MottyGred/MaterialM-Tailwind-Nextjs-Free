"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const ordenes = [
  { id: "ORD-1048", cliente: "Supermercados Nacional", producto: "Bolsas kraft 2 colores", cantidad: 5000, operario: "Carlos M.", estado: "En Producción", entrega: "12/04/2025", prioridad: "Alta", notas: 2 },
  { id: "ORD-1047", cliente: "Farmacia Carol", producto: "Bolsas plásticas biodeg.", cantidad: 2000, operario: "Marta G.", estado: "Lista", entrega: "10/04/2025", prioridad: "Normal", notas: 0 },
  { id: "ORD-1046", cliente: "La Sirena", producto: "Tote bags algodón", cantidad: 1500, operario: "Luis R.", estado: "En Diseño", entrega: "15/04/2025", prioridad: "Alta", notas: 3 },
  { id: "ORD-1045", cliente: "Café Santo Domingo", producto: "Bolsas papel kraft", cantidad: 800, operario: "Ana S.", estado: "Entregada", entrega: "08/04/2025", prioridad: "Normal", notas: 1 },
  { id: "ORD-1044", cliente: "Joyería Ámbar", producto: "Gift bags premium", cantidad: 300, operario: "Carlos M.", estado: "En Producción", entrega: "14/04/2025", prioridad: "Urgente", notas: 4 },
  { id: "ORD-1043", cliente: "Tienda Naturista Verde", producto: "Bolsas yute", cantidad: 600, operario: "Pedro L.", estado: "Lista", entrega: "09/04/2025", prioridad: "Normal", notas: 0 },
  { id: "ORD-1042", cliente: "Panadería El Sol", producto: "Bolsas para pan", cantidad: 3000, operario: "Marta G.", estado: "En Diseño", entrega: "17/04/2025", prioridad: "Normal", notas: 1 },
  { id: "ORD-1041", cliente: "Hotel Caribe Tours", producto: "Bolsas nonwoven", cantidad: 1200, operario: "Por asignar", estado: "Pendiente", entrega: "20/04/2025", prioridad: "Alta", notas: 0 },
  { id: "ORD-1040", cliente: "Distribuidora Hidalgo", producto: "Bolsas plásticas", cantidad: 10000, operario: "Luis R.", estado: "En Producción", entrega: "22/04/2025", prioridad: "Normal", notas: 2 },
  { id: "ORD-1039", cliente: "Salón Bella Image", producto: "Bolsas laminadas", cantidad: 500, operario: "Carlos M.", estado: "En Diseño", entrega: "25/04/2025", prioridad: "Normal", notas: 0 },
];

const estadoStyles: Record<string, { pill: string; dot: string }> = {
  Pendiente: { pill: "bg-gray-100 text-gray-600", dot: "bg-gray-400" },
  "En Diseño": { pill: "bg-yellow-100 text-yellow-700", dot: "bg-yellow-500" },
  "En Producción": { pill: "bg-blue-100 text-blue-700", dot: "bg-blue-500" },
  Lista: { pill: "bg-green-100 text-green-700", dot: "bg-green-500" },
  Entregada: { pill: "bg-purple-100 text-purple-700", dot: "bg-purple-500" },
};

const priorityStyles: Record<string, string> = {
  Normal: "bg-gray-100 text-gray-500",
  Alta: "bg-orange-100 text-orange-700",
  Urgente: "bg-red-100 text-red-700",
};

const timeline = [
  { estado: "Pendiente", fecha: "01/04/2025 09:00", usuario: "Sistema", nota: "Orden creada desde cotización COT-0235" },
  { estado: "En Diseño", fecha: "03/04/2025 10:30", usuario: "Luis R.", nota: "Asignado al área de diseño" },
  { estado: "En Producción", fecha: "07/04/2025 08:15", usuario: "Carlos M.", nota: "Arte aprobado. Iniciado proceso de impresión" },
];

export default function OrdenesPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [selectedOrden, setSelectedOrden] = useState<typeof ordenes[0] | null>(null);

  const estados = ["Todos", "Pendiente", "En Diseño", "En Producción", "Lista", "Entregada"];
  const filtradas = filtro === "Todos" ? ordenes : ordenes.filter(o => o.estado === filtro);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Órdenes de Trabajo</h1>
          <p className="text-sm text-darklink mt-1">Flujo completo de producción</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a] transition-colors shadow-sm">
          <Icon icon="solar:add-circle-linear" height={18} />
          Nueva Orden
        </button>
      </div>

      {/* Estado KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: "Pendientes", val: ordenes.filter(o=>o.estado==="Pendiente").length, color: "#6b7280", bg: "bg-gray-100" },
          { label: "En Diseño", val: ordenes.filter(o=>o.estado==="En Diseño").length, color: "#D4A017", bg: "bg-yellow-50" },
          { label: "En Producción", val: ordenes.filter(o=>o.estado==="En Producción").length, color: "#1E3A5F", bg: "bg-blue-50" },
          { label: "Listas", val: ordenes.filter(o=>o.estado==="Lista").length, color: "#4A7C3F", bg: "bg-green-50" },
          { label: "Entregadas", val: ordenes.filter(o=>o.estado==="Entregada").length, color: "#7c3aed", bg: "bg-purple-50" },
        ].map((k, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background p-4 text-center cursor-pointer hover:shadow-lg transition-shadow" onClick={() => setFiltro(k.label === "En Producción" ? "En Producción" : k.label === "Listas" ? "Lista" : k.label === "Entregadas" ? "Entregada" : k.label)}>
            <div className={`w-3 h-3 rounded-full mx-auto mb-2`} style={{ backgroundColor: k.color }}></div>
            <p className="text-2xl font-bold text-dark dark:text-white">{k.val}</p>
            <p className="text-xs text-darklink mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Filtros */}
      <div className="flex gap-2 flex-wrap">
        {estados.map(e => (
          <button key={e} onClick={() => setFiltro(e)} className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${filtro === e ? "bg-[#1E3A5F] text-white" : "border border-border text-darklink hover:border-[#1E3A5F] hover:text-[#1E3A5F]"}`}>
            {e}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1E3A5F]/5">
              <tr>
                {["Orden", "Cliente", "Producto", "Cant.", "Operario", "Prioridad", "Estado", "Entrega", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtradas.map((o, i) => (
                <tr key={i} className="border-t border-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                  <td className="px-5 py-3.5 font-mono text-xs text-[#1E3A5F] font-bold">{o.id}</td>
                  <td className="px-5 py-3.5 font-medium text-dark dark:text-white">{o.cliente}</td>
                  <td className="px-5 py-3.5 text-darklink max-w-[160px] truncate">{o.producto}</td>
                  <td className="px-5 py-3.5 text-darklink">{o.cantidad.toLocaleString()}</td>
                  <td className="px-5 py-3.5 text-darklink">{o.operario}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${priorityStyles[o.prioridad]}`}>{o.prioridad}</span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${estadoStyles[o.estado]?.dot}`}></span>
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[o.estado]?.pill}`}>{o.estado}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-xs text-darklink">{o.entrega}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button onClick={() => setSelectedOrden(o)} className="p-1.5 rounded-lg hover:bg-[#1E3A5F]/10 text-[#1E3A5F] transition-colors">
                        <Icon icon="solar:eye-linear" height={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-yellow-50 text-yellow-600 transition-colors">
                        <Icon icon="solar:pen-linear" height={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500 transition-colors">
                        <Icon icon="solar:trash-bin-minimalistic-linear" height={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border">
          <p className="text-xs text-darklink">{filtradas.length} órdenes</p>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrden && (
        <Dialog open={!!selectedOrden} onOpenChange={() => setSelectedOrden(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <span className="font-mono text-[#1E3A5F]">{selectedOrden.id}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[selectedOrden.estado]?.pill}`}>{selectedOrden.estado}</span>
              </DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div><label className="text-xs text-darklink">Cliente</label><p className="font-semibold text-dark dark:text-white">{selectedOrden.cliente}</p></div>
              <div><label className="text-xs text-darklink">Producto</label><p className="font-semibold text-dark dark:text-white">{selectedOrden.producto}</p></div>
              <div><label className="text-xs text-darklink">Cantidad</label><p className="font-semibold text-dark dark:text-white">{selectedOrden.cantidad.toLocaleString()} unidades</p></div>
              <div><label className="text-xs text-darklink">Fecha de entrega</label><p className="font-semibold text-dark dark:text-white">{selectedOrden.entrega}</p></div>
              <div><label className="text-xs text-darklink">Operario</label><p className="font-semibold text-dark dark:text-white">{selectedOrden.operario}</p></div>
              <div><label className="text-xs text-darklink">Prioridad</label><span className={`text-xs font-bold px-2 py-0.5 rounded-full ${priorityStyles[selectedOrden.prioridad]}`}>{selectedOrden.prioridad}</span></div>
            </div>
            <div className="mt-4">
              <h6 className="font-semibold text-sm text-dark dark:text-white mb-3">Historial de estados</h6>
              <div className="relative pl-6">
                <div className="absolute left-2 top-0 bottom-0 w-px bg-border"></div>
                {timeline.map((t, i) => (
                  <div key={i} className="relative mb-4">
                    <div className="absolute -left-4 w-3 h-3 rounded-full bg-[#1E3A5F] border-2 border-white dark:border-gray-800"></div>
                    <p className="font-semibold text-sm text-dark dark:text-white">{t.estado}</p>
                    <p className="text-xs text-darklink">{t.fecha} · {t.usuario}</p>
                    <p className="text-xs text-darklink mt-0.5 italic">"{t.nota}"</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button className="px-4 py-2 text-sm border border-border rounded-lg text-darklink">Cerrar</button>
              <button className="px-4 py-2 text-sm bg-[#C8541A] text-white rounded-lg font-semibold">Cambiar estado</button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
