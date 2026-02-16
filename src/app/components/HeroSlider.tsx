import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useData } from "../context/DataContext";
import { useLanguage } from "../context/LanguageContext";
import { useNavigate, useLocation } from "react-router";

export function HeroSlider() {
  const { heroSlides } = useData();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  // Minimum distance for a swipe to be registered
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  return (
    <div
      className="relative mt-16 md:mt-24 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {publishedSlides.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div className="relative h-[700px] md:h-[850px]">
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
                    onClick={() => {
                      if (slide.redirectUrl.startsWith("/#")) {
                        const sectionId = slide.redirectUrl.replace("/#", "");
                        if (location.pathname === "/") {
                          const element = document.getElementById(sectionId);
                          if (element) {
                            const navbarElement = document.querySelector("nav");
                            const navbarHeight =
                              navbarElement?.offsetHeight || 96;
                            const elementPosition =
                              element.getBoundingClientRect().top;
                            const offsetPosition =
                              elementPosition +
                              window.pageYOffset -
                              navbarHeight;

                            window.scrollTo({
                              top: offsetPosition,
                              behavior: "smooth",
                            });
                          }
                        } else {
                          navigate(slide.redirectUrl);
                        }
                      } else {
                        navigate(`/artikel/${slide.redirectUrl}`);
                      }
                    }}
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

      {/* Navigation Arrows - Hidden on Mobile */}
      {publishedSlides.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="hidden md:flex absolute left-1 md:left-4 top-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white/30 transition-all shadow-lg text-white"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 md:w-6 md:h-6" />
          </button>
          <button
            onClick={goToNext}
            className="hidden md:flex absolute right-1 md:right-4 top-1/2 -translate-y-1/2 z-10 w-7 h-7 md:w-12 md:h-12 bg-white/10 backdrop-blur-sm rounded-full items-center justify-center hover:bg-white/30 transition-all shadow-lg text-white"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 md:w-6 md:h-6" />
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
