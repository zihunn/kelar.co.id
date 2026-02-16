import { Link, useLocation } from "react-router";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { ThemeLanguageToggle } from "./ThemeLanguageToggle";
import logoBlue from "../../image/kelar-blue.png";
import logoWhite from "../../image/kelar-white.png";

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
      const sections = ["home", "about", "artikel", "contact"];
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
    <nav className="bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 right-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={theme === "dark" ? logoWhite : logoBlue}
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
                  ? "text-[var(--kelar-primary)] font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-[var(--kelar-primary)] dark:hover:text-[var(--kelar-primary)] transition-colors`}
            >
              {t("nav.home")}
            </a>
            <a
              href={getNavLink("#about")}
              onClick={(e) => scrollToSection(e, "#about")}
              className={`${
                activeSection === "about"
                  ? "text-[var(--kelar-primary)] font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-[var(--kelar-primary)] dark:hover:text-[var(--kelar-primary)] transition-colors`}
            >
              {t("nav.about")}
            </a>
            <a
              href={getNavLink("#artikel")}
              onClick={(e) => scrollToSection(e, "#artikel")}
              className={`${
                activeSection === "artikel"
                  ? "text-[var(--kelar-primary)] font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-[var(--kelar-primary)] dark:hover:text-[var(--kelar-primary)] transition-colors`}
            >
              {t("nav.articles")}
            </a>
            <a
              href={getNavLink("#contact")}
              onClick={(e) => scrollToSection(e, "#contact")}
              className={`${
                activeSection === "contact"
                  ? "text-[var(--kelar-primary)] font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-[var(--kelar-primary)] dark:hover:text-[var(--kelar-primary)] transition-colors`}
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
              className="px-6 py-3 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors"
            >
              {t("common.consultation")}
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-4 py-4 space-y-4">
            <div className="pb-4 border-b dark:border-gray-800">
              <ThemeLanguageToggle />
            </div>
            <a
              href={getNavLink("#home")}
              onClick={(e) => scrollToSection(e, "#home")}
              className={`block ${
                activeSection === "home" || (isHome && activeSection === "")
                  ? "text-[var(--kelar-primary)] font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-[var(--kelar-primary)] transition-colors`}
            >
              {t("nav.home")}
            </a>
            <a
              href={getNavLink("#about")}
              onClick={(e) => scrollToSection(e, "#about")}
              className={`block ${
                activeSection === "about"
                  ? "text-[var(--kelar-primary)] font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-[var(--kelar-primary)] transition-colors`}
            >
              {t("nav.about")}
            </a>
            <a
              href={getNavLink("#artikel")}
              onClick={(e) => scrollToSection(e, "#artikel")}
              className={`block ${
                activeSection === "artikel"
                  ? "text-[var(--kelar-primary)] font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-[var(--kelar-primary)] transition-colors`}
            >
              {t("nav.articles")}
            </a>
            <a
              href={getNavLink("#contact")}
              onClick={(e) => scrollToSection(e, "#contact")}
              className={`block ${
                activeSection === "contact"
                  ? "text-[var(--kelar-primary)] font-semibold"
                  : "text-gray-700 dark:text-gray-300"
              } hover:text-[var(--kelar-primary)] transition-colors`}
            >
              {t("nav.contact")}
            </a>
            <a
              href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block px-6 py-3 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors text-center"
            >
              {t("common.consultation")}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
