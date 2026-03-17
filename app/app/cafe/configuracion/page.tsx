"use client";

import React, { useState } from "react";
import { Settings, User, Bell, Shield, Coffee, Trash2, Camera, Save, X, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

export default function ConfiguracionPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 1500);
  };

  const confirmDeleteAccount = () => {
    setShowDeleteModal(false);
    // Aquí iría la lógica real de Supabase en el futuro
    router.push("/login");
  };

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
                  <Settings className="w-8 h-8" />
                </div>
                <div>
                  <span className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">Panel de</span>
                  <h1 className="text-4xl font-black text-gray-900 mt-1">Configuración</h1>
                </div>
              </div>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-200 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {isSaving ? "Guardando..." : (
                  <>
                    <Save className="w-4 h-4" />
                    Guardar Cambios
                  </>
                )}
              </button>
            </header>

            <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="font-black text-gray-900 uppercase tracking-tight">Perfil de Usuario</h2>
              </div>

              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                <div className="relative group">
                  <div className="w-32 h-32 bg-gray-100 rounded-[2.5rem] overflow-hidden border-4 border-white shadow-md">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80" 
                      className="w-full h-full object-cover" 
                      alt="Avatar"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 bg-gray-900 text-white p-3 rounded-2xl shadow-xl hover:scale-110 transition-transform">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex-1 w-full grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Nombre completo</label>
                    <input type="text" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gray-200" defaultValue="Usuario Dulce Tradición" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase ml-2">Correo electrónico</label>
                    <input type="email" className="w-full bg-gray-50 border border-gray-100 rounded-2xl px-6 py-3.5 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-gray-200" defaultValue="usuario@email.com" />
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
                    <Coffee className="w-5 h-5" />
                  </div>
                  <h2 className="font-black text-gray-900 uppercase tracking-tight text-sm">Preferencias</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <span className="text-xs font-bold text-gray-600 uppercase">Sin lactosa</span>
                    <input type="checkbox" className="w-10 h-5 bg-gray-300 rounded-full appearance-none checked:bg-emerald-500 transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all" />
                  </div>
                </div>
              </section>

              <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
                    <Bell className="w-5 h-5" />
                  </div>
                  <h2 className="font-black text-gray-900 uppercase tracking-tight text-sm">Notificaciones</h2>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                    <span className="text-xs font-bold text-gray-600 uppercase">Estado de Pedido</span>
                    <input type="checkbox" className="w-10 h-5 bg-gray-300 rounded-full appearance-none checked:bg-emerald-500 transition-all cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:left-5 after:transition-all" defaultChecked />
                  </div>
                </div>
              </section>
            </div>

            <section className="bg-white border border-gray-100 rounded-[2.5rem] p-8 shadow-sm mb-12">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-2 bg-gray-50 rounded-xl text-gray-400">
                  <Shield className="w-5 h-5" />
                </div>
                <h2 className="font-black text-gray-900 uppercase tracking-tight">Seguridad y Cuenta</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <button className="flex items-center justify-between p-6 bg-gray-50 hover:bg-gray-100 rounded-3xl transition-all border border-transparent hover:border-gray-200 group">
                  <div className="text-left">
                    <p className="text-sm font-black text-gray-900 uppercase">Cambiar Contraseña</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Actualizada hace 3 meses</p>
                  </div>
                  <Shield className="w-5 h-5 text-gray-300 group-hover:text-gray-900 transition-colors" />
                </button>

                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="flex items-center justify-between p-6 bg-red-50 hover:bg-red-100 rounded-3xl transition-all border border-transparent hover:border-red-200 group"
                >
                  <div className="text-left">
                    <p className="text-sm font-black text-red-600 uppercase">Eliminar Cuenta</p>
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-widest mt-1">Esta acción es irreversible</p>
                  </div>
                  <Trash2 className="w-5 h-5 text-red-300 group-hover:text-red-600 transition-colors" />
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={() => setShowDeleteModal(false)}></div>
          <div className="relative bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200 text-center">
            <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <AlertTriangle className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-2">¿Estás seguro?</h3>
            <p className="text-gray-500 text-sm mb-8">Esta acción eliminará permanentemente tu historial de pedidos y datos de perfil. No se puede deshacer.</p>
            <div className="space-y-3">
              <button 
                onClick={confirmDeleteAccount}
                className="w-full bg-red-600 text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-red-700 transition-all shadow-lg shadow-red-200"
              >
                Sí, eliminar cuenta
              </button>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="w-full bg-gray-100 text-gray-600 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}