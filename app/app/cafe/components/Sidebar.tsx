"use client";

import React from "react";
import Link from "next/link";
import {
  Coffee,
  ShoppingBag,
  Receipt,
  Phone,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Plus,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { supabaseClient } from "@/lib/supabaseClient";

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
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

      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 flex flex-col 
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:sticky md:top-0 md:h-screen md:overflow-y-auto md:left-auto md:inset-y-auto
        `}
      >
        <div className="p-6 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-800">Dulce Tradicion</span>
            <span className="text-[10px] tracking-[0.2em] text-gray-500 uppercase font-medium">Cafetería</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-lg md:hidden text-gray-500"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="px-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Buscar productos"
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 px-4 space-y-6 overflow-y-auto md:overflow-visible">
          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">Pedidos</h3>
            <nav className="space-y-1">
              <Link
                href="/app/cafe"
                className="flex items-center justify-between px-4 py-2.5 bg-gray-900 text-white rounded-lg group transition-colors"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <Plus className="w-5 h-5" />
                  <span className="font-medium text-sm">Nuevo pedido</span>
                </div>
              </Link>

              <Link
                href="/app/cafe/menu"
                className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <Coffee className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Menú</span>
                </div>
              </Link>

              <Link
                href="/app/cafe/carrito"
                className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Carrito</span>
                </div>
              </Link>

              <Link
                href="/app/cafe/mis-pedidos"
                className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <Receipt className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Mis pedidos</span>
                </div>
              </Link>

              <Link
                href="/app/cafe/soporte"
                className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Soporte</span>
                </div>
              </Link>
            </nav>
          </div>

          <div>
            <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">General</h3>
            <nav className="space-y-1">
              <Link
                href="/app/cafe/configuracion"
                className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Configuración</span>
                </div>
              </Link>
              <Link
                href="/app/cafe/ayuda"
                className="flex items-center justify-between px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg group transition-colors"
                onClick={onClose}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  <span className="font-medium text-sm">Ayuda</span>
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
