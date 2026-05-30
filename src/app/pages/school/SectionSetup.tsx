import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Badge } from "../../components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Plus, Edit2, Trash2, Users, Layers } from "lucide-react";
import { toast } from "sonner";

type SectionData = {
  id: number;
  className: string;
  section: string;
  academicYear: string;
  classTeacher: string;
  medium: string;           // ← New Field
  capacity: number;
  currentStrength: number;
};

const INITIAL_SECTIONS: SectionData[] = [
  { id: 1, className: "Class 10", section: "A", academicYear: "2025-26", classTeacher: "Mrs. Priya Sharma", medium: "English", capacity: 45, currentStrength: 42 },
  { id: 2, className: "Class 10", section: "B", academicYear: "2025-26", classTeacher: "Mr. Rajesh Kumar", medium: "Hindi", capacity: 45, currentStrength: 38 },
  { id: 3, className: "Class 9", section: "A", academicYear: "2025-26", classTeacher: "Mrs. Anjali Verma", medium: "Bengali", capacity: 40, currentStrength: 35 },
  { id: 4, className: "Class 9", section: "B", academicYear: "2025-26", classTeacher: "Mr. Amit Patel", medium: "English", capacity: 40, currentStrength: 37 },
];

export function SectionSetup() {
  const [sections, setSections] = useState<SectionData[]>(INITIAL_SECTIONS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<SectionData | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    className: "",
    section: "",
    academicYear: "2025-26",
    classTeacher: "",
    medium: "English",        // ← Default
    capacity: 40,
  });

  const resetForm = () => {
    setFormData({
      className: "",
      section: "",
      academicYear: "2025-26",
      classTeacher: "",
      medium: "English",
      capacity: 40,
    });
    setEditingSection(null);
  };

  const handleOpenDialog = (sec?: SectionData) => {
    if (sec) {
      setEditingSection(sec);
      setFormData({
        className: sec.className,
        section: sec.section,
        academicYear: sec.academicYear,
        classTeacher: sec.classTeacher,
        medium: sec.medium,
        capacity: sec.capacity,
      });
    } else {
      resetForm();
    }
    setIsDialogOpen(true);
  };

  const handleSaveSection = async () => {
    if (!formData.className || !formData.section || !formData.classTeacher || !formData.medium) {
      toast.error("Please fill all required fields");
      return;
    }

    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 400));

    if (editingSection) {
      setSections(sections.map(sec =>
        sec.id === editingSection.id ? { ...sec, ...formData } : sec
      ));
      toast.success("Section updated successfully!");
    } else {
      const newSection: SectionData = {
        id: Date.now(),
        ...formData,
        currentStrength: 0,
      };
      setSections([...sections, newSection]);
      toast.success("New section added successfully!");
    }

    setIsDialogOpen(false);
    resetForm();
    setIsSubmitting(false);
  };

  const handleDeleteSection = (id: number) => {
    if (window.confirm("Delete this section?")) {
      setSections(sections.filter(sec => sec.id !== id));
      toast.success("Section deleted successfully");
    }
  };

  // Group by Class
  const groupedByClass = sections.reduce((acc, sec) => {
    if (!acc[sec.className]) acc[sec.className] = [];
    acc[sec.className].push(sec);
    return acc;
  }, {} as Record<string, SectionData[]>);

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Section Management</h1>
          <p className="text-muted-foreground">Manage sections for each class</p>
        </div>
        <Button onClick={() => handleOpenDialog()} className="gap-2 bg-violet-600 hover:bg-violet-700">
          <Plus className="h-4 w-4" />
          Add New Section
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
              <Layers className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Sections</p>
              <p className="text-2xl font-semibold">{sections.length}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
              <Users className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Total Students</p>
              <p className="text-2xl font-semibold">
                {sections.reduce((sum, s) => sum + s.currentStrength, 0)}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sections by Class */}
      <div className="space-y-6">
        {Object.entries(groupedByClass).map(([className, classSections]) => (
          <Card key={className}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {className}
                <Badge variant="secondary">{classSections.length} Sections</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="text-left p-4">Section</th>
                      <th className="text-left p-4">Medium</th>
                      <th className="text-left p-4">Class Teacher</th>
                      <th className="text-center p-4">Capacity</th>
                      <th className="text-center p-4">Strength</th>
                      <th className="text-center p-4">Occupancy</th>
                      <th className="text-center p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {classSections.map((sec) => {
                      const occupancy = Math.round((sec.currentStrength / sec.capacity) * 100);
                      return (
                        <tr key={sec.id} className="border-b hover:bg-muted/30">
                          <td className="p-4">
                            <Badge variant="outline" className="font-mono text-base px-3 py-1">
                              {sec.section}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <Badge variant="secondary">{sec.medium}</Badge>
                          </td>
                          <td className="p-4">{sec.classTeacher}</td>
                          <td className="p-4 text-center">{sec.capacity}</td>
                          <td className="p-4 text-center font-medium">{sec.currentStrength}</td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-2">
                              <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${occupancy > 90 ? 'bg-red-500' : occupancy > 70 ? 'bg-amber-500' : 'bg-emerald-500'}`}
                                  style={{ width: `${occupancy}%` }}
                                />
                              </div>
                              <span className="text-xs font-medium">{occupancy}%</span>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex justify-center gap-2">
                              <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(sec)}>
                                <Edit2 className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => handleDeleteSection(sec.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingSection ? "Edit Section" : "Add New Section"}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>Class</Label>
              <Select
                value={formData.className}
                onValueChange={(value) => setFormData({ ...formData, className: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Class" />
                </SelectTrigger>
                <SelectContent>
                  {["Class 9", "Class 10", "Class 11", "Class 12"].map((cls) => (
                    <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Section</Label>
              <Input
                placeholder="A, B, C..."
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value.toUpperCase() })}
                maxLength={2}
              />
            </div>

            <div>
              <Label>Medium</Label>
              <Select
                value={formData.medium}
                onValueChange={(value) => setFormData({ ...formData, medium: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Medium" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Hindi">Hindi</SelectItem>
                  <SelectItem value="Bengali">Bengali</SelectItem>
                  <SelectItem value="Marathi">Marathi</SelectItem>
                  <SelectItem value="Tamil">Tamil</SelectItem>
                  <SelectItem value="Telugu">Telugu</SelectItem>
                  <SelectItem value="Kannada">Kannada</SelectItem>
                  <SelectItem value="Gujarati">Gujarati</SelectItem>
                  <SelectItem value="Malayalam">Malayalam</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Class Teacher</Label>
              <Input
                placeholder="Teacher Name"
                value={formData.classTeacher}
                onChange={(e) => setFormData({ ...formData, classTeacher: e.target.value })}
              />
            </div>

            <div>
              <Label>Capacity</Label>
              <Input
                type="number"
                min={10}
                max={100}
                value={formData.capacity}
                onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) || 40 })}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSaveSection} disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : editingSection ? "Update Section" : "Add Section"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}