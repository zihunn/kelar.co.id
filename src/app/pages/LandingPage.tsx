import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { HeroSlider } from "../components/HeroSlider";
import { ArticleCard } from "../components/ArticleCard";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import {
  Instagram,
  Facebook,
  Linkedin,
  MapPin,
  Mail,
  Phone,
  CheckCircle2,
  Users,
  Award,
  Clock,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";

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
  const { articles, aboutUs, socialMedia } = useData();
  const { t } = useLanguage();

  // Only show published articles
  const publishedArticles = articles.filter((a) => a.status === "published");

  // Refs for scroll animations
  const [aboutRef, aboutInView] = useInView();
  const [statsRef, statsInView] = useInView();
  const [servicesRef, servicesInView] = useInView();
  const [articlesRef, articlesInView] = useInView();

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

  const services = [
    t("services.item1"),
    t("services.item2"),
    t("services.item3"),
    t("services.item4"),
    t("services.item5"),
    t("services.item6"),
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section id="home">
        <HeroSlider />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--kelar-primary)] opacity-5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-b from-[var(--kelar-bg-light)] to-white dark:from-gray-800 dark:to-gray-800 hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[var(--kelar-primary)] to-[var(--kelar-secondary)] rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-lg mb-2 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* About Us Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-br from-[var(--kelar-bg-light)] via-white to-[var(--kelar-bg-light)] dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 relative overflow-hidden transition-colors"
      >
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--kelar-secondary)] opacity-5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            ref={aboutRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--kelar-primary)] to-[var(--kelar-secondary)] bg-clip-text text-transparent">
              {t("about.title_alt")}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--kelar-primary)] to-[var(--kelar-secondary)] mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Description */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                {aboutUs.description}
              </p>

              {/* Stats */}
              <div ref={statsRef} className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <div className="text-3xl mb-2 bg-gradient-to-r from-[var(--kelar-primary)] to-[var(--kelar-secondary)] bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Services List */}
              <div ref={servicesRef}>
                <h3 className="text-2xl mb-6 text-[var(--kelar-secondary)] dark:text-blue-400">
                  {t("services.title")}
                </h3>
                <div className="space-y-3">
                  {services.map((service, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-3 group"
                      initial={{ opacity: 0, x: -20 }}
                      animate={servicesInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-[var(--kelar-primary)] to-[var(--kelar-secondary)] rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform">
                        <CheckCircle2 size={14} className="text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300">
                        {service}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact & Social Media */}
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700"
              initial={{ opacity: 0, x: 50 }}
              animate={aboutInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-[var(--kelar-primary)] to-[var(--kelar-secondary)] rounded-2xl flex items-center justify-center">
                  <Mail className="text-white" size={24} />
                </div>
                <h3 className="text-2xl text-[var(--kelar-secondary)] dark:text-blue-400">
                  {t("about.contactUs")}
                </h3>
              </div>

              <div className="space-y-5 mb-10">
                <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[var(--kelar-bg-light)] dark:hover:bg-gray-700 transition-colors">
                  <MapPin
                    size={22}
                    className="text-[var(--kelar-primary)] mt-1 flex-shrink-0"
                  />
                  <span className="text-gray-700 dark:text-gray-300">
                    {aboutUs.address}
                  </span>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--kelar-bg-light)] dark:hover:bg-gray-700 transition-colors">
                  <Mail
                    size={22}
                    className="text-[var(--kelar-primary)] flex-shrink-0"
                  />
                  <a
                    href={`mailto:${aboutUs.email}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-[var(--kelar-primary)] transition-colors"
                  >
                    {aboutUs.email}
                  </a>
                </div>
                <div className="flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--kelar-bg-light)] dark:hover:bg-gray-700 transition-colors">
                  <Phone
                    size={22}
                    className="text-[var(--kelar-primary)] flex-shrink-0"
                  />
                  <a
                    href={`tel:${aboutUs.phone}`}
                    className="text-gray-700 dark:text-gray-300 hover:text-[var(--kelar-primary)] transition-colors"
                  >
                    {aboutUs.phone}
                  </a>
                </div>
              </div>

              <div>
                <h4 className="mb-5 text-lg text-[var(--kelar-secondary)] dark:text-blue-400">
                  {t("about.socialMedia")}
                </h4>
                <div className="flex gap-3">
                  <a
                    href={socialMedia.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-[var(--kelar-bg-light)] to-white dark:from-gray-700 dark:to-gray-700 rounded-2xl flex items-center justify-center hover:from-[var(--kelar-primary)] hover:to-[var(--kelar-secondary)] hover:text-white transition-all duration-300 hover:scale-110 shadow-md dark:text-gray-300"
                  >
                    <Instagram size={24} />
                  </a>
                  <a
                    href={socialMedia.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-[var(--kelar-bg-light)] to-white dark:from-gray-700 dark:to-gray-700 rounded-2xl flex items-center justify-center hover:from-[var(--kelar-primary)] hover:to-[var(--kelar-secondary)] hover:text-white transition-all duration-300 hover:scale-110 shadow-md dark:text-gray-300"
                  >
                    <Facebook size={24} />
                  </a>
                  <a
                    href={socialMedia.tiktok}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-[var(--kelar-bg-light)] to-white dark:from-gray-700 dark:to-gray-700 rounded-2xl flex items-center justify-center hover:from-[var(--kelar-primary)] hover:to-[var(--kelar-secondary)] hover:text-white transition-all duration-300 hover:scale-110 shadow-md dark:text-gray-300"
                  >
                    <TikTokIcon size={24} />
                  </a>
                  <a
                    href={socialMedia.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 bg-gradient-to-br from-[var(--kelar-bg-light)] to-white dark:from-gray-700 dark:to-gray-700 rounded-2xl flex items-center justify-center hover:from-[var(--kelar-primary)] hover:to-[var(--kelar-secondary)] hover:text-white transition-all duration-300 hover:scale-110 shadow-md dark:text-gray-300"
                  >
                    <Linkedin size={24} />
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section
        id="artikel"
        className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden transition-colors"
      >
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-[var(--kelar-primary)] opacity-5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            ref={articlesRef}
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={articlesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[var(--kelar-primary)] to-[var(--kelar-secondary)] bg-clip-text text-transparent">
              {t("articles.title_alt")}
            </h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-[var(--kelar-primary)] to-[var(--kelar-secondary)] mx-auto mb-6 rounded-full" />
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
              {t("articles.subtitle_alt")}
            </p>
          </motion.div>

          {publishedArticles.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-12">
              {t("articles.noArticles")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-br from-[var(--kelar-primary)] via-[var(--kelar-primary)] to-[var(--kelar-secondary)] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[var(--kelar-secondary)] opacity-20 rounded-full blur-3xl" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="w-20 h-20 mx-auto mb-6 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center">
              <TrendingUp size={40} className="text-white" />
            </div>
            <h2 className="text-4xl md:text-5xl mb-6">{t("cta.title")}</h2>
            <p className="text-xl mb-10 text-blue-100">{t("cta.subtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a
                href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-10 py-5 bg-white text-[var(--kelar-primary)] rounded-2xl hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-xl hover:scale-105 inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} />
                <span className="font-medium">{t("cta.whatsapp")}</span>
              </motion.a>
              <motion.a
                href={`mailto:${aboutUs.email}`}
                className="px-10 py-5 bg-transparent border-2 border-white text-white rounded-2xl hover:bg-white hover:text-[var(--kelar-primary)] transition-all duration-300 inline-flex items-center justify-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Mail size={20} />
                <span className="font-medium">{t("cta.email")}</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
