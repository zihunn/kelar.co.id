import { useEffect } from "react";
import { useParams, Navigate } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { ShieldCheck, Building2, BarChart3, Award, CheckCircle2, Phone } from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

export function ServiceDetailPage() {
  const { id: slug } = useParams<{ id: string }>();
  const { services, aboutUs } = useData();
  const { t } = useLanguage();

  const service = services.find((s) => s.slug === slug);


  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const yParallax = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const opacityParallax = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!service) {
    return <Navigate to="/#layanan" replace />;
  }


  return (
    <div className="min-h-screen bg-[var(--background)] flex flex-col font-sans text-white overflow-hidden">
      <Navbar />

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative h-[50vh] md:h-[60vh] flex flex-col justify-end pb-32 overflow-hidden">
        <motion.div style={{ y: yParallax }} className="absolute inset-0 w-full h-full relative z-0">
          <img src={service.bgImage || "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80"} alt={service.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-[var(--background)]/80 to-transparent" />
          <div className="absolute inset-0 bg-[var(--background)]/40" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div style={{ opacity: opacityParallax }} className="w-full">
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-8 shadow-xl`}
            >
              <img src={service.icons?.[0] || ""} alt={service.title} className="w-8 h-8 object-contain drop-shadow" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-tight tracking-tight text-white whitespace-nowrap overflow-hidden text-ellipsis"
            >
              {service.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl font-light text-white/80"
            >
              {service.subtitle}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Description Section with Parallax Cards */}
      <section ref={contentRef} className="py-12 relative z-10 bg-[var(--background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <motion.div
            className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 md:p-14 mb-20 shadow-2xl relative overflow-hidden -mt-24 sm:-mt-32"
          >
            <div className={`absolute -top-32 -right-32 w-64 h-64 rounded-full bg-gradient-to-br ${service.color} blur-[100px] opacity-20`} />
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white text-balance tracking-tight">{t("serviceDetail.serviceInfo")}</h2>
            <p className="text-lg md:text-xl leading-relaxed text-white/70 font-light text-left text-balance whitespace-pre-line">
              {service.description}
            </p>
          </motion.div>

          {/* Pricing / Packages */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-white tracking-tight">{t("serviceDetail.packageChoice")}</h2>
            <div className={`w-24 h-2 bg-gradient-to-r ${service.color} mx-auto rounded-full mb-6`} />
            <p className="text-white/60 text-lg">{t("serviceDetail.packageChoiceSubtitle")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-12 items-stretch">
            {service.packages.map((pkg: any, idx: number) => (
              <motion.div
                key={pkg.id || idx}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                viewport={{ once: true }}
                className={`relative flex flex-col bg-slate-900 border rounded-[2.5rem] p-8 md:p-10 shadow-xl overflow-hidden group hover:-translate-y-2 transition-transform duration-500
                  ${pkg.isPopular ? 'border-[var(--kelar-primary)]/50' : 'border-white/10'}
                `}
              >
                {/* Popular Badge */}
                {pkg.isPopular && (
                  <div className="absolute top-0 right-0 bg-[var(--kelar-primary)] text-white text-[10px] uppercase tracking-widest font-black py-2 px-6 rounded-bl-2xl">
                    {t("serviceDetail.mostPopular")}
                  </div>
                )}

                {/* Background Glow */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl pointer-events-none`} />

                <h3 className="text-2xl font-bold text-white mb-2 relative z-10">{pkg.name}</h3>
                <div className="mb-8 relative z-10 flex items-baseline gap-2">
                  <span className="text-white/60 text-lg">Rp</span>
                  <span className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                    {pkg.price}
                  </span>
                </div>

                <div className="flex-grow relative z-10 mb-10 space-y-4">
                  {pkg.features.map((feature: string, fIdx: number) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-br ${service.color}`}>
                        <CheckCircle2 size={12} className="text-white" />
                      </div>
                      <span className="text-white/80 leading-snug font-medium text-sm md:text-base">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.a
                  href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}?text=${encodeURIComponent(pkg.whatsapp_message || `Halo Kelar, Saya tertarik dengan layanan ${service.title} - ${pkg.name}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`relative z-10 mt-auto w-full py-4 rounded-2xl font-black text-center transition-all flex items-center justify-center gap-2 overflow-hidden
                    ${pkg.isPopular
                      ? 'bg-[var(--kelar-primary)] text-white hover:bg-[var(--kelar-primary)]/90'
                      : 'bg-white/10 text-white hover:bg-white/20'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t("serviceDetail.selectPackage")}
                  <Phone size={16} />
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
