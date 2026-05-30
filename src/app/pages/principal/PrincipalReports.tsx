
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table";
import {
  BarChart3, Users, GraduationCap, TrendingUp, TrendingDown,
  Download, BookOpen, Trophy, CheckCircle2, XCircle,
  AlertTriangle, Star, Calendar, Clock, DollarSign,
  Activity, Award, Target, Bell, Search, Filter,
  ChevronUp, ChevronDown, Eye, FileText, Home,
  UserCheck, UserX, Clipboard, Layers, PieChart,
  ArrowUpRight, ArrowDownRight, Minus,
} from "lucide-react";

// ─── Constants ────────────────────────────────────────────────────────────────

const CLASSES   = ["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B", "Class 8-A", "Class 8-B"];
const SUBJECTS  = ["Mathematics", "Physics", "Chemistry", "English", "Biology", "Hindi"];
const EXAM_TYPES = ["Unit Test 1", "Unit Test 2", "Mid Term", "Final Exam"];
const MONTHS    = ["Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar"];
const MAX_MARKS  = 100;

// ─── Seed Data ────────────────────────────────────────────────────────────────

const TEACHERS = [
  { id: 1, name: "Dr. Priya Sharma",   subject: "Mathematics", classes: ["Class 10-A", "Class 9-A"], experience: 12, rating: 4.8 },
  { id: 2, name: "Mr. Rajesh Kumar",   subject: "Physics",     classes: ["Class 10-A", "Class 10-B"], experience: 8,  rating: 4.5 },
  { id: 3, name: "Ms. Anita Verma",    subject: "Chemistry",   classes: ["Class 9-A", "Class 9-B"],   experience: 6,  rating: 4.3 },
  { id: 4, name: "Mr. Suresh Nair",    subject: "English",     classes: ["Class 8-A", "Class 8-B"],   experience: 15, rating: 4.9 },
  { id: 5, name: "Dr. Meena Pillai",   subject: "Biology",     classes: ["Class 10-B", "Class 9-B"],  experience: 10, rating: 4.6 },
  { id: 6, name: "Ms. Kavitha Reddy",  subject: "Hindi",       classes: ["Class 8-A", "Class 10-A"],  experience: 7,  rating: 4.2 },
  { id: 7, name: "Mr. Arjun Menon",    subject: "Mathematics", classes: ["Class 10-B", "Class 8-B"],  experience: 5,  rating: 4.1 },
  { id: 8, name: "Ms. Deepa Iyer",     subject: "English",     classes: ["Class 9-A", "Class 10-A"],  experience: 9,  rating: 4.7 },
];

const STUDENTS_BY_CLASS: Record<string, { id: number; rollNo: string; name: string; gender: string }[]> = {
  "Class 10-A": [
    { id: 1,  rollNo: "001", name: "Alice Johnson",  gender: "F" },
    { id: 2,  rollNo: "002", name: "Bob Smith",      gender: "M" },
    { id: 3,  rollNo: "003", name: "Charlie Brown",  gender: "M" },
    { id: 4,  rollNo: "004", name: "Diana Prince",   gender: "F" },
    { id: 5,  rollNo: "005", name: "Evan Turner",    gender: "M" },
  ],
  "Class 10-B": [
    { id: 6,  rollNo: "006", name: "Fiona Green",    gender: "F" },
    { id: 7,  rollNo: "007", name: "George Wilson",  gender: "M" },
    { id: 8,  rollNo: "008", name: "Hannah Lee",     gender: "F" },
    { id: 9,  rollNo: "009", name: "Ian Rogers",     gender: "M" },
  ],
  "Class 9-A": [
    { id: 10, rollNo: "010", name: "Julia Roberts",  gender: "F" },
    { id: 11, rollNo: "011", name: "Kevin Hart",     gender: "M" },
    { id: 12, rollNo: "012", name: "Laura Palmer",   gender: "F" },
    { id: 13, rollNo: "013", name: "Mike Tyson",     gender: "M" },
  ],
  "Class 9-B": [
    { id: 14, rollNo: "014", name: "Nina Dobrev",    gender: "F" },
    { id: 15, rollNo: "015", name: "Oscar Wilde",    gender: "M" },
    { id: 16, rollNo: "016", name: "Priya Chopra",   gender: "F" },
  ],
  "Class 8-A": [
    { id: 17, rollNo: "017", name: "Quinn Hughes",   gender: "M" },
    { id: 18, rollNo: "018", name: "Rachel Green",   gender: "F" },
    { id: 19, rollNo: "019", name: "Sam Wilson",     gender: "M" },
    { id: 20, rollNo: "020", name: "Tina Turner",    gender: "F" },
  ],
  "Class 8-B": [
    { id: 21, rollNo: "021", name: "Uma Thurman",    gender: "F" },
    { id: 22, rollNo: "022", name: "Victor Hugo",    gender: "M" },
    { id: 23, rollNo: "023", name: "Wendy Park",     gender: "F" },
  ],
};

function seedMarks() {
  const data: Record<string, Record<string, Record<string, Record<number, number>>>> = {};
  CLASSES.forEach((cls) => {
    data[cls] = {};
    EXAM_TYPES.forEach((exam) => {
      data[cls][exam] = {};
      SUBJECTS.forEach((subj) => {
        data[cls][exam][subj] = {};
        (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
          data[cls][exam][subj][s.id] = Math.min(40 + Math.floor(Math.random() * 58), MAX_MARKS);
        });
      });
    });
  });
  return data;
}

// Monthly attendance seed: attendance[class][studentId][month] = percentage
function seedAttendance() {
  const data: Record<string, Record<number, Record<string, number>>> = {};
  CLASSES.forEach((cls) => {
    data[cls] = {};
    (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
      data[cls][s.id] = {};
      MONTHS.forEach((m) => {
        data[cls][s.id][m] = 60 + Math.floor(Math.random() * 40);
      });
    });
  });
  return data;
}

// Fee data: fees[class][studentId] = { paid, total, months_due }
function seedFees() {
  const data: Record<string, Record<number, { paid: number; total: number; due: number }>> = {};
  CLASSES.forEach((cls) => {
    data[cls] = {};
    (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
      const total = 12000;
      const paid  = [4000, 6000, 8000, 10000, 12000][Math.floor(Math.random() * 5)];
      data[cls][s.id] = { paid, total, due: total - paid };
    });
  });
  return data;
}

const MARKS_DATA      = seedMarks();
const ATTENDANCE_DATA = seedAttendance();
const FEE_DATA        = seedFees();

// ─── Types ────────────────────────────────────────────────────────────────────

type TabType = "overview" | "academics" | "attendance" | "fees" | "teachers" | "students";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getGrade(pct: number) {
  if (pct >= 90) return { grade: "A+", color: "bg-emerald-100 text-emerald-800" };
  if (pct >= 80) return { grade: "A",  color: "bg-green-100 text-green-800" };
  if (pct >= 70) return { grade: "B+", color: "bg-blue-100 text-blue-800" };
  if (pct >= 60) return { grade: "B",  color: "bg-sky-100 text-sky-800" };
  if (pct >= 50) return { grade: "C",  color: "bg-yellow-100 text-yellow-800" };
  if (pct >= 33) return { grade: "D",  color: "bg-orange-100 text-orange-800" };
  return { grade: "F", color: "bg-red-100 text-red-800" };
}

function fmt(n: number) { return n.toLocaleString("en-IN"); }

function Trend({ val, suffix = "%" }: { val: number; suffix?: string }) {
  if (val > 0)  return <span className="flex items-center gap-0.5 text-green-600 text-xs font-medium"><ArrowUpRight className="h-3 w-3" />+{val}{suffix}</span>;
  if (val < 0)  return <span className="flex items-center gap-0.5 text-red-500 text-xs font-medium"><ArrowDownRight className="h-3 w-3" />{val}{suffix}</span>;
  return <span className="flex items-center gap-0.5 text-gray-400 text-xs"><Minus className="h-3 w-3" />0{suffix}</span>;
}

// Mini bar component (pure CSS, no recharts)
function MiniBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = max > 0 ? (value / max) * 100 : 0;
  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs text-gray-500 w-8 text-right">{pct.toFixed(0)}%</span>
    </div>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────

function StatCard({
  label, value, icon: Icon, color, trend, sub,
}: {
  label: string; value: string | number; icon: React.ElementType;
  color: string; trend?: number; sub?: string;
}) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${color}`}>
            <Icon className="h-5 w-5" />
          </div>
          {trend !== undefined && <Trend val={trend} />}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500 mt-0.5">{label}</p>
          {sub && <p className="text-xs text-gray-400 mt-0.5">{sub}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

// ─── Tab Navigation ───────────────────────────────────────────────────────────

const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: "overview",   label: "Overview",   icon: Home },
  { id: "academics",  label: "Academics",  icon: BookOpen },
  { id: "attendance", label: "Attendance", icon: UserCheck },
  { id: "fees",       label: "Fees",       icon: DollarSign },
  { id: "teachers",   label: "Teachers",   icon: Award },
  { id: "students",   label: "Students",   icon: Users },
];

// ─── Overview Tab ─────────────────────────────────────────────────────────────

function OverviewTab() {
  const totalStudents = Object.values(STUDENTS_BY_CLASS).reduce((a, s) => a + s.length, 0);
  const totalTeachers = TEACHERS.length;

  // Overall academic performance across all classes, Final Exam
  const allScores: number[] = [];
  CLASSES.forEach((cls) => {
    (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
      const total = SUBJECTS.reduce((a, subj) => a + (MARKS_DATA[cls]?.["Final Exam"]?.[subj]?.[s.id] ?? 0), 0);
      allScores.push((total / (SUBJECTS.length * MAX_MARKS)) * 100);
    });
  });
  const avgScore    = allScores.length ? (allScores.reduce((a, b) => a + b, 0) / allScores.length).toFixed(1) : "0";
  const passCount   = allScores.filter((s) => s >= 33).length;
  const passRate    = allScores.length ? ((passCount / allScores.length) * 100).toFixed(1) : "0";

  // Attendance overall
  let attSum = 0, attCount = 0;
  CLASSES.forEach((cls) => {
    (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
      const monthlyAvg = MONTHS.reduce((a, m) => a + (ATTENDANCE_DATA[cls]?.[s.id]?.[m] ?? 0), 0) / MONTHS.length;
      attSum += monthlyAvg; attCount++;
    });
  });
  const avgAttendance = attCount ? (attSum / attCount).toFixed(1) : "0";

  // Fee collection
  let feeCollected = 0, feeDue = 0;
  CLASSES.forEach((cls) => {
    (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
      feeCollected += FEE_DATA[cls]?.[s.id]?.paid ?? 0;
      feeDue       += FEE_DATA[cls]?.[s.id]?.due  ?? 0;
    });
  });
  const feeRate = feeCollected + feeDue > 0
    ? ((feeCollected / (feeCollected + feeDue)) * 100).toFixed(1)
    : "0";

  // Per-class summary
  const classSummaries = CLASSES.map((cls) => {
    const students = STUDENTS_BY_CLASS[cls] ?? [];
    const scores   = students.map((s) => {
      const total = SUBJECTS.reduce((a, subj) => a + (MARKS_DATA[cls]?.["Final Exam"]?.[subj]?.[s.id] ?? 0), 0);
      return (total / (SUBJECTS.length * MAX_MARKS)) * 100;
    });
    const avg  = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
    const pass = scores.filter((s) => s >= 33).length;
    const att  = students.reduce((a, s) => {
      const ma = MONTHS.reduce((x, m) => x + (ATTENDANCE_DATA[cls]?.[s.id]?.[m] ?? 0), 0) / MONTHS.length;
      return a + ma;
    }, 0) / (students.length || 1);
    return { cls, count: students.length, avg: avg.toFixed(1), pass, att: att.toFixed(1) };
  });

  // Top students school-wide
  const topStudents = CLASSES.flatMap((cls) =>
    (STUDENTS_BY_CLASS[cls] ?? []).map((s) => {
      const total = SUBJECTS.reduce((a, subj) => a + (MARKS_DATA[cls]?.["Final Exam"]?.[subj]?.[s.id] ?? 0), 0);
      return { name: s.name, cls, pct: (total / (SUBJECTS.length * MAX_MARKS)) * 100 };
    })
  ).sort((a, b) => b.pct - a.pct).slice(0, 5);

  // Subjects needing attention (lowest avg)
  const subjectAvgs = SUBJECTS.map((subj) => {
    let sum = 0, cnt = 0;
    CLASSES.forEach((cls) => {
      (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
        sum += MARKS_DATA[cls]?.["Final Exam"]?.[subj]?.[s.id] ?? 0; cnt++;
      });
    });
    return { subject: subj, avg: cnt ? sum / cnt : 0 };
  }).sort((a, b) => a.avg - b.avg);

  return (
    <div className="space-y-6">
      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Students"   value={totalStudents}       icon={Users}        color="bg-blue-50 text-blue-600"    trend={3}  sub="Across 6 classes" />
        <StatCard label="Total Teachers"   value={totalTeachers}       icon={Award}        color="bg-violet-50 text-violet-600" trend={1}  sub="8 departments" />
        <StatCard label="School Avg Score" value={`${avgScore}%`}      icon={BarChart3}    color="bg-green-50 text-green-600"  trend={2.4} sub={`Pass rate ${passRate}%`} />
        <StatCard label="Avg Attendance"   value={`${avgAttendance}%`} icon={UserCheck}    color="bg-amber-50 text-amber-600"  trend={-1.2} sub="This academic year" />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Fee Collected"    value={`₹${fmt(feeCollected)}`} icon={DollarSign}  color="bg-emerald-50 text-emerald-600" trend={5} sub={`${feeRate}% collected`} />
        <StatCard label="Fee Pending"      value={`₹${fmt(feeDue)}`}       icon={AlertTriangle} color="bg-red-50 text-red-500"      sub="Needs follow-up" />
        <StatCard label="Pass Rate"        value={`${passRate}%`}           icon={CheckCircle2} color="bg-teal-50 text-teal-600"    trend={1.8} sub="Final Exam" />
        <StatCard label="Classes"          value={CLASSES.length}           icon={Layers}       color="bg-indigo-50 text-indigo-600" sub="Active this year" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Class-wise summary */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2"><Layers className="h-4 w-4 text-violet-500" /> Class-wise Summary</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Class</TableHead>
                  <TableHead className="text-center">Students</TableHead>
                  <TableHead className="text-center">Avg Score</TableHead>
                  <TableHead className="text-center">Pass</TableHead>
                  <TableHead className="text-center">Attendance</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classSummaries.map((c) => {
                  const { color } = getGrade(parseFloat(c.avg));
                  return (
                    <TableRow key={c.cls}>
                      <TableCell className="font-medium text-sm">{c.cls}</TableCell>
                      <TableCell className="text-center text-sm">{c.count}</TableCell>
                      <TableCell className="text-center">
                        <Badge className={`text-xs ${color}`}>{c.avg}%</Badge>
                      </TableCell>
                      <TableCell className="text-center text-sm text-green-600 font-medium">{c.pass}/{c.count}</TableCell>
                      <TableCell className="text-center">
                        <span className={`text-xs font-medium ${parseFloat(c.att) >= 75 ? "text-green-600" : "text-red-500"}`}>
                          {c.att}%
                        </span>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Top students + weak subjects */}
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><Trophy className="h-4 w-4 text-yellow-500" /> School Toppers — Final Exam</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {topStudents.map((s, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                    ${i === 0 ? "bg-yellow-100 text-yellow-700" : i === 1 ? "bg-gray-100 text-gray-600" : i === 2 ? "bg-orange-100 text-orange-600" : "bg-blue-50 text-blue-500"}`}>
                    {i + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 truncate">{s.name}</p>
                    <p className="text-xs text-gray-400">{s.cls}</p>
                  </div>
                  <MiniBar value={s.pct} max={100} color={i === 0 ? "bg-yellow-400" : "bg-blue-400"} />
                  <span className="text-sm font-bold text-gray-700 w-12 text-right">{s.pct.toFixed(1)}%</span>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2"><AlertTriangle className="h-4 w-4 text-orange-500" /> Subjects Needing Attention</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pt-0">
              {subjectAvgs.slice(0, 4).map(({ subject, avg }) => (
                <div key={subject} className="flex items-center gap-3">
                  <p className="text-sm text-gray-700 w-24 shrink-0">{subject}</p>
                  <MiniBar value={avg} max={100} color={avg < 50 ? "bg-red-400" : avg < 65 ? "bg-orange-400" : "bg-green-400"} />
                  <span className="text-xs font-medium text-gray-600 w-10 text-right">{avg.toFixed(1)}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── Academics Tab ────────────────────────────────────────────────────────────

function AcademicsTab() {
  const [selectedExam,  setSelectedExam]  = useState(EXAM_TYPES[3]);
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedSubj,  setSelectedSubj]  = useState("All");

  const visibleClasses = selectedClass === "All" ? CLASSES : [selectedClass];

  const classStats = useMemo(() => visibleClasses.map((cls) => {
    const students = STUDENTS_BY_CLASS[cls] ?? [];
    const subjData = SUBJECTS.map((subj) => {
      if (selectedSubj !== "All" && subj !== selectedSubj) return null;
      const vals = students.map((s) => MARKS_DATA[cls]?.[selectedExam]?.[subj]?.[s.id] ?? 0);
      const avg  = vals.reduce((a, b) => a + b, 0) / (vals.length || 1);
      const pass = vals.filter((v) => (v / MAX_MARKS) * 100 >= 33).length;
      return { subj, avg: avg.toFixed(1), pass, total: vals.length, highest: Math.max(...vals), lowest: Math.min(...vals) };
    }).filter(Boolean) as { subj: string; avg: string; pass: number; total: number; highest: number; lowest: number }[];

    const overallScores = students.map((s) => {
      const subjs = selectedSubj === "All" ? SUBJECTS : [selectedSubj];
      const t = subjs.reduce((a, subj) => a + (MARKS_DATA[cls]?.[selectedExam]?.[subj]?.[s.id] ?? 0), 0);
      return (t / (subjs.length * MAX_MARKS)) * 100;
    });
    const classAvg = overallScores.length ? overallScores.reduce((a, b) => a + b, 0) / overallScores.length : 0;
    const classPass = overallScores.filter((p) => p >= 33).length;

    return { cls, students: students.length, subjData, classAvg: classAvg.toFixed(1), classPass };
  }), [visibleClasses, selectedExam, selectedSubj]);

  // Exam comparison: avg per exam school-wide
  const examComparison = EXAM_TYPES.map((exam) => {
    let sum = 0, cnt = 0;
    CLASSES.forEach((cls) => {
      (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
        const total = SUBJECTS.reduce((a, subj) => a + (MARKS_DATA[cls]?.[exam]?.[subj]?.[s.id] ?? 0), 0);
        sum += (total / (SUBJECTS.length * MAX_MARKS)) * 100; cnt++;
      });
    });
    return { exam, avg: cnt ? (sum / cnt).toFixed(1) : "0" };
  });

  return (
    <div className="space-y-5">
      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap gap-3 items-end">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Exam</label>
              <Select value={selectedExam} onValueChange={setSelectedExam}>
                <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>{EXAM_TYPES.map((e) => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Class</label>
              <Select value={selectedClass} onValueChange={setSelectedClass}>
                <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Classes</SelectItem>
                  {CLASSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">Subject</label>
              <Select value={selectedSubj} onValueChange={setSelectedSubj}>
                <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All Subjects</SelectItem>
                  {SUBJECTS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs ml-auto">
              <Download className="h-3.5 w-3.5" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Exam progression */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><TrendingUp className="h-4 w-4 text-blue-500" /> Exam-wise School Average</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex gap-4 flex-wrap">
            {examComparison.map(({ exam, avg }) => {
              const { color, grade } = getGrade(parseFloat(avg));
              const isSelected = exam === selectedExam;
              return (
                <div key={exam}
                  className={`flex-1 min-w-28 p-3 rounded-xl border-2 cursor-pointer transition-all
                    ${isSelected ? "border-violet-500 bg-violet-50" : "border-gray-100 bg-gray-50 hover:border-gray-300"}`}
                  onClick={() => setSelectedExam(exam)}>
                  <p className="text-xs text-gray-500">{exam}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{avg}%</p>
                  <Badge className={`text-xs mt-1 ${color}`}>{grade}</Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Per-class subject breakdown */}
      {classStats.map(({ cls, students, subjData, classAvg, classPass }) => {
        const { color } = getGrade(parseFloat(classAvg));
        return (
          <Card key={cls}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">{cls}</CardTitle>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span>{students} students</span>
                  <span className="text-green-600 font-medium">{classPass} passed</span>
                  <Badge className={`${color} text-xs`}>Avg {classAvg}%</Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead className="text-center">Class Avg</TableHead>
                    <TableHead className="text-center">Highest</TableHead>
                    <TableHead className="text-center">Lowest</TableHead>
                    <TableHead className="text-center">Pass</TableHead>
                    <TableHead className="text-center">Fail</TableHead>
                    <TableHead>Performance</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {subjData.map((d) => {
                    const { color: gc } = getGrade((parseFloat(d.avg) / MAX_MARKS) * 100);
                    return (
                      <TableRow key={d.subj}>
                        <TableCell className="font-medium text-sm">{d.subj}</TableCell>
                        <TableCell className="text-center">
                          <Badge className={`text-xs ${gc}`}>{d.avg}</Badge>
                        </TableCell>
                        <TableCell className="text-center text-sm text-green-600 font-semibold">{d.highest}</TableCell>
                        <TableCell className="text-center text-sm text-red-500 font-semibold">{d.lowest}</TableCell>
                        <TableCell className="text-center text-sm text-green-600">{d.pass}</TableCell>
                        <TableCell className="text-center text-sm text-red-500">{d.total - d.pass}</TableCell>
                        <TableCell className="w-36">
                          <MiniBar value={parseFloat(d.avg)} max={100}
                            color={parseFloat(d.avg) < 50 ? "bg-red-400" : parseFloat(d.avg) < 65 ? "bg-yellow-400" : "bg-green-400"} />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

// ─── Attendance Tab ───────────────────────────────────────────────────────────

function AttendanceTab() {
  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedMonth, setSelectedMonth] = useState("All");
  const [search, setSearch] = useState("");

  const visibleClasses = selectedClass === "All" ? CLASSES : [selectedClass];

  const allStudentAtt = useMemo(() => {
    const rows: { id: number; name: string; cls: string; rollNo: string; monthly: Record<string, number>; avg: number; status: string }[] = [];
    visibleClasses.forEach((cls) => {
      (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
        const monthly = ATTENDANCE_DATA[cls]?.[s.id] ?? {};
        const vals    = MONTHS.map((m) => monthly[m] ?? 0);
        const avg     = vals.reduce((a, b) => a + b, 0) / MONTHS.length;
        rows.push({
          id: s.id, name: s.name, cls, rollNo: s.rollNo, monthly,
          avg: parseFloat(avg.toFixed(1)),
          status: avg >= 75 ? "Regular" : avg >= 60 ? "Warning" : "Critical",
        });
      });
    });
    return rows.filter((r) => r.name.toLowerCase().includes(search.toLowerCase()));
  }, [visibleClasses, search]);

  // Stats
  const criticalCount = allStudentAtt.filter((s) => s.status === "Critical").length;
  const warningCount  = allStudentAtt.filter((s) => s.status === "Warning").length;
  const regularCount  = allStudentAtt.filter((s) => s.status === "Regular").length;
  const schoolAvg     = allStudentAtt.length
    ? (allStudentAtt.reduce((a, s) => a + s.avg, 0) / allStudentAtt.length).toFixed(1)
    : "0";

  // Monthly school-wide
  const monthlySchool = MONTHS.map((m) => {
    const vals = allStudentAtt.map((s) => s.monthly[m] ?? 0);
    return { month: m, avg: vals.length ? (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) : "0" };
  });

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="School Avg Attendance" value={`${schoolAvg}%`}   icon={UserCheck} color="bg-blue-50 text-blue-600" />
        <StatCard label="Regular (≥75%)"         value={regularCount}      icon={CheckCircle2} color="bg-green-50 text-green-600" />
        <StatCard label="Warning (60–74%)"        value={warningCount}      icon={AlertTriangle} color="bg-yellow-50 text-yellow-600" />
        <StatCard label="Critical (<60%)"         value={criticalCount}     icon={XCircle}      color="bg-red-50 text-red-600" />
      </div>

      {/* Monthly trend */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><Activity className="h-4 w-4 text-blue-500" /> Monthly Attendance Trend</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="flex items-end gap-2 h-24">
            {monthlySchool.map(({ month, avg }) => {
              const h = (parseFloat(avg) / 100) * 80;
              const col = parseFloat(avg) >= 75 ? "bg-green-400" : parseFloat(avg) >= 60 ? "bg-yellow-400" : "bg-red-400";
              return (
                <div key={month} className="flex-1 flex flex-col items-center gap-1">
                  <span className="text-xs text-gray-500">{avg}%</span>
                  <div className={`w-full rounded-t-sm ${col}`} style={{ height: `${h}px` }} />
                  <span className="text-xs text-gray-400">{month}</span>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Classes</SelectItem>
            {CLASSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search student…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-9 text-sm w-48"
          />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs ml-auto">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  {MONTHS.map((m) => <TableHead key={m} className="text-center text-xs px-2">{m}</TableHead>)}
                  <TableHead className="text-center">Avg</TableHead>
                  <TableHead className="text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {allStudentAtt.map((s) => (
                  <TableRow key={`${s.cls}-${s.id}`}
                    className={s.status === "Critical" ? "bg-red-50" : s.status === "Warning" ? "bg-yellow-50/50" : ""}>
                    <TableCell className="font-medium text-sm">{s.name}</TableCell>
                    <TableCell className="text-xs text-gray-500">{s.cls}</TableCell>
                    {MONTHS.map((m) => {
                      const v = s.monthly[m] ?? 0;
                      return (
                        <TableCell key={m} className="text-center text-xs px-2">
                          <span className={v < 60 ? "text-red-600 font-semibold" : v < 75 ? "text-yellow-600" : "text-green-600"}>
                            {v}%
                          </span>
                        </TableCell>
                      );
                    })}
                    <TableCell className="text-center">
                      <span className="text-sm font-bold text-gray-800">{s.avg}%</span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-xs ${
                        s.status === "Regular" ? "bg-green-100 text-green-800"
                          : s.status === "Warning" ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"}`}>
                        {s.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Fees Tab ─────────────────────────────────────────────────────────────────

function FeesTab() {
  const [selectedClass, setSelectedClass] = useState("All");
  const [filterStatus, setFilterStatus]   = useState("All");
  const [search, setSearch]               = useState("");

  const visibleClasses = selectedClass === "All" ? CLASSES : [selectedClass];

  const feeRows = useMemo(() => {
    const rows: { id: number; name: string; cls: string; rollNo: string; paid: number; total: number; due: number; status: string }[] = [];
    visibleClasses.forEach((cls) => {
      (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
        const f      = FEE_DATA[cls]?.[s.id];
        if (!f) return;
        const status = f.due === 0 ? "Paid" : f.paid === 0 ? "Unpaid" : "Partial";
        if (filterStatus !== "All" && status !== filterStatus) return;
        if (!s.name.toLowerCase().includes(search.toLowerCase())) return;
        rows.push({ id: s.id, name: s.name, cls, rollNo: s.rollNo, ...f, status });
      });
    });
    return rows;
  }, [visibleClasses, filterStatus, search]);

  const totalCollected = feeRows.reduce((a, r) => a + r.paid, 0);
  const totalDue       = feeRows.reduce((a, r) => a + r.due,  0);
  const totalFee       = feeRows.reduce((a, r) => a + r.total, 0);
  const paidCount      = feeRows.filter((r) => r.status === "Paid").length;
  const partialCount   = feeRows.filter((r) => r.status === "Partial").length;
  const unpaidCount    = feeRows.filter((r) => r.status === "Unpaid").length;

  // Class-wise fee summary
  const classFee = CLASSES.map((cls) => {
    const students = STUDENTS_BY_CLASS[cls] ?? [];
    const collected = students.reduce((a, s) => a + (FEE_DATA[cls]?.[s.id]?.paid ?? 0), 0);
    const due       = students.reduce((a, s) => a + (FEE_DATA[cls]?.[s.id]?.due  ?? 0), 0);
    const total     = collected + due;
    return { cls, collected, due, total, rate: total > 0 ? ((collected / total) * 100).toFixed(0) : "0" };
  });

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Collected"  value={`₹${fmt(totalCollected)}`} icon={DollarSign}    color="bg-green-50 text-green-600" />
        <StatCard label="Total Pending"    value={`₹${fmt(totalDue)}`}       icon={AlertTriangle} color="bg-red-50 text-red-500" />
        <StatCard label="Fully Paid"       value={paidCount}                  icon={CheckCircle2}  color="bg-emerald-50 text-emerald-600" />
        <StatCard label="Unpaid / Partial" value={`${unpaidCount} / ${partialCount}`} icon={XCircle} color="bg-orange-50 text-orange-600" />
      </div>

      {/* Class-wise fee bars */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><PieChart className="h-4 w-4 text-green-500" /> Class-wise Fee Collection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 py-3">
          {classFee.map(({ cls, collected, due, total, rate }) => (
            <div key={cls} className="flex items-center gap-3">
              <p className="text-sm text-gray-700 w-24 shrink-0">{cls}</p>
              <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden flex">
                <div className="h-full bg-green-400 transition-all" style={{ width: `${rate}%` }} />
              </div>
              <span className="text-xs font-semibold text-gray-700 w-8">{rate}%</span>
              <span className="text-xs text-gray-400 w-28">₹{fmt(collected)} / ₹{fmt(total)}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Classes</SelectItem>
            {CLASSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-32 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            {["All", "Paid", "Partial", "Unpaid"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
          </SelectContent>
        </Select>
        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search student…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9 text-sm w-48" />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs ml-auto">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Class</TableHead>
                <TableHead className="text-right">Total Fee</TableHead>
                <TableHead className="text-right">Paid</TableHead>
                <TableHead className="text-right">Due</TableHead>
                <TableHead>Collection</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {feeRows.map((r) => (
                <TableRow key={`${r.cls}-${r.id}`} className={r.status === "Unpaid" ? "bg-red-50" : r.status === "Partial" ? "bg-yellow-50/40" : ""}>
                  <TableCell className="font-medium text-sm">{r.name}</TableCell>
                  <TableCell className="text-xs text-gray-500">{r.cls}</TableCell>
                  <TableCell className="text-right text-sm">₹{fmt(r.total)}</TableCell>
                  <TableCell className="text-right text-sm text-green-600 font-semibold">₹{fmt(r.paid)}</TableCell>
                  <TableCell className="text-right text-sm text-red-500 font-semibold">₹{fmt(r.due)}</TableCell>
                  <TableCell className="w-32">
                    <MiniBar value={r.paid} max={r.total} color={r.due === 0 ? "bg-green-400" : r.paid === 0 ? "bg-red-400" : "bg-yellow-400"} />
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge className={`text-xs ${r.status === "Paid" ? "bg-green-100 text-green-800" : r.status === "Partial" ? "bg-yellow-100 text-yellow-800" : "bg-red-100 text-red-800"}`}>
                      {r.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Teachers Tab ─────────────────────────────────────────────────────────────

function TeachersTab() {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "rating" | "experience">("rating");

  const filtered = useMemo(() =>
    [...TEACHERS]
      .filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) || t.subject.toLowerCase().includes(search.toLowerCase()))
      .sort((a, b) => sortBy === "name" ? a.name.localeCompare(b.name) : sortBy === "rating" ? b.rating - a.rating : b.experience - a.experience),
    [search, sortBy]
  );

  // Subject-wise average teacher rating
  const subjectRatings = SUBJECTS.map((subj) => {
    const teachers = TEACHERS.filter((t) => t.subject === subj);
    const avg = teachers.length ? teachers.reduce((a, t) => a + t.rating, 0) / teachers.length : 0;
    return { subj, avg: avg.toFixed(1), count: teachers.length };
  });

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Teachers"    value={TEACHERS.length}                                          icon={Award}    color="bg-violet-50 text-violet-600" />
        <StatCard label="Avg Rating"         value={(TEACHERS.reduce((a, t) => a + t.rating, 0) / TEACHERS.length).toFixed(1)} icon={Star} color="bg-yellow-50 text-yellow-600" />
        <StatCard label="Avg Experience"     value={`${(TEACHERS.reduce((a, t) => a + t.experience, 0) / TEACHERS.length).toFixed(0)} yrs`} icon={Clock} color="bg-blue-50 text-blue-600" />
        <StatCard label="Subjects Covered"   value={new Set(TEACHERS.map((t) => t.subject)).size}            icon={BookOpen} color="bg-green-50 text-green-600" />
      </div>

      {/* Subject coverage */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm flex items-center gap-2"><Target className="h-4 w-4 text-violet-500" /> Subject-wise Teacher Coverage</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {subjectRatings.map(({ subj, avg, count }) => (
              <div key={subj} className="text-center p-3 rounded-xl bg-gray-50 border border-gray-100">
                <p className="text-xs text-gray-400 truncate">{subj}</p>
                <p className="text-lg font-bold text-gray-800 mt-1">⭐ {avg}</p>
                <p className="text-xs text-gray-400">{count} teacher{count !== 1 ? "s" : ""}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search teacher…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9 text-sm w-52" />
        </div>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-40 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="rating">Sort: Rating</SelectItem>
            <SelectItem value="experience">Sort: Experience</SelectItem>
            <SelectItem value="name">Sort: Name</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs ml-auto">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
      </div>

      {/* Teacher cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((t) => (
          <Card key={t.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center shrink-0">
                  <span className="text-lg font-bold text-violet-700">
                    {t.name.split(" ").slice(-1)[0][0]}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{t.subject} · {t.experience} yrs exp.</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                      <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-xs font-bold text-yellow-700">{t.rating}</span>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {t.classes.map((c) => (
                      <Badge key={c} className="bg-blue-50 text-blue-700 text-xs">{c}</Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <MiniBar value={t.rating} max={5} color={t.rating >= 4.5 ? "bg-green-400" : t.rating >= 4 ? "bg-blue-400" : "bg-yellow-400"} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

// ─── Students Tab ─────────────────────────────────────────────────────────────

function StudentsTab() {
  const [selectedClass, setSelectedClass] = useState("All");
  const [search, setSearch]               = useState("");
  const [sortBy, setSortBy]               = useState<"name" | "score" | "attendance">("score");

  const visibleClasses = selectedClass === "All" ? CLASSES : [selectedClass];

  const studentRows = useMemo(() => {
    const rows: {
      id: number; name: string; cls: string; rollNo: string; gender: string;
      score: number; attendance: number; feeStatus: string;
      grade: string; gradeColor: string; passStatus: string;
    }[] = [];

    visibleClasses.forEach((cls) => {
      (STUDENTS_BY_CLASS[cls] ?? []).forEach((s) => {
        if (search && !s.name.toLowerCase().includes(search.toLowerCase())) return;
        const total = SUBJECTS.reduce((a, subj) => a + (MARKS_DATA[cls]?.["Final Exam"]?.[subj]?.[s.id] ?? 0), 0);
        const score = (total / (SUBJECTS.length * MAX_MARKS)) * 100;
        const att   = MONTHS.reduce((a, m) => a + (ATTENDANCE_DATA[cls]?.[s.id]?.[m] ?? 0), 0) / MONTHS.length;
        const fee   = FEE_DATA[cls]?.[s.id];
        const feeStatus = !fee ? "—" : fee.due === 0 ? "Paid" : fee.paid === 0 ? "Unpaid" : "Partial";
        const { grade, color } = getGrade(score);
        const failed = SUBJECTS.some((subj) => {
          const m = MARKS_DATA[cls]?.["Final Exam"]?.[subj]?.[s.id] ?? 0;
          return (m / MAX_MARKS) * 100 < 33;
        });
        rows.push({
          id: s.id, name: s.name, cls, rollNo: s.rollNo, gender: s.gender,
          score: parseFloat(score.toFixed(1)),
          attendance: parseFloat(att.toFixed(1)),
          feeStatus, grade, gradeColor: color,
          passStatus: failed ? "Fail" : "Pass",
        });
      });
    });

    return rows.sort((a, b) =>
      sortBy === "name" ? a.name.localeCompare(b.name)
        : sortBy === "score" ? b.score - a.score
        : b.attendance - a.attendance
    );
  }, [visibleClasses, search, sortBy]);

  const maleCount   = studentRows.filter((s) => s.gender === "M").length;
  const femaleCount = studentRows.filter((s) => s.gender === "F").length;
  const passCount   = studentRows.filter((s) => s.passStatus === "Pass").length;
  const lowAtt      = studentRows.filter((s) => s.attendance < 75).length;

  return (
    <div className="space-y-5">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total"           value={studentRows.length}  icon={Users}        color="bg-blue-50 text-blue-600" />
        <StatCard label="Boys / Girls"    value={`${maleCount} / ${femaleCount}`} icon={UserCheck} color="bg-violet-50 text-violet-600" />
        <StatCard label="Passed"          value={`${passCount} / ${studentRows.length}`} icon={CheckCircle2} color="bg-green-50 text-green-600" />
        <StatCard label="Low Attendance"  value={lowAtt}              icon={AlertTriangle} color="bg-red-50 text-red-500" />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center">
        <Select value={selectedClass} onValueChange={setSelectedClass}>
          <SelectTrigger className="w-36 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Classes</SelectItem>
            {CLASSES.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={sortBy} onValueChange={(v) => setSortBy(v as typeof sortBy)}>
          <SelectTrigger className="w-40 h-9 text-sm"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="score">Sort: Score</SelectItem>
            <SelectItem value="attendance">Sort: Attendance</SelectItem>
            <SelectItem value="name">Sort: Name</SelectItem>
          </SelectContent>
        </Select>
        <div className="relative">
          <Search className="h-3.5 w-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <Input placeholder="Search student…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-8 h-9 text-sm w-48" />
        </div>
        <Button variant="outline" size="sm" className="gap-1.5 text-xs ml-auto">
          <Download className="h-3.5 w-3.5" /> Export
        </Button>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">#</TableHead>
                  <TableHead>Student</TableHead>
                  <TableHead>Class</TableHead>
                  <TableHead className="text-center">Gender</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-center">Grade</TableHead>
                  <TableHead className="text-center">Result</TableHead>
                  <TableHead className="text-center">Attendance</TableHead>
                  <TableHead className="text-center">Fee</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {studentRows.map((s, idx) => (
                  <TableRow key={`${s.cls}-${s.id}`}
                    className={s.passStatus === "Fail" || s.attendance < 75 ? "bg-red-50/40" : ""}>
                    <TableCell className="text-xs text-gray-400">{idx + 1}</TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm text-gray-900">{s.name}</p>
                        <p className="text-xs text-gray-400">{s.rollNo}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-xs text-gray-500">{s.cls}</TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-xs ${s.gender === "F" ? "bg-pink-100 text-pink-700" : "bg-blue-100 text-blue-700"}`}>
                        {s.gender === "F" ? "Girl" : "Boy"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center font-semibold text-sm">{s.score}%</TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-xs ${s.gradeColor}`}>{s.grade}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-xs ${s.passStatus === "Pass" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                        {s.passStatus}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`text-sm font-medium ${s.attendance < 60 ? "text-red-600" : s.attendance < 75 ? "text-yellow-600" : "text-green-600"}`}>
                        {s.attendance}%
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge className={`text-xs ${s.feeStatus === "Paid" ? "bg-green-100 text-green-800" : s.feeStatus === "Unpaid" ? "bg-red-100 text-red-800" : "bg-yellow-100 text-yellow-800"}`}>
                        {s.feeStatus}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// ─── Root Component ───────────────────────────────────────────────────────────

export function PrincipalReports() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <GraduationCap className="h-7 w-7 text-violet-600" /> School Reports & Analytics
          </h1>
          <p className="text-sm text-gray-500 mt-1">Complete school-wide visibility — Academics · Attendance · Fees · Staff · Students</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-1.5 text-xs">
            <Bell className="h-3.5 w-3.5" /> Alerts
            <Badge className="bg-red-500 text-white text-xs ml-1 px-1.5 py-0">3</Badge>
          </Button>
          <Button size="sm" className="gap-1.5 text-xs bg-violet-600 hover:bg-violet-700">
            <Download className="h-3.5 w-3.5" /> Full Report
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap border-b border-gray-200">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-all
              ${activeTab === id
                ? "border-violet-600 text-violet-600"
                : "border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300"}`}
          >
            <Icon className="h-4 w-4" /> {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview"   && <OverviewTab />}
      {activeTab === "academics"  && <AcademicsTab />}
      {activeTab === "attendance" && <AttendanceTab />}
      {activeTab === "fees"       && <FeesTab />}
      {activeTab === "teachers"   && <TeachersTab />}
      {activeTab === "students"   && <StudentsTab />}
    </div>
  );
}

export default PrincipalReports;