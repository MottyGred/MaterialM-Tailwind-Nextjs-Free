"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

const cotizaciones = [
  { id: "COT-0235", cliente: "Supermercados Nacional", descripcion: "5,000 bolsas kraft 2 colores", total: "RD$ 85,000", fecha: "09/04/2025", vence: "23/04/2025", estado: "Pendiente", vendedor: "Ana Rodríguez" },
  { id: "COT-0234", cliente: "Farmacia Carol", descripcion: "2,000 bolsas plásticas biodeg.", total: "RD$ 28,400", fecha: "08/04/2025", vence: "22/04/2025", estado: "Aprobada", vendedor: "Luis Méndez" },
  { id: "COT-0233", cliente: "La Sirena Supermercados", descripcion: "1,500 tote bags algodón", total: "RD$ 67,500", fecha: "07/04/2025", vence: "10/04/2025", estado: "Pendiente", vendedor: "Ana Rodríguez" },
  { id: "COT-0232", cliente: "Hotel Caribe Tours", descripcion: "1,200 bolsas nonwoven corporativas", total: "RD$ 42,600", fecha: "06/04/2025", vence: "20/04/2025", estado: "Aprobada", vendedor: "Carla Vásquez" },
  { id: "COT-0231", cliente: "Joyería Ámbar", descripcion: "300 gift bags premium con lazo", total: "RD$ 21,000", fecha: "05/04/2025", vence: "10/04/2025", estado: "Rechazada", vendedor: "Pedro Soto" },
  { id: "COT-0230", cliente: "Café Santo Domingo", descripcion: "800 bolsas papel kraft personalizadas", total: "RD$ 19,200", fecha: "04/04/2025", vence: "18/04/2025", estado: "Aprobada", vendedor: "María Torres" },
  { id: "COT-0229", cliente: "Tienda Naturista Verde", descripcion: "600 bolsas yute ecológico", total: "RD$ 31,800", fecha: "03/04/2025", vence: "17/04/2025", estado: "Expirada", vendedor: "Luis Méndez" },
  { id: "COT-0228", cliente: "Panadería El Sol", descripcion: "3,000 bolsas para pan impresión 1 color", total: "RD$ 24,000", fecha: "01/04/2025", vence: "15/04/2025", estado: "Aprobada", vendedor: "Carla Vásquez" },
  { id: "COT-0227", cliente: "Salón Bella Image", descripcion: "500 bolsas laminadas full color", total: "RD$ 18,500", fecha: "30/03/2025", vence: "13/04/2025", estado: "Pendiente", vendedor: "Ana Rodríguez" },
  { id: "COT-0226", cliente: "Distribuidora Hidalgo", descripcion: "10,000 bolsas plásticas genéricas", total: "RD$ 75,000", fecha: "28/03/2025", vence: "11/04/2025", estado: "Rechazada", vendedor: "Pedro Soto" },
];

const estadoStyles: Record<string, string> = {
  Pendiente: "bg-yellow-100 text-yellow-700",
  Aprobada: "bg-green-100 text-green-700",
  Rechazada: "bg-red-100 text-red-600",
  Expirada: "bg-gray-100 text-gray-500",
};

export default function CotizacionesPage() {
  const [filtro, setFiltro] = useState("Todos");
  const [busqueda, setBusqueda] = useState("");

  const estados = ["Todos", "Pendiente", "Aprobada", "Rechazada", "Expirada"];

  const filtradas = cotizaciones.filter((c) => {
    const coincideBusqueda =
      c.cliente.toLowerCase().includes(busqueda.toLowerCase()) ||
      c.id.toLowerCase().includes(busqueda.toLowerCase());
    const coincideEstado = filtro === "Todos" || c.estado === filtro;
    return coincideBusqueda && coincideEstado;
  });

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Cotizaciones</h1>
          <p className="text-sm text-darklink mt-1">Gestión y seguimiento de cotizaciones</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a] transition-colors shadow-sm">
              <Icon icon="solar:add-circle-linear" height={18} />
              Nueva Cotización
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Nueva Cotización</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 mt-2">
              <div className="col-span-2">
                <label className="text-sm font-medium text-dark dark:text-white mb-1 block">Cliente</label>
                <input className="w-full border border-border rounded-lg px-3 py-2 text-sm" placeholder="Seleccionar cliente..." />
              </div>
              <div>
                <label className="text-sm font-medium text-dark dark:text-white mb-1 block">Producto</label>
                <input className="w-full border border-border rounded-lg px-3 py-2 text-sm" placeholder="Tipo de bolsa..." />
              </div>
              <div>
                <label className="text-sm font-medium text-dark dark:text-white mb-1 block">Cantidad</label>
                <input type="number" className="w-full border border-border rounded-lg px-3 py-2 text-sm" placeholder="Unidades..." />
              </div>
              <div>
                <label className="text-sm font-medium text-dark dark:text-white mb-1 block">Precio unitario (RD$)</label>
                <input type="number" className="w-full border border-border rounded-lg px-3 py-2 text-sm" placeholder="0.00" />
              </div>
              <div>
                <label className="text-sm font-medium text-dark dark:text-white mb-1 block">Fecha de vencimiento</label>
                <input type="date" className="w-full border border-border rounded-lg px-3 py-2 text-sm" />
              </div>
              <div className="col-span-2">
                <label className="text-sm font-medium text-dark dark:text-white mb-1 block">Descripción / Especificaciones</label>
                <textarea className="w-full border border-border rounded-lg px-3 py-2 text-sm h-20 resize-none" placeholder="Colores de impresión, medidas, material..."></textarea>
              </div>
              <div className="col-span-2 bg-[#1E3A5F]/5 rounded-lg p-3 flex justify-between items-center">
                <span className="text-sm font-medium text-darklink">Total estimado:</span>
                <span className="text-xl font-bold text-[#1E3A5F]">RD$ 0.00</span>
              </div>
              <div className="col-span-2 flex gap-3 justify-end pt-2">
                <button className="px-4 py-2 text-sm border border-border rounded-lg text-darklink hover:bg-gray-50">Cancelar</button>
                <button className="px-4 py-2 text-sm bg-[#C8541A] text-white rounded-lg font-semibold hover:bg-[#a8440e] transition-colors">
                  <Icon icon="solar:chat-line-linear" height={14} className="inline mr-1" />
                  Enviar por WhatsApp
                </button>
                <button className="px-4 py-2 text-sm bg-[#1E3A5F] text-white rounded-lg font-semibold hover:bg-[#162d4a] transition-colors">
                  Guardar Cotización
                </button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total", val: cotizaciones.length, color: "text-[#1E3A5F]" },
          { label: "Pendientes", val: cotizaciones.filter(c => c.estado === "Pendiente").length, color: "text-yellow-600" },
          { label: "Aprobadas", val: cotizaciones.filter(c => c.estado === "Aprobada").length, color: "text-green-600" },
          { label: "Rechazadas", val: cotizaciones.filter(c => c.estado === "Rechazada").length, color: "text-red-500" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background p-4 text-center">
            <p className={`text-3xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-sm text-darklink mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters + Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-darklink" height={16} />
          <input
            className="w-full border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
            placeholder="Buscar por cliente o ID..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {estados.map((e) => (
            <button
              key={e}
              onClick={() => setFiltro(e)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-colors ${
                filtro === e
                  ? "bg-[#1E3A5F] text-white"
                  : "border border-border text-darklink hover:border-[#1E3A5F] hover:text-[#1E3A5F]"
              }`}
            >
              {e}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1E3A5F]/5">
              <tr>
                {["ID", "Cliente", "Descripción", "Total", "Fecha", "Vence", "Vendedor", "Estado", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtradas.map((c, i) => (
                <tr key={i} className={`border-t border-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${
                  c.vence === "10/04/2025" && c.estado === "Pendiente" ? "bg-red-50/30 dark:bg-red-900/10" : ""
                }`}>
                  <td className="px-5 py-3.5 font-mono text-xs text-[#1E3A5F] font-semibold">{c.id}</td>
                  <td className="px-5 py-3.5 font-medium text-dark dark:text-white">{c.cliente}</td>
                  <td className="px-5 py-3.5 text-darklink max-w-[200px] truncate">{c.descripcion}</td>
                  <td className="px-5 py-3.5 font-semibold text-dark dark:text-white">{c.total}</td>
                  <td className="px-5 py-3.5 text-darklink text-xs">{c.fecha}</td>
                  <td className={`px-5 py-3.5 text-xs font-medium ${c.vence === "10/04/2025" && c.estado === "Pendiente" ? "text-red-600 font-bold" : "text-darklink"}`}>{c.vence}</td>
                  <td className="px-5 py-3.5 text-darklink">{c.vendedor}</td>
                  <td className="px-5 py-3.5">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[c.estado]}`}>
                      {c.estado}
                    </span>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex gap-1.5">
                      <button className="p-1.5 rounded-lg hover:bg-[#1E3A5F]/10 text-[#1E3A5F] transition-colors" title="Ver detalle">
                        <Icon icon="solar:eye-linear" height={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-600 transition-colors" title="WhatsApp">
                        <Icon icon="solar:chat-line-linear" height={15} />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-600 transition-colors" title="Email">
                        <Icon icon="solar:letter-linear" height={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtradas.length === 0 && (
            <div className="text-center py-12 text-darklink">
              <Icon icon="solar:document-text-linear" height={40} className="mx-auto mb-3 opacity-30" />
              <p>No se encontraron cotizaciones</p>
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-border flex items-center justify-between">
          <p className="text-xs text-darklink">{filtradas.length} resultados</p>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs border border-border rounded-lg text-darklink hover:border-[#1E3A5F]">← Anterior</button>
            <button className="px-3 py-1.5 text-xs bg-[#1E3A5F] text-white rounded-lg">1</button>
            <button className="px-3 py-1.5 text-xs border border-border rounded-lg text-darklink hover:border-[#1E3A5F]">Siguiente →</button>
          </div>
        </div>
      </div>
    </div>
  );
}
