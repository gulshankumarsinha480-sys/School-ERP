import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import {
  DollarSign,
  Download,
  CheckCircle,
  Clock,
  AlertCircle,
  CreditCard,
  Receipt,
  TrendingUp,
  Eye,
} from "lucide-react";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

export function StudentFees() {
  const [showInvoice, setShowInvoice] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState<any>(null);

  const feeStructure = {
    academicYear: "2025-26",
    totalAnnualFees: 50000,
    paidAmount: 25000,
    pendingAmount: 25000,
    installments: [
      { id: 1, name: "First Installment", amount: 25000, dueDate: "2025-08-15", paidDate: "2025-08-10", status: "paid", method: "UPI", txn: "TXN123456789" },
      { id: 2, name: "Second Installment", amount: 25000, dueDate: "2026-01-15", paidDate: "2026-01-12", status: "paid", method: "Credit Card", txn: "TXN987654321" },
      { id: 3, name: "Third Installment", amount: 25000, dueDate: "2026-05-31", paidDate: null, status: "pending", method: null, txn: null },
    ],
  };

  const paymentTrend = [
    { month: "Aug", paid: 25000, pending: 25000 },
    { month: "Sep", paid: 25000, pending: 25000 },
    { month: "Oct", paid: 25000, pending: 25000 },
    { month: "Nov", paid: 25000, pending: 25000 },
    { month: "Dec", paid: 25000, pending: 25000 },
    { month: "Jan", paid: 50000, pending: 0 },
    { month: "Feb", paid: 50000, pending: 0 },
    { month: "Mar", paid: 50000, pending: 0 },
    { month: "Apr", paid: 50000, pending: 0 },
    { month: "May", paid: 50000, pending: 25000 },
  ];

  const percentagePaid = (feeStructure.paidAmount / feeStructure.totalAnnualFees) * 100;

  const calculateLateFee = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = today.getTime() - due.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));
    return diffDays > 0 ? diffDays * 100 : 0;
  };

  const handlePayNow = (inst: any) => {
    const lateFee = calculateLateFee(inst.dueDate);
    if (lateFee > 0) {
      toast.warning(`Late fee of ₹${lateFee} applicable`);
    }
    toast.success("Opening Secure Payment Gateway...");
  };

  const handleViewInvoice = (inst: any) => {
    setSelectedInstallment(inst);
    setShowInvoice(true);
  };

  const handleDownloadStatement = () => {
    toast.success("Fee Statement Downloaded", { description: "PDF generated successfully" });
  };

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Fee Management</h1>
          <p className="text-gray-600 dark:text-gray-400">Academic Year {feeStructure.academicYear}</p>
        </div>
        <Button onClick={handleDownloadStatement} size="lg" className="gap-2">
          <Download className="h-5 w-5" />
          Download Statement
        </Button>
      </div>

      {/* Hero Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
          <CardContent className="p-8">
            <p className="opacity-75">Total Fees</p>
            <p className="text-5xl font-bold mt-3">₹50,000</p>
          </CardContent>
        </Card>
        <Card className="border-green-200">
          <CardContent className="p-8">
            <p className="text-green-700">Paid</p>
            <p className="text-5xl font-bold text-green-600 mt-3">₹25,000</p>
          </CardContent>
        </Card>
        <Card className="border-orange-200">
          <CardContent className="p-8">
            <p className="text-orange-700">Pending</p>
            <p className="text-5xl font-bold text-orange-600 mt-3">₹25,000</p>
          </CardContent>
        </Card>
      </div>

      {/* Progress & Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Overall Progress</CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center py-8">
            <div className="relative w-56 h-56">
              <svg className="w-full h-full -rotate-12" viewBox="0 0 120 120">
                <circle cx="60" cy="60" r="52" fill="none" stroke="#e5e7eb" strokeWidth="14" />
                <circle cx="60" cy="60" r="52" fill="none" stroke="#10b981" strokeWidth="14"
                  strokeDasharray={`${percentagePaid * 3.27} 327`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-6xl font-bold">{percentagePaid.toFixed(0)}%</p>
                <p className="text-sm text-gray-500">PAID</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Payment Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={paymentTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area type="natural" dataKey="paid" stroke="#10b981" fill="#10b981" fillOpacity={0.4} />
                <Area type="natural" dataKey="pending" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.25} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Installments */}
      <Card>
        <CardHeader>
          <CardTitle>Installment Schedule</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {feeStructure.installments.map((inst) => {
            const lateFee = inst.status === "pending" ? calculateLateFee(inst.dueDate) : 0;
            return (
              <div key={inst.id} className="border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{inst.name}</h3>
                    <p className="text-3xl font-bold mt-2">₹{inst.amount}</p>
                  </div>
                  {inst.status === "paid" ? (
                    <Badge className="bg-green-600">PAID</Badge>
                  ) : (
                    <Badge variant="secondary">PENDING</Badge>
                  )}
                </div>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <p className="text-xs text-gray-500">DUE DATE</p>
                    <p className="font-medium">{inst.dueDate}</p>
                  </div>
                  {inst.paidDate && (
                    <div>
                      <p className="text-xs text-gray-500">PAID ON</p>
                      <p className="font-medium text-green-600">{inst.paidDate}</p>
                    </div>
                  )}
                  {lateFee > 0 && (
                    <div>
                      <p className="text-xs text-red-500">LATE FEE</p>
                      <p className="font-medium text-red-600">₹{lateFee}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-6">
                  {inst.status === "pending" && (
                    <Button className="flex-1" onClick={() => handlePayNow(inst)}>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Pay Now
                    </Button>
                  )}
                  <Button variant="outline" className="flex-1" onClick={() => handleViewInvoice(inst)}>
                    <Eye className="mr-2 h-5 w-5" />
                    View Invoice
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Invoice Preview Modal */}
      <Dialog open={showInvoice} onOpenChange={setShowInvoice}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Invoice Preview</DialogTitle>
          </DialogHeader>
          {selectedInstallment && (
            <div className="space-y-6 py-4">
              <div className="text-center border-b pb-4">
                <p className="font-mono text-sm">INVOICE</p>
                <p className="text-2xl font-bold">₹{selectedInstallment.amount}</p>
                <p className="text-sm text-gray-500">{selectedInstallment.name}</p>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span>Student Name</span>
                  <span className="font-medium">Gulshan Kumar</span>
                </div>
                <div className="flex justify-between">
                  <span>Due Date</span>
                  <span>{selectedInstallment.dueDate}</span>
                </div>
                {selectedInstallment.paidDate && (
                  <div className="flex justify-between">
                    <span>Paid Date</span>
                    <span className="text-green-600">{selectedInstallment.paidDate}</span>
                  </div>
                )}
              </div>

              <Button className="w-full" onClick={() => handleDownloadReceipt(selectedInstallment.txn)}>
                Download PDF Invoice
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Notice */}
      <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
        <CardContent className="p-6">
          <div className="flex gap-4">
            <AlertCircle className="h-6 w-6 text-amber-600 mt-1" />
            <div>
              <p className="font-semibold">Payment Reminder</p>
              <p className="text-sm text-amber-700 mt-1">
                Third installment due on <strong>31 May 2026</strong>. Late fee applies after due date.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const calculateLateFee = (dueDate: string) => {
  const due = new Date(dueDate);
  const today = new Date("2026-05-27"); // Current date simulation
  const diffDays = Math.ceil((today.getTime() - due.getTime()) / (1000 * 3600 * 24));
  return diffDays > 0 ? diffDays * 100 : 0;
};