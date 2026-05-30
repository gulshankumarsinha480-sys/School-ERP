import { useState } from "react";
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
import {
  ClipboardCheck,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  BarChart2,
  BookOpen,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ClassRecord {
  grade: number;
  name: string;
  teacher: string;
  students: number;
  present: number;
  absent: number;
  leave: number;
}

interface LowAttendanceAlert {
  name: string;
  initials: string;
  cls: string;
  pct: number;
}

interface SubjectStat {
  subject: string;
  pct: number;
}

// ── Static data ────────────────────────────────────────────────────────────────

const MONTHS = [
  { value: "jan-2026", label: "January 2026" },
  { value: "feb-2026", label: "February 2026" },
  { value: "mar-2026", label: "March 2026" },
  { value: "apr-2026", label: "April 2026" },
  { value: "may-2026", label: "May 2026" },
  { value: "jun-2026", label: "June 2026" },
];

const GRADES = [
  { value: "all", label: "All Grades" },
  { value: "9",   label: "Grade 9"  },
  { value: "10",  label: "Grade 10" },
  { value: "11",  label: "Grade 11" },
  { value: "12",  label: "Grade 12" },
];

const DEPARTMENTS = [
  { value: "all",        label: "All Departments" },
  { value: "science",    label: "Science"          },
  { value: "commerce",   label: "Commerce"         },
  { value: "humanities", label: "Humanities"       },
];

const ALL_CLASSES: ClassRecord[] = [
  { grade: 9,  name: "9-A",  teacher: "Mrs. Sharma",   students: 42, present: 39, absent: 2, leave: 1 },
  { grade: 9,  name: "9-B",  teacher: "Mr. Patel",     students: 40, present: 36, absent: 3, leave: 1 },
  { grade: 10, name: "10-A", teacher: "Mrs. Gupta",    students: 44, present: 42, absent: 1, leave: 1 },
  { grade: 10, name: "10-B", teacher: "Mr. Roy",       students: 43, present: 38, absent: 4, leave: 1 },
  { grade: 11, name: "11-A", teacher: "Mr. Banerjee",  students: 41, present: 37, absent: 3, leave: 1 },
  { grade: 11, name: "11-B", teacher: "Ms. Singh",     students: 38, present: 32, absent: 4, leave: 2 },
  { grade: 12, name: "12-A", teacher: "Mrs. Das",      students: 40, present: 38, absent: 2, leave: 0 },
  { grade: 12, name: "12-B", teacher: "Mr. Kapoor",    students: 44, present: 40, absent: 3, leave: 1 },
];

const LOW_ATTENDANCE_ALERTS: LowAttendanceAlert[] = [
  { name: "Aryan Mehta",  initials: "AM", cls: "10-B", pct: 68 },
  { name: "Priya Joshi",  initials: "PJ", cls: "11-B", pct: 71 },
  { name: "Rohan Das",    initials: "RD", cls: "9-B",  pct: 73 },
  { name: "Sneha Verma",  initials: "SV", cls: "12-A", pct: 74 },
];

const SUBJECT_STATS: SubjectStat[] = [
  { subject: "Mathematics",      pct: 92.1 },
  { subject: "Physics",          pct: 89.4 },
  { subject: "Chemistry",        pct: 90.8 },
  { subject: "English",          pct: 94.3 },
  { subject: "Computer Science", pct: 93.7 },
  { subject: "Biology",          pct: 88.5 },
  { subject: "History",          pct: 91.2 },
];

const TREND_DATA   = [82, 85, 88, 87, 90, 91, 89, 92];
const TREND_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

const OVERALL = {
  totalStudents: 1248,
  presentToday:  1139,
  absentToday:   72,
  onLeave:       37,
  schoolAvg:     91.4,
};

// ── Helpers ────────────────────────────────────────────────────────────────────

function getAttendancePct(c: ClassRecord) {
  return ((c.present + c.leave) / c.students) * 100;
}

function pctBadge(pct: number) {
  if (pct >= 90) return <Badge className="bg-green-600 text-white">{pct.toFixed(1)}%</Badge>;
  if (pct >= 75) return <Badge className="bg-amber-500 text-white">{pct.toFixed(1)}%</Badge>;
  return <Badge className="bg-red-600 text-white">{pct.toFixed(1)}%</Badge>;
}

function pctColor(pct: number) {
  if (pct >= 90) return "text-green-600";
  if (pct >= 75) return "text-amber-500";
  return "text-red-600";
}

function progressColor(pct: number) {
  if (pct >= 90) return "bg-green-500";
  if (pct >= 75) return "bg-amber-500";
  return "bg-red-500";
}

// ── Sub-components ─────────────────────────────────────────────────────────────

function TrendChart() {
  const max = Math.max(...TREND_DATA);
  return (
    <div>
      <p className="text-xs text-muted-foreground mb-3">Weekly avg attendance — last 8 weeks</p>
      <div className="flex items-end gap-1.5 h-20">
        {TREND_DATA.map((v, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-md transition-all ${
              i === TREND_DATA.length - 1 ? "bg-blue-600" : "bg-blue-100 dark:bg-blue-900/40"
            }`}
            style={{ height: `${Math.round((v / max) * 100)}%` }}
            title={`Week ${i + 1}: ${v}%`}
          />
        ))}
      </div>
      <div className="flex gap-1.5 mt-1">
        {TREND_LABELS.map((l) => (
          <span key={l} className="flex-1 text-center text-[10px] text-muted-foreground">{l}</span>
        ))}
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────

export function PrincipalAssignments() {
  const [selectedMonth,  setSelectedMonth]  = useState("may-2026");
  const [selectedGrade,  setSelectedGrade]  = useState("all");
  const [selectedDept,   setSelectedDept]   = useState("all");
  const [activeTab,      setActiveTab]      = useState<"overview" | "today" | "trend">("overview");

  const filteredClasses =
    selectedGrade === "all"
      ? ALL_CLASSES
      : ALL_CLASSES.filter((c) => c.grade === Number(selectedGrade));

  const tabs: { id: "overview" | "today" | "trend"; label: string }[] = [
    { id: "overview", label: "Overview" },
    { id: "today",    label: "Today"    },
    { id: "trend",    label: "Trend"    },
  ];

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">

      {/* ── Header ── */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            Attendance Overview
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            School-wide attendance across all classes &amp; departments
          </p>
        </div>
        <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900 px-4 py-2 rounded-full text-sm">
          <TrendingUp className="h-4 w-4 text-green-600" />
          <span className="font-semibold text-green-600">{OVERALL.schoolAvg}% School Average</span>
        </div>
      </div>

      {/* ── Overall Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Students</p>
                <p className="text-4xl font-bold mt-3">{OVERALL.totalStudents.toLocaleString()}</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-2xl">
                <Users className="h-9 w-9 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-green-600">Present Today</p>
                <p className="text-4xl font-bold mt-3 text-green-600">{OVERALL.presentToday.toLocaleString()}</p>
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
                <p className="text-sm text-red-600">Absent Today</p>
                <p className="text-4xl font-bold mt-3 text-red-600">{OVERALL.absentToday}</p>
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
                <p className="text-sm text-emerald-600">School Avg</p>
                <p className="text-4xl font-bold mt-3 text-emerald-600">{OVERALL.schoolAvg}%</p>
              </div>
              <div className="bg-emerald-100 p-4 rounded-2xl">
                <TrendingUp className="h-9 w-9 text-emerald-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ── Filters ── */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="text-sm font-medium mb-2 block">Month &amp; Year</label>
              <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {MONTHS.map((m) => (
                    <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Grade</label>
              <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {GRADES.map((g) => (
                    <SelectItem key={g.value} value={g.value}>{g.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select value={selectedDept} onValueChange={setSelectedDept}>
                <SelectTrigger className="h-12"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {DEPARTMENTS.map((d) => (
                    <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ── Class table + Right panel ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

        {/* Class-wise table */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ClipboardCheck className="h-5 w-5" />
              Class-wise Attendance
            </CardTitle>
            <p className="text-sm text-muted-foreground">Click a row to drill down</p>
          </CardHeader>
          <CardContent>
            {/* Tab bar */}
            <div className="flex gap-1 p-1 bg-muted rounded-lg mb-6">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id)}
                  className={`flex-1 py-1.5 rounded-md text-sm font-semibold transition-all ${
                    activeTab === t.id
                      ? "bg-background shadow text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Overview tab */}
            {activeTab === "overview" && (
              <div className="space-y-1">
                <div className="grid grid-cols-5 pb-2 border-b text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  <span className="col-span-2">Class</span>
                  <span className="text-center">Students</span>
                  <span className="text-center">Absent</span>
                  <span className="text-center">Rate</span>
                </div>
                {filteredClasses.map((c) => {
                  const pct = getAttendancePct(c);
                  return (
                    <div
                      key={c.name}
                      className="grid grid-cols-5 items-center py-3 border-b last:border-0 hover:bg-muted/50 rounded-lg px-1 cursor-pointer transition-colors"
                    >
                      <div className="col-span-2">
                        <p className="font-semibold text-sm">{c.name}</p>
                        <p className="text-xs text-muted-foreground">{c.teacher}</p>
                      </div>
                      <p className="text-center text-sm">{c.students}</p>
                      <p className="text-center text-sm font-semibold text-red-600">{c.absent}</p>
                      <div className="flex flex-col items-center gap-1">
                        {pctBadge(pct)}
                        <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${progressColor(pct)}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Today tab */}
            {activeTab === "today" && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredClasses.map((c) => {
                  const pct = (c.present / c.students) * 100;
                  return (
                    <div key={c.name} className="p-3 rounded-xl border bg-muted/30">
                      <p className="font-bold text-sm">{c.name}</p>
                      <p className={`text-2xl font-extrabold mt-1 ${pctColor(pct)}`}>
                        {pct.toFixed(0)}%
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {c.present}/{c.students} present
                      </p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Trend tab */}
            {activeTab === "trend" && <TrendChart />}
          </CardContent>
        </Card>

        {/* Right panel */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Today's snapshot */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart2 className="h-5 w-5" />
                Today — 29 May 2026
              </CardTitle>
              <p className="text-sm text-muted-foreground">Live snapshot as of 3:00 PM</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-xl bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800">
                  <p className="text-xs text-green-600 font-medium">Present</p>
                  <p className="text-3xl font-bold text-green-600 mt-1">{OVERALL.presentToday.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground mt-1">91.3% of roll</p>
                </div>
                <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800">
                  <p className="text-xs text-red-600 font-medium">Absent</p>
                  <p className="text-3xl font-bold text-red-600 mt-1">{OVERALL.absentToday}</p>
                  <p className="text-xs text-muted-foreground mt-1">5.8% of roll</p>
                </div>
                <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800">
                  <p className="text-xs text-amber-600 font-medium">On Leave</p>
                  <p className="text-3xl font-bold text-amber-600 mt-1">{OVERALL.onLeave}</p>
                  <p className="text-xs text-muted-foreground mt-1">Approved</p>
                </div>
                <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800">
                  <p className="text-xs text-blue-600 font-medium">Classes</p>
                  <p className="text-3xl font-bold text-blue-600 mt-1">28</p>
                  <p className="text-xs text-muted-foreground mt-1">All sections</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Low attendance alerts */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-red-500" />
                Low Attendance Alerts
              </CardTitle>
              <p className="text-sm text-muted-foreground">Students below 75% this month</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {LOW_ATTENDANCE_ALERTS.map((a) => (
                <div
                  key={a.name}
                  className="flex items-center gap-3 p-3 rounded-xl bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800"
                >
                  <div className="w-9 h-9 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {a.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm truncate">{a.name}</p>
                    <p className="text-xs text-muted-foreground">Class {a.cls}</p>
                  </div>
                  <span className="text-sm font-bold text-red-600 flex-shrink-0">{a.pct}%</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* ── Subject-wise school average ── */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subject-wise School Average
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Aggregated across all classes — May 2026
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {SUBJECT_STATS.map((s) => (
            <div key={s.subject}>
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-base">{s.subject}</h3>
                {pctBadge(s.pct)}
              </div>
              <Progress value={s.pct} className="h-3" />
              <div className="flex justify-between mt-1.5 text-xs text-muted-foreground">
                <span>{s.pct.toFixed(1)}% average attendance</span>
                <span className={pctColor(s.pct)}>
                  {s.pct >= 90 ? "✓ Good" : s.pct >= 75 ? "⚠ Needs attention" : "✗ Critical"}
                </span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

    </div>
  );
}