"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  Users,
  Newspaper,
  Settings,
  Shield,
  Menu,
  X,
  ExternalLink,
  Bell,
  Search,
  ChevronRight,
  LogOut,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

const NAV_ITEMS = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    href: "/admin/applications",
    icon: FileText,
    badge: "6 pending",
    badgeColor: "bg-amber-500/10 text-amber-600 border border-amber-500/20",
  },
  {
    label: "Leads",
    href: "/admin/leads",
    icon: Users,
    badge: "New",
    badgeColor: "bg-brand/10 text-brand-deep border border-brand/20",
  },
  {
    label: "Blog & CMS",
    href: "/admin/blog",
    icon: Newspaper,
  },
  {
    label: "Settings",
    href: "/admin/setting",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // The login page renders without the admin chrome (sidebar / topbar).
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    toast.info("Logged out successfully");
    router.replace("/admin/login");
  };

  const getBreadcrumbs = () => {
    const parts = pathname.split("/").filter(Boolean);
    return parts.map((part, idx) => {
      const href = "/" + parts.slice(0, idx + 1).join("/");
      const label = part.charAt(0).toUpperCase() + part.slice(1);
      return { href, label };
    });
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-slate-50/60 font-sans text-foreground flex flex-col md:flex-row">
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col justify-between border-r border-border bg-card shadow-soft transition-transform duration-300 md:static md:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div>
          {/* Header / Brand */}
          <div className="flex h-16 items-center justify-between border-b border-border px-6">
            <Link
              href="/admin/dashboard"
              className="flex items-center gap-2.5 font-bold tracking-tight text-foreground"
            >
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-brand text-brand-foreground shadow-soft">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold leading-none text-foreground">
                  IRIS <span className="text-gray-500 font-normal">Capital</span>
                </span>
                <span className="mt-1 text-[10px] font-semibold tracking-wider text-brand uppercase">
                  Admin Portal
                </span>
              </div>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="grid h-8 w-8 place-items-center rounded-lg text-gray-500 hover:bg-accent md:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* System Status Pill */}
          <div className="px-4 pt-4 pb-2">
            <div className="flex items-center justify-between rounded-xl border border-border bg-slate-50 px-3 py-2 text-xs">
              <div className="flex items-center gap-2 text-gray-600">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
                </span>
                <span className="font-medium text-slate-700">System Live</span>
              </div>
              <span className="font-mono text-[10px] text-gray-500">v2.4.0</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1 px-3 py-3">
            <div className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Management
            </div>
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive =
                pathname === item.href ||
                (item.href !== "/admin" && pathname.startsWith(item.href));

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-150 ${
                    isActive
                      ? "bg-brand text-brand-foreground shadow-soft font-semibold"
                      : "text-gray-600 hover:bg-accent hover:text-foreground"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      className={`h-4 w-4 transition-transform group-hover:scale-110 ${
                        isActive ? "text-brand-foreground" : "text-gray-400 group-hover:text-brand"
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        isActive
                          ? "bg-white/20 text-white"
                          : item.badgeColor ?? "bg-muted text-gray-600"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}

            <div className="pt-6 mb-2 px-3 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
              Quick Links
            </div>
            <Link
              href="/"
              target="_blank"
              className="flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm font-medium text-gray-600 hover:bg-accent hover:text-foreground transition-colors"
            >
              <div className="flex items-center gap-3">
                <ExternalLink className="h-4 w-4 text-gray-400" />
                <span>Live Website</span>
              </div>
              <ChevronRight className="h-3.5 w-3.5 text-gray-400" />
            </Link>
          </nav>
        </div>

        {/* User / Sidebar Footer */}
        <div className="border-t border-border p-4">
          <div className="flex items-center justify-between rounded-2xl border border-border bg-slate-50/80 p-3">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand/10 font-semibold text-brand-deep">
                AD
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-semibold text-foreground">
                  Admin
                </p>
              </div>
            </div>
            <button
              onClick={logout}
              title="Log out"
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg text-gray-400 hover:bg-white hover:text-red-600 shadow-2xs transition-colors"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur-md md:px-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-9 w-9 place-items-center rounded-xl border border-border bg-background text-gray-600 hover:bg-accent md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb */}
            <nav className="hidden sm:flex items-center gap-2 text-xs text-gray-500 font-medium">
              <Link href="/admin/dashboard" className="hover:text-foreground">
                Admin
              </Link>
              {breadcrumbs.map((b) => (
                <div key={b.href} className="flex items-center gap-2">
                  <ChevronRight className="h-3 w-3 text-gray-400" />
                  <span
                    className={
                      b.href === pathname
                        ? "font-semibold text-foreground"
                        : "hover:text-foreground"
                    }
                  >
                    {b.label}
                  </span>
                </div>
              ))}
            </nav>
          </div>

          {/* Right Header Actions */}
          <div className="flex items-center gap-3">
            {/* Quick Search */}
            <div className="relative hidden md:block w-56 lg:w-64">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
              <input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick search..."
                className="h-9 w-full rounded-xl border border-input bg-slate-50 pl-9 pr-3 text-xs outline-none focus:border-brand focus:bg-card transition-colors"
              />
            </div>

            {/* Notifications */}
            <button
              onClick={() => toast("2 new notifications", { description: "2 applications awaiting review." })}
              className="relative grid h-9 w-9 place-items-center rounded-xl border border-border bg-background text-gray-600 hover:bg-accent transition-colors"
              title="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-brand"></span>
            </button>

            {/* Quick Action Button */}
            <Link
              href="/admin/applications"
              className="hidden sm:inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-brand px-3.5 text-xs font-semibold text-brand-foreground shadow-soft hover:bg-brand-deep transition-all"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Review Apps</span>
            </Link>
          </div>
        </header>

        {/* Dynamic Admin Page View */}
        <main className="flex-1 p-4 md:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
