import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Search, Eye, Mail, Phone, Plus, Pencil, Trash2, GraduationCap, TrendingUp, AlertTriangle, Users } from "lucide-react";

const classes = ["All Classes", "Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B"];
type Performance = "Excellent" | "Good" | "Average" | "Poor";
type Student = { id: number; rollNo: string; name: string; class: string; email: string; phone: string; attendance: number; performance: Performance; initials: string; };

const initialStudents: Student[] = [
  { id: 1, rollNo: "001", name: "Alice Johnson",  class: "Class 10-A", email: "alice.j@school.com",   phone: "+1 234-567-8901", attendance: 95, performance: "Excellent", initials: "AJ" },
  { id: 2, rollNo: "002", name: "Bob Smith",       class: "Class 10-A", email: "bob.s@school.com",     phone: "+1 234-567-8902", attendance: 88, performance: "Good",      initials: "BS" },
  { id: 3, rollNo: "003", name: "Charlie Brown",   class: "Class 10-A", email: "charlie.b@school.com", phone: "+1 234-567-8903", attendance: 92, performance: "Good",      initials: "CB" },
  { id: 4, rollNo: "004", name: "Diana Prince",    class: "Class 10-A", email: "diana.p@school.com",   phone: "+1 234-567-8904", attendance: 98, performance: "Excellent", initials: "DP" },
  { id: 5, rollNo: "005", name: "Ethan Hunt",      class: "Class 10-B", email: "ethan.h@school.com",   phone: "+1 234-567-8905", attendance: 85, performance: "Average",   initials: "EH" },
  { id: 6, rollNo: "006", name: "Fiona Green",     class: "Class 10-B", email: "fiona.g@school.com",   phone: "+1 234-567-8906", attendance: 91, performance: "Good",      initials: "FG" },
  { id: 7, rollNo: "007", name: "George Wilson",   class: "Class 9-A",  email: "george.w@school.com",  phone: "+1 234-567-8907", attendance: 78, performance: "Average",   initials: "GW" },
  { id: 8, rollNo: "008", name: "Hannah Lee",      class: "Class 9-A",  email: "hannah.l@school.com",  phone: "+1 234-567-8908", attendance: 96, performance: "Excellent", initials: "HL" },
];

const emptyForm = { name: "", rollNo: "", class: "Class 10-A", email: "", phone: "", attendance: 90, performance: "Good" as Performance };

export function PrincipalStudents() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewStudent, setViewStudent] = useState<Student | null>(null);
  const [editStudent, setEditStudent] = useState<Student | null>(null);
  const [deleteStudent, setDeleteStudent] = useState<Student | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = students.filter((s) => {
    const classMatch = selectedClass === "All Classes" || s.class === selectedClass;
    const search = searchQuery.toLowerCase();
    return classMatch && (s.name.toLowerCase().includes(search) || s.rollNo.includes(search));
  });

  const getPerformanceBadge = (p: string) => {
    const map: Record<string, string> = {
      Excellent: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
      Good:      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
      Average:   "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300",
      Poor:      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300",
    };
    return map[p] ?? "bg-gray-100 text-gray-800";
  };

  const getAttendanceColor = (a: number) => a >= 90 ? "text-green-600" : a >= 75 ? "text-yellow-600" : "text-red-600";
  const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2);

  const handleAdd = () => {
    setStudents((prev) => [...prev, { ...form, id: Date.now(), initials: getInitials(form.name), attendance: Number(form.attendance) }]);
    setAddOpen(false);
    setForm(emptyForm);
  };

  const handleSaveEdit = () => {
    if (!editStudent) return;
    setStudents((prev) => prev.map((s) => s.id === editStudent.id ? { ...editStudent, initials: getInitials(editStudent.name) } : s));
    setEditStudent(null);
  };

  const handleDelete = () => {
    if (!deleteStudent) return;
    setStudents((prev) => prev.filter((s) => s.id !== deleteStudent.id));
    setDeleteStudent(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Students</h1>
          <p className="text-sm text-foreground/60 mt-1">Manage all students across every class</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Student
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Students",  value: students.length, icon: Users,         color: "text-foreground" },
          { label: "Excellent",       value: students.filter(s => s.performance === "Excellent").length, icon: TrendingUp,    color: "text-green-600" },
          { label: "Avg. Attendance", value: `${Math.round(students.reduce((a, s) => a + s.attendance, 0) / students.length)}%`, icon: GraduationCap, color: "text-blue-600" },
          { label: "Need Attention",  value: students.filter(s => s.attendance < 85 || s.performance === "Poor").length, icon: AlertTriangle,  color: "text-orange-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
              <div>
                <p className="text-xs text-foreground/60">{stat.label}</p>
                <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input placeholder="Search by name or roll no…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Student List ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/40 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Avatar>
                    <AvatarFallback className="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200 font-semibold">{student.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground">{student.name}</h4>
                      <Badge variant="outline" className="font-mono text-xs">{student.rollNo}</Badge>
                    </div>
                    <p className="text-sm text-foreground/60">{student.class}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-foreground/50">Attendance</p>
                    <p className={`text-sm font-semibold ${getAttendanceColor(student.attendance)}`}>{student.attendance}%</p>
                  </div>
                  <Badge className={getPerformanceBadge(student.performance)}>{student.performance}</Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setViewStudent(student)}><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setEditStudent({ ...student })}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteStudent(student)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-center py-12 text-foreground/40">No students found</div>}
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!viewStudent} onOpenChange={() => setViewStudent(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Student Details</DialogTitle></DialogHeader>
          {viewStudent && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200">{viewStudent.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{viewStudent.name}</h3>
                  <p className="text-sm text-foreground/60">{viewStudent.class} • Roll No: {viewStudent.rollNo}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div><p className="text-xs text-foreground/50">Email</p><p className="flex items-center gap-2 mt-1 text-sm"><Mail className="h-4 w-4 text-foreground/40" />{viewStudent.email}</p></div>
                <div><p className="text-xs text-foreground/50">Phone</p><p className="flex items-center gap-2 mt-1 text-sm"><Phone className="h-4 w-4 text-foreground/40" />{viewStudent.phone}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div><p className="text-xs text-foreground/50">Attendance</p><p className={`text-2xl font-semibold mt-1 ${getAttendanceColor(viewStudent.attendance)}`}>{viewStudent.attendance}%</p></div>
                <div><p className="text-xs text-foreground/50">Performance</p><Badge className={`${getPerformanceBadge(viewStudent.performance)} mt-2`}>{viewStudent.performance}</Badge></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Student</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[{ label: "Full Name", key: "name", type: "text" }, { label: "Roll No", key: "rollNo", type: "text" }, { label: "Email", key: "email", type: "email" }, { label: "Phone", key: "phone", type: "text" }, { label: "Attendance %", key: "attendance", type: "number" }].map(({ label, key, type }) => (
              <div key={key} className={key === "name" || key === "email" ? "col-span-2" : ""}>
                <Label className="mb-1 block">{label}</Label>
                <Input type={type} value={(form as any)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
              </div>
            ))}
            <div>
              <Label className="mb-1 block">Class</Label>
              <Select value={form.class} onValueChange={(v) => setForm((f) => ({ ...f, class: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{classes.filter(c => c !== "All Classes").map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1 block">Performance</Label>
              <Select value={form.performance} onValueChange={(v) => setForm((f) => ({ ...f, performance: v as Performance }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{(["Excellent","Good","Average","Poor"] as Performance[]).map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleAdd} disabled={!form.name || !form.rollNo}>Add Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editStudent} onOpenChange={() => setEditStudent(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Student</DialogTitle></DialogHeader>
          {editStudent && (
            <div className="grid grid-cols-2 gap-4 py-2">
              {[{ label: "Full Name", key: "name", type: "text" }, { label: "Roll No", key: "rollNo", type: "text" }, { label: "Email", key: "email", type: "email" }, { label: "Phone", key: "phone", type: "text" }, { label: "Attendance %", key: "attendance", type: "number" }].map(({ label, key, type }) => (
                <div key={key} className={key === "name" || key === "email" ? "col-span-2" : ""}>
                  <Label className="mb-1 block">{label}</Label>
                  <Input type={type} value={(editStudent as any)[key]} onChange={(e) => setEditStudent((s) => s ? { ...s, [key]: e.target.value } : s)} />
                </div>
              ))}
              <div>
                <Label className="mb-1 block">Class</Label>
                <Select value={editStudent.class} onValueChange={(v) => setEditStudent((s) => s ? { ...s, class: v } : s)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{classes.filter(c => c !== "All Classes").map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Performance</Label>
                <Select value={editStudent.performance} onValueChange={(v) => setEditStudent((s) => s ? { ...s, performance: v as Performance } : s)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{(["Excellent","Good","Average","Poor"] as Performance[]).map((p) => <SelectItem key={p} value={p}>{p}</SelectItem>)}</SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditStudent(null)}>Cancel</Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteStudent} onOpenChange={() => setDeleteStudent(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Remove Student</DialogTitle></DialogHeader>
          <p className="text-sm text-foreground/70 py-2">Are you sure you want to remove <strong>{deleteStudent?.name}</strong>? This cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteStudent(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Remove Student</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}