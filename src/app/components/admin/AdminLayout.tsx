import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { SidebarProvider, useSidebar } from "../../context/SidebarContext";
import { api } from "../../services/api";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayoutContent({ children }: AdminLayoutProps) {
  const navigate = useNavigate();
  const { isCollapsed, setIsCollapsed } = useSidebar();

  useEffect(() => {
    // Check if user is logged in
    const authenticated = api.isAuthenticated();
    const token = api.getToken();
    console.log("[AdminLayout] Pengecekan status login:", {
      authenticated,
      hasToken: !!token,
    });

    if (!authenticated) {
      console.log("[AdminLayout] Sesi tidak valid, mengalihkan ke login...");
      navigate("/admin/login");
    } else {
      console.log("[AdminLayout] Sesi valid, tetap di dashboard.");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <AdminSidebar />

      {/* Overlay for mobile */}
      {!isCollapsed && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setIsCollapsed(true)}
        />
      )}

      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        <AdminHeader />

        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SidebarProvider>
  );
}
