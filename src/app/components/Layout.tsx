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
} from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { useState } from "react";
import { ThemeSwitcher } from "./Theme/ThemeSwitcher";

const navigation = [
  { name: "Dashboard", href: "/teacher", icon: LayoutDashboard },
  { name: "Attendance", href: "/teacher/attendance", icon: ClipboardCheck },
  { name: "Marks", href: "/teacher/marks", icon: FileText },
  { name: "Notes", href: "/teacher/notes", icon: Upload },
  { name: "Timetable", href: "/teacher/timetable", icon: Calendar },
  { name: "Assignments", href: "/teacher/assignments", icon: BookOpen },
  { name: "Students", href: "/teacher/students", icon: Users },
  { name: "Communication", href: "/teacher/communication", icon: MessageSquare },
];

export function Layout() {
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
              <h1 className="text-xl font-semibold text-foreground">Teacher ERP</h1>
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

          {/* Teacher Info */}
          <div className="p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm text-foreground">John Doe</p>
                <p className="text-xs text-foreground/70">Mathematics Teacher</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 overflow-y-auto">
            <ul className="space-y-1">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                const activeClass =
                  item.name === "Dashboard"
                    ? "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-100"
                    : "bg-blue-50 text-blue-700 dark:bg-blue-900/40 dark:text-blue-100";

                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`
                        flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
                        transition-colors
                        ${isActive ? activeClass : "text-foreground/80 hover:bg-accent hover:text-accent-foreground"}
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

