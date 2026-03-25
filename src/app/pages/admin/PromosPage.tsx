import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useLanguage } from "../../context/LanguageContext";
import { useData, Promo } from "../../context/DataContext";
import { 
  Plus, 
  Search, 
  Edit2, 
  Trash2, 
  X, 
  Upload, 
  Tag as TagIcon,
  CheckCircle2,
  Clock,
  AlertCircle
} from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";

// Promo interface is now imported from DataContext

export function PromosPage() {
  const { t } = useLanguage();
  const { promos, addPromo, updatePromo, deletePromo } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promoToDelete, setPromoToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [useStateActive, setUseStateActive] = useState(false); // dummy for useState import if needed, but I'll use React.useState if I don't import it. Wait, I should import useState.

  // Form states
  const [formData, setFormData] = useState<Omit<Promo, "id">>({
    name: "",
    content: "",
    status: "draft",
  });

  // Data is now handled by DataContext

  const handleEdit = (id: string) => {
    const promo = promos.find((p) => p.id === id);
    if (promo) {
      setFormData({
        name: promo.name,
        content: promo.content,
        status: promo.status,
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    setPromoToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (promoToDelete) {
      await deletePromo(promoToDelete);
      toast.success(t("admin.promo") + " berhasil dihapus");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Use context functions
    if (editingId) {
      updatePromo(editingId, formData).then(() => {
        toast.success(t("admin.promo") + " berhasil diupdate");
        setIsSubmitting(false);
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: "", content: "", status: "draft" });
      });
    } else {
      addPromo(formData).then(() => {
        toast.success(t("admin.promo") + " berhasil ditambahkan");
        setIsSubmitting(false);
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: "", content: "", status: "draft" });
      });
    }
  };

  const getStatusBadge = (status: Promo["status"]) => {
    switch (status) {
      case "published":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-green-500/20 text-green-400 border border-green-500/30">
            <CheckCircle2 size={12} />
            {t("admin.published")}
          </span>
        );
      case "draft":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-orange-500/20 text-orange-400 border border-orange-500/30">
            <Clock size={12} />
            {t("admin.draft")}
          </span>
        );
      default:
        return null;
    }
  };

  const filteredPromos = promos.filter((promo) =>
    promo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
              {t("admin.managePromos")}
            </h1>
            <p className="text-white/80 font-medium tracking-wide">
              Kelola penawaran dan promosi yang tampil di landing page
            </p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({ name: "", content: "", status: "draft" });
              setShowForm(true);
            }}
            className="flex items-center gap-3 px-8 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95 self-start md:self-auto"
          >
            <Plus size={24} />
            {t("admin.addPromo")}
          </button>
        </div>

        {/* Stats Summary - Fast insight */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                <TagIcon className="text-blue-400" size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest">Total Promo</p>
                <p className="text-2xl font-black text-white">{promos.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center border border-green-500/30">
                <CheckCircle2 className="text-green-400" size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest">Published</p>
                <p className="text-2xl font-black text-white">{promos.filter(p => p.status === 'published').length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center border border-orange-500/30">
                <Clock className="text-orange-400" size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs font-black uppercase tracking-widest">Draft</p>
                <p className="text-2xl font-black text-white">{promos.filter(p => p.status === 'draft').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl overflow-hidden group">
          <div className="p-8 border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-white rounded-full" />
              <h2 className="text-2xl font-black text-white tracking-tight">{t("admin.promos")} List</h2>
            </div>
            
            <div className="relative w-full sm:w-72 group/search">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={18} className="text-white/20 group-focus-within/search:text-white transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Cari promo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-white/20 transition-all placeholder:text-white/20"
              />
            </div>
          </div>

          <div className="p-0">
            {filteredPromos.length === 0 ? (
              <div className="text-center py-32">
                <div className="w-24 h-24 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <TagIcon size={48} className="text-white/10" />
                </div>
                <p className="text-white/40 text-xl font-medium mb-10">{t("admin.noArticles")}</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="px-8 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95"
                >
                  {t("admin.addFirstPromo")}
                </button>
              </div>
            ) : (
              <>
                {/* Mobile Card View */}
                <div className="lg:hidden divide-y divide-white/5">
                  {filteredPromos.map((promo) => (
                    <div key={promo.id} className="p-6 hover:bg-white/5 transition-colors">
                      <div className="flex gap-6">
                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 flex-shrink-0">
                          <TagIcon className="text-white/40" size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">{promo.name}</h3>
                          <div className="flex items-center justify-between mt-auto">
                            {getStatusBadge(promo.status)}
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(promo.id)}
                                className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                              >
                                <Edit2 size={18} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(promo.id)}
                                className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
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
                        <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">{t("admin.promoName")}</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em]">{t("admin.content")}</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">{t("admin.status")}</th>
                        <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">{t("admin.actions")}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {filteredPromos.map((promo) => (
                        <tr key={promo.id} className="hover:bg-white/10 transition-all duration-300 group border-b border-white/5 last:border-0">
                          <td className="px-6 py-4">
                            <div className="text-lg font-bold text-white max-w-sm tracking-tight group-hover:text-blue-400 transition-colors">
                              {promo.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-white/60 text-sm line-clamp-2 max-w-xl whitespace-pre-wrap">
                              {promo.content}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {getStatusBadge(promo.status)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right">
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleEdit(promo.id)}
                                className="p-3 text-white hover:bg-white/10 rounded-2xl transition-all active:scale-90"
                                title={t("admin.edit")}
                              >
                                <Edit2 size={20} />
                              </button>
                              <button
                                onClick={() => handleDeleteClick(promo.id)}
                                className="p-3 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all active:scale-90"
                                title={t("admin.delete")}
                              >
                                <Trash2 size={20} />
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
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-blue-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-blue-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-[0_0_100px_rgba(0,0,0,0.5)] w-full max-w-2xl max-h-[90vh] overflow-y-auto relative group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="flex items-center justify-between p-8 border-b border-white/10 sticky top-0 bg-transparent z-20 backdrop-blur-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-xl">
                  {editingId ? <Edit2 className="text-white" size={24} /> : <Plus className="text-white" size={24} />}
                </div>
                <h2 className="text-3xl font-black text-white tracking-tighter">
                  {editingId ? "Edit Promo" : "Tambah Promo Baru"}
                </h2>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="p-3 text-white/40 hover:text-white rounded-2xl hover:bg-white/5 transition-all"
              >
                <X size={28} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 space-y-8 relative z-10">
              <div className="space-y-3">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-2">
                  {t("admin.promoName")}
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Contoh: Promo Cashback 20% Akhir Tahun"
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-xl font-bold tracking-tight placeholder:text-white/10 shadow-inner"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-2">
                  {t("admin.content")}
                </label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Isi deskripsi dan fasilitas promo disini..."
                  rows={6}
                  className="w-full px-8 py-5 bg-white/5 border border-white/10 rounded-[2rem] text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium placeholder:text-white/10 shadow-inner resize-y min-h-[150px]"
                />
              </div>

              <div className="space-y-4">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-2">
                  {t("admin.status")}
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "draft" })}
                    className={`flex items-center justify-center gap-3 p-6 rounded-[2rem] border-2 transition-all font-black uppercase tracking-widest text-xs ${
                      formData.status === "draft"
                        ? "bg-orange-500/20 text-orange-400 border-orange-500 shadow-[0_0_30px_rgba(249,115,22,0.2)]"
                        : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <Clock size={16} />
                    {t("admin.draft")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, status: "published" })}
                    className={`flex items-center justify-center gap-3 p-6 rounded-[2rem] border-2 transition-all font-black uppercase tracking-widest text-xs ${
                      formData.status === "published"
                        ? "bg-green-500/20 text-green-400 border-green-500 shadow-[0_0_30px_rgba(34,197,94,0.2)]"
                        : "bg-white/5 text-white/40 border-white/10 hover:border-white/20"
                    }`}
                  >
                    <CheckCircle2 size={16} />
                    {t("admin.published")}
                  </button>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10 flex gap-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-5 bg-white/5 border border-white/10 text-white rounded-[2rem] hover:bg-white/10 transition-all font-black uppercase tracking-widest text-sm"
                >
                  {t("admin.cancel")}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-5 bg-white text-[var(--background)] rounded-[2rem] hover:bg-white/90 transition-all font-black uppercase tracking-widest text-sm shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-[var(--background)]/30 border-t-[var(--background)] rounded-full animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>{editingId ? t("admin.update") : t("admin.save")}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title={t("admin.deletePromo")}
        message={t("admin.confirmDeletePromo")}
        itemName={promos.find((p) => p.id === promoToDelete)?.name}
      />
    </AdminLayout>
  );
}
