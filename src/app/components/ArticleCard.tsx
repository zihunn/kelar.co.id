import { Link } from "react-router";
import { Calendar, ArrowRight } from "lucide-react";
import { Article } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";

interface ArticleCardProps {
  article: Article;
}

export function ArticleCard({ article }: ArticleCardProps) {
  const { t } = useLanguage();
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Link
      to={`/artikel/${article.id}`}
      className="group flex flex-col h-full bg-white/10 backdrop-blur-2xl rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-white/5 transition-all duration-500 hover:-translate-y-2 border border-white/20 relative overflow-hidden"
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute top-6 left-6">
          <span className="px-4 py-1.5 bg-white text-[var(--background)] text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg">
            Insight
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-xs font-bold text-white/40 mb-6 uppercase tracking-widest">
          <Calendar size={14} />
          <span>{formatDate(article.date)}</span>
        </div>

        <h3 className="text-2xl font-black mb-6 text-white group-hover:text-white/80 transition-colors line-clamp-2 leading-[1.2] tracking-tight text-shadow-sm">
          {article.title}
        </h3>

        <p className="text-white/60 line-clamp-3 mb-10 text-base leading-relaxed font-light">
          {article.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between pt-8 border-t border-white/10">
          <div className="flex items-center gap-3 text-white font-black text-sm group-hover:gap-5 transition-all duration-300 uppercase tracking-widest">
            <span>{t("articles.readMore")}</span>
            <ArrowRight
              size={18}
              className="group-hover:translate-x-2 transition-transform"
            />
          </div>
          <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-[var(--background)] transition-all duration-500">
             <ArrowRight size={20} />
          </div>
        </div>
      </div>
    </Link>
  );
}
