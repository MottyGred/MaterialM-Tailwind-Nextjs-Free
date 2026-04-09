"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const empleados = [
  { id: "EMP-001", nombre: "Ana Rodríguez", rol: "Vendedor", email: "arodriguez@haladas.com", telefono: "829-555-1001", ciudad: "Santo Domingo", ingreso: "15/03/2022", estado: "Activo", permisos: ["Cotizaciones", "Clientes", "WhatsApp"] },
  { id: "EMP-002", nombre: "Luis Méndez", rol: "Vendedor", email: "lmendez@haladas.com", telefono: "829-555-1002", ciudad: "Santo Domingo", ingreso: "02/07/2023", estado: "Activo", permisos: ["Cotizaciones", "Clientes", "WhatsApp"] },
  { id: "EMP-003", nombre: "Carla Vásquez", rol: "Vendedor", email: "cvasquez@haladas.com", telefono: "829-555-1003", ciudad: "Santiago", ingreso: "10/01/2024", estado: "Activo", permisos: ["Cotizaciones", "Clientes"] },
  { id: "EMP-004", nombre: "Pedro Soto", rol: "Vendedor", email: "psoto@haladas.com", telefono: "829-555-1004", ciudad: "La Romana", ingreso: "05/09/2023", estado: "Activo", permisos: ["Cotizaciones", "Clientes", "WhatsApp"] },
  { id: "EMP-005", nombre: "María Torres", rol: "Admin", email: "mtorres@haladas.com", telefono: "829-555-1005", ciudad: "Santo Domingo", ingreso: "01/06/2020", estado: "Activo", permisos: ["Facturación", "Gastos", "Clientes", "Empleados", "Reportes"] },
  { id: "EMP-006", nombre: "Carlos Morales", rol: "Operario", email: "cmorales@haladas.com", telefono: "829-555-1006", ciudad: "Santo Domingo", ingreso: "20/11/2021", estado: "Activo", permisos: ["Órdenes"] },
  { id: "EMP-007", nombre: "Marta García", rol: "Diseñador", email: "mgarcia@haladas.com", telefono: "829-555-1007", ciudad: "Santo Domingo", ingreso: "14/02/2022", estado: "Activo", permisos: ["Órdenes", "Catálogo"] },
  { id: "EMP-008", nombre: "Luis Ramírez", rol: "Operario", email: "lramirez@haladas.com", telefono: "829-555-1008", ciudad: "Santo Domingo", ingreso: "30/08/2023", estado: "Inactivo", permisos: ["Órdenes"] },
];

const rolStyles: Record<string, { pill: string; icon: string }> = {
  Admin: { pill: "bg-[#1E3A5F] text-white", icon: "solar:shield-user-linear" },
  Vendedor: { pill: "bg-yellow-100 text-yellow-700", icon: "solar:chart-2-linear" },
  Diseñador: { pill: "bg-purple-100 text-purple-700", icon: "solar:pallete-2-linear" },
  Operario: { pill: "bg-green-100 text-green-700", icon: "solar:settings-linear" },
};

const rolColores: Record<string, string> = {
  Admin: "#1E3A5F", Vendedor: "#D4A017", Diseñador: "#7c3aed", Operario: "#4A7C3F",
};

export default function EmpleadosPage() {
  const [selectedEmp, setSelectedEmp] = useState<typeof empleados[0] | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-dark dark:text-white">Registro de Empleados</h1>
          <p className="text-sm text-darklink mt-1">Equipo Haladás Taller Creativo · {empleados.filter(e => e.estado === "Activo").length} activos</p>
        </div>
        <button className="flex items-center gap-2 bg-[#1E3A5F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#162d4a] shadow-sm">
          <Icon icon="solar:add-circle-linear" height={18} />
          Nuevo Empleado
        </button>
      </div>

      {/* Role stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {["Admin", "Vendedor", "Diseñador", "Operario"].map((rol, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-background p-4 flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: rolColores[rol] + "20" }}>
              <Icon icon={rolStyles[rol].icon} style={{ color: rolColores[rol] }} height={20} />
            </span>
            <div>
              <p className="text-lg font-bold text-dark dark:text-white">{empleados.filter(e => e.rol === rol).length}</p>
              <p className="text-xs text-darklink">{rol}(s)</p>
            </div>
          </div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {empleados.map((e, i) => (
          <div key={i} onClick={() => setSelectedEmp(e)} className={`rounded-2xl shadow-md bg-background p-5 cursor-pointer hover:shadow-lg transition-all border ${e.estado === "Inactivo" ? "opacity-60" : ""} border-transparent hover:border-[#1E3A5F]/20`}>
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white" style={{ backgroundColor: rolColores[e.rol] }}>
                {e.nombre.split(" ").map(n => n[0]).join("")}
              </div>
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${e.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{e.estado}</span>
            </div>
            <h3 className="font-bold text-dark dark:text-white">{e.nombre}</h3>
            <div className="flex items-center gap-1.5 mt-1">
              <Icon icon={rolStyles[e.rol].icon} height={13} style={{ color: rolColores[e.rol] }} />
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${rolStyles[e.rol].pill}`}>{e.rol}</span>
            </div>
            <p className="text-xs text-darklink mt-2">{e.email}</p>
            <p className="text-xs text-darklink">{e.ciudad} · desde {e.ingreso}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {e.permisos.slice(0, 3).map((p, j) => (
                <span key={j} className="text-[9px] bg-[#1E3A5F]/8 text-[#1E3A5F] px-1.5 py-0.5 rounded-full">{p}</span>
              ))}
              {e.permisos.length > 3 && <span className="text-[9px] bg-gray-100 text-darklink px-1.5 py-0.5 rounded-full">+{e.permisos.length - 3}</span>}
            </div>
          </div>
        ))}
      </div>

      {/* Drawer */}
      {selectedEmp && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-stretch justify-end" onClick={() => setSelectedEmp(null)}>
          <div className="bg-background w-full max-w-md shadow-2xl overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-bold text-dark dark:text-white">Ficha de Empleado</h2>
                <button onClick={() => setSelectedEmp(null)} className="p-2 hover:bg-gray-100 rounded-xl">
                  <Icon icon="solar:close-circle-linear" height={20} className="text-darklink" />
                </button>
              </div>
              <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mb-4" style={{ backgroundColor: rolColores[selectedEmp.rol] }}>
                {selectedEmp.nombre.split(" ").map(n => n[0]).join("")}
              </div>
              <h3 className="text-xl font-bold text-dark dark:text-white">{selectedEmp.nombre}</h3>
              <div className="flex gap-2 mt-1 mb-5">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${rolStyles[selectedEmp.rol].pill}`}>{selectedEmp.rol}</span>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${selectedEmp.estado === "Activo" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>{selectedEmp.estado}</span>
              </div>
              <div className="flex flex-col gap-3">
                {[
                  { label: "ID Empleado", val: selectedEmp.id, icon: "solar:user-id-linear" },
                  { label: "Email", val: selectedEmp.email, icon: "solar:letter-linear" },
                  { label: "Teléfono", val: selectedEmp.telefono, icon: "solar:phone-linear" },
                  { label: "Ciudad", val: selectedEmp.ciudad, icon: "solar:map-point-linear" },
                  { label: "Fecha de ingreso", val: selectedEmp.ingreso, icon: "solar:calendar-linear" },
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
              <div className="mt-5">
                <p className="text-sm font-semibold text-dark dark:text-white mb-2">Módulos con acceso</p>
                <div className="flex flex-wrap gap-2">
                  {selectedEmp.permisos.map((p, i) => (
                    <span key={i} className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2.5 py-1 rounded-full font-semibold">
                      <Icon icon="solar:check-circle-bold" height={11} />
                      {p}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex gap-2 mt-6">
                <button className="flex-1 py-2.5 bg-[#1E3A5F] text-white rounded-xl text-sm font-semibold">Editar perfil</button>
                <button className="px-4 py-2.5 border border-red-300 text-red-500 rounded-xl text-sm font-semibold hover:bg-red-50">Dar de baja</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
