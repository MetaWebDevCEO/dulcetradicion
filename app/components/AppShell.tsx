"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import TransitionLoader from "./TransitionLoader";

type AppShellProps = {
  children: ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    // Iniciar animación al cambiar de ruta
    setIsTransitioning(true);
    
    // Finalizar animación después de un tiempo (coincidiendo con la duración de la animación)
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1500); // 1s de duración + delays

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <div className="min-h-screen w-full bg-[var(--background)]">
      <AnimatePresence mode="wait">
        {isTransitioning && <TransitionLoader key="loader" />}
      </AnimatePresence>
      <div className={isTransitioning ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </div>
  );
};

export default AppShell;

