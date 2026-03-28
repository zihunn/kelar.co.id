import { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Package, 
  Users, 
  Coffee,
  ArrowRight,
  ShieldCheck,
  Star
} from "lucide-react";
import { api } from "../services/api";
import { AnalyticsTracker } from "../components/AnalyticsTracker";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

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

export function VirtualOfficePage() {
  const { t } = useLanguage();
  
  const [heroRef, heroInView] = useInView();
  const [whatIsRef, whatIsInView] = useInView();
  const [facilitiesRef, facilitiesInView] = useInView();
  const [listRef, listInView] = useInView();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const y1 = useTransform(smoothProgress, [0, 1], [0, -200]);
  const y2 = useTransform(smoothProgress, [0, 1], [0, -400]);
  const rotate1 = useTransform(smoothProgress, [0, 1], [0, 45]);

  // Dummy Virtual Office Data
  const voList = [
    {
      id: 1,
      name: "Kelar Hub Jakarta Selatan",
      address: "Gatot Subroto, Jakarta Selatan",
      price: "2.900.000",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 2,
      name: "Kelar Hub Jakarta Barat",
      address: "Kembangan, Jakarta Barat",
      price: "2.500.000",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 3,
      name: "Kelar Hub Jakarta Pusat",
      address: "Sudirman, Jakarta Pusat",
      price: "3.500.000",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 4,
      name: "Kelar Hub Jakarta Utara",
      address: "Pluit, Jakarta Utara",
      price: "2.700.000",
      image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=800&auto=format&fit=crop"
    },
    {
      id: 5,
      name: "Kelar Hub Tangerang",
      address: "BSD City, Tangerang",
      price: "2.200.000",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const facilities = [
    { icon: Building2, text: t("virtual_office.facilities.item1") },
    { icon: Package, text: t("virtual_office.facilities.item2") },
    { icon: Users, text: t("virtual_office.facilities.item3") },
    { icon: Coffee, text: t("virtual_office.facilities.item4") },
    { icon: Phone, text: t("virtual_office.facilities.item5") },
    { icon: ShieldCheck, text: t("virtual_office.facilities.item6") },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-white selection:bg-white selection:text-[var(--background)] overflow-x-hidden">
      <AnalyticsTracker />
      <Navbar />

      {/* Parallax Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <motion.div 
          style={{ y: y1, rotate: rotate1 }}
          className="absolute top-[10%] -left-20 w-[500px] h-[500px] bg-white opacity-[0.03] rounded-full blur-[100px]"
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-white opacity-[0.05] rounded-full blur-[120px]"
        />
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section 
          ref={heroRef}
          data-analytics="vo_hero_section"
          className="pt-48 pb-32 px-4 relative overflow-hidden flex items-center justify-center min-h-[90vh]"
        >
          {/* Background Image with Blur/Opacity */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2000&auto=format&fit=crop" 
              className="w-full h-full object-cover opacity-20 scale-110"
              alt=""
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/80 to-[var(--background)]" />
            <div className="absolute inset-0 backdrop-blur-[8px]" />
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <motion.div 
                 initial={{ opacity: 0, scale: 0.8 }}
                 animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                 className="inline-flex items-center gap-2 px-6 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10 text-white text-xs font-black uppercase tracking-widest mb-10"
              >
                <Building2 size={14} className="text-blue-400" />
                <span>Next-Gen Workspace</span>
              </motion.div>
              <h1 className="text-5xl md:text-8xl font-black mb-8 text-white tracking-tighter leading-[0.9]">
                {t("virtual_office.title")} <br />
                <span className="text-white/30 italic">Perspective</span>
              </h1>
              <p className="text-white/60 text-xl md:text-2xl max-w-3xl mx-auto font-light leading-relaxed mb-16">
                {t("virtual_office.subtitle")}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => api.logAnalytics({ category: 'conversion', action: 'click', label: 'vo_hero_cta' })}
                  className="px-12 py-6 bg-white text-[var(--background)] rounded-2xl font-black text-xl shadow-[0_20px_50px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_50px_rgba(255,255,255,0.2)] transition-all"
                >
                  {t("virtual_office.cta")}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* What is Virtual Office */}
        <section 
          ref={whatIsRef}
          data-analytics="vo_what_is_section"
          className="py-32 bg-white/5 backdrop-blur-3xl border-y border-white/5 relative"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={whatIsInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <div className="w-24 h-2 bg-white mb-10 rounded-full" />
                <h2 className="text-4xl md:text-7xl font-black text-white mb-10 leading-[1.1] tracking-tighter">
                  {t("virtual_office.whatIsTitle")}
                </h2>
                <p className="text-white/70 text-2xl font-light leading-relaxed mb-8">
                  {t("virtual_office.whatIsDesc")}
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={whatIsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="relative"
              >
                <div className="aspect-[4/3] rounded-[3.5rem] overflow-hidden border border-white/10 shadow-3xl group">
                  <img 
                    src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                    alt="Virtual Office"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-[var(--background)]/80 via-transparent to-transparent opacity-60" />
                </div>
                
                {/* Floating Stats Card */}
                <motion.div 
                  initial={{ x: 50, opacity: 0 }}
                  animate={whatIsInView ? { x: 0, opacity: 1 } : {}}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-12 -right-12 bg-white/10 backdrop-blur-3xl p-10 rounded-[3rem] border border-white/20 shadow-2xl max-w-sm"
                >
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-[var(--background)] shadow-xl rotate-3">
                      <Star size={32} />
                    </div>
                    <div>
                      <div className="text-white font-black text-3xl">500+</div>
                      <div className="text-white/50 text-xs font-bold uppercase tracking-widest">Global Clients</div>
                    </div>
                  </div>
                  <p className="text-white/70 text-lg font-medium leading-normal">
                    Temukan kredibilitas bisnis Anda di lokasi paling strategis.
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Facilities Section */}
        <section 
          ref={facilitiesRef}
          data-analytics="vo_facilities_section"
          className="py-40 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={facilitiesInView ? { opacity: 1, y: 0 } : {}}
              className="text-center mb-24"
            >
              <h2 className="text-5xl md:text-8xl font-black text-white mb-8 tracking-tighter">
                {t("virtual_office.facilitiesTitle")}
              </h2>
              <p className="text-white/40 text-2xl font-light max-w-2xl mx-auto">
                {t("virtual_office.facilitiesSubtitle")}
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {facilities.map((fact, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={facilitiesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -15, backgroundColor: "rgba(255,255,255,0.08)" }}
                  className="p-12 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-md group transition-all duration-700"
                >
                  <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center text-[var(--background)] mb-10 shadow-2xl group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <fact.icon size={40} />
                  </div>
                  <h3 className="text-3xl font-black text-white leading-tight tracking-tight">
                    {fact.text}
                  </h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* List of Virtual Offices */}
        <section 
          ref={listRef}
          data-analytics="vo_list_section"
          className="py-40 bg-white/5 backdrop-blur-3xl border-y border-white/5 relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={listInView ? { opacity: 1, x: 0 } : {}}
              >
                <h2 className="text-5xl md:text-8xl font-black text-white mb-6 tracking-tighter">
                  {t("virtual_office.listTitle")}
                </h2>
                <p className="text-white/40 text-2xl font-light">
                  {t("virtual_office.listSubtitle")}
                </p>
              </motion.div>
              
              <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-full border border-white/10">
                 <div className="text-white font-black text-xs uppercase tracking-[0.4em] flex items-center gap-4">
                   <span>Swipe to explore</span>
                   <div className="w-12 h-0.5 bg-white/20" />
                   <ArrowRight size={20} className="animate-pulse" />
                 </div>
              </div>
            </div>
            
            <div className="flex gap-10 overflow-x-auto pb-20 snap-x snap-mandatory no-scrollbar px-2">
              {voList.map((vo, index) => (
                <motion.div
                  key={vo.id}
                  initial={{ opacity: 0, scale: 0.95, y: 50 }}
                  animate={listInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  whileHover={{ y: -25 }}
                  className="flex-shrink-0 w-[85vw] sm:w-[500px] bg-white text-[var(--background)] rounded-[4rem] overflow-hidden snap-center relative group shadow-[0_50px_100px_rgba(0,0,0,0.3)]"
                >
                  {/* Price Tag Floating */}
                  <div className="absolute top-10 left-10 z-30">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className="px-8 py-5 bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white"
                    >
                      <div className="text-[11px] font-black uppercase tracking-[0.2em] text-[var(--background)]/40 mb-1">{t("virtual_office.priceLabel")}</div>
                      <div className="text-3xl font-black text-[var(--background)] tracking-tighter">Rp {vo.price}<span className="text-sm font-bold opacity-30 ml-1">{t("virtual_office.perYear")}</span></div>
                    </motion.div>
                  </div>

                  <div className="relative aspect-[4/5] overflow-hidden">
                    <img 
                      src={vo.image} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
                      alt={vo.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-700" />
                    
                    <div className="absolute bottom-12 left-12 right-12 z-20">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                        <span className="text-white/60 text-xs font-black uppercase tracking-[0.3em]">{vo.address}</span>
                      </div>
                      <h3 className="text-4xl font-black text-white mb-10 leading-none tracking-tighter">
                        {vo.name}
                      </h3>
                      
                      <Link 
                        to={`/virtual-office/${vo.id}`}
                        onClick={() => api.logAnalytics({ category: 'conversion', action: 'click', label: `vo_item_${vo.name}` })}
                      >
                        <motion.button 
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-6 bg-white text-[var(--background)] rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-4 group/btn cursor-pointer"
                        >
                          {t("virtual_office.cta")}
                          <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </motion.button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
