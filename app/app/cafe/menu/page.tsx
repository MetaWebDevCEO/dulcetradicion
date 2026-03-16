"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { supabaseClient } from "@/lib/supabaseClient";
import { ChevronDown, ChevronRight, Plus, ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

type MenuSection = "Bebidas" | "Comida" | "Postres" | "Otros";

type BebidasTable =
  | "coffee"
  | "frappes_con_cafe"
  | "frappes_sin_cafe"
  | "bebidas_calientes"
  | "bebidas_frias"
  | "smoothies"
  | "malteadas"
  | "licuados"
  | "jugos"
  | "otros_bebidas";

type BebidasState = Record<
  BebidasTable,
  { loading: boolean; error: string | null; rows: Record<string, unknown>[] }
>;

export default function CafeMenuPage() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<MenuSection>("Bebidas");
  const [isBebidasOpen, setIsBebidasOpen] = useState(true);
  const [activeBebidasTable, setActiveBebidasTable] = useState<BebidasTable>("coffee");
  const [orderCount, setOrderCount] = useState(0);
  const hasLoadedBebidas = useRef(false);

  const [bebidasState, setBebidasState] = useState<BebidasState>(() => ({
    coffee: { loading: false, error: null, rows: [] },
    frappes_con_cafe: { loading: false, error: null, rows: [] },
    frappes_sin_cafe: { loading: false, error: null, rows: [] },
    bebidas_calientes: { loading: false, error: null, rows: [] },
    bebidas_frias: { loading: false, error: null, rows: [] },
    smoothies: { loading: false, error: null, rows: [] },
    malteadas: { loading: false, error: null, rows: [] },
    licuados: { loading: false, error: null, rows: [] },
    jugos: { loading: false, error: null, rows: [] },
    otros_bebidas: { loading: false, error: null, rows: [] },
  }));

  const sections = useMemo<MenuSection[]>(
    () => ["Bebidas", "Comida", "Postres", "Otros"],
    [],
  );

  const bebidasTables = useMemo(
    () =>
      [
        { table: "coffee", label: "Coffee" },
        { table: "frappes_con_cafe", label: "Frappés con café" },
        { table: "frappes_sin_cafe", label: "Frappés sin café" },
        { table: "bebidas_calientes", label: "Bebidas calientes" },
        { table: "bebidas_frias", label: "Bebidas frías" },
        { table: "smoothies", label: "Smoothies" },
        { table: "malteadas", label: "Malteadas" },
        { table: "licuados", label: "Licuados" },
        { table: "jugos", label: "Jugos" },
        { table: "otros_bebidas", label: "Otros" },
      ] as const satisfies ReadonlyArray<{ table: BebidasTable; label: string }>,
    [],
  );

  useEffect(() => {
    if (activeSection !== "Bebidas") {
      return;
    }

    if (hasLoadedBebidas.current) {
      return;
    }

    hasLoadedBebidas.current = true;

    let isCancelled = false;

    const loadBebidas = async () => {
      setBebidasState((prev) => {
        const next = { ...prev };
        for (const { table } of bebidasTables) {
          next[table] = { ...next[table], loading: true, error: null };
        }
        return next;
      });

      await Promise.all(
        bebidasTables.map(async ({ table }) => {
          const { data, error } = await supabaseClient.from(table).select("*").limit(250);

          if (isCancelled) {
            return;
          }

          setBebidasState((prev) => ({
            ...prev,
            [table]: {
              loading: false,
              error: error?.message ?? null,
              rows: (data as Record<string, unknown>[] | null) ?? [],
            },
          }));
        }),
      );
    };

    loadBebidas();

    return () => {
      isCancelled = true;
    };
  }, [activeSection, bebidasTables]);

  const currency = useMemo(
    () => new Intl.NumberFormat("es-MX", { style: "currency", currency: "MXN" }),
    [],
  );

  const getRowTitle = (row: Record<string, unknown>) => {
    const candidates = [
      row.nombre,
      row.name,
      row.producto,
      row.titulo,
      row.title,
      row.item,
      row.descripcion,
      row.description,
    ];
    const found = candidates.find((value) => typeof value === "string" && value.trim().length > 0);
    if (typeof found === "string") {
      return found;
    }
    if (typeof row.id === "number" || typeof row.id === "string") {
      return `#${row.id}`;
    }
    return "Producto";
  };

  const getRowDescription = (row: Record<string, unknown>) => {
    const candidates = [row.descripcion, row.description, row.detalle, row.detalles];
    const found = candidates.find((value) => typeof value === "string" && value.trim().length > 0);
    return typeof found === "string" ? found : null;
  };

  const getRowPrice = (row: Record<string, unknown>) => {
    const candidates = [row.precio, row.price, row.costo, row.valor, row.total];
    const found = candidates.find(
      (value) => typeof value === "number" || (typeof value === "string" && value.trim().length > 0),
    );
    if (typeof found === "number") {
      return currency.format(found);
    }
    if (typeof found === "string") {
      const numeric = Number(found);
      if (Number.isFinite(numeric)) {
        return currency.format(numeric);
      }
      return found;
    }
    return null;
  };

  const activeBebidasMeta = useMemo(
    () => bebidasTables.find(({ table }) => table === activeBebidasTable),
    [bebidasTables, activeBebidasTable],
  );

  const activeBebidasState = bebidasState[activeBebidasTable];

  const handleSectionClick = (section: MenuSection) => {
    if (section === "Bebidas") {
      setActiveSection("Bebidas");
      setIsBebidasOpen((prev) => !prev);
      return;
    }

    setIsBebidasOpen(false);
    setActiveSection(section);
  };

  const scrollToBebidaTable = (table: BebidasTable) => {
    setActiveSection("Bebidas");
    setIsBebidasOpen(true);
    setActiveBebidasTable(table);

    requestAnimationFrame(() => {
      const target = document.getElementById(`bebidas-${table}`);
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  const handleOrder = () => {
    router.push("/app/cafe");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <main className="flex-1 animate-in fade-in duration-500 flex">
          <aside className="w-full md:w-64 shrink-0 bg-white border-b border-gray-100 md:border-b-0 md:border-r md:border-gray-100 md:sticky md:top-16 md:self-start">
            <div className="p-4">
              <h3 className="px-4 text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wider">
                Categorías
              </h3>
              <nav className="space-y-1">
                {sections.map((section) => {
                  const isActive = section === activeSection;
                  const isBebidas = section === "Bebidas";
                  return (
                    <div key={section}>
                      <button
                        type="button"
                        onClick={() => handleSectionClick(section)}
                        className={[
                          "w-full flex items-center justify-between px-4 py-2.5 rounded-lg group transition-colors text-left",
                          isActive
                            ? "bg-gray-900 text-white"
                            : "text-gray-600 hover:bg-gray-50",
                        ].join(" ")}
                      >
                        <span className="font-medium text-sm">{section}</span>
                        {isBebidas ? (
                          isBebidasOpen ? (
                            <ChevronDown className={["w-4 h-4", isActive ? "text-white" : "text-gray-400"].join(" ")} />
                          ) : (
                            <ChevronRight
                              className={["w-4 h-4", isActive ? "text-white" : "text-gray-400"].join(" ")}
                            />
                          )
                        ) : null}
                      </button>

                      {isBebidas && isBebidasOpen ? (
                        <div className="mt-1 ml-2 pl-2 border-l border-gray-100">
                          <div className="space-y-1 py-1">
                            {bebidasTables.map(({ table, label }) => (
                              <button
                                key={table}
                                type="button"
                                onClick={() => scrollToBebidaTable(table)}
                                className="w-full flex items-center justify-between px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors text-left"
                              >
                                <span className="font-medium">{label}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </nav>
            </div>
          </aside>

          <section className="flex-1 p-4 md:p-6 min-w-0">
            {activeSection === "Bebidas" ? (
              <div className="max-w-5xl mx-auto w-full space-y-4 md:space-y-6">
                <div className="bg-white border border-gray-100 rounded-2xl px-5 md:px-6 py-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="min-w-0">
                      <p className="text-[10px] tracking-[0.25em] text-gray-400 font-semibold uppercase">
                        Cafetería
                      </p>
                      <h1 className="mt-1 text-xl md:text-2xl font-semibold text-gray-900">Menú de bebidas</h1>
                      <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-gray-900 text-white text-xs font-semibold px-3 py-1">
                          {activeBebidasMeta?.label ?? "Bebidas"}
                        </span>
                        <span className="inline-flex items-center rounded-full border border-gray-200 bg-white text-xs font-medium text-gray-600 px-3 py-1">
                          {activeBebidasState.loading ? "Cargando..." : `${activeBebidasState.rows.length} productos`}
                        </span>
                        {activeBebidasState.error ? (
                          <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 text-xs font-medium text-red-700 px-3 py-1">
                            Error al cargar
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-2">
                        <span className="text-xs font-medium text-gray-600">Productos:</span>
                        <span className="text-xs font-semibold text-gray-900">{orderCount}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleOrder}
                        disabled={orderCount === 0}
                        className={[
                          "inline-flex items-center gap-2 rounded-xl text-sm font-semibold px-4 py-2 transition-colors",
                          orderCount === 0
                            ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                            : "bg-green-700 text-white hover:bg-green-800 shadow-sm shadow-green-700/20",
                        ].join(" ")}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Ordenar
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  id={`bebidas-${activeBebidasTable}`}
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden scroll-mt-24"
                >
                  <div className="px-5 md:px-6 py-4 border-b border-gray-100 bg-gray-50 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h2 className="text-sm font-semibold text-gray-900 truncate">
                        {activeBebidasMeta?.label ?? activeBebidasTable}
                      </h2>
                      <p className="text-xs text-gray-400 mt-1">{activeBebidasTable}</p>
                    </div>
                    <span className="text-xs font-medium text-gray-500 whitespace-nowrap">
                      {activeBebidasState.loading ? "Cargando..." : `${activeBebidasState.rows.length} productos`}
                    </span>
                  </div>

                  <div className="p-3 sm:p-4 md:p-6">
                    {activeBebidasState.error ? (
                      <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {activeBebidasState.error}
                      </div>
                    ) : activeBebidasState.loading ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Array.from({ length: 8 }).map((_, index) => (
                          <div
                            key={index}
                            className="rounded-xl border border-gray-100 bg-white p-4 animate-pulse"
                          >
                            <div className="h-4 bg-gray-100 rounded w-2/3" />
                            <div className="mt-2 h-3 bg-gray-100 rounded w-full" />
                            <div className="mt-2 h-3 bg-gray-100 rounded w-4/5" />
                            <div className="mt-4 flex items-center justify-between">
                              <div className="h-5 bg-gray-100 rounded w-20" />
                              <div className="h-8 bg-gray-100 rounded w-24" />
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : activeBebidasState.rows.length === 0 ? (
                      <div className="rounded-xl border border-gray-100 bg-white px-4 py-3 text-sm text-gray-500">
                        Sin productos
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeBebidasState.rows.map((row, index) => {
                          const title = getRowTitle(row);
                          const description = getRowDescription(row);
                          const price = getRowPrice(row);

                          return (
                            <div
                              key={`${activeBebidasTable}-${index}`}
                              className="rounded-xl border border-gray-100 bg-white hover:border-gray-200 hover:shadow-sm transition-all p-4 flex flex-col gap-3"
                            >
                              <div className="min-w-0">
                                <p className="text-sm font-semibold text-gray-900 break-words">{title}</p>
                                {description ? (
                                  <p className="text-xs text-gray-500 mt-1 break-words line-clamp-2">
                                    {description}
                                  </p>
                                ) : null}
                              </div>
                              <div className="flex items-center justify-between gap-3">
                                <span className="text-sm font-semibold text-gray-900">
                                  {price ?? " "}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setOrderCount((prev) => prev + 1)}
                                  className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white text-gray-700 text-sm font-semibold px-3 py-2 hover:bg-gray-50 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                  Agregar
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-200 rounded-xl bg-white/50 min-h-[400px] p-6 flex flex-col justify-center">
                <h1 className="text-xl font-semibold text-gray-700">Menú</h1>
                <p className="text-gray-500 mt-2">Sección: {activeSection}</p>
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
