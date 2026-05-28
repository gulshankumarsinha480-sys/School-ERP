import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Search, Eye, Mail, Phone } from "lucide-react";

const classes = ["All Classes", "Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B"];

type Student = {
  id: number;
  rollNo: string;
  name: string;
  class: string;
  email: string;
  phone: string;
  attendance: number;
  performance: "Excellent" | "Good" | "Average" | "Poor";
  initials: string;
};

const students: Student[] = [
  {
    id: 1,
    rollNo: "001",
    name: "Alice Johnson",
    class: "Class 10-A",
    email: "alice.j@school.com",
    phone: "+1 234-567-8901",
    attendance: 95,
    performance: "Excellent",
    initials: "AJ"
  },
  {
    id: 2,
    rollNo: "002",
    name: "Bob Smith",
    class: "Class 10-A",
    email: "bob.s@school.com",
    phone: "+1 234-567-8902",
    attendance: 88,
    performance: "Good",
    initials: "BS"
  },
  {
    id: 3,
    rollNo: "003",
    name: "Charlie Brown",
    class: "Class 10-A",
    email: "charlie.b@school.com",
    phone: "+1 234-567-8903",
    attendance: 92,
    performance: "Good",
    initials: "CB"
  },
  {
    id: 4,
    rollNo: "004",
    name: "Diana Prince",
    class: "Class 10-A",
    email: "diana.p@school.com",
    phone: "+1 234-567-8904",
    attendance: 98,
    performance: "Excellent",
    initials: "DP"
  },
  {
    id: 5,
    rollNo: "005",
    name: "Ethan Hunt",
    class: "Class 10-B",
    email: "ethan.h@school.com",
    phone: "+1 234-567-8905",
    attendance: 85,
    performance: "Average",
    initials: "EH"
  },
  {
    id: 6,
    rollNo: "006",
    name: "Fiona Green",
    class: "Class 10-B",
    email: "fiona.g@school.com",
    phone: "+1 234-567-8906",
    attendance: 91,
    performance: "Good",
    initials: "FG"
  },
  {
    id: 7,
    rollNo: "007",
    name: "George Wilson",
    class: "Class 9-A",
    email: "george.w@school.com",
    phone: "+1 234-567-8907",
    attendance: 78,
    performance: "Average",
    initials: "GW"
  },
  {
    id: 8,
    rollNo: "008",
    name: "Hannah Lee",
    class: "Class 9-A",
    email: "hannah.l@school.com",
    phone: "+1 234-567-8908",
    attendance: 96,
    performance: "Excellent",
    initials: "HL"
  },
];

export function Students() {
  const [selectedClass, setSelectedClass] = useState<string>("All Classes");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const filteredStudents = students.filter(student => {
    const classMatch = selectedClass === "All Classes" || student.class === selectedClass;
    const searchMatch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       student.rollNo.includes(searchQuery);
    return classMatch && searchMatch;
  });

  const handleViewDetails = (student: Student) => {
    setSelectedStudent(student);
    setDialogOpen(true);
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Average": return "bg-yellow-100 text-yellow-800";
      case "Poor": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getAttendanceColor = (attendance: number) => {
    if (attendance >= 90) return "text-green-600";
    if (attendance >= 75) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold text-gray-900">Students</h1>
        <p className="text-gray-600 mt-1">View and manage student information</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Total Students</p>
            <p className="text-2xl font-semibold text-gray-900 mt-1">{students.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Excellent Performers</p>
            <p className="text-2xl font-semibold text-green-600 mt-1">
              {students.filter(s => s.performance === "Excellent").length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Avg. Attendance</p>
            <p className="text-2xl font-semibold text-blue-600 mt-1">
              {Math.round(students.reduce((acc, s) => acc + s.attendance, 0) / students.length)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-600">Need Attention</p>
            <p className="text-2xl font-semibold text-orange-600 mt-1">
              {students.filter(s => s.attendance < 85 || s.performance === "Poor").length}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by name or roll number..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {classes.map(cls => (
                  <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Student List ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filteredStudents.map((student) => (
              <div 
                key={student.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <Avatar>
                    <AvatarFallback>{student.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h4 className="font-semibold text-gray-900">{student.name}</h4>
                      <Badge variant="outline" className="font-mono text-xs">
                        {student.rollNo}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{student.class}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <p className="text-xs text-gray-600">Attendance</p>
                    <p className={`text-sm font-semibold ${getAttendanceColor(student.attendance)}`}>
                      {student.attendance}%
                    </p>
                  </div>
                  <div>
                    <Badge className={getPerformanceColor(student.performance)}>
                      {student.performance}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleViewDetails(student)}
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </div>
              </div>
            ))}

            {filteredStudents.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No students found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Student Details Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Student Details</DialogTitle>
          </DialogHeader>
          {selectedStudent && (
            <div className="space-y-4 py-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarFallback className="text-xl">{selectedStudent.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-semibold">{selectedStudent.name}</h3>
                  <p className="text-sm text-gray-600">{selectedStudent.class} • Roll No: {selectedStudent.rollNo}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="flex items-center gap-2 mt-1">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{selectedStudent.email}</span>
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Phone</p>
                  <p className="flex items-center gap-2 mt-1">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{selectedStudent.phone}</span>
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div>
                  <p className="text-sm text-gray-600">Attendance Rate</p>
                  <p className={`text-2xl font-semibold mt-1 ${getAttendanceColor(selectedStudent.attendance)}`}>
                    {selectedStudent.attendance}%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Performance</p>
                  <Badge className={`${getPerformanceColor(selectedStudent.performance)} mt-2`}>
                    {selectedStudent.performance}
                  </Badge>
                </div>
              </div>

              <div className="pt-4 border-t">
                <Button className="w-full" variant="outline">
                  View Full Academic Record
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
