import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  Package,
  Box,
  FileText,
  LogOut,
  Menu,
  X,
  Settings,
  Users,
  Building2,
  BookOpen,
  Bell,
  ChevronDown,
  Warehouse,
  Tag,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState, useRef, useEffect } from "react";
import { ThemeSwitcher } from "./Theme/ThemeSwitcher";

const navigation = [
  { name: "Dashboard", href: "/inventory", icon: LayoutDashboard },
  { name: "All Items", href: "/inventory/items", icon: Package },
  { name: "Categories", href: "/inventory/categories", icon: Box },
  { name: "Reports", href: "/inventory/reports", icon: FileText },
];

const setupMenuItems = [
  {
    group: "Configuration",
    items: [
      { name: "Warehouses", href: "/inventory/setup/warehouses", icon: Warehouse },
      { name: "Units & Measures", href: "/inventory/setup/units", icon: Tag },
      { name: "Item Categories", href: "/inventory/setup/item-categories", icon: Box },
    ],
  },
  {
    group: "Administration",
    items: [
      { name: "Users & Roles", href: "/inventory/setup/users", icon: Users },
      { name: "School Info", href: "/inventory/setup/school", icon: Building2 },
      { name: "Academic Years", href: "/inventory/setup/academic-years", icon: BookOpen },
      { name: "Notifications", href: "/inventory/setup/notifications", icon: Bell },
    ],
  },
];

export function InventoryLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [setupOpen, setSetupOpen] = useState(false);
  const setupRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (setupRef.current && !setupRef.current.contains(e.target as Node)) {
        setSetupOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setSetupOpen(false);
  }, [location.pathname]);

  const isSetupActive = location.pathname.startsWith("/inventory/setup");

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50
        transform transition-transform duration-200 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}
      >
        <div className="flex flex-col h-full">
          {/* Logo/Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border">
            <div>
              <h1 className="text-xl font-semibold text-foreground">Inventory ERP</h1>
              <p className="text-xs text-foreground/70">School Management</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Inventory Manager Info */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>IM</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-foreground">Inventory Admin</p>
                <p className="text-xs text-foreground/70">Inventory Manager</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                        transition-colors
                        ${isActive
                          ? "bg-accent text-accent-foreground"
                          : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"}
                      `}
                    >
                      <item.icon className="h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => (window.location.href = "/")}
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

            <div className="flex items-center gap-3 ml-auto flex-wrap justify-end">
              <ThemeSwitcher />

              {/* Setup Dropdown */}
            <div className="relative" ref={setupRef}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSetupOpen((prev) => !prev)}
                className={`flex items-center gap-1.5 text-sm font-medium px-3 ${
                  isSetupActive
                    ? "bg-accent text-accent-foreground"
                    : "text-foreground/80"
                }`}
              >
                <Settings className="h-4 w-4" />
                <span className="hidden sm:inline">Setup</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 transition-transform duration-200 ${
                    setupOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              {/* Dropdown Panel */}
              {setupOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50 overflow-hidden">
                  {setupMenuItems.map((group, i) => (
                    <div key={group.group}>
                      
                      {i > 0 && <div className="border-t border-border" />}
                      <p className="px-3 pt-2.5 pb-1 text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
                        {group.group}
                      </p>
                      {group.items.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={`flex items-center gap-2.5 px-3 py-2 text-sm transition-colors
                              ${isActive
                                ? "bg-accent text-accent-foreground"
                                : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"
                              }`}
                          >
                            <item.icon className="h-4 w-4 shrink-0" />
                            {item.name}
                          </Link>
                        );
                      })}
                    </div>
                  ))}

                  <div className="border-t border-border p-2">
                    <Link
                      to="/inventory/setup"
                      className="flex items-center gap-2.5 px-3 py-2 text-sm rounded-md text-foreground/80 hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      <Settings className="h-4 w-4 shrink-0" />
                      All Settings
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <p className="text-xs sm:text-sm text-foreground/70 hidden md:block">Academic Year: 2025-26</p>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}