import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useData } from "../../context/DataContext";
import { useLanguage } from "../../context/LanguageContext";
import {
  Plus,
  Edit2,
  Trash2,
  X,
  Upload,
  Link as LinkIcon,
  Eye,
  Loader2,
  ChevronUp,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";

export function HeroSliderPage() {
  const {
    heroSlides,
    articles,
    addHeroSlide,
    updateHeroSlide,
    deleteHeroSlide,
    moveHeroSlide,
  } = useData();
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<"url" | "upload">("url");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    id: string;
    title: string;
  }>({
    isOpen: false,
    id: "",
    title: "",
  });
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    redirectUrl: "",
    linkType: "article" as "article" | "section",
    status: "draft" as "published" | "draft" | "takedown",
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("description", formData.description);
      fd.append("redirect_url", formData.redirectUrl);
      fd.append("status", formData.status);

      if (imageSource === "upload" && selectedFile) {
        fd.append("image", selectedFile);
      } else if (imageSource === "url" && formData.image) {
        fd.append("image", formData.image);
      }

      if (editingId) {
        await updateHeroSlide(editingId, fd);
        toast.success("Hero slide berhasil diupdate!");
      } else {
        await addHeroSlide(fd);
        toast.success("Hero slide berhasil ditambahkan!");
      }
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan hero slide");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (id: string) => {
    const slide = heroSlides.find((s) => s.id === id);
    if (slide) {
      const isSection = slide.redirectUrl?.startsWith("/#");
      setFormData({
        title: slide.title || "",
        description: slide.description || "",
        image: slide.image || "",
        redirectUrl: slide.redirectUrl || "",
        linkType: isSection ? "section" : "article",
        status: slide.status || "draft",
      });
      setEditingId(id);
      setShowForm(true);
      setImageSource(
        slide.image && (slide.image.startsWith("http") || !slide.image)
          ? "url"
          : "upload",
      );
      setSelectedFile(null);
    }
  };

  const handleDelete = (id: string) => {
    const slide = heroSlides.find((s) => s.id === id);
    if (slide) {
      setDeleteModal({
        isOpen: true,
        id: slide.id,
        title: slide.title || "",
      });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: "",
      redirectUrl: "",
      linkType: "article",
      status: "draft",
    });
    setEditingId(null);
    setShowForm(false);
    setImageSource("url");
    setSelectedFile(null);
    setIsSaving(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return (
          <span className="px-6 py-2 bg-green-500/20 text-green-400 border border-green-500/30 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md">
            Published
          </span>
        );
      case "draft":
        return (
          <span className="px-6 py-2 bg-orange-500/20 text-orange-400 border border-orange-500/30 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md">
            Draft
          </span>
        );
      case "takedown":
        return (
          <span className="px-6 py-2 bg-red-500/20 text-red-400 border border-red-500/30 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg backdrop-blur-md">
            Takedown
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
              {t("admin.manageSlider")}
            </h1>
            <p className="text-white/80 font-medium">Kelola banner slider utama untuk halaman beranda Kelar.co.id</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95 text-lg"
          >
            <Plus size={24} />
            <span>{t("admin.addSlide")}</span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-blue-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-blue-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-2xl w-full max-h-[90vh] overflow-y-auto relative">
              <div className="flex items-center justify-between p-8 border-b border-white/10 sticky top-0 bg-blue-900/60 backdrop-blur-3xl z-10">
                <h2 className="text-3xl font-black text-white tracking-tight">
                  {editingId
                    ? `${t("admin.edit")} Hero Slide`
                    : `${t("admin.addSlide")}`}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-white/60 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.title")}
                  </label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.description")}
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.image")}
                  </label>
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setImageSource("url")}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all font-black text-xs uppercase tracking-widest ${
                        imageSource === "url"
                          ? "bg-white text-[var(--background)] border-white shadow-xl"
                          : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <LinkIcon size={16} />
                      URL Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSource("upload")}
                      className={`flex items-center gap-2 px-6 py-3 rounded-xl border transition-all font-black text-xs uppercase tracking-widest ${
                        imageSource === "upload"
                          ? "bg-white text-[var(--background)] border-white shadow-xl"
                          : "bg-white/5 text-white/40 border-white/10 hover:bg-white/10"
                      }`}
                    >
                      <Upload size={16} />
                      Upload File
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                       {imageSource === "url" ? (
                        <input
                          type="url"
                          value={
                            (formData.image || "").startsWith("data:")
                              ? ""
                              : formData.image || ""
                          }
                          onChange={(e) =>
                            setFormData({ ...formData, image: e.target.value })
                          }
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                          placeholder="https://example.com/image.jpg"
                          required={!formData.image}
                        />
                      ) : (
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                          required={!formData.image}
                        />
                      )}
                    </div>
                  </div>
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    Tipe Tautan
                  </label>
                  <div className="flex gap-4 mb-3">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="linkType"
                        value="article"
                        checked={formData.linkType === "article"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            linkType: "article",
                            redirectUrl: "",
                          })
                        }
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 bg-white/5 border-white/20"
                      />
                      <span className="text-sm text-white font-medium">
                        Artikel
                      </span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="linkType"
                        value="section"
                        checked={formData.linkType === "section"}
                        onChange={() =>
                          setFormData({
                            ...formData,
                            linkType: "section",
                            redirectUrl: "",
                          })
                        }
                        className="w-4 h-4 text-blue-500 focus:ring-blue-500 bg-white/5 border-white/20"
                      />
                      <span className="text-sm text-white font-medium">
                        Section Halaman
                      </span>
                    </label>
                  </div>

                  {formData.linkType === "article" ? (
                    <select
                      value={formData.redirectUrl || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          redirectUrl: e.target.value,
                        })
                      }
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="">Pilih Artikel</option>
                      {articles
                        .filter((a) => a.status === "published")
                        .map((article) => (
                          <option key={article.id} value={article.id}>
                            {article.title}
                          </option>
                        ))}
                    </select>
                  ) : (
                    <select
                      value={formData.redirectUrl || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          redirectUrl: e.target.value,
                        })
                      }
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                      required
                    >
                      <option value="" className="bg-blue-900">Pilih Section</option>
                      <option value="/#home" className="bg-blue-900">Beranda</option>
                      <option value="/#about" className="bg-blue-900">Tentang Kami</option>
                      <option value="/#artikel" className="bg-blue-900">Artikel</option>
                      <option value="/#contact" className="bg-blue-900">Kontak</option>
                    </select>
                  )}
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.status")}
                  </label>
                  <select
                    value={formData.status || "draft"}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value as any,
                      })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all appearance-none cursor-pointer"
                    required
                  >
                    <option value="draft" className="bg-blue-900">{t("admin.draft")}</option>
                    <option value="published" className="bg-blue-900">{t("admin.published")}</option>
                    <option value="takedown" className="bg-blue-900">{t("admin.takedown")}</option>
                  </select>
                </div>

                <div className="flex gap-4 pt-8">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving && <Loader2 className="animate-spin" size={20} />}
                    {editingId ? t("admin.update") : t("admin.save")}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSaving}
                    className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all font-black"
                  >
                    {t("admin.cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content - Table for Desktop, Cards for Mobile */}
        <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.02] rounded-full blur-[100px] pointer-events-none" />
          {heroSlides.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <p className="text-white/60 mb-6 text-lg font-medium">
                Belum ada hero slide
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95"
              >
                Tambah Hero Slide Pertama
              </button>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-white/5">
                {heroSlides.map((slide) => (
                  <div
                    key={slide.id}
                    className="p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex gap-6">
                      <div className="relative w-24 h-24 rounded-2xl flex-shrink-0 shadow-lg border border-white/10 overflow-hidden">
                        <div
                          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${slide.image})` }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent dark:from-black/90 dark:via-black/50 dark:to-transparent" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1 truncate">
                          {slide.title}
                        </h3>
                        <p className="text-sm text-white/60 mb-4 line-clamp-2">
                          {slide.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(slide.status)}
                          <div className="flex gap-1 sm:gap-2">
                            <button
                              onClick={() => moveHeroSlide(slide.id, "up")}
                              className="p-1.5 text-white/70 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                              title="Pindah ke Atas"
                              disabled={heroSlides.indexOf(slide) === 0}
                            >
                              <ChevronUp size={16} />
                            </button>
                            <button
                              onClick={() => moveHeroSlide(slide.id, "down")}
                              className="p-1.5 text-white/70 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                              title="Pindah ke Bawah"
                              disabled={
                                heroSlides.indexOf(slide) ===
                                heroSlides.length - 1
                              }
                            >
                              <ChevronDown size={16} />
                            </button>
                            <button
                              onClick={() => handleEdit(slide.id)}
                              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(slide.id)}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              title={t("admin.delete")}
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Desktop Table View */}
              <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                        {t("admin.preview")}
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                        {t("admin.title")}
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                        {t("admin.description")}
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                        {t("admin.status")}
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                        {t("admin.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {heroSlides.map((slide) => (
                      <tr
                        key={slide.id}
                        className="hover:bg-white/10 transition-all duration-300 group border-b border-white/5 last:border-0"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-white max-w-xs">
                            {slide.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-white/60 max-w-md line-clamp-2">
                            {slide.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(slide.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-1 border-r border-white/10 pr-2 mr-2">
                            <button
                              onClick={() => moveHeroSlide(slide.id, "up")}
                              className="p-1.5 text-white/70 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                              title="Pindah ke Atas"
                              disabled={heroSlides.indexOf(slide) === 0}
                            >
                              <ChevronUp size={18} />
                            </button>
                            <button
                              onClick={() => moveHeroSlide(slide.id, "down")}
                              className="p-1.5 text-white/70 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-30"
                              title="Pindah ke Bawah"
                              disabled={
                                heroSlides.indexOf(slide) ===
                                heroSlides.length - 1
                              }
                            >
                              <ChevronDown size={18} />
                            </button>
                          </div>
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => handleEdit(slide.id)}
                              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(slide.id)}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              title={t("admin.delete")}
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Delete Confirm Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, id: "", title: "" })}
        onConfirm={() => {
          deleteHeroSlide(deleteModal.id);
          toast.success("Hero slide berhasil dihapus!");
          setDeleteModal({ isOpen: false, id: "", title: "" });
        }}
        title="Hapus Hero Slide"
        message="Anda yakin ingin menghapus hero slide ini?"
        itemName={deleteModal.title}
      />
    </AdminLayout>
  );
}
