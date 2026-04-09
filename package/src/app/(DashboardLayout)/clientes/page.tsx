"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const clientes = [
  { id: "CLI-001", nombre: "Supermercados Nacional", contacto: "María Guerrero", email: "mguerrero@snacional.com", telefono: "809-555-1100", ciudad: "Santo Domingo", totalCompras: "RD$ 450,000", ordenes: 18, estado: "Activo", tipo: "Corporativo" },
  { id: "CLI-002", nombre: "Farmacia Carol", contacto: "Carlos Jiménez", email: "cjimenez@fcarol.com", telefono: "809-555-2200", ciudad: "Santiago", totalCompras: "RD$ 128,400", ordenes: 7, estado: "Activo", tipo: "Retail" },
  { id: "CLI-003", nombre: "La Sirena Supermercados", contacto: "Ana Pérez", email: "aperez@lasirena.com", telefono: "809-555-3300", ciudad: "Santo Domingo", totalCompras: "RD$ 312,500", ordenes: 12, estado: "Activo", tipo: "Corporativo" },
  { id: "CLI-004", nombre: "Hotel Caribe Tours", contacto: "Roberto Silva", email: "rsilva@caribetours.com", telefono: "809-555-4400", ciudad: "Punta Cana", totalCompras: "RD$ 215,800", ordenes: 9, estado: "Activo", tipo: "Hospitalidad" },
  { id: "CLI-005", nombre: "Joyería Ámbar", contacto: "Lourdes Castro", email: "lcastro@ambar.com", telefono: "809-555-5500", ciudad: "Santo Domingo", totalCompras: "RD$ 88,500", ordenes: 5, estado: "Pendiente", tipo: "Retail" },
  { id: "CLI-006", nombre: "Café Santo Domingo", contacto: "Pedro Martínez", email: "pmartinez@cafesd.com", telefono: "809-555-6600", ciudad: "Santo Domingo", totalCompras: "RD$ 76,200", ordenes: 6, estado: "Activo", tipo: "Food & Bev" },
  { id: "CLI-007", nombre: "Tienda Naturista Verde", contacto: "Sandra López", email: "slopez@naturistav.com", telefono: "809-555-7700", ciudad: "La Romana", totalCompras: "RD$ 63,800", ordenes: 4, estado: "Activo", tipo: "Retail" },
  { id: "CLI-008", nombre: "Panadería El Sol", contacto: "Juan Rodríguez", email: "jrodriguez@elsol.com", telefono: "809-555-8800", ciudad: "Santiago", totalCompras: "RD$ 96,000", ordenes: 8, estado: "Activo", tipo: "Food & Bev" },
  { id: "CLI-009", nombre: "Distribuidora Hidalgo", contacto: "Carmen Hidalgo", email: "chidalgo@dhidalgo.com", telefono: "809-555-9900", ciudad: "Santo Domingo", totalCompras: "RD$ 375,000", ordenes: 15, estado: "Activo", tipo: "Distribuidora" },
  { id: "CLI-010", nombre: "Salón Bella Image", contacto: "Valentina Núñez", email: "vnunez@bellaimage.com", telefono: "809-555-0011", ciudad: "Santiago", totalCompras: "RD$ 42,500", ordenes: 3, estado: "Inactivo", tipo: "Retail" },
  { id: "CLI-011", nombre: "Boutique Glamour", contacto: "Patricia Vargas", email: "pvargas@glamour.com", telefono: "809-555-0022", ciudad: "Santo Domingo", totalCompras: "RD$ 58,600", ordenes: 4, estado: "Activo", tipo: "Moda" },
  { id: "CLI-012", nombre: "Artesanías Dominicanas", contacto: "Miriam Santos", email: "msantos@artdom.com", telefono: "809-555-0033", ciudad: "Puerto Plata", totalCompras: "RD$ 29,400", ordenes: 2, estado: "Pendiente", tipo: "Artesanía" },
];

const estadoStyles: Record<string, string> = {
  Activo: "bg-green-100 text-green-700",
  Inactivo: "bg-gray-100 text-gray-500",
  Pendiente: "bg-yellow-100 text-yellow-700",
};

export default function ClientesPage() {
  const [vista, setVista] = useState<"grid" | "lista">("grid");
  const [selectedCliente, setSelectedCliente] = useState<typeof clientes[0] | null>(null);
  const [busqueda, setBusqueda] = useState("");

  const filtrados = clientes.filter(c =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
    c.contacto.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Clientes</h1>
          <p className="text-sm text-darklink mt-1">CRM — Gestión de cartera de clientes</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1.5 px-4 py-2.5 border border-[#4A7C3F] text-[#4A7C3F] rounded-xl text-sm font-semibold hover:bg-green-50">
            <Icon icon="solar:upload-linear" height={16} />
            Importar Excel
          </button>
          <button className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a]">
            <Icon icon="solar:add-circle-linear" height={18} />
            Nuevo Cliente
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Clientes", val: clientes.length, color: "text-[#1E3A5F]" },
          { label: "Activos", val: clientes.filter(c=>c.estado==="Activo").length, color: "text-green-600" },
          { label: "Facturación Total", val: "RD$ 2.04M", color: "text-[#C8541A]" },
          { label: "Órdenes Total", val: clientes.reduce((a, c) => a + c.ordenes, 0), color: "text-[#D4A017]" },
        ].map((s, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.val}</p>
            <p className="text-sm text-darklink mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Search + Toggle */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-darklink" height={16} />
          <input value={busqueda} onChange={e => setBusqueda(e.target.value)} className="w-full border border-border rounded-xl pl-9 pr-4 py-2.5 text-sm bg-background focus:outline-none" placeholder="Buscar cliente..." />
        </div>
        <div className="flex border border-border rounded-xl overflow-hidden">
          <button onClick={() => setVista("grid")} className={`px-3 py-2.5 ${vista === "grid" ? "bg-[#1E3A5F] text-white" : "text-darklink hover:bg-gray-50"} transition-colors`}>
            <Icon icon="solar:widget-4-linear" height={18} />
          </button>
          <button onClick={() => setVista("lista")} className={`px-3 py-2.5 ${vista === "lista" ? "bg-[#1E3A5F] text-white" : "text-darklink hover:bg-gray-50"} transition-colors`}>
            <Icon icon="solar:list-linear" height={18} />
          </button>
        </div>
      </div>

      {/* Grid View */}
      {vista === "grid" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtrados.map((c, i) => (
            <div key={i} onClick={() => setSelectedCliente(c)} className="rounded-2xl shadow-md bg-background p-5 cursor-pointer hover:shadow-lg transition-all hover:border-[#1E3A5F]/20 border border-transparent">
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 rounded-xl bg-[#1E3A5F]/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#1E3A5F]">{c.nombre[0]}</span>
                </div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${estadoStyles[c.estado]}`}>{c.estado}</span>
              </div>
              <h3 className="font-bold text-dark dark:text-white text-sm leading-tight">{c.nombre}</h3>
              <p className="text-xs text-darklink mt-0.5">{c.contacto} · {c.ciudad}</p>
              <div className="flex gap-1 mt-2">
                <span className="text-xs bg-[#1E3A5F]/8 text-[#1E3A5F] px-2 py-0.5 rounded-full">{c.tipo}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-xs text-darklink">Total compras</p>
                  <p className="text-sm font-bold text-dark dark:text-white">{c.totalCompras}</p>
                </div>
                <div>
                  <p className="text-xs text-darklink">Órdenes</p>
                  <p className="text-sm font-bold text-dark dark:text-white">{c.ordenes}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* List View */}
      {vista === "lista" && (
        <div className="rounded-2xl shadow-md bg-background overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-[#1E3A5F]/5">
                <tr>
                  {["ID", "Empresa", "Contacto", "Ciudad", "Tipo", "Total Compras", "Órdenes", "Estado", ""].map(h => (
                    <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-darklink uppercase">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtrados.map((c, i) => (
                  <tr key={i} className="border-t border-border hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer" onClick={() => setSelectedCliente(c)}>
                    <td className="px-5 py-3.5 font-mono text-xs text-darklink">{c.id}</td>
                    <td className="px-5 py-3.5 font-semibold text-dark dark:text-white">{c.nombre}</td>
                    <td className="px-5 py-3.5 text-darklink">{c.contacto}</td>
                    <td className="px-5 py-3.5 text-darklink">{c.ciudad}</td>
                    <td className="px-5 py-3.5"><span className="text-xs bg-[#1E3A5F]/8 text-[#1E3A5F] px-2 py-0.5 rounded-full">{c.tipo}</span></td>
                    <td className="px-5 py-3.5 font-semibold">{c.totalCompras}</td>
                    <td className="px-5 py-3.5 text-darklink">{c.ordenes}</td>
                    <td className="px-5 py-3.5"><span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[c.estado]}`}>{c.estado}</span></td>
                    <td className="px-5 py-3.5 text-[#1E3A5F]"><Icon icon="solar:alt-arrow-right-linear" height={16} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Detail Drawer */}
      {selectedCliente && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-stretch justify-end" onClick={() => setSelectedCliente(null)}>
          <div className="bg-background w-full max-w-md shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-dark dark:text-white">Ficha del Cliente</h2>
                <button onClick={() => setSelectedCliente(null)} className="p-2 hover:bg-gray-100 rounded-xl"><Icon icon="solar:close-circle-linear" height={20} className="text-darklink" /></button>
              </div>
              <div className="w-16 h-16 rounded-2xl bg-[#1E3A5F]/10 flex items-center justify-center mb-4">
                <span className="text-3xl font-bold text-[#1E3A5F]">{selectedCliente.nombre[0]}</span>
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white">{selectedCliente.nombre}</h3>
              <span className={`inline-block mt-1 text-xs font-semibold px-2.5 py-1 rounded-full ${estadoStyles[selectedCliente.estado]}`}>{selectedCliente.estado}</span>
              <div className="grid grid-cols-1 gap-4 mt-5">
                {[
                  { label: "Contacto principal", val: selectedCliente.contacto, icon: "solar:user-linear" },
                  { label: "Email", val: selectedCliente.email, icon: "solar:letter-linear" },
                  { label: "Teléfono", val: selectedCliente.telefono, icon: "solar:phone-linear" },
                  { label: "Ciudad", val: selectedCliente.ciudad, icon: "solar:map-point-linear" },
                  { label: "Tipo de cliente", val: selectedCliente.tipo, icon: "solar:tag-linear" },
                ].map((f, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-xl bg-[#1E3A5F]/8 flex items-center justify-center flex-shrink-0">
                      <Icon icon={f.icon} className="text-[#1E3A5F]" height={16} />
                    </span>
                    <div>
                      <p className="text-xs text-darklink">{f.label}</p>
                      <p className="text-sm font-semibold text-dark dark:text-white">{f.val}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-3 mt-5 p-4 bg-[#1E3A5F]/5 rounded-xl">
                <div className="text-center">
                  <p className="text-xl font-bold text-[#1E3A5F]">{selectedCliente.totalCompras}</p>
                  <p className="text-xs text-darklink">Total compras</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-[#C8541A]">{selectedCliente.ordenes}</p>
                  <p className="text-xs text-darklink">Órdenes</p>
                </div>
              </div>
              <div className="flex gap-2 mt-5">
                <button className="flex-1 py-2.5 bg-[#1E3A5F] text-white rounded-xl text-sm font-semibold">Nueva cotización</button>
                <button className="px-4 py-2.5 border border-green-500 text-green-600 rounded-xl text-sm font-semibold hover:bg-green-50">
                  <Icon icon="solar:chat-line-linear" height={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
