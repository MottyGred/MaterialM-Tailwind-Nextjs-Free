"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const ordenesPapelera = [
  { id: "ORD-1035", cliente: "Importadora Pérez", producto: "Bolsas pp tejido", cantidad: 800, motivo: "Cliente canceló el pedido", eliminadoPor: "Ana Rodríguez", fechaElim: "05/04/2025 14:32" },
  { id: "ORD-1028", cliente: "Boutique Glamour", producto: "Bolsas luxe satinada", cantidad: 200, motivo: "Duplicado — registrada dos veces por error", eliminadoPor: "Luis Méndez", fechaElim: "01/04/2025 09:15" },
  { id: "ORD-1019", cliente: "Suplidora del Norte", producto: "Bolsas plásticas 10x15", cantidad: 5000, motivo: "Precio incorrecto — se creó nueva cotización", eliminadoPor: "Carlos M.", fechaElim: "25/03/2025 16:48" },
  { id: "ORD-0994", cliente: "Artesanías Dominicanas", producto: "Bolsas tela cañamazo", cantidad: 150, motivo: "Sin material disponible — pendiente de re-cotizar", eliminadoPor: "Marta G.", fechaElim: "18/03/2025 11:20" },
];

export default function PapeleraPage() {
  const [seleccionados, setSeleccionados] = useState<string[]>([]);

  const toggleSeleccion = (id: string) => {
    setSeleccionados(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Papelera de Órdenes</h1>
        <p className="text-sm text-darklink mt-1">Órdenes eliminadas con registro de auditoría completo</p>
      </div>

      {/* Info Banner */}
      <div className="rounded-2xl bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 p-4 flex items-start gap-3">
        <Icon icon="solar:info-circle-linear" className="text-yellow-600 flex-shrink-0 mt-0.5" height={20} />
        <div>
          <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-400">Política de purga automática</p>
          <p className="text-xs text-yellow-700 dark:text-yellow-500 mt-0.5">Las órdenes en la papelera se eliminan permanentemente después de 30 días. La purga automática está configurada para el primer día de cada mes.</p>
        </div>
      </div>

      {/* Actions */}
      {seleccionados.length > 0 && (
        <div className="flex items-center justify-between bg-[#1E3A5F]/5 rounded-xl px-4 py-3">
          <span className="text-sm font-semibold text-[#1E3A5F]">{seleccionados.length} orden(es) seleccionada(s)</span>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-2 bg-green-500 text-white text-sm rounded-lg font-semibold hover:bg-green-600">
              <Icon icon="solar:refresh-linear" height={14} />
              Restaurar seleccionadas
            </button>
            <button className="flex items-center gap-1.5 px-3 py-2 bg-red-500 text-white text-sm rounded-lg font-semibold hover:bg-red-600">
              <Icon icon="solar:trash-bin-minimalistic-bold" height={14} />
              Eliminar permanentemente
            </button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-red-50 dark:bg-red-900/20">
              <tr>
                <th className="px-5 py-3.5 w-10">
                  <input type="checkbox" className="rounded" onChange={(e) => {
                    if (e.target.checked) setSeleccionados(ordenesPapelera.map(o => o.id));
                    else setSeleccionados([]);
                  }} />
                </th>
                {["Orden", "Cliente", "Producto", "Cant.", "Motivo eliminación", "Eliminado por", "Fecha eliminación", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ordenesPapelera.map((o, i) => (
                <tr key={i} className={`border-t border-border hover:bg-red-50/30 dark:hover:bg-red-900/10 transition-colors ${seleccionados.includes(o.id) ? "bg-red-50/50" : ""}`}>
                  <td className="px-5 py-4">
                    <input type="checkbox" className="rounded" checked={seleccionados.includes(o.id)} onChange={() => toggleSeleccion(o.id)} />
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-red-500 font-bold">{o.id}</span>
                      <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-semibold">Eliminada</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 font-medium text-dark dark:text-white">{o.cliente}</td>
                  <td className="px-5 py-4 text-darklink">{o.producto}</td>
                  <td className="px-5 py-4 text-darklink">{o.cantidad.toLocaleString()}</td>
                  <td className="px-5 py-4 max-w-[200px]">
                    <span className="text-xs bg-gray-100 dark:bg-white/10 text-darklink px-2 py-1 rounded-lg italic">"{o.motivo}"</span>
                  </td>
                  <td className="px-5 py-4 text-darklink">{o.eliminadoPor}</td>
                  <td className="px-5 py-4 text-xs text-darklink">{o.fechaElim}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1.5 rounded-lg font-semibold hover:bg-green-200 transition-colors">
                        <Icon icon="solar:refresh-linear" height={12} />
                        Restaurar
                      </button>
                      <button className="flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2.5 py-1.5 rounded-lg font-semibold hover:bg-red-200 transition-colors">
                        <Icon icon="solar:trash-bin-minimalistic-linear" height={12} />
                        Purgar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border bg-red-50/30 dark:bg-red-900/10">
          <p className="text-xs text-red-500 font-medium">{ordenesPapelera.length} órdenes en papelera · Purga automática: 01/05/2025</p>
        </div>
      </div>
    </div>
  );
}
