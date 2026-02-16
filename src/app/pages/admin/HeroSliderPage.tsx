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
      setFormData({
        title: slide.title || "",
        description: slide.description || "",
        image: slide.image || "",
        redirectUrl: slide.redirectUrl || "",
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
          <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
            Published
          </span>
        );
      case "draft":
        return (
          <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium">
            Draft
          </span>
        );
      case "takedown":
        return (
          <span className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 rounded-full text-xs font-medium">
            Takedown
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <AdminLayout>
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 sm:mb-8 gap-3">
          <h1 className="text-2xl sm:text-3xl dark:text-white">
            {t("admin.manageSlider")}
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors"
          >
            <Plus size={20} />
            <span className="text-sm sm:text-base">{t("admin.addSlide")}</span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b dark:border-gray-700">
                <h2 className="text-2xl dark:text-white">
                  {editingId
                    ? `${t("admin.edit")} Hero Slide`
                    : `${t("admin.addSlide")}`}
                </h2>
                <button
                  onClick={resetForm}
                  className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t("admin.title")}
                  </label>
                  <input
                    type="text"
                    value={formData.title || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t("admin.description")}
                  </label>
                  <textarea
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] h-24"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t("admin.image")}
                  </label>
                  <div className="flex gap-2 mb-3">
                    <button
                      type="button"
                      onClick={() => setImageSource("url")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        imageSource === "url"
                          ? "bg-[var(--kelar-primary)] text-white border-[var(--kelar-primary)]"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      <LinkIcon size={16} />
                      URL Link
                    </button>
                    <button
                      type="button"
                      onClick={() => setImageSource("upload")}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                        imageSource === "upload"
                          ? "bg-[var(--kelar-primary)] text-white border-[var(--kelar-primary)]"
                          : "bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
                      }`}
                    >
                      <Upload size={16} />
                      Upload File
                    </button>
                  </div>

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
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                      placeholder="https://example.com/image.jpg"
                      required={!formData.image}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                      required={!formData.image}
                    />
                  )}
                  {formData.image && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="mt-2 w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Link ke Artikel
                  </label>
                  <select
                    value={formData.redirectUrl || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, redirectUrl: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
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
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
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
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                    required
                  >
                    <option value="draft">{t("admin.draft")}</option>
                    <option value="published">{t("admin.published")}</option>
                    <option value="takedown">{t("admin.takedown")}</option>
                  </select>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="flex-1 py-3 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSaving && <Loader2 className="animate-spin" size={20} />}
                    {editingId ? t("admin.update") : t("admin.save")}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSaving}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                  >
                    {t("admin.cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Content - Table for Desktop, Cards for Mobile */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md overflow-hidden">
          {heroSlides.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm sm:text-base">
                Belum ada hero slide
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors text-sm sm:text-base"
              >
                Tambah Hero Slide Pertama
              </button>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {heroSlides.map((slide) => (
                  <div
                    key={slide.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-24 h-20 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-gray-200 mb-1 truncate">
                          {slide.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {slide.description}
                        </p>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(slide.status)}
                          <div className="flex gap-1 sm:gap-2">
                            <button
                              onClick={() => moveHeroSlide(slide.id, "up")}
                              className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30"
                              title="Pindah ke Atas"
                              disabled={heroSlides.indexOf(slide) === 0}
                            >
                              <ChevronUp size={16} />
                            </button>
                            <button
                              onClick={() => moveHeroSlide(slide.id, "down")}
                              className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30"
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
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(slide.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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
                  <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("admin.preview")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("admin.title")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("admin.description")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("admin.status")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("admin.actions")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {heroSlides.map((slide) => (
                      <tr
                        key={slide.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200 max-w-xs">
                            {slide.title}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-600 dark:text-gray-400 max-w-md line-clamp-2">
                            {slide.description}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(slide.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-1 border-r border-gray-200 dark:border-gray-700 pr-2 mr-2">
                            <button
                              onClick={() => moveHeroSlide(slide.id, "up")}
                              className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30"
                              title="Pindah ke Atas"
                              disabled={heroSlides.indexOf(slide) === 0}
                            >
                              <ChevronUp size={18} />
                            </button>
                            <button
                              onClick={() => moveHeroSlide(slide.id, "down")}
                              className="p-1.5 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors disabled:opacity-30"
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
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(slide.id)}
                              className="p-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
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
