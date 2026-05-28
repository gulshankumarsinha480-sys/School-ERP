import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  BookOpen,
  Calendar,
  Upload,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Search,
} from "lucide-react";
import { toast } from "sonner";

export function StudentAssignments() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const assignments = [
    {
      id: 1,
      title: "Trigonometry Problem Set",
      subject: "Mathematics",
      description: "Solve problems 1-20 from Chapter 8: Trigonometric Functions",
      dueDate: "2026-05-28",
      assignedDate: "2026-05-20",
      maxMarks: 20,
      status: "pending",
      teacher: "Mr. Robert Johnson",
    },
    {
      id: 2,
      title: "Physics Lab Report - Newton's Laws",
      subject: "Physics",
      description: "Complete lab report on the experiment conducted on Newton's laws of motion",
      dueDate: "2026-05-30",
      assignedDate: "2026-05-22",
      maxMarks: 25,
      status: "pending",
      teacher: "Dr. Sarah Williams",
    },
    {
      id: 3,
      title: "Chemistry Project - Organic Compounds",
      subject: "Chemistry",
      description: "Research and prepare a presentation on organic compounds and their applications",
      dueDate: "2026-06-02",
      assignedDate: "2026-05-15",
      maxMarks: 30,
      status: "submitted",
      submittedDate: "2026-05-23",
      teacher: "Dr. Michael Brown",
    },
    {
      id: 4,
      title: "English Essay - Climate Change",
      subject: "English",
      description: "Write a 1000-word essay on the impact of climate change on coastal regions",
      dueDate: "2026-05-26",
      assignedDate: "2026-05-18",
      maxMarks: 15,
      status: "submitted",
      submittedDate: "2026-05-24",
      marksObtained: 14,
      feedback: "Excellent work! Well-researched and articulated.",
      teacher: "Ms. Emily Davis",
    },
    {
      id: 5,
      title: "Computer Science - Python Program",
      subject: "Computer Science",
      description: "Create a Python program to implement a binary search tree with insert and search operations",
      dueDate: "2026-05-25",
      assignedDate: "2026-05-16",
      maxMarks: 20,
      status: "overdue",
      teacher: "Mr. James Wilson",
    },
  ];

  const filteredAssignments = assignments.filter((assignment) =>
    assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    assignment.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pendingAssignments = filteredAssignments.filter((a) => a.status === "pending");
  const submittedAssignments = filteredAssignments.filter((a) => a.status === "submitted");
  const overdueAssignments = filteredAssignments.filter((a) => a.status === "overdue");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = (assignmentId: number) => {
    if (!selectedFile) {
      toast.error("Please select a file to upload");
      return;
    }
    toast.success("Assignment submitted successfully!");
    setSelectedFile(null);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="secondary" className="gap-1"><Clock className="h-3 w-3" /> Pending</Badge>;
      case "submitted":
        return <Badge variant="default" className="gap-1"><CheckCircle2 className="h-3 w-3" /> Submitted</Badge>;
      case "overdue":
        return <Badge variant="destructive" className="gap-1"><AlertCircle className="h-3 w-3" /> Overdue</Badge>;
      default:
        return null;
    }
  };

  const getDaysRemaining = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const AssignmentCard = ({ assignment }: { assignment: typeof assignments[0] }) => {
    const daysRemaining = getDaysRemaining(assignment.dueDate);

    return (
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg">{assignment.title}</CardTitle>
              <p className="text-sm text-gray-600 mt-1">{assignment.subject}</p>
            </div>
            {getStatusBadge(assignment.status)}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-gray-700">{assignment.description}</p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Teacher</p>
              <p className="font-medium text-gray-900">{assignment.teacher}</p>
            </div>
            <div>
              <p className="text-gray-600">Max Marks</p>
              <p className="font-medium text-gray-900">{assignment.maxMarks}</p>
            </div>
            <div>
              <p className="text-gray-600">Assigned Date</p>
              <p className="font-medium text-gray-900">{assignment.assignedDate}</p>
            </div>
            <div>
              <p className="text-gray-600">Due Date</p>
              <p className={`font-medium ${daysRemaining < 3 && assignment.status === 'pending' ? 'text-red-600' : 'text-gray-900'}`}>
                {assignment.dueDate}
              </p>
            </div>
          </div>

          {assignment.status === "pending" && (
            <div className="pt-4 border-t border-gray-200">
              {daysRemaining >= 0 && (
                <p className="text-sm mb-3">
                  {daysRemaining === 0 ? (
                    <span className="text-red-600 font-medium">Due today!</span>
                  ) : daysRemaining === 1 ? (
                    <span className="text-orange-600 font-medium">Due tomorrow</span>
                  ) : (
                    <span className="text-gray-600">{daysRemaining} days remaining</span>
                  )}
                </p>
              )}
              <div className="flex gap-2">
                <Input
                  type="file"
                  onChange={handleFileSelect}
                  className="flex-1"
                />
                <Button onClick={() => handleSubmit(assignment.id)} className="gap-2">
                  <Upload className="h-4 w-4" />
                  Submit
                </Button>
              </div>
            </div>
          )}

          {assignment.status === "submitted" && (
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <p className="text-sm text-green-600 font-medium">
                ✓ Submitted on {assignment.submittedDate}
              </p>
              {assignment.marksObtained !== undefined && (
                <>
                  <p className="text-sm">
                    <span className="text-gray-600">Marks Obtained: </span>
                    <span className="font-semibold text-gray-900">
                      {assignment.marksObtained}/{assignment.maxMarks}
                    </span>
                  </p>
                  {assignment.feedback && (
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <p className="text-xs font-medium text-blue-900">Teacher's Feedback:</p>
                      <p className="text-sm text-blue-800 mt-1">{assignment.feedback}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {assignment.status === "overdue" && (
            <div className="pt-4 border-t border-gray-200">
              <div className="bg-red-50 p-3 rounded-lg">
                <p className="text-sm text-red-800 font-medium">
                  This assignment is overdue. Please submit as soon as possible.
                </p>
              </div>
              <div className="flex gap-2 mt-3">
                <Input
                  type="file"
                  onChange={handleFileSelect}
                  className="flex-1"
                />
                <Button onClick={() => handleSubmit(assignment.id)} variant="destructive" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Submit Late
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Assignments</h1>
        <p className="text-gray-600 mt-1">View and submit your assignments</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{pendingAssignments.length}</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Submitted</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{submittedAssignments.length}</p>
              </div>
              <div className="bg-green-50 p-3 rounded-lg">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Overdue</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{overdueAssignments.length}</p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          type="text"
          placeholder="Search assignments by title or subject..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Assignments Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({filteredAssignments.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingAssignments.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({submittedAssignments.length})</TabsTrigger>
          {overdueAssignments.length > 0 && (
            <TabsTrigger value="overdue">Overdue ({overdueAssignments.length})</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {filteredAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="mt-6 space-y-4">
          {pendingAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>

        <TabsContent value="submitted" className="mt-6 space-y-4">
          {submittedAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>

        <TabsContent value="overdue" className="mt-6 space-y-4">
          {overdueAssignments.map((assignment) => (
            <AssignmentCard key={assignment.id} assignment={assignment} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
