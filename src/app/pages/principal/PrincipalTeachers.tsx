
// src/app/pages/principal/PrincipalTeachers.tsx
import { useState } from "react";
import {
  Search, Plus, Pencil, Trash2, Eye, Mail, Phone, Users, BookOpen,
  Award, UserCheck, ChevronDown, ChevronUp, X, Check,
  GraduationCap, Briefcase, MapPin, Banknote, Stethoscope,
  Calendar, Hash, Star, School, Crown, Shield, BookMarked,
  FlaskConical, Dumbbell, Music2, Palette, Computer, Library,
  ClipboardList, BadgeCheck, AlertTriangle, Building2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

// ── Types ─────────────────────────────────────────────────────────────────────

type Status = "Active" | "On Leave" | "Suspended" | "Resigned";
type EmploymentType = "Permanent" | "Probation" | "Contract" | "Part-Time" | "Guest Faculty";

interface ClassSubjectEntry {
  className: string;
  subjects: string[];
}

interface Teacher {
  id: number;
  empId: string;
  name: string;
  gender: string;
  dob: string;
  bloodGroup: string;
  phone: string;
  alternatePhone: string;
  email: string;
  address: string;
  city: string;
  aadhar: string;
  pan: string;
  // Professional
  designation: string;          // PGT / TGT / PRT etc
  department: string;
  positions: string[];           // Class Teacher of X, HOD, etc
  classTeacherOf: string;        // e.g. "10-A"
  classSubjects: ClassSubjectEntry[];  // which subjects in which classes
  joiningDate: string;
  employmentType: EmploymentType;
  experience: string;
  reportingTo: string;
  // Qualifications
  highestQualification: string;
  bEd: boolean;
  tet: boolean;
  ctet: boolean;
  // Bank
  bankName: string;
  accountNo: string;
  ifscCode: string;
  basicSalary: string;
  // Health
  bloodGroupHealth: string;
  medicalCondition: string;
  // Status
  status: Status;
  // Avatar
  initials: string;
}

// ── Constants ─────────────────────────────────────────────────────────────────

const ALL_POSITIONS = [
  { value: "Principal",                 label: "Principal",                  icon: Crown,        color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300" },
  { value: "Vice Principal",            label: "Vice Principal",             icon: Star,         color: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300" },
  { value: "Head of Department (HOD)",  label: "Head of Department (HOD)",   icon: Building2,    color: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300" },
  { value: "Class Teacher",             label: "Class Teacher",              icon: School,       color: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300" },
  { value: "Assistant Teacher",         label: "Assistant Teacher",          icon: UserCheck,    color: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" },
  { value: "Subject Teacher",           label: "Subject Teacher",            icon: BookOpen,     color: "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300" },
  { value: "Senior Teacher",            label: "Senior Teacher",             icon: BadgeCheck,   color: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300" },
  { value: "Lab Incharge",              label: "Lab Incharge",               icon: FlaskConical, color: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/40 dark:text-cyan-300" },
  { value: "Sports Teacher",            label: "Sports Teacher / Coach",     icon: Dumbbell,     color: "bg-lime-100 text-lime-800 dark:bg-lime-900/40 dark:text-lime-300" },
  { value: "Arts Teacher",              label: "Arts Teacher",               icon: Palette,      color: "bg-pink-100 text-pink-800 dark:bg-pink-900/40 dark:text-pink-300" },
  { value: "Music Teacher",             label: "Music Teacher",              icon: Music2,       color: "bg-rose-100 text-rose-800 dark:bg-rose-900/40 dark:text-rose-300" },
  { value: "Computer Teacher",          label: "Computer Teacher",           icon: Computer,     color: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/40 dark:text-indigo-300" },
  { value: "Librarian",                 label: "Librarian",                  icon: Library,      color: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300" },
  { value: "Counselor",                 label: "Counselor / Psychologist",   icon: Shield,       color: "bg-teal-100 text-teal-800 dark:bg-teal-900/40 dark:text-teal-300" },
  { value: "NCC Officer",               label: "NCC Officer",                icon: Award,        color: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300" },
  { value: "NSS Coordinator",           label: "NSS Coordinator",            icon: Users,        color: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300" },
  { value: "Exam Coordinator",          label: "Exam Coordinator",           icon: ClipboardList,color: "bg-slate-100 text-slate-800 dark:bg-slate-900/40 dark:text-slate-300" },
  { value: "Admission Incharge",        label: "Admission Incharge",         icon: BookMarked,   color: "bg-fuchsia-100 text-fuchsia-800 dark:bg-fuchsia-900/40 dark:text-fuchsia-300" },
  { value: "Activity Incharge",         label: "Activity / Event Incharge",  icon: Star,         color: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300" },
  { value: "Tutor",                     label: "Tutor (Remedial)",           icon: GraduationCap,color: "bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300" },
];

const ALL_CLASSES = ["Nursery","LKG","UKG","1","2","3","4","5","6","7","8","9","10","11-Sci","11-Com","11-Arts","12-Sci","12-Com","12-Arts"];
const ALL_SUBJECTS = ["Mathematics","Physics","Chemistry","Biology","English","Hindi","Bengali","History","Geography","Computer Science","Art","Music","Physical Education","Science","Economics","Accountancy","Business Studies","Political Science","Sociology","Psychology","Sanskrit","French"];
const DEPARTMENTS = ["Mathematics","Science","English","Hindi","Social Science","Computer Science","Physical Education","Arts","Commerce","Biology","Chemistry","Physics","Languages"];
const DESIGNATIONS = ["PRT (Primary Teacher)","TGT (Trained Graduate Teacher)","PGT (Post Graduate Teacher)","Lecturer","Special Educator","Lab Assistant","Librarian","Counselor"];
const BLOOD_GROUPS = ["A+","A-","B+","B-","AB+","AB-","O+","O-"];
const STATUS_OPTIONS: Status[] = ["Active","On Leave","Suspended","Resigned"];
const EMP_TYPES: EmploymentType[] = ["Permanent","Probation","Contract","Part-Time","Guest Faculty"];

// ── Initial Data ──────────────────────────────────────────────────────────────

const initialTeachers: Teacher[] = [
  {
    id: 1, empId: "T001", name: "Mr. Rajesh Kumar", gender: "Male", dob: "1980-05-14",
    bloodGroup: "B+", phone: "+91 98765-43210", alternatePhone: "", email: "rajesh.k@school.com",
    address: "12 MG Road, Lucknow", city: "Lucknow", aadhar: "1234 5678 9012", pan: "ABCPK1234D",
    designation: "PGT (Post Graduate Teacher)", department: "Mathematics",
    positions: ["Head of Department (HOD)","Subject Teacher","Exam Coordinator"],
    classTeacherOf: "10-A",
    classSubjects: [
      { className: "9",  subjects: ["Mathematics"] },
      { className: "10", subjects: ["Mathematics"] },
      { className: "11-Sci", subjects: ["Mathematics"] },
      { className: "12-Sci", subjects: ["Mathematics"] },
    ],
    joiningDate: "2012-07-01", employmentType: "Permanent", experience: "12 years",
    reportingTo: "Vice Principal", highestQualification: "M.Sc Mathematics",
    bEd: true, tet: false, ctet: true,
    bankName: "SBI", accountNo: "XXXXXX7890", ifscCode: "SBIN0001234", basicSalary: "45000",
    bloodGroupHealth: "B+", medicalCondition: "None",
    status: "Active", initials: "RK",
  },
  {
    id: 2, empId: "T002", name: "Ms. Priya Sharma", gender: "Female", dob: "1988-11-22",
    bloodGroup: "A+", phone: "+91 98765-43211", alternatePhone: "+91 97654-32100", email: "priya.s@school.com",
    address: "45 Park Street, Lucknow", city: "Lucknow", aadhar: "2345 6789 0123", pan: "BCDPS5678E",
    designation: "TGT (Trained Graduate Teacher)", department: "Science",
    positions: ["Class Teacher","Subject Teacher","Lab Incharge"],
    classTeacherOf: "8-B",
    classSubjects: [
      { className: "6", subjects: ["Science"] },
      { className: "7", subjects: ["Science","Biology"] },
      { className: "8", subjects: ["Science","Biology"] },
    ],
    joiningDate: "2016-04-15", employmentType: "Permanent", experience: "8 years",
    reportingTo: "HOD Science", highestQualification: "M.Sc Biology",
    bEd: true, tet: true, ctet: true,
    bankName: "HDFC", accountNo: "XXXXXX4567", ifscCode: "HDFC0002345", basicSalary: "38000",
    bloodGroupHealth: "A+", medicalCondition: "None",
    status: "Active", initials: "PS",
  },
  {
    id: 3, empId: "T003", name: "Mr. Amit Verma", gender: "Male", dob: "1975-03-08",
    bloodGroup: "O+", phone: "+91 98765-43212", alternatePhone: "", email: "amit.v@school.com",
    address: "78 Civil Lines, Agra", city: "Agra", aadhar: "3456 7890 1234", pan: "CDEAV9012F",
    designation: "PGT (Post Graduate Teacher)", department: "English",
    positions: ["Senior Teacher","Subject Teacher","Activity Incharge"],
    classTeacherOf: "12-Arts",
    classSubjects: [
      { className: "9",     subjects: ["English"] },
      { className: "10",    subjects: ["English"] },
      { className: "11-Arts", subjects: ["English"] },
      { className: "12-Arts", subjects: ["English"] },
    ],
    joiningDate: "2009-06-20", employmentType: "Permanent", experience: "15 years",
    reportingTo: "Vice Principal", highestQualification: "M.A English Literature",
    bEd: true, tet: false, ctet: false,
    bankName: "PNB", accountNo: "XXXXXX1230", ifscCode: "PUNB0003456", basicSalary: "52000",
    bloodGroupHealth: "O+", medicalCondition: "None",
    status: "Active", initials: "AV",
  },
  {
    id: 4, empId: "T004", name: "Ms. Neha Joshi", gender: "Female", dob: "1992-08-30",
    bloodGroup: "AB+", phone: "+91 98765-43213", alternatePhone: "", email: "neha.j@school.com",
    address: "23 Gandhi Nagar, Varanasi", city: "Varanasi", aadhar: "4567 8901 2345", pan: "DEFNJ3456G",
    designation: "TGT (Trained Graduate Teacher)", department: "Social Science",
    positions: ["Assistant Teacher","Subject Teacher"],
    classTeacherOf: "",
    classSubjects: [
      { className: "6", subjects: ["History","Geography"] },
      { className: "7", subjects: ["History","Geography","Political Science"] },
      { className: "8", subjects: ["History"] },
    ],
    joiningDate: "2019-01-10", employmentType: "Contract", experience: "5 years",
    reportingTo: "HOD Social Science", highestQualification: "M.A History",
    bEd: true, tet: true, ctet: false,
    bankName: "Bank of India", accountNo: "XXXXXX7891", ifscCode: "BKID0004567", basicSalary: "28000",
    bloodGroupHealth: "AB+", medicalCondition: "None",
    status: "On Leave", initials: "NJ",
  },
  {
    id: 5, empId: "T005", name: "Mr. Vikram Singh", gender: "Male", dob: "1985-12-05",
    bloodGroup: "B-", phone: "+91 98765-43214", alternatePhone: "+91 96543-21000", email: "vikram.s@school.com",
    address: "56 IT Colony, Noida", city: "Noida", aadhar: "5678 9012 3456", pan: "EFGVS7890H",
    designation: "PGT (Post Graduate Teacher)", department: "Computer Science",
    positions: ["Head of Department (HOD)","Computer Teacher","Subject Teacher"],
    classTeacherOf: "11-Sci",
    classSubjects: [
      { className: "6",     subjects: ["Computer Science"] },
      { className: "7",     subjects: ["Computer Science"] },
      { className: "8",     subjects: ["Computer Science"] },
      { className: "9",     subjects: ["Computer Science"] },
      { className: "10",    subjects: ["Computer Science"] },
      { className: "11-Sci",subjects: ["Computer Science"] },
      { className: "12-Sci",subjects: ["Computer Science"] },
    ],
    joiningDate: "2014-08-01", employmentType: "Permanent", experience: "10 years",
    reportingTo: "Vice Principal", highestQualification: "M.Tech Computer Science",
    bEd: false, tet: false, ctet: false,
    bankName: "ICICI", accountNo: "XXXXXX3456", ifscCode: "ICIC0005678", basicSalary: "48000",
    bloodGroupHealth: "B-", medicalCondition: "None",
    status: "Active", initials: "VS",
  },
  {
    id: 6, empId: "T006", name: "Ms. Deepa Pillai", gender: "Female", dob: "1994-06-18",
    bloodGroup: "A-", phone: "+91 98765-43215", alternatePhone: "", email: "deepa.p@school.com",
    address: "34 Sports Colony, Kochi", city: "Kochi", aadhar: "6789 0123 4567", pan: "FGHDT2345I",
    designation: "PRT (Primary Teacher)", department: "Physical Education",
    positions: ["Sports Teacher","NCC Officer","Activity Incharge"],
    classTeacherOf: "",
    classSubjects: [
      { className: "1", subjects: ["Physical Education"] },
      { className: "2", subjects: ["Physical Education"] },
      { className: "3", subjects: ["Physical Education"] },
      { className: "4", subjects: ["Physical Education"] },
      { className: "5", subjects: ["Physical Education"] },
    ],
    joiningDate: "2020-03-01", employmentType: "Permanent", experience: "4 years",
    reportingTo: "Vice Principal", highestQualification: "B.P.Ed",
    bEd: false, tet: true, ctet: false,
    bankName: "Axis Bank", accountNo: "XXXXXX8901", ifscCode: "UTIB0006789", basicSalary: "25000",
    bloodGroupHealth: "A-", medicalCondition: "None",
    status: "Active", initials: "DP",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  return name.split(" ").filter(Boolean).slice(-2).map(n => n[0]).join("").toUpperCase();
}

function getPositionMeta(posVal: string) {
  return ALL_POSITIONS.find(p => p.value === posVal) ?? { value: posVal, label: posVal, icon: Award, color: "bg-gray-100 text-gray-700" };
}

function statusColor(s: Status) {
  if (s === "Active")    return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
  if (s === "On Leave")  return "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300";
  if (s === "Suspended") return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
  return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
}

const AVATAR_COLORS = [
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
];

// ── Sub Components ─────────────────────────────────────────────────────────────

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
        <Icon className="h-3.5 w-3.5 text-foreground/50" />
      </div>
      <div>
        <p className="text-[11px] text-foreground/50 uppercase tracking-wide font-medium">{label}</p>
        <div className="text-sm text-foreground font-medium mt-0.5">{value || "—"}</div>
      </div>
    </div>
  );
}

function SectionHead({ icon: Icon, title }: { icon: React.ElementType; title: string }) {
  return (
    <div className="flex items-center gap-2 mb-4 pb-2 border-b border-border">
      <div className="w-7 h-7 rounded-lg bg-violet-50 dark:bg-violet-900/30 flex items-center justify-center">
        <Icon className="h-4 w-4 text-violet-600" />
      </div>
      <h4 className="font-semibold text-sm text-foreground">{title}</h4>
    </div>
  );
}

// ── Positions Manager (inside dialog) ─────────────────────────────────────────

function PositionsManager({
  positions, classTeacherOf, onChange, onClassTeacherChange,
}: {
  positions: string[];
  classTeacherOf: string;
  onChange: (positions: string[]) => void;
  onClassTeacherChange: (cls: string) => void;
}) {
  const togglePos = (val: string) => {
    if (positions.includes(val)) onChange(positions.filter(p => p !== val));
    else onChange([...positions, val]);
  };
  const isClassTeacher = positions.includes("Class Teacher");

  return (
    <div className="space-y-4">
      <p className="text-xs text-foreground/60 font-medium">Click to assign / remove positions:</p>
      <div className="flex flex-wrap gap-2 max-h-52 overflow-y-auto pr-1">
        {ALL_POSITIONS.map(pos => {
          const selected = positions.includes(pos.value);
          return (
            <button key={pos.value} type="button" onClick={() => togglePos(pos.value)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all
                ${selected ? "border-violet-500 bg-violet-600 text-white" : "border-border bg-background text-foreground/70 hover:border-violet-400"}`}
            >
              <pos.icon className="h-3 w-3" />
              {pos.label}
              {selected && <X className="h-2.5 w-2.5 ml-0.5" />}
            </button>
          );
        })}
      </div>
      {isClassTeacher && (
        <div>
          <label className="block text-xs font-medium text-foreground/70 mb-1.5">
            Class Teacher of (Class – Section)
          </label>
          <select
            value={classTeacherOf}
            onChange={e => onClassTeacherChange(e.target.value)}
            className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-500"
          >
            <option value="">Select class</option>
            {ALL_CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
          </select>
        </div>
      )}
    </div>
  );
}

// ── Class Subject Manager ─────────────────────────────────────────────────────

function ClassSubjectManager({
  entries, onChange,
}: {
  entries: ClassSubjectEntry[];
  onChange: (entries: ClassSubjectEntry[]) => void;
}) {
  const addRow = () => onChange([...entries, { className: "", subjects: [] }]);
  const removeRow = (i: number) => onChange(entries.filter((_, idx) => idx !== i));
  const setClass = (i: number, cls: string) => {
    const arr = [...entries]; arr[i] = { ...arr[i], className: cls }; onChange(arr);
  };
  const toggleSubject = (i: number, sub: string) => {
    const arr = [...entries];
    const subs = arr[i].subjects.includes(sub)
      ? arr[i].subjects.filter(s => s !== sub)
      : [...arr[i].subjects, sub];
    arr[i] = { ...arr[i], subjects: subs }; onChange(arr);
  };

  return (
    <div className="space-y-4">
      {entries.map((entry, i) => (
        <div key={i} className="p-3 rounded-xl border border-border bg-accent/20 space-y-3">
          <div className="flex items-center gap-2">
            <select
              value={entry.className}
              onChange={e => setClass(i, e.target.value)}
              className="flex-1 px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-violet-500/30"
            >
              <option value="">Select Class</option>
              {ALL_CLASSES.map(c => <option key={c} value={c}>Class {c}</option>)}
            </select>
            <button onClick={() => removeRow(i)} className="text-red-400 hover:text-red-600 transition-colors p-1">
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
          {entry.className && (
            <div>
              <p className="text-[11px] text-foreground/50 mb-2 uppercase tracking-wide">Subjects for Class {entry.className}</p>
              <div className="flex flex-wrap gap-2">
                {ALL_SUBJECTS.map(sub => {
                  const sel = entry.subjects.includes(sub);
                  return (
                    <button key={sub} type="button" onClick={() => toggleSubject(i, sub)}
                      className={`px-2.5 py-1 rounded-full text-xs font-medium border transition-all
                        ${sel ? "bg-violet-600 border-violet-600 text-white" : "bg-background border-border text-foreground/60 hover:border-violet-400"}`}
                    >{sub}</button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      ))}
      <button onClick={addRow} className="flex items-center gap-1.5 text-sm text-violet-600 hover:text-violet-800 font-medium">
        <Plus className="h-4 w-4" /> Add Class Assignment
      </button>
    </div>
  );
}

// ── Full Teacher Detail Sheet ─────────────────────────────────────────────────

function TeacherDetailSheet({ teacher, onClose, onEdit }: { teacher: Teacher; onClose: () => void; onEdit: () => void }) {
  const [activeTab, setActiveTab] = useState<"overview"|"professional"|"classes"|"bank"|"health">("overview");
  const tabs = [
    { id: "overview",      label: "Overview",      icon: User      },
    { id: "professional",  label: "Professional",  icon: Briefcase },
    { id: "classes",       label: "Classes",       icon: School    },
    { id: "bank",          label: "Salary & Bank", icon: Banknote  },
    { id: "health",        label: "Health",        icon: Stethoscope },
  ] as const;

  return (
    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
      <DialogHeader>
        <DialogTitle>Teacher Profile</DialogTitle>
      </DialogHeader>

      {/* Hero */}
      <div className="flex items-center gap-5 p-5 rounded-xl bg-gradient-to-r from-violet-50 to-blue-50 dark:from-violet-900/20 dark:to-blue-900/20 border border-violet-100 dark:border-violet-800 mb-2">
        <Avatar className="h-20 w-20 shrink-0">
          <AvatarFallback className={`text-2xl font-bold ${AVATAR_COLORS[teacher.id % AVATAR_COLORS.length]}`}>
            {teacher.initials}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-foreground">{teacher.name}</h2>
          <p className="text-sm text-foreground/60 mt-0.5">{teacher.designation} • {teacher.department}</p>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            <Badge className={statusColor(teacher.status)}>{teacher.status}</Badge>
            <Badge variant="outline" className="font-mono text-xs">{teacher.empId}</Badge>
            <Badge variant="outline" className="text-xs">{teacher.employmentType}</Badge>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <Button size="sm" variant="outline" onClick={onEdit}><Pencil className="h-3.5 w-3.5 mr-1" />Edit</Button>
        </div>
      </div>

      {/* Positions Row */}
      {teacher.positions.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-2">Assigned Positions</p>
          <div className="flex flex-wrap gap-2">
            {teacher.positions.map(pos => {
              const meta = getPositionMeta(pos);
              return (
                <span key={pos} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${meta.color}`}>
                  <meta.icon className="h-3 w-3" />
                  {pos === "Class Teacher" && teacher.classTeacherOf ? `Class Teacher – ${teacher.classTeacherOf}` : meta.label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border mb-5 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 transition-colors
              ${activeTab === tab.id ? "border-violet-600 text-violet-600" : "border-transparent text-foreground/50 hover:text-foreground"}`}
          >
            <tab.icon className="h-3.5 w-3.5" />{tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <InfoRow icon={Users}     label="Full Name"       value={teacher.name} />
          <InfoRow icon={Hash}      label="Employee ID"     value={teacher.empId} />
          <InfoRow icon={Calendar}  label="Date of Birth"   value={teacher.dob} />
          <InfoRow icon={Users}     label="Gender"          value={teacher.gender} />
          <InfoRow icon={Phone}     label="Mobile"          value={teacher.phone} />
          <InfoRow icon={Phone}     label="Alternate Phone" value={teacher.alternatePhone} />
          <InfoRow icon={Mail}      label="Email"           value={teacher.email} />
          <InfoRow icon={Award}     label="Blood Group"     value={teacher.bloodGroup} />
          <InfoRow icon={MapPin}    label="Address"         value={`${teacher.address}, ${teacher.city}`} />
          <InfoRow icon={Shield}    label="Aadhar No."      value={teacher.aadhar} />
          <InfoRow icon={Shield}    label="PAN No."         value={teacher.pan} />
        </div>
      )}

      {activeTab === "professional" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow icon={Briefcase}     label="Designation"         value={teacher.designation} />
            <InfoRow icon={Building2}     label="Department"          value={teacher.department} />
            <InfoRow icon={Calendar}      label="Joining Date"        value={teacher.joiningDate} />
            <InfoRow icon={BadgeCheck}    label="Employment Type"     value={teacher.employmentType} />
            <InfoRow icon={Award}         label="Experience"          value={teacher.experience} />
            <InfoRow icon={Users}         label="Reporting To"        value={teacher.reportingTo} />
          </div>
          <div className="border-t border-border pt-5">
            <SectionHead icon={GraduationCap} title="Qualifications & Certifications" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InfoRow icon={GraduationCap} label="Highest Qualification" value={teacher.highestQualification} />
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="h-3.5 w-3.5 text-foreground/50" />
                </div>
                <div>
                  <p className="text-[11px] text-foreground/50 uppercase tracking-wide font-medium">Teaching Certifications</p>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {teacher.bEd  && <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 text-xs">B.Ed ✓</Badge>}
                    {teacher.tet  && <Badge className="bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 text-xs">TET ✓</Badge>}
                    {teacher.ctet && <Badge className="bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300 text-xs">CTET ✓</Badge>}
                    {!teacher.bEd && !teacher.tet && !teacher.ctet && <span className="text-sm text-foreground/50">None on record</span>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "classes" && (
        <div className="space-y-4">
          {teacher.classTeacherOf && (
            <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
              <School className="h-5 w-5 text-blue-600 shrink-0" />
              <div>
                <p className="text-xs text-blue-600 font-semibold uppercase tracking-wide">Class Teacher of</p>
                <p className="text-base font-bold text-blue-800 dark:text-blue-200 mt-0.5">Class {teacher.classTeacherOf}</p>
              </div>
            </div>
          )}
          {teacher.classSubjects.length === 0 ? (
            <div className="text-center py-10 text-foreground/40 text-sm">No class-subject assignments recorded.</div>
          ) : (
            <div className="space-y-3">
              {teacher.classSubjects.map((cs, i) => (
                <div key={i} className="p-4 rounded-xl border border-border bg-accent/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-100 dark:bg-violet-900/30 flex items-center justify-center">
                      <School className="h-4 w-4 text-violet-600" />
                    </div>
                    <span className="font-semibold text-foreground">Class {cs.className}</span>
                    {teacher.classTeacherOf === cs.className && (
                      <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 text-xs ml-1">Class Teacher</Badge>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cs.subjects.map(sub => (
                      <span key={sub} className="px-3 py-1 rounded-full text-xs font-medium bg-violet-50 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-700">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "bank" && (
        <div className="space-y-5">
          <SectionHead icon={Banknote} title="Bank Account Details" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow icon={Building2} label="Bank Name"     value={teacher.bankName} />
            <InfoRow icon={Hash}      label="Account No."  value={teacher.accountNo} />
            <InfoRow icon={Hash}      label="IFSC Code"    value={teacher.ifscCode} />
            <InfoRow icon={Banknote}  label="Basic Salary" value={`₹${Number(teacher.basicSalary).toLocaleString("en-IN")}/month`} />
          </div>
        </div>
      )}

      {activeTab === "health" && (
        <div className="space-y-5">
          <SectionHead icon={Stethoscope} title="Health Information" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <InfoRow icon={Award}       label="Blood Group"        value={teacher.bloodGroupHealth} />
            <InfoRow icon={Stethoscope} label="Medical Condition"  value={teacher.medicalCondition || "None"} />
          </div>
        </div>
      )}
    </DialogContent>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────

export function PrincipalTeachers() {
  const [teachers, setTeachers]           = useState<Teacher[]>(initialTeachers);
  const [searchQuery, setSearchQuery]     = useState("");
  const [filterDept, setFilterDept]       = useState("All");
  const [filterStatus, setFilterStatus]   = useState("All");
  const [filterPosition, setFilterPosition] = useState("All");
  const [viewTeacher, setViewTeacher]     = useState<Teacher | null>(null);
  const [editTeacher, setEditTeacher]     = useState<Teacher | null>(null);
  const [positionTeacher, setPositionTeacher] = useState<Teacher | null>(null);
  const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);
  const [expandedId, setExpandedId]       = useState<number | null>(null);

  // ── Filter ──────────────────────────────────────────────────────────────────
  const filtered = teachers.filter(t => {
    const q = searchQuery.toLowerCase();
    const matchSearch = t.name.toLowerCase().includes(q) || t.empId.toLowerCase().includes(q) || t.email.toLowerCase().includes(q);
    const matchDept   = filterDept     === "All" || t.department === filterDept;
    const matchStatus = filterStatus   === "All" || t.status     === filterStatus;
    const matchPos    = filterPosition === "All" || t.positions.includes(filterPosition);
    return matchSearch && matchDept && matchStatus && matchPos;
  });

  // ── Stats ───────────────────────────────────────────────────────────────────
  const stats = {
    total:     teachers.length,
    active:    teachers.filter(t => t.status === "Active").length,
    onLeave:   teachers.filter(t => t.status === "On Leave").length,
    depts:     new Set(teachers.map(t => t.department)).size,
    classTeachers: teachers.filter(t => t.positions.includes("Class Teacher")).length,
    hods:      teachers.filter(t => t.positions.includes("Head of Department (HOD)")).length,
  };

  // ── Edit save ───────────────────────────────────────────────────────────────
  const handleSaveEdit = () => {
    if (!editTeacher) return;
    setTeachers(prev => prev.map(t => t.id === editTeacher.id
      ? { ...editTeacher, initials: getInitials(editTeacher.name) } : t));
    setEditTeacher(null);
    toast.success("Teacher profile updated!");
  };

  // ── Save positions ──────────────────────────────────────────────────────────
  const handleSavePositions = () => {
    if (!positionTeacher) return;
    setTeachers(prev => prev.map(t => t.id === positionTeacher.id ? positionTeacher : t));
    setPositionTeacher(null);
    toast.success("Positions updated!");
  };

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = () => {
    if (!deleteTeacher) return;
    setTeachers(prev => prev.filter(t => t.id !== deleteTeacher.id));
    setDeleteTeacher(null);
    toast.success(`${deleteTeacher.name} removed.`);
  };

  // ─── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="space-y-6 p-6">

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Teachers</h1>
          <p className="text-sm text-foreground/60 mt-1">Manage all teaching staff, positions & class assignments</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => toast.info("Navigate to Add Teacher form")}>
          <Plus className="h-4 w-4 mr-2" /> Add Teacher
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label: "Total",          value: stats.total,        icon: Users,      color: "text-foreground"   },
          { label: "Active",         value: stats.active,       icon: UserCheck,  color: "text-green-600"    },
          { label: "On Leave",       value: stats.onLeave,      icon: AlertTriangle, color: "text-orange-500" },
          { label: "Departments",    value: stats.depts,        icon: Building2,  color: "text-blue-600"     },
          { label: "Class Teachers", value: stats.classTeachers,icon: School,     color: "text-violet-600"   },
          { label: "HODs",           value: stats.hods,         icon: Crown,      color: "text-amber-600"    },
        ].map(s => (
          <Card key={s.label}>
            <CardContent className="p-3 flex items-center gap-2.5">
              <s.icon className={`h-7 w-7 ${s.color} opacity-80 shrink-0`} />
              <div>
                <p className="text-[11px] text-foreground/50">{s.label}</p>
                <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input placeholder="Search name, ID, email…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={filterDept} onValueChange={setFilterDept}>
              <SelectTrigger><SelectValue placeholder="All Departments" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Departments</SelectItem>
                {DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger><SelectValue placeholder="All Status" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Status</SelectItem>
                {STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={filterPosition} onValueChange={setFilterPosition}>
              <SelectTrigger><SelectValue placeholder="All Positions" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Positions</SelectItem>
                {ALL_POSITIONS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Teacher Cards */}
      <Card>
        <CardHeader>
          <CardTitle>Teaching Staff ({filtered.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {filtered.length === 0 && (
            <div className="text-center py-12 text-foreground/40 text-sm">No teachers found. Try adjusting filters.</div>
          )}

          {filtered.map(teacher => {
            const isExpanded = expandedId === teacher.id;
            const avatarCls  = AVATAR_COLORS[teacher.id % AVATAR_COLORS.length];
            return (
              <div key={teacher.id} className="border border-border rounded-xl overflow-hidden transition-all">

                {/* Main Row */}
                <div className="flex items-center gap-4 p-4 hover:bg-accent/30 transition-colors">
                  <Avatar className="h-11 w-11 shrink-0">
                    <AvatarFallback className={`font-bold ${avatarCls}`}>{teacher.initials}</AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-foreground">{teacher.name}</span>
                      <Badge variant="outline" className="font-mono text-xs">{teacher.empId}</Badge>
                      <Badge className={statusColor(teacher.status)}>{teacher.status}</Badge>
                    </div>
                    <p className="text-sm text-foreground/60 mt-0.5 truncate">
                      {teacher.designation} • {teacher.department} • {teacher.experience} exp
                    </p>
                    {/* Positions preview */}
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {teacher.positions.slice(0, 3).map(pos => {
                        const meta = getPositionMeta(pos);
                        return (
                          <span key={pos} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold ${meta.color}`}>
                            <meta.icon className="h-2.5 w-2.5" />
                            {pos === "Class Teacher" && teacher.classTeacherOf ? `CT – ${teacher.classTeacherOf}` : pos}
                          </span>
                        );
                      })}
                      {teacher.positions.length > 3 && (
                        <span className="px-2 py-0.5 rounded-full text-[11px] bg-accent text-foreground/60">+{teacher.positions.length - 3} more</span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-1 shrink-0">
                    <Button variant="ghost" size="icon" title="View full profile" onClick={() => setViewTeacher(teacher)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Manage positions" onClick={() => setPositionTeacher({ ...teacher })}>
                      <Crown className="h-4 w-4 text-amber-500" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Edit teacher" onClick={() => setEditTeacher({ ...teacher })}>
                      <Pencil className="h-4 w-4 text-violet-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" title="Remove" onClick={() => setDeleteTeacher(teacher)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Expand class details" onClick={() => setExpandedId(isExpanded ? null : teacher.id)}>
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {/* Expanded: Class-Subject Details */}
                {isExpanded && (
                  <div className="border-t border-border bg-accent/20 px-4 py-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Mail className="h-3.5 w-3.5 text-foreground/40" />
                        <span className="text-foreground/70 truncate">{teacher.email}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-3.5 w-3.5 text-foreground/40" />
                        <span className="text-foreground/70">{teacher.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3.5 w-3.5 text-foreground/40" />
                        <span className="text-foreground/70">{teacher.city}</span>
                      </div>
                    </div>

                    {teacher.classTeacherOf && (
                      <div className="mb-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 text-sm text-blue-700 dark:text-blue-300">
                        <School className="h-4 w-4" />
                        <span className="font-medium">Class Teacher of Class {teacher.classTeacherOf}</span>
                      </div>
                    )}

                    {teacher.classSubjects.length > 0 ? (
                      <div>
                        <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-2">Classes & Subjects</p>
                        <div className="flex flex-wrap gap-2">
                          {teacher.classSubjects.map((cs, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background text-sm">
                              <span className="font-semibold text-foreground">Cls {cs.className}:</span>
                              <span className="text-foreground/70">{cs.subjects.join(", ")}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm text-foreground/40 italic">No class assignments yet.</p>
                    )}

                    <div className="flex gap-2 mt-3 pt-3 border-t border-border">
                      {[teacher.bEd && "B.Ed", teacher.tet && "TET", teacher.ctet && "CTET"].filter(Boolean).map(cert => (
                        <span key={cert as string} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
                          <Check className="h-2.5 w-2.5" />{cert}
                        </span>
                      ))}
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] bg-accent text-foreground/60">
                        {teacher.highestQualification}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* ── View Full Profile Dialog ─────────────────────────────────────────── */}
      <Dialog open={!!viewTeacher} onOpenChange={() => setViewTeacher(null)}>
        {viewTeacher && (
          <TeacherDetailSheet
            teacher={viewTeacher}
            onClose={() => setViewTeacher(null)}
            onEdit={() => { setEditTeacher({ ...viewTeacher }); setViewTeacher(null); }}
          />
        )}
      </Dialog>

      {/* ── Manage Positions Dialog ──────────────────────────────────────────── */}
      <Dialog open={!!positionTeacher} onOpenChange={open => { if (!open) setPositionTeacher(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-amber-500" />
              Manage Positions — {positionTeacher?.name}
            </DialogTitle>
          </DialogHeader>
          {positionTeacher && (
            <div className="space-y-6 py-2">
              {/* Current positions preview */}
              {positionTeacher.positions.length > 0 && (
                <div>
                  <p className="text-xs text-foreground/50 uppercase tracking-wide font-medium mb-2">Currently Assigned</p>
                  <div className="flex flex-wrap gap-2">
                    {positionTeacher.positions.map(pos => {
                      const meta = getPositionMeta(pos);
                      return (
                        <span key={pos} className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${meta.color}`}>
                          <meta.icon className="h-3 w-3" />{meta.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground mb-3">Assign / Remove Positions</p>
                <PositionsManager
                  positions={positionTeacher.positions}
                  classTeacherOf={positionTeacher.classTeacherOf}
                  onChange={positions => setPositionTeacher(p => p ? { ...p, positions } : p)}
                  onClassTeacherChange={cls => setPositionTeacher(p => p ? { ...p, classTeacherOf: cls } : p)}
                />
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground mb-3">Class & Subject Assignments</p>
                <ClassSubjectManager
                  entries={positionTeacher.classSubjects}
                  onChange={entries => setPositionTeacher(p => p ? { ...p, classSubjects: entries } : p)}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setPositionTeacher(null)}>Cancel</Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleSavePositions}>
              <Check className="h-4 w-4 mr-2" /> Save Positions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Edit Dialog ──────────────────────────────────────────────────────── */}
      <Dialog open={!!editTeacher} onOpenChange={open => { if (!open) setEditTeacher(null); }}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader><DialogTitle>Edit Teacher — {editTeacher?.name}</DialogTitle></DialogHeader>
          {editTeacher && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
              {([
                { label: "Full Name",    key: "name",        type: "text"   },
                { label: "Employee ID", key: "empId",       type: "text"   },
                { label: "Email",       key: "email",       type: "email"  },
                { label: "Phone",       key: "phone",       type: "text"   },
                { label: "Date of Birth",key:"dob",         type: "date"   },
                { label: "City",        key: "city",        type: "text"   },
                { label: "Experience",  key: "experience",  type: "text"   },
                { label: "Reporting To",key: "reportingTo", type: "text"   },
                { label: "Highest Qualification", key: "highestQualification", type: "text" },
                { label: "Basic Salary (₹)", key: "basicSalary", type: "number" },
              ] as { label: string; key: keyof Teacher; type: string }[]).map(({ label, key, type }) => (
                <div key={key} className={key === "name" || key === "email" ? "col-span-2" : ""}>
                  <Label className="mb-1.5 block text-xs text-foreground/70">{label}</Label>
                  <Input type={type} value={(editTeacher as any)[key] ?? ""}
                    onChange={e => setEditTeacher(t => t ? { ...t, [key]: e.target.value } : t)} />
                </div>
              ))}
              <div>
                <Label className="mb-1.5 block text-xs text-foreground/70">Designation</Label>
                <Select value={editTeacher.designation} onValueChange={v => setEditTeacher(t => t ? { ...t, designation: v } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{DESIGNATIONS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs text-foreground/70">Department</Label>
                <Select value={editTeacher.department} onValueChange={v => setEditTeacher(t => t ? { ...t, department: v } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{DEPARTMENTS.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs text-foreground/70">Employment Type</Label>
                <Select value={editTeacher.employmentType} onValueChange={v => setEditTeacher(t => t ? { ...t, employmentType: v as EmploymentType } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{EMP_TYPES.map(e => <SelectItem key={e} value={e}>{e}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs text-foreground/70">Status</Label>
                <Select value={editTeacher.status} onValueChange={v => setEditTeacher(t => t ? { ...t, status: v as Status } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{STATUS_OPTIONS.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs text-foreground/70">Blood Group</Label>
                <Select value={editTeacher.bloodGroup} onValueChange={v => setEditTeacher(t => t ? { ...t, bloodGroup: v, bloodGroupHealth: v } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{BLOOD_GROUPS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1.5 block text-xs text-foreground/70">Gender</Label>
                <Select value={editTeacher.gender} onValueChange={v => setEditTeacher(t => t ? { ...t, gender: v } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Male">Male</SelectItem><SelectItem value="Female">Female</SelectItem><SelectItem value="Other">Other</SelectItem></SelectContent>
                </Select>
              </div>
              {/* Certifications */}
              <div className="col-span-2">
                <Label className="mb-2 block text-xs text-foreground/70">Teaching Certifications</Label>
                <div className="flex gap-4">
                  {([["bEd","B.Ed"],["tet","TET"],["ctet","CTET"]] as [keyof Teacher, string][]).map(([key, label]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer">
                      <div
                        onClick={() => setEditTeacher(t => t ? { ...t, [key]: !t[key] } : t)}
                        className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${(editTeacher as any)[key] ? "bg-violet-600 border-violet-600" : "border-border"}`}
                      >
                        {(editTeacher as any)[key] && <Check className="h-2.5 w-2.5 text-white" />}
                      </div>
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTeacher(null)}>Cancel</Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ── Delete Dialog ─────────────────────────────────────────────────────── */}
      <Dialog open={!!deleteTeacher} onOpenChange={open => { if (!open) setDeleteTeacher(null); }}>
        <DialogContent className="max-w-sm">
          <DialogHeader><DialogTitle>Remove Teacher</DialogTitle></DialogHeader>
          <p className="text-sm text-foreground/70 py-2">
            Are you sure you want to remove <strong className="text-foreground">{deleteTeacher?.name}</strong>?
            All their class assignments and positions will also be removed. This cannot be undone.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTeacher(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Remove Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
