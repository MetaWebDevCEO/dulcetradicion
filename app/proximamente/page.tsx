export default function Proximamente() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <main className="w-full max-w-md px-6 py-10 text-center">
        <div className="mb-8 flex flex-col items-center">
          <span className="text-2xl font-semibold text-[var(--foreground)]">
            Dulce Tradicion
          </span>
          <p className="mt-5 text-xs tracking-[0.25em] text-[var(--foreground)]/70">
            REPOSTERÍA & CAFÉ
          </p>
        </div>

        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.25em] text-[var(--foreground)]/70">
            Proximamente
          </p>
          <h1 className="text-2xl font-semibold text-[var(--foreground)]">
            Dulce Tradicion Reposteria Y Cafe
          </h1>
          <p className="text-sm text-[var(--foreground)]/80">
            Estamos preparando una experiencia dulce para ti. Muy pronto podrás
            ordenar tus postres y café favoritos.
          </p>
        </div>
      </main>
    </div>
  );
}

