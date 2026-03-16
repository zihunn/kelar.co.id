import { Link, useLocation } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { ThemeLanguageToggle } from "./ThemeLanguageToggle";
import logoBlue from "@/image/kelar-blue.png";
import logoWhite from "@/image/kelar-white.png";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { aboutUs } = useData();
  const { t } = useLanguage();
  const { theme } = useTheme();
  const location = useLocation();

  const isHome = location.pathname === "/";
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    if (!isHome) {
      setActiveSection("");
      return;
    }

    const handleScroll = () => {
      const sections = ["home", "layanan", "about", "artikel", "contact"];
      const navbarElement = document.querySelector("nav");
      const navbarHeight = navbarElement?.offsetHeight || 96;
      const scrollPosition = window.scrollY + navbarHeight + 50; // Offset for navbar height + buffer

      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            current = section;
            break;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const getNavLink = (hash: string) => (isHome ? hash : `/${hash}`);

  const scrollToSection = (
    e: React.MouseEvent<HTMLAnchorElement>,
    hash: string,
  ) => {
    if (!isHome) return; // Allow default Link behavior to go back home

    e.preventDefault();
    const sectionId = hash.replace("#", "");
    const element = document.getElementById(sectionId);

    if (element) {
      const navbarElement = document.querySelector("nav");
      const navbarHeight = navbarElement?.offsetHeight || 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });

      setMobileMenuOpen(false);
    }
  };

  return (
    <nav className="bg-background/90 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 right-0 z-50 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logoWhite}
              alt="Kelar.co.id"
              className="h-12 md:h-20"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href={getNavLink("#home")}
              onClick={(e) => scrollToSection(e, "#home")}
              className={`${
                activeSection === "home" || (isHome && activeSection === "")
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white transition-colors text-lg`}
            >
              {t("nav.home")}
            </a>
            <a
              href={getNavLink("#about")}
              onClick={(e) => scrollToSection(e, "#about")}
              className={`${
                activeSection === "about"
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white transition-colors text-lg`}
            >
              {t("nav.about")}
            </a>
            <div className="relative group/nav">
              <a
                href={getNavLink("#layanan")}
                onClick={(e) => scrollToSection(e, "#layanan")}
                className={`${
                  activeSection === "layanan"
                    ? "text-white font-semibold"
                    : "text-white/80"
                } hover:text-white transition-colors text-lg flex items-center gap-1 py-10`}
              >
                {t("nav.services")}
                <ChevronDown size={16} className="group-hover/nav:rotate-180 transition-transform duration-300" />
              </a>
              
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 w-80 bg-background/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 shadow-2xl">
                <div className="grid grid-cols-1 gap-2">
                  {[1, 2, 3, 4].map((id) => (
                    id === 2 ? (
                      <Link 
                        key={id}
                        to="/virtual-office"
                        className="p-4 rounded-2xl hover:bg-white/5 transition-all group/item cursor-pointer block"
                      >
                        <h4 className="text-white font-bold text-sm mb-1 group-hover/item:text-blue-400 transition-colors">
                          {t(`services_section.item${id}.title`)}
                        </h4>
                        <p className="text-white/50 text-xs line-clamp-1 leading-relaxed">
                          {t(`services_section.item${id}.desc`)}
                        </p>
                      </Link>
                    ) : (
                      <Link 
                        key={id}
                        to="/#layanan"
                        className="p-4 rounded-2xl hover:bg-white/5 transition-all group/item cursor-pointer block"
                        onClick={(e) => {
                          if (isHome) {
                            scrollToSection(e as any, "#layanan");
                          }
                        }}
                      >
                        <h4 className="text-white font-bold text-sm mb-1 group-hover/item:text-blue-400 transition-colors">
                          {t(`services_section.item${id}.title`)}
                        </h4>
                        <p className="text-white/50 text-xs line-clamp-1 leading-relaxed">
                          {t(`services_section.item${id}.desc`)}
                        </p>
                      </Link>
                    )
                  ))}
                </div>
              </div>
            </div>
            <a
              href={getNavLink("#artikel")}
              onClick={(e) => scrollToSection(e, "#artikel")}
              className={`${
                activeSection === "artikel"
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white transition-colors text-lg`}
            >
              {t("nav.articles")}
            </a>
            <a
              href={getNavLink("#contact")}
              onClick={(e) => scrollToSection(e, "#contact")}
              className={`${
                activeSection === "contact"
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white transition-colors text-lg`}
            >
              {t("nav.contact")}
            </a>
          </div>

          {/* Theme & Language Toggle + CTA */}
          <div className="hidden md:flex items-center gap-4">
            <ThemeLanguageToggle />
            <a
              href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-[var(--background)] rounded-full hover:bg-white/90 transition-all font-semibold shadow-lg hover:scale-105"
            >
              {t("common.consultation")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-white/10">
          <div className="px-4 py-4 space-y-4">
            <div className="pb-4 border-b border-white/10">
              <ThemeLanguageToggle />
            </div>
            <a
              href={getNavLink("#home")}
              onClick={(e) => scrollToSection(e, "#home")}
              className={`block ${
                activeSection === "home" || (isHome && activeSection === "")
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white transition-colors font-medium`}
            >
              {t("nav.home")}
            </a>
            <a
              href={getNavLink("#about")}
              onClick={(e) => scrollToSection(e, "#about")}
              className={`block ${
                activeSection === "about"
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white transition-colors font-medium`}
            >
              {t("nav.about")}
            </a>
            <div>
              <a
                href={getNavLink("#layanan")}
                onClick={(e) => scrollToSection(e, "#layanan")}
                className={`block ${
                  activeSection === "layanan"
                    ? "text-white font-semibold"
                    : "text-white/80"
                } hover:text-white transition-colors font-medium mb-4`}
              >
                {t("nav.services")}
              </a>
              <div className="pl-4 space-y-3 mb-4">
                {[1, 2, 3, 4].map((id) => (
                  id === 2 ? (
                    <Link 
                      key={id} 
                      to="/virtual-office"
                      className="block text-blue-400 text-sm font-bold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • {t(`services_section.item${id}.title`)}
                    </Link>
                  ) : (
                    <span key={id} className="block text-white/50 text-sm font-light">
                      • {t(`services_section.item${id}.title`)}
                    </span>
                  )
                ))}
              </div>
            </div>
            <a
              href={getNavLink("#artikel")}
              onClick={(e) => scrollToSection(e, "#artikel")}
              className={`block ${
                activeSection === "artikel"
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white transition-colors font-medium`}
            >
              {t("nav.articles")}
            </a>
            <a
              href={getNavLink("#contact")}
              onClick={(e) => scrollToSection(e, "#contact")}
              className={`block ${
                activeSection === "contact"
                  ? "text-white font-semibold"
                  : "text-white/80"
              } hover:text-white transition-colors font-medium`}
            >
              {t("nav.contact")}
            </a>
            <a
              href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-3 bg-white text-[var(--background)] rounded-full hover:bg-white/90 transition-all text-center font-bold"
            >
              {t("common.consultation")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
