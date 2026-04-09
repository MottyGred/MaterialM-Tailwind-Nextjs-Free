"use client";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

const ordenes = [
  { id: "ORD-1048", cliente: "Supermercados Nacional", producto: "Bolsas kraft personalizadas", cantidad: 5000, estado: "En Producción", estadoColor: "bg-blue-100 text-blue-700", fecha: "12/04/2025", operario: "Carlos M." },
  { id: "ORD-1047", cliente: "Farmacia Carol", producto: "Bolsas plásticas biodeg.", cantidad: 2000, estado: "Lista", estadoColor: "bg-green-100 text-green-700", fecha: "10/04/2025", operario: "Marta G." },
  { id: "ORD-1046", cliente: "La Sirena", producto: "Tote bags algodón", cantidad: 1500, estado: "En Diseño", estadoColor: "bg-yellow-100 text-yellow-700", fecha: "15/04/2025", operario: "Luis R." },
  { id: "ORD-1045", cliente: "Café Santo Domingo", producto: "Bolsas papel kraft", cantidad: 800, estado: "Entregada", estadoColor: "bg-gray-100 text-gray-600", fecha: "08/04/2025", operario: "Ana S." },
  { id: "ORD-1044", cliente: "Joyería Ámbar", producto: "Gift bags premium", cantidad: 300, estado: "En Producción", estadoColor: "bg-blue-100 text-blue-700", fecha: "14/04/2025", operario: "Carlos M." },
  { id: "ORD-1043", cliente: "Tienda Naturista Verde", producto: "Bolsas yute ecológico", cantidad: 600, estado: "Lista", estadoColor: "bg-green-100 text-green-700", fecha: "09/04/2025", operario: "Pedro L." },
  { id: "ORD-1042", cliente: "Panadería El Sol", producto: "Bolsas para pan impresión", cantidad: 3000, estado: "En Diseño", estadoColor: "bg-yellow-100 text-yellow-700", fecha: "17/04/2025", operario: "Marta G." },
  { id: "ORD-1041", cliente: "Hotel Caribe Tours", producto: "Bolsas nonwoven corporativas", cantidad: 1200, estado: "Pendiente", estadoColor: "bg-orange-100 text-orange-700", fecha: "20/04/2025", operario: "Por asignar" },
];

export default function OrdenesRecientes() {
  return (
    <div className="rounded-2xl shadow-md bg-background p-6 w-full">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h5 className="text-base font-semibold text-dark dark:text-white">Órdenes Recientes</h5>
          <p className="text-sm text-darklink">Últimas 8 órdenes del sistema</p>
        </div>
        <a href="/ordenes" className="text-sm text-[#1E3A5F] font-semibold hover:underline">Ver todas →</a>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="pb-3 text-left text-xs font-semibold text-darklink uppercase">Orden</th>
              <th className="pb-3 text-left text-xs font-semibold text-darklink uppercase">Cliente</th>
              <th className="pb-3 text-left text-xs font-semibold text-darklink uppercase hidden md:table-cell">Producto</th>
              <th className="pb-3 text-left text-xs font-semibold text-darklink uppercase hidden lg:table-cell">Cant.</th>
              <th className="pb-3 text-left text-xs font-semibold text-darklink uppercase">Estado</th>
              <th className="pb-3 text-left text-xs font-semibold text-darklink uppercase hidden xl:table-cell">Entrega</th>
              <th className="pb-3 text-left text-xs font-semibold text-darklink uppercase hidden xl:table-cell">Operario</th>
            </tr>
          </thead>
          <tbody>
            {ordenes.map((o, i) => (
              <tr key={i} className="border-b border-border last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                <td className="py-3 font-mono text-xs text-[#1E3A5F] font-semibold">{o.id}</td>
                <td className="py-3 font-medium text-dark dark:text-white max-w-[140px] truncate">{o.cliente}</td>
                <td className="py-3 text-darklink hidden md:table-cell max-w-[160px] truncate">{o.producto}</td>
                <td className="py-3 text-darklink hidden lg:table-cell">{o.cantidad.toLocaleString()}</td>
                <td className="py-3">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${o.estadoColor}`}>
                    {o.estado}
                  </span>
                </td>
                <td className="py-3 text-darklink text-xs hidden xl:table-cell">{o.fecha}</td>
                <td className="py-3 text-darklink text-xs hidden xl:table-cell">{o.operario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
