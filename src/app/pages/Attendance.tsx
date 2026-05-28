import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Checkbox } from "../components/ui/checkbox";
import { Calendar } from "../components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../components/ui/popover";
import { CalendarIcon, Download, Save, Users, History, FileText } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

const classes = ["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B"];
const mySubjects = ["Mathematics", "Physics", "Chemistry"];

const allStudents = [
  { id: 1, rollNo: "001", name: "Alice Johnson", class: "Class 10-A" },
  { id: 2, rollNo: "002", name: "Bob Smith", class: "Class 10-A" },
  { id: 3, rollNo: "003", name: "Charlie Brown", class: "Class 10-A" },
  { id: 4, rollNo: "004", name: "Diana Prince", class: "Class 10-A" },
  { id: 5, rollNo: "005", name: "Ethan Hunt", class: "Class 10-B" },
  { id: 6, rollNo: "006", name: "Fiona Green", class: "Class 10-B" },
  { id: 7, rollNo: "007", name: "George Wilson", class: "Class 9-A" },
  { id: 8, rollNo: "008", name: "Hannah Lee", class: "Class 9-A" },
];

type AttendanceRecord = {
  id: number;
  date: string;
  subject: string;
  class: string;
  presentCount: number;
  totalStudents: number;
  attendanceData: Record<number, boolean>;
};

export function Attendance() {
  const [activeTab, setActiveTab] = useState<"mark" | "history">("mark");

  const [selectedSubject, setSelectedSubject] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [date, setDate] = useState<Date>(new Date());
  const [attendance, setAttendance] = useState<Record<number, boolean>>({});

  const [history, setHistory] = useState<AttendanceRecord[]>([
    {
      id: 101,
      date: "2026-05-25",
      subject: "Mathematics",
      class: "Class 10-A",
      presentCount: 6,
      totalStudents: 8,
      attendanceData: { 1: true, 2: true, 3: false, 4: true, 5: true, 6: true, 7: false, 8: true }
    },
    {
      id: 102,
      date: "2026-05-24",
      subject: "Physics",
      class: "Class 10-A",
      presentCount: 7,
      totalStudents: 8,
      attendanceData: { 1: true, 2: true, 3: true, 4: true, 5: false, 6: true, 7: true, 8: true }
    }
  ]);

  const filteredStudents = selectedClass 
    ? allStudents.filter(s => s.class === selectedClass)
    : [];

  const handleToggleAttendance = (studentId: number, isPresent: boolean) => {
    setAttendance(prev => ({ ...prev, [studentId]: isPresent }));
  };

  const handleMarkAllPresent = () => {
    const allPresent = filteredStudents.reduce((acc, student) => ({
      ...acc, [student.id]: true
    }), {});
    setAttendance(allPresent);
    toast.success("All students marked present");
  };

  const handleSaveAttendance = () => {
    if (!selectedSubject || !selectedClass) {
      toast.error("Please select subject and class");
      return;
    }

    const presentCount = Object.values(attendance).filter(Boolean).length;
    const totalCount = filteredStudents.length;

    const newRecord: AttendanceRecord = {
      id: Date.now(),
      date: format(date, "yyyy-MM-dd"),
      subject: selectedSubject,
      class: selectedClass,
      presentCount,
      totalStudents: totalCount,
      attendanceData: { ...attendance }
    };

    setHistory([newRecord, ...history]);
    toast.success(`Attendance saved for ${selectedSubject} - ${selectedClass}`);
    
    // Reset form
    setAttendance({});
  };

  const presentCount = filteredStudents.filter(s => attendance[s.id] === true).length;
  const absentCount = filteredStudents.filter(s => attendance[s.id] === false).length;
  const notMarkedCount = filteredStudents.length - presentCount - absentCount;

  const handleDownloadReport = (record: AttendanceRecord) => {
    const content = `Attendance Report
Date: ${record.date}
Subject: ${record.subject}
Class: ${record.class}
Total Students: ${record.totalStudents}
Present: ${record.presentCount}
Absent: ${record.totalStudents - record.presentCount}

Student Details:
${allStudents.map(s => {
  const status = record.attendanceData[s.id] === true ? "Present" : 
                 record.attendanceData[s.id] === false ? "Absent" : "Not Marked";
  return `${s.rollNo} - ${s.name} : ${status}`;
}).join("\n")}`;

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Attendance_${record.subject}_${record.class}_${record.date}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Report downloaded successfully");
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">Attendance</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage attendance for your subjects</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "mark" | "history")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="mark">Mark Attendance</TabsTrigger>
          <TabsTrigger value="history">History & Reports</TabsTrigger>
        </TabsList>

        {/* MARK ATTENDANCE TAB */}
        <TabsContent value="mark" className="space-y-6">
          <Card>
            <CardContent className="p-5 sm:p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Subject</label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {mySubjects.map(sub => <SelectItem key={sub} value={sub}>{sub}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Class</label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Class" />
                    </SelectTrigger>
                    <SelectContent>
                      {classes.map(cls => <SelectItem key={cls} value={cls}>{cls}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {format(date, "PPP")}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={date} onSelect={(d) => d && setDate(d)} />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <Button 
                onClick={handleMarkAllPresent} 
                disabled={!selectedClass || !selectedSubject}
                className="mt-4 w-full sm:w-auto"
              >
                Mark All Present
              </Button>
            </CardContent>
          </Card>

          {selectedSubject && selectedClass && (
            <>
              {/* Stats & List - Same as before */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card><CardContent className="p-5"><p className="text-sm text-gray-500">Total</p><p className="text-3xl font-bold">{filteredStudents.length}</p></CardContent></Card>
                <Card><CardContent className="p-5"><p className="text-sm text-green-600">Present</p><p className="text-3xl font-bold text-green-600">{presentCount}</p></CardContent></Card>
                <Card><CardContent className="p-5"><p className="text-sm text-red-600">Absent</p><p className="text-3xl font-bold text-red-600">{absentCount}</p></CardContent></Card>
                <Card><CardContent className="p-5"><p className="text-sm text-gray-500">Not Marked</p><p className="text-3xl font-bold text-gray-400">{notMarkedCount}</p></CardContent></Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>{selectedSubject} - {selectedClass}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {filteredStudents.map(student => (
                    <div key={student.id} className="flex justify-between items-center p-4 border rounded-xl">
                      <div className="flex gap-4">
                        <span className="font-mono w-12">{student.rollNo}</span>
                        <span>{student.name}</span>
                      </div>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox checked={attendance[student.id] === true} onCheckedChange={() => handleToggleAttendance(student.id, true)} />
                          <span className="text-green-600">Present</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox checked={attendance[student.id] === false} onCheckedChange={() => handleToggleAttendance(student.id, false)} />
                          <span className="text-red-600">Absent</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </CardContent>
                <div className="p-4 border-t flex gap-3">
                  <Button variant="outline" onClick={() => {setAttendance({}); toast.info("Attendance reset")}}>Reset</Button>
                  <Button onClick={handleSaveAttendance}>Save Attendance</Button>
                </div>
              </Card>
            </>
          )}
        </TabsContent>

        {/* HISTORY TAB */}
        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <History className="h-5 w-5" /> Attendance History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {history.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No attendance records yet</p>
                ) : (
                  history.map(record => (
                    <Card key={record.id} className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold">{record.subject} • {record.class}</p>
                          <p className="text-sm text-gray-500">{format(new Date(record.date), "PPP")}</p>
                          <p className="text-sm mt-1">
                            Present: <span className="font-medium text-green-600">{record.presentCount}</span> / {record.totalStudents}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => handleDownloadReport(record)}>
                          <FileText className="h-4 w-4 mr-2" />
                          Report
                        </Button>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}