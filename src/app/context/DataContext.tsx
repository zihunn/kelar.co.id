import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export interface HeroSlide {
  id: string;
  title: string;
  description: string;
  image: string;
  redirectUrl: string;
  status: "published" | "draft" | "takedown";
}

export interface Article {
  id: string;
  title: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  date: string;
  status: "published" | "draft" | "takedown";
}

export interface AboutUs {
  description: string;
  address: string;
  email: string;
  phone: string;
  whatsapp: string;
}

export interface SocialMedia {
  instagram: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  tiktok: string;
}

interface DataContextType {
  heroSlides: HeroSlide[];
  articles: Article[];
  aboutUs: AboutUs;
  socialMedia: SocialMedia;
  addHeroSlide: (slide: FormData) => Promise<void>;
  updateHeroSlide: (id: string, slide: FormData) => Promise<void>;
  deleteHeroSlide: (id: string) => Promise<void>;
  moveHeroSlide: (id: string, direction: "up" | "down") => Promise<void>;
  addArticle: (article: FormData) => Promise<void>;
  updateArticle: (id: string, article: FormData) => Promise<void>;
  deleteArticle: (id: string) => Promise<void>;
  updateAboutUs: (about: Partial<AboutUs>) => void;
  updateSocialMedia: (social: Partial<SocialMedia>) => void;
  getArticleById: (id: string) => Article | undefined;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const STORAGE_KEY = "kelar-data";

const defaultData = {
  heroSlides: [
    {
      id: "1",
      title: "Solusi Praktis Pendaftaran E-Katalog V6",
      description:
        "Kami membantu UMKM dan vendor mensubmit produk/jasa ke E-Katalog V6 pengadaan pemerintah dengan mudah dan cepat",
      image:
        "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=1200&h=600&fit=crop",
      redirectUrl: "1",
      status: "published" as const,
    },
    {
      id: "2",
      title: "Pendampingan Lengkap dari Ahlinya",
      description:
        "Tim profesional kami siap memandu setiap tahapan proses pendaftaran katalog pengadaan pemerintah",
      image:
        "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=600&fit=crop",
      redirectUrl: "2",
      status: "published" as const,
    },
    {
      id: "3",
      title: "Raih Peluang Pengadaan Pemerintah",
      description:
        "Tingkatkan kesempatan bisnis Anda dengan terdaftar di sistem katalog pengadaan pemerintah",
      image:
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=600&fit=crop",
      redirectUrl: "3",
      status: "published" as const,
    },
  ],
  articles: [
    {
      id: "1",
      title: "Panduan Lengkap Pendaftaran E-Katalog V6",
      thumbnail:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=500&fit=crop",
      excerpt:
        "Pelajari langkah-langkah lengkap untuk mendaftarkan produk atau jasa Anda ke dalam E-Katalog V6 pengadaan pemerintah.",
      content: `
        <h2>Apa itu E-Katalog V6?</h2>
        <p>E-Katalog V6 adalah sistem katalog elektronik yang digunakan dalam pengadaan barang/jasa pemerintah di Indonesia. Sistem ini memudahkan proses pengadaan dengan menyediakan daftar produk dan jasa yang telah terverifikasi.</p>
        
        <h2>Mengapa Penting untuk UMKM?</h2>
        <p>Dengan terdaftar di E-Katalog V6, UMKM dan vendor memiliki peluang lebih besar untuk mendapatkan proyek pengadaan dari instansi pemerintah. Ini membuka akses ke pasar yang lebih luas dan meningkatkan kredibilitas bisnis.</p>
        
        <h2>Tahapan Pendaftaran</h2>
        <p>Proses pendaftaran meliputi beberapa tahapan penting:</p>
        <ol>
          <li>Persiapan dokumen perusahaan</li>
          <li>Registrasi akun di sistem LKPP</li>
          <li>Pengisian data produk/jasa</li>
          <li>Upload dokumen pendukung</li>
          <li>Verifikasi dan validasi</li>
        </ol>
        
        <h2>Bagaimana Kelar Membantu?</h2>
        <p>Tim Kelar siap mendampingi Anda di setiap tahapan, mulai dari persiapan dokumen hingga proses submit dan verifikasi. Kami memastikan semua persyaratan terpenuhi dengan benar.</p>
      `,
      date: "2026-02-05",
      status: "published" as const,
    },
    {
      id: "2",
      title: "Dokumen yang Diperlukan untuk E-Katalog V6",
      thumbnail:
        "https://images.unsplash.com/photo-1568992687947-868a62a9f521?w=800&h=500&fit=crop",
      excerpt:
        "Daftar lengkap dokumen yang harus disiapkan UMKM dan vendor untuk pendaftaran E-Katalog V6.",
      content: `
        <h2>Dokumen Perusahaan</h2>
        <p>Dokumen perusahaan yang wajib disiapkan meliputi:</p>
        <ul>
          <li>Akta Pendirian Perusahaan</li>
          <li>NPWP Perusahaan</li>
          <li>NIB (Nomor Induk Berusaha)</li>
          <li>Surat Domisili Usaha</li>
        </ul>
        
        <h2>Dokumen Produk/Jasa</h2>
        <p>Untuk setiap produk atau jasa yang akan didaftarkan, diperlukan:</p>
        <ul>
          <li>Spesifikasi teknis lengkap</li>
          <li>Foto produk berkualitas tinggi</li>
          <li>Sertifikat standar (jika ada)</li>
          <li>Daftar harga</li>
        </ul>
        
        <h2>Tips Persiapan Dokumen</h2>
        <p>Pastikan semua dokumen dalam format digital yang jelas dan mudah dibaca. Scan dokumen dengan resolusi minimal 300 dpi dan simpan dalam format PDF.</p>
      `,
      date: "2026-02-03",
      status: "published" as const,
    },
    {
      id: "3",
      title: "Keuntungan Menggunakan Jasa Kelar",
      thumbnail:
        "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&h=500&fit=crop",
      excerpt:
        "Mengapa memilih Kelar sebagai partner pendampingan pendaftaran E-Katalog V6 Anda?",
      content: `
        <h2>Proses Lebih Cepat</h2>
        <p>Dengan pengalaman dan keahlian tim kami, proses pendaftaran dapat diselesaikan lebih cepat dibanding mengurus sendiri. Kami memahami setiap detail persyaratan sistem.</p>
        
        <h2>Tingkat Keberhasilan Tinggi</h2>
        <p>Tim Kelar telah membantu ratusan UMKM dan vendor berhasil terdaftar di E-Katalog V6. Kami memastikan setiap dokumen dan data memenuhi standar yang ditetapkan.</p>
        
        <h2>Pendampingan Penuh</h2>
        <p>Anda tidak perlu bingung menghadapi proses yang rumit. Tim kami akan mendampingi dari awal hingga produk/jasa Anda berhasil masuk katalog.</p>
        
        <h2>Konsultasi Gratis</h2>
        <p>Kami menyediakan konsultasi gratis untuk membantu Anda memahami proses dan mempersiapkan kebutuhan pendaftaran.</p>
      `,
      date: "2026-02-01",
      status: "published" as const,
    },
    {
      id: "4",
      title: "Update Regulasi Pengadaan 2026",
      thumbnail:
        "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=500&fit=crop",
      excerpt:
        "Informasi terbaru mengenai perubahan regulasi pengadaan pemerintah tahun 2026.",
      content: `
        <h2>Perubahan Penting</h2>
        <p>Tahun 2026 membawa beberapa perubahan penting dalam sistem pengadaan pemerintah yang perlu diketahui oleh vendor dan UMKM.</p>
        
        <h2>Digitalisasi Penuh</h2>
        <p>Proses pengadaan kini sepenuhnya digital. Semua tahapan dilakukan melalui platform elektronik untuk transparansi dan efisiensi.</p>
        
        <h2>Prioritas UMKM</h2>
        <p>Pemerintah memberikan prioritas khusus untuk produk UMKM dalam negeri, membuka peluang lebih besar bagi pelaku usaha kecil menengah.</p>
      `,
      date: "2026-01-28",
      status: "published" as const,
    },
    {
      id: "5",
      title: "Tips Menyusun Spesifikasi Produk",
      thumbnail:
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=500&fit=crop",
      excerpt:
        "Cara menyusun spesifikasi produk yang tepat dan sesuai standar E-Katalog V6.",
      content: `
        <h2>Pentingnya Spesifikasi Detail</h2>
        <p>Spesifikasi produk yang detail dan akurat akan meningkatkan peluang produk Anda dipilih dalam proses pengadaan.</p>
        
        <h2>Format Standar</h2>
        <p>Gunakan format yang jelas dan terstruktur. Sertakan dimensi, material, kapasitas, dan fitur-fitur utama produk.</p>
        
        <h2>Foto Berkualitas</h2>
        <p>Sertakan foto produk dari berbagai sudut dengan pencahayaan yang baik dan resolusi tinggi.</p>
      `,
      date: "2026-01-25",
      status: "published" as const,
    },
    {
      id: "6",
      title: "Kesalahan Umum dalam Pendaftaran",
      thumbnail:
        "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=800&h=500&fit=crop",
      excerpt:
        "Hindari kesalahan-kesalahan umum yang sering terjadi saat mendaftar E-Katalog V6.",
      content: `
        <h2>Dokumen Tidak Lengkap</h2>
        <p>Salah satu kesalahan paling umum adalah dokumen yang tidak lengkap atau tidak sesuai format yang diminta.</p>
        
        <h2>Spesifikasi Tidak Jelas</h2>
        <p>Spesifikasi produk yang terlalu umum atau tidak detail dapat menyebabkan penolakan.</p>
        
        <h2>Foto Tidak Memenuhi Standar</h2>
        <p>Foto produk yang buram atau tidak menunjukkan produk dengan jelas akan ditolak sistem.</p>
        
        <h2>Cara Menghindari</h2>
        <p>Gunakan jasa pendampingan profesional seperti Kelar untuk memastikan semua persyaratan terpenuhi dengan benar.</p>
      `,
      date: "2026-01-22",
      status: "published" as const,
    },
  ],
  aboutUs: {
    description:
      "Kelar.co.id adalah partner terpercaya untuk membantu UMKM, vendor, dan perusahaan dalam mendaftarkan produk/jasa mereka ke E-Katalog V6 pengadaan pemerintah. Dengan tim profesional dan berpengalaman, kami memastikan proses pendaftaran berjalan lancar dan berhasil.",
    address:
      "South City Square 1, unit B1-07 Lantai 2&3, Jl. Raya wahyudi No.1, Pd. Cabe Udik, Kec. Ciputat, Kota Tangerang Selatan, Banten 15418",
    email: "info@kelar.co.id",
    phone: "081122218988",
    whatsapp: "081122218988",
  },
  socialMedia: {
    instagram: "https://www.instagram.com/kelar.co.id/",
    facebook: "https://web.facebook.com/people/Kelarcoid/61587642546213/",
    twitter: "https://twitter.com/kelar",
    linkedin: "https://linkedin.com/company/kelar",
    tiktok: "https://www.tiktok.com/@kelar120?_r=1&_t=ZS-93ls7eEBhfm",
  },
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
  const [articles, setArticles] = useState<Article[]>([]);
  const [aboutUs, setAboutUs] = useState<AboutUs>(defaultData.aboutUs);
  const [socialMedia, setSocialMedia] = useState<SocialMedia>(
    defaultData.socialMedia,
  );

  const fetchCompanySettings = async () => {
    try {
      const { api } = await import("../services/api");
      const data = await api.getCompanySettings();
      if (data) {
        setAboutUs({
          description: data.description || "",
          address: data.address || "",
          email: data.email || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
        });
        setSocialMedia({
          instagram: data.instagram_link || "",
          facebook: data.facebook_link || "",
          twitter: data.twitter_link || "",
          linkedin: data.linkedin_link || "",
          tiktok: data.tiktok_link || "",
        });
      }
    } catch (error) {
      console.error("Gagal fetch data profil perusahaan:", error);
    }
  };

  const loadArticles = async () => {
    try {
      const { api } = await import("../services/api");
      const res = await api.getArticles({ per_page: 100 });
      if (res.data) {
        const mappedArticles = res.data.map((a: any) => ({
          id: a.id.toString(),
          title: a.title,
          thumbnail: a.thumbnail,
          excerpt: a.summary,
          content: a.content,
          date: a.published_at || "",
          status: a.status as any,
        }));
        setArticles(mappedArticles);
      }
    } catch (error) {
      console.error("Gagal fetch artikel:", error);
    }
  };

  const loadHeroSliders = async () => {
    try {
      const { api } = await import("../services/api");
      const response = await api.getHeroSliders();
      if (response && response.data) {
        setHeroSlides(
          response.data.map((item: any) => ({
            id: item.id.toString(),
            title: item.title,
            description: item.description,
            image: item.image,
            redirectUrl: item.redirect_url || "",
            status: item.status,
          })),
        );
      }
    } catch (error) {
      console.error("Gagal mengambil sliders:", error);
    }
  };

  useEffect(() => {
    const init = async () => {
      await Promise.all([
        loadHeroSliders(),
        fetchCompanySettings(),
        loadArticles(),
      ]);
    };
    init();
  }, []);

  // Save to localStorage whenever data changes
  useEffect(() => {
    const dataToStore = {
      heroSlides,
      articles,
      aboutUs,
      socialMedia,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToStore));
  }, [heroSlides, articles, aboutUs, socialMedia]);

  const addHeroSlide = async (formData: FormData) => {
    try {
      const { api } = await import("../services/api");
      const data = await api.createHeroSlider(formData);
      if (data) {
        setHeroSlides([
          ...heroSlides,
          {
            id: data.id.toString(),
            title: data.title,
            description: data.description,
            image: data.image,
            redirectUrl: data.redirect_url || "",
            status: data.status,
          },
        ]);
      }
    } catch (error) {
      console.error("Gagal menambahkan slider:", error);
      throw error;
    }
  };

  const updateHeroSlide = async (id: string, formData: FormData) => {
    try {
      const { api } = await import("../services/api");
      const data = await api.updateHeroSlider(id, formData);
      if (data) {
        setHeroSlides(
          heroSlides.map((s) =>
            s.id === id
              ? {
                  ...s,
                  title: data.title,
                  description: data.description,
                  image: data.image,
                  redirectUrl: data.redirect_url || "",
                  status: data.status,
                }
              : s,
          ),
        );
      }
    } catch (error) {
      console.error(`Gagal memperbarui slider ${id}:`, error);
      throw error;
    }
  };

  const deleteHeroSlide = async (id: string) => {
    try {
      const { api } = await import("../services/api");
      await api.deleteHeroSlider(id);
      setHeroSlides(heroSlides.filter((s) => s.id !== id));
    } catch (error) {
      console.error(`Gagal menghapus slider ${id}:`, error);
      throw error;
    }
  };

  const moveHeroSlide = async (id: string, direction: "up" | "down") => {
    try {
      const { api } = await import("../services/api");
      await api.reorderHeroSlider(id, direction);

      // Update local state by swapping
      const index = heroSlides.findIndex((s) => s.id === id);
      const newSlides = [...heroSlides];
      if (direction === "up" && index > 0) {
        [newSlides[index], newSlides[index - 1]] = [
          newSlides[index - 1],
          newSlides[index],
        ];
        setHeroSlides(newSlides);
      } else if (direction === "down" && index < heroSlides.length - 1) {
        [newSlides[index], newSlides[index + 1]] = [
          newSlides[index + 1],
          newSlides[index],
        ];
        setHeroSlides(newSlides);
      }
    } catch (error) {
      console.error(`Gagal memindahkan slider ${id}:`, error);
      throw error;
    }
  };

  const addArticle = async (formData: FormData) => {
    try {
      const { api } = await import("../services/api");
      const data = await api.createArticle(formData);
      if (data) {
        const newArticle = {
          id: data.id.toString(),
          title: data.title,
          thumbnail: data.thumbnail,
          excerpt: data.summary,
          content: data.content,
          date: data.published_at || "",
          status: data.status as any,
        };
        setArticles([newArticle, ...articles]);
      }
    } catch (error) {
      console.error("Gagal menambahkan artikel:", error);
      throw error;
    }
  };

  const updateArticle = async (id: string, formData: FormData) => {
    try {
      const { api } = await import("../services/api");
      const data = await api.updateArticle(id, formData);
      if (data) {
        setArticles(
          articles.map((a) =>
            a.id === id
              ? {
                  ...a,
                  title: data.title,
                  thumbnail: data.thumbnail,
                  excerpt: data.summary,
                  content: data.content,
                  date: data.published_at || "",
                  status: data.status as any,
                }
              : a,
          ),
        );
      }
    } catch (error) {
      console.error(`Gagal memperbarui artikel ${id}:`, error);
      throw error;
    }
  };

  const deleteArticle = async (id: string) => {
    try {
      const { api } = await import("../services/api");
      await api.deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch (error) {
      console.error(`Gagal menghapus artikel ${id}:`, error);
      throw error;
    }
  };

  const updateAboutUs = (about: Partial<AboutUs>) => {
    setAboutUs({ ...aboutUs, ...about });
  };

  const updateSocialMedia = (social: Partial<SocialMedia>) => {
    setSocialMedia({ ...socialMedia, ...social });
  };

  const getArticleById = (id: string) => {
    return articles.find((a) => a.id === id);
  };

  return (
    <DataContext.Provider
      value={{
        heroSlides,
        articles,
        aboutUs,
        socialMedia,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        moveHeroSlide,
        addArticle,
        updateArticle,
        deleteArticle,
        updateAboutUs,
        updateSocialMedia,
        getArticleById,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
