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
  Tag as TagIcon,
  CheckCircle2,
  Clock,
  Settings,
  Layout,
  Save,
  Zap
} from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";

export function PromosPage() {
  const { t } = useLanguage();
  const { promos, addPromo, updatePromo, deletePromo, aboutUs, updateAboutUs } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [promoToDelete, setPromoToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states for individual promo cards
  const [formData, setFormData] = useState<Omit<Promo, "id">>({
    name: "",
    badge: "",
    subheader: "",
    content: "",
    whatsapp_message: "",
    status: "draft",
  });

  // Form states for Global Section Settings
  const [settingsData, setSettingsData] = useState({
    promo_badge: aboutUs.promo_badge || "PROMO TERBATAS",
    promo_title: aboutUs.promo_title || "E-Katalog V6 Offers",
    promo_subtitle: aboutUs.promo_subtitle || "Promo berlaku untuk 10 klien pertama di bulan April 2026!",
  });

  const handleEdit = (id: string) => {
    const promo = promos.find((p) => p.id === id);
    if (promo) {
      setFormData({
        name: promo.name,
        badge: promo.badge || "",
        subheader: promo.subheader || "",
        content: promo.content,
        whatsapp_message: promo.whatsapp_message || "",
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

    if (editingId) {
      updatePromo(editingId, formData).then(() => {
        toast.success(t("admin.promo") + " berhasil diupdate");
        setIsSubmitting(false);
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: "", badge: "", subheader: "", content: "", whatsapp_message: "", status: "draft" });
      });
    } else {
      addPromo(formData).then(() => {
        toast.success(t("admin.promo") + " berhasil ditambahkan");
        setIsSubmitting(false);
        setShowForm(false);
        setEditingId(null);
        setFormData({ name: "", badge: "", subheader: "", content: "", whatsapp_message: "", status: "draft" });
      });
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await updateAboutUs(settingsData);
      toast.success("Header Section berhasil diperbarui!");
      setShowSettingsModal(false);
    } catch (error) {
      toast.error("Gagal memperbarui header section");
    } finally {
      setIsSubmitting(false);
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
          <div className="flex gap-4">
            <button
              onClick={() => {
                setSettingsData({
                  promo_badge: aboutUs.promo_badge || "",
                  promo_title: aboutUs.promo_title || "",
                  promo_subtitle: aboutUs.promo_subtitle || "",
                });
                setShowSettingsModal(true);
              }}
              className="flex items-center gap-3 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-black transition-all active:scale-95"
            >
              <Settings size={20} />
              Edit Header Section
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setFormData({ name: "", badge: "", subheader: "", content: "", whatsapp_message: "", status: "draft" });
                setShowForm(true);
              }}
              className="flex items-center gap-3 px-8 py-4 bg-white text-[var(--background)] rounded-2xl font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95"
            >
              <Plus size={24} />
              {t("admin.addPromo")}
            </button>
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
                <p className="text-white/40 text-xl font-medium">{t("admin.noArticles")}</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5 border-b border-white/10">
                    <tr>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">{t("admin.promoName")}</th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em]">{t("admin.content")}</th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap">{t("admin.status")}</th>
                      <th className="px-6 py-5 text-left text-xs font-black text-white uppercase tracking-[0.2em] whitespace-nowrap text-right">{t("admin.actions")}</th>
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
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleEdit(promo.id)}
                              className="p-3 text-white hover:bg-white/10 rounded-2xl transition-all"
                              title={t("admin.edit")}
                            >
                              <Edit2 size={20} />
                            </button>
                            <button
                              onClick={() => handleDeleteClick(promo.id)}
                              className="p-3 text-red-400 hover:bg-red-500/10 rounded-2xl transition-all"
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
            )}
          </div>
        </div>
      </div>

      {/* Promo Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-blue-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-blue-900/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-center justify-between p-8 border-b border-white/10 sticky top-0 bg-transparent z-10 backdrop-blur-3xl">
              <h2 className="text-2xl font-black text-white">
                {editingId ? "Edit Promo" : "Tambah Promo Baru"}
              </h2>
              <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Nama Promo</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Badge / Tagline Atas</label>
                <input
                  type="text"
                  value={formData.badge}
                  onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                  placeholder="Contoh: Special Offer"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Sub Header / Tagline Bawah</label>
                <input
                  type="text"
                  value={formData.subheader}
                  onChange={(e) => setFormData({ ...formData, subheader: e.target.value })}
                  placeholder="Opsional: Teks tambahan di bawah judul"
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Konten Promo</label>
                <textarea
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  rows={6}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-white/40 uppercase tracking-widest pl-1">Pesan Custom WhatsApp (Opsional)</label>
                <textarea
                  value={formData.whatsapp_message}
                  onChange={(e) => setFormData({ ...formData, whatsapp_message: e.target.value })}
                  rows={3}
                  placeholder="Contoh: Halo Min, saya tertarik dengan Layanan Promo Landing Page..."
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all font-medium"
                />
                <p className="text-[10px] text-white/40 font-bold tracking-wider pl-1 uppercase">Jika dikosongkan, pesan default "Halo Kelar.co.id..." akan digunakan.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="py-4 px-6 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-xs"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="py-4 px-6 bg-white text-background rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95"
                >
                  {isSubmitting ? "Processing..." : editingId ? "Update" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Section Header Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 bg-blue-950/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-indigo-950/40 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <div className="flex items-center justify-between p-8 border-b border-white/10 sticky top-0 bg-transparent z-10 backdrop-blur-3xl">
              <div className="flex items-center gap-3">
                <Layout className="text-blue-400" size={24} />
                <h2 className="text-2xl font-black text-white">Edit Header Section Promosi</h2>
              </div>
              <button onClick={() => setShowSettingsModal(false)} className="text-white/40 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSaveSettings} className="p-8 space-y-8">
              <div className="bg-blue-400/10 border border-blue-400/20 p-6 rounded-2xl flex items-start gap-4 mb-4">
                <Zap className="text-blue-400 shrink-0" size={20} />
                <p className="text-white/70 text-sm leading-relaxed">
                  Pengaturan ini akan mengubah teks besar dan sub-teks yang tampil di **Section Promosi** pada halaman utama.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-1">Badge Text</label>
                  <input
                    type="text"
                    required
                    value={settingsData.promo_badge}
                    onChange={(e) => setSettingsData({ ...settingsData, promo_badge: e.target.value })}
                    placeholder="PROMO TERBATAS"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-1">Main Heading</label>
                  <input
                    type="text"
                    required
                    value={settingsData.promo_title}
                    onChange={(e) => setSettingsData({ ...settingsData, promo_title: e.target.value })}
                    placeholder="E-Katalog V6 Offers"
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-bold"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] pl-1">Subtitle Description</label>
                  <textarea
                    required
                    value={settingsData.promo_subtitle}
                    onChange={(e) => setSettingsData({ ...settingsData, promo_subtitle: e.target.value })}
                    rows={3}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSettingsModal(false)}
                  className="flex-1 py-5 bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest text-xs border border-white/10 hover:bg-white/10 transition-all"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-5 bg-white text-background rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  {isSubmitting ? <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" /> : <Save size={16} />}
                  Simpan Perubahan
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
