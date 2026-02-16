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
      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
    >
      {/* Thumbnail */}
      <div className="aspect-video overflow-hidden relative">
        <img
          src={article.thumbnail}
          alt={article.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-2 text-sm text-[var(--kelar-primary)] mb-3">
          <Calendar size={16} />
          <span>{formatDate(article.date)}</span>
        </div>

        <h3 className="text-xl mb-3 dark:text-white group-hover:text-[var(--kelar-primary)] transition-colors line-clamp-2">
          {article.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
          {article.excerpt}
        </p>

        <div className="flex items-center gap-2 text-[var(--kelar-primary)] group-hover:gap-3 transition-all">
          <span>{t("articles.readMore")}</span>
          <ArrowRight
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
        </div>
      </div>
    </Link>
  );
}
