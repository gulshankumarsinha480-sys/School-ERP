import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  ClipboardCheck,
  FileText,
  Upload,
  Calendar,
  BookOpen,
  Users,
  MessageSquare,
  LogOut,
  Menu,
  X,
  GraduationCap,
  Package,
  Wallet,
  Library,
  BarChart3,
  ChevronDown,
  ChevronRight,
  School,
  Settings,
  UserPlus,
  UsersRound,
  Boxes,
  HeartHandshake,
  GroupIcon,
  BuildingIcon,
  Building2,
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState, useRef, useEffect } from "react";
import { ThemeSwitcher } from "./Theme/ThemeSwitcher";

// ── Setup menu items ──────────────────────────────────────────────────────────
const setupMenuItems = [
  { name: "Section Setup", href:  "./setup/sectionSetup", icon: Building2},
  { name: "Class setup",     href: "./setup/classSetup", icon: BuildingIcon},
  { name: "Student Setup",   href: "/principal/setup/students",   icon: GraduationCap },
  { name: "Teacher Setup",   href: "/principal/setup/teachers",   icon: UsersRound     },
  { name: "Inventory Setup", href: "/principal/setup/inventory",  icon: Boxes          },
  { name: "Parent Setup",    href: "/principal/setup/parents",    icon: HeartHandshake },
  { name: "Academic year",  href: "./setup/academicYear",  icon: Calendar},
];

// Navigation groups for Principal — grouped by domain for clarity
const navigationGroups = [
  {
    label: "Overview",
    items: [
      { name: "Dashboard",          href: "/principal",          icon: LayoutDashboard },
      { name: "Reports & Analytics", href: "/principal/reports", icon: BarChart3       },
    ],
  },
  {
    label: "Student Details",
    items: [
      { name: "Manage Students",  href: "/principal/students", icon: GroupIcon},
      { name: "Attendance",  href: "/principal/attendance",  icon: ClipboardCheck },
      { name: "Marks",       href: "/principal/marks",       icon: FileText       },
      { name: "Assignments", href: "/principal/assignments", icon: BookOpen       },
      { name: "Timetable",   href: "/principal/timetable",   icon: Calendar       },
      { name: "Notes",       href: "/principal/notes",       icon: Upload         },
    ],
  },
  {
    label: "Administration",
    items: [
      { name: "Finance",       href: "/principal/finance",        icon: Wallet        },
      { name: "Inventory",     href: "/principal/inventory",      icon: Package       },
      { name: "Library",       href: "/principal/library",        icon: Library       },
      { name: "Communication", href: "/principal/communication",  icon: MessageSquare },
    ],
  },
];

// Flattened list used for active-path matching
const allNavItems = navigationGroups.flatMap((g) => g.items);

// ── Setup Dropdown ─────────────────────────────────────────────────────────────
function SetupDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isSetupActive = setupMenuItems.some((i) => location.pathname === i.href);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((p) => !p)}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium
          border transition-colors
          ${isSetupActive
            ? "bg-violet-50 border-violet-200 text-violet-700 dark:bg-violet-900/40 dark:border-violet-700 dark:text-violet-200"
            : "bg-card border-border text-foreground/75 hover:bg-accent hover:text-foreground"
          }
        `}
      >
        <Settings className={`h-4 w-4 ${isSetupActive ? "text-violet-600 dark:text-violet-300" : ""}`} />
        <span>Setup</span>
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Panel */}
      {open && (
        <div
          className="
            absolute right-0 top-full mt-2 w-52 z-50
            bg-card border border-border rounded-xl shadow-lg
            overflow-hidden
            animate-in fade-in slide-in-from-top-1 duration-150
          "
        >
          {/* Header */}
          <div className="px-3 py-2 border-b border-border bg-accent/30">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-foreground/40">
              Setup Options
            </p>
          </div>

          {/* Items */}
          <ul className="p-1.5 space-y-0.5">
            {setupMenuItems.map((item) => {
              const active = location.pathname === item.href;
              return (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    className={`
                      flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium
                      transition-colors
                      ${active
                        ? "bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200"
                        : "text-foreground/75 hover:bg-accent hover:text-foreground"
                      }
                    `}
                  >
                    <item.icon
                      className={`h-4 w-4 shrink-0 ${active ? "text-violet-600 dark:text-violet-300" : "text-foreground/50"}`}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

// ── Main Layout ────────────────────────────────────────────────────────────────
export function PrincipalLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  const toggleGroup = (label: string) => {
    setCollapsedGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Sidebar ── */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50
          transform transition-transform duration-200 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex flex-col h-full">

          {/* Logo / Header */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-border">
            <div className="flex items-center gap-2">
              <School className="h-5 w-5 text-violet-600 dark:text-violet-400" />
              <div>
                <h1 className="text-xl font-semibold text-foreground leading-tight">
                  Principal ERP
                </h1>
                <p className="text-xs text-foreground/60">School Management</p>
              </div>
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

          {/* Principal Info */}
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200 font-semibold">
                  PS
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="font-medium text-sm text-foreground truncate">Dr. Priya Sharma</p>
                <span className="inline-flex items-center rounded-full bg-violet-100 dark:bg-violet-900/50 px-2 py-0.5 text-[10px] font-medium text-violet-700 dark:text-violet-300">
                  Principal
                </span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-1">
            {navigationGroups.map((group) => {
              const isCollapsed = collapsedGroups[group.label];
              return (
                <div key={group.label}>
                  <button
                    onClick={() => toggleGroup(group.label)}
                    className="w-full flex items-center justify-between px-3 py-1.5 mb-0.5 rounded-md
                      text-[11px] font-semibold uppercase tracking-wider
                      text-foreground/40 hover:text-foreground/60 transition-colors"
                  >
                    <span>{group.label}</span>
                    {isCollapsed
                      ? <ChevronRight className="h-3 w-3" />
                      : <ChevronDown className="h-3 w-3" />
                    }
                  </button>

                  {!isCollapsed && (
                    <ul className="space-y-0.5 mb-2">
                      {group.items.map((item) => {
                        const active = isActive(item.href);
                        return (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              onClick={() => setSidebarOpen(false)}
                              className={`
                                flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                                transition-colors
                                ${active
                                  ? "bg-violet-50 text-violet-700 dark:bg-violet-900/40 dark:text-violet-200"
                                  : "text-foreground/75 hover:bg-accent hover:text-accent-foreground"
                                }
                              `}
                            >
                              <item.icon
                                className={`h-4 w-4 shrink-0 ${active ? "text-violet-600 dark:text-violet-300" : ""}`}
                              />
                              {item.name}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-3 border-t border-border">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <div className="lg:pl-64">

        {/* Top Bar */}
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-4 lg:px-6 gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Breadcrumb */}
          <div className="hidden lg:flex items-center gap-2 text-sm text-foreground/60">
            <School className="h-4 w-4" />
            <span>/</span>
            <span className="text-foreground font-medium">
              {allNavItems.find((i) => i.href === location.pathname)?.name
                ?? setupMenuItems.find((i) => i.href === location.pathname)?.name
                ?? "Principal"}
            </span>
          </div>

          {/* Right-side actions */}
          <div className="flex items-center gap-3 ml-auto flex-wrap justify-end">
            {/* ── Setup Dropdown ── */}
            <SetupDropdown />

            <ThemeSwitcher />
            <p className="text-xs sm:text-sm text-foreground/60">Academic Year: 2025-26</p>
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