import { Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Image,
  FileText,
  Info,
  LogOut,
  Menu,
  X,
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
    { path: "/admin/hero-slider", icon: Image, label: t("admin.heroSlider") },
    { path: "/admin/articles", icon: FileText, label: t("admin.articles") },
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
      className={`bg-[var(--kelar-secondary)] text-white h-screen fixed left-0 top-0 flex flex-col transition-all duration-300 z-40 ${
        // Mobile behavior: slide in/out from left
        // Desktop behavior: collapse to icon-only
        isCollapsed
          ? "-translate-x-full lg:translate-x-0 lg:w-20"
          : "translate-x-0 w-64"
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
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive
                  ? "bg-[var(--kelar-primary)] text-white"
                  : "text-gray-300 hover:bg-white/10 hover:text-white"
              } ${isCollapsed ? "justify-center lg:px-6" : ""}`}
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
          className={`flex items-center gap-3 text-gray-300 hover:text-white transition-colors w-full ${
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
