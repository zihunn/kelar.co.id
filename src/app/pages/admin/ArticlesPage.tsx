import { useState, useMemo } from "react";
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
  Loader2,
} from "lucide-react";
import { toast } from "sonner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";

export function ArticlesPage() {
  const { articles, addArticle, updateArticle, deleteArticle } = useData();
  const { t } = useLanguage();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [imageSource, setImageSource] = useState<"url" | "upload">("url");
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
    thumbnail: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().split("T")[0],
    status: "draft" as "published" | "draft" | "takedown",
  });

  const quillModules = useMemo(
    () => ({
      toolbar: [
        [{ font: [] }, { size: [] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        [{ script: "sub" }, { script: "super" }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [
          { list: "ordered" },
          { list: "bullet" },
          { indent: "-1" },
          { indent: "+1" },
        ],
        [{ direction: "rtl" }, { align: [] }],
        ["blockquote", "code-block"],
        ["link", "image", "video"],
        ["clean"],
      ],
    }),
    [],
  );

  const quillFormats = [
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "header",
    "list",
    "bullet",
    "indent",
    "direction",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // For preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, thumbnail: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const sanitizeHtml = (html: string) => {
    // Remove inline styles that lock colors (background-color and color)
    // This allows the theme (CSS) to control the colors
    let sanitized = html;

    // Pattern to match style attributes and remove specific properties
    // We'll target background-color and color which are most common issues for dark mode
    sanitized = sanitized.replace(
      /style="[^"]*background-color\s*:\s*[^;"]*;?[^"]*"/gi,
      (match) => {
        return match.replace(/background-color\s*:\s*[^;"]*;?/gi, "");
      },
    );

    sanitized = sanitized.replace(
      /style="[^"]*color\s*:\s*[^;"]*;?[^"]*"/gi,
      (match) => {
        return match.replace(/color\s*:\s*[^;"]*;?/gi, "");
      },
    );

    // Remove empty style attributes
    sanitized = sanitized.replace(/style="\s*"/gi, "");

    return sanitized;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const sanitizedContent = sanitizeHtml(formData.content);
      const fd = new FormData();
      fd.append("title", formData.title);
      fd.append("summary", formData.excerpt);
      fd.append("content", sanitizedContent);
      fd.append("status", formData.status);
      fd.append("published_at", formData.date);

      if (imageSource === "upload" && selectedFile) {
        fd.append("thumbnail", selectedFile);
      } else if (imageSource === "url" && formData.thumbnail) {
        fd.append("thumbnail", formData.thumbnail);
      }

      if (editingId) {
        await updateArticle(editingId, fd);
        toast.success("Artikel berhasil diupdate!");
      } else {
        await addArticle(fd);
        toast.success("Artikel berhasil ditambahkan!");
      }
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Gagal menyimpan artikel");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (id: string) => {
    const article = articles.find((a) => a.id === id);
    if (article) {
      setFormData({
        title: article.title || "",
        thumbnail: article.thumbnail || "",
        excerpt: article.excerpt || "",
        content: article.content || "",
        date: article.date
          ? article.date.split(" ")[0]
          : new Date().toISOString().split("T")[0],
        status: (article.status as any) || "draft",
      });
      setEditingId(id);
      setShowForm(true);
      setImageSource(
        article.thumbnail &&
          (article.thumbnail.startsWith("http") || !article.thumbnail)
          ? "url"
          : "upload",
      );
      setSelectedFile(null);
    }
  };

  const handleDelete = (id: string) => {
    const article = articles.find((a) => a.id === id);
    if (article) {
      setDeleteModal({ isOpen: true, id, title: article.title });
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      thumbnail: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
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
              {t("admin.manageArticles")}
            </h1>
            <p className="text-white/80 font-medium">Kelola publikasi dan konten artikel Kelar.co.id</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95 text-lg"
          >
            <Plus size={24} />
            <span>
              {t("admin.addArticle")}
            </span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-blue-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-blue-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
              <div className="flex items-center justify-between p-8 border-b border-white/10 sticky top-0 bg-blue-900/60 backdrop-blur-3xl z-10">
                <h2 className="text-3xl font-black text-white tracking-tight">
                  {editingId
                    ? `${t("admin.edit")} ${t("admin.article")}`
                    : t("admin.addArticle")}
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
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    Thumbnail
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

                  {imageSource === "url" ? (
                    <input
                      type="url"
                      value={
                        formData.thumbnail.startsWith("data:")
                          ? ""
                          : formData.thumbnail
                      }
                      onChange={(e) =>
                        setFormData({ ...formData, thumbnail: e.target.value })
                      }
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="https://example.com/image.jpg"
                      required={!formData.thumbnail}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white/10 file:text-white hover:file:bg-white/20"
                      required={!formData.thumbnail}
                    />
                  )}
                  {formData.thumbnail && (
                    <img
                      src={formData.thumbnail}
                      alt="Preview"
                      className="mt-2 w-full h-48 object-cover rounded-lg"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.excerpt")}
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-24"
                    placeholder={t("admin.excerptPlaceholder")}
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.content")}
                  </label>
                  <div className="border border-white/10 rounded-[2rem] overflow-hidden bg-white/5">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(content) =>
                        setFormData({ ...formData, content })
                      }
                      modules={quillModules}
                      formats={quillFormats}
                      className="text-white"
                      style={{ minHeight: "300px" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.date")}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all [color-scheme:dark]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-bold uppercase tracking-widest text-xs mb-3 ml-1">
                    {t("admin.status")}
                  </label>
                  <select
                    value={formData.status}
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
                    className="flex-1 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95 disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSaving && <Loader2 className="animate-spin" size={20} />}
                    {editingId ? t("admin.update") : t("admin.save")}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSaving}
                    className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-white/10 transition-all font-black disabled:opacity-50"
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
          {articles.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <p className="text-white/60 mb-6 text-lg font-medium">
                {t("admin.noArticles")}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-8 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95"
              >
                {t("admin.addFirstArticle")}
              </button>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-white/5">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="p-6 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex gap-6">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-24 h-24 object-cover rounded-2xl flex-shrink-0 shadow-lg border border-white/10"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                          {article.title}
                        </h3>
                        <p className="text-xs font-medium text-white/40 mb-3">
                          {new Date(article.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-white/60 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(article.status)}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(article.id)}
                              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
                              className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                              title={t("admin.delete")}
                            >
                              <Trash2 size={18} />
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
                        Thumbnail
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                        {t("admin.title")}
                      </th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">
                        {t("admin.date")}
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
                    {articles.map((article) => (
                      <tr
                        key={article.id}
                        className="hover:bg-white/10 transition-all duration-300 group border-b border-white/5 last:border-0"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-bold text-white max-w-md">
                            {article.title}
                          </div>
                          <div className="text-sm text-white/60 mt-1 line-clamp-2">
                            {article.excerpt}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white/70">
                            {new Date(article.date).toLocaleDateString(
                              "id-ID",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {getStatusBadge(article.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(article.id)}
                              className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
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
        onConfirm={async () => {
          try {
            setIsSaving(true);
            await deleteArticle(deleteModal.id);
            toast.success("Artikel berhasil dihapus!");
          } catch (err: any) {
            toast.error(err.message || "Gagal menghapus artikel");
          } finally {
            setIsSaving(false);
            setDeleteModal({ isOpen: false, id: "", title: "" });
          }
        }}
        title={t("admin.deleteArticle")}
        message={t("admin.confirmDeleteArticle")}
        itemName={deleteModal.title}
      />
    </AdminLayout>
  );
}
