import { useState } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import { useLanguage } from "../../context/LanguageContext";
import { useData, Service, ServicePackage } from "../../context/DataContext";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  X,
  PlusCircle,
  ShieldCheck,
  Building2,
  Award,
  Trash,
  ChevronUp,
  ChevronDown
} from "lucide-react";
import { toast } from "sonner";
import { DeleteConfirmModal } from "../../components/admin/DeleteConfirmModal";

export function ServicesPage() {
  const { t } = useLanguage();
  const { services, addService, updateService, deleteService, moveService } = useData();
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [serviceToDelete, setServiceToDelete] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    description: "",
    slug: "",
    icons: [] as (File | string)[], // Support both existing URLs and new files
    color: "from-blue-500 to-indigo-600",
    bg_image: "",
    packages: [] as any[]
  });

  const handleEdit = (id: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      setFormData({
        title: service.title,
        subtitle: service.subtitle,
        description: service.description,
        slug: service.slug,
        icons: service.icons || [],
        color: service.color,
        bg_image: service.bgImage || "",
        packages: service.packages.map(pkg => ({
          name: pkg.name,
          price: pkg.price,
          is_popular: pkg.isPopular,
          features: [...pkg.features]
        }))
      });
      setEditingId(id);
      setShowForm(true);
    }
  };

  const handleDeleteClick = (id: string) => {
    setServiceToDelete(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (serviceToDelete) {
      try {
        await deleteService(serviceToDelete);
        toast.success("Layanan berhasil dihapus");
      } catch (error) {
        toast.error("Gagal menghapus layanan");
      }
    }
  };

  const addPackage = () => {
    setFormData({
      ...formData,
      packages: [
        ...formData.packages,
        { name: "", price: "", is_popular: false, features: [""] }
      ]
    });
  };

  const removePackage = (index: number) => {
    const newPackages = [...formData.packages];
    newPackages.splice(index, 1);
    setFormData({ ...formData, packages: newPackages });
  };

  const updatePackage = (index: number, field: string, value: any) => {
    const newPackages = [...formData.packages];
    newPackages[index] = { ...newPackages[index], [field]: value };
    setFormData({ ...formData, packages: newPackages });
  };

  const addFeature = (pkgIndex: number) => {
    const newPackages = [...formData.packages];
    newPackages[pkgIndex].features.push("");
    setFormData({ ...formData, packages: newPackages });
  };

  const removeFeature = (pkgIndex: number, featureIndex: number) => {
    const newPackages = [...formData.packages];
    newPackages[pkgIndex].features.splice(featureIndex, 1);
    setFormData({ ...formData, packages: newPackages });
  };

  const updateFeature = (pkgIndex: number, featureIndex: number, value: string) => {
    const newPackages = [...formData.packages];
    newPackages[pkgIndex].features[featureIndex] = value;
    setFormData({ ...formData, packages: newPackages });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = new FormData();
    submissionData.append("title", formData.title);
    submissionData.append("subtitle", formData.subtitle);
    submissionData.append("description", formData.description);
    submissionData.append("slug", formData.slug);
    submissionData.append("color", formData.color);
    if (formData.bg_image) submissionData.append("bg_image", formData.bg_image);

    // Append icons
    formData.icons.forEach((icon) => {
      if (icon instanceof File) {
        submissionData.append("icons[]", icon);
      }
    });

    // Append packages as JSON since Laravel can handle it or manually append
    // For simplicity with Laravel mapping, we could append nested fields
    formData.packages.forEach((pkg, pIdx) => {
      submissionData.append(`packages[${pIdx}][name]`, pkg.name);
      submissionData.append(`packages[${pIdx}][price]`, pkg.price);
      submissionData.append(`packages[${pIdx}][is_popular]`, pkg.is_popular ? "1" : "0");
      pkg.features.forEach((feat: string, fIdx: number) => {
        submissionData.append(`packages[${pIdx}][features][${fIdx}]`, feat);
      });
    });

    if (editingId) {
      submissionData.append("_method", "PUT"); // Laravel SPOOFING
    }

    try {
      if (editingId) {
        await updateService(editingId, submissionData);
        toast.success("Layanan berhasil diupdate");
      } else {
        await addService(submissionData);
        toast.success("Layanan berhasil ditambahkan");
      }
      setShowForm(false);
      setEditingId(null);
      setFormData({
        title: "",
        subtitle: "",
        description: "",
        slug: "",
        icons: [],
        color: "from-blue-500 to-indigo-600",
        bg_image: "",
        packages: []
      });
    } catch (error) {
      toast.error(editingId ? "Gagal update layanan" : "Gagal tambah layanan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredServices = services.filter((s) =>
    s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );


  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              Manajemen Layanan
            </h1>
            <p className="text-white/50 mt-1">
              Kelola layanan dan paket yang tampil di dropdown navbar.
            </p>
          </div>
          <button
            onClick={() => {
              setEditingId(null);
              setFormData({
                title: "",
                subtitle: "",
                description: "",
                slug: "",
                icons: [],
                color: "from-blue-500 to-indigo-600",
                bg_image: "",
                packages: []
              });
              setShowForm(true);
            }}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-[var(--kelar-primary)] hover:bg-[var(--kelar-primary)]/90 text-white rounded-2xl font-bold transition-all shadow-lg active:scale-95"
          >
            <Plus size={20} />
            <span>Tambah Layanan</span>
          </button>
        </div>

        {/* Search & Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 group-focus-within:text-[var(--kelar-primary)] transition-colors" size={20} />
            <input
              type="text"
              placeholder="Cari layanan berdasarkan nama atau slug..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]/50 focus:border-[var(--kelar-primary)] transition-all"
            />
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
            <span className="text-white/50">Total Layanan</span>
            <span className="text-2xl font-black text-white">{services.length}</span>
          </div>
        </div>

        {/* Services Table */}
        <div className="bg-white/5 border border-white/10 rounded-[2rem] overflow-hidden backdrop-blur-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="px-6 py-4 text-white/50 font-bold uppercase text-xs tracking-wider">Layanan</th>
                  <th className="px-6 py-4 text-white/50 font-bold uppercase text-xs tracking-wider">Slug</th>
                  <th className="px-6 py-4 text-white/50 font-bold uppercase text-xs tracking-wider text-center">Paket</th>
                  <th className="px-6 py-4 text-white/50 font-bold uppercase text-xs tracking-wider text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-white/5 transition-colors group">
                      <td className="px-6 py-6 font-medium">
                        <div className="flex items-center gap-4">
                          <div className="flex -space-x-4">
                            {(service.icons || []).slice(0, 3).map((icon, idx) => (
                              <div key={idx} className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-lg border-2 border-[#002d4f] overflow-hidden">
                                <img src={icon} alt="" className="w-full h-full object-contain p-1" />
                              </div>
                            ))}
                            {(!service.icons || service.icons.length === 0) && (
                              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0E1B47] shadow-lg border-2 border-[#002d4f]">
                                <ShieldCheck size={20} />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="text-white font-bold">{service.title}</div>
                            <div className="text-white/40 text-xs line-clamp-1">{service.subtitle}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-6">
                        <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-white/70 font-mono">
                          /{service.slug}
                        </span>
                      </td>
                      <td className="px-6 py-6 text-center">
                        <span className="px-3 py-1 bg-[var(--kelar-primary)]/10 text-[var(--kelar-primary)] rounded-full text-xs font-bold border border-[var(--kelar-primary)]/20">
                          {service.packages.length} Paket
                        </span>
                      </td>
                      <td className="px-6 py-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <div className="flex items-center bg-white/5 rounded-lg border border-white/10 mr-2">
                            <button
                              onClick={() => moveService(service.id, "up")}
                              disabled={services.findIndex(s => s.id === service.id) === 0}
                              className="p-2 text-white/40 hover:text-blue-400 disabled:opacity-20 disabled:hover:text-white/40 transition-all border-r border-white/10"
                              title="Pindah ke Atas"
                            >
                              <ChevronUp size={18} />
                            </button>
                            <button
                              onClick={() => moveService(service.id, "down")}
                              disabled={services.findIndex(s => s.id === service.id) === services.length - 1}
                              className="p-2 text-white/40 hover:text-blue-400 disabled:opacity-20 disabled:hover:text-white/40 transition-all"
                              title="Pindah ke Bawah"
                            >
                              <ChevronDown size={18} />
                            </button>
                          </div>
                          <button
                            onClick={() => handleEdit(service.id)}
                            className="p-2 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white rounded-lg transition-all"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(service.id)}
                            className="p-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white rounded-lg transition-all"
                            title="Hapus"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-white/30 italic">
                      Tidak ada layanan ditemukan
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Form */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowForm(false)} />
            <div className="relative bg-[#002d4f] border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl">
              <div className="p-8 border-b border-white/10 flex items-center justify-between bg-white/5">
                <div>
                  <h2 className="text-2xl font-black text-white">
                    {editingId ? "Edit Layanan" : "Tambah Layanan Baru"}
                  </h2>
                  <p className="text-white/40 text-sm">Lengkapi detail layanan dan paket di bawah ini.</p>
                </div>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-white/10 text-white/50 hover:text-white rounded-xl transition-all"
                >
                  <X size={24} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 uppercase tracking-wider">Nama Layanan</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Layanan Ekatalog"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 uppercase tracking-wider">Slug URL</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: ekatalog"
                        value={formData.slug}
                        onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]/50"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 uppercase tracking-wider">Penjelasan Singkat (Subtitle)</label>
                      <input
                        required
                        type="text"
                        placeholder="Contoh: Konsultasi & Kepengurusan E-katalog LKPP"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]/50"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 uppercase tracking-wider">Informasi Lengkap</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Masukkan deskripsi lengkap layanan..."
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]/50 resize-none font-light"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 uppercase tracking-wider">Icons (Multiupload)</label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {formData.icons.map((icon, idx) => (
                          <div key={idx} className="relative aspect-square rounded-2xl bg-white/5 border border-white/10 overflow-hidden group">
                            <img
                              src={icon instanceof File ? URL.createObjectURL(icon) : icon}
                              className="w-full h-full object-contain p-4 opacity-80"
                              alt=""
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const newIcons = [...formData.icons];
                                newIcons.splice(idx, 1);
                                setFormData({ ...formData, icons: newIcons });
                              }}
                              className="absolute inset-0 bg-red-500/80 items-center justify-center hidden group-hover:flex transition-all"
                            >
                              <Trash2 size={24} className="text-white" />
                            </button>
                          </div>
                        ))}
                        <label className="aspect-square rounded-2xl bg-white/5 border-2 border-dashed border-white/10 hover:border-[var(--kelar-primary)]/50 flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-white/10 text-white/30 hover:text-[var(--kelar-primary)]">
                          <Plus size={32} />
                          <span className="text-[10px] font-bold uppercase mt-1">Upload</span>
                          <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const files = Array.from(e.target.files || []);
                              setFormData({ ...formData, icons: [...formData.icons, ...files] });
                            }}
                          />
                        </label>
                      </div>
                      <p className="text-[10px] text-white/30 italic mt-2">* Rekomendasi 2-3 icon per layanan. Ukuran 500x500px.</p>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-white/50 ml-1 uppercase tracking-wider">Warna (Gradient Class)</label>
                      <input
                        placeholder="Contoh: from-blue-500 to-indigo-600"
                        value={formData.color}
                        onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]/50 font-mono text-sm"
                      />
                    </div>
                  </div>

                  {/* Packages Section */}
                  <div className="space-y-6">
                    <div className="flex items-center justify-between border-b border-white/10 pb-4">
                      <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        Paket Layanan
                        <span className="text-xs px-2 py-0.5 bg-white/10 rounded-md text-white/40">{formData.packages.length}</span>
                      </h3>
                      <button
                        type="button"
                        onClick={addPackage}
                        className="text-[var(--kelar-primary)] hover:text-[var(--kelar-primary)]/80 font-bold text-sm flex items-center gap-2 transition-colors"
                      >
                        <PlusCircle size={18} />
                        Tambah Paket
                      </button>
                    </div>

                    <div className="space-y-8">
                      {formData.packages.map((pkg, pIdx) => (
                        <div key={pIdx} className="p-6 bg-white/5 border border-white/10 rounded-3xl relative animate-in fade-in slide-in-from-top-4 duration-300">
                          <button
                            type="button"
                            onClick={() => removePackage(pIdx)}
                            className="absolute top-4 right-4 p-2 text-white/20 hover:text-red-500 transition-colors"
                          >
                            <Trash size={18} />
                          </button>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-white/30 ml-1 uppercase">Nama Paket</label>
                              <input
                                required
                                placeholder="Contoh: Paket Basic"
                                value={pkg.name}
                                onChange={(e) => updatePackage(pIdx, "name", e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--kelar-primary)]"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-xs font-bold text-white/30 ml-1 uppercase">Harga (Tampil)</label>
                              <input
                                required
                                placeholder="Contoh: 2.500.000"
                                value={pkg.price}
                                onChange={(e) => updatePackage(pIdx, "price", e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:border-[var(--kelar-primary)]"
                              />
                            </div>
                            <div className="flex items-center gap-2 ml-1">
                              <input
                                type="checkbox"
                                id={`popular-${pIdx}`}
                                checked={pkg.is_popular}
                                onChange={(e) => updatePackage(pIdx, "is_popular", e.target.checked)}
                                className="w-5 h-5 rounded-md border-white/10 bg-white/5 text-[var(--kelar-primary)] focus:ring-offset-0 focus:ring-0"
                              />
                              <label htmlFor={`popular-${pIdx}`} className="text-sm text-white/70 cursor-pointer">Set sebagai Paket Populer</label>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div className="flex items-center justify-between ml-1">
                              <label className="text-xs font-bold text-white/30 uppercase">Fitur / Keuntungan</label>
                              <button
                                type="button"
                                onClick={() => addFeature(pIdx)}
                                className="text-xs text-[var(--kelar-primary)] border border-[var(--kelar-primary)]/30 px-3 py-1 rounded-full hover:bg-[var(--kelar-primary)]/10 transition-all font-bold"
                              >
                                + Add Item
                              </button>
                            </div>
                            <div className="grid grid-cols-1 gap-3">
                              {pkg.features.map((feature: string, fIdx: number) => (
                                <div key={fIdx} className="flex gap-2 group/feat">
                                  <input
                                    required
                                    placeholder={`Fitur ${fIdx + 1}`}
                                    value={feature}
                                    onChange={(e) => updateFeature(pIdx, fIdx, e.target.value)}
                                    className="flex-grow px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white/80 focus:outline-none focus:border-white/20 transition-all"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => removeFeature(pIdx, fIdx)}
                                    className="p-2 text-white/10 group-hover/feat:text-red-500/50 hover:!text-red-500 transition-all"
                                  >
                                    <X size={16} />
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}

                      {formData.packages.length === 0 && (
                        <div className="py-12 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-white/20">
                          <PlusCircle size={40} className="mb-4" />
                          <p className="font-medium">Belum ada paket ditambahkan</p>
                          <button type="button" onClick={addPackage} className="mt-4 text-sm text-[var(--kelar-primary)] font-bold underline">Tambah paket pertama</button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                <div className="p-8 border-t border-white/10 flex items-center justify-end gap-4 bg-white/5 backdrop-blur-md">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-8 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-2xl transition-all"
                  >
                    Batal
                  </button>
                  <button
                    disabled={isSubmitting}
                    type="submit"
                    className="px-12 py-3 bg-[var(--kelar-primary)] hover:bg-[var(--kelar-primary)]/90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-2xl transition-all shadow-[0_0_20px_rgba(59,130,246,0.3)] min-w-[160px]"
                  >
                    {isSubmitting ? "Menyimpan..." : editingId ? "Simpan Perubahan" : "Tambah Layanan"}
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
          title="Hapus Layanan"
          message="Apakah Anda yakin ingin menghapus layanan ini? Seluruh data paket dan fitur juga akan terhapus secara permanen."
        />
      </div>
    </AdminLayout>
  );
}
