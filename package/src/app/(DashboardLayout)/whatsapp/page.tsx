"use client";
import { useState } from "react";
import { Icon } from "@iconify/react";

const conversaciones = [
  { id: 1, nombre: "María Guerrero", empresa: "Supermercados Nacional", mensaje: "Gracias por la cotización, la revisamos.", hora: "10:23", noLeidos: 0, tipo: "cotización" },
  { id: 2, nombre: "Carlos Jiménez", empresa: "Farmacia Carol", mensaje: "¿Cuándo estará lista la orden?", hora: "09:45", noLeidos: 2, tipo: "orden" },
  { id: 3, nombre: "Roberto Silva", empresa: "Hotel Caribe Tours", mensaje: "El pago se realizó ayer 🙏", hora: "ayer", noLeidos: 0, tipo: "pago" },
  { id: 4, nombre: "Lourdes Castro", empresa: "Joyería Ámbar", mensaje: "¿Pueden ajustar el diseño?", hora: "ayer", noLeidos: 1, tipo: "cotización" },
  { id: 5, nombre: "Sandra López", empresa: "Tienda Naturista Verde", mensaje: "Perfecto, procedemos con el pedido.", hora: "lun", noLeidos: 0, tipo: "orden" },
];

const mensajesActivos = [
  { de: "cliente", texto: "Hola, necesito cotización para 2,000 bolsas kraft con logo.", hora: "09:30" },
  { de: "haladás", texto: "¡Buenos días Carlos! Con gusto. ¿Qué tamaño necesita y cuántos colores de impresión?", hora: "09:35" },
  { de: "cliente", texto: "Tamaño mediano, como 20x30 cm. Logo en 2 colores.", hora: "09:38" },
  { de: "haladás", texto: "Perfecto. Estaré enviándole la cotización formal en unos minutos a su WhatsApp. 📄", hora: "09:40" },
  { de: "cliente", texto: "¿Cuándo estará lista la orden ORD-1034?", hora: "09:45" },
];

const plantillas = [
  { nombre: "Cotización enviada", texto: "Estimado/a *{nombre}*, le adjuntamos la cotización *{numero_cotizacion}* por un monto de *{monto}*. Valida hasta: {fecha_vencimiento}. Para aprobarla, responda a este mensaje o contáctenos. — Haladás Taller Creativo 🌳" },
  { nombre: "Orden lista", texto: "Hola *{nombre}*! Su orden *{numero_orden}* ya está lista para entrega. ✅ Puede pasar a recogerla por nuestro taller o coordinar el envío. — Haladás Taller Creativo" },
  { nombre: "Recordatorio de pago", texto: "Estimado/a *{nombre}*, le recordamos que la factura *{numero_factura}* por *{monto}* tiene fecha de vencimiento el {fecha}. Puede realizar su pago vía transferencia. — Haladás Taller Creativo 🌿" },
];

export default function WhatsAppPage() {
  const [convActiva, setConvActiva] = useState(conversaciones[1]);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState<typeof plantillas[0] | null>(null);
  const [mensajeTexto, setMensajeTexto] = useState("");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-dark dark:text-white">Centro WhatsApp</h1>
        <p className="text-sm text-darklink mt-1">Comunicación directa con clientes desde el sistema</p>
      </div>

      <div className="grid grid-cols-12 gap-5 h-[620px]">
        {/* Conversation List */}
        <div className="col-span-12 md:col-span-4 rounded-2xl shadow-md bg-background overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Icon icon="solar:magnifer-linear" className="absolute left-3 top-1/2 -translate-y-1/2 text-darklink" height={14} />
              <input className="w-full border border-border rounded-xl pl-8 pr-3 py-2 text-sm bg-background" placeholder="Buscar..." />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {conversaciones.map((c, i) => (
              <div key={i} onClick={() => setConvActiva(c)} className={`flex items-center gap-3 px-4 py-3 cursor-pointer border-b border-border hover:bg-gray-50 dark:hover:bg-white/5 transition-colors ${convActiva.id === c.id ? "bg-[#1E3A5F]/5" : ""}`}>
                <div className="w-10 h-10 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-sm font-bold text-[#1E3A5F]">{c.nombre[0]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <p className="font-semibold text-sm text-dark dark:text-white truncate">{c.nombre}</p>
                    <span className="text-[10px] text-darklink flex-shrink-0 ml-2">{c.hora}</span>
                  </div>
                  <p className="text-xs text-darklink truncate">{c.empresa}</p>
                  <p className="text-xs text-darklink truncate mt-0.5">{c.mensaje}</p>
                </div>
                {c.noLeidos > 0 && (
                  <span className="w-5 h-5 rounded-full bg-[#4A7C3F] text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{c.noLeidos}</span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="col-span-12 md:col-span-8 rounded-2xl shadow-md bg-background overflow-hidden flex flex-col">
          {/* Header */}
          <div className="px-5 py-4 border-b border-border flex items-center justify-between bg-[#1E3A5F]/3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#1E3A5F]/10 flex items-center justify-center">
                <span className="text-sm font-bold text-[#1E3A5F]">{convActiva.nombre[0]}</span>
              </div>
              <div>
                <p className="font-semibold text-dark dark:text-white">{convActiva.nombre}</p>
                <p className="text-xs text-darklink">{convActiva.empresa}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-xs border border-border px-3 py-1.5 rounded-lg text-darklink hover:border-[#1E3A5F]">Ver cliente</button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3 bg-gray-50/50 dark:bg-white/3">
            {mensajesActivos.map((m, i) => (
              <div key={i} className={`flex ${m.de === "haladás" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${m.de === "haladás" ? "bg-[#1E3A5F] text-white rounded-br-sm" : "bg-white dark:bg-white/10 border border-border rounded-bl-sm"}`}>
                  <p className="text-sm leading-relaxed">{m.texto}</p>
                  <p className={`text-[10px] mt-1 text-right ${m.de === "haladás" ? "text-white/60" : "text-darklink"}`}>{m.hora}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Plantillas */}
          <div className="px-4 py-2 border-t border-border bg-background">
            <div className="flex gap-2 overflow-x-auto pb-1">
              {plantillas.map((p, i) => (
                <button key={i} onClick={() => { setPlantillaSeleccionada(p); setMensajeTexto(p.texto); }} className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full border transition-colors ${plantillaSeleccionada?.nombre === p.nombre ? "border-[#1E3A5F] bg-[#1E3A5F] text-white" : "border-border text-darklink hover:border-[#1E3A5F]"}`}>
                  📄 {p.nombre}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-border flex gap-2 items-end">
            <textarea value={mensajeTexto} onChange={e => setMensajeTexto(e.target.value)} className="flex-1 border border-border rounded-xl px-3 py-2.5 text-sm resize-none h-20 focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20 bg-background" placeholder="Escribe un mensaje o selecciona una plantilla..." />
            <div className="flex flex-col gap-2">
              <button className="w-10 h-10 bg-[#4A7C3F] text-white rounded-xl flex items-center justify-center hover:bg-[#3a6232] transition-colors">
                <Icon icon="solar:chat-line-bold" height={18} />
              </button>
              <button className="w-10 h-10 border border-border text-darklink rounded-xl flex items-center justify-center hover:border-[#1E3A5F]">
                <Icon icon="solar:paperclip-linear" height={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
