import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Calendar } from "../../components/ui/calendar";
import { ClipboardCheck, CheckCircle, XCircle, AlertCircle, TrendingUp, Eye } from "lucide-react";

export function StudentAttendance() {
  const [selectedMonthYear, setSelectedMonthYear] = useState("may-2026");
  const [selectedSubject, setSelectedSubject] = useState("all");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const months = [
    { value: "jan-2026", label: "January 2026", month: 0, year: 2026 },
    { value: "feb-2026", label: "February 2026", month: 1, year: 2026 },
    { value: "mar-2026", label: "March 2026", month: 2, year: 2026 },
    { value: "apr-2026", label: "April 2026", month: 3, year: 2026 },
    { value: "may-2026", label: "May 2026", month: 4, year: 2026 },
    { value: "jun-2026", label: "June 2026", month: 5, year: 2026 },
  ];

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "english", label: "English" },
    { value: "cs", label: "Computer Science" },
  ];

  const subjectAttendance = [
    { subject: "Mathematics", present: 45, absent: 2, leave: 1, total: 48, percentage: 93.75 },
    { subject: "Physics", present: 42, absent: 3, leave: 1, total: 46, percentage: 91.30 },
    { subject: "Chemistry", present: 44, absent: 2, leave: 1, total: 47, percentage: 93.62 },
    { subject: "English", present: 46, absent: 1, leave: 1, total: 48, percentage: 95.83 },
    { subject: "Computer Science", present: 43, absent: 2, leave: 0, total: 45, percentage: 95.56 },
  ];

  const overallStats = {
    totalClasses: 234,
    present: 220,
    absent: 10,
    leave: 4,
    percentage: 94.02,
  };

  // Get current selected month/year object
  const currentMonthData = months.find(m => m.value === selectedMonthYear) || months[4];

  // Set calendar to selected month
  useEffect(() => {
    if (currentMonthData) {
      const newDate = new Date(currentMonthData.year, currentMonthData.month, 1);
      setSelectedDate(newDate);
    }
  }, [selectedMonthYear]);

  const getDateDetails = (date: Date) => {
    return [
      { subject: "Mathematics", status: "present", time: "09:00 AM" },
      { subject: "Physics", status: "present", time: "10:15 AM" },
      { subject: "Chemistry", status: "present", time: "11:30 AM" },
      { subject: "English", status: "present", time: "01:00 PM" },
    ];
  };

  const selectedDateDetails = selectedDate ? getDateDetails(selectedDate) : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "present": return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "absent": return <XCircle className="h-5 w-5 text-red-500" />;
      case "leave": return <AlertCircle className="h-5 w-5 text-amber-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">My Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Real-time attendance tracking</p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full text-sm">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-green-600">{overallStats.percentage}% Overall</span>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Classes</p>
                <p className="text-4xl font-bold mt-3">{overallStats.totalClasses}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-2xl">
                <ClipboardCheck className="h-9 w-9 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-green-600">Present</p>
                <p className="text-4xl font-bold mt-3 text-green-600">{overallStats.present}</p>
              </div>
              <div className="bg-green-100 p-4 rounded-2xl">
                <CheckCircle className="h-9 w-9 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-red-600">Absent</p>
                <p className="text-4xl font-bold mt-3 text-red-600">{overallStats.absent}</p>
              </div>
              <div className="bg-red-100 p-4 rounded-2xl">
                <XCircle className="h-9 w-9 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-emerald-600">Attendance Rate</p>
                <p className="text-4xl font-bold mt-3 text-emerald-600">{overallStats.percentage}%</p>
              </div>
              <div className="bg-emerald-100 p-4 rounded-2xl">
                <TrendingUp className="h-9 w-9 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Select Month & Year</label>
              <Select value={selectedMonthYear} onValueChange={setSelectedMonthYear}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((m) => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Filter by Subject</label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Subject-wise Performance */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Subject-wise Performance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-8">
            {subjectAttendance.map((sub, idx) => (
              <div key={idx} className="group">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="font-semibold text-lg">{sub.subject}</h3>
                  <Badge className={sub.percentage >= 90 ? "bg-green-600" : "bg-blue-600"}>
                    {sub.percentage.toFixed(1)}%
                  </Badge>
                </div>
                <Progress value={sub.percentage} className="h-3" />
                <div className="flex justify-between mt-3 text-sm">
                  <span>{sub.present + sub.leave}/{sub.total} days</span>
                  <div className="flex gap-4">
                    <span className="flex items-center gap-1"><CheckCircle className="h-4 w-4 text-green-500" />{sub.present}</span>
                    <span className="flex items-center gap-1"><XCircle className="h-4 w-4 text-red-500" />{sub.absent}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Monthly Calendar</CardTitle>
            <p className="text-sm text-gray-600">Click any date to view detailed attendance</p>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              month={new Date(currentMonthData.year, currentMonthData.month)}
              className="rounded-xl border shadow-sm"
            />
          </CardContent>
        </Card>
      </div>

      {/* Selected Date Details */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Eye className="h-5 w-5" />
              Attendance on {selectedDate.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {selectedDateDetails.map((record, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    {getStatusIcon(record.status)}
                    <div>
                      <p className="font-medium">{record.subject}</p>
                      <p className="text-xs text-gray-500">{record.time}</p>
                    </div>
                  </div>
                  <Badge variant={record.status === "present" ? "default" : "secondary"}>
                    {record.status.toUpperCase()}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}