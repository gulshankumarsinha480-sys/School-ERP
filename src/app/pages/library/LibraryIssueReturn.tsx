import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { BookOpen, ArrowUpCircle, ArrowDownCircle, Clock, DollarSign, Search } from "lucide-react";
import { toast } from "sonner";

export function LibraryIssueReturn() {
  const [searchQuery, setSearchQuery] = useState("");
  const [issueStudentId, setIssueStudentId] = useState("");
  const [issueBookId, setIssueBookId] = useState("");
  const [returnBookId, setReturnBookId] = useState("");

  const issuedBooks = [
    {
      id: 1,
      bookTitle: "Introduction to Algorithms",
      isbn: "978-0262033848",
      studentName: "Sarah Anderson",
      studentId: "STU-2025-001",
      class: "10-A",
      issueDate: "2026-05-24",
      dueDate: "2026-06-07",
      status: "active",
    },
    {
      id: 2,
      bookTitle: "Physics for Engineers",
      isbn: "978-0134710792",
      studentName: "Michael Brown",
      studentId: "STU-2025-002",
      class: "10-B",
      issueDate: "2026-05-23",
      dueDate: "2026-06-06",
      status: "active",
    },
    {
      id: 3,
      bookTitle: "World History",
      isbn: "978-0134710793",
      studentName: "Emily Davis",
      studentId: "STU-2025-003",
      class: "10-A",
      issueDate: "2026-05-22",
      dueDate: "2026-06-05",
      status: "active",
    },
    {
      id: 4,
      bookTitle: "Chemistry Fundamentals",
      isbn: "978-0134710794",
      studentName: "Alex Johnson",
      studentId: "STU-2025-004",
      class: "10-B",
      issueDate: "2026-05-15",
      dueDate: "2026-05-15",
      status: "overdue",
      daysOverdue: 10,
      fine: 10,
    },
    {
      id: 5,
      bookTitle: "English Literature",
      isbn: "978-0134710795",
      studentName: "Lisa Williams",
      studentId: "STU-2025-005",
      class: "10-A",
      issueDate: "2026-05-18",
      dueDate: "2026-05-18",
      status: "overdue",
      daysOverdue: 7,
      fine: 7,
    },
  ];

  const returnHistory = [
    {
      id: 1,
      bookTitle: "Advanced Mathematics",
      isbn: "978-0134710796",
      studentName: "John Smith",
      studentId: "STU-2025-006",
      class: "10-C",
      issueDate: "2026-05-10",
      returnDate: "2026-05-20",
      status: "returned",
    },
    {
      id: 2,
      bookTitle: "Computer Science Basics",
      isbn: "978-0134710797",
      studentName: "Jane Doe",
      studentId: "STU-2025-007",
      class: "10-A",
      issueDate: "2026-05-12",
      returnDate: "2026-05-22",
      status: "returned",
    },
  ];

  const filteredIssuedBooks = issuedBooks.filter((book) =>
    book.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.studentId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const activeBooks = filteredIssuedBooks.filter((b) => b.status === "active");
  const overdueBooks = filteredIssuedBooks.filter((b) => b.status === "overdue");

  const handleIssueBook = () => {
    if (!issueStudentId || !issueBookId) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Book issued successfully!");
    setIssueStudentId("");
    setIssueBookId("");
  };

  const handleReturnBook = (fine?: number) => {
    if (!returnBookId) {
      toast.error("Please enter book ID");
      return;
    }
    if (fine && fine > 0) {
      toast.success(`Book returned! Fine collected: $${fine}`);
    } else {
      toast.success("Book returned successfully!");
    }
    setReturnBookId("");
  };

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge variant="default" className="bg-blue-600">Active</Badge>;
    } else if (status === "overdue") {
      return <Badge variant="destructive">Overdue</Badge>;
    }
    return <Badge variant="default" className="bg-green-600">Returned</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Issue & Return Books</h1>
        <p className="text-gray-600 mt-1">Manage book circulation and returns</p>
      </div>

      <Tabs defaultValue="issue" className="w-full">
        <TabsList>
          <TabsTrigger value="issue">Issue Book</TabsTrigger>
          <TabsTrigger value="return">Return Book</TabsTrigger>
          <TabsTrigger value="issued">Issued Books ({issuedBooks.length})</TabsTrigger>
          <TabsTrigger value="history">Return History</TabsTrigger>
        </TabsList>

        <TabsContent value="issue" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowUpCircle className="h-5 w-5" />
                Issue New Book
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Student ID</Label>
                  <Input
                    placeholder="Enter student ID"
                    value={issueStudentId}
                    onChange={(e) => setIssueStudentId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Book ISBN or ID</Label>
                  <Input
                    placeholder="Enter book ISBN or ID"
                    value={issueBookId}
                    onChange={(e) => setIssueBookId(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Issue Date</Label>
                  <Input type="date" defaultValue={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="space-y-2">
                  <Label>Due Date</Label>
                  <Input
                    type="date"
                    defaultValue={
                      new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
                    }
                  />
                </div>
              </div>
              <Button onClick={handleIssueBook} className="w-full gap-2">
                <ArrowUpCircle className="h-4 w-4" />
                Issue Book
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="return" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ArrowDownCircle className="h-5 w-5" />
                Return Book
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Book ID or ISBN</Label>
                <Input
                  placeholder="Scan or enter book ID/ISBN"
                  value={returnBookId}
                  onChange={(e) => setReturnBookId(e.target.value)}
                />
              </div>
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  Enter the book ID or scan the barcode. If the book is overdue, the system will
                  calculate the fine automatically.
                </p>
              </div>
              <Button onClick={() => handleReturnBook()} className="w-full gap-2">
                <ArrowDownCircle className="h-4 w-4" />
                Return Book
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="issued" className="mt-6">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by book title, student name, or ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Active Issues</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{activeBooks.length}</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Overdue Books</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{overdueBooks.length}</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-orange-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Issued Books List */}
            <div className="space-y-3">
              {filteredIssuedBooks.map((book) => (
                <Card key={book.id} className={book.status === "overdue" ? "border-orange-300" : ""}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{book.bookTitle}</h3>
                        <p className="text-sm text-gray-600 mt-1">ISBN: {book.isbn}</p>
                      </div>
                      {getStatusBadge(book.status)}
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Student</p>
                        <p className="font-medium text-gray-900">{book.studentName}</p>
                        <p className="text-xs text-gray-600">
                          {book.studentId} • {book.class}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-600">Issue Date</p>
                        <p className="font-medium text-gray-900">{book.issueDate}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Due Date</p>
                        <p className={`font-medium ${book.status === "overdue" ? "text-red-600" : "text-gray-900"}`}>
                          {book.dueDate}
                        </p>
                      </div>
                      <div>
                        {book.status === "overdue" && (
                          <>
                            <p className="text-gray-600">Fine</p>
                            <p className="font-semibold text-red-600 flex items-center gap-1">
                              <DollarSign className="h-4 w-4" />
                              {book.fine}
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <Button
                        onClick={() => handleReturnBook(book.fine)}
                        size="sm"
                        variant={book.status === "overdue" ? "destructive" : "default"}
                        className="gap-2"
                      >
                        <ArrowDownCircle className="h-4 w-4" />
                        Return Book {book.fine ? `(Fine: $${book.fine})` : ""}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredIssuedBooks.length === 0 && (
              <Card>
                <CardContent className="p-12 text-center">
                  <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">No issued books found</p>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <div className="space-y-3">
            {returnHistory.map((record) => (
              <Card key={record.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 text-lg">{record.bookTitle}</h3>
                      <p className="text-sm text-gray-600 mt-1">ISBN: {record.isbn}</p>
                    </div>
                    {getStatusBadge(record.status)}
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Student</p>
                      <p className="font-medium text-gray-900">{record.studentName}</p>
                      <p className="text-xs text-gray-600">
                        {record.studentId} • {record.class}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Issue Date</p>
                      <p className="font-medium text-gray-900">{record.issueDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Return Date</p>
                      <p className="font-medium text-green-600">{record.returnDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
