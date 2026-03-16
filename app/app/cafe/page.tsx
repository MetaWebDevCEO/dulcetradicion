"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

export default function CafePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 p-4 md:p-6 animate-in fade-in duration-500">
          <div className="flex flex-col items-center justify-center h-full text-center border-2 border-dashed border-gray-200 rounded-xl bg-white/50 min-h-[400px]">
            <h2 className="text-xl font-semibold text-gray-700">Pedidos de Cafetería</h2>
            <p className="text-gray-500 mt-2">
              Aquí se cargará el flujo para crear y gestionar pedidos.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
