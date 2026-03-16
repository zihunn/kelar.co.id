import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { 
  Building2, 
  MapPin, 
  Phone, 
  ArrowLeft,
  CheckCircle2,
  Calendar,
  CreditCard,
  MessageSquare
} from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

export function VirtualOfficeDetailPage() {
  const { id } = useParams();
  const { t } = useLanguage();
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const yParallax = useTransform(smoothProgress, [0, 1], [0, -100]);

  // Dummy Detail Data
  const voDetails = {
    "1": {
      name: "Kelar Hub Jakarta Selatan",
      address: "Gedung Menara Mulia Lt. 27, Jl. Jend. Gatot Subroto No.Kav. 9-11, Jakarta Selatan",
      city: "Jakarta Selatan",
      price: "2.900.000",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.27546682705!2d106.81534731476906!3d-6.22631729549287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e49866419d%3A0x600b336a5b28d3a3!2sMenara%20Mulia!5e0!3m2!1sid!2sid!4v1647854655489!5m2!1sid!2sid",
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?q=80&w=1200&auto=format&fit=crop"
      ],
      facilities: [
        t("virtual_office.facilities.item1"),
        t("virtual_office.facilities.item2"),
        t("virtual_office.facilities.item3"),
        t("virtual_office.facilities.item4"),
        t("virtual_office.facilities.item5"),
        t("virtual_office.facilities.item6"),
        "WiFi High Speed",
        "Free Mineral Water",
        "Printing & Scanning"
      ]
    },
    "2": {
      name: "Kelar Hub Jakarta Barat",
      address: "Lippo St. Moritz Tower Lt. 15, Jl. Puri Indah Raya, Jakarta Barat",
      city: "Jakarta Barat",
      price: "2.500.000",
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.6961445104593!2d106.73663361476883!3d-6.171424695531985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f104332f170f%3A0xf69f706214534f31!2sThe%20St.%20Moritz%20Puri%20Indah%20CBD!5e0!3m2!1sid!2sid!4v1647854890123!5m2!1sid!2sid",
      images: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?q=80&w=1200&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571624436279-b272afd7527a?q=80&w=1200&auto=format&fit=crop"
      ],
      facilities: [
        t("virtual_office.facilities.item1"),
        t("virtual_office.facilities.item2"),
        t("virtual_office.facilities.item4"),
        t("virtual_office.facilities.item6")
      ]
    }
  };

  const detail = voDetails[id as keyof typeof voDetails] || voDetails["1"];

  return (
    <div ref={containerRef} className="relative min-h-screen bg-background text-white selection:bg-white selection:text-[var(--background)] overflow-x-hidden">
      <Navbar />

      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <Link 
            to="/virtual-office"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors mb-12 group"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">{t("virtual_office.backToList")}</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Left Column: Images & Map */}
            <div className="lg:col-span-2 space-y-12">
              {/* Main Image Gallery */}
              <div className="space-y-6">
                <motion.div 
                  layoutId={`vo-img-${id}`}
                  className="aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl relative group"
                >
                  <img 
                    src={detail.images[activeImage]} 
                    className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                    alt={detail.name}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </motion.div>
                
                <div className="flex gap-4 overflow-x-auto no-scrollbar py-2">
                  {detail.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(idx)}
                      className={`flex-shrink-0 w-32 aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                        activeImage === idx ? "border-white scale-95" : "border-transparent opacity-50 hover:opacity-100"
                      }`}
                    >
                      <img src={img} className="w-full h-full object-cover" alt="" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Map Section */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[var(--background)]">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-white">{t("virtual_office.map")}</h2>
                    <p className="text-white/40 text-sm font-bold uppercase tracking-wider">{detail.city}</p>
                  </div>
                </div>
                
                <div className="w-full aspect-[21/9] rounded-[2rem] overflow-hidden border border-white/10">
                  <iframe 
                    src={detail.mapUrl}
                    className="w-full h-full grayscale opacity-80 hover:opacity-100 hover:grayscale-0 transition-all duration-700"
                    loading="lazy" 
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Right Column: Info & Facilities */}
            <div className="space-y-10">
              {/* Header Info */}
              <motion.div 
                style={{ y: yParallax }}
                className="bg-white/10 backdrop-blur-3xl rounded-[3rem] p-10 border border-white/20 shadow-2xl"
              >
                <div className="flex items-center gap-2 mb-6">
                   <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10 text-[10px] font-black uppercase tracking-widest text-white/60">
                     Verified Location
                   </div>
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tighter">
                  {detail.name}
                </h1>
                
                <div className="flex items-start gap-4 text-white/60 mb-10 group cursor-default">
                  <MapPin size={20} className="flex-shrink-0 mt-1" />
                  <p className="font-medium text-lg leading-relaxed group-hover:text-white transition-colors">{detail.address}</p>
                </div>

                <div className="pt-8 border-t border-white/10 mb-10">
                  <div className="text-xs font-black uppercase tracking-[0.3em] text-white/40 mb-2">{t("virtual_office.priceLabel")}</div>
                  <div className="text-5xl font-black text-white tracking-tighter">
                    Rp {detail.price}
                    <span className="text-lg font-bold opacity-30 ml-2">{t("virtual_office.perYear")}</span>
                  </div>
                </div>

                <motion.a
                  href={`https://wa.me/6281122218988?text=Halo Kelar.co.id, saya tertarik dengan Virtual Office ${detail.name}`}
                  target="_blank"
                  className="w-full py-6 bg-white text-[var(--background)] rounded-2xl font-black text-xl shadow-2xl flex items-center justify-center gap-4 group/btn hover:bg-white/90 transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageSquare size={24} />
                  <span>{t("virtual_office.cta")}</span>
                </motion.a>
              </motion.div>

              {/* Facilities Panel */}
              <div className="bg-white/5 backdrop-blur-2xl rounded-[3rem] p-10 border border-white/10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white">
                    <Building2 size={24} />
                  </div>
                  <h2 className="text-2xl font-black text-white">{t("virtual_office.facilitiesLabel")}</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-4">
                  {detail.facilities.map((fact, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                      <CheckCircle2 size={18} className="text-blue-400" />
                      <span className="text-white/70 font-bold text-sm tracking-tight">{fact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
