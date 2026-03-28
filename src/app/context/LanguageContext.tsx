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
      title_alt: "Tentang Kelar.co.id",
      ourServices: "Layanan Kami:",
      contactUs: "Hubungi Kami",
      socialMedia: "Media Sosial",
      history: "Sejarah kelar.co.id",
      viewMore: "Lihat Selengkapnya",
    },
    promo: {
      title: "Promo Terbatas",
      subtitle: "Promo berlaku untuk 10 klien pertama di bulan April 2026!",
    },
    services_section: {
      title: "Layanan Kami",
      subtitle: "Solusi lengkap untuk pertumbuhan bisnis Anda",
      cta: "Cek Harga & Layanan",
      item1: {
        title: "Konsultasi & Kepengurusan E-katalog LKPP",
        desc: "Dapatkan pendampingan profesional untuk mempermudah pendaftaran dan tata kelola E-katalog LKPP usaha Anda."
      },
      item2: {
        title: "Kepengurusan Perizinan & Sertifikasi (OSS, NIB, PKKPR, TKDN, Merk Dagang, dll)",
        desc: "Kami bantu urus semua izin dasar dan sertifikasi tambahan agar usaha Anda sah dan siap berkembang."
      },
      item3: {
        title: "Penerbitan Legalitas Usaha (PT / CV / Koperasi / Yayasan / Organisasi, dll)",
        desc: "Layanan pendirian dan pengesahan badan usaha resmi, cepat, dan sepenuhnya sesuai dengan regulasi hukum yang berlaku."
      },
      item4: {
        title: "Konsultasi & Pelaporan Pajak Profesional",
        desc: "Kami membantu manajemen perpajakan dan pelaporan secara akurat untuk meminimalkan risiko denda serta memaksimalkan efisiensi keuangan."
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
      subtitle: "Informasi terkini seputar legalitas usaha, perizinan, pajak, dan pengadaan pemerintah",
      readMore: "Baca Artikel",
      publishedOn: "Dipublikasikan pada",
      title_alt: "Artikel & Tips",
      subtitle_alt:
        "Pelajari tips seputar pendirian PT/CV, perizinan & sertifikasi, E-Katalog LKPP, hingga pelaporan pajak untuk mengembangkan bisnis Anda",
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
      services: {
        addService: "Tambah Layanan",
        editService: "Edit Layanan",
        addNew: "Tambah Layanan Baru",
        totalServices: "Total Layanan",
        serviceName: "Nama Layanan",
        slugUrl: "Slug URL",
        subtitle: "Penjelasan Singkat (Subtitle)",
        fullInfo: "Informasi Lengkap",
        icons: "Icons (Multiupload)",
        gradientColor: "Warna (Gradient Class)",
        packages: "Paket Layanan",
        addPackage: "Tambah Paket",
        packageName: "Nama Paket",
        displayPrice: "Harga (Tampil)",
        customWaMessage: "Pesan Custom WhatsApp (Opsional)",
        setPopular: "Set sebagai Paket Populer",
        features: "Fitur / Keuntungan",
        addFeature: "+ Add Item",
        noPackages: "Belum ada paket ditambahkan",
        addFirstPackage: "Tambah paket pertama",
        saving: "Menyimpan...",
        saveChanges: "Simpan Perubahan",
        slug: "Slug",
        package: "Paket",
        moveUp: "Pindah ke Atas",
        moveDown: "Pindah ke Bawah",
        deleteService: "Hapus Layanan",
        deleteSuccess: "Layanan berhasil dihapus",
        deleteFailed: "Gagal menghapus layanan",
        updateSuccess: "Layanan berhasil diupdate",
        addSuccess: "Layanan berhasil ditambahkan",
        updateFailed: "Gagal update layanan",
        addFailed: "Gagal tambah layanan",
        upload: "Upload",
        iconRecommendation: "* Rekomendasi 2-3 icon per layanan. Ukuran 500x500px.",
      },
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
      consultationNow: "Konsultasi Gratis Sekarang",
      consultationDesc: "Layanan konsultasi gratis maksimal diberikan selama",
      consultationMinutes: "15 menit",
      maybeLater: "Nanti Saja",
    },
    features: {
      sectionTitle: "Keunggulan kelar.co.id",
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
    landing: {
      scrollDown: "Scroll kebawah",
      viewDetailPrice: "Lihat Detail & Harga",
      promoFallbackTitle: "E-Katalog V6",
      promoFallbackTitleHighlight: "Offers",
      historyModalTitle: "Sejarah Kelar",
      historyModalSubtitle: "Langkah Memudahkan Anda Sejak Awal",
      closeWindow: "Tutup Jendela",
      promoDetailFallbackSubheader: "Rincian Promo Terbatas",
      claimPromo: "Klaim Promo Sekarang",
      maybeLater: "NANTI SAJA",
    },
    serviceDetail: {
      mostPopular: "Paling Diminati",
      serviceInfo: "Informasi Layanan",
      packageChoice: "Pilihan Paket",
      packageChoiceSubtitle: "Pilih paket yang paling sesuai dengan kebutuhan usaha Anda.",
      selectPackage: "Pilih Paket Ini",
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
      history: "History of kelar.co.id",
      viewMore: "View More",
    },
    promo: {
      title: "Limited Promo",
      subtitle: "Limited promo for the first 10 clients in April 2026!",
    },
    services_section: {
      title: "Our Services",
      subtitle: "Complete solutions for your business growth",
      cta: "Check Prices & Services",
      item1: {
        title: "Consultation & Management of LKPP E-catalog",
        desc: "Get professional assistance to simplify the registration and management of your business's LKPP E-catalog."
      },
      item2: {
        title: "Licensing & Certification Management (OSS, NIB, PKKPR, TKDN, Trademark, etc)",
        desc: "We help manage all basic permits and additional certifications to ensure your business is legal and ready to grow."
      },
      item3: {
        title: "Business Legality Issuance (PT / CV / Cooperative / Foundation / Organization, etc)",
        desc: "Establishment and validation services for official business entities, fast and fully compliant with applicable legal regulations."
      },
      item4: {
        title: "Professional Tax Consultation & Reporting",
        desc: "We assist with accurate tax management and reporting to minimize penalty risks and maximize financial efficiency."
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
      subtitle: "Latest insights on business legality, licensing, taxation, and government procurement",
      readMore: "Read Article",
      publishedOn: "Published on",
      title_alt: "Articles & Tips",
      subtitle_alt:
        "Learn tips about establishing PT/CV, licensing & certification, E-Catalog LKPP, and tax reporting to grow your business",
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
      services: {
        addService: "Add Service",
        editService: "Edit Service",
        addNew: "Add New Service",
        totalServices: "Total Services",
        serviceName: "Service Name",
        slugUrl: "Slug URL",
        subtitle: "Brief Description (Subtitle)",
        fullInfo: "Full Information",
        icons: "Icons (Multiupload)",
        gradientColor: "Color (Gradient Class)",
        packages: "Service Packages",
        addPackage: "Add Package",
        packageName: "Package Name",
        displayPrice: "Display Price",
        customWaMessage: "Custom WhatsApp Message (Optional)",
        setPopular: "Set as Popular Package",
        features: "Features / Benefits",
        addFeature: "+ Add Item",
        noPackages: "No packages added yet",
        addFirstPackage: "Add first package",
        saving: "Saving...",
        saveChanges: "Save Changes",
        slug: "Slug",
        package: "Package",
        moveUp: "Move Up",
        moveDown: "Move Down",
        deleteService: "Delete Service",
        deleteSuccess: "Service deleted successfully",
        deleteFailed: "Failed to delete service",
        updateSuccess: "Service updated successfully",
        addSuccess: "Service added successfully",
        updateFailed: "Failed to update service",
        addFailed: "Failed to add service",
        upload: "Upload",
        iconRecommendation: "* Recommended 2-3 icons per service. Size 500x500px.",
      },
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
      consultationNow: "Free Consultation Now",
      consultationDesc: "Free consultation service is given for a maximum of",
      consultationMinutes: "15 minutes",
      maybeLater: "Maybe Later",
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
    landing: {
      scrollDown: "Scroll down",
      viewDetailPrice: "View Details & Pricing",
      promoFallbackTitle: "E-Catalog V6",
      promoFallbackTitleHighlight: "Offers",
      historyModalTitle: "Kelar History",
      historyModalSubtitle: "Making It Easier For You Since Day One",
      closeWindow: "Close Window",
      promoDetailFallbackSubheader: "Limited Promo Details",
      claimPromo: "Claim Promo Now",
      maybeLater: "MAYBE LATER",
    },
    serviceDetail: {
      mostPopular: "Most Popular",
      serviceInfo: "Service Information",
      packageChoice: "Package Options",
      packageChoiceSubtitle: "Choose the package that best fits your business needs.",
      selectPackage: "Select This Package",
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
