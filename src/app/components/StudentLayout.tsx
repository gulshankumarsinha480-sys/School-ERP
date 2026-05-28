import { Outlet, Link, useLocation } from "react-router";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  ClipboardCheck,
  DollarSign,
  Calendar,
  Upload,
  MessageSquare,
  LogOut,
  Menu,
  X,
  Gift,
  Award,           // New icon for Admit Card
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { ThemeSwitcher } from "./Theme/ThemeSwitcher";

const navigation = [
  { name: "Dashboard", href: "/student", icon: LayoutDashboard },
  { name: "Marks & Results", href: "/student/marks", icon: FileText },
  { name: "Assignments", href: "/student/assignments", icon: BookOpen },
  { name: "Attendance", href: "/student/attendance", icon: ClipboardCheck },
  { name: "Fees", href: "/student/fees", icon: DollarSign },
  { name: "Timetable", href: "/student/timetable", icon: Calendar },
  { name: "Holidays", href: "/student/holidays", icon: Gift },
  { name: "Admit Card", href: "/student/admit-card", icon: Award },        // ← New
  { name: "Resources", href: "/student/resources", icon: Upload },
  { name: "Communication", href: "/student/communication", icon: MessageSquare },
];

export function StudentLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
              <h1 className="text-xl font-semibold text-foreground">Student Portal</h1>
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

          {/* Student Info */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>SA</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-foreground">Sarah Anderson</p>
                <p className="text-xs text-foreground/70">Class 10-A | Roll: 15</p>
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

          <div className="flex items-center gap-3 ml-auto">
            <ThemeSwitcher />
            <p className="text-xs sm:text-sm text-foreground/70">Academic Year: 2025-26</p>
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