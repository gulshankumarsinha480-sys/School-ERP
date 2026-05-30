import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { AcademicYear } from "../school/AcademicYear";

export function PrincipalAcademicYear() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Academic Year Setup</h1>
          <p className="text-sm text-foreground/60 mt-1">Add a new Academic Year</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => navigate("/principal")}>
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-violet-600" /> Academic Year
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AcademicYear />
        </CardContent>
      </Card>
    </div>
  );
}

