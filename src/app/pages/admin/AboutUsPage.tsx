import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useLanguage } from "../../context/LanguageContext";
import { Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { api } from "../../services/api";

export function AboutUsPage() {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const [aboutData, setAboutData] = useState({
    description: "",
    address: "",
    email: "",
    phone: "",
    whatsapp: "",
  });
  const [socialData, setSocialData] = useState({
    instagram: "",
    facebook: "",
    twitter: "",
    linkedin: "",
    tiktok: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await api.getCompanySettings();
      if (data) {
        setAboutData({
          description: data.description || "",
          address: data.address || "",
          email: data.email || "",
          phone: data.phone || "",
          whatsapp: data.whatsapp || "",
        });
        setSocialData({
          instagram: data.instagram_link || "",
          facebook: data.facebook_link || "",
          twitter: data.twitter_link || "",
          linkedin: data.linkedin_link || "",
          tiktok: data.tiktok_link || "",
        });
      }
    } catch (err: any) {
      toast.error("Gagal mengambil data profil perusahaan");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const payload = {
      ...aboutData,
      instagram_link: socialData.instagram,
      facebook_link: socialData.facebook,
      twitter_link: socialData.twitter,
      linkedin_link: socialData.linkedin,
      tiktok_link: socialData.tiktok,
    };

    try {
      await api.updateCompanySettings(payload);
      toast.success("Informasi profil perusahaan berhasil diperbarui!");
    } catch (err: any) {
      toast.error(err.message || "Gagal memperbarui data");
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="min-h-[400px] flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2
              className="animate-spin text-white"
              size={40}
            />
            <p className="text-white/80 font-medium tracking-wide">Memuat data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
            {t("admin.manageAbout")}
          </h1>
          <p className="text-white/60 font-medium">Kelola informasi profil dan kontak resmi perusahaan Kelar.co.id</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* About Us Section */}
          <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
            
            <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6 relative z-10">
              <div className="w-12 h-1 bg-white rounded-full" />
              <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                {t("admin.companyInfo")}
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                  {t("admin.companyDescription")}
                </label>
                <textarea
                  value={aboutData.description}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, description: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32"
                  required
                />
              </div>

              <div>
                <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                  {t("admin.address")}
                </label>
                <textarea
                  value={aboutData.address}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, address: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.email")}
                  </label>
                  <input
                    type="email"
                    value={aboutData.email}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, email: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.phone")}
                  </label>
                  <input
                    type="tel"
                    value={aboutData.phone}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, phone: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="081122218988"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={aboutData.whatsapp}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, whatsapp: e.target.value })
                  }
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="081122218988"
                  required
                />
                <p className="text-xs text-white/40 font-medium mt-2 ml-1">
                  {t("admin.whatsappFormat")}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

            <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6 relative z-10">
              <div className="w-12 h-1 bg-white rounded-full" />
              <h2 className="text-2xl font-black text-white tracking-tight leading-none">
                {t("admin.socialMedia")}
              </h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={socialData.instagram}
                    onChange={(e) =>
                      setSocialData({ ...socialData, instagram: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="https://www.instagram.com/kelar.co.id/"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={socialData.facebook}
                    onChange={(e) =>
                      setSocialData({ ...socialData, facebook: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="https://www.facebook.com/kelar"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    TikTok
                  </label>
                  <input
                    type="url"
                    value={socialData.tiktok}
                    onChange={(e) =>
                      setSocialData({ ...socialData, tiktok: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="https://www.tiktok.com/@kelar120"
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    LinkedIn
                  </label>
                  <input
                    type="url"
                    value={socialData.linkedin}
                    onChange={(e) =>
                      setSocialData({ ...socialData, linkedin: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="https://linkedin.com/company/kelar"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    Twitter (X)
                  </label>
                  <input
                    type="url"
                    value={socialData.twitter}
                    onChange={(e) =>
                      setSocialData({ ...socialData, twitter: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="https://twitter.com/kelar"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-10">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-3 px-12 py-5 bg-white text-[var(--background)] rounded-[2rem] font-black text-xl shadow-2xl hover:bg-white/90 active:scale-95 disabled:opacity-70 disabled:active:scale-100 transition-all"
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  <span>Menyimpan...</span>
                </>
              ) : (
                <>
                  <Save size={24} />
                  <span>{t("admin.saveChanges")}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
