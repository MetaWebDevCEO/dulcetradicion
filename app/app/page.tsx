import Link from "next/link";

export default function AppPage() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 animate-in fade-in duration-500">
      <Link 
        href="/app/cafe"
        className="flex flex-col items-center justify-center px-8 py-10 text-center border-b md:border-b-0 md:border-r border-[var(--foreground)]/10 bg-white/5 hover:bg-white/10 transition-all group"
      >
        <div className="group-hover:scale-105 transition-transform duration-500">
          <span className="text-2xl font-semibold text-[var(--foreground)]">
            Dulce Tradicion
          </span>
          <p className="mt-4 text-xs tracking-[0.25em] text-[var(--foreground)]/70 font-medium">
            CAFETERÍA
          </p>
        </div>
        <p className="mt-6 text-sm text-[var(--foreground)]/80 max-w-xs group-hover:text-[var(--foreground)] transition-colors">
          Espresso, capuchino, latte y más para acompañar tus momentos.
        </p>
        <div className="mt-8 px-8 py-3 rounded-full bg-[#3E7C59] text-white text-sm font-semibold shadow-sm group-hover:shadow-lg group-hover:shadow-[#3E7C59]/20 transition-all">
          Ver opciones de café
        </div>
      </Link>

      <Link 
        href="/app/reposteria"
        className="flex flex-col items-center justify-center px-8 py-10 text-center bg-white/5 hover:bg-white/10 transition-all group"
      >
        <div className="group-hover:scale-105 transition-transform duration-500">
          <span className="text-2xl font-semibold text-[var(--foreground)]">
            Dulce Tradicion
          </span>
          <p className="mt-4 text-xs tracking-[0.25em] text-[var(--foreground)]/70 font-medium">
            REPOSTERÍA
          </p>
        </div>
        <p className="mt-6 text-sm text-[var(--foreground)]/80 max-w-xs group-hover:text-[var(--foreground)] transition-colors">
          Pasteles, galletas y postres artesanales recién horneados.
        </p>
        <div className="mt-8 px-8 py-3 rounded-full border border-[#3E7C59] text-[#3E7C59] text-sm font-semibold group-hover:bg-[#3E7C59] group-hover:text-white transition-all">
          Ver opciones de repostería
        </div>
      </Link>
    </div>
  );
}
