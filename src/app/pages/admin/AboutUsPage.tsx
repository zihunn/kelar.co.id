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
              className="animate-spin text-[var(--kelar-primary)]"
              size={40}
            />
            <p className="text-gray-600 dark:text-gray-400">Memuat data...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl sm:text-3xl mb-6 sm:mb-8 dark:text-white font-bold">
          {t("admin.manageAbout")}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* About Us Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-semibold text-[var(--kelar-secondary)] dark:text-blue-400">
              {t("admin.companyInfo")}
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("admin.companyDescription")}
                </label>
                <textarea
                  value={aboutData.description}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, description: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] h-28 sm:h-32 transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t("admin.address")}
                </label>
                <textarea
                  value={aboutData.address}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, address: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] h-20 sm:h-24 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("admin.email")}
                  </label>
                  <input
                    type="email"
                    value={aboutData.email}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, email: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] transition-all"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t("admin.phone")}
                  </label>
                  <input
                    type="tel"
                    value={aboutData.phone}
                    onChange={(e) =>
                      setAboutData({ ...aboutData, phone: e.target.value })
                    }
                    className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] transition-all"
                    placeholder="081122218988"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  WhatsApp
                </label>
                <input
                  type="tel"
                  value={aboutData.whatsapp}
                  onChange={(e) =>
                    setAboutData({ ...aboutData, whatsapp: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] transition-all"
                  placeholder="081122218988"
                  required
                />
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {t("admin.whatsappFormat")}
                </p>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 lg:p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-xl sm:text-2xl mb-4 sm:mb-6 font-semibold text-[var(--kelar-secondary)] dark:text-blue-400">
              {t("admin.socialMedia")}
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Instagram
                </label>
                <input
                  type="url"
                  value={socialData.instagram}
                  onChange={(e) =>
                    setSocialData({ ...socialData, instagram: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] transition-all"
                  placeholder="https://www.instagram.com/kelar.co.id/"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Facebook
                </label>
                <input
                  type="url"
                  value={socialData.facebook}
                  onChange={(e) =>
                    setSocialData({ ...socialData, facebook: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] transition-all"
                  placeholder="https://www.facebook.com/kelar"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  TikTok
                </label>
                <input
                  type="url"
                  value={socialData.tiktok}
                  onChange={(e) =>
                    setSocialData({ ...socialData, tiktok: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] transition-all"
                  placeholder="https://www.tiktok.com/@kelar120"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={socialData.linkedin}
                  onChange={(e) =>
                    setSocialData({ ...socialData, linkedin: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] transition-all"
                  placeholder="https://linkedin.com/company/kelar"
                />
              </div>

              <div>
                <label className="block text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Twitter (X)
                </label>
                <input
                  type="url"
                  value={socialData.twitter}
                  onChange={(e) =>
                    setSocialData({ ...socialData, twitter: e.target.value })
                  }
                  className="w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] transition-all"
                  placeholder="https://twitter.com/kelar"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end sticky bottom-0 bg-gray-50 dark:bg-gray-900 py-4 z-10 sm:static sm:bg-transparent">
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center justify-center gap-2 px-6 sm:px-10 py-3 sm:py-4 text-sm sm:text-base bg-[var(--kelar-primary)] text-white rounded-xl hover:bg-[var(--kelar-primary-light)] transition-all shadow-lg active:scale-95 disabled:opacity-70 disabled:active:scale-100 w-full sm:w-auto font-bold"
            >
              {isSaving ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Menyimpan...
                </>
              ) : (
                <>
                  <Save size={18} className="sm:w-5 sm:h-5" />
                  {t("admin.saveChanges")}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
