"use client";

import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { ChevronDown, ChevronRight } from "lucide-react";

type MenuSection = "Bebidas" | "Comida" | "Postres" | "Otros";

type AllTables =
  | "coffee" | "frappes_con_cafe" | "frappes_sin_cafe" | "bebidas_calientes"
  | "bebidas_frias" | "smoothies" | "malteadas" | "licuados" | "jugos" | "otros_bebidas"
  | "baguettes" | "molletes" | "croissants" | "sandwiches" | "ensaladas" | "antojitos";

type RowData = {
  id: string | number;
  nombre: string;
  descripcion: string;
  precio: number | string;
  imagen: string;
};

const PDF_FULL_DATA: Record<AllTables, RowData[]> = {
  coffee: [
    { id: "c1", nombre: "Americano", descripcion: "Café de grano recién molido con agua caliente, ideal para apreciar el aroma.", precio: 40, imagen: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000" },
    { id: "c2", nombre: "Espresso", descripcion: "Extracción intensa y pura de café con cuerpo robusto y aroma penetrante.", precio: 30, imagen: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=1000" },
    { id: "c3", nombre: "Macchiato", descripcion: "Espresso fuerte cortado con una pequeña mancha de espuma de leche caliente.", precio: 35, imagen: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=1000" },
    { id: "c4", nombre: "Capuchino", descripcion: "Perfecto equilibrio entre espresso, leche vaporizada y una densa capa de espuma.", precio: 50, imagen: "https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1000" },
    { id: "c5", nombre: "Moka", descripcion: "Deliciosa mezcla de espresso, chocolate artesanal y leche cremosa vaporizada.", precio: 85, imagen: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=1000" }
  ],
  frappes_con_cafe: [
    { id: "fc1", nombre: "Frappé Clásico", descripcion: "Café selecto granizado con leche y un toque de jarabe natural.", precio: 85, imagen: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000" },
    { id: "fc2", nombre: "Frappé Moka", descripcion: "Mezcla helada de café con chocolate premium y topping de crema batida.", precio: 95, imagen: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000" },
    { id: "fc3", nombre: "Frappé Cajeta", descripcion: "Café frío batido con dulce de leche tradicional, hielo y canela.", precio: 95, imagen: "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?q=80&w=1000" }
  ],
  frappes_sin_cafe: [
    { id: "fs1", nombre: "Frappé Taro", descripcion: "Bebida granizada dulce y cremosa con el sabor exótico y color único del taro.", precio: 115, imagen: "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=1000" },
    { id: "fs2", nombre: "Frappé Matcha", descripcion: "Té verde japonés premium granizado con leche para un sabor refrescante.", precio: 105, imagen: "https://images.unsplash.com/photo-1536304958333-ad6d89eb50b4?q=80&w=1000" },
    { id: "fs3", nombre: "Frappé Oreo", descripcion: "Base cremosa granizada con trozos reales de galleta de chocolate y crema.", precio: 95, imagen: "https://images.unsplash.com/photo-1472555950005-7ab43f90157e?q=80&w=1000" }
  ],
  bebidas_calientes: [
    { id: "bc1", nombre: "Chocolate", descripcion: "Chocolate artesanal caliente preparado tradicionalmente con leche cremosa.", precio: 55, imagen: "https://images.unsplash.com/photo-1544787210-2213d84ad960?q=80&w=1000" },
    { id: "bc2", nombre: "Té Infusión", descripcion: "Variedad de tés frutales o herbales naturales servidos a temperatura perfecta.", precio: 40, imagen: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=1000" },
    { id: "bc3", nombre: "Chai Latte", descripcion: "Té negro infusionado con especias exóticas aromáticas y leche espumosa.", precio: 75, imagen: "https://images.unsplash.com/photo-1551046710-233f53fd6a39?q=80&w=1000" },
    { id: "bc4", nombre: "Chai Latte Sugar Free", descripcion: "Versión ligera del té especiado sin azúcar añadida y el mismo sabor intenso.", precio: 100, imagen: "https://images.unsplash.com/photo-1541167760496-162955ed8a9f?q=80&w=1000" },
    { id: "bc5", nombre: "Taro Latte", descripcion: "Deliciosa infusión de taro caliente con leche espumada y textura aterciopelada.", precio: 85, imagen: "https://images.unsplash.com/photo-1557142046-c704a3adf364?q=80&w=1000" }
  ],
  bebidas_frias: [
    { id: "bf1", nombre: "Tisana Fría", descripcion: "Infusión refrescante de frutos rojos y flores deshidratadas con mucho hielo.", precio: 65, imagen: "https://images.unsplash.com/photo-1556679343-c704a3adf364?q=80&w=1000" },
    { id: "bf2", nombre: "Soda Italiana", descripcion: "Combinación vibrante de agua mineral con jarabe de fruta natural a elegir.", precio: 60, imagen: "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=1000" },
    { id: "bf3", nombre: "Té Helado", descripcion: "Té negro o verde recién infusionado, servido frío con rodajas de limón.", precio: 45, imagen: "https://images.unsplash.com/photo-1499961024600-ad094db305cc?q=80&w=1000" }
  ],
  smoothies: [
    { id: "sm1", nombre: "Smoothie Fresa", descripcion: "Batido espeso y nutritivo elaborado con fresas naturales de temporada.", precio: 80, imagen: "https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=1000" },
    { id: "sm2", nombre: "Smoothie Mango", descripcion: "Refrescante pulpa de mango natural batida con hielo para una textura suave.", precio: 80, imagen: "https://images.unsplash.com/photo-1526424382096-74a93e105682?q=80&w=1000" }
  ],
  malteadas: [
    { id: "ml1", nombre: "Malteada Vainilla", descripcion: "Batido clásico y cremoso de helado de vainilla gourmet con leche fría.", precio: 85, imagen: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000" },
    { id: "ml2", nombre: "Malteada Fresa", descripcion: "Cremoso helado de fresa batido con leche hasta lograr dulzura perfecta.", precio: 85, imagen: "https://images.unsplash.com/photo-1472555950005-7ab43f90157e?q=80&w=1000" }
  ],
  licuados: [
    { id: "lc1", nombre: "Licuado Plátano", descripcion: "Plátano natural batido con leche fresca y un toque de canela molida.", precio: 65, imagen: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=1000" },
    { id: "lc2", nombre: "Licuado Chocomilk", descripcion: "Bebida tradicional de chocolate con leche fría, ideal para cualquier hora.", precio: 60, imagen: "https://images.unsplash.com/photo-1541658016709-8273f5d3b140?q=80&w=1000" }
  ],
  jugos: [
    { id: "jg1", nombre: "Jugo de Naranja", descripcion: "Naranjas dulces seleccionadas, exprimidas al momento de tu pedido.", precio: 50, imagen: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=1000" },
    { id: "jg2", nombre: "Jugo Verde", descripcion: "Mezcla saludable de piña, apio, nopal, perejil y jugo de naranja natural.", precio: 65, imagen: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=1000" }
  ],
  otros_bebidas: [
    { id: "ob1", nombre: "Agua Embotellada", descripcion: "Presentación de 600ml de agua purificada o mineral muy fría.", precio: 25, imagen: "https://images.unsplash.com/photo-1544145945-f904253d0c71?q=80&w=1000" },
    { id: "ob2", nombre: "Refrescos", descripcion: "Variedad de refrescos clásicos de la familia Coca-Cola en lata o botella.", precio: 35, imagen: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=1000" }
  ],
  baguettes: [
    { id: "b1", nombre: "Clásico", descripcion: "Mayonesa, queso crema, jamón de pierna, queso manchego y vegetales frescos.", precio: 100, imagen: "https://images.unsplash.com/photo-1585238341267-1cfec2046a55?q=80&w=1000" },
    { id: "b2", nombre: "Italiano", descripcion: "Mayonesa, queso crema, jamón, manchego, jamón serrano, salami y lomo.", precio: 130, imagen: "https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?q=80&w=1000" },
    { id: "b3", nombre: "Vegetales", descripcion: "Mezcla de quesos con lechuga, espinaca, zanahoria, pepino, jitomate y aguacate.", precio: 120, imagen: "https://images.unsplash.com/photo-1550507992-063ef859424e?q=80&w=1000" }
  ],
  molletes: [
    { id: "m1", nombre: "Sencillo", descripcion: "Frijoles refritos con chorizo, abundante queso gratinado y pico de gallo.", precio: 100, imagen: "https://images.unsplash.com/photo-1626245910392-5859f47833fa?q=80&w=1000" },
    { id: "m2", nombre: "Pamplona", descripcion: "Frijol con chorizo, queso gratinado, chorizo pamplona y salsa bandera.", precio: 120, imagen: "https://images.unsplash.com/photo-1626245910392-5859f47833fa?q=80&w=1000" },
    { id: "m3", nombre: "Conchallete", descripcion: "Pieza de concha dulce con frijoles, queso gratinado y pico de gallo.", precio: 95, imagen: "https://images.unsplash.com/photo-1626245910392-5859f47833fa?q=80&w=1000" }
  ],
  croissants: [
    { id: "cr1", nombre: "Jamón y Queso", descripcion: "Pan hojaldrado de mantequilla relleno de jamón de pierna y queso derretido.", precio: 85, imagen: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1000" },
    { id: "cr2", nombre: "Especial", descripcion: "Croissant preparado con queso crema, jamón seleccionado y vegetales del día.", precio: 95, imagen: "https://images.unsplash.com/photo-1530610476181-d83430b64dcd?q=80&w=1000" }
  ],
  sandwiches: [
    { id: "s1", nombre: "Club Sandwich", descripcion: "Pollo a la plancha, jamón, tocino crujiente, queso y vegetales en tres niveles.", precio: 190, imagen: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000" },
    { id: "s2", nombre: "Sandwich de Pavo", descripcion: "Pechuga de pavo fina, queso fresco, aguacate y vegetales en pan integral.", precio: 130, imagen: "https://images.unsplash.com/photo-1550507992-ed63c39d51ad?q=80&w=1000" },
    { id: "s3", nombre: "Sandwich de Pollo", descripcion: "Pollo deshebrado sazonado, queso manchego, aguacate y vegetales frescos.", precio: 120, imagen: "https://images.unsplash.com/photo-1567234665766-49ad99d58be3?q=80&w=1000" }
  ],
  ensaladas: [
    { id: "e1", nombre: "Ensalada DT", descripcion: "Mix de lechugas, pepino, zanahoria, tomate, queso fresco, jamón y vinagreta.", precio: 120, imagen: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1000" },
    { id: "e2", nombre: "Ensalada Pasta", descripcion: "Mix lechugas, pasta fusilli con mix de lechugas, tomate cherry, aceitunas y queso fresco.", precio: 150, imagen: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1000" }
  ],
  antojitos: [
    { id: "a1", nombre: "Chilaquiles Sencillos", descripcion: "Totopos crujientes bañados en salsa de la casa (roja o verde), crema y queso.", precio: 100, imagen: "https://images.unsplash.com/photo-1582234372722-50d7ccc30ebd?q=80&w=1000" },
    { id: "a2", nombre: "Entomatadas (4 pzas)", descripcion: "Tortillas rellenas acompañadas con frijoles refritos, crema, queso y cebolla.", precio: 70, imagen: "https://images.unsplash.com/photo-1611599537845-1c7aca0091c0?q=80&w=1000" },
    { id: "a3", nombre: "Enmoladas Rellenas", descripcion: "Rellenas de pollo o huevo, bañadas en mole artesanal con crema y queso.", precio: 150, imagen: "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?q=80&w=1000" }
  ]
};

export default function CafeMenuPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<MenuSection>("Bebidas");
  const [isBebidasOpen, setIsBebidasOpen] = useState(true);
  const [isComidaOpen, setIsComidaOpen] = useState(false);
  const [activeTable, setActiveTable] = useState<AllTables>("coffee");

  const bebidasTables = [
    { table: "coffee", label: "Café" },
    { table: "frappes_con_cafe", label: "Frappés con Café" },
    { table: "frappes_sin_cafe", label: "Frappés sin Café" },
    { table: "bebidas_calientes", label: "Bebidas Calientes" },
    { table: "bebidas_frias", label: "Bebidas Frías" },
    { table: "smoothies", label: "Smoothies" },
    { table: "malteadas", label: "Malteadas" },
    { table: "licuados", label: "Licuados" },
    { table: "jugos", label: "Jugos" },
    { table: "otros_bebidas", label: "Otras Bebidas" },
  ] as const;

  const comidaTables = [
    { table: "baguettes", label: "Baguettes" },
    { table: "molletes", label: "Molletes" },
    { table: "croissants", label: "Croissants" },
    { table: "sandwiches", label: "Sandwiches" },
    { table: "ensaladas", label: "Ensaladas" },
    { table: "antojitos", label: "Antojitos" },
  ] as const;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 flex flex-col md:flex-row">
          <aside className="w-full md:w-64 shrink-0 bg-white border-r border-gray-100 md:sticky md:top-16 md:h-[calc(100vh-64px)] overflow-y-auto p-4 text-[var(--foreground)]">
            <h3 className="px-4 text-xs font-bold text-gray-400 mb-4 uppercase tracking-widest">Categorías</h3>
            <nav className="space-y-2">
              <div>
                <button onClick={() => { setActiveSection("Bebidas"); setIsBebidasOpen(!isBebidasOpen); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${activeSection === "Bebidas" ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "text-gray-600 hover:bg-gray-50"}`}>
                  <span>Bebidas</span>
                  {isBebidasOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {isBebidasOpen && (
                  <div className="ml-4 mt-2 border-l-2 border-gray-100 space-y-1">
                    {bebidasTables.map(({ table, label }) => (
                      <button key={table} onClick={() => { setActiveTable(table as AllTables); setActiveSection("Bebidas"); }} className={`w-full text-left px-4 py-2 text-xs transition-colors ${activeTable === table ? "text-gray-900 font-black border-l-2 border-gray-900 -ml-[2px] bg-gray-50" : "text-gray-500 hover:text-gray-800"}`}>{label}</button>
                    ))}
                  </div>
                )}
              </div>
              <div>
                <button onClick={() => { setActiveSection("Comida"); setIsComidaOpen(!isComidaOpen); }} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold ${activeSection === "Comida" ? "bg-gray-900 text-white shadow-lg shadow-gray-200" : "text-gray-600 hover:bg-gray-50"}`}>
                  <span>Comida</span>
                  {isComidaOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                </button>
                {isComidaOpen && (
                  <div className="ml-4 mt-2 border-l-2 border-gray-100 space-y-1">
                    {comidaTables.map(({ table, label }) => (
                      <button key={table} onClick={() => { setActiveTable(table as AllTables); setActiveSection("Comida"); }} className={`w-full text-left px-4 py-2 text-xs transition-colors ${activeTable === table ? "text-gray-900 font-black border-l-2 border-gray-900 -ml-[2px] bg-gray-50" : "text-gray-500 hover:text-gray-800"}`}>{label}</button>
                    ))}
                  </div>
                )}
              </div>
            </nav>
          </aside>
          <section className="flex-1 p-4 md:p-8 overflow-y-auto bg-gray-50/30">
            <div className="max-w-6xl mx-auto space-y-8">
              <header className="bg-white border border-gray-100 rounded-3xl p-8 shadow-sm">
                <span className="text-xs font-black text-[var(--foreground)] uppercase tracking-[0.3em]">Carta Digital</span>
                <h1 className="text-4xl font-black text-gray-900 mt-2 capitalize">{activeTable.replace(/_/g, " ")}</h1>
              </header>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
                {PDF_FULL_DATA[activeTable].map((row, idx) => (
                  <div key={idx} className="bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
                    <div className="h-56 relative bg-gray-200 overflow-hidden">
                      <img 
                        src={row.imagen} 
                        alt={row.nombre} 
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-700"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000";
                        }}
                      />
                      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-2xl font-black text-gray-900 shadow-md border border-gray-100">
                        ${row.precio}.00
                      </div>
                    </div>
                    <div className="p-7">
                      <h4 className="text-xl font-black text-gray-900 uppercase tracking-tight">{row.nombre}</h4>
                      <p className="text-sm text-gray-500 mt-3 leading-relaxed min-h-[4rem]">{row.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}