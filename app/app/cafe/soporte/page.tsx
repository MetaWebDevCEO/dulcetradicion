"use client";

import React, { useState } from "react";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Clock, 
  ChevronRight, 
  HelpCircle, 
  ExternalLink, 
  Info 
} from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function SoportePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const contactChannels = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "WhatsApp",
      description: "Respuesta rápida para dudas de tu pedido.",
      action: "Enviar mensaje",
      color: "text-green-600",
      bg: "bg-green-50",
      link: "https://wa.me/5212290000000"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Llamada directa",
      description: "Línea exclusiva de atención a clientes.",
      action: "Llamar ahora",
      color: "text-blue-600",
      bg: "bg-blue-50",
      link: "tel:+522290000000"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Correo electrónico",
      description: "Para sugerencias, quejas o facturación.",
      action: "Escribir correo",
      color: "text-purple-600",
      bg: "bg-purple-50",
      link: "mailto:contacto@dulcetradicion.com"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <header className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-900 rounded-2xl text-white">
                  <Phone className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Atención</span>
                  <h1 className="text-4xl font-black text-gray-900 mt-1">Soporte</h1>
                </div>
              </div>
              <div className="bg-emerald-50 px-6 py-3 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Sucursal abierta</p>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {contactChannels.map((channel, idx) => (
                <a 
                  href={channel.link} 
                  key={idx}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border border-gray-100 rounded-[2.5rem] p-8 flex flex-col items-center text-center hover:shadow-xl transition-all group"
                >
                  <div className={`w-16 h-16 ${channel.bg} ${channel.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    {channel.icon}
                  </div>
                  <h3 className="font-black text-gray-900 uppercase tracking-tight mb-2">{channel.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-6">
                    {channel.description}
                  </p>
                  <div className={`mt-auto flex items-center gap-2 font-bold text-xs uppercase tracking-widest ${channel.color}`}>
                    {channel.action}
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </a>
              ))}
            </div>

            <div className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm">
              <div className="p-8 border-b border-gray-50 flex items-center gap-4">
                <div className="p-2 bg-gray-900 rounded-xl text-white">
                  <Info className="w-5 h-5" />
                </div>
                <h2 className="font-black text-gray-900 uppercase tracking-tight">Información de la sucursal</h2>
              </div>
              <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                      <MapPin className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Ubicación</p>
                      <p className="text-sm font-bold text-gray-700 uppercase leading-snug">Av. Principal #123, Colonia Centro, Veracruz</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="p-3 bg-gray-50 rounded-2xl text-gray-400">
                      <Clock className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Horarios</p>
                      <p className="text-sm font-bold text-gray-700 uppercase">Lun - Sab: 8:00 AM - 10:00 PM</p>
                      <p className="text-sm font-bold text-gray-400 uppercase">Dom: 9:00 AM - 8:00 PM</p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-100 rounded-3xl min-h-[200px] relative overflow-hidden flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000" 
                    className="absolute inset-0 w-full h-full object-cover" 
                    alt="Interior Dulce Tradición"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000";
                    }}
                  />
                  <div className="absolute inset-0 bg-black/20" />
                  <button className="relative bg-white/95 backdrop-blur px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-sm flex items-center gap-2 hover:scale-105 transition-all">
                    Ver en Google Maps
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 rounded-[2.5rem] p-10 text-center space-y-6 shadow-2xl shadow-gray-200">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle className="w-8 h-8 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="text-white font-black text-2xl uppercase tracking-tight">¿Tienes dudas frecuentes?</h2>
                <p className="text-gray-400 text-sm max-w-md mx-auto">Consulta nuestra sección de ayuda para conocer tiempos de entrega, métodos de pago y políticas de facturación.</p>
              </div>
              <button className="bg-white text-gray-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-transform">
                <a href="/app/cafe/ayuda">Ir a centro de ayuda</a>
              </button>
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}