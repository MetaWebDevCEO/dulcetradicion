"use client";

import React, { useState } from "react";
import { Receipt, Clock, ChevronRight, Package, Calendar, X, Hash, Info } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const PEDIDOS_HISTORY = [
  {
    id: "DT-8842",
    fecha: "Hoy, 5:30 PM",
    estado: "Preparando",
    total: 115.00,
    itemsList: [
      { nombre: "Frappé Taro", cantidad: 1, precio: 115.00 }
    ],
    itemsResumen: "1x Frappé Taro",
    color: "bg-orange-100 text-orange-600"
  },
  {
    id: "DT-8839",
    fecha: "Ayer, 10:15 AM",
    estado: "Listo",
    total: 200.00,
    itemsList: [
      { nombre: "Capuchino", cantidad: 2, precio: 50.00 },
      { nombre: "Baguette Clásico", cantidad: 1, precio: 100.00 }
    ],
    itemsResumen: "2x Capuchino, 1x Baguette Clásico",
    color: "bg-green-100 text-green-600"
  },
  {
    id: "DT-8712",
    fecha: "12 Mar, 2:45 PM",
    estado: "Entregado",
    total: 85.00,
    itemsList: [
      { nombre: "Moka", cantidad: 1, precio: 85.00 }
    ],
    itemsResumen: "1x Moka",
    color: "bg-gray-100 text-gray-600"
  }
];

export default function MisPedidosPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<typeof PEDIDOS_HISTORY[0] | null>(null);

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
                  <Receipt className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Historial</span>
                  <h1 className="text-4xl font-black text-gray-900 mt-1">Mis Pedidos</h1>
                </div>
              </div>
              <div className="bg-white px-6 py-3 rounded-2xl border border-gray-100 shadow-sm">
                <p className="text-[10px] font-bold text-gray-400 uppercase">Total pedidos</p>
                <p className="text-xl font-black text-gray-900 text-center">{PEDIDOS_HISTORY.length}</p>
              </div>
            </header>

            <div className="space-y-4">
              {PEDIDOS_HISTORY.map((pedido) => (
                <div 
                  key={pedido.id} 
                  onClick={() => setSelectedPedido(pedido)}
                  className="bg-white border border-gray-100 rounded-[2rem] p-6 flex flex-col md:flex-row items-center gap-6 hover:shadow-lg transition-all group cursor-pointer"
                >
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                    <Package className="w-8 h-8" />
                  </div>

                  <div className="flex-1 text-center md:text-left space-y-1">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <h3 className="font-black text-gray-900 text-lg uppercase tracking-tight">{pedido.id}</h3>
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${pedido.color}`}>
                        {pedido.estado}
                      </span>
                    </div>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-400 font-medium">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {pedido.fecha}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        Recoger en barra
                      </div>
                    </div>
                    <p className="text-gray-500 text-sm italic pt-1">{pedido.itemsResumen}</p>
                  </div>

                  <div className="text-center md:text-right border-t md:border-t-0 md:border-l border-gray-100 pt-4 md:pt-0 md:pl-8 min-w-[120px]">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Pago total</p>
                    <p className="text-2xl font-black text-green-600">${pedido.total.toFixed(2)}</p>
                  </div>

                  <div className="hidden md:block text-gray-300 group-hover:text-gray-900 transition-colors">
                    <ChevronRight className="w-6 h-6" />
                  </div>
                </div>
              ))}
            </div>

            {PEDIDOS_HISTORY.length === 0 && (
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 text-center space-y-6">
                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <Receipt className="w-12 h-12 text-gray-300" />
                </div>
                <p className="text-gray-500 font-bold text-xl uppercase">No has realizado pedidos</p>
                <button className="bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm uppercase">
                  Hacer mi primer pedido
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {selectedPedido && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm"
            onClick={() => setSelectedPedido(null)}
          ></div>
          
          <div className="relative bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="p-8 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gray-900 rounded-xl text-white">
                  <Hash className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-black text-gray-900 uppercase tracking-tight">{selectedPedido.id}</h2>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{selectedPedido.fecha}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedPedido(null)}
                className="p-2 hover:bg-white rounded-full text-gray-400 hover:text-gray-900 transition-all border border-transparent hover:border-gray-100"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="flex items-center gap-3">
                  <Info className="w-5 h-5 text-gray-400" />
                  <span className="text-sm font-bold text-gray-600 uppercase">Estado actual</span>
                </div>
                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${selectedPedido.color}`}>
                  {selectedPedido.estado}
                </span>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] px-1">Detalle de productos</h4>
                <div className="space-y-3">
                  {selectedPedido.itemsList.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center group">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-gray-100 text-[10px] font-black text-gray-900">
                          {item.cantidad}x
                        </span>
                        <span className="font-bold text-gray-700 text-sm uppercase">{item.nombre}</span>
                      </div>
                      <span className="font-black text-gray-900 text-sm">${(item.precio * item.cantidad).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 font-bold text-xs uppercase">Método de entrega</span>
                  <span className="font-black text-gray-900 text-xs uppercase">Recoger en barra</span>
                </div>
                <div className="flex justify-between items-end pt-2">
                  <span className="text-gray-900 font-black text-xl uppercase tracking-tighter">Total pagado</span>
                  <span className="text-3xl font-black text-green-600">${selectedPedido.total.toFixed(2)}</span>
                </div>
              </div>

              <button 
                onClick={() => setSelectedPedido(null)}
                className="w-full bg-gray-900 text-white py-5 rounded-2xl font-black text-sm uppercase tracking-[0.2em] hover:bg-black transition-all shadow-lg active:scale-[0.98]"
              >
                Cerrar Detalle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}