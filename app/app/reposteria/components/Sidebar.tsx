"use client";

import React from 'react';
import { 
  Package,
  ShoppingBag,
  Phone,
  FileText,
  CheckCircle,
  MessageCircle,
  Settings, 
  HelpCircle, 
  LogOut, 
  Search,
  Plus,
  X
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabaseClient.auth.signOut();
    onClose?.();
    router.replace("/login");
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col 
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:inset-auto md:h-screen md:overflow-y-auto
      `}>
        <div className="p-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-gray-800">Dulce Tradicion</span>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg md:hidden text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="px-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
              <span className="text-[10px] text-gray-400 border border-gray-200 rounded px-1 hidden sm:inline">⌘ K</span>
            </div>
          </div>
        </div>

        <div className="flex-1 px-4 space-y-6 overflow-y-auto md:overflow-visible">
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Repostería</h3>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 bg-gray-900 text-white rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5" />
                  <span className="font-medium text-sm">Crear Galleta</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <Package className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Mis Pedidos</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Compras realizadas</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Chat con soporte</span>
                </div>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Administación</h3>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Pedidos hechos</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Pedidos entregados</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Chat con cliente</span>
                </div>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">General</h3>
            <nav className="space-y-1">
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Configuración</span>
                </div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors">
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Soporte</span>
                </div>
              </Link>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Log out</span>
                </div>
              </button>
            </nav>
          </div>
        </div>
      </aside>
    </>
  );
}
