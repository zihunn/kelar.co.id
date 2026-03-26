import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { HeroSlider } from "../components/HeroSlider";
import { ArticleCard } from "../components/ArticleCard";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import {
  Instagram,
  Facebook,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Users,
  Clock,
  Linkedin,
  TrendingUp,
  Gavel,
  FileBadge,
  Briefcase,
  Scale,
  Globe,
  ShieldCheck,
  Building2,
  BarChart3,
  Palette,
  ChevronDown,
  Award,
  Tag,
  Zap,
  History,
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useRef } from "react";

// TikTok icon component
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

// Hook to detect if element is in view
function useInView(threshold = 0.1) {
  const [ref, setRef] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold },
    );

    observer.observe(ref);
    return () => observer.disconnect();
  }, [ref, threshold]);

  return [setRef, inView] as const;
}

export function LandingPage() {
  const { articles, aboutUs, socialMedia, promos, services } = useData();
  const { t } = useLanguage();
  const location = useLocation();

  // Handle scroll to hash or top on refresh
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace("#", "");

      // Delay to ensure content is rendered
      const timeoutId = setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          const navbarElement = document.querySelector("nav");
          const navbarHeight = navbarElement?.offsetHeight || 96;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 500); // 500ms delay to allow Hero and other sections to settle

      return () => clearTimeout(timeoutId);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash]);

  // Only show published content
  const publishedArticles = articles.filter((a) => a.status === "published");
  const publishedPromos = promos.filter((p) => p.status === "published");

  // Refs for scroll animations
  const [aboutRef, aboutInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [articlesRef, articlesInView] = useInView();
  const [promoRef, promoInView] = useInView();
  const [servicesSectionRefView, servicesSectionInView] = useInView();

  // Scroll targets for specific parallax content
  const heroRef = useRef(null);
  const featureSectionRef = useRef(null);
  const promoSectionRef = useRef(null);
  const servicesSectionRef = useRef(null);
  const aboutSectionRef = useRef(null);
  const articleSectionRef = useRef(null);

  const { scrollYProgress: featureProgress } = useScroll({ target: featureSectionRef, offset: ["start end", "end start"] });
  const { scrollYProgress: promoProgress } = useScroll({ target: promoSectionRef, offset: ["start end", "end start"] });
  const { scrollYProgress: servicesProgress } = useScroll({ target: servicesSectionRef, offset: ["start end", "end start"] });
  const { scrollYProgress: aboutProgress } = useScroll({ target: aboutSectionRef, offset: ["start end", "end start"] });
  const { scrollYProgress: articleProgress } = useScroll({ target: articleSectionRef, offset: ["start end", "end start"] });

  const featureY = useTransform(featureProgress, [0, 1], [100, -100]);
  const promoY = useTransform(promoProgress, [0, 1], [80, -80]);
  const servicesYProgressTransform = useTransform(servicesProgress, [0, 1], [120, -120]);
  const aboutY = useTransform(aboutProgress, [0, 1], [150, -150]);
  const articleY = useTransform(articleProgress, [0, 1], [120, -120]);
  const headerY = useTransform(aboutProgress, [0, 1], [-50, 50]);

  // Hardcoded services with new icons support for initial view or offline
  const servicesData = [
    {
      id: 1,
      slug: "ekatalog",
      icons: ["/icons/services/logo layanan 1a.png", "/icons/services/logo layanan 1b.png"],
      title: t("services_section.item1.title"),
      desc: t("services_section.item1.desc"),
      color: "from-blue-600 to-indigo-700"
    },
    {
      id: 2,
      slug: "perizinan",
      icons: ["/icons/services/logo layanan 2a.png", "/icons/services/logo layanan 2b.png"],
      title: t("services_section.item2.title"),
      desc: t("services_section.item2.desc"),
      color: "from-sky-500 to-blue-600"
    },
    {
      id: 3,
      slug: "legalitas",
      icons: ["/icons/services/logo layanan 3a.png", "/icons/services/logo layanan 4a.png"],
      title: t("services_section.item3.title"),
      desc: t("services_section.item3.desc"),
      color: "from-blue-400 to-cyan-500"
    }
  ];

  const teamData = [
    { name: "Juno", role: "Komisaris", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Agungan", role: "Direktur Operasional", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Alexy", role: "Ekatalog Consultant", image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Christine", role: "Tax Consultant", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
    { name: "Rusli", role: "Legal Consultant", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" },
  ];

  const features = [
    {
      icon: CheckCircle2,
      title: t("features.item1.title"),
      description: t("features.item1.desc"),
    },
    {
      icon: Users,
      title: t("features.item2.title"),
      description: t("features.item2.desc"),
    },
    {
      icon: Award,
      title: t("features.item3.title"),
      description: t("features.item3.desc"),
    },
    {
      icon: Clock,
      title: t("features.item4.title"),
      description: t("features.item4.desc"),
    },
  ];

  const stats = [
    { value: "500+", label: t("stats.clients") },
    { value: "95%", label: t("stats.success") },
    { value: "10+", label: t("stats.experience") },
    { value: "24/7", label: t("stats.support") },
  ];

  const servicesList = [
    t("services.item1"),
    t("services.item2"),
    t("services.item3"),
    t("services.item4"),
    t("services.item5"),
    t("services.item6"),
  ];

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Parallax transforms for background elements
  const y1 = useTransform(smoothY, [0, 5000], [0, 800]);
  const y2 = useTransform(smoothY, [0, 5000], [0, -1000]);
  const y3 = useTransform(smoothY, [0, 5000], [0, 500]);
  const rotate1 = useTransform(smoothY, [0, 5000], [0, 180]);
  const rotate2 = useTransform(smoothY, [0, 5000], [0, -180]);

  return (
    <div className="relative min-h-screen bg-background text-foreground transition-all selection:bg-white selection:text-[var(--background)] overflow-x-hidden">
      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-[10%] -left-20 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full blur-[100px]"
        />
        <motion.div
          style={{ y: y2, rotate: rotate2 }}
          className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-white opacity-[0.05] rounded-full blur-[120px]"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute bottom-[10%] left-[20%] w-[400px] h-[400px] bg-white opacity-[0.02] rounded-full blur-[80px]"
        />

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
      </div>

      <div className="relative z-10">
        <Navbar />

        {/* Hero Section */}
        <section id="home" ref={heroRef}>
          <HeroSlider />
        </section>

        {/* Features Section */}
        <section ref={featureSectionRef} className="pt-12 pb-16 sm:py-24 bg-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              style={{ y: featureY }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-10 sm:mb-16"
            >
              <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">
                {t("features.sectionTitle")}
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-[var(--kelar-primary)] to-[var(--kelar-secondary)] mx-auto rounded-full" />
            </motion.div>

            <motion.div
              style={{ y: featureY }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="text-center p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 group backdrop-blur-sm"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--kelar-primary)] to-[var(--kelar-secondary)] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="text-white" size={32} />
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Limited Promo Section - Horizontal Scroll */}
        {publishedPromos.length > 0 && (
          <section
            id="promo"
            ref={promoSectionRef}
            className="py-24 bg-background relative overflow-hidden"
          >
            <div className="absolute top-1/2 left-0 w-full h-[300px] bg-white opacity-[0.02] -translate-y-1/2 blur-3xl pointer-events-none" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <motion.div
                ref={promoRef}
                className="text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                animate={promoInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white text-xs font-black uppercase tracking-widest mb-6 animate-pulse">
                  <Zap size={14} className="text-yellow-400" />
                  <span>{t("promo.title")}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
                  E-Katalog V6 <span className="text-white/40">Offers</span>
                </h2>
                <p className="text-white/60 max-w-xl mx-auto text-lg md:text-xl font-light leading-relaxed">
                  {t("promo.subtitle")}
                </p>
              </motion.div>

              {/* Horizontal Scroll Container */}
              <motion.div
                style={{ y: promoY }}
                className="flex gap-6 overflow-x-auto pb-12 snap-x snap-mandatory no-scrollbar"
              >
                {publishedPromos.map((promo, index) => (
                  <motion.a
                    key={promo.id}
                    href="https://wa.me/6281122218988"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-shrink-0 w-[85vw] sm:w-[500px] h-[550px] bg-white/5 rounded-[3rem] p-8 md:p-12 border border-white/10 group snap-center relative shadow-2xl hover:bg-white/10 transition-colors flex flex-col"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={promoInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.8, delay: index * 0.15 }}
                    whileHover={{ y: -15, transition: { duration: 0.4 } }}
                  >
                    <div className="absolute top-8 right-8 w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 text-[var(--background)] rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-[0_0_30px_rgba(250,204,21,0.4)] z-10">
                      <Tag size={28} />
                    </div>

                    <div className="mb-6 flex-grow overflow-hidden relative z-10">
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400/10 border border-yellow-400/20 rounded-full mb-6">
                        <Zap size={16} className="text-yellow-400" />
                        <span className="text-[10px] font-black text-yellow-400 uppercase tracking-[0.2em] pt-0.5">Special Offer</span>
                      </div>
                      <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-8 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-400 group-hover:to-orange-500 transition-all duration-300">
                        {promo.name}
                      </h3>

                      <div className="relative">
                        {/* Decorative Line */}
                        <div className="absolute left-0 top-2 bottom-4 w-[2px] bg-gradient-to-b from-yellow-400/50 to-transparent" />

                        <div className="text-white/80 text-[15px] leading-relaxed whitespace-pre-wrap font-medium h-[220px] overflow-y-auto pl-6 pr-4 custom-scrollbar">
                          {promo.content}
                        </div>
                      </div>
                    </div>

                    <div className="relative z-10 mt-auto pt-6 border-t border-white/10 flex items-center justify-between group/cta">
                      <div className="flex items-center gap-3 text-white group-hover:text-yellow-400 transition-colors">
                        <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-yellow-400/10 transition-colors">
                          <Phone size={18} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest relative">
                          Klaim Promo
                          <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-yellow-400 transition-all duration-300 group-hover/cta:w-full" />
                        </span>
                      </div>

                      <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center -rotate-45 group-hover:bg-yellow-400 group-hover:border-yellow-400 group-hover:text-[var(--background)] transition-all duration-300">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14"></path>
                          <path d="m12 5 7 7-7 7"></path>
                        </svg>
                      </div>
                    </div>

                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/0 via-transparent to-yellow-400/0 group-hover:from-yellow-400/5 group-hover:to-orange-500/10 transition-all duration-500 pointer-events-none" />
                  </motion.a>
                ))}
              </motion.div>

            </div>
          </section>
        )}

        {/* Services Section - Horizontal Scroll */}
        <section
          id="layanan"
          ref={servicesSectionRef}
          className="py-24 bg-white/5 backdrop-blur-3xl border-y border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[var(--kelar-primary)] opacity-5 rounded-full blur-[120px] translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[var(--kelar-secondary)] opacity-5 rounded-full blur-[120px] -translate-x-1/2 translate-y-1/2" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              ref={servicesSectionRefView}
              className="text-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={servicesSectionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight">
                {t("services_section.title")}
              </h2>
              <p className="text-white/60 max-w-2xl mx-auto text-lg md:text-xl font-light">
                {t("services_section.subtitle")}
              </p>
            </motion.div>

            <motion.div
              style={{ y: servicesYProgressTransform }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12"
            >
              {servicesData.map((service, index) => (
                <motion.div
                  key={service.id}
                  className="bg-[#004e89] dark:bg-slate-800/80 text-white rounded-[3rem] p-8 md:p-10 flex flex-col relative group overflow-hidden shadow-2xl h-full border border-white/10 dark:border-white/5"
                  initial={{ opacity: 0, y: 50 }}
                  animate={servicesSectionInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  {/* Decorative background number */}
                  <div className="absolute -top-10 -right-10 text-[10rem] font-black opacity-[0.03] dark:opacity-5 group-hover:opacity-[0.05] dark:group-hover:opacity-10 transition-opacity pointer-events-none text-black dark:text-white leading-none">
                    0{service.id}
                  </div>

                  <div className="flex flex-wrap gap-5 mb-10">
                    {service.icons.map((Icon: any, idx) => (
                      <div key={idx} className={`w-24 h-24 rounded-[1.5rem] bg-white flex-shrink-0 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform duration-500`}>
                        {typeof Icon === 'string' ? (
                          <img 
                            src={Icon.startsWith('http') ? Icon : Icon} 
                            alt={`${service.title} icon ${idx}`}
                            className="w-18 h-18 object-contain p-1" 
                          />
                        ) : (
                          <Icon size={40} className="text-[#0E1B47]" />
                        )}
                      </div>
                    ))}
                  </div>

                  <h3 className="text-xl md:text-2xl font-black mb-6 leading-relaxed relative break-words dark:text-white">
                    {service.title}
                  </h3>

                  <div className="relative flex-grow mb-10">
                    <p className="text-white/70 text-base md:text-lg font-medium leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                   <Link
                    to={`/layanan/${service.slug}`}
                    className="relative mt-auto px-6 py-4 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white font-black text-center transition-all flex items-center justify-center gap-3 overflow-hidden group/btn hover:scale-105 active:scale-95 duration-200"
                  >
                    <span className="relative z-10">{t("services_section.cta")}</span>
                    <Phone size={18} className="relative z-10 group-hover/btn:rotate-12 transition-transform" />
                  </Link>

                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 blur-3xl transition-opacity duration-700 pointer-events-none rounded-full`} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        <section
          id="about"
          ref={aboutSectionRef}
          className="py-24 bg-white/5 backdrop-blur-lg border-y border-white/5 relative overflow-hidden"
        >
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--kelar-secondary)] opacity-5 rounded-full blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              ref={aboutRef}
              style={{ y: headerY }}
              className="text-center mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={aboutInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white text-shadow-sm">
                {t("about.title_alt")}
              </h2>
              <div className="w-32 h-2 bg-white/20 mx-auto rounded-full overflow-hidden">
                <div className="w-1/2 h-full bg-white" />
              </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-gradient-to-br from-[var(--kelar-primary)] to-[var(--kelar-secondary)] rounded-2xl flex justify-center items-center shadow-lg">
                    <History className="text-white" size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">Sejarah Kelar</h3>
                </div>
                <div className="space-y-6 text-white/80 font-light leading-relaxed text-lg text-justify">
                  <p>
                    Berdiri di tengah dinamika bisnis modern, Kelar lahir dari sebuah visi sederhana namun kuat: "Memudahkan langkah setiap pengusaha". Sejak awal kemunculannya, Kelar telah berkomitmen untuk menjadi mitra strategis bagi UMKM dan perusahaan besar dalam menavigasi kompleksitas legalitas dan birokrasi di Indonesia.
                  </p>
                  <p>
                    Dengan dedikasi yang tak kenal lelah, kami terus berevolusi mengintegrasikan teknologi dan keahlian manusia guna memberikan layanan profesional, cepat, dan transparan untuk memastikan bisnis Anda tumbuh dengan jaminan dan tanpa hambatan legalitas.
                  </p>
                </div>
              </motion.div>

              <motion.div
                className="bg-white/5 backdrop-blur-2xl rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden group"
                initial={{ opacity: 0, x: 50 }}
                animate={aboutInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-[var(--kelar-primary)] opacity-20 rounded-full blur-3xl group-hover:opacity-30 transition-all duration-700" />
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 bg-white text-[var(--background)] rounded-2xl flex items-center justify-center shadow-xl">
                    <Mail size={28} />
                  </div>
                  <h3 className="text-3xl font-bold text-white">
                    {t("about.contactUs")}
                  </h3>
                </div>

                <div className="space-y-5 mb-10 relative z-10">
                  <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group/item">
                    <MapPin size={24} className="text-white mt-1 flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                    <span className="text-white/90 group-hover/item:text-white transition-colors">{aboutUs.address}</span>
                  </div>
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group/item">
                    <Mail size={24} className="text-white flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                    <a href={`mailto:${aboutUs.email}`} className="text-white/90 group-hover/item:text-white transition-colors">{aboutUs.email}</a>
                  </div>
                  <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 group/item">
                    <Phone size={24} className="text-white flex-shrink-0 group-hover/item:scale-110 transition-transform" />
                    <a href={`tel:${aboutUs.phone}`} className="text-white/90 group-hover/item:text-white transition-colors">{aboutUs.phone}</a>
                  </div>
                </div>

                <div className="relative z-10">
                  <h4 className="mb-6 text-xl font-bold text-white">
                    {t("about.socialMedia")}
                  </h4>
                  <div className="flex gap-3">
                    <a href={socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-[var(--background)] transition-all duration-300 hover:scale-110 shadow-lg border border-white/10 text-white">
                      <Instagram size={24} />
                    </a>
                    <a href={socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-[var(--background)] transition-all duration-300 hover:scale-110 shadow-lg border border-white/10 text-white">
                      <Facebook size={24} />
                    </a>
                    <a href={socialMedia.tiktok} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-[var(--background)] transition-all duration-300 hover:scale-110 shadow-lg border border-white/10 text-white">
                      <TikTokIcon size={24} />
                    </a>
                    <a href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer" className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white hover:text-[var(--background)] transition-all duration-300 hover:scale-110 shadow-lg border border-white/10 text-white">
                      <Linkedin size={24} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </section>

        <section
          id="artikel"
          ref={articleSectionRef}
          className="py-24 bg-background relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 w-full h-[500px] bg-gradient-to-b from-white/5 to-transparent -translate-x-1/2 blur-3xl" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            <motion.div
              ref={articlesRef}
              style={{ y: headerY }}
              className="text-center mb-24"
              initial={{ opacity: 0, y: 30 }}
              animate={articlesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl md:text-6xl font-black mb-6 text-white">
                {t("articles.title_alt")}
              </h2>
              <div className="w-24 h-2 bg-white/20 mx-auto mb-8 rounded-full overflow-hidden">
                <div className="w-full h-full bg-white animate-pulse" />
              </div>
              <p className="text-white/70 max-w-2xl mx-auto text-xl font-light leading-relaxed">
                {t("articles.subtitle_alt")}
              </p>
            </motion.div>

            {publishedArticles.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 py-12">
                {t("articles.noArticles")}
              </div>
            ) : (
              <motion.div
                style={{ y: articleY }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {publishedArticles.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={articlesInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </section>

        {/* Contact CTA Section - Refined for Balance */}
        <section
          id="contact"
          className="py-12 md:py-16 relative overflow-hidden px-4"
        >
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative rounded-[3.5rem] overflow-hidden bg-white/10 backdrop-blur-2xl border border-white/20 text-white shadow-2xl group"
            >
              {/* Background Flair for CTA */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white opacity-[0.05] rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl group-hover:opacity-[0.08] transition-opacity duration-700" />
              <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl group-hover:opacity-[0.05] transition-opacity duration-700" />

              <div className="relative px-8 py-16 md:px-16 md:py-24 flex flex-col items-center text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="w-24 h-24 mb-10 bg-white text-[var(--background)] rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-500"
                >
                  <TrendingUp size={40} />
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="text-4xl md:text-6xl font-black mb-8 leading-tight tracking-tighter text-shadow-lg"
                >
                  {t("cta.title")}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="text-xl md:text-2xl mb-14 text-white/70 max-w-2xl font-light leading-relaxed"
                >
                  {t("cta.subtitle")}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto"
                >
                  <motion.a
                    href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-12 py-6 bg-white text-[var(--background)] rounded-full hover:bg-white/90 transition-all duration-300 shadow-2xl hover:scale-105 inline-flex items-center justify-center gap-4 text-xl font-black"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Phone size={24} />
                    <span>{t("cta.whatsapp")}</span>
                  </motion.a>
                  <motion.a
                    href={`mailto:${aboutUs.email}`}
                    className="px-12 py-6 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-[var(--background)] transition-all duration-300 inline-flex items-center justify-center gap-4 text-xl font-black"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Mail size={24} />
                    <span>{t("cta.email")}</span>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
