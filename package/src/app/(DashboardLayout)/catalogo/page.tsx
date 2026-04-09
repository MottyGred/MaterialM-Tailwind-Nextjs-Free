"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const productos = [
  { id: "PROD-01", nombre: "Bolsa Kraft Natural", categoria: "Kraft", descripcion: "Bolsa de papel kraft natural 100% reciclable, ideal para retail y alimentos.", precio: "RD$ 35", desde: "500 unidades", colores: ["#C8B89A", "#8B6914", "#FFFFFF"], tag: "Más vendida", emoji: "🛍️" },
  { id: "PROD-02", nombre: "Tote Bag Algodón Canvas", categoria: "Tote Bags", descripcion: "Bolsa de tela resistente con asa larga. Impresión serigrafía 1-4 colores.", precio: "RD$ 120", desde: "100 unidades", colores: ["#FFFFFF", "#1E3A5F", "#C8541A", "#4A7C3F"], tag: "Premium", emoji: "👜" },
  { id: "PROD-03", nombre: "Bolsa Plástica Biodegradable", categoria: "Plástico", descripcion: "Polietileno oxo-biodegradable. Cumple normativas ambientales.", precio: "RD$ 12", desde: "1,000 unidades", colores: ["#FFFFFF", "#1E3A5F", "#C8541A"], tag: "Eco", emoji: "♻️" },
  { id: "PROD-04", nombre: "Gift Bag Papel Satinado", categoria: "Gift Bags", descripcion: "Bolsa de regalo con acabado satinado y asa de cinta. Varios tamaños.", precio: "RD$ 85", desde: "50 unidades", colores: ["#1E3A5F", "#C8541A", "#D4A017", "#4A7C3F", "#FFFFFF"], tag: "Personalizable", emoji: "🎁" },
  { id: "PROD-05", nombre: "Bolsa Nonwoven Corporativa", categoria: "Nonwoven", descripcion: "Tela TNT de alta resistencia. Ideal para eventos y uniformes corporativos.", precio: "RD$ 55", desde: "200 unidades", colores: ["#1E3A5F", "#C8541A", "#4A7C3F", "#FFFFFF"], tag: "Corporativo", emoji: "💼" },
  { id: "PROD-06", nombre: "Bolsa Yute Ecológico", categoria: "Ecológico", descripcion: "Yute natural tejido a mano. Sostenible y 100% biodegradable.", precio: "RD$ 95", desde: "100 unidades", colores: ["#C8B89A", "#8B7355"], tag: "Eco Premium", emoji: "🌿" },
  { id: "PROD-07", nombre: "Bolsa Laminada Full Color", categoria: "Laminadas", descripcion: "Impresión digital 4 colores, plastificado matte o brillante.", precio: "RD$ 65", desde: "200 unidades", colores: ["#C8541A", "#1E3A5F", "#D4A017", "#4A7C3F"], tag: "Full Color", emoji: "🎨" },
  { id: "PROD-08", nombre: "Bolsa para Panadería", categoria: "Kraft", descripcion: "Bolsa kraft con ventana de celofán. Especial para alimentos.", precio: "RD$ 22", desde: "500 unidades", colores: ["#C8B89A", "#FFFFFF"], tag: "Alimentos", emoji: "🥖" },
];

const categorias = ["Todas", "Kraft", "Tote Bags", "Plástico", "Gift Bags", "Nonwoven", "Ecológico", "Laminadas"];

export default function CatalogoPage() {
  const [catSeleccionada, setCatSeleccionada] = useState("Todas");
  const [busqueda, setBusqueda] = useState("");
  const [productoDetalle, setProductoDetalle] = useState<typeof productos[0] | null>(null);

  const filtrados = productos.filter(p => {
    const coincideCat = catSeleccionada === "Todas" || p.categoria === catSeleccionada;
    const coincideBusq = p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCat && coincideBusq;
  });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Catálogo Online</h1>
          <p className="text-sm text-darklink mt-1">Portafolio público de productos — Haladás Taller Creativo</p>
        </div>
        <span className="text-xs bg-green-100 text-green-700 font-semibold px-3 py-1.5 rounded-full">
          ✅ Catálogo activo · {productos.length} productos
        </span>
      </div>

      {/* Search */}
      <div className="relative">
        <Icon icon="solar:magnifer-linear" className="absolute left-4 top-1/2 -translate-y-1/2 text-darklink" height={18} />
        <input value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-full border border-border rounded-2xl pl-11 pr-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 shadow-sm" placeholder="Buscar productos por nombre..." />
      </div>

      {/* Category Filters */}
      <div className="flex gap-2 flex-wrap">
        {categorias.map(c => (
          <button key={c} onClick={() => setCatSeleccionada(c)} className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${catSeleccionada === c ? "bg-[#1E3A5F] text-white shadow-sm" : "bg-background border border-border text-darklink hover:border-[#1E3A5F] hover:text-[#1E3A5F]"}`}>
            {c}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {filtrados.map((p, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background overflow-hidden hover:shadow-lg transition-all group cursor-pointer" onClick={() => setProductoDetalle(p)}>
            {/* Image area */}
            <div className="h-44 bg-gradient-to-br from-[#1E3A5F]/8 to-[#C8B89A]/20 flex items-center justify-center relative">
              <span className="text-7xl">{p.emoji}</span>
              {p.tag && (
                <span className="absolute top-3 left-3 text-xs font-bold bg-[#C8541A] text-white px-2.5 py-1 rounded-full">{p.tag}</span>
              )}
            </div>
            <div className="p-4">
              <p className="text-xs text-[#C8541A] font-semibold mb-1">{p.categoria}</p>
              <h3 className="font-bold text-dark dark:text-white text-sm leading-tight">{p.nombre}</h3>
              <p className="text-xs text-darklink mt-1.5 line-clamp-2">{p.descripcion}</p>
              <div className="flex items-center gap-1.5 mt-3">
                {p.colores.map((c, j) => (
                  <div key={j} className="w-4 h-4 rounded-full border border-gray-200 shadow-sm" style={{ backgroundColor: c }} title={c}></div>
                ))}
              </div>
              <div className="flex items-center justify-between mt-4">
                <div>
                  <p className="text-lg font-bold text-[#1E3A5F]">{p.precio}</p>
                  <p className="text-[10px] text-darklink">desde {p.desde}</p>
                </div>
                <button className="px-3 py-1.5 bg-[#1E3A5F] text-white rounded-xl text-xs font-semibold hover:bg-[#162d4a] transition-colors">
                  Cotizar →
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {productoDetalle && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setProductoDetalle(null)}>
          <div className="bg-background rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="h-48 bg-gradient-to-br from-[#1E3A5F]/10 to-[#C8B89A]/30 flex items-center justify-center relative">
              <span className="text-8xl">{productoDetalle.emoji}</span>
              {productoDetalle.tag && (
                <span className="absolute top-4 left-4 text-xs font-bold bg-[#C8541A] text-white px-3 py-1 rounded-full">{productoDetalle.tag}</span>
              )}
            </div>
            <div className="p-6">
              <p className="text-xs text-[#C8541A] font-semibold mb-1">{productoDetalle.categoria}</p>
              <h2 className="text-xl font-bold text-dark dark:text-white">{productoDetalle.nombre}</h2>
              <p className="text-sm text-darklink mt-2">{productoDetalle.descripcion}</p>
              <div className="mt-4">
                <p className="text-xs text-darklink font-medium mb-2">Colores disponibles</p>
                <div className="flex gap-2">
                  {productoDetalle.colores.map((c, j) => (
                    <div key={j} className="w-7 h-7 rounded-full border-2 border-gray-200 cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: c }}></div>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between mt-5 pt-5 border-t border-border">
                <div>
                  <p className="text-2xl font-bold text-[#1E3A5F]">{productoDetalle.precio}</p>
                  <p className="text-xs text-darklink">Precio base · Pedido mínimo: {productoDetalle.desde}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setProductoDetalle(null)} className="px-4 py-2 border border-border rounded-xl text-sm text-darklink">Cerrar</button>
                  <button className="px-4 py-2 bg-[#C8541A] text-white rounded-xl text-sm font-semibold hover:bg-[#a8440e]">Solicitar cotización</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
