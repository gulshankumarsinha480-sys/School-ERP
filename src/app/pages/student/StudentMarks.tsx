import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { Progress } from "../../components/ui/progress";
import { FileText, Download, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { toast } from "sonner";

export function StudentMarks() {
  const [selectedExam, setSelectedExam] = useState("mid-term-1");

  const examTypes = [
    { value: "unit-test-1", label: "Unit Test 1" },
    { value: "mid-term-1", label: "Mid Term 1" },
    { value: "unit-test-2", label: "Unit Test 2" },
    { value: "mid-term-2", label: "Mid Term 2" },
    { value: "final", label: "Final Exam" },
  ];

  const subjectMarks = [
    {
      subject: "Mathematics",
      theory: 88,
      practical: 95,
      total: 183,
      maxMarks: 200,
      grade: "A+",
      percentage: 91.5,
      rank: 5,
      trend: "up"
    },
    {
      subject: "Physics",
      theory: 82,
      practical: 88,
      total: 170,
      maxMarks: 200,
      grade: "A",
      percentage: 85.0,
      rank: 8,
      trend: "up"
    },
    {
      subject: "Chemistry",
      theory: 85,
      practical: 92,
      total: 177,
      maxMarks: 200,
      grade: "A",
      percentage: 88.5,
      rank: 6,
      trend: "same"
    },
    {
      subject: "English",
      theory: 90,
      practical: null,
      total: 90,
      maxMarks: 100,
      grade: "A+",
      percentage: 90.0,
      rank: 3,
      trend: "up"
    },
    {
      subject: "Computer Science",
      theory: 86,
      practical: 94,
      total: 180,
      maxMarks: 200,
      grade: "A",
      percentage: 90.0,
      rank: 4,
      trend: "down"
    },
  ];

  const overallStats = {
    totalMarks: 800,
    obtainedMarks: 700,
    percentage: 87.5,
    grade: "A+",
    classRank: 5,
    totalStudents: 45,
  };

  const examHistory = [
    { exam: "Unit Test 1", percentage: 85.2, grade: "A", date: "2026-03-15" },
    { exam: "Mid Term 1", percentage: 87.5, grade: "A+", date: "2026-05-10" },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-600" />;
      case "down":
        return <TrendingDown className="h-4 w-4 text-red-600" />;
      default:
        return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getProgressColor = (percentage: number) => {
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 80) return "bg-blue-500";
    if (percentage >= 70) return "bg-yellow-500";
    return "bg-red-500";
  };

  const handleDownloadReport = () => {
    toast.success("Report Card downloaded successfully!");
    // In real app, this would generate PDF
  };

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            Marks & Results
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Academic Performance Overview
          </p>
        </div>
        <Button onClick={handleDownloadReport} className="gap-2 w-full sm:w-auto">
          <Download className="h-4 w-4" />
          Download Report Card
        </Button>
      </div>

      {/* Exam Selector */}
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 min-w-fit">
              Select Exam Period:
            </label>
            <Select value={selectedExam} onValueChange={setSelectedExam}>
              <SelectTrigger className="w-full sm:w-72">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {examTypes.map((exam) => (
                  <SelectItem key={exam.value} value={exam.value}>
                    {exam.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Overall Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">Obtained Marks</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {overallStats.obtainedMarks}<span className="text-xl text-gray-400">/{overallStats.totalMarks}</span>
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">Overall Percentage</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">{overallStats.percentage}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">Grade</p>
            <p className="text-3xl font-bold text-emerald-600 mt-1">{overallStats.grade}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-sm text-gray-600 dark:text-gray-400">Class Rank</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-1">
              {overallStats.classRank}<span className="text-xl text-gray-400">/{overallStats.totalStudents}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="detailed" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="detailed">Subject-wise Marks</TabsTrigger>
          <TabsTrigger value="history">Exam History</TabsTrigger>
        </TabsList>

        {/* Detailed Marks Tab */}
        <TabsContent value="detailed" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Subject-wise Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {subjectMarks.map((subject, index) => (
                <div key={index} className="border-b border-border last:border-0 pb-8 last:pb-0">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="font-semibold text-xl text-gray-900 dark:text-white">
                        {subject.subject}
                      </h3>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant={subject.grade === "A+" ? "default" : "secondary"} className="text-sm">
                          {subject.grade}
                        </Badge>
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Rank #{subject.rank}
                        </span>
                        {getTrendIcon(subject.trend)}
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-3xl font-bold text-gray-900 dark:text-white">
                        {subject.total}<span className="text-xl text-gray-400">/{subject.maxMarks}</span>
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{subject.percentage}%</p>
                    </div>
                  </div>

                  <Progress 
                    value={subject.percentage} 
                    className={`h-2.5 ${getProgressColor(subject.percentage)}`} 
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
                    <div className="bg-muted/50 p-4 rounded-xl">
                      <p className="text-sm text-gray-600 dark:text-gray-400">Theory</p>
                      <p className="font-semibold text-lg mt-1">{subject.theory}/100</p>
                    </div>
                    {subject.practical !== null && (
                      <div className="bg-muted/50 p-4 rounded-xl">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Practical</p>
                        <p className="font-semibold text-lg mt-1">{subject.practical}/100</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Exam History Tab */}
        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Previous Exam Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {examHistory.map((exam, index) => (
                  <div key={index} className="flex items-center justify-between p-5 border border-border rounded-xl">
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">{exam.exam}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{exam.date}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="mb-1">{exam.grade}</Badge>
                      <p className="font-semibold text-lg">{exam.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}