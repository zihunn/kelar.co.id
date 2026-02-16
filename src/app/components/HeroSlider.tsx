import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate } from "react-router";

export function HeroSlider() {
  const { heroSlides } = useData();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Only show published slides
  const publishedSlides = heroSlides.filter(
    (slide) => slide.status === "published",
  );

  useEffect(() => {
    if (publishedSlides.length === 0) return;

    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % publishedSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [publishedSlides.length]);

  if (publishedSlides.length === 0) {
    return null;
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + publishedSlides.length) % publishedSlides.length,
    );
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % publishedSlides.length);
  };

  return (
    <div className="relative mt-24 overflow-hidden">
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {publishedSlides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div className="relative h-[500px] md:h-[600px]">
              {/* Background Image */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
              </div>

              {/* Content */}
              <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
                <div className="max-w-2xl text-white">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6">
                    {slide.title}
                  </h1>
                  <p className="text-lg md:text-xl mb-8 text-gray-200">
                    {slide.description}
                  </p>
                  <button
                    onClick={() => navigate(`/artikel/${slide.redirectUrl}`)}
                    className="px-8 py-4 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors"
                  >
                    {t("hero.readMore")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      {publishedSlides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/60 transition-all shadow-lg text-[var(--kelar-primary)]"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/40 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/60 transition-all shadow-lg text-[var(--kelar-primary)]"
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {publishedSlides.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex gap-2">
          {publishedSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
