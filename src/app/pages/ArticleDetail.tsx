import { useParams, useNavigate, Link } from "react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { useEffect } from "react";
import { ArticleCard } from "../components/ArticleCard";

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
      <div className="min-h-screen bg-background transition-colors">
        <Navbar />
        <div className="pt-32 pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-20">
            <h1 className="text-4xl md:text-6xl font-black mb-6 text-white tracking-tight font-montserrat">
              {t("articleDetail.notFound")}
            </h1>
            <p className="text-white/60 mb-12 text-lg">
              {t("articleDetail.notFoundDesc") ||
                "Artikel yang Anda cari tidak tersedia atau telah dihapus."}
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[var(--background)] rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
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
    <div className="min-h-screen bg-background text-white transition-colors selection:bg-white selection:text-[var(--background)]">
      <Navbar />

      {/* Article Header */}
      <div className="pt-32 pb-16 bg-white/5 border-b border-white/5 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-white/40 hover:text-white mb-10 transition-colors uppercase text-xs font-black tracking-widest"
          >
            <ArrowLeft size={18} />
            {t("common.backToHome")}
          </button>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black mb-10 text-white font-montserrat tracking-tight leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-white/60">
              <Calendar size={18} className="text-blue-400" />
              <span className="font-medium">{formatDate(article.date)}</span>
            </div>

            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-6 py-2.5 text-white bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all font-bold text-sm"
            >
              <Share2 size={18} className="text-blue-400" />
              {t("articleDetail.share")}
            </button>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16 relative z-10">
        <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10">
          <img
            src={article.thumbnail}
            alt={article.title}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-white">
        <div
          className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-black prose-headings:font-montserrat prose-headings:text-white prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-6
            prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-8 prose-p:font-light
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-ul:my-8 prose-li:my-2 prose-li:text-white/70
            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10
            [font-family:inherit]"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />
      </article>

      {/* Related Articles */}
      {otherArticles.length > 0 && (
        <section className="py-24 bg-white/5 border-y border-white/5 transition-colors relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-3xl md:text-5xl font-black mb-16 text-white font-montserrat tracking-tight">
              {t("articleDetail.otherArticles")}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {otherArticles.map((relatedArticle) => (
                <ArticleCard key={relatedArticle.id} article={relatedArticle} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-white/10 backdrop-blur-3xl border border-white/20 text-white shadow-2xl p-8 md:p-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-montserrat tracking-tight leading-tight">{t("articleDetail.needHelp")}</h2>
            <p className="text-lg md:text-xl mb-10 text-white/60 max-w-2xl font-light">
              {t("articleDetail.helpSubtitle")}
            </p>
            <a
              href={`https://wa.me/62${aboutUs.whatsapp.replace(/^0/, "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white text-background rounded-2xl font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
            >
              {t("articleDetail.contactUs")}
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
