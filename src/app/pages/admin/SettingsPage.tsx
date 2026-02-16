import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { Save, Instagram, Facebook, Twitter, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

// TikTok icon component
function TikTokIcon({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
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
      <div>
        <h1 className="text-3xl mb-8">Pengaturan Website</h1>

        <div className="bg-white rounded-xl shadow-md p-8">
          <h2 className="text-xl mb-6">Media Sosial</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Instagram size={20} className="text-pink-500" />
                Instagram
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                placeholder="https://instagram.com/username"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Facebook size={20} className="text-blue-600" />
                Facebook
              </label>
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                placeholder="https://facebook.com/username"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Twitter size={20} className="text-sky-500" />
                Twitter / X
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                placeholder="https://twitter.com/username"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <Linkedin size={20} className="text-blue-700" />
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                placeholder="https://linkedin.com/company/username"
                required
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-gray-700 mb-2">
                <TikTokIcon size={20} className="text-black" />
                TikTok
              </label>
              <input
                type="url"
                value={formData.tiktok}
                onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--kelar-primary)]"
                placeholder="https://tiktok.com/@username"
                required
              />
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors"
              >
                <Save size={20} />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}