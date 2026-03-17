"use client";

import { useState } from "react";
import { useCart } from "@/lib/CartContext";
import { Plus, Coffee, Sandwich, IceCream, ShoppingCart, Trash2, X, Minus, Loader2, Check } from "lucide-react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const CATEGORIES = [
  { id: "todos", label: "Todos", icon: Coffee },
  { id: "bebidas", label: "Bebidas", icon: Coffee },
  { id: "comida", label: "Baguettes & Más", icon: Sandwich },
  { id: "frappes", label: "Frappés", icon: IceCream },
];

const MENU_ITEMS = [
  {
    id: 1,
    name: "Baguette Clásico",
    description: "Mayonesa, queso crema, jamón, queso manchego y vegetales.",
    price: 100,
    category: "comida",
    image: "https://images.unsplash.com/photo-1528736235302-52922df5c122?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 2,
    name: "Baguette Italiano",
    description: "Mayonesa, queso crema, jamón, queso manchego, jamón serrano, salami, lomo embuchado y vegetales.",
    price: 130,
    category: "comida",
    image: "https://images.unsplash.com/photo-1619881589316-56c7f9e6b587?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 3,
    name: "Moka",
    description: "Delicioso café expreso con chocolate y leche espumada.",
    price: 85,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 4,
    name: "Frappé Taro",
    description: "Frappé dulce y cremoso sin café, sabor taro.",
    price: 115,
    category: "frappes",
    image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&w=500&q=60"
  },
  {
    id: 5,
    name: "Capuchino",
    description: "250ml de clásico capuchino con leche espumada.",
    price: 50,
    category: "bebidas",
    image: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=500&q=60"
  }
];

export default function CafeDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("todos");
  const { cart, addToCart, updateQuantity, removeFromCart, totalItems, clearCart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const filteredItems = activeCategory === "todos" 
    ? MENU_ITEMS 
    : MENU_ITEMS.filter(item => item.category === activeCategory);

  const handleAddToCart = (product: typeof MENU_ITEMS[0]) => {
    addToCart({
      id: product.id,
      nombre: product.name,
      precio: product.price,
      imagen: product.image,
      cantidad: 1
    });
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      setTimeout(() => {
        clearCart();
        setCheckoutSuccess(false);
        setIsCartOpen(false);
      }, 2000);
    }, 1500);
  };

  const totalCartValue = cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  return (
    <div className="min-h-screen bg-gray-50 flex overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 flex flex-col h-screen transition-all duration-300">
        <Navbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className="flex flex-1 overflow-hidden relative">
          <main className={`flex-1 p-4 md:p-8 overflow-y-auto transition-all duration-300 ${isCartOpen ? 'lg:mr-[380px]' : ''}`}>
            
            <div className="mb-8 flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">¡Hola! ¿Qué se te antoja hoy?</h1>
                <p className="text-gray-500 mt-2">Crea un nuevo pedido seleccionando los productos abajo.</p>
              </div>
              
              {!isCartOpen && (
                <button 
                  onClick={() => setIsCartOpen(true)}
                  className="relative p-3.5 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all border border-gray-200 text-gray-700 hover:text-[var(--foreground)] group"
                >
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold min-w-[24px] h-6 flex items-center justify-center rounded-full px-1.5 border-2 border-white">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}
            </div>

            <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full whitespace-nowrap font-medium text-sm transition-all ${
                      isActive 
                        ? "bg-[var(--foreground)] text-white shadow-md shadow-[var(--foreground)]/20" 
                        : "bg-white text-gray-600 border border-gray-200 hover:border-[var(--foreground)]/30 hover:bg-gray-50"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    {cat.label}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-24">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-[var(--foreground)]/5 transition-all duration-300 flex flex-col group"
                >
                  <div className="h-52 bg-gray-100 relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full text-sm font-bold text-gray-900 shadow-sm">
                      ${item.price}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1.5">{item.name}</h3>
                    <p className="text-sm text-gray-500 line-clamp-2 flex-1 mb-5 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <button 
                      onClick={() => handleAddToCart(item)}
                      className="w-full flex items-center justify-center gap-2 bg-gray-50 hover:bg-[var(--foreground)] text-[var(--foreground)] hover:text-white border border-gray-200 hover:border-transparent py-3 rounded-2xl font-semibold transition-all duration-300 active:scale-[0.98]"
                    >
                      <Plus className="w-5 h-5" />
                      Agregar al pedido
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </main>

          <div 
            className={`fixed lg:absolute top-0 right-0 h-full w-full sm:w-[380px] bg-white shadow-2xl border-l border-gray-100 transform transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) z-30 flex flex-col ${
              isCartOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
              <div className="flex items-center gap-3 text-gray-900">
                <div className="p-2.5 bg-[var(--foreground)]/10 rounded-xl text-[var(--foreground)]">
                  <ShoppingCart className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="font-bold text-lg">Tu Pedido</h2>
                  <p className="text-xs text-gray-500 font-medium">{totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}</p>
                </div>
              </div>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 bg-gray-50/50">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-300 mb-2">
                    <ShoppingCart className="w-10 h-10" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">Aún no hay productos</h3>
                  <p className="text-sm text-gray-500 max-w-[200px]">Explora el menú y agrega tus platillos favoritos aquí.</p>
                </div>
              ) : (
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex gap-4 bg-white border border-gray-100 p-3 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                        <img src={item.imagen} alt={item.nombre} className="w-full h-full object-cover" />
                      </div>
                      
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div className="flex justify-between items-start gap-2">
                          <p className="text-sm font-bold text-gray-900 leading-tight">{item.nombre}</p>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-300 hover:text-red-500 transition-colors shrink-0"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex justify-between items-center mt-2">
                          <span className="text-sm font-bold text-[var(--foreground)]">
                            ${item.precio * item.cantidad}
                          </span>
                          
                          <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-gray-500 transition-all"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-bold text-gray-900 w-3 text-center">
                              {item.cantidad}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white hover:shadow-sm text-gray-500 transition-all"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-white shadow-[0_-10px_40px_rgba(0,0,0,0.03)] z-10">
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>Subtotal</span>
                    <span>${totalCartValue}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-100 flex justify-between items-center">
                    <span className="text-gray-900 font-bold">Total a pagar</span>
                    <span className="text-2xl font-black text-gray-900">${(totalCartValue).toFixed(2)}</span>
                  </div>
                </div>
                
                <button 
                  onClick={handleCheckout}
                  disabled={isCheckingOut || checkoutSuccess}
                  className={`w-full text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98] flex items-center justify-center gap-2 ${
                    checkoutSuccess 
                      ? 'bg-green-500 hover:bg-green-600 shadow-green-500/25' 
                      : 'bg-[var(--foreground)] hover:bg-[#315f45] shadow-[var(--foreground)]/25'
                  } disabled:opacity-80 disabled:cursor-not-allowed`}
                >
                  {isCheckingOut ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Procesando...
                    </>
                  ) : checkoutSuccess ? (
                    <>
                      <Check className="w-5 h-5" />
                      ¡Pedido Confirmado!
                    </>
                  ) : (
                    <>
                      Continuar al pago
                      <Plus className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>

          {isCartOpen && (
            <div 
              className="lg:hidden fixed inset-0 bg-gray-900/40 z-20 backdrop-blur-sm transition-opacity"
              onClick={() => setIsCartOpen(false)}
            />
          )}

        </div>
      </div>
    </div>
  );
}