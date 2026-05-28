import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  BookOpen,
  Users,
  Clock,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  DollarSign,
  ArrowRight,
  Book,
  FileText,
} from "lucide-react";

export function LibraryDashboard() {
  const stats = [
    {
      title: "Total Books",
      value: "5,842",
      icon: BookOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Books Issued",
      value: "1,234",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Overdue Books",
      value: "45",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Fines Collected",
      value: "$385",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const categoryStats = [
    { name: "Fiction", total: 1250, issued: 480, available: 770 },
    { name: "Science", total: 890, issued: 320, available: 570 },
    { name: "Mathematics", total: 750, issued: 290, available: 460 },
    { name: "History", total: 650, issued: 210, available: 440 },
    { name: "Technology", total: 580, issued: 220, available: 360 },
    { name: "Literature", total: 520, issued: 180, available: 340 },
  ];

  const recentIssues = [
    {
      book: "Introduction to Algorithms",
      student: "Sarah Anderson",
      class: "10-A",
      issueDate: "2026-05-24",
      dueDate: "2026-06-07",
      status: "issued",
    },
    {
      book: "Physics for Engineers",
      student: "Michael Brown",
      class: "10-B",
      issueDate: "2026-05-23",
      dueDate: "2026-06-06",
      status: "issued",
    },
    {
      book: "World History",
      student: "Emily Davis",
      class: "10-A",
      issueDate: "2026-05-22",
      dueDate: "2026-06-05",
      status: "issued",
    },
    {
      book: "Advanced Mathematics",
      student: "John Smith",
      class: "10-C",
      issueDate: "2026-05-20",
      dueDate: "2026-05-25",
      status: "returned",
    },
  ];

  const overdueBooks = [
    {
      book: "Chemistry Fundamentals",
      student: "Alex Johnson",
      class: "10-B",
      dueDate: "2026-05-15",
      daysOverdue: 10,
      fine: 10,
    },
    {
      book: "English Literature",
      student: "Lisa Williams",
      class: "10-A",
      dueDate: "2026-05-18",
      daysOverdue: 7,
      fine: 7,
    },
    {
      book: "Computer Science Basics",
      student: "David Martinez",
      class: "10-C",
      dueDate: "2026-05-20",
      daysOverdue: 5,
      fine: 5,
    },
  ];

  const popularBooks = [
    { title: "To Kill a Mockingbird", author: "Harper Lee", issues: 45 },
    { title: "1984", author: "George Orwell", issues: 42 },
    { title: "The Great Gatsby", author: "F. Scott Fitzgerald", issues: 38 },
    { title: "Pride and Prejudice", author: "Jane Austen", issues: 35 },
    { title: "Harry Potter Series", author: "J.K. Rowling", issues: 52 },
  ];

  const getStatusBadge = (status: string) => {
    if (status === "issued") {
      return <Badge variant="default" className="bg-blue-600">Issued</Badge>;
    }
    return <Badge variant="default" className="bg-green-600">Returned</Badge>;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Library Dashboard</h1>
        <p className="text-gray-600 mt-1">Overview of library operations and book circulation</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link to="/librarian/books">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-lg">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Books Catalog</p>
                  <p className="text-sm text-gray-600">Manage book collection</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link to="/librarian/issue-return">
          <Card className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-50 rounded-lg">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Issue & Return</p>
                  <p className="text-sm text-gray-600">Manage circulation</p>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
              </div>
            </CardContent>
          </Card>
        </Link>
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Member Cards</p>
                <p className="text-sm text-gray-600">Manage memberships</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Books by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{category.name}</span>
                    <span className="text-sm text-gray-600">{category.total} books</span>
                  </div>
                  <Progress
                    value={(category.available / category.total) * 100}
                    className="h-2 mb-1"
                  />
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Available: {category.available}</span>
                    <span>Issued: {category.issued}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Books */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Most Popular Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {popularBooks.map((book, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">{book.title}</p>
                    <p className="text-sm text-gray-600">{book.author}</p>
                  </div>
                  <Badge variant="secondary">{book.issues} issues</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Issues */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              Recent Book Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentIssues.map((issue, index) => (
                <div
                  key={index}
                  className="p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{issue.book}</p>
                      <p className="text-sm text-gray-600">
                        {issue.student} ({issue.class})
                      </p>
                    </div>
                    {getStatusBadge(issue.status)}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>Issued: {issue.issueDate}</span>
                    <span>Due: {issue.dueDate}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Overdue Books */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <AlertCircle className="h-5 w-5 text-orange-600" />
              Overdue Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {overdueBooks.map((book, index) => (
                <div
                  key={index}
                  className="p-3 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{book.book}</p>
                      <p className="text-sm text-gray-600">
                        {book.student} ({book.class})
                      </p>
                    </div>
                    <Badge variant="destructive">{book.daysOverdue} days</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-900">Due: {book.dueDate}</span>
                    <span className="font-semibold text-orange-900">Fine: ${book.fine}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
