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
        className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white backdrop-blur-md"
        title={theme === 'light' ? t('settings.darkMode') : t('settings.lightMode')}
      >
        {theme === 'light' ? (
          <Moon size={20} />
        ) : (
          <Sun size={20} />
        )}
      </button>

      {/* Language Selector */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setShowLanguageMenu(!showLanguageMenu)}
          className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 transition-all text-white flex items-center gap-2 backdrop-blur-md"
          title={t('settings.language')}
        >
          <Globe size={20} />
          <span className="text-sm font-bold uppercase tracking-wider">
            {language}
          </span>
        </button>

        {showLanguageMenu && (
          <div className="absolute right-0 mt-3 w-40 bg-[var(--background)] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/10 overflow-hidden z-50 backdrop-blur-xl">
            <button
              onClick={() => {
                setLanguage('id');
                setShowLanguageMenu(false);
              }}
              className={`w-full px-5 py-3 text-left hover:bg-white/10 transition-colors ${
                language === 'id' ? 'bg-white/10 font-bold' : ''
              }`}
            >
              <span className="text-sm text-white flex items-center gap-2">🇮🇩 <span className="opacity-80">Indonesia</span></span>
            </button>
            <button
              onClick={() => {
                setLanguage('en');
                setShowLanguageMenu(false);
              }}
              className={`w-full px-5 py-3 text-left hover:bg-white/10 transition-colors ${
                language === 'en' ? 'bg-white/10 font-bold' : ''
              }`}
            >
              <span className="text-sm text-white flex items-center gap-2">🇬🇧 <span className="opacity-80">English</span></span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
