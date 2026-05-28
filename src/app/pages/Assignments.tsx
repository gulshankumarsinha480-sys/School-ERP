import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { Badge } from "../components/ui/badge";
import { Plus, CalendarIcon, Eye, Trash2, X } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

const classes = ["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B", "All Classes"];
const allSubjects = ["Mathematics", "Physics", "Chemistry", "English"];

// Teacher's subjects (Change as needed)
const mySubjects = ["Mathematics", "Physics", "Chemistry"];

type Assignment = {
  id: number;
  title: string;
  subject: string;
  class: string;
  description: string;
  dueDate: string;
  totalMarks: number;
  submissions: number;
  totalStudents: number;
  status: "active" | "closed" | "upcoming";
};

const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Quadratic Equations Practice",
    subject: "Mathematics",
    class: "Class 10-A",
    description: "Solve problems 1-20 from Chapter 5",
    dueDate: "2026-05-28",
    totalMarks: 50,
    submissions: 23,
    totalStudents: 28,
    status: "active"
  },
  {
    id: 2,
    title: "Newton's Laws Essay",
    subject: "Physics",
    class: "Class 10-A",
    description: "Write a detailed essay on Newton's three laws",
    dueDate: "2026-05-26",
    totalMarks: 25,
    submissions: 28,
    totalStudents: 28,
    status: "active"
  },
  {
    id: 3,
    title: "Algebra Word Problems",
    subject: "Mathematics",
    class: "Class 9-A",
    dueDate: "2026-06-02",
    description: "Complete worksheet on word problems",
    totalMarks: 30,
    submissions: 0,
    totalStudents: 25,
    status: "upcoming"
  },
];

export function Assignments() {
  const [assignments, setAssignments] = useState<Assignment[]>(initialAssignments);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [dueDate, setDueDate] = useState<Date>();
  
  const [filterClass, setFilterClass] = useState<string>("all");
  const [filterSubject, setFilterSubject] = useState<string>("all");

  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    description: "",
    totalMarks: "",
  });

  const handleCreateAssignment = () => {
    if (!formData.title || !formData.subject || !formData.class || !dueDate) {
      toast.error("Please fill all required fields");
      return;
    }

    const newAssignment: Assignment = {
      id: Date.now(),
      ...formData,
      totalMarks: parseInt(formData.totalMarks),
      dueDate: format(dueDate, "yyyy-MM-dd"),
      submissions: 0,
      totalStudents: 28,
      status: "upcoming"
    };

    setAssignments([newAssignment, ...assignments]);
    toast.success("Assignment created successfully!");
    setDialogOpen(false);
    setFormData({ title: "", subject: "", class: "", description: "", totalMarks: "" });
    setDueDate(undefined);
  };

  const handleDeleteAssignment = (id: number) => {
    setAssignments(assignments.filter(a => a.id !== id));
    toast.success("Assignment deleted successfully!");
  };

  const handleViewAssignment = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setPreviewOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 dark:bg-green-950 dark:text-green-400 text-green-800";
      case "upcoming": return "bg-blue-100 dark:bg-blue-950 dark:text-blue-400 text-blue-800";
      case "closed": return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400";
      default: return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-400";
    }
  };

  // Filter only teacher's subjects
  const filteredAssignments = assignments.filter(assignment => {
    const classMatch = filterClass === "all" || assignment.class === filterClass;
    const subjectMatch = filterSubject === "all" || assignment.subject === filterSubject;
    const teacherSubject = mySubjects.includes(assignment.subject);
    return classMatch && subjectMatch && teacherSubject;
  });

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Assignments
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Create and manage assignments • {mySubjects.join(", ")}
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Create Assignment
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Create New Assignment</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Title *</Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Assignment title"
                  className="mt-2"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Subject *</Label>
                  <Select value={formData.subject} onValueChange={(value) => setFormData({...formData, subject: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent className="bg-background text-foreground border-border">
                      {mySubjects.map(subject => (
                        <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Class *</Label>
                  <Select value={formData.class} onValueChange={(value) => setFormData({...formData, class: value})}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent className="bg-background text-foreground border-border">
                      {classes.filter(c => c !== "All Classes").map(cls => (
                        <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Assignment instructions"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Total Marks</Label>
                  <Input 
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => setFormData({...formData, totalMarks: e.target.value})}
                    placeholder="100"
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Due Date *</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start mt-2">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dueDate ? format(dueDate, "PPP") : "Pick date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar mode="single" selected={dueDate} onSelect={setDueDate} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button className="w-full" onClick={handleCreateAssignment}>
                Create Assignment
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Assignments</p>
            <p className="text-3xl font-semibold text-gray-900 dark:text-white mt-1">
              {filteredAssignments.length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">Active</p>
            <p className="text-3xl font-semibold text-green-600 mt-1">
              {filteredAssignments.filter(a => a.status === "active").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">Submissions</p>
            <p className="text-3xl font-semibold text-orange-600 mt-1">
              {filteredAssignments.reduce((acc, a) => acc + a.submissions, 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Select Class</label>
              <Select value={filterClass} onValueChange={setFilterClass}>
                <SelectTrigger>
                  <SelectValue placeholder="All Classes" />
                </SelectTrigger>
                <SelectContent className="bg-background text-foreground border-border">
                  <SelectItem value="all">All Classes</SelectItem>
                  {classes.filter(c => c !== "All Classes").map(cls => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">Select Subject</label>
              <Select value={filterSubject} onValueChange={setFilterSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="All Subjects" />
                </SelectTrigger>
                <SelectContent className="bg-background text-foreground border-border">
                  <SelectItem value="all">All My Subjects</SelectItem>
                  {mySubjects.map(subject => (
                    <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button variant="outline" className="w-full" onClick={() => { setFilterClass("all"); setFilterSubject("all"); }}>
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Assignments List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredAssignments.map((assignment) => (
          <Card key={assignment.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg">
                    {assignment.title}
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3">
                    <Badge variant="outline" className="dark:bg-gray-800">{assignment.subject}</Badge>
                    <Badge variant="outline" className="dark:bg-gray-800">{assignment.class}</Badge>
                    <Badge className={getStatusColor(assignment.status)}>
                      {assignment.status}
                    </Badge>
                  </div>

                  {assignment.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2">
                      {assignment.description}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600 dark:text-gray-400">
                    <span>Due: <span className="font-medium text-gray-900 dark:text-white">
                      {format(new Date(assignment.dueDate), "PPP")}
                    </span></span>
                    <span>Marks: <span className="font-medium text-gray-900 dark:text-white">{assignment.totalMarks}</span></span>
                    <span>Submissions: <span className="font-medium text-gray-900 dark:text-white">
                      {assignment.submissions}/{assignment.totalStudents}
                    </span></span>
                  </div>
                </div>

                <div className="flex flex-row sm:flex-col gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => handleViewAssignment(assignment)}>
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteAssignment(assignment.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredAssignments.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-gray-500 dark:text-gray-400">No assignments found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{selectedAssignment?.title}</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setPreviewOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          {selectedAssignment && (
            <div className="space-y-6 py-4">
              <div className="flex gap-3 flex-wrap">
                <Badge variant="outline">{selectedAssignment.subject}</Badge>
                <Badge variant="outline">{selectedAssignment.class}</Badge>
                <Badge className={getStatusColor(selectedAssignment.status)}>
                  {selectedAssignment.status}
                </Badge>
              </div>

              <div>
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedAssignment.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Due Date</p>
                  <p className="font-medium">{format(new Date(selectedAssignment.dueDate), "PPP")}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">Total Marks</p>
                  <p className="font-medium">{selectedAssignment.totalMarks}</p>
                </div>
              </div>

              <div className="bg-muted/50 border border-border rounded-lg p-5">
                <p className="text-sm text-gray-500 dark:text-gray-400">Submissions</p>
                <p className="text-2xl font-semibold mt-1">
                  {selectedAssignment.submissions} / {selectedAssignment.totalStudents} students
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}