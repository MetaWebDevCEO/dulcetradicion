import AppShell from "../components/AppShell";

export default function AppPage() {
  return (
    <AppShell>
      <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <section className="flex flex-col items-center justify-center px-8 py-10 text-center border-b md:border-b-0 md:border-r border-[var(--foreground)]/10">
          <div>
            <span className="text-2xl font-semibold text-[var(--foreground)]">
              Dulce Tradicion
            </span>
            <p className="mt-4 text-xs tracking-[0.25em] text-[var(--foreground)]/70">
              CAFÉ
            </p>
          </div>
          <p className="mt-6 text-sm text-[var(--foreground)]/80 max-w-xs">
            Espresso, capuchino, latte y más para acompañar tus momentos.
          </p>
          <button className="mt-6 px-6 py-3 rounded-full bg-[#3E7C59] text-white text-sm font-semibold shadow-sm hover:opacity-90 transition">
            Ver opciones de café
          </button>
        </section>

        <section className="flex flex-col items-center justify-center px-8 py-10 text-center">
          <div>
            <span className="text-2xl font-semibold text-[var(--foreground)]">
              Dulce Tradicion
            </span>
            <p className="mt-4 text-xs tracking-[0.25em] text-[var(--foreground)]/70">
              REPOSTERÍA
            </p>
          </div>
          <p className="mt-6 text-sm text-[var(--foreground)]/80 max-w-xs">
            Pasteles, galletas y postres artesanales recién horneados.
          </p>
          <button className="mt-6 px-6 py-3 rounded-full border border-[#3E7C59] text-[#3E7C59] text-sm font-semibold hover:bg-[#3E7C59]/5 transition">
            Ver opciones de repostería
          </button>
        </section>
      </div>
    </AppShell>
  );
}
