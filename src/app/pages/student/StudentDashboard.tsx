import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  BookOpen,
  ClipboardCheck,
  FileText,
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";

export function StudentDashboard() {
  const stats = [
    {
      title: "Overall Score",
      value: "87.5%",
      change: "+2.3%",
      icon: TrendingUp,
      color: "text-emerald-600",
      bgColor: "bg-emerald-100 dark:bg-emerald-950",
    },
    {
      title: "Attendance",
      value: "92%",
      change: "Excellent",
      icon: ClipboardCheck,
      color: "text-blue-600",
      bgColor: "bg-blue-100 dark:bg-blue-950",
    },
    {
      title: "Pending Tasks",
      value: "3",
      change: "Assignments",
      icon: BookOpen,
      color: "text-amber-600",
      bgColor: "bg-amber-100 dark:bg-amber-950",
    },
    {
      title: "Upcoming Tests",
      value: "2",
      change: "This Week",
      icon: FileText,
      color: "text-purple-600",
      bgColor: "bg-purple-100 dark:bg-purple-950",
    },
  ];

  const recentMarks = [
    { subject: "Mathematics", marks: 92, total: 100, grade: "A+", date: "May 20" },
    { subject: "Physics", marks: 85, total: 100, grade: "A", date: "May 18" },
    { subject: "Chemistry", marks: 88, total: 100, grade: "A", date: "May 15" },
    { subject: "English", marks: 90, total: 100, grade: "A+", date: "May 12" },
  ];

  const upcomingAssignments = [
    { title: "Trigonometry Problem Set", subject: "Mathematics", dueDate: "May 28", status: "pending" },
    { title: "Physics Lab Report", subject: "Physics", dueDate: "May 30", status: "pending" },
    { title: "Chemistry Project", subject: "Chemistry", dueDate: "Jun 02", status: "submitted" },
  ];

  const attendanceBySubject = [
    { subject: "Mathematics", percentage: 93.75 },
    { subject: "Physics", percentage: 91.3 },
    { subject: "Chemistry", percentage: 93.62 },
    { subject: "English", percentage: 95.83 },
  ];

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Welcome Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Welcome back, Sarah 👋
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-lg">
            Here's your academic overview for this month
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 px-4 py-2 rounded-full">
          <Award className="h-4 w-4" />
          Top 5 in Class
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-xl transition-all duration-300 border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.title}</p>
                  <p className="text-4xl font-bold text-gray-900 dark:text-white mt-3">
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-1 ${stat.color}`}>{stat.change}</p>
                </div>
                <div className={`${stat.bgColor} p-4 rounded-2xl`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Marks */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600" />
              Recent Test Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {recentMarks.map((mark, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between mb-2">
                    <p className="font-medium text-gray-900 dark:text-white">{mark.subject}</p>
                    <Badge variant={mark.grade === "A+" ? "default" : "secondary"} className="font-mono">
                      {mark.grade}
                    </Badge>
                  </div>
                  <Progress value={(mark.marks / mark.total) * 100} className="h-2.5" />
                </div>
                <div className="text-right min-w-[60px]">
                  <p className="font-bold text-lg">{mark.marks}</p>
                  <p className="text-xs text-gray-500">/{mark.total}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Assignments */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-amber-600" />
              Upcoming Assignments
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAssignments.map((assignment, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-100 dark:border-gray-800 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{assignment.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{assignment.subject}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Due {assignment.dueDate}</p>
                  {assignment.status === "submitted" ? (
                    <div className="flex items-center gap-1 text-green-600 text-xs mt-1">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      Submitted
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-amber-600 text-xs mt-1">
                      <Clock className="h-3.5 w-3.5" />
                      Pending
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Attendance Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Attendance by Subject
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {attendanceBySubject.map((subject, index) => (
            <div key={index} className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="font-medium text-gray-900 dark:text-white">{subject.subject}</p>
                <Badge variant={subject.percentage >= 90 ? "default" : "secondary"}>
                  {subject.percentage.toFixed(1)}%
                </Badge>
              </div>
              <Progress value={subject.percentage} className="h-3" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Announcements */}
      <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950 dark:to-orange-950">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-amber-900 dark:text-amber-100">
            <AlertCircle className="h-5 w-5" />
            Important Updates
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-amber-100 dark:border-amber-800">
            <p className="font-medium">Mid-Term Exams Schedule Released</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Exams will begin from June 10, 2026. Check detailed timetable.</p>
          </div>
          <div className="p-4 bg-white dark:bg-gray-900 rounded-xl border border-amber-100 dark:border-amber-800">
            <p className="font-medium">Fee Reminder</p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Second installment due by May 31. Late fee applies after due date.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}