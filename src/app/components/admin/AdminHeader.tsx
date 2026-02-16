import { User, Eye, Menu } from 'lucide-react';
import { Link } from 'react-router';
import { ThemeLanguageToggle } from '../ThemeLanguageToggle';
import { useSidebar } from '../../context/SidebarContext';

export function AdminHeader() {
  const { toggleSidebar } = useSidebar();

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Left side - Hamburger for mobile, Title for desktop */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Toggle menu"
        >
          <Menu size={24} className="text-gray-700 dark:text-gray-300" />
        </button>
        <h1 className="hidden lg:block text-lg sm:text-xl text-gray-800 dark:text-gray-200">Panel Admin Kelar</h1>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeLanguageToggle />
        
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-2 px-4 py-2 text-[var(--kelar-primary)] hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
        >
          <Eye size={18} />
          <span className="text-sm">Lihat Website</span>
        </Link>

        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          className="sm:hidden p-2 text-[var(--kelar-primary)] hover:bg-blue-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          title="Lihat Website"
        >
          <Eye size={18} />
        </Link>
      </div>
    </header>
  );
}