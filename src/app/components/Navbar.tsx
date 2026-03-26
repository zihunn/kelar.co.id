import { Link, useLocation, useNavigate } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { ThemeLanguageToggle } from "./ThemeLanguageToggle";
import logoWhite from "@/image/kelar-white.png";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const { aboutUs, services } = useData();
  const { t } = useLanguage();
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

  const handleConsultationClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsConsultationModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav className="bg-[#002d4f]/95 dark:bg-slate-950/90 backdrop-blur-md border-b border-white/10 fixed top-0 left-0 right-0 z-50 transition-all">
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
                className={`${activeSection === "home" || (isHome && activeSection === "")
                    ? "text-white font-semibold"
                    : "text-white/80"
                  } hover:text-white transition-colors text-lg`}
              >
                {t("nav.home")}
              </a>
              <a
                href={getNavLink("#about")}
                onClick={(e) => scrollToSection(e, "#about")}
                className={`${activeSection === "about"
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
                  className={`${activeSection === "layanan"
                      ? "text-white font-semibold"
                      : "text-white/80"
                    } hover:text-white transition-colors text-lg flex items-center gap-1 py-10`}
                >
                  {t("nav.services")}
                  <ChevronDown size={16} className="group-hover/nav:rotate-180 transition-transform duration-300" />
                </a>

                {/* Dropdown Menu */}
                <div className="absolute top-full left-0 w-96 bg-[#002d4f]/98 dark:bg-slate-950/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 opacity-0 invisible group-hover/nav:opacity-100 group-hover/nav:visible transition-all duration-300 translate-y-2 group-hover/nav:translate-y-0 shadow-2xl">
                  <div className="grid grid-cols-1 gap-2">
                    {services.map((service) => (
                      <Link
                        key={service.id}
                        to={`/layanan/${service.slug}`}
                        className="p-4 rounded-xl hover:bg-white/5 transition-all group/item cursor-pointer block"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <h4 className="text-white font-bold text-base group-hover/item:text-blue-400 transition-colors">
                          {service.title}
                        </h4>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <a
                href={getNavLink("#artikel")}
                onClick={(e) => scrollToSection(e, "#artikel")}
                className={`${activeSection === "artikel"
                    ? "text-white font-semibold"
                    : "text-white/80"
                  } hover:text-white transition-colors text-lg`}
              >
                {t("nav.articles")}
              </a>
              <a
                href={getNavLink("#contact")}
                onClick={(e) => scrollToSection(e, "#contact")}
                className={`${activeSection === "contact"
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
              <button
                onClick={handleConsultationClick}
                className="px-6 py-3 bg-white text-[var(--background)] rounded-full hover:bg-white/90 transition-all font-semibold shadow-lg hover:scale-105"
              >
                {t("common.consultation")}
              </button>
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
          <div className="md:hidden bg-[#002d4f] dark:bg-slate-950 border-t border-white/10">
            <div className="px-4 py-4 space-y-4">
              <div className="pb-4 border-b border-white/10">
                <ThemeLanguageToggle />
              </div>
              <a
                href={getNavLink("#home")}
                onClick={(e) => scrollToSection(e, "#home")}
                className={`block ${activeSection === "home" || (isHome && activeSection === "")
                    ? "text-white font-semibold"
                    : "text-white/80"
                  } hover:text-white transition-colors font-medium`}
              >
                {t("nav.home")}
              </a>
              <a
                href={getNavLink("#about")}
                onClick={(e) => scrollToSection(e, "#about")}
                className={`block ${activeSection === "about"
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
                  className={`block ${activeSection === "layanan"
                      ? "text-white font-semibold"
                      : "text-white/80"
                    } hover:text-white transition-colors font-medium mb-4`}
                >
                  {t("nav.services")}
                </a>
                <div className="pl-4 space-y-3 mb-4">
                  {services.map((service) => (
                    <Link
                      key={service.id}
                      to={`/layanan/${service.slug}`}
                      className="block text-white/80 hover:text-white transition-colors text-sm font-medium"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      • {service.title}
                    </Link>
                  ))}
                </div>
              </div>
              <a
                href={getNavLink("#artikel")}
                onClick={(e) => scrollToSection(e, "#artikel")}
                className={`block ${activeSection === "artikel"
                    ? "text-white font-semibold"
                    : "text-white/80"
                  } hover:text-white transition-colors font-medium`}
              >
                {t("nav.articles")}
              </a>
              <a
                href={getNavLink("#contact")}
                onClick={(e) => scrollToSection(e, "#contact")}
                className={`block ${activeSection === "contact"
                    ? "text-white font-semibold"
                    : "text-white/80"
                  } hover:text-white transition-colors font-medium`}
              >
                {t("nav.contact")}
              </a>
              <button
                onClick={handleConsultationClick}
                className="block w-full px-6 py-3 bg-white text-[var(--background)] rounded-full hover:bg-white/90 transition-all text-center font-bold"
              >
                {t("common.consultation")}
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Consultation Modal */}
      {isConsultationModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsConsultationModalOpen(false)}
          />
          <div className="relative bg-[#002d4f] dark:bg-slate-900 border border-white/20 rounded-3xl md:rounded-[2.5rem] w-full max-w-lg p-6 sm:p-8 md:p-12 shadow-2xl animate-in zoom-in-95 duration-200 mx-4">
            <button
              onClick={() => setIsConsultationModalOpen(false)}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-white/50 hover:text-white transition-colors"
            >
              <X size={20} className="md:w-6 md:h-6" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-white/10 rounded-2xl md:rounded-3xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-white/10">
                <Menu className="text-blue-400 w-8 h-8 md:w-10 md:h-10" />
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-3 md:mb-4">
                {t("common.consultation")}
              </h3>

              <div className="bg-white/5 rounded-xl md:rounded-2xl p-4 md:p-6 mb-8 md:mb-10 border border-white/10">
                <p className="text-white/80 text-base md:text-lg leading-relaxed">
                  Layanan konsultasi gratis maksimal diberikan selama <span className="text-white font-bold">15 menit</span>.
                </p>
              </div>

              <div className="flex flex-col gap-3 md:gap-4">
                <a
                  href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 md:py-5 bg-white text-[#002d4f] rounded-full font-black text-lg md:text-xl hover:bg-white/90 transition-all shadow-xl flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.558 0 11.894-5.335 11.898-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>Konsultasi Gratis Sekarang</span>
                </a>

                <button
                  onClick={() => setIsConsultationModalOpen(false)}
                  className="py-3 md:py-4 text-white/40 hover:text-white transition-colors text-xs md:text-sm font-bold tracking-widest uppercase"
                >
                  Nanti Saja
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
