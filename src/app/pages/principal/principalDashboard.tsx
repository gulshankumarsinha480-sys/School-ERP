import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Users, GraduationCap, Wallet, Package, Library, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

const stats = [
  { label: "Total Students", value: "248",  change: "+12 this term", icon: GraduationCap, color: "text-violet-600",  bg: "bg-violet-50 dark:bg-violet-900/20" },
  { label: "Total Teachers", value: "18",   change: "2 on leave",    icon: Users,         color: "text-blue-600",    bg: "bg-blue-50 dark:bg-blue-900/20"     },
  { label: "Fee Collected",  value: "₹4.2L", change: "82% collected", icon: Wallet,        color: "text-green-600",   bg: "bg-green-50 dark:bg-green-900/20"   },
  { label: "Inventory Items",value: "143",  change: "8 low stock",   icon: Package,       color: "text-orange-600",  bg: "bg-orange-50 dark:bg-orange-900/20" },
  { label: "Library Books",  value: "1,240",change: "34 issued",     icon: Library,       color: "text-purple-600",  bg: "bg-purple-50 dark:bg-purple-900/20" },
  { label: "Avg Attendance", value: "89%",  change: "↑ 2% vs last month", icon: TrendingUp, color: "text-teal-600", bg: "bg-teal-50 dark:bg-teal-900/20"     },
];

const alerts = [
  { type: "warning", message: "8 inventory items are low on stock",         icon: AlertTriangle, color: "text-orange-600" },
  { type: "warning", message: "12 students have attendance below 75%",      icon: AlertTriangle, color: "text-red-600"    },
  { type: "warning", message: "₹76,000 in fees overdue this month",         icon: AlertTriangle, color: "text-yellow-600" },
  { type: "success", message: "Term 1 results published successfully",       icon: CheckCircle,  color: "text-green-600"  },
  { type: "success", message: "Library catalogue updated — 15 new books",   icon: CheckCircle,  color: "text-green-600"  },
];

const classPerformance = [
  { class: "Class 10-A", students: 42, avgAttendance: 94, avgMarks: 78, status: "Excellent" },
  { class: "Class 10-B", students: 40, avgAttendance: 88, avgMarks: 72, status: "Good"      },
  { class: "Class 9-A",  students: 38, avgAttendance: 91, avgMarks: 75, status: "Good"      },
  { class: "Class 9-B",  students: 36, avgAttendance: 82, avgMarks: 65, status: "Average"   },
];

export function PrincipalDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Principal Dashboard</h1>
        <p className="text-sm text-foreground/60 mt-1">School-wide overview — Academic Year 2025-26</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className={`w-10 h-10 rounded-lg ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
              <p className="text-xs text-foreground/60 mt-0.5">{stat.label}</p>
              <p className="text-xs text-foreground/40 mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alerts */}
        <Card>
          <CardHeader><CardTitle className="text-base">Alerts & Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-accent/30">
                <alert.icon className={`h-4 w-4 mt-0.5 shrink-0 ${alert.color}`} />
                <p className="text-sm text-foreground/80">{alert.message}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Class Performance */}
        <Card>
          <CardHeader><CardTitle className="text-base">Class-wise Performance</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {classPerformance.map((cls) => (
                <div key={cls.class} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-sm text-foreground">{cls.class}</p>
                    <p className="text-xs text-foreground/50">{cls.students} students</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xs text-foreground/50">Attendance</p>
                      <p className={`text-sm font-semibold ${cls.avgAttendance >= 90 ? "text-green-600" : cls.avgAttendance >= 80 ? "text-yellow-600" : "text-red-600"}`}>{cls.avgAttendance}%</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-foreground/50">Avg Marks</p>
                      <p className="text-sm font-semibold text-foreground">{cls.avgMarks}%</p>
                    </div>
                    <Badge className={cls.status === "Excellent" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : cls.status === "Good" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300"}>
                      {cls.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}