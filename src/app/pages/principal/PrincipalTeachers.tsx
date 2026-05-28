import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Search, Plus, Pencil, Trash2, Eye, Mail, Phone, Users, BookOpen, Award, UserCheck } from "lucide-react";

const departments = ["All Departments", "Mathematics", "Science", "English", "History", "Computer Science", "Physical Education"];
const subjects = ["Mathematics", "Science", "English", "History", "Computer Science", "Physical Education"];
const assignedClasses = ["Class 9-A", "Class 9-B", "Class 10-A", "Class 10-B"];

type Status = "Active" | "On Leave";
type Teacher = { id: number; empId: string; name: string; department: string; subject: string; assignedClass: string; email: string; phone: string; experience: number; status: Status; initials: string; };

const initialTeachers: Teacher[] = [
  { id: 1, empId: "T001", name: "Mr. Rajesh Kumar",  department: "Mathematics",       subject: "Mathematics",       assignedClass: "Class 10-A", email: "rajesh.k@school.com",  phone: "+91 98765-43210", experience: 12, status: "Active",   initials: "RK" },
  { id: 2, empId: "T002", name: "Ms. Priya Sharma",  department: "Science",           subject: "Science",           assignedClass: "Class 10-B", email: "priya.s@school.com",   phone: "+91 98765-43211", experience: 8,  status: "Active",   initials: "PS" },
  { id: 3, empId: "T003", name: "Mr. Amit Verma",    department: "English",           subject: "English",           assignedClass: "Class 9-A",  email: "amit.v@school.com",    phone: "+91 98765-43212", experience: 15, status: "Active",   initials: "AV" },
  { id: 4, empId: "T004", name: "Ms. Neha Joshi",    department: "History",           subject: "History",           assignedClass: "Class 9-B",  email: "neha.j@school.com",    phone: "+91 98765-43213", experience: 6,  status: "On Leave", initials: "NJ" },
  { id: 5, empId: "T005", name: "Mr. Vikram Singh",  department: "Computer Science",  subject: "Computer Science",  assignedClass: "Class 10-A", email: "vikram.s@school.com",  phone: "+91 98765-43214", experience: 10, status: "Active",   initials: "VS" },
  { id: 6, empId: "T006", name: "Ms. Deepa Pillai",  department: "Physical Education",subject: "Physical Education",assignedClass: "Class 9-A",  email: "deepa.p@school.com",   phone: "+91 98765-43215", experience: 4,  status: "Active",   initials: "DP" },
];

const emptyForm = { name: "", empId: "", department: "Mathematics", subject: "Mathematics", assignedClass: "Class 10-A", email: "", phone: "", experience: 1, status: "Active" as Status };

export function PrincipalTeachers() {
  const [teachers, setTeachers] = useState<Teacher[]>(initialTeachers);
  const [selectedDept, setSelectedDept] = useState("All Departments");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewTeacher, setViewTeacher] = useState<Teacher | null>(null);
  const [editTeacher, setEditTeacher] = useState<Teacher | null>(null);
  const [deleteTeacher, setDeleteTeacher] = useState<Teacher | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered = teachers.filter((t) => {
    const deptMatch = selectedDept === "All Departments" || t.department === selectedDept;
    const s = searchQuery.toLowerCase();
    return deptMatch && (t.name.toLowerCase().includes(s) || t.empId.toLowerCase().includes(s) || t.subject.toLowerCase().includes(s));
  });

  const getInitials = (name: string) => name.split(" ").filter(Boolean).slice(-2).map(n => n[0]).join("").toUpperCase();

  const handleAdd = () => {
    setTeachers((prev) => [...prev, { ...form, id: Date.now(), initials: getInitials(form.name), experience: Number(form.experience) }]);
    setAddOpen(false); setForm(emptyForm);
  };
  const handleSaveEdit = () => {
    if (!editTeacher) return;
    setTeachers((prev) => prev.map((t) => t.id === editTeacher.id ? { ...editTeacher, initials: getInitials(editTeacher.name) } : t));
    setEditTeacher(null);
  };
  const handleDelete = () => {
    if (!deleteTeacher) return;
    setTeachers((prev) => prev.filter((t) => t.id !== deleteTeacher.id));
    setDeleteTeacher(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Teachers</h1>
          <p className="text-sm text-foreground/60 mt-1">Manage all teaching staff</p>
        </div>
        <Button className="bg-violet-600 hover:bg-violet-700" onClick={() => setAddOpen(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add Teacher
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Teachers",  value: teachers.length,                                        icon: Users,     color: "text-foreground" },
          { label: "Active",          value: teachers.filter(t => t.status === "Active").length,     icon: UserCheck, color: "text-green-600"  },
          { label: "On Leave",        value: teachers.filter(t => t.status === "On Leave").length,   icon: Award,     color: "text-orange-600" },
          { label: "Departments",     value: new Set(teachers.map(t => t.department)).size,          icon: BookOpen,  color: "text-blue-600"   },
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

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input placeholder="Search by name, ID or subject…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{departments.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* List */}
      <Card>
        <CardHeader><CardTitle>Teaching Staff ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((teacher) => (
              <div key={teacher.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/40 transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <Avatar>
                    <AvatarFallback className="bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200 font-semibold">{teacher.initials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-foreground">{teacher.name}</h4>
                      <Badge variant="outline" className="font-mono text-xs">{teacher.empId}</Badge>
                    </div>
                    <p className="text-sm text-foreground/60">{teacher.subject} • {teacher.assignedClass} • {teacher.experience} yrs exp</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <Badge className={teacher.status === "Active" ? "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300" : "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300"}>
                    {teacher.status}
                  </Badge>
                  <div className="flex gap-1">
                    <Button variant="ghost" size="icon" onClick={() => setViewTeacher(teacher)}><Eye className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" onClick={() => setEditTeacher({ ...teacher })}><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" onClick={() => setDeleteTeacher(teacher)}><Trash2 className="h-4 w-4" /></Button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-center py-12 text-foreground/40">No teachers found</div>}
          </div>
        </CardContent>
      </Card>

      {/* View Dialog */}
      <Dialog open={!!viewTeacher} onOpenChange={() => setViewTeacher(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Teacher Details</DialogTitle></DialogHeader>
          {viewTeacher && (
            <div className="space-y-4 py-2">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-200">{viewTeacher.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{viewTeacher.name}</h3>
                  <p className="text-sm text-foreground/60">{viewTeacher.department} • {viewTeacher.empId}</p>
                  <Badge className={viewTeacher.status === "Active" ? "bg-green-100 text-green-800 mt-1" : "bg-orange-100 text-orange-800 mt-1"}>{viewTeacher.status}</Badge>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div><p className="text-xs text-foreground/50">Email</p><p className="flex items-center gap-2 mt-1 text-sm"><Mail className="h-4 w-4 text-foreground/40" />{viewTeacher.email}</p></div>
                <div><p className="text-xs text-foreground/50">Phone</p><p className="flex items-center gap-2 mt-1 text-sm"><Phone className="h-4 w-4 text-foreground/40" />{viewTeacher.phone}</p></div>
                <div><p className="text-xs text-foreground/50">Subject</p><p className="font-medium mt-1">{viewTeacher.subject}</p></div>
                <div><p className="text-xs text-foreground/50">Assigned Class</p><p className="font-medium mt-1">{viewTeacher.assignedClass}</p></div>
                <div><p className="text-xs text-foreground/50">Experience</p><p className="font-medium mt-1">{viewTeacher.experience} years</p></div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Add Dialog */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Add New Teacher</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            {[{ label: "Full Name", key: "name", type: "text" }, { label: "Employee ID", key: "empId", type: "text" }, { label: "Email", key: "email", type: "email" }, { label: "Phone", key: "phone", type: "text" }, { label: "Experience (years)", key: "experience", type: "number" }].map(({ label, key, type }) => (
              <div key={key} className={key === "name" || key === "email" ? "col-span-2" : ""}>
                <Label className="mb-1 block">{label}</Label>
                <Input type={type} value={(form as any)[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} />
              </div>
            ))}
            <div>
              <Label className="mb-1 block">Subject</Label>
              <Select value={form.subject} onValueChange={(v) => setForm((f) => ({ ...f, subject: v, department: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1 block">Assigned Class</Label>
              <Select value={form.assignedClass} onValueChange={(v) => setForm((f) => ({ ...f, assignedClass: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{assignedClasses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div>
              <Label className="mb-1 block">Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm((f) => ({ ...f, status: v as Status }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="On Leave">On Leave</SelectItem></SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleAdd} disabled={!form.name || !form.empId}>Add Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={!!editTeacher} onOpenChange={() => setEditTeacher(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Edit Teacher</DialogTitle></DialogHeader>
          {editTeacher && (
            <div className="grid grid-cols-2 gap-4 py-2">
              {[{ label: "Full Name", key: "name", type: "text" }, { label: "Employee ID", key: "empId", type: "text" }, { label: "Email", key: "email", type: "email" }, { label: "Phone", key: "phone", type: "text" }, { label: "Experience (years)", key: "experience", type: "number" }].map(({ label, key, type }) => (
                <div key={key} className={key === "name" || key === "email" ? "col-span-2" : ""}>
                  <Label className="mb-1 block">{label}</Label>
                  <Input type={type} value={(editTeacher as any)[key]} onChange={(e) => setEditTeacher((t) => t ? { ...t, [key]: e.target.value } : t)} />
                </div>
              ))}
              <div>
                <Label className="mb-1 block">Subject</Label>
                <Select value={editTeacher.subject} onValueChange={(v) => setEditTeacher((t) => t ? { ...t, subject: v, department: v } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{subjects.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Assigned Class</Label>
                <Select value={editTeacher.assignedClass} onValueChange={(v) => setEditTeacher((t) => t ? { ...t, assignedClass: v } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>{assignedClasses.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <div>
                <Label className="mb-1 block">Status</Label>
                <Select value={editTeacher.status} onValueChange={(v) => setEditTeacher((t) => t ? { ...t, status: v as Status } : t)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent><SelectItem value="Active">Active</SelectItem><SelectItem value="On Leave">On Leave</SelectItem></SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditTeacher(null)}>Cancel</Button>
            <Button className="bg-violet-600 hover:bg-violet-700" onClick={handleSaveEdit}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={!!deleteTeacher} onOpenChange={() => setDeleteTeacher(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Remove Teacher</DialogTitle></DialogHeader>
          <p className="text-sm text-foreground/70 py-2">Are you sure you want to remove <strong>{deleteTeacher?.name}</strong>? This cannot be undone.</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTeacher(null)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDelete}>Remove Teacher</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}