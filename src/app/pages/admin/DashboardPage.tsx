import { AdminLayout } from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Image, FileText, CheckCircle, Clock, Info, Tag as TagIcon } from 'lucide-react';

export function DashboardPage() {
  const { heroSlides, articles } = useData();
  const { t } = useLanguage();

  const publishedArticles = articles.filter(a => a.status === 'published');
  const draftArticles = articles.filter(a => a.status === 'draft');

  const stats = [
    {
      label: t('admin.stats.heroSlides'),
      value: heroSlides.length,
      icon: Image,
      color: 'bg-blue-500'
    },
    {
      label: t('admin.stats.totalArticles'),
      value: articles.length,
      icon: FileText,
      color: 'bg-green-500'
    },
    {
      label: t('admin.stats.published'),
      value: publishedArticles.length,
      icon: CheckCircle,
      color: 'bg-purple-500'
    },
    {
      label: t('admin.stats.draft'),
      value: draftArticles.length,
      icon: Clock,
      color: 'bg-orange-500'
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-10 pb-20">
        <div className="flex flex-col gap-2">
          <h1 className="text-4xl font-black text-white tracking-tighter drop-shadow-lg">
            {t('admin.overview')}
          </h1>
          <p className="text-white/80 font-medium">Selamat datang di sistem manajemen konten Kelar.co.id</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.label} 
                className="bg-white/10 backdrop-blur-2xl rounded-[2.5rem] border border-white/20 shadow-2xl p-8 group hover:bg-white/15 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl group-hover:bg-white/10 transition-colors" />
                <div className="flex items-center justify-between mb-8 relative z-10">
                  <div className={`w-16 h-16 ${stat.color} rounded-2xl flex items-center justify-center shadow-2xl transition-transform group-hover:scale-110 duration-500`}>
                    <Icon className="text-white" size={32} />
                  </div>
                  <span className="text-5xl font-black text-white tracking-tighter">{stat.value}</span>
                </div>
                <p className="text-sm font-black uppercase tracking-widest text-white/80 relative z-10">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl p-10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white opacity-[0.03] rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
            <div className="w-12 h-1 bg-white rounded-full" />
            <h2 className="text-2xl font-black text-white tracking-tight leading-none">{t('admin.quickActions')}</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            <a
              href="/admin/hero-slider"
              className="group/btn p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white text-white hover:text-[var(--background)] transition-all duration-500 text-center shadow-lg active:scale-[0.98]"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover/btn:bg-[var(--background)]/10 transition-colors">
                <Image className="group-hover/btn:scale-110 transition-transform" size={32} />
              </div>
              <span className="text-lg font-black tracking-tight">{t('admin.manageSlider')}</span>
            </a>
            <a
              href="/admin/articles"
              className="group/btn p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white text-white hover:text-[var(--background)] transition-all duration-500 text-center shadow-lg active:scale-[0.98]"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover/btn:bg-[var(--background)]/10 transition-colors">
                <FileText className="group-hover/btn:scale-110 transition-transform" size={32} />
              </div>
              <span className="text-lg font-black tracking-tight">{t('admin.manageArticles')}</span>
            </a>
            <a
              href="/admin/about"
              className="group/btn p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white text-white hover:text-[var(--background)] transition-all duration-500 text-center shadow-lg active:scale-[0.98]"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover/btn:bg-[var(--background)]/10 transition-colors">
                <Info className="group-hover/btn:scale-110 transition-transform" size={32} />
              </div>
              <span className="text-lg font-black tracking-tight">{t('admin.aboutUs')}</span>
            </a>
            <a
              href="/admin/promos"
              className="group/btn p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white text-white hover:text-[var(--background)] transition-all duration-500 text-center shadow-lg active:scale-[0.98]"
            >
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover/btn:bg-[var(--background)]/10 transition-colors">
                <TagIcon className="group-hover/btn:scale-110 transition-transform" size={32} />
              </div>
              <span className="text-lg font-black tracking-tight">{t('admin.managePromos')}</span>
            </a>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 shadow-2xl p-10">
          <div className="flex items-center gap-4 mb-10 border-b border-white/10 pb-6">
            <div className="w-12 h-1 bg-white rounded-full" />
            <h2 className="text-2xl font-black text-white tracking-tight leading-none">{t('admin.recentArticles')}</h2>
          </div>
          
          {articles.length === 0 ? (
            <div className="text-center py-20 bg-white/5 rounded-[2.5rem] border border-white/10">
              <FileText size={64} className="mx-auto text-white/10 mb-6" />
              <p className="text-white/40 text-lg font-medium">{t('admin.noArticles')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {articles.slice(0, 5).map(article => (
                <div 
                  key={article.id} 
                  className="group flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/5 hover:bg-white/10 border border-white/10 rounded-[2rem] transition-all gap-4 sm:gap-0"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white/50 group-hover:text-white transition-colors">
                      <FileText size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">{article.title}</h3>
                      <p className="text-sm font-medium text-white/40">{article.date}</p>
                    </div>
                  </div>
                  <span 
                    className={`px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest self-start sm:self-auto shadow-lg backdrop-blur-md ${
                      article.status === 'published' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                        : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                    }`}
                  >
                    {article.status === 'published' ? t('admin.published') : t('admin.draft')}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}