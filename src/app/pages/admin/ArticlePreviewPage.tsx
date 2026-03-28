import { useNavigate } from "react-router";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { useLanguage } from "../../context/LanguageContext";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useData } from "../../context/DataContext";

export function ArticlePreviewPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { aboutUs } = useData();
  const [article, setArticle] = useState<any>(null);

  useEffect(() => {
    const previewData = localStorage.getItem("kelar_article_preview");
    if (previewData) {
      setArticle(JSON.parse(previewData));
    }
  }, []);

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-white/40 font-black uppercase tracking-[0.3em]">Loading Preview...</div>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="min-h-screen bg-background text-white selection:bg-white selection:text-[var(--background)]">
      {/* Navbar simulation */}
      <div className="fixed top-0 left-0 right-0 z-[100] bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.2em] py-1 text-center backdrop-blur-sm">
        Mode Preview - Artikel Belum Disimpan
      </div>
      <Navbar />

      {/* Article Header */}
      <div className="pt-32 pb-16 bg-white/5 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => window.close()}
            className="flex items-center gap-2 text-white/40 hover:text-white mb-10 transition-colors uppercase text-xs font-black tracking-widest"
          >
            <ArrowLeft size={18} />
            Kembali ke Editor
          </button>

          <h1 className="text-3xl md:text-4xl lg:text-6xl font-black mb-10 text-white font-montserrat tracking-tight leading-tight">
            {article.title || "Judul Artikel"}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-6 pt-6 border-t border-white/10">
            <div className="flex items-center gap-3 text-white/60">
              <Calendar size={18} className="text-blue-400" />
              <span className="font-medium">{formatDate(article.date || new Date().toISOString())}</span>
            </div>

            <div className="flex items-center gap-2 px-6 py-2.5 text-white bg-white/5 border border-white/10 rounded-2xl opacity-50 cursor-not-allowed">
              <Share2 size={18} className="text-blue-400" />
              {t("articleDetail.share")}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Image */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 mb-16 relative z-10">
        <div className="aspect-video rounded-[2.5rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10 bg-white/5">
          {article.thumbnail ? (
            <img
              src={article.thumbnail}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/10 text-xl font-black uppercase tracking-widest">
              Belum Ada Thumbnail
            </div>
          )}
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 text-white">
        <div
          className="prose prose-invert prose-lg max-w-none 
            prose-headings:font-black prose-headings:font-montserrat prose-headings:text-white prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8
            prose-h3:text-2xl prose-h3:mt-10 prose-h3:mb-6
            prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-4 prose-p:font-light
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-ul:my-8 prose-li:my-2 prose-li:text-white/70
            prose-img:rounded-3xl prose-img:shadow-2xl prose-img:border prose-img:border-white/10"
          dangerouslySetInnerHTML={{ __html: article.content || "<p class='text-white/20 italic'>Konten masih kosong...</p>" }}
        />
      </article>

      {/* CTA Section (Mock) */}
      <section className="py-24 px-4 opacity-50">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden bg-white/10 backdrop-blur-3xl border border-white/20 text-white shadow-2xl p-8 md:p-16 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-5xl font-black mb-6 font-montserrat tracking-tight leading-tight">{t("articleDetail.needHelp")}</h2>
            <p className="text-lg md:text-xl mb-10 text-white/60 max-w-2xl font-light">
              {t("articleDetail.helpSubtitle")}
            </p>
            <div className="px-10 py-5 bg-white text-background rounded-2xl font-black uppercase tracking-widest cursor-not-allowed">
              {t("articleDetail.contactUs")}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
