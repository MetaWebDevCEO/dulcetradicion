"use client";

import React, { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function CarritoPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProcesando, setIsProcesando] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (Number(item.precio) * item.cantidad), 0);
  const totalFinal = subtotal;

  const handlePago = () => {
    setIsProcesando(true);
    setTimeout(() => {
      alert("¡Pago procesado con éxito!");
      clearCart();
      setIsProcesando(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <header className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Resumen de pedido</span>
                <h1 className="text-4xl font-black text-gray-900 mt-2">Mi Carrito</h1>
              </div>
              <div className="bg-gray-900 text-white px-8 py-4 rounded-2xl shadow-lg">
                <p className="text-[10px] font-bold opacity-60 uppercase tracking-widest">Total a pagar</p>
                <p className="text-3xl font-black">${totalFinal.toFixed(2)}</p>
              </div>
            </header>

            {cart.length === 0 ? (
              <div className="bg-white rounded-[2.5rem] border border-gray-100 p-20 text-center space-y-6">
                <div className="bg-gray-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-12 h-12 text-gray-300" />
                </div>
                <p className="text-gray-500 font-bold text-xl uppercase tracking-tight">Tu carrito está vacío</p>
                <Link 
                  href="/app/cafe" 
                  className="inline-block bg-gray-900 text-white px-10 py-4 rounded-2xl font-black text-sm hover:scale-105 transition-transform uppercase"
                >
                  Regresar al Menú
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                
                <div className="lg:col-span-2 space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="bg-white border border-gray-100 rounded-[2rem] p-4 flex items-center gap-4 shadow-sm group">
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-100 shrink-0">
                        <img 
                          src={item.imagen} 
                          className="w-full h-full object-cover" 
                          alt={item.nombre}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000";
                          }}
                        />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="font-black text-gray-900 text-base uppercase leading-tight">{item.nombre}</h3>
                        <p className="text-green-600 font-bold text-sm">${Number(item.precio).toFixed(2)}</p>
                      </div>

                      <div className="flex items-center gap-2 bg-gray-50 p-1.5 rounded-xl border border-gray-100">
                        <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-red-500">
                          <Minus className="w-3.5 h-3.5"/>
                        </button>
                        <span className="font-black text-gray-900 w-6 text-center">{item.cantidad}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:bg-white rounded-lg transition-all text-gray-400 hover:text-green-600">
                          <Plus className="w-3.5 h-3.5"/>
                        </button>
                      </div>

                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-gray-300 hover:text-red-500 transition-colors">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>

                <div className="lg:col-span-1">
                  <div className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm space-y-6 sticky top-8">
                    <h2 className="font-black text-gray-900 text-xl uppercase tracking-tight border-b border-gray-50 pb-4">Detalle</h2>
                    
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400 font-bold uppercase">Subtotal</span>
                        <span className="font-black text-gray-900">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="pt-4 border-t border-gray-100 flex justify-between items-end">
                        <span className="text-gray-900 font-black text-lg uppercase">Total</span>
                        <span className="text-2xl font-black text-green-600">${totalFinal.toFixed(2)}</span>
                      </div>
                    </div>

                    <button 
                      onClick={handlePago}
                      disabled={isProcesando}
                      className={`w-full py-5 rounded-2xl font-black text-lg transition-all shadow-lg flex items-center justify-center gap-3 active:scale-[0.98] ${
                        isProcesando ? "bg-gray-400 cursor-not-allowed" : "bg-emerald-800 hover:bg-emerald-900 text-white"
                      }`}
                    >
                      {isProcesando ? (
                        <>Procesando...</>
                      ) : (
                        <>
                          Pagar ahora
                          <ArrowRight className="w-5 h-5" />
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}