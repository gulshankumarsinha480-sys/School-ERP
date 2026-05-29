import { useState, useMemo } from "react";
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import {
  ClipboardCheck,
  CheckCircle,
  XCircle,
  AlertCircle,
  TrendingUp,
  Users,
  BarChart2,
  BookOpen,
  Edit3,
  Calendar,
  Save,
  Clock,
  Search,
  ChevronDown,
  ChevronUp,
  Filter,
  Eye,
  Award,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

type AttendanceStatus = "present" | "absent" | "leave";

interface Student {
  id: string;
  name: string;
  rollNo: string;
}

interface SubjectAttendanceEntry {
  studentId: string;
  status: AttendanceStatus;
}

interface SubjectPeriod {
  subjectCode: string;
  subjectName: string;
  teacherName: string;
  teacherId: string;
  timeSlot: string;
  periodNo: number;
  entries: SubjectAttendanceEntry[];
}

interface DayAttendanceRecord {
  date: string;
  className: string;
  periods: SubjectPeriod[];
}

interface ClassRecord {
  grade: number;
  name: string;
  classTeacher: string;
  totalStudents: number;
  students: Student[];
}

interface LowAttendanceAlert {
  studentName: string;
  rollNo: string;
  className: string;
  percentage: number;
}

// ─────────────────────────────────────────────────────────────────────────────
// STATIC DATA
// ─────────────────────────────────────────────────────────────────────────────

const CLASSES: ClassRecord[] = [
  {
    grade: 9, name: "9-A", classTeacher: "Mrs. Sharma", totalStudents: 5,
    students: [
      { id: "9A-01", name: "Aryan Sharma",   rollNo: "09A01" },
      { id: "9A-02", name: "Priya Patel",    rollNo: "09A02" },
      { id: "9A-03", name: "Rohan Gupta",    rollNo: "09A03" },
      { id: "9A-04", name: "Sneha Roy",      rollNo: "09A04" },
      { id: "9A-05", name: "Aman Verma",     rollNo: "09A05" },
    ],
  },
  {
    grade: 9, name: "9-B", classTeacher: "Mr. Patel", totalStudents: 4,
    students: [
      { id: "9B-01", name: "Vikram Singh",   rollNo: "09B01" },
      { id: "9B-02", name: "Ananya Das",     rollNo: "09B02" },
      { id: "9B-03", name: "Arjun Mehta",    rollNo: "09B03" },
      { id: "9B-04", name: "Kavya Nair",     rollNo: "09B04" },
    ],
  },
  {
    grade: 10, name: "10-A", classTeacher: "Mrs. Gupta", totalStudents: 5,
    students: [
      { id: "10A-01", name: "Rahul Verma",   rollNo: "10A01" },
      { id: "10A-02", name: "Neha Kapoor",   rollNo: "10A02" },
      { id: "10A-03", name: "Siddharth Rao", rollNo: "10A03" },
      { id: "10A-04", name: "Pooja Bose",    rollNo: "10A04" },
      { id: "10A-05", name: "Devansh Jain",  rollNo: "10A05" },
    ],
  },
  {
    grade: 10, name: "10-B", classTeacher: "Mr. Roy", totalStudents: 4,
    students: [
      { id: "10B-01", name: "Ishaan Malhotra", rollNo: "10B01" },
      { id: "10B-02", name: "Riya Sharma",     rollNo: "10B02" },
      { id: "10B-03", name: "Aakash Tiwari",   rollNo: "10B03" },
      { id: "10B-04", name: "Shriya Mehta",    rollNo: "10B04" },
    ],
  },
  {
    grade: 11, name: "11-A", classTeacher: "Mr. Banerjee", totalStudents: 4,
    students: [
      { id: "11A-01", name: "Karan Banerjee",  rollNo: "11A01" },
      { id: "11A-02", name: "Tanvi Reddy",     rollNo: "11A02" },
      { id: "11A-03", name: "Ritesh Kumar",    rollNo: "11A03" },
      { id: "11A-04", name: "Meghna Chaudhary",rollNo: "11A04" },
    ],
  },
  {
    grade: 11, name: "11-B", classTeacher: "Ms. Singh", totalStudents: 4,
    students: [
      { id: "11B-01", name: "Simran Kaur",     rollNo: "11B01" },
      { id: "11B-02", name: "Yash Aggarwal",   rollNo: "11B02" },
      { id: "11B-03", name: "Prachi Mishra",   rollNo: "11B03" },
      { id: "11B-04", name: "Nikhil Yadav",    rollNo: "11B04" },
    ],
  },
  {
    grade: 12, name: "12-A", classTeacher: "Mrs. Das", totalStudents: 4,
    students: [
      { id: "12A-01", name: "Aditya Das",      rollNo: "12A01" },
      { id: "12A-02", name: "Shreya Pillai",   rollNo: "12A02" },
      { id: "12A-03", name: "Rohan Singhania", rollNo: "12A03" },
      { id: "12A-04", name: "Ankita Bhat",     rollNo: "12A04" },
    ],
  },
  {
    grade: 12, name: "12-B", classTeacher: "Mr. Kapoor", totalStudents: 4,
    students: [
      { id: "12B-01", name: "Pooja Sharma",    rollNo: "12B01" },
      { id: "12B-02", name: "Manav Grover",    rollNo: "12B02" },
      { id: "12B-03", name: "Divya Sethi",     rollNo: "12B03" },
      { id: "12B-04", name: "Arpit Khanna",    rollNo: "12B04" },
    ],
  },
];

const TIMETABLE: Record<string, Omit<SubjectPeriod, "entries">[]> = {
  "9-A": [
    { periodNo: 1, timeSlot: "08:00–08:45", subjectCode: "ENG",  subjectName: "English",     teacherName: "Mrs. D'Souza",  teacherId: "T01" },
    { periodNo: 2, timeSlot: "08:45–09:30", subjectCode: "MATH", subjectName: "Mathematics", teacherName: "Mr. Ahuja",     teacherId: "T02" },
    { periodNo: 3, timeSlot: "09:30–10:15", subjectCode: "SCI",  subjectName: "Science",     teacherName: "Mrs. Sharma",   teacherId: "T03" },
    { periodNo: 4, timeSlot: "10:30–11:15", subjectCode: "SST",  subjectName: "Social Sc.",  teacherName: "Mr. Verma",     teacherId: "T04" },
    { periodNo: 5, timeSlot: "11:15–12:00", subjectCode: "HIN",  subjectName: "Hindi",       teacherName: "Mrs. Pandey",   teacherId: "T05" },
    { periodNo: 6, timeSlot: "12:00–12:45", subjectCode: "CS",   subjectName: "Computer Sc.",teacherName: "Mr. Mishra",    teacherId: "T06" },
  ],
  "9-B": [
    { periodNo: 1, timeSlot: "08:00–08:45", subjectCode: "MATH", subjectName: "Mathematics", teacherName: "Mr. Ahuja",     teacherId: "T02" },
    { periodNo: 2, timeSlot: "08:45–09:30", subjectCode: "ENG",  subjectName: "English",     teacherName: "Mrs. D'Souza",  teacherId: "T01" },
    { periodNo: 3, timeSlot: "09:30–10:15", subjectCode: "HIN",  subjectName: "Hindi",       teacherName: "Mrs. Pandey",   teacherId: "T05" },
    { periodNo: 4, timeSlot: "10:30–11:15", subjectCode: "SCI",  subjectName: "Science",     teacherName: "Mr. Patel",     teacherId: "T07" },
    { periodNo: 5, timeSlot: "11:15–12:00", subjectCode: "SST",  subjectName: "Social Sc.",  teacherName: "Mr. Verma",     teacherId: "T04" },
    { periodNo: 6, timeSlot: "12:00–12:45", subjectCode: "ART",  subjectName: "Art & Craft", teacherName: "Ms. Kapoor",    teacherId: "T08" },
  ],
  "10-A": [
    { periodNo: 1, timeSlot: "08:00–08:45", subjectCode: "PHY",  subjectName: "Physics",     teacherName: "Mr. Iyer",      teacherId: "T09" },
    { periodNo: 2, timeSlot: "08:45–09:30", subjectCode: "CHEM", subjectName: "Chemistry",   teacherName: "Mrs. Gupta",    teacherId: "T10" },
    { periodNo: 3, timeSlot: "09:30–10:15", subjectCode: "MATH", subjectName: "Mathematics", teacherName: "Mr. Ahuja",     teacherId: "T02" },
    { periodNo: 4, timeSlot: "10:30–11:15", subjectCode: "ENG",  subjectName: "English",     teacherName: "Mrs. D'Souza",  teacherId: "T01" },
    { periodNo: 5, timeSlot: "11:15–12:00", subjectCode: "BIO",  subjectName: "Biology",     teacherName: "Ms. Nair",      teacherId: "T11" },
    { periodNo: 6, timeSlot: "12:00–12:45", subjectCode: "CS",   subjectName: "Computer Sc.",teacherName: "Mr. Mishra",    teacherId: "T06" },
  ],
  "10-B": [
    { periodNo: 1, timeSlot: "08:00–08:45", subjectCode: "CHEM", subjectName: "Chemistry",   teacherName: "Mrs. Gupta",    teacherId: "T10" },
    { periodNo: 2, timeSlot: "08:45–09:30", subjectCode: "PHY",  subjectName: "Physics",     teacherName: "Mr. Iyer",      teacherId: "T09" },
    { periodNo: 3, timeSlot: "09:30–10:15", subjectCode: "ENG",  subjectName: "English",     teacherName: "Mrs. D'Souza",  teacherId: "T01" },
    { periodNo: 4, timeSlot: "10:30–11:15", subjectCode: "MATH", subjectName: "Mathematics", teacherName: "Mr. Roy",       teacherId: "T12" },
    { periodNo: 5, timeSlot: "11:15–12:00", subjectCode: "CS",   subjectName: "Computer Sc.",teacherName: "Mr. Mishra",    teacherId: "T06" },
    { periodNo: 6, timeSlot: "12:00–12:45", subjectCode: "BIO",  subjectName: "Biology",     teacherName: "Ms. Nair",      teacherId: "T11" },
  ],
  "11-A": [
    { periodNo: 1, timeSlot: "08:00–08:45", subjectCode: "PHY",  subjectName: "Physics",     teacherName: "Mr. Iyer",      teacherId: "T09" },
    { periodNo: 2, timeSlot: "08:45–09:30", subjectCode: "MATH", subjectName: "Mathematics", teacherName: "Mr. Banerjee",  teacherId: "T13" },
    { periodNo: 3, timeSlot: "09:30–10:15", subjectCode: "CHEM", subjectName: "Chemistry",   teacherName: "Mrs. Gupta",    teacherId: "T10" },
    { periodNo: 4, timeSlot: "10:30–11:15", subjectCode: "ENG",  subjectName: "English",     teacherName: "Mrs. D'Souza",  teacherId: "T01" },
    { periodNo: 5, timeSlot: "11:15–12:00", subjectCode: "CS",   subjectName: "Computer Sc.",teacherName: "Mr. Mishra",    teacherId: "T06" },
    { periodNo: 6, timeSlot: "12:00–12:45", subjectCode: "ECO",  subjectName: "Economics",   teacherName: "Mr. Sinha",     teacherId: "T14" },
  ],
  "11-B": [
    { periodNo: 1, timeSlot: "08:00–08:45", subjectCode: "ECO",  subjectName: "Economics",   teacherName: "Mr. Sinha",     teacherId: "T14" },
    { periodNo: 2, timeSlot: "08:45–09:30", subjectCode: "ACCT", subjectName: "Accountancy", teacherName: "Mrs. Singh",    teacherId: "T15" },
    { periodNo: 3, timeSlot: "09:30–10:15", subjectCode: "BST",  subjectName: "Business St.",teacherName: "Mr. Khanna",    teacherId: "T16" },
    { periodNo: 4, timeSlot: "10:30–11:15", subjectCode: "ENG",  subjectName: "English",     teacherName: "Mrs. D'Souza",  teacherId: "T01" },
    { periodNo: 5, timeSlot: "11:15–12:00", subjectCode: "MATH", subjectName: "Mathematics", teacherName: "Mr. Banerjee",  teacherId: "T13" },
    { periodNo: 6, timeSlot: "12:00–12:45", subjectCode: "IP",   subjectName: "Informatics", teacherName: "Mr. Mishra",    teacherId: "T06" },
  ],
  "12-A": [
    { periodNo: 1, timeSlot: "08:00–08:45", subjectCode: "PHY",  subjectName: "Physics",     teacherName: "Mr. Iyer",      teacherId: "T09" },
    { periodNo: 2, timeSlot: "08:45–09:30", subjectCode: "CHEM", subjectName: "Chemistry",   teacherName: "Mrs. Das",      teacherId: "T17" },
    { periodNo: 3, timeSlot: "09:30–10:15", subjectCode: "MATH", subjectName: "Mathematics", teacherName: "Mr. Banerjee",  teacherId: "T13" },
    { periodNo: 4, timeSlot: "10:30–11:15", subjectCode: "BIO",  subjectName: "Biology",     teacherName: "Ms. Nair",      teacherId: "T11" },
    { periodNo: 5, timeSlot: "11:15–12:00", subjectCode: "ENG",  subjectName: "English",     teacherName: "Mrs. D'Souza",  teacherId: "T01" },
    { periodNo: 6, timeSlot: "12:00–12:45", subjectCode: "CS",   subjectName: "Computer Sc.",teacherName: "Mr. Mishra",    teacherId: "T06" },
  ],
  "12-B": [
    { periodNo: 1, timeSlot: "08:00–08:45", subjectCode: "ECO",  subjectName: "Economics",   teacherName: "Mr. Sinha",     teacherId: "T14" },
    { periodNo: 2, timeSlot: "08:45–09:30", subjectCode: "ACCT", subjectName: "Accountancy", teacherName: "Mr. Kapoor",    teacherId: "T18" },
    { periodNo: 3, timeSlot: "09:30–10:15", subjectCode: "BST",  subjectName: "Business St.",teacherName: "Mr. Khanna",    teacherId: "T16" },
    { periodNo: 4, timeSlot: "10:30–11:15", subjectCode: "ENG",  subjectName: "English",     teacherName: "Mrs. D'Souza",  teacherId: "T01" },
    { periodNo: 5, timeSlot: "11:15–12:00", subjectCode: "MATH", subjectName: "Mathematics", teacherName: "Mr. Banerjee",  teacherId: "T13" },
    { periodNo: 6, timeSlot: "12:00–12:45", subjectCode: "IP",   subjectName: "Informatics", teacherName: "Mr. Mishra",    teacherId: "T06" },
  ],
};

function generateInitialRecords(): DayAttendanceRecord[] {
  const records: DayAttendanceRecord[] = [];
  const today = new Date();
  for (const cls of CLASSES) {
    for (let d = 0; d < 5; d++) {
      const date = new Date(today);
      date.setDate(today.getDate() - d);
      if (date.getDay() === 0 || date.getDay() === 6) continue;
      const dateStr = date.toISOString().split("T")[0];
      const timetable = TIMETABLE[cls.name] || [];
      const periods: SubjectPeriod[] = timetable.map((period) => ({
        ...period,
        entries: cls.students.map((s) => ({
          studentId: s.id,
          status: Math.random() > 0.15 ? "present" : Math.random() > 0.5 ? "absent" : "leave",
        })),
      }));
      records.push({ date: dateStr, className: cls.name, periods });
    }
  }
  return records;
}

const LOW_ATTENDANCE_ALERTS: LowAttendanceAlert[] = [
  { studentName: "Rohan Gupta",    rollNo: "09A03", className: "9-A",  percentage: 68 },
  { studentName: "Simran Kaur",    rollNo: "11B01", className: "11-B", percentage: 62 },
  { studentName: "Ananya Das",     rollNo: "09B02", className: "9-B",  percentage: 71 },
  { studentName: "Yash Aggarwal", rollNo: "11B02", className: "11-B", percentage: 74 },
];

const MONTHS = [
  { value: "may-2026", label: "May 2026" },
  { value: "apr-2026", label: "April 2026" },
  { value: "mar-2026", label: "March 2026" },
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS — all colours use theme-aware classes
// ─────────────────────────────────────────────────────────────────────────────

/** Pill colours for P / A / L — kept as semantic Tailwind pairs that work in both light & dark */
function statusColor(status: AttendanceStatus) {
  if (status === "present") return "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800";
  if (status === "absent")  return "text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800";
  return "text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800";
}

function statusIcon(status: AttendanceStatus) {
  if (status === "present") return <CheckCircle className="h-3.5 w-3.5" />;
  if (status === "absent")  return <XCircle className="h-3.5 w-3.5" />;
  return <AlertCircle className="h-3.5 w-3.5" />;
}

function pctBadge(pct: number) {
  if (pct >= 90) return "bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-400";
  if (pct >= 75) return "bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400";
  return "bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-400";
}

function calcClassSummary(records: DayAttendanceRecord[], className: string) {
  const classRecords = records.filter((r) => r.className === className);
  if (!classRecords.length) return { present: 0, absent: 0, leave: 0, total: 0, pct: 0 };
  let present = 0, absent = 0, leave = 0, total = 0;
  for (const rec of classRecords) {
    for (const period of rec.periods) {
      for (const entry of period.entries) {
        total++;
        if (entry.status === "present") present++;
        else if (entry.status === "absent") absent++;
        else leave++;
      }
    }
  }
  return { present, absent, leave, total, pct: total ? Math.round(((present + leave) / total) * 100) : 0 };
}

function calcStudentSubjectSummary(
  records: DayAttendanceRecord[],
  className: string,
  studentId: string
) {
  const classRecords = records.filter((r) => r.className === className);
  const map: Record<string, { subjectName: string; teacherName: string; present: number; absent: number; leave: number; total: number }> = {};
  for (const rec of classRecords) {
    for (const period of rec.periods) {
      const entry = period.entries.find((e) => e.studentId === studentId);
      if (!entry) continue;
      if (!map[period.subjectCode]) {
        map[period.subjectCode] = { subjectName: period.subjectName, teacherName: period.teacherName, present: 0, absent: 0, leave: 0, total: 0 };
      }
      map[period.subjectCode].total++;
      if (entry.status === "present") map[period.subjectCode].present++;
      else if (entry.status === "absent") map[period.subjectCode].absent++;
      else map[period.subjectCode].leave++;
    }
  }
  return map;
}

type MainView = "overview" | "student-detail";

// ─────────────────────────────────────────────────────────────────────────────
// STUDENT DETAIL VIEW
// ─────────────────────────────────────────────────────────────────────────────

interface StudentDetailProps {
  student: Student;
  cls: ClassRecord;
  records: DayAttendanceRecord[];
  onBack: () => void;
  onSave: (updated: DayAttendanceRecord[]) => void;
}

function StudentDetailView({ student, cls, records, onBack, onSave }: StudentDetailProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [editingPeriods, setEditingPeriods] = useState<SubjectPeriod[] | null>(null);
  const [savedRecords, setSavedRecords] = useState<DayAttendanceRecord[]>(records);

  const classRecords = savedRecords
    .filter((r) => r.className === cls.name)
    .sort((a, b) => b.date.localeCompare(a.date));

  const subjectSummary = calcStudentSubjectSummary(savedRecords, cls.name, student.id);

  const openDateEdit = (date: string) => {
    setSelectedDate(date);
    const rec = savedRecords.find((r) => r.className === cls.name && r.date === date);
    if (rec) setEditingPeriods(JSON.parse(JSON.stringify(rec.periods)));
  };

  const updateEntry = (periodIdx: number, status: AttendanceStatus) => {
    if (!editingPeriods) return;
    const updated = [...editingPeriods];
    const entryIdx = updated[periodIdx].entries.findIndex((e) => e.studentId === student.id);
    if (entryIdx !== -1) updated[periodIdx].entries[entryIdx].status = status;
    setEditingPeriods(updated);
  };

  const saveEdits = () => {
    if (!selectedDate || !editingPeriods) return;
    const updated = savedRecords.map((r) =>
      r.className === cls.name && r.date === selectedDate
        ? { ...r, periods: editingPeriods }
        : r
    );
    setSavedRecords(updated);
    onSave(updated);
    setSelectedDate(null);
    setEditingPeriods(null);
  };

  const overallPresent = Object.values(subjectSummary).reduce((s, v) => s + v.present, 0);
  const overallTotal   = Object.values(subjectSummary).reduce((s, v) => s + v.total, 0);
  const overallPct     = overallTotal ? Math.round(((overallPresent) / overallTotal) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Back + Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" onClick={onBack} className="gap-2">
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{student.name}</h2>
          <p className="text-sm text-muted-foreground">Roll No: {student.rollNo} · Class: {cls.name} · Teacher: {cls.classTeacher}</p>
        </div>
      </div>

      {/* Overall + Subject Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="md:col-span-1">
          <CardContent className="pt-5">
            <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Overall Attendance</p>
            <p className={`text-4xl font-bold ${overallPct >= 75 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}>{overallPct}%</p>
            <Progress value={overallPct} className="mt-3 h-2" />
            {overallPct < 75 && (
              <p className="text-xs text-red-500 dark:text-red-400 mt-2 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" /> Below minimum 75% threshold
              </p>
            )}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2 pt-4 px-4">
            <CardTitle className="text-sm font-semibold text-foreground">Subject-wise Summary</CardTitle>
          </CardHeader>
          <CardContent className="px-4 pb-4">
            <div className="space-y-2">
              {Object.entries(subjectSummary).map(([code, data]) => {
                const pct = data.total ? Math.round(((data.present + data.leave) / data.total) * 100) : 0;
                return (
                  <div key={code} className="flex items-center gap-3">
                    <span className="w-10 text-xs font-mono font-semibold text-muted-foreground">{code}</span>
                    <span className="w-28 text-xs text-foreground truncate">{data.subjectName}</span>
                    <Progress value={pct} className="flex-1 h-1.5" />
                    <span className={`text-xs font-semibold px-1.5 py-0.5 rounded ${pctBadge(pct)}`}>{pct}%</span>
                    <span className="text-xs text-muted-foreground w-16">{data.present}/{data.total} cls</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Date-wise Records */}
      <Card>
        <CardHeader className="pb-2 pt-4 px-4">
          <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" /> Date-wise Attendance Record
          </CardTitle>
        </CardHeader>
        <CardContent className="px-0 pb-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="pl-4 text-xs">Date</TableHead>
                  {(TIMETABLE[cls.name] || []).map((p) => (
                    <TableHead key={p.periodNo} className="text-xs text-center px-1">
                      <div className="font-semibold">{p.subjectCode}</div>
                      <div className="text-muted-foreground font-normal text-[10px]">{p.timeSlot}</div>
                    </TableHead>
                  ))}
                  <TableHead className="text-xs text-center">Summary</TableHead>
                  <TableHead className="text-xs text-center pr-4">Edit</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {classRecords.map((rec) => {
                  const dayPresent = rec.periods.filter(
                    (p) => p.entries.find((e) => e.studentId === student.id)?.status === "present"
                  ).length;
                  const dayTotal = rec.periods.length;
                  return (
                    <TableRow key={rec.date} className="hover:bg-muted/40">
                      <TableCell className="pl-4 text-sm font-medium whitespace-nowrap text-foreground">
                        {new Date(rec.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
                      </TableCell>
                      {rec.periods.map((period) => {
                        const entry = period.entries.find((e) => e.studentId === student.id);
                        const st = entry?.status ?? "absent";
                        return (
                          <TableCell key={period.periodNo} className="text-center px-1">
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold border ${statusColor(st)}`}>
                              {st === "present" ? "P" : st === "absent" ? "A" : "L"}
                            </span>
                          </TableCell>
                        );
                      })}
                      <TableCell className="text-center">
                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pctBadge(Math.round((dayPresent / dayTotal) * 100))}`}>
                          {dayPresent}/{dayTotal}
                        </span>
                      </TableCell>
                      <TableCell className="text-center pr-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openDateEdit(rec.date)}
                          className="h-7 w-7 p-0 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Edit Modal */}
      <Dialog open={!!selectedDate} onOpenChange={(open) => { if (!open) { setSelectedDate(null); setEditingPeriods(null); } }}>
        <DialogContent className="max-w-2xl bg-card text-card-foreground">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base text-foreground">
              <Edit3 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              Edit Attendance — {student.name} ({student.rollNo})
              <span className="text-muted-foreground font-normal ml-1">
                {selectedDate && new Date(selectedDate).toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
              </span>
            </DialogTitle>
          </DialogHeader>

          {editingPeriods && (
            <div className="space-y-3 mt-2">
              {editingPeriods.map((period, idx) => {
                const entry = period.entries.find((e) => e.studentId === student.id);
                const st = entry?.status ?? "absent";
                return (
                  <div key={period.periodNo} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-muted/40">
                    <div className="flex-none text-center w-8">
                      <span className="text-xs font-bold text-muted-foreground">P{period.periodNo}</span>
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="p-1.5 rounded bg-blue-100 dark:bg-blue-950">
                        <BookOpen className="h-3.5 w-3.5 text-blue-700 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground truncate">{period.subjectName}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <Users className="h-3 w-3" /> {period.teacherName}
                          <span className="mx-1">·</span>
                          <Clock className="h-3 w-3" /> {period.timeSlot}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      {(["present", "absent", "leave"] as AttendanceStatus[]).map((s) => (
                        <button
                          key={s}
                          onClick={() => updateEntry(idx, s)}
                          className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all ${
                            st === s
                              ? statusColor(s) + " border-current"
                              : "border-border text-muted-foreground hover:border-border/80 hover:text-foreground"
                          }`}
                        >
                          {s === "present" ? "Present" : s === "absent" ? "Absent" : "Leave"}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-border">
            <Button variant="outline" onClick={() => { setSelectedDate(null); setEditingPeriods(null); }}>
              Cancel
            </Button>
            <Button onClick={saveEdits} className="gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CLASS PANEL
// ─────────────────────────────────────────────────────────────────────────────

interface ClassPanelProps {
  cls: ClassRecord;
  records: DayAttendanceRecord[];
  onSelectStudent: (student: Student) => void;
}

function ClassPanel({ cls, records, onSelectStudent }: ClassPanelProps) {
  const [open, setOpen] = useState(false);
  const summary = calcClassSummary(records, cls.name);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950">
            <Users className="h-4 w-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm text-foreground">{cls.name}</p>
            <p className="text-xs text-muted-foreground">{cls.classTeacher} · {cls.totalStudents} students</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className={`text-sm font-bold px-2.5 py-0.5 rounded-full ${pctBadge(summary.pct)}`}>
            {summary.pct}%
          </span>
          {open
            ? <ChevronUp className="h-4 w-4 text-muted-foreground" />
            : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-border bg-muted/30 px-4 py-3">
          <p className="text-xs text-muted-foreground mb-2 font-semibold uppercase tracking-wider">Students</p>
          <div className="space-y-1.5">
            {cls.students.map((s) => {
              const subj    = calcStudentSubjectSummary(records, cls.name, s.id);
              const total   = Object.values(subj).reduce((a, v) => a + v.total, 0);
              const present = Object.values(subj).reduce((a, v) => a + v.present, 0);
              const pct     = total ? Math.round((present / total) * 100) : 0;
              const alert   = LOW_ATTENDANCE_ALERTS.find((a) => a.rollNo === s.rollNo);

              return (
                <div
                  key={s.id}
                  className="flex items-center justify-between bg-card rounded-lg px-3 py-2 border border-border hover:border-blue-300 dark:hover:border-blue-700 cursor-pointer group transition-all"
                  onClick={() => onSelectStudent(s)}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300">
                      {s.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.rollNo}</p>
                    </div>
                    {alert && (
                      <AlertTriangle className="h-3.5 w-3.5 text-red-500 dark:text-red-400" title="Low attendance alert" />
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${pctBadge(pct)}`}>{pct}%</span>
                    <Eye className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// BULK EDIT MODAL
// ─────────────────────────────────────────────────────────────────────────────

interface BulkEditModalProps {
  open: boolean;
  onClose: () => void;
  classes: ClassRecord[];
  records: DayAttendanceRecord[];
  onSave: (updated: DayAttendanceRecord[]) => void;
}

function BulkEditModal({ open, onClose, classes, records, onSave }: BulkEditModalProps) {
  const today = new Date().toISOString().split("T")[0];
  const [selectedDate, setSelectedDate] = useState(today);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState<number | null>(null);
  const [editEntries, setEditEntries] = useState<SubjectAttendanceEntry[]>([]);

  const cls = classes.find((c) => c.name === selectedClass);
  const timetable = selectedClass ? (TIMETABLE[selectedClass] || []) : [];
  const period = selectedPeriod !== null ? timetable[selectedPeriod] : null;

  const loadEntries = (periodIdx: number) => {
    setSelectedPeriod(periodIdx);
    const rec = records.find((r) => r.className === selectedClass && r.date === selectedDate);
    if (rec && rec.periods[periodIdx]) {
      setEditEntries(JSON.parse(JSON.stringify(rec.periods[periodIdx].entries)));
    } else if (cls) {
      setEditEntries(cls.students.map((s) => ({ studentId: s.id, status: "present" })));
    }
  };

  const updateEntry = (studentId: string, status: AttendanceStatus) => {
    setEditEntries((prev) => prev.map((e) => e.studentId === studentId ? { ...e, status } : e));
  };

  const markAll = (status: AttendanceStatus) => {
    setEditEntries((prev) => prev.map((e) => ({ ...e, status })));
  };

  const handleSave = () => {
    if (!selectedClass || selectedPeriod === null || !cls) return;
    let updated = [...records];
    const recIdx = updated.findIndex((r) => r.className === selectedClass && r.date === selectedDate);
    if (recIdx === -1) {
      const newPeriods: SubjectPeriod[] = timetable.map((p, i) => ({
        ...p,
        entries: cls.students.map((s) => ({
          studentId: s.id,
          status: i === selectedPeriod ? editEntries.find((e) => e.studentId === s.id)?.status ?? "present" : "present",
        })),
      }));
      updated.push({ date: selectedDate, className: selectedClass, periods: newPeriods });
    } else {
      const updatedPeriods = [...updated[recIdx].periods];
      if (updatedPeriods[selectedPeriod]) {
        updatedPeriods[selectedPeriod] = { ...updatedPeriods[selectedPeriod], entries: editEntries };
      }
      updated[recIdx] = { ...updated[recIdx], periods: updatedPeriods };
    }
    onSave(updated);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <ClipboardCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Mark / Edit Class Attendance
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-4 mt-2">
          <div>
            <Label className="text-xs text-muted-foreground">Date</Label>
            <Input
              type="date"
              value={selectedDate}
              onChange={(e) => { setSelectedDate(e.target.value); setSelectedPeriod(null); setEditEntries([]); }}
              className="mt-1 bg-background text-foreground border-border"
            />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Class</Label>
            <Select value={selectedClass} onValueChange={(v) => { setSelectedClass(v); setSelectedPeriod(null); setEditEntries([]); }}>
              <SelectTrigger className="mt-1 bg-background text-foreground border-border">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground border-border">
                {classes.map((c) => (
                  <SelectItem key={c.name} value={c.name}>{c.name} — {c.classTeacher}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {selectedClass && (
          <div className="mt-4">
            <Label className="text-xs text-muted-foreground">Select Period / Subject</Label>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {timetable.map((p, i) => (
                <button
                  key={i}
                  onClick={() => loadEntries(i)}
                  className={`text-left p-2.5 rounded-lg border text-xs transition-all ${
                    selectedPeriod === i
                      ? "border-blue-400 dark:border-blue-600 bg-blue-50 dark:bg-blue-950 text-blue-800 dark:text-blue-300"
                      : "border-border hover:border-blue-300 dark:hover:border-blue-700 hover:bg-muted/50 text-foreground"
                  }`}
                >
                  <p className="font-bold">P{p.periodNo} · {p.subjectCode}</p>
                  <p className="text-muted-foreground mt-0.5">{p.subjectName}</p>
                  <p className="text-muted-foreground flex items-center gap-1 mt-0.5">
                    <Clock className="h-2.5 w-2.5" />{p.timeSlot}
                  </p>
                  <p className="text-muted-foreground flex items-center gap-1 mt-0.5 truncate">
                    <Users className="h-2.5 w-2.5" />{p.teacherName}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedPeriod !== null && period && cls && editEntries.length > 0 && (
          <div className="mt-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-sm font-semibold text-foreground">{period.subjectName} — {period.timeSlot}</p>
                <p className="text-xs text-muted-foreground">Teacher: {period.teacherName}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => markAll("present")} className="text-green-600 dark:text-green-400 h-7 text-xs gap-1">
                  <CheckCircle className="h-3 w-3" /> All Present
                </Button>
                <Button variant="outline" size="sm" onClick={() => markAll("absent")} className="text-red-600 dark:text-red-400 h-7 text-xs gap-1">
                  <XCircle className="h-3 w-3" /> All Absent
                </Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50">
                  <TableHead className="text-xs pl-3">Roll No</TableHead>
                  <TableHead className="text-xs">Student Name</TableHead>
                  <TableHead className="text-xs text-center">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cls.students.map((s) => {
                  const entry = editEntries.find((e) => e.studentId === s.id);
                  const st = entry?.status ?? "present";
                  return (
                    <TableRow key={s.id} className="hover:bg-muted/40">
                      <TableCell className="text-xs font-mono pl-3 text-foreground">{s.rollNo}</TableCell>
                      <TableCell className="text-sm text-foreground">{s.name}</TableCell>
                      <TableCell>
                        <div className="flex gap-1.5 justify-center">
                          {(["present", "absent", "leave"] as AttendanceStatus[]).map((status) => (
                            <button
                              key={status}
                              onClick={() => updateEntry(s.id, status)}
                              className={`px-2.5 py-1 rounded text-xs font-semibold border transition-all ${
                                st === status
                                  ? statusColor(status) + " border-current"
                                  : "border-border text-muted-foreground hover:border-border/60"
                              }`}
                            >
                              {status === "present" ? "P" : status === "absent" ? "A" : "L"}
                            </button>
                          ))}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        )}

        <div className="flex justify-end gap-3 pt-4 border-t border-border mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave} disabled={selectedPeriod === null || !selectedClass} className="gap-2">
            <Save className="h-4 w-4" /> Save Attendance
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────────────────

export function PrincipalAttendance() {
  const [records, setRecords] = useState<DayAttendanceRecord[]>(() => generateInitialRecords());
  const [selectedMonth, setSelectedMonth] = useState("may-2026");
  const [selectedGrade, setSelectedGrade] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"overview" | "alerts">("overview");
  const [mainView, setMainView] = useState<MainView>("overview");
  const [selectedStudent, setSelectedStudent] = useState<{ student: Student; cls: ClassRecord } | null>(null);
  const [bulkEditOpen, setBulkEditOpen] = useState(false);

  const TREND_DATA   = [82, 85, 88, 87, 90, 91, 89, 92];
  const TREND_LABELS = ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8"];

  const filteredClasses = useMemo(() => {
    let cls = CLASSES;
    if (selectedGrade !== "all") cls = cls.filter((c) => c.grade === Number(selectedGrade));
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      cls = cls.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.classTeacher.toLowerCase().includes(q) ||
          c.students.some((s) => s.name.toLowerCase().includes(q) || s.rollNo.toLowerCase().includes(q))
      );
    }
    return cls;
  }, [selectedGrade, searchQuery]);

  const schoolPct = useMemo(() => {
    let total = 0, present = 0;
    for (const rec of records) {
      for (const p of rec.periods) {
        for (const e of p.entries) {
          total++;
          if (e.status === "present") present++;
        }
      }
    }
    return total ? Math.round((present / total) * 100) : 0;
  }, [records]);

  const totalStudents = CLASSES.reduce((s, c) => s + c.totalStudents, 0);

  const handleSelectStudent = (student: Student, cls: ClassRecord) => {
    setSelectedStudent({ student, cls });
    setMainView("student-detail");
  };

  const handleBack = () => {
    setMainView("overview");
    setSelectedStudent(null);
  };

  // ── Student Detail View ──
  if (mainView === "student-detail" && selectedStudent) {
    return (
      <div className="px-4 sm:px-6 lg:px-8 py-6 bg-background min-h-screen">
        <StudentDetailView
          student={selectedStudent.student}
          cls={selectedStudent.cls}
          records={records}
          onBack={handleBack}
          onSave={setRecords}
        />
      </div>
    );
  }

  // ── Overview ──
  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8 py-6 bg-background min-h-screen">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Attendance Overview</h1>
          <p className="text-sm text-muted-foreground mt-0.5">School-wide attendance · all classes · all subjects</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 px-4 py-2 rounded-full text-sm">
            <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span className="font-semibold text-green-700 dark:text-green-400">{schoolPct}% school avg</span>
          </div>
          <Button onClick={() => setBulkEditOpen(true)} className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
            <Edit3 className="h-4 w-4" /> Mark Attendance
          </Button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students", value: totalStudents,              icon: <Users    className="h-5 w-5 text-blue-500"   />, bg: "bg-blue-50 dark:bg-blue-950"   },
          { label: "Classes",        value: CLASSES.length,             icon: <BookOpen className="h-5 w-5 text-purple-500" />, bg: "bg-purple-50 dark:bg-purple-950" },
          { label: "School Average", value: `${schoolPct}%`,            icon: <BarChart2 className="h-5 w-5 text-green-500" />, bg: "bg-green-50 dark:bg-green-950"  },
          { label: "Low Attendance", value: LOW_ATTENDANCE_ALERTS.length, icon: <AlertCircle className="h-5 w-5 text-red-500" />, bg: "bg-red-50 dark:bg-red-950"   },
        ].map((stat) => (
          <Card key={stat.label} className="border-border bg-card">
            <CardContent className="pt-4 pb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${stat.bg}`}>{stat.icon}</div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {[
          { key: "overview", label: "Class Overview" },
          { key: "alerts",   label: `Low Attendance Alerts (${LOW_ATTENDANCE_ALERTS.length})` },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px ${
              activeTab === tab.key
                ? "border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="space-y-4">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search class, teacher, or student…"
                className="pl-9 bg-background text-foreground border-border"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={selectedGrade} onValueChange={setSelectedGrade}>
              <SelectTrigger className="w-36 bg-background text-foreground border-border">
                <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Grade" />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground border-border">
                <SelectItem value="all">All Grades</SelectItem>
                {[9, 10, 11, 12].map((g) => <SelectItem key={g} value={String(g)}>Grade {g}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
              <SelectTrigger className="w-36 bg-background text-foreground border-border">
                <Calendar className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-popover text-popover-foreground border-border">
                {MONTHS.map((m) => <SelectItem key={m.value} value={m.value}>{m.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>

          {/* Class Panels */}
          <div className="space-y-3">
            {filteredClasses.map((cls) => (
              <ClassPanel
                key={cls.name}
                cls={cls}
                records={records}
                onSelectStudent={(student) => handleSelectStudent(student, cls)}
              />
            ))}
            {filteredClasses.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-40" />
                <p className="text-sm">No classes match your search</p>
              </div>
            )}
          </div>

          {/* Trend Chart */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-2 pt-4 px-4">
              <CardTitle className="text-sm font-semibold text-foreground flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-green-500" /> Weekly Attendance Trend
              </CardTitle>
            </CardHeader>
            <CardContent className="px-4 pb-4">
              <div className="flex items-end gap-2 h-28">
                {TREND_DATA.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-muted-foreground">{val}%</span>
                    <div
                      className="w-full rounded-t-sm bg-blue-400 dark:bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-500 transition-colors"
                      style={{ height: `${(val / 100) * 80}px` }}
                    />
                    <span className="text-[10px] text-muted-foreground">{TREND_LABELS[i]}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "alerts" && (
        <div className="space-y-3">
          {LOW_ATTENDANCE_ALERTS.map((alert) => {
            const cls     = CLASSES.find((c) => c.name === alert.className);
            const student = cls?.students.find((s) => s.rollNo === alert.rollNo);
            return (
              <div
                key={alert.rollNo}
                className="flex items-center justify-between p-4 rounded-xl border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/50 cursor-pointer hover:bg-red-100 dark:hover:bg-red-950 transition-colors"
                onClick={() => student && cls && handleSelectStudent(student, cls)}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-full bg-red-100 dark:bg-red-900">
                    <AlertTriangle className="h-4 w-4 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{alert.studentName}</p>
                    <p className="text-xs text-muted-foreground">{alert.rollNo} · Class {alert.className}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-lg font-bold text-red-600 dark:text-red-400">{alert.percentage}%</p>
                    <p className="text-xs text-red-400 dark:text-red-500">below 75% threshold</p>
                  </div>
                  <Eye className="h-4 w-4 text-red-400 dark:text-red-500" />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bulk Edit Modal */}
      <BulkEditModal
        open={bulkEditOpen}
        onClose={() => setBulkEditOpen(false)}
        classes={CLASSES}
        records={records}
        onSave={(updated) => { setRecords(updated); }}
      />
    </div>
  );
}