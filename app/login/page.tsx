 "use client";
 
 import Link from "next/link";
 import { useRouter } from "next/navigation";
 import { FormEvent, useEffect, useState } from "react";
 import { supabaseClient } from "@/lib/supabaseClient";
 
 export default function Login() {
   const [showPassword, setShowPassword] = useState(false);
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState<string | null>(null);
   const [showError, setShowError] = useState(false);
   const [loading, setLoading] = useState(false);
   const router = useRouter();
 
   const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
     event.preventDefault();
     setError(null);
    setShowError(false);
     setLoading(true);
 
     const { error: signInError } = await supabaseClient.auth.signInWithPassword({
       email,
       password,
     });
 
    if (signInError) {
      setError(signInError.message);
      setShowError(true);
      setLoading(false);
      return;
    }

    setLoading(false);
    router.push("/proximamente");
   };

  useEffect(() => {
    if (!error) {
      return;
    }

    const timer = setTimeout(() => {
      setShowError(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [error]);
 
   return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
       <main className="w-full max-w-md px-6 py-10">
        <div className="mb-8 flex flex-col items-center">
          <span className="text-2xl font-semibold text-[var(--foreground)]">
            Dulce Tradicion
          </span>
          <p className="mt-5 text-xs tracking-[0.25em] text-[var(--foreground)]/70">
            REPOSTERÍA & CAFÉ
          </p>
          <h1 className="mt-3 text-2xl font-semibold text-[var(--foreground)]">
            Acceder a Dulce Tradicion
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground)]/80">
            Ingresa tus credenciales para seguir disfrutando de nuestros postres y café.
          </p>
        </div>
 
        <form className="space-y-6" onSubmit={handleSubmit}>
           <div>
             <label className="mb-2 block text-xs font-medium tracking-wide text-[var(--foreground)]">
               EMAIL
             </label>
             <div className="relative">
               <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                   <path
                     d="M3 7a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V7Z"
                     stroke="currentColor"
                     strokeWidth="1.5"
                   />
                   <path
                     d="m4 7 8 6 8-6"
                     stroke="currentColor"
                     strokeWidth="1.5"
                     strokeLinecap="round"
                     strokeLinejoin="round"
                   />
                 </svg>
               </span>
               <input
                 type="email"
                 placeholder="tu@correo.com"
                 className="h-12 w-full rounded-full border border-[var(--foreground)]/20 bg-white px-4 pl-11 text-sm outline-none transition-colors placeholder:text-[var(--foreground)]/50 focus:border-[var(--foreground)]/60"
                 value={email}
                 onChange={(event) => setEmail(event.target.value)}
               />
             </div>
           </div>
 
           <div>
             <div className="flex items-center justify-between">
               <label className="mb-2 block text-xs font-medium tracking-wide text-[var(--foreground)]">
                 PASSWORD
               </label>
               <Link
                 href="#"
                 className="text-xs text-[var(--foreground)] underline underline-offset-4 hover:text-[var(--foreground)]/80"
               >
                 Forgot Password?
               </Link>
             </div>
             <div className="relative">
               <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                 <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                   <rect
                     x="4"
                     y="11"
                     width="16"
                     height="9"
                     rx="2"
                     stroke="currentColor"
                     strokeWidth="1.5"
                   />
                   <path
                     d="M8 11V8a4 4 0 0 1 8 0v3"
                     stroke="currentColor"
                     strokeWidth="1.5"
                     strokeLinecap="round"
                   />
                 </svg>
               </span>
               <input
                 type={showPassword ? "text" : "password"}
                 placeholder="••••••••"
                 className="h-12 w-full rounded-full border border-[var(--foreground)]/20 bg-white px-4 pl-11 pr-12 text-sm outline-none transition-colors placeholder:text-[var(--foreground)]/50 focus:border-[var(--foreground)]/60"
                 value={password}
                 onChange={(event) => setPassword(event.target.value)}
               />
               <button
                 type="button"
                 onClick={() => setShowPassword((v) => !v)}
                 className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-2 text-[var(--foreground)] hover:text-[var(--foreground)]/80"
                 aria-label="Mostrar u ocultar contraseña"
               >
                 {showPassword ? (
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                     <path
                       d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                       stroke="currentColor"
                       strokeWidth="1.5"
                       fill="none"
                     />
                     <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
                   </svg>
                 ) : (
                   <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                     <path
                       d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z"
                       stroke="currentColor"
                       strokeWidth="1.5"
                       fill="none"
                     />
                     <path
                       d="M3 3l18 18"
                       stroke="currentColor"
                       strokeWidth="1.5"
                       strokeLinecap="round"
                     />
                   </svg>
                 )}
               </button>
             </div>
           </div>
 
          <button
            type="submit"
            className="mt-2 flex h-12 w-full items-center justify-center rounded-full bg-[var(--foreground)] text-white transition-colors hover:bg-[#315f45] disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "Ingresando..." : "Ingresar"}
          </button>
          {error && (
            <div
              className={`mt-3 mx-auto max-w-xs rounded-2xl bg-[var(--foreground)] px-3 py-2 text-center text-xs text-white transition-all duration-500 transform ${
                showError ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
              }`}
              onAnimationEnd={() => {
                if (!showError) {
                  setError(null);
                }
              }}
            >
              {error}
            </div>
          )}
        </form>
 
         <p className="mt-6 text-center text-sm text-[var(--foreground)]/80">
           ¿No tienes cuenta?{" "}
           <Link href="/register" className="font-medium text-[var(--foreground)] underline underline-offset-4">
             Crear cuenta
           </Link>
         </p>
       </main>
     </div>
   );
 }
