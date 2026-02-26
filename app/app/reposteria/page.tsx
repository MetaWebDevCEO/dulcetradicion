"use client";

import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { Navbar } from "./components/Navbar";

export default function ReposteriaPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar Fijo / Responsive */}
      <Sidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
      />

      {/* Área de Contenido Principal */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        {/* Navbar Sticky */}
        <Navbar 
          onMenuClick={() => setIsSidebarOpen(true)}
        />

        {/* Contenido de la Página */}
        <main className="flex-1 p-4 md:p-6 animate-in fade-in duration-500">
          <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-gray-200 rounded-xl bg-white/50 min-h-[400px]">
            <h2 className="text-xl font-semibold text-gray-700">Contenido Principal</h2>
            <p className="text-gray-500 mt-2">Aquí se cargará el contenido de la sección seleccionada.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
