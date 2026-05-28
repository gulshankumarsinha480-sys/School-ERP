import { useState } from "react";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { FileText, Upload, Download, Trash2, Plus, Eye, X } from "lucide-react";
import { toast } from "sonner";

const classes = ["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B", "All Classes"];
const allSubjects = ["Mathematics", "Physics", "Chemistry", "English"];

// Teacher's subjects (You can change this)
const mySubjects = ["Mathematics", "Physics", "Chemistry"];

type Note = {
  id: number;
  title: string;
  subject: string;
  class: string;
  description: string;
  fileName: string;
  uploadDate: string;
  fileSize: string;
};

const initialNotes: Note[] = [
  {
    id: 1,
    title: "Quadratic Equations - Chapter 5",
    subject: "Mathematics",
    class: "Class 10-A",
    description: "Complete notes on quadratic equations with examples",
    fileName: "quadratic_equations.pdf",
    uploadDate: "2026-05-20",
    fileSize: "2.4 MB"
  },
  {
    id: 2,
    title: "Newton's Laws of Motion",
    subject: "Physics",
    class: "Class 10-A",
    description: "Detailed explanation of all three laws with diagrams",
    fileName: "newtons_laws.pdf",
    uploadDate: "2026-05-18",
    fileSize: "3.1 MB"
  },
  {
    id: 3,
    title: "Organic Chemistry Basics",
    subject: "Chemistry",
    class: "Class 10-B",
    description: "Introduction to organic chemistry and nomenclature",
    fileName: "organic_chemistry.pdf",
    uploadDate: "2026-05-15",
    fileSize: "4.2 MB"
  },
];

export function Notes() {
  const [notes, setNotes] = useState<Note[]>(initialNotes);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);

  const [filterClass, setFilterClass] = useState<string>("all");
  const [filterSubject, setFilterSubject] = useState<string>("all");
  
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    class: "",
    description: "",
    fileName: "",
  });

  const handleUploadNote = () => {
    if (!formData.title || !formData.subject || !formData.class) {
      toast.error("Please fill all required fields");
      return;
    }

    const newNote: Note = {
      id: Date.now(),
      ...formData,
      uploadDate: new Date().toISOString().split('T')[0],
      fileSize: "1.5 MB"
    };

    setNotes([newNote, ...notes]);
    toast.success("Notes uploaded successfully!");
    setDialogOpen(false);
    setFormData({
      title: "",
      subject: "",
      class: "",
      description: "",
      fileName: "",
    });
  };

  const handleDeleteNote = (id: number) => {
    setNotes(notes.filter(note => note.id !== id));
    toast.success("Note deleted successfully!");
  };

  const handleViewNote = (note: Note) => {
    setSelectedNote(note);
    setPreviewOpen(true);
  };

  const handleDownloadNote = (note: Note) => {
    const content = `
Title: ${note.title}
Subject: ${note.subject}
Class: ${note.class}
Description: ${note.description || "No description provided"}
Uploaded: ${note.uploadDate}
File: ${note.fileName}
Size: ${note.fileSize}
    `.trim();

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = note.fileName.replace(/\.\w+$/, ".txt");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(`Downloading ${note.fileName}...`);
  };

  const filteredNotes = notes.filter(note => {
    const classMatch = filterClass === "all" || note.class === filterClass;
    const subjectMatch = filterSubject === "all" || note.subject === filterSubject;
    // Only show subjects this teacher teaches
    const teacherSubjectMatch = mySubjects.includes(note.subject);
    return classMatch && subjectMatch && teacherSubjectMatch;
  });

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
            My Study Notes
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm sm:text-base">
            Manage notes for subjects you teach • {mySubjects.join(", ")}
          </p>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="w-full sm:w-auto">
              <Plus className="h-4 w-4 mr-2" />
              Upload New Notes
            </Button>
          </DialogTrigger>

          <DialogContent className="max-w-md mx-4">
            <DialogHeader>
              <DialogTitle>Upload Study Notes</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Title *</Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="e.g., Chapter 5 - Quadratic Equations"
                  className="mt-2"
                />
              </div>
              
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

              <div>
                <Label>Description</Label>
                <Textarea 
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="Brief description of the notes"
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label>Upload File</Label>
                <Input 
                  type="file" 
                  accept=".pdf,.doc,.docx,.ppt,.pptx"
                  onChange={(e) => setFormData({...formData, fileName: e.target.files?.[0]?.name || ""})}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Supported formats: PDF, DOC, DOCX, PPT, PPTX
                </p>
              </div>

              <Button className="w-full" onClick={handleUploadNote}>
                <Upload className="h-4 w-4 mr-2" />
                Upload Notes
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-5 sm:p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Select Class
              </label>
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
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                Select Subject
              </label>
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

            <div className="sm:col-span-2 lg:col-span-1 flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => {
                  setFilterClass("all");
                  setFilterSubject("all");
                }}
              >
                Clear Filters
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredNotes.map((note) => (
          <Card key={note.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                <div className="bg-muted p-3 rounded-xl flex-shrink-0 border border-border">
                  <FileText className="h-6 w-6 text-primary" />
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white text-base sm:text-lg leading-tight">
                    {note.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <span className="bg-purple-100 dark:bg-purple-950 dark:text-purple-300 px-2.5 py-1 rounded text-xs sm:text-sm">
                      {note.subject}
                    </span>
                    <span className="bg-blue-100 dark:bg-blue-950 dark:text-blue-300 px-2.5 py-1 rounded text-xs sm:text-sm">
                      {note.class}
                    </span>
                    <span className="text-xs sm:text-sm">{note.uploadDate}</span>
                    <span className="text-xs sm:text-sm">{note.fileSize}</span>
                  </div>

                  {note.description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 line-clamp-2 sm:line-clamp-3">
                      {note.description}
                    </p>
                  )}

                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-3 break-all">
                    File: {note.fileName}
                  </p>
                </div>

                <div className="flex flex-row sm:flex-col gap-2 mt-4 sm:mt-0">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => handleViewNote(note)}>
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">View</span>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none" onClick={() => handleDownloadNote(note)}>
                    <Download className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">Download</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleDeleteNote(note.id)}
                    className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex-1 sm:flex-none"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        {filteredNotes.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">No notes found</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Preview Modal */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>{selectedNote?.title}</DialogTitle>
              <Button variant="ghost" size="icon" onClick={() => setPreviewOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </DialogHeader>

          {selectedNote && (
            <div className="space-y-6 py-4">
              <div className="flex gap-4 flex-wrap">
                <div className="bg-purple-100 dark:bg-purple-950 dark:text-purple-300 px-4 py-1.5 rounded-lg text-sm">
                  {selectedNote.subject}
                </div>
                <div className="bg-blue-100 dark:bg-blue-950 dark:text-blue-300 px-4 py-1.5 rounded-lg text-sm">
                  {selectedNote.class}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Uploaded on {selectedNote.uploadDate}
                </div>
              </div>

              {selectedNote.description && (
                <div>
                  <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Description</h4>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedNote.description}
                  </p>
                </div>
              )}

              <div className="border border-border rounded-lg p-6 bg-muted/50">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-muted p-3 rounded-xl">
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedNote.fileName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{selectedNote.fileSize}</p>
                  </div>
                </div>
                <div className="bg-card border border-border rounded p-6 text-sm min-h-[200px]">
                  Document preview simulation...
                </div>
              </div>

              <Button className="w-full" onClick={() => handleDownloadNote(selectedNote)}>
                <Download className="h-4 w-4 mr-2" />
                Download File
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}