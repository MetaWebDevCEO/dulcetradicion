"use client";

import Link from "next/link";
import { X, Coffee, MapPin, Clock, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 md:hidden"
          />

          {/* Sidebar Content */}
          <motion.aside
            key="sidebar"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed top-16 left-0 h-[calc(100vh-64px)] w-[280px] bg-white shadow-2xl z-[60] p-6 flex flex-col md:hidden"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex flex-col">

                <span className="text-xl font-bold text-[var(--foreground)]">Dulce Tradicion</span>
                <span className="text-[10px] tracking-[0.2em] text-[var(--foreground)]/70 uppercase font-medium">Cafetería</span>
              </div>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-[var(--foreground)]/5 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-[var(--foreground)]" />
              </button>
            </div>

            <nav className="flex-1 space-y-2">
              <Link 
                href="/app/cafe" 
                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-[#3E7C59]/5 text-[var(--foreground)] font-medium transition-colors"
                onClick={onClose}
              >
                <Coffee className="w-5 h-5 text-[#3E7C59]" />
                Ver Menú
              </Link>
              <Link 
                href="/app/cafe" 
                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-[#3E7C59]/5 text-[var(--foreground)] font-medium transition-colors"
                onClick={onClose}
              >
                <MapPin className="w-5 h-5 text-[#3E7C59]" />
                Ubicación
              </Link>
              <Link 
                href="/app/cafe" 
                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-[#3E7C59]/5 text-[var(--foreground)] font-medium transition-colors"
                onClick={onClose}
              >
                <Clock className="w-5 h-5 text-[#3E7C59]" />
                Horarios
              </Link>
              <Link 
                href="/app/cafe" 
                className="flex items-center gap-4 px-4 py-3 rounded-2xl hover:bg-[#3E7C59]/5 text-[var(--foreground)] font-medium transition-colors"
                onClick={onClose}
              >
                <Phone className="w-5 h-5 text-[#3E7C59]" />
                Contacto
              </Link>
            </nav>

            <div className="mt-auto pt-6 border-t border-[var(--foreground)]/10">
              <Link 
                href="/app"
                className="flex items-center justify-center w-full py-4 rounded-full bg-[#3E7C59] text-white font-semibold hover:opacity-90 transition-all shadow-lg shadow-[#3E7C59]/20"
                onClick={onClose}
              >
                Volver al Inicio
              </Link>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
