import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Image,
  FileText,
  Info,
  LogOut,
  Menu,
  X,
  Tag,
  ShieldCheck,
  BarChart3,
} from "lucide-react";
import { useSidebar } from "../../context/SidebarContext";
import { useLanguage } from "../../context/LanguageContext";
import { api } from "../../services/api";

export function AdminSidebar() {
  const location = useLocation();
  const { isCollapsed, toggleSidebar, setIsCollapsed } = useSidebar();
  const { t } = useLanguage();

  const menuItems = [
    {
      path: "/admin/dashboard",
      icon: LayoutDashboard,
      label: t("admin.dashboard"),
    },
    { path: "/admin/stats", icon: BarChart3, label: "Statistik" },
    { path: "/admin/hero-slider", icon: Image, label: t("admin.heroSlider") },
    { path: "/admin/articles", icon: FileText, label: t("admin.articles") },
    { path: "/admin/promos", icon: Tag, label: t("admin.promos") },
    { path: "/admin/services", icon: ShieldCheck, label: "Layanan" },
    { path: "/admin/about", icon: Info, label: t("admin.aboutUs") },
  ];

  const handleLogout = () => {
    api.logout();
    window.location.href = "/admin/login";
  };

  const handleMenuClick = () => {
    // Auto-hide sidebar on mobile when menu item is clicked
    if (window.innerWidth < 1024) {
      setIsCollapsed(true);
    }
  };

  return (
    <div
      className={`bg-blue-950/40 backdrop-blur-2xl text-white h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 z-40 border-r border-white/10 ${
        isCollapsed
          ? "-translate-x-full lg:translate-x-0 lg:w-20"
          : "translate-x-0 w-64 shadow-[20px_0_50px_rgba(0,0,0,0.2)]"
      }`}
    >
      {/* Logo & Toggle */}
      <div className="p-6 border-b border-white/10 flex items-center justify-between">
        {!isCollapsed && (
          <img
            src="https://bion-dev.zlabs.my.id/images/kelar-white.png"
            alt="Kelar.co.id"
            className="h-16 lg:h-20"
          />
        )}
        <button
          onClick={toggleSidebar}
          className={`p-2 hover:bg-white/10 rounded-lg transition-colors ${
            isCollapsed ? "mx-auto" : ""
          }`}
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <Menu size={24} /> : <X size={24} />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 py-6 overflow-y-auto">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleMenuClick}
              className={`flex items-center gap-3 px-6 py-4 transition-all ${
                isActive
                  ? "bg-white text-[var(--background)] font-black shadow-xl"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              } ${isCollapsed ? "justify-center" : ""}`}
              title={isCollapsed ? item.label : ""}
            >
              <Icon size={20} />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-6 border-t border-white/10">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 text-white/70 hover:text-white transition-colors w-full ${
            isCollapsed ? "justify-center" : ""
          }`}
          title={isCollapsed ? t("admin.logout") : ""}
        >
          <LogOut size={20} />
          {!isCollapsed && <span>{t("admin.logout")}</span>}
        </button>
      </div>
    </div>
  );
}
