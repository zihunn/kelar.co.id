import { lazy, Suspense } from "react";
import { createBrowserRouter, RouterProvider } from "react-router";
import { DataProvider } from "./context/DataContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider, useLanguage } from "./context/LanguageContext";
import { Toaster } from "sonner";

// Lazy load all pages
const LandingPage = lazy(() =>
  import("./pages/LandingPage").then((m) => ({ default: m.LandingPage })),
);
const ArticleDetail = lazy(() =>
  import("./pages/ArticleDetail").then((m) => ({ default: m.ArticleDetail })),
);
const LoginPage = lazy(() =>
  import("./pages/admin/LoginPage").then((m) => ({ default: m.LoginPage })),
);
const DashboardPage = lazy(() =>
  import("./pages/admin/DashboardPage").then((m) => ({
    default: m.DashboardPage,
  })),
);
const HeroSliderPage = lazy(() =>
  import("./pages/admin/HeroSliderPage").then((m) => ({
    default: m.HeroSliderPage,
  })),
);
const ArticlesPage = lazy(() =>
  import("./pages/admin/ArticlesPage").then((m) => ({
    default: m.ArticlesPage,
  })),
);
const AboutUsPage = lazy(() =>
  import("./pages/admin/AboutUsPage").then((m) => ({ default: m.AboutUsPage })),
);

function NotFound() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="text-center">
        <h1 className="text-4xl mb-4 dark:text-white">404</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          {t("common.notFound")}
        </p>
        <a
          href="/"
          className="px-6 py-3 bg-[var(--kelar-primary)] text-white rounded-lg hover:bg-[var(--kelar-primary-light)] transition-colors inline-block"
        >
          {t("common.backToHome")}
        </a>
      </div>
    </div>
  );
}

function LoadingFallback() {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--kelar-primary)] mx-auto mb-4"></div>
        <p className="text-gray-600 dark:text-gray-400">
          {t("common.loading")}
        </p>
      </div>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: "/artikel/:id",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ArticleDetail />
      </Suspense>
    ),
  },
  {
    path: "/admin/login",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <LoginPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/dashboard",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <DashboardPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/hero-slider",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <HeroSliderPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/articles",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <ArticlesPage />
      </Suspense>
    ),
  },
  {
    path: "/admin/about",
    element: (
      <Suspense fallback={<LoadingFallback />}>
        <AboutUsPage />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return (
    <DataProvider>
      <ThemeProvider>
        <LanguageProvider>
          <RouterProvider router={router} />
          <Toaster position="top-right" richColors />
        </LanguageProvider>
      </ThemeProvider>
    </DataProvider>
  );
}
