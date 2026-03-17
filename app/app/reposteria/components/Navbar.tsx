"use client";

import React from 'react';
import { useEffect, useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  Bell, 
  Share2, 
  ChevronRight, 
  ChevronDown,
  ArrowLeft,
  ArrowRight,
  Menu
} from 'lucide-react';
import Link from 'next/link';
import { supabaseClient } from '@/lib/supabaseClient';
import { generateAvatar } from '@/lib/avatar';

interface NavbarProps {
  onMenuClick?: () => void;
}

export function Navbar({ onMenuClick }: NavbarProps) {
  const [avatarUrl, setAvatarUrl] = useState(() => generateAvatar({ seed: 'guest', size: 64 }));

  useEffect(() => {
    let isMounted = true;

    const loadUser = async () => {
      const { data } = await supabaseClient.auth.getUser();
      const user = data.user;

      if (!isMounted) {
        return;
      }

      if (!user) {
        setAvatarUrl(generateAvatar({ seed: 'guest', size: 64 }));
        return;
      }

      const currentAvatar = (user.user_metadata as { avatar_url?: string } | undefined)?.avatar_url;
      setAvatarUrl(
        currentAvatar ??
          generateAvatar({
            userId: user.id,
            username: user.email ?? 'user',
            size: 64,
          }),
      );
    };

    loadUser();

    const { data } = supabaseClient.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => {
      isMounted = false;
      data.subscription.unsubscribe();
    };
  }, []);

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-4 md:px-6 sticky top-0 z-10 w-full">
      <div className="flex items-center gap-3 md:gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 -ml-2 hover:bg-gray-100 rounded-lg transition-colors md:hidden text-gray-600"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden md:flex items-center gap-1 text-gray-400">
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-gray-100 rounded-md transition-colors">
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
        
        <nav className="flex items-center text-sm font-medium text-gray-500">
          <Link href="#" className="hover:text-gray-900 transition-colors hidden sm:inline-block">
            Dulce Tradicion
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400 hidden sm:inline-block" />
          <span className="text-gray-900 font-semibold sm:font-medium text-base sm:text-sm">
            Repostería
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2 sm:border-r sm:border-gray-200 sm:pr-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative group hidden sm:block">
            <HelpCircle className="w-5 h-5" />
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
              Ayuda
            </span>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative group hidden sm:block">
            <Mail className="w-5 h-5" />
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
              Mensajes
            </span>
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors relative group">
            <div className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </div>
            <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-20">
              Notificaciones
            </span>
          </button>
        </div>

        <button className="flex items-center gap-2 hover:bg-gray-50 py-1.5 px-2 rounded-lg transition-colors">
          <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden border border-gray-200 shrink-0">
             <img 
               src={avatarUrl} 
               alt="Usuario" 
               className="w-full h-full object-cover"
             />
          </div>
          <ChevronDown className="w-4 h-4 text-gray-400 hidden sm:block" />
        </button>

        <button className="hidden lg:flex items-center gap-2 bg-green-700 hover:bg-green-800 text-white text-sm font-medium py-2 px-4 rounded-lg transition-colors shadow-sm shadow-green-700/20">
          <span>Compartir</span>
          <Share2 className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
