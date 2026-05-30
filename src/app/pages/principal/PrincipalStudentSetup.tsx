import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { NewStudent } from "../student/NewStudent";

export function PrincipalStudentSetup() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Student Setup</h1>
          <p className="text-sm text-foreground/60 mt-1">Add a new admission using the form below</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => navigate("/principal/students")}>
          <ArrowLeft className="h-4 w-4" /> Back to Students
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-violet-600" /> New Admission Form
          </CardTitle>
        </CardHeader>
        <CardContent>
          <NewStudent />
        </CardContent>
      </Card>
    </div>
  );
}

