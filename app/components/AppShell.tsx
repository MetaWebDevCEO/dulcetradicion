"use client";

import type { ReactNode } from "react";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import TransitionLoader from "./TransitionLoader";
import { supabaseClient } from "@/lib/supabaseClient";

type AppShellProps = {
  children: ReactNode;
};

const AppShell = ({ children }: AppShellProps) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAuthResolved, setIsAuthResolved] = useState(false);

  useEffect(() => {
    // Iniciar animación al cambiar de ruta
    queueMicrotask(() => setIsTransitioning(true));
    
    // Finalizar animación después de un tiempo (coincidiendo con la duración de la animación)
    const timer = setTimeout(() => {
      setIsTransitioning(false);
    }, 1500); // 1s de duración + delays

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    let isMounted = true;

    const isProtectedRoute = pathname.startsWith("/app");
    const isAuthRoute = pathname === "/login" || pathname === "/register";

    if (!isProtectedRoute && !isAuthRoute) {
      queueMicrotask(() => setIsAuthResolved(true));
      return;
    }

    queueMicrotask(() => setIsAuthResolved(false));

    const resolveAuth = async () => {
      const {
        data: { session },
      } = await supabaseClient.auth.getSession();

      if (!isMounted) {
        return;
      }

      if (isProtectedRoute && !session) {
        router.replace("/login");
        return;
      }

      if (isAuthRoute && session) {
        router.replace("/app");
        return;
      }

      setIsAuthResolved(true);
    };

    resolveAuth();

    const { data } = supabaseClient.auth.onAuthStateChange(() => {
      resolveAuth();
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, [pathname, router]);

  return (
    <div className="min-h-screen w-full bg-[var(--background)]">
      <AnimatePresence mode="wait">
        {(isTransitioning || !isAuthResolved) && <TransitionLoader key="loader" />}
      </AnimatePresence>
      <div className={isTransitioning || !isAuthResolved ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </div>
  );
};

export default AppShell;
