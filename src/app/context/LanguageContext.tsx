import React, { createContext, useContext, useState, ReactNode } from "react";

export type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const savedLang = localStorage.getItem("kelar-language") as Language;
    return savedLang || "id";
  });

  const setLanguage = (lang: Language) => {
    localStorage.setItem("kelar-language", lang);
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    const keys = key.split(".");
    let value: any = translations[language];

    for (const k of keys) {
      value = value?.[k];
    }

    return value || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

// Translations
const translations: Record<Language, any> = {
  id: {
    nav: {
      home: "Beranda",
      about: "Tentang Kami",
      services: "Layanan",
      articles: "Artikel",
      contact: "Kontak",
    },
    hero: {
      readMore: "Baca Selengkapnya",
    },
    about: {
      title: "Tentang Kelar.co.id",
      subtitle: "Partner Terpercaya untuk E-Katalog Anda",
      readMore: "Selengkapnya",
      title_alt: "Tentang Kelar",
      ourServices: "Layanan Kami:",
      contactUs: "Hubungi Kami",
      socialMedia: "Media Sosial",
    },
    promo: {
      title: "Promo Terbatas",
      subtitle: "Jangan lewatkan penawaran spesial untuk pendaftaran E-Katalog V6 Anda",
    },
    services_section: {
      title: "Layanan Kami",
      subtitle: "Solusi lengkap untuk pertumbuhan bisnis Anda",
      cta: "Konsultasi Sekarang",
      item1: {
        title: "Penerbitan Legalitas",
        desc: "Terbitkan usaha kamu mulai dari CV, PT, Koperasi, Yayasan, PMA, hingga Firma"
      },
      item2: {
        title: "Virtual Office",
        desc: "Hadirkan kantor non fisik dengan biaya terjangkau dan profesional untuk membantu mendirikan dan mengembangkan bisnis Anda."
      },
      item3: {
        title: "Konsultasi Pajak & Akuntansi",
        desc: "Layanan penyusunan laporan perpajakan dan keuangan, baik perorangan maupun perusahaan"
      },
      item4: {
        title: "Branding Usaha",
        desc: "Layanan yang komprehensif untuk membantu Anda membangun identitas merek yang efektif dan menarik."
      }
    },
    virtual_office: {
      title: "Virtual Office",
      subtitle: "Solusi Kantor Modern untuk Bisnis Anda",
      whatIsTitle: "Apa itu Virtual Office?",
      whatIsDesc: "Virtual Office adalah layanan alamat bisnis prestisius yang memungkinkan Anda untuk bekerja dari mana saja tanpa harus memiliki kantor fisik secara permanen. Sangat cocok bagi UMKM, Startup, dan Profesional yang ingin membangun kredibilitas bisnis dengan biaya efisien.",
      facilitiesTitle: "Fasilitas Premium",
      facilitiesSubtitle: "Segala yang Anda butuhkan untuk operasional bisnis profesional",
      facilities: {
        item1: "Alamat Bisnis Bergengsi",
        item2: "Layanan Penerimaan Surat & Paket",
        item3: "Layanan Resepsionis Profesional",
        item4: "Akses Ruang Meeting & Coworking",
        item5: "Nomor Telepon Khusus Perusahaan",
        item6: "Legalitas Domisili Perusahaan"
      },
      listTitle: "Lokasi Virtual Office Kami",
      listSubtitle: "Pilih lokasi terbaik untuk kredibilitas bisnis Anda",
      priceLabel: "Mulai dari",
      perYear: "/ tahun",
      cta: "Pesan Sekarang",
      location: "Lokasi",
      facilitiesLabel: "Fasilitas",
      map: "Peta Lokasi",
      contactTitle: "Tertarik dengan Lokasi Ini?",
      contactDesc: "Hubungi tim kami untuk konsultasi gratis dan penawaran terbaik untuk bisnis Anda.",
      backToList: "Kembali ke Daftar"
    },
    articles: {
      title: "Artikel & Berita",
      subtitle: "Informasi terkini seputar E-Katalog dan pengadaan pemerintah",
      readMore: "Baca Artikel",
      publishedOn: "Dipublikasikan pada",
      title_alt: "Artikel & Tips",
      subtitle_alt:
        "Pelajari lebih lanjut tentang proses pengadaan pemerintah dan tips sukses mendaftar E-Katalog V6",
      noArticles: "Belum ada artikel yang dipublikasikan",
    },
    footer: {
      tagline: "Partner terpercaya untuk kebutuhan E-Katalog V6 Anda",
      description:
        "Partner terpercaya untuk pendaftaran E-Katalog V6 pengadaan pemerintah",
      quickLinks: "Link Cepat",
      contact: "Kontak",
      contactTitle: "Kontak",
      phone: "Telepon",
      email: "Email",
      address: "Alamat",
      social: "Media Sosial",
      followUs: "Ikuti Kami",
      rights: "Hak Cipta Dilindungi",
      madeWith: "Dibuat dengan",
      by: "oleh Tim Kelar",
      copyright: "Hak cipta dilindungi.",
    },
    admin: {
      dashboard: "Dashboard",
      heroSlider: "Hero Slider",
      articles: "Artikel",
      aboutUs: "About Us",
      logout: "Keluar",
      login: "Masuk",
      username: "Username",
      password: "Password",
      overview: "Dashboard Overview",
      stats: {
        heroSlides: "Hero Slides",
        totalArticles: "Total Artikel",
        published: "Artikel Published",
        draft: "Artikel Draft",
      },
      quickActions: "Quick Actions",
      manageSlider: "Kelola Hero Slider",
      manageArticles: "Kelola Artikel",
      manageAbout: "Kelola About Us & Media Sosial",
      managePromos: "Kelola Promo",
      promos: "Promo",
      recentArticles: "Artikel Terbaru",
      noArticles: "Belum ada artikel",
      addSlide: "Tambah Slide",
      addArticle: "Tambah Artikel",
      addPromo: "Tambah Promo",
      addFirstArticle: "Tambah Artikel Pertama",
      addFirstPromo: "Tambah Promo Pertama",
      article: "Artikel",
      promo: "Promo",
      edit: "Edit",
      delete: "Hapus",
      save: "Simpan",
      cancel: "Batal",
      update: "Update",
      title: "Judul",
      description: "Deskripsi",
      image: "Gambar",
      thumbnail: "Thumbnail",
      content: "Konten",
      excerpt: "Ringkasan",
      excerptPlaceholder: "Ringkasan singkat artikel...",
      date: "Tanggal",
      status: "Status",
      published: "Published",
      draft: "Draft",
      takedown: "Takedown",
      preview: "Preview",
      actions: "Aksi",
      companyInfo: "Informasi Perusahaan",
      companyDescription: "Deskripsi Perusahaan",
      address: "Alamat",
      email: "Email",
      phone: "Nomor Telepon",
      whatsappFormat: "Format: nomor tanpa tanda +, contoh: 081122218988",
      socialMedia: "Media Sosial",
      twitterOptional: "Twitter (Opsional)",
      saveChanges: "Simpan Semua Perubahan",
      deleteArticle: "Hapus Artikel",
      deletePromo: "Hapus Promo",
      confirmDeleteArticle: "Anda yakin ingin menghapus artikel ini?",
      confirmDeletePromo: "Anda yakin ingin menghapus promo ini?",
      deleteConfirm: {
        title: "Hapus",
        message: "Anda yakin ingin menghapus item ini?",
        yes: "Ya, Hapus",
        no: "Batal",
        warning: "Aksi ini tidak dapat dibatalkan!",
      },
      promoName: "Nama Promo",
      promoImage: "Gambar Promo",
    },
    settings: {
      theme: "Tema",
      language: "Bahasa",
      lightMode: "Mode Terang",
      darkMode: "Mode Gelap",
    },
    common: {
      notFound: "Halaman tidak ditemukan",
      backToHome: "Kembali ke Beranda",
      loading: "Memuat...",
      error: "Terjadi kesalahan",
      whatsapp: "Hubungi via WhatsApp",
      email: "Kirim Email",
      consultation: "Konsultasi Gratis",
    },
    features: {
      sectionTitle: "Keunggulan Kelar",
      item1: {
        title: "Proses Mudah & Cepat",
        desc: "Dengan pendampingan dari Kelar, Toko kamu akan tayang dalam waktu singkat!",
      },
      item2: {
        title: "Tim Berpengalaman",
        desc: "Didukung Tim ahli Kami yang memahami regulasi pengadaan pemerintah",
      },
      item3: {
        title: "Tingkat Keberhasilan Tinggi",
        desc: "Ratusan UMKM telah berhasil terdaftar dengan bantuan kami",
      },
      item4: {
        title: "Pendampingan Penuh",
        desc: "Konsultasi dan monitoring dari awal hingga produk Anda terdaftar",
      },
    },
    stats: {
      clients: "Klien Terdaftar",
      success: "Tingkat Keberhasilan",
      experience: "Tahun Pengalaman",
      support: "Layanan Support",
    },
    services: {
      title: "Layanan Kami:",
      item1: "Pendampingan lengkap pendaftaran E-Katalog V6",
      item2: "Konsultasi dan verifikasi dokumen",
      item3: "Penyusunan spesifikasi produk/jasa",
      item4: "Submit dan monitoring proses pendaftaran",
      item5: "Pelatihan penggunaan sistem E-Katalog",
      item6: "Update regulasi dan kebijakan terbaru",
    },
    cta: {
      title: "Siap Mendaftar E-Katalog V6?",
      subtitle: "Konsultasi gratis dengan tim profesional kami sekarang!",
      whatsapp: "Hubungi via WhatsApp",
      email: "Kirim Email",
    },
    articleDetail: {
      notFound: "Artikel Tidak Ditemukan",
      share: "Bagikan",
      copied: "Link artikel telah disalin!",
      otherArticles: "Artikel Lainnya",
      needHelp: "Butuh Bantuan Pendaftaran E-Katalog V6?",
      helpSubtitle: "Konsultasi gratis dengan tim Kelar sekarang!",
      contactUs: "Hubungi Kami",
    },
  },
  en: {
    nav: {
      home: "Home",
      about: "About Us",
      services: "Services",
      articles: "Articles",
      contact: "Contact",
    },
    hero: {
      readMore: "Read More",
    },
    about: {
      title: "About Kelar.co.id",
      subtitle: "Your Trusted Partner for E-Catalog",
      readMore: "Learn More",
      title_alt: "About Kelar",
      ourServices: "Our Services:",
      contactUs: "Contact Us",
      socialMedia: "Social Media",
    },
    promo: {
      title: "Limited Promo",
      subtitle: "Don't miss out on special offers for your E-Catalog V6 registration",
    },
    services_section: {
      title: "Our Services",
      subtitle: "Complete solutions for your business growth",
      cta: "Consult Now",
      item1: {
        title: "Legality Issuance",
        desc: "Publish your business starting from CV, PT, Cooperative, Foundation, PMA, to Firm"
      },
      item2: {
        title: "Virtual Office",
        desc: "Bring non-physical offices with affordable and professional costs to help set up and develop your business."
      },
      item3: {
        title: "Tax & Accounting Consultation",
        desc: "Tax and financial report preparation services, both individual and corporate"
      },
      item4: {
        title: "Business Branding",
        desc: "Comprehensive services to help you build an effective and attractive brand identity."
      }
    },
    virtual_office: {
      title: "Virtual Office",
      subtitle: "Modern Office Solutions for Your Business",
      whatIsTitle: "What is Virtual Office?",
      whatIsDesc: "Virtual Office is a prestigious business address service that allows you to work from anywhere without having to own a permanent physical office. Perfect for MSMEs, Startups, and Professionals who want to build business credibility with cost efficiency.",
      facilitiesTitle: "Premium Facilities",
      facilitiesSubtitle: "Everything you need for professional business operations",
      facilities: {
        item1: "Prestigious Business Address",
        item2: "Mail & Package Handling Service",
        item3: "Professional Receptionist Service",
        item4: "Meeting Room & Coworking Access",
        item5: "Company Special Phone Number",
        item6: "Company Domicile Legality"
      },
      listTitle: "Our Virtual Office Locations",
      listSubtitle: "Choose the best location for your business credibility",
      priceLabel: "Starts from",
      perYear: "/ year",
      cta: "Book Now",
      location: "Location",
      facilitiesLabel: "Facilities",
      map: "Location Map",
      contactTitle: "Interested in This Location?",
      contactDesc: "Contact our team for a free consultation and the best offer for your business.",
      backToList: "Back to List"
    },
    articles: {
      title: "Articles & News",
      subtitle: "Latest information about E-Catalog and government procurement",
      readMore: "Read Article",
      publishedOn: "Published on",
      title_alt: "Articles & Tips",
      subtitle_alt:
        "Learn more about government procurement processes and success tips for E-Catalog V6 registration",
      noArticles: "No articles published yet",
    },
    footer: {
      tagline: "Your trusted partner for E-Catalog V6 needs",
      description:
        "Trusted partner for E-Catalog V6 government procurement registration",
      quickLinks: "Quick Links",
      contact: "Contact",
      contactTitle: "Contact",
      phone: "Phone",
      email: "Email",
      address: "Address",
      social: "Social Media",
      followUs: "Follow Us",
      rights: "All Rights Reserved",
      madeWith: "Made with",
      by: "by Kelar Team",
      copyright: "All rights reserved.",
    },
    admin: {
      dashboard: "Dashboard",
      heroSlider: "Hero Slider",
      articles: "Articles",
      aboutUs: "About Us",
      logout: "Logout",
      login: "Login",
      username: "Username",
      password: "Password",
      overview: "Dashboard Overview",
      stats: {
        heroSlides: "Hero Slides",
        totalArticles: "Total Articles",
        published: "Published Articles",
        draft: "Draft Articles",
      },
      quickActions: "Quick Actions",
      manageSlider: "Manage Hero Slider",
      manageArticles: "Manage Articles",
      manageAbout: "Manage About Us & Social Media",
      managePromos: "Manage Promos",
      promos: "Promos",
      recentArticles: "Recent Articles",
      noArticles: "No articles yet",
      addSlide: "Add Slide",
      addArticle: "Add Article",
      addPromo: "Add Promo",
      addFirstArticle: "Add First Article",
      addFirstPromo: "Add First Promo",
      article: "Article",
      promo: "Promo",
      edit: "Edit",
      delete: "Delete",
      save: "Save",
      cancel: "Cancel",
      update: "Update",
      title: "Title",
      description: "Description",
      image: "Image",
      thumbnail: "Thumbnail",
      content: "Content",
      excerpt: "Excerpt",
      excerptPlaceholder: "Brief article summary...",
      date: "Date",
      status: "Status",
      published: "Published",
      draft: "Draft",
      takedown: "Takedown",
      preview: "Preview",
      actions: "Actions",
      companyInfo: "Company Information",
      companyDescription: "Company Description",
      address: "Address",
      email: "Email",
      phone: "Phone Number",
      whatsappFormat: "Format: number without + sign, example: 081122218988",
      socialMedia: "Social Media",
      twitterOptional: "Twitter (Optional)",
      saveChanges: "Save All Changes",
      deleteArticle: "Delete Article",
      deletePromo: "Delete Promo",
      confirmDeleteArticle: "Are you sure you want to delete this article?",
      confirmDeletePromo: "Are you sure you want to delete this promo?",
      deleteConfirm: {
        title: "Delete",
        message: "Are you sure you want to delete this item?",
        yes: "Yes, Delete",
        no: "Cancel",
        warning: "This action cannot be undone!",
      },
      promoName: "Promo Name",
      promoImage: "Promo Image",
    },
    settings: {
      theme: "Theme",
      language: "Language",
      lightMode: "Light Mode",
      darkMode: "Dark Mode",
    },
    common: {
      notFound: "Page not found",
      backToHome: "Back to Home",
      loading: "Loading...",
      error: "An error occurred",
      whatsapp: "Contact via WhatsApp",
      email: "Send Email",
      consultation: "Free Consultation",
    },
    features: {
      sectionTitle: "Why Choose Kelar?",
      item1: {
        title: "Easy & Fast Process",
        desc: "With Kelar's assistance, your store will be live in a short time!",
      },
      item2: {
        title: "Experienced Team",
        desc: "Supported by our expert team who understand government procurement regulations",
      },
      item3: {
        title: "High Success Rate",
        desc: "Hundreds of MSMEs have successfully registered with our help",
      },
      item4: {
        title: "Full Assistance",
        desc: "Consultation and monitoring from start until your product is registered",
      },
    },
    stats: {
      clients: "Registered Clients",
      success: "Success Rate",
      experience: "Years of Experience",
      support: "Support Service",
    },
    services: {
      title: "Our Services:",
      item1: "Complete E-Catalog V6 registration assistance",
      item2: "Document consultation and verification",
      item3: "Product/service specification preparation",
      item4: "Submission and monitoring of registration process",
      item5: "E-Catalog system usage training",
      item6: "Latest regulation and policy updates",
    },
    cta: {
      title: "Ready to Register E-Catalog V6?",
      subtitle: "Free consultation with our professional team now!",
      whatsapp: "Contact via WhatsApp",
      email: "Send Email",
    },
    articleDetail: {
      notFound: "Article Not Found",
      share: "Share",
      copied: "Article link copied!",
      otherArticles: "Other Articles",
      needHelp: "Need Help with E-Catalog V6 Registration?",
      helpSubtitle: "Free consultation with Kelar team now!",
      contactUs: "Contact Us",
    },
  },
};
