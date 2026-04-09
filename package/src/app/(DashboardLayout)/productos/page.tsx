"use client";
import { Icon } from "@iconify/react";

const productos = [
  { id: "PRD-001", nombre: "Bolsa Kraft 20x30 cm", categoria: "Kraft", precioVenta: 35, costo: 18, stock: "Disponible", imagen: "🛍️", unidad: "unidad" },
  { id: "PRD-002", nombre: "Tote Bag Algodón Canvas", categoria: "Tote Bags", precioVenta: 120, costo: 65, stock: "Disponible", imagen: "👜", unidad: "unidad" },
  { id: "PRD-003", nombre: "Bolsa Plástica Biodeg. 15x20", categoria: "Plástico", precioVenta: 12, costo: 5, stock: "Disponible", imagen: "♻️", unidad: "unidad" },
  { id: "PRD-004", nombre: "Gift Bag Satinado Chico", categoria: "Gift Bags", precioVenta: 85, costo: 42, stock: "Disponible", imagen: "🎁", unidad: "unidad" },
  { id: "PRD-005", nombre: "Bolsa Nonwoven 30x40 cm", categoria: "Nonwoven", precioVenta: 55, costo: 28, stock: "Disponible", imagen: "💼", unidad: "unidad" },
  { id: "PRD-006", nombre: "Bolsa Yute Pequeña", categoria: "Ecológico", precioVenta: 95, costo: 55, stock: "Agotado", imagen: "🌿", unidad: "unidad" },
  { id: "PRD-007", nombre: "Bolsa Laminada Full Color 25x35", categoria: "Laminadas", precioVenta: 65, costo: 32, stock: "Disponible", imagen: "🎨", unidad: "unidad" },
  { id: "PRD-008", nombre: "Bolsa Pan con Ventana Celofán", categoria: "Kraft", precioVenta: 22, costo: 11, stock: "Disponible", imagen: "🥖", unidad: "unidad" },
  { id: "PRD-009", nombre: "Impresión Serigrafía 1 color", categoria: "Servicios", precioVenta: 8, costo: 3, stock: "Disponible", imagen: "🖨️", unidad: "c/u" },
  { id: "PRD-010", nombre: "Diseño gráfico Arte Final", categoria: "Servicios", precioVenta: 3500, costo: 1200, stock: "Disponible", imagen: "✏️", unidad: "proyecto" },
];

function getMargenColor(margen: number) {
  if (margen >= 40) return "text-green-600 bg-green-100";
  if (margen >= 20) return "text-yellow-600 bg-yellow-100";
  return "text-red-600 bg-red-100";
}

export default function ProductosPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Catálogo de Productos</h1>
          <p className="text-sm text-darklink mt-1">Precios, costos y márgenes — catálogo interno</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a] shadow-sm">
          <Icon icon="solar:add-circle-linear" height={18} />
          Nuevo Producto
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Productos", val: productos.length, color: "text-[#1E3A5F]" },
          { label: "Margen Promedio", val: "49%", color: "text-green-600" },
          { label: "Disponibles", val: productos.filter(p=>p.stock==="Disponible").length, color: "text-[#4A7C3F]" },
          { label: "Agotados", val: productos.filter(p=>p.stock==="Agotado").length, color: "text-red-500" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-sm text-darklink mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-2xl shadow-md bg-background overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[#1E3A5F]/5">
              <tr>
                {["", "ID", "Producto", "Categoría", "Precio venta", "Costo", "Margen", "Unidad", "Disponibilidad", "Acciones"].map(h => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase tracking-wide">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {productos.map((p, i) => {
                const margen = Math.round(((p.precioVenta - p.costo) / p.precioVenta) * 100);
                return (
                  <tr key={i} className="border-t border-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-3 py-3.5 text-xl">{p.imagen}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-darklink">{p.id}</td>
                    <td className="px-5 py-3.5 font-semibold text-dark dark:text-white">{p.nombre}</td>
                    <td className="px-5 py-3.5">
                      <span className="text-xs bg-[#1E3A5F]/8 text-[#1E3A5F] px-2 py-0.5 rounded-full">{p.categoria}</span>
                    </td>
                    <td className="px-5 py-3.5 font-semibold text-[#4A7C3F]">RD$ {p.precioVenta.toLocaleString()}</td>
                    <td className="px-5 py-3.5 text-darklink">RD$ {p.costo.toLocaleString()}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${getMargenColor(margen)}`}>{margen}%</span>
                    </td>
                    <td className="px-5 py-3.5 text-xs text-darklink">{p.unidad}</td>
                    <td className="px-5 py-3.5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${p.stock === "Disponible" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>{p.stock}</span>
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex gap-1.5">
                        <button className="p-1.5 rounded-lg hover:bg-[#1E3A5F]/10 text-[#1E3A5F]"><Icon icon="solar:pen-linear" height={15} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Icon icon="solar:trash-bin-minimalistic-linear" height={15} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-3 border-t border-border bg-green-50/30">
          <p className="text-xs text-[#4A7C3F] font-medium">💡 Verde = margen ≥40% · Amarillo = 20-39% · Rojo = &lt;20%</p>
        </div>
      </div>
    </div>
  );
}
