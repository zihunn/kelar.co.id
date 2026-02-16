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
            {t("admin.manageArticles")}
          </h1>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors"
          >
            <Plus size={20} />
            <span className="text-sm sm:text-base">
              {t("admin.addArticle")}
            </span>
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                <h2 className="text-2xl dark:text-white">
                  {editingId
                    ? `${t("admin.edit")} ${t("admin.article")}`
                    : t("admin.addArticle")}
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
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    Thumbnail
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
                        formData.thumbnail.startsWith("data:")
                          ? ""
                          : formData.thumbnail
                      }
                      onChange={(e) =>
                        setFormData({ ...formData, thumbnail: e.target.value })
                      }
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                      placeholder="https://example.com/image.jpg"
                      required={!formData.thumbnail}
                    />
                  ) : (
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
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
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t("admin.excerpt")}
                  </label>
                  <textarea
                    value={formData.excerpt}
                    onChange={(e) =>
                      setFormData({ ...formData, excerpt: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)] h-24"
                    placeholder={t("admin.excerptPlaceholder")}
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t("admin.content")}
                  </label>
                  <div className="border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <ReactQuill
                      theme="snow"
                      value={formData.content}
                      onChange={(content) =>
                        setFormData({ ...formData, content })
                      }
                      modules={quillModules}
                      formats={quillFormats}
                      className="bg-white dark:bg-gray-700 dark:text-white"
                      style={{ minHeight: "300px" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
                    {t("admin.date")}
                  </label>
                  <input
                    type="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({ ...formData, date: e.target.value })
                    }
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300 mb-2">
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
                    className="flex-1 py-3 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors disabled:opacity-70 flex items-center justify-center gap-2"
                  >
                    {isSaving && <Loader2 className="animate-spin" size={20} />}
                    {editingId ? t("admin.update") : t("admin.save")}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    disabled={isSaving}
                    className="flex-1 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
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
          {articles.length === 0 ? (
            <div className="p-8 sm:p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400 mb-4 text-sm sm:text-base">
                {t("admin.noArticles")}
              </p>
              <button
                onClick={() => setShowForm(true)}
                className="px-4 py-2 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors text-sm sm:text-base"
              >
                {t("admin.addFirstArticle")}
              </button>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className="lg:hidden divide-y divide-gray-200 dark:divide-gray-700">
                {articles.map((article) => (
                  <div
                    key={article.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex gap-4">
                      <img
                        src={article.thumbnail}
                        alt={article.title}
                        className="w-24 h-20 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-gray-200 mb-1 line-clamp-1">
                          {article.title}
                        </h3>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {new Date(article.date).toLocaleDateString("id-ID", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          {getStatusBadge(article.status)}
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEdit(article.id)}
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={16} />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
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
                        Thumbnail
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("admin.title")}
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                        {t("admin.date")}
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
                    {articles.map((article) => (
                      <tr
                        key={article.id}
                        className="hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <img
                            src={article.thumbnail}
                            alt={article.title}
                            className="w-24 h-16 object-cover rounded"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-gray-200 max-w-md">
                            {article.title}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                            {article.excerpt}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600 dark:text-gray-400">
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
                              className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDelete(article.id)}
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
