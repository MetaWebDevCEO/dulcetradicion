"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  onMenuClick: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-[var(--foreground)]/10 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-[var(--foreground)]/5 rounded-full transition-colors md:hidden"
        >
          <Menu className="w-6 h-6 text-[var(--foreground)]" />
        </button>
        <Link href="/app" className="flex flex-col items-start leading-tight">
          <span className="text-lg font-bold text-[var(--foreground)]">Dulce Tradicion</span>
          <span className="text-[10px] tracking-[0.2em] text-[var(--foreground)]/70 uppercase">Cafetería</span>
        </Link>
      </div>

      <div className="hidden md:flex items-center gap-8">
        <Link href="/app/cafe" className="text-sm font-medium text-[var(--foreground)] hover:text-[#3E7C59] transition-colors">Menú</Link>
        <Link href="/app/cafe" className="text-sm font-medium text-[var(--foreground)] hover:text-[#3E7C59] transition-colors">Especialidades</Link>
        <Link href="/app/cafe" className="text-sm font-medium text-[var(--foreground)] hover:text-[#3E7C59] transition-colors">Ubicación</Link>
      </div>

      <Link 
        href="/app"
        className="px-4 py-2 rounded-full border border-[#3E7C59] text-[#3E7C59] text-xs font-semibold hover:bg-[#3E7C59]/5 transition-all"
      >
        Volver
      </Link>
    </nav>
  );
}
