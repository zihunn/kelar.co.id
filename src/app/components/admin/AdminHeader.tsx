import { User, Eye, Menu } from 'lucide-react';
import { Link } from 'react-router';
import { ThemeLanguageToggle } from '../ThemeLanguageToggle';
import { useSidebar } from '../../context/SidebarContext';

export function AdminHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-white/5 backdrop-blur-xl border-b border-white/10 h-20 md:h-24 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors sticky top-0 z-30">
      {/* Left side - Hamburger for mobile, Title for desktop */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Toggle menu"
        >
          <Menu size={24} className="text-white" />
        </button>
        <h1 className="hidden lg:block text-2xl font-black text-white tracking-tighter">Panel Admin Kelar</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeLanguageToggle />
        
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white/10 text-white hover:bg-white/20 rounded-2xl transition-all border border-white/10 shadow-lg"
        >
          <Eye size={18} />
          <span className="text-sm font-bold uppercase tracking-widest">Lihat Website</span>
        </Link>

        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden p-3 bg-white/10 text-white border border-white/10 rounded-2xl shadow-lg"
          title="Lihat Website"
        >
          <Eye size={18} />
        </Link>
      </div>
    </header>
  );
}