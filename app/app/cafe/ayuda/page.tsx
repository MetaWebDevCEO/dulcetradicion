"use client";

import React, { useState } from "react";
import { HelpCircle, ChevronDown, MessageCircle, BookOpen, Star, ArrowRight } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const FAQS = [
  {
    pregunta: "¿Cómo sé cuándo mi pedido está listo?",
    respuesta: "Una vez que realices tu pedido, puedes monitorear el estado en la sección 'Mis Pedidos'. Cuando el estado cambie a 'Listo', puedes pasar a la barra por él."
  },
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta: "Aceptamos tarjetas de crédito, débito y pagos mediante la plataforma digital de la aplicación. Por el momento, el pago en efectivo solo está disponible directamente en sucursal."
  },
  {
    pregunta: "¿Puedo cancelar un pedido ya realizado?",
    respuesta: "Los pedidos pueden cancelarse siempre y cuando no hayan pasado al estado 'Preparando'. Una vez que la cocina acepta el pedido, no es posible realizar cancelaciones."
  },
  {
    pregunta: "¿Cómo solicito mi factura?",
    respuesta: "Puedes solicitar tu factura enviando tu ticket de compra y datos fiscales a nuestro WhatsApp de soporte o mediante el correo electrónico oficial."
  }
];

export default function AyudaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-3xl mx-auto space-y-8">
            
            <header className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-900 rounded-2xl text-white">
                  <HelpCircle className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Centro de</span>
                  <h1 className="text-4xl font-black text-gray-900 mt-1">Ayuda</h1>
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-gray-900 uppercase text-xs">Guía de uso</p>
                  <p className="text-xs text-gray-400 font-bold uppercase">Aprende a usar la app</p>
                </div>
              </div>
              <div className="bg-white p-6 rounded-[2rem] border border-gray-100 flex items-center gap-4">
                <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-gray-900 uppercase text-xs">Términos</p>
                  <p className="text-xs text-gray-400 font-bold uppercase">Políticas de servicio</p>
                </div>
              </div>
            </div>

            <section className="bg-white border border-gray-100 rounded-[2.5rem] p-4 md:p-8 shadow-sm">
              <h2 className="px-4 mb-6 font-black text-gray-900 uppercase tracking-tight text-xl">Preguntas Frecuentes</h2>
              <div className="space-y-3">
                {FAQS.map((faq, idx) => (
                  <div key={idx} className="border border-gray-50 rounded-[1.5rem] overflow-hidden">
                    <button 
                      onClick={() => toggleFaq(idx)}
                      className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50/50 transition-colors"
                    >
                      <span className="font-bold text-gray-700 text-sm uppercase leading-tight">{faq.pregunta}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${openIndex === idx ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}`}>
                      <div className="p-5 pt-0 text-sm text-gray-500 leading-relaxed bg-white">
                        {faq.respuesta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </div>
        </main>
      </div>
    </div>
  );
}