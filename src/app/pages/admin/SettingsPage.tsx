import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { Save, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

// TikTok icon component
function TikTokIcon({ size = 20, className = "" }: { size?: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
    </svg>
  );
}

export function SettingsPage() {
  const { socialMedia, updateSocialMedia } = useData();
  const [formData, setFormData] = useState(socialMedia);

  useEffect(() => {
    setFormData(socialMedia);
  }, [socialMedia]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialMedia(formData);
    toast.success('Pengaturan media sosial berhasil diupdate!');
  };

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
            Pengaturan Website
          </h1>
          <p className="text-white/80 font-medium">Konfigurasi media sosial dan integrasi pihak ketiga Kelar.co.id</p>
        </div>

        <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl p-6 sm:p-10 lg:p-12 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6 relative z-10">
            <div className="w-12 h-1 bg-white rounded-full" />
            <h2 className="text-2xl font-black text-white tracking-tight leading-none">Media Sosial</h2>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
                  <Instagram size={18} className="text-pink-400" />
                  Instagram
                </label>
                <input
                  type="url"
                  value={formData.instagram}
                  onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-white/20"
                  placeholder="https://instagram.com/username"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
                  <Facebook size={18} className="text-blue-400" />
                  Facebook
                </label>
                <input
                  type="url"
                  value={formData.facebook}
                  onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-white/20"
                  placeholder="https://facebook.com/username"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
                  <Twitter size={18} className="text-sky-400" />
                  Twitter / X
                </label>
                <input
                  type="url"
                  value={formData.twitter}
                  onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-white/20"
                  placeholder="https://twitter.com/username"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
                  <Linkedin size={18} className="text-blue-500" />
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={formData.linkedin}
                  onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-white/20"
                  placeholder="https://linkedin.com/company/username"
                  required
                />
              </div>

              <div className="space-y-3">
                <label className="flex items-center gap-2 text-white font-bold uppercase tracking-widest text-xs">
                  <TikTokIcon size={18} className="text-white" />
                  TikTok
                </label>
                <input
                  type="url"
                  value={formData.tiktok}
                  onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                  className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder:text-white/20"
                  placeholder="https://tiktok.com/@username"
                  required
                />
              </div>
            </div>

            <div className="pt-10 flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-3 px-12 py-5 bg-white text-[var(--background)] rounded-[2rem] font-black transition-all shadow-2xl hover:bg-white/90 active:scale-95 text-xl"
              >
                <Save size={24} />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}