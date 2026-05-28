import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Search, Wallet, TrendingUp, AlertTriangle, CheckCircle } from "lucide-react";

type FeeStatus = "Paid" | "Pending" | "Overdue";
type FeeRecord = { id: number; studentName: string; class: string; rollNo: string; amount: number; paid: number; due: number; status: FeeStatus; dueDate: string; };

const feeRecords: FeeRecord[] = [
  { id: 1, studentName: "Alice Johnson",  class: "Class 10-A", rollNo: "001", amount: 45000, paid: 45000, due: 0,     status: "Paid",    dueDate: "2025-04-01" },
  { id: 2, studentName: "Bob Smith",      class: "Class 10-A", rollNo: "002", amount: 45000, paid: 22500, due: 22500, status: "Pending", dueDate: "2025-05-01" },
  { id: 3, studentName: "Charlie Brown",  class: "Class 10-A", rollNo: "003", amount: 45000, paid: 0,     due: 45000, status: "Overdue", dueDate: "2025-04-01" },
  { id: 4, studentName: "Diana Prince",   class: "Class 10-A", rollNo: "004", amount: 45000, paid: 45000, due: 0,     status: "Paid",    dueDate: "2025-04-01" },
  { id: 5, studentName: "Ethan Hunt",     class: "Class 10-B", rollNo: "005", amount: 45000, paid: 45000, due: 0,     status: "Paid",    dueDate: "2025-04-01" },
  { id: 6, studentName: "Fiona Green",    class: "Class 10-B", rollNo: "006", amount: 45000, paid: 22500, due: 22500, status: "Pending", dueDate: "2025-05-01" },
  { id: 7, studentName: "George Wilson",  class: "Class 9-A",  rollNo: "007", amount: 42000, paid: 0,     due: 42000, status: "Overdue", dueDate: "2025-04-01" },
  { id: 8, studentName: "Hannah Lee",     class: "Class 9-A",  rollNo: "008", amount: 42000, paid: 42000, due: 0,     status: "Paid",    dueDate: "2025-04-01" },
];

const classes = ["All Classes", "Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B"];
const statuses = ["All", "Paid", "Pending", "Overdue"];

export function PrincipalFinance() {
  const [selectedClass, setSelectedClass] = useState("All Classes");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = feeRecords.filter((r) => {
    const classMatch = selectedClass === "All Classes" || r.class === selectedClass;
    const statusMatch = selectedStatus === "All" || r.status === selectedStatus;
    const s = searchQuery.toLowerCase();
    return classMatch && statusMatch && (r.studentName.toLowerCase().includes(s) || r.rollNo.includes(s));
  });

  const totalCollected = feeRecords.reduce((a, r) => a + r.paid, 0);
  const totalPending   = feeRecords.reduce((a, r) => a + r.due, 0);
  const totalBilled    = feeRecords.reduce((a, r) => a + r.amount, 0);
  const fmt = (n: number) => `₹${(n / 1000).toFixed(0)}K`;

  const statusBadge = (s: FeeStatus) => {
    const map = { Paid: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300", Pending: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300", Overdue: "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300" };
    return map[s];
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-foreground">Finance</h1>
        <p className="text-sm text-foreground/60 mt-1">School-wide fee collection and financial overview</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Billed",    value: fmt(totalBilled),    icon: Wallet,        color: "text-foreground"  },
          { label: "Collected",       value: fmt(totalCollected), icon: CheckCircle,   color: "text-green-600"   },
          { label: "Pending",         value: fmt(totalPending),   icon: AlertTriangle, color: "text-orange-600"  },
          { label: "Collection Rate", value: `${Math.round(totalCollected / totalBilled * 100)}%`, icon: TrendingUp, color: "text-blue-600" },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color} opacity-80`} />
              <div>
                <p className="text-xs text-foreground/60">{stat.label}</p>
                <p className={`text-2xl font-semibold ${stat.color}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-foreground/40" />
              <Input placeholder="Search student…" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10" />
            </div>
            <Select value={selectedClass} onValueChange={setSelectedClass}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{classes.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}</SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>{statuses.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}</SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Fee Records ({filtered.length})</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {filtered.map((r) => (
              <div key={r.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/40 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-foreground">{r.studentName}</h4>
                    <Badge variant="outline" className="font-mono text-xs">{r.rollNo}</Badge>
                  </div>
                  <p className="text-sm text-foreground/60">{r.class} • Due: {r.dueDate}</p>
                </div>
                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-foreground/50">Total Fee</p>
                    <p className="text-sm font-semibold">₹{r.amount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-foreground/50">Paid</p>
                    <p className="text-sm font-semibold text-green-600">₹{r.paid.toLocaleString()}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-foreground/50">Due</p>
                    <p className={`text-sm font-semibold ${r.due > 0 ? "text-red-600" : "text-foreground/40"}`}>₹{r.due.toLocaleString()}</p>
                  </div>
                  <Badge className={statusBadge(r.status)}>{r.status}</Badge>
                </div>
              </div>
            ))}
            {filtered.length === 0 && <div className="text-center py-12 text-foreground/40">No records found</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}