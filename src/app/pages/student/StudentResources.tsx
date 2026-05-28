import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Upload, Download, FileText, File, Search, Calendar } from "lucide-react";
import { toast } from "sonner";

export function StudentResources() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("all");

  const subjects = [
    { value: "all", label: "All Subjects" },
    { value: "mathematics", label: "Mathematics" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "english", label: "English" },
    { value: "cs", label: "Computer Science" },
  ];

  const resources = [
    {
      id: 1,
      title: "Trigonometry - Chapter 8 Notes",
      subject: "Mathematics",
      type: "PDF",
      size: "2.5 MB",
      uploadedBy: "Mr. Robert Johnson",
      uploadedDate: "2026-05-20",
      downloads: 45,
      description: "Comprehensive notes on trigonometric functions and identities",
    },
    {
      id: 2,
      title: "Newton's Laws - Lab Manual",
      subject: "Physics",
      type: "PDF",
      size: "3.8 MB",
      uploadedBy: "Dr. Sarah Williams",
      uploadedDate: "2026-05-18",
      downloads: 38,
      description: "Laboratory manual for Newton's laws experiments",
    },
    {
      id: 3,
      title: "Organic Chemistry - Reaction Mechanisms",
      subject: "Chemistry",
      type: "PDF",
      size: "4.2 MB",
      uploadedBy: "Dr. Michael Brown",
      uploadedDate: "2026-05-15",
      downloads: 52,
      description: "Detailed notes on organic reaction mechanisms",
    },
    {
      id: 4,
      title: "Essay Writing Guide",
      subject: "English",
      type: "DOCX",
      size: "1.5 MB",
      uploadedBy: "Ms. Emily Davis",
      uploadedDate: "2026-05-12",
      downloads: 67,
      description: "Complete guide to writing effective essays",
    },
    {
      id: 5,
      title: "Python Data Structures",
      subject: "Computer Science",
      type: "PDF",
      size: "5.1 MB",
      uploadedBy: "Mr. James Wilson",
      uploadedDate: "2026-05-10",
      downloads: 81,
      description: "Comprehensive guide to data structures in Python",
    },
    {
      id: 6,
      title: "Calculus Practice Problems",
      subject: "Mathematics",
      type: "PDF",
      size: "1.8 MB",
      uploadedBy: "Mr. Robert Johnson",
      uploadedDate: "2026-05-08",
      downloads: 59,
      description: "Practice problems with solutions for calculus",
    },
    {
      id: 7,
      title: "Electromagnetic Theory Notes",
      subject: "Physics",
      type: "PDF",
      size: "3.2 MB",
      uploadedBy: "Dr. Sarah Williams",
      uploadedDate: "2026-05-05",
      downloads: 42,
      description: "Detailed notes on electromagnetic theory and applications",
    },
    {
      id: 8,
      title: "Chemical Bonding PPT",
      subject: "Chemistry",
      type: "PPTX",
      size: "6.5 MB",
      uploadedBy: "Dr. Michael Brown",
      uploadedDate: "2026-05-01",
      downloads: 55,
      description: "PowerPoint presentation on chemical bonding concepts",
    },
  ];

  const filteredResources = resources.filter((resource) => {
    const matchesSearch =
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubject =
      selectedSubject === "all" ||
      resource.subject.toLowerCase() === subjects.find((s) => s.value === selectedSubject)?.label.toLowerCase();
    return matchesSearch && matchesSubject;
  });

  const handleDownload = (resourceId: number, title: string) => {
    toast.success(`Downloading ${title}...`);
  };

  const getFileIcon = (type: string) => {
    if (type === "PDF") {
      return <FileText className="h-5 w-5 text-red-600" />;
    } else if (type === "DOCX") {
      return <File className="h-5 w-5 text-blue-600" />;
    } else if (type === "PPTX") {
      return <File className="h-5 w-5 text-orange-600" />;
    }
    return <File className="h-5 w-5 text-gray-600" />;
  };

  const totalResources = filteredResources.length;
  const subjectCounts = subjects
    .filter((s) => s.value !== "all")
    .map((subject) => ({
      subject: subject.label,
      count: resources.filter((r) => r.subject === subject.label).length,
    }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Study Resources</h1>
        <p className="text-gray-600 mt-1">Access notes, study materials, and resources</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-gray-900">{totalResources}</p>
              <p className="text-xs text-gray-600 mt-1">Total Resources</p>
            </div>
          </CardContent>
        </Card>
        {subjectCounts.map((item, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{item.count}</p>
                <p className="text-xs text-gray-600 mt-1">{item.subject}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search resources by title or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject.value} value={subject.value}>
                      {subject.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="mt-1">{getFileIcon(resource.type)}</div>
                  <div className="flex-1">
                    <CardTitle className="text-base">{resource.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{resource.description}</p>
                  </div>
                </div>
                <Badge variant="secondary">{resource.type}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Subject</p>
                  <p className="font-medium text-gray-900">{resource.subject}</p>
                </div>
                <div>
                  <p className="text-gray-600">Size</p>
                  <p className="font-medium text-gray-900">{resource.size}</p>
                </div>
                <div>
                  <p className="text-gray-600">Uploaded By</p>
                  <p className="font-medium text-gray-900">{resource.uploadedBy}</p>
                </div>
                <div>
                  <p className="text-gray-600">Downloads</p>
                  <p className="font-medium text-gray-900">{resource.downloads}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-gray-600 pt-2 border-t border-gray-100">
                <Calendar className="h-3 w-3" />
                Uploaded on {resource.uploadedDate}
              </div>

              <Button
                className="w-full gap-2"
                onClick={() => handleDownload(resource.id, resource.title)}
              >
                <Download className="h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No resources found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
