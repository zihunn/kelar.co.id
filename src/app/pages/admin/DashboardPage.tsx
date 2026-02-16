import { AdminLayout } from '../../components/admin/AdminLayout';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { Image, FileText, CheckCircle, Clock, Info } from 'lucide-react';

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
      <div>
        <h1 className="text-2xl sm:text-3xl mb-6 sm:mb-8 dark:text-white">{t('admin.overview')}</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <span className="text-2xl sm:text-3xl text-gray-800 dark:text-gray-200">{stat.value}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
          <h2 className="text-lg sm:text-xl mb-3 sm:mb-4 dark:text-white">{t('admin.quickActions')}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <a
              href="/admin/hero-slider"
              className="p-3 sm:p-4 border-2 border-[var(--kelar-primary)] dark:border-blue-500 rounded-lg hover:bg-[var(--kelar-primary)] hover:text-white dark:text-gray-300 transition-colors text-center"
            >
              <Image className="mx-auto mb-2" size={20} />
              <span className="text-sm sm:text-base">{t('admin.manageSlider')}</span>
            </a>
            <a
              href="/admin/articles"
              className="p-3 sm:p-4 border-2 border-[var(--kelar-primary)] dark:border-blue-500 rounded-lg hover:bg-[var(--kelar-primary)] hover:text-white dark:text-gray-300 transition-colors text-center"
            >
              <FileText className="mx-auto mb-2" size={20} />
              <span className="text-sm sm:text-base">{t('admin.manageArticles')}</span>
            </a>
            <a
              href="/admin/about"
              className="p-3 sm:p-4 border-2 border-[var(--kelar-primary)] dark:border-blue-500 rounded-lg hover:bg-[var(--kelar-primary)] hover:text-white dark:text-gray-300 transition-colors text-center"
            >
              <Info className="mx-auto mb-2" size={20} />
              <span className="text-sm sm:text-base">{t('admin.aboutUs')}</span>
            </a>
          </div>
        </div>

        {/* Recent Articles */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-xl shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl mb-3 sm:mb-4 dark:text-white">{t('admin.recentArticles')}</h2>
          {articles.length === 0 ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6 sm:py-8 text-sm sm:text-base">{t('admin.noArticles')}</p>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {articles.slice(0, 5).map(article => (
                <div key={article.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 rounded-lg gap-3 sm:gap-0">
                  <div className="flex-1">
                    <h3 className="mb-1 dark:text-white text-sm sm:text-base">{article.title}</h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{article.date}</p>
                  </div>
                  <span 
                    className={`px-3 py-1 rounded-full text-xs sm:text-sm self-start sm:self-auto ${
                      article.status === 'published' 
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300' 
                        : 'bg-orange-100 text-orange-700 dark:bg-orange-900 dark:text-orange-300'
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