'use client'

import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { Icon } from '@iconify/react'
import Profile from './Profile'
import Notifications from './Notifications'
import SidebarLayout from '../sidebar/Sidebar'
import FullLogo from '../shared/logo/FullLogo'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetTitle } from '@/components/ui/sheet'
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

const Header = () => {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMode = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'))
  }

  return (
    <>
      {/* ── Branded Top Bar ── */}
      <header
        className={`sticky top-0 z-30 transition-shadow duration-200 ${
          isScrolled ? 'shadow-lg' : 'shadow-sm'
        }`}
        style={{ backgroundColor: '#1E3A5F' }}
      >
        {/* Thin accent stripe */}
        <div className="h-0.5 w-full" style={{ background: 'linear-gradient(90deg, #D4A017 0%, #C8541A 50%, #4A7C3F 100%)' }} />

        <nav className="flex items-center justify-between px-5 py-2.5">

          {/* ── LEFT: Mobile menu + Logo (mobile only) ── */}
          <div className="flex items-center gap-3 xl:hidden">
            <button
              onClick={() => setIsOpen(true)}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <Icon icon="tabler:menu-2" height={20} />
            </button>
            <FullLogo />
          </div>

          {/* ── LEFT: Search bar (desktop) ── */}
          <div className="hidden xl:flex items-center gap-3 flex-1 max-w-xs">
            <div className="relative w-full">
              <Icon
                icon="solar:magnifer-linear"
                width={16}
                height={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50"
              />
              <input
                type="text"
                placeholder="Buscar en el sistema..."
                className="w-full rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/40 outline-none focus:ring-2 focus:ring-white/20 transition-all"
                style={{ backgroundColor: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)' }}
              />
            </div>
          </div>

          {/* ── CENTER: Brand label (desktop only) ── */}
          <div className="hidden xl:flex items-center gap-2 absolute left-1/2 -translate-x-1/2">
            <span className="text-xs font-medium text-white/40 uppercase tracking-widest">Sistema de Gestión</span>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-xs font-bold text-white/70 tracking-wide">Haladás Taller Creativo</span>
          </div>

          {/* ── RIGHT: Actions ── */}
          <div className="flex items-center gap-1">

            {/* Dark / Light toggle */}
            <button
              onClick={toggleMode}
              className="w-9 h-9 rounded-xl flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title={theme === 'light' ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
            >
              {theme === 'light' ? (
                <Icon icon="tabler:moon" width={18} />
              ) : (
                <Icon icon="solar:sun-bold-duotone" width={18} />
              )}
            </button>

            {/* Notifications — wrapped to adapt icon color */}
            <div className="[&_button]:text-white/70 [&_button:hover]:text-white [&_button:hover]:bg-white/10 [&_button]:rounded-xl [&_button]:transition-colors">
              <Notifications />
            </div>

            {/* Divider */}
            <div className="w-px h-6 mx-1" style={{ backgroundColor: 'rgba(255,255,255,0.15)' }} />

            {/* Profile */}
            <div className="[&_button]:ring-2 [&_button]:ring-white/20 [&_button:hover]:ring-white/40 [&_button]:transition-all">
              <Profile />
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <VisuallyHidden>
            <SheetTitle>sidebar</SheetTitle>
          </VisuallyHidden>
          <SidebarLayout onClose={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
    </>
  )
}

export default Header
