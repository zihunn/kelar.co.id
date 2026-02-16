import { useParams, useNavigate, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { useEffect } from "react";

export function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getArticleById, articles, aboutUs } = useData();
  const { t } = useLanguage();

  const article = id ? getArticleById(id) : undefined;

  useEffect(() => {
    // Scroll to top when article loads
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl mb-6 dark:text-white">
              {t("articleDetail.notFound")}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              {t("articleDetail.notFoundDesc") ||
                "Artikel yang Anda cari tidak tersedia atau telah dihapus."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors"
            >
              <ArrowLeft size={20} />
              {t("common.backToHome")}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.excerpt,
          url: window.location.href,
        });
      } catch (err) {
        console.log("Error sharing:", err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert(t("articleDetail.copied"));
    }
  };

  // Get other published articles for recommendations
  const otherArticles = articles
    .filter((a) => a.id !== article.id && a.status === "published")
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />

      {/* Article Header */}
      <div className="pt-32 pb-12 bg-[var(--kelar-bg-light)] dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-[var(--kelar-primary)] mb-8 transition-colors"
          >
            <ArrowLeft size={20} />
            {t("common.backToHome")}
          </button>

          <h1 className="text-3xl md:text-4xl lg:text-5xl mb-6 dark:text-white">
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <Calendar size={18} />
              <span>{formatDate(article.date)}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 text-[var(--kelar-primary)] border border-[var(--kelar-primary)] rounded-lg hover:bg-[var(--kelar-primary)] hover:text-white transition-colors"
            >
              <Share2 size={18} />
              {t("articleDetail.share")}
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 mb-12">
        <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 dark:text-white">
        <div
          className="prose prose-lg max-w-none dark:prose-invert
            prose-headings:text-[var(--kelar-secondary)] dark:prose-headings:text-blue-400
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 dark:prose-p:text-white! prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-[var(--kelar-primary)] prose-a:no-underline hover:prose-a:underline
            prose-ul:my-6 prose-li:my-2 dark:prose-li:text-white!
            prose-ol:my-6
            prose-strong:text-[var(--kelar-secondary)] dark:prose-strong:text-white!
            [font-family:inherit] dark:[&_*]:!bg-transparent dark:[&_*]:!text-white"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="py-20 bg-[var(--kelar-bg-light)] dark:bg-gray-800 transition-colors">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl mb-12 dark:text-white">
              {t("articleDetail.otherArticles")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherArticles.map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/artikel/${relatedArticle.id}`}
                  className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-transparent dark:border-gray-700"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={relatedArticle.thumbnail}
                      alt={relatedArticle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg mb-2 group-hover:text-[var(--kelar-primary)] transition-colors line-clamp-2 dark:text-white">
                      {relatedArticle.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                      {relatedArticle.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-[var(--kelar-primary)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-3xl mb-4">{t("articleDetail.needHelp")}</h2>
          <p className="text-lg mb-8 text-blue-100">
            {t("articleDetail.helpSubtitle")}
          </p>
          <a
            href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-4 bg-white text-[var(--kelar-primary)] rounded-lg hover:bg-gray-100 transition-colors"
          >
            {t("articleDetail.contactUs")}
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
