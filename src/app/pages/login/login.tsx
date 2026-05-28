import { useState } from "react";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { toast } from "sonner";

type Role = "principal" | "student" | "teacher" | "librarian" | "inventory";

const CREDENTIALS: Record<Role, { password: string; path: string }> = {
  principal: { password: "principal", path: "/principal" }, // ← added
  student:   { password: "student",   path: "/student"   },
  teacher:   { password: "teacher",   path: "/teacher"   },
  librarian: { password: "librarian", path: "/librarian" },
  inventory: { password: "inventory", path: "/inventory" },
};

function normalize(s: string) {
  return s.trim().toLowerCase();
}

export function Login() {
  const navigate = useNavigate();

  const [username, setUsername]     = useState("");
  const [password, setPassword]     = useState("");
  const [showPass, setShowPass]     = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [fieldError, setFieldError] = useState<{
    field: "username" | "password" | null;
    message: string;
  }>({ field: null, message: "" });

  function clearError() {
    setFieldError({ field: null, message: "" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    clearError();

    const u = normalize(username) as Role;
    const p = normalize(password);

    if (!CREDENTIALS[u]) {
      setFieldError({ field: "username", message: "Username not found." });
      return;
    }

    if (CREDENTIALS[u].password !== p) {
      setFieldError({ field: "password", message: "Incorrect password." });
      return;
    }

    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 350));
      const label = u.charAt(0).toUpperCase() + u.slice(1);
      toast.success(`Welcome, ${label}!`);
      navigate(CREDENTIALS[u].path);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Sign in</CardTitle>
            <p className="text-sm text-foreground/60">
              Enter your credentials to access your dashboard.
            </p>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              {/* Username */}
              <div className="space-y-1.5">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => { setUsername(e.target.value); clearError(); }}
                  placeholder="Enter username"
                  autoComplete="username"
                  autoFocus
                  className={fieldError.field === "username" ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {fieldError.field === "username" && (
                  <p className="text-xs text-red-500">{fieldError.message}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type={showPass ? "text" : "password"}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); clearError(); }}
                  placeholder="Enter password"
                  autoComplete="current-password"
                  className={fieldError.field === "password" ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {fieldError.field === "password" && (
                  <p className="text-xs text-red-500">{fieldError.message}</p>
                )}
              </div>

              {/* Show password toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="showPass"
                  checked={showPass}
                  onChange={(e) => setShowPass(e.target.checked)}
                  className="h-4 w-4 cursor-pointer accent-primary"
                />
                <label
                  htmlFor="showPass"
                  className="text-sm text-foreground/60 cursor-pointer select-none"
                >
                  Show password
                </label>
              </div>

              {/* Demo hint */}
              <div className="rounded-md bg-muted px-3 py-2.5 text-xs text-foreground/55 space-y-1.5">
                <p className="font-medium text-foreground/70">Demo credentials</p>
                <div className="flex flex-wrap gap-1.5">
                  {(Object.keys(CREDENTIALS) as Role[]).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => {
                        setUsername(role);
                        setPassword(role);
                        clearError();
                      }}
                      className="rounded border bg-background px-2 py-0.5 font-mono hover:bg-muted transition-colors"
                    >
                      {role}
                    </button>
                  ))}
                </div>
                <p className="text-foreground/40">Click a role to autofill credentials.</p>
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? "Signing in…" : "Sign in"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}