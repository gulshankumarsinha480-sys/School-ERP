import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Users, BookOpen, ClipboardCheck, Calendar } from "lucide-react";
import { Button } from "../components/ui/button";
import { Link } from "react-router";

const stats = [
  {
    title: "Total Students",
    value: "156",
    icon: Users,
    color: "bg-blue-500",
    href: "/students"
  },
  {
    title: "Classes Today",
    value: "5",
    icon: Calendar,
    color: "bg-green-500",
    href: "/timetable"
  },
  {
    title: "Pending Assignments",
    value: "12",
    icon: BookOpen,
    color: "bg-orange-500",
    href: "/assignments"
  },
  {
    title: "Attendance Rate",
    value: "94%",
    icon: ClipboardCheck,
    color: "bg-purple-500",
    href: "/attendance"
  },
];

const recentActivities = [
  { action: "Marked attendance for Class 10-A", time: "2 hours ago" },
  { action: "Uploaded notes for Chapter 5", time: "5 hours ago" },
  { action: "Graded Assignment 3", time: "1 day ago" },
  { action: "Created new assignment", time: "2 days ago" },
];

const upcomingClasses = [
  { class: "Class 10-A", subject: "Mathematics", time: "09:00 AM - 10:00 AM", room: "Room 201" },
  { class: "Class 10-B", subject: "Mathematics", time: "10:15 AM - 11:15 AM", room: "Room 201" },
  { class: "Class 9-A", subject: "Algebra", time: "02:00 PM - 03:00 PM", room: "Room 305" },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-1">Welcome back, John! Here's your overview for today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Link key={stat.title} to={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-semibold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingClasses.map((classItem, index) => (
                <div key={index} className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <Calendar className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{classItem.class}</p>
                    <p className="text-sm text-gray-600">{classItem.subject}</p>
                    <p className="text-xs text-gray-500 mt-1">{classItem.time} • {classItem.room}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4" asChild>
              <Link to="/timetable">View Full Timetable</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link to="/attendance">
                <ClipboardCheck className="h-6 w-6" />
                <span className="text-sm">Mark Attendance</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link to="/marks">
                <BookOpen className="h-6 w-6" />
                <span className="text-sm">Upload Marks</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link to="/notes">
                <Users className="h-6 w-6" />
                <span className="text-sm">Upload Notes</span>
              </Link>
            </Button>
            <Button variant="outline" className="h-auto flex-col gap-2 py-4" asChild>
              <Link to="/assignments">
                <Calendar className="h-6 w-6" />
                <span className="text-sm">New Assignment</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
