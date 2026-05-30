import { Button } from "../../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router";
import { SectionSetup } from "../school/SectionSetup";

export function PrincipalSectionSetup() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Section Setup</h1>
          <p className="text-sm text-foreground/60 mt-1">Add a new Class</p>
        </div>
        <Button variant="outline" className="gap-2" onClick={() => navigate("/principal")}>
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-violet-600" /> Add Section
          </CardTitle>
        </CardHeader>
        <CardContent>
          <SectionSetup />
        </CardContent>
      </Card>
    </div>
  );
}

