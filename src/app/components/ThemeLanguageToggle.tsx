import { Moon, Sun, Globe } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useState, useRef, useEffect } from 'react';

export function ThemeLanguageToggle() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="flex items-center gap-2">
      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        title={theme === 'light' ? t('settings.darkMode') : t('settings.lightMode')}
      >
        {theme === 'light' ? (
          <Moon size={20} className="text-gray-700 dark:text-gray-300" />
        ) : (
          <Sun size={20} className="text-gray-700 dark:text-gray-300" />
        )}
      </button>

      {/* Language Selector */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
          title={t('settings.language')}
        >
          <Globe size={20} className="text-gray-700 dark:text-gray-300" />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300 uppercase">
            {language}
          </span>
        </button>

        {showLanguageMenu && (
          <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden z-50">
            <button
              onClick={() => {
                setLanguage('id');
                setShowLanguageMenu(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                language === 'id' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">🇮🇩 Indonesia</span>
            </button>
            <button
              onClick={() => {
                setLanguage('en');
                setShowLanguageMenu(false);
              }}
              className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                language === 'en' ? 'bg-gray-100 dark:bg-gray-700' : ''
              }`}
            >
              <span className="text-sm text-gray-700 dark:text-gray-300">🇬🇧 English</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
