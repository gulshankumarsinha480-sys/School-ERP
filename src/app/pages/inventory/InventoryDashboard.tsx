import { Link } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";
import {
  Package,
  AlertTriangle,
  TrendingUp,
  Box,
  Monitor,
  Printer,
  Armchair,
  Laptop,
  ArrowRight,
} from "lucide-react";

export function InventoryDashboard() {
  const stats = [
    {
      title: "Total Items",
      value: "1,245",
      icon: Package,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Categories",
      value: "12",
      icon: Box,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Low Stock Items",
      value: "18",
      icon: AlertTriangle,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Total Value",
      value: "$125,450",
      icon: TrendingUp,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const categoryStats = [
    {
      name: "Electronics",
      total: 245,
      inStock: 220,
      allocated: 25,
      icon: Monitor,
      color: "bg-blue-500",
    },
    {
      name: "Furniture",
      total: 450,
      inStock: 380,
      allocated: 70,
      icon: Armchair,
      color: "bg-green-500",
    },
    {
      name: "Computers",
      total: 150,
      inStock: 135,
      allocated: 15,
      icon: Laptop,
      color: "bg-purple-500",
    },
    {
      name: "Office Equipment",
      total: 200,
      inStock: 175,
      allocated: 25,
      icon: Printer,
      color: "bg-orange-500",
    },
  ];

  const recentActivity = [
    {
      action: "Added",
      item: "Dell Laptops (10 units)",
      category: "Computers",
      user: "Admin",
      date: "2026-05-24",
      time: "10:30 AM",
    },
    {
      action: "Allocated",
      item: "Office Chairs (5 units)",
      category: "Furniture",
      user: "John Doe",
      date: "2026-05-23",
      time: "02:15 PM",
    },
    {
      action: "Updated",
      item: "HP Printers (Stock)",
      category: "Office Equipment",
      user: "Admin",
      date: "2026-05-22",
      time: "11:45 AM",
    },
    {
      action: "Removed",
      item: "Old Projector (1 unit)",
      category: "Electronics",
      user: "Admin",
      date: "2026-05-21",
      time: "04:00 PM",
    },
  ];

  const lowStockItems = [
    { name: "Whiteboard Markers", current: 15, minimum: 50, category: "Stationery" },
    { name: "Printer Cartridges", current: 8, minimum: 20, category: "Office Equipment" },
    { name: "Network Cables", current: 12, minimum: 30, category: "Electronics" },
    { name: "Student Desks", current: 5, minimum: 20, category: "Furniture" },
  ];

  const getActionBadge = (action: string) => {
    const colors: Record<string, string> = {
      Added: "bg-green-100 text-green-800",
      Allocated: "bg-blue-100 text-blue-800",
      Updated: "bg-yellow-100 text-yellow-800",
      Removed: "bg-red-100 text-red-800",
    };
    return (
      <Badge variant="secondary" className={colors[action] || ""}>
        {action}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Dashboard</h1>
          <p className="text-gray-600 mt-1">Overview of school inventory and assets</p>
        </div>
        <Link to="/inventory/items">
          <Button className="gap-2">
            View All Items
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`${stat.bgColor} p-3 rounded-lg`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Box className="h-5 w-5" />
              Inventory by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {categoryStats.map((category, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <category.icon className="h-4 w-4 text-gray-600" />
                      <span className="font-medium text-gray-900">{category.name}</span>
                    </div>
                    <span className="text-sm text-gray-600">{category.total} items</span>
                  </div>
                  <div className="flex gap-2 mb-1">
                    <div className="flex-1">
                      <Progress
                        value={(category.inStock / category.total) * 100}
                        className="h-2"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span>In Stock: {category.inStock}</span>
                    <span>Allocated: {category.allocated}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alerts */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-900">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Low Stock Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div
                  key={index}
                  className="p-3 bg-orange-50 border border-orange-200 rounded-lg"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-600">{item.category}</p>
                    </div>
                    <Badge variant="destructive">Low</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-orange-900">
                      Current: <strong>{item.current}</strong>
                    </span>
                    <span className="text-orange-900">
                      Required: <strong>{item.minimum}</strong>
                    </span>
                  </div>
                  <Progress
                    value={(item.current / item.minimum) * 100}
                    className="h-1.5 mt-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-4 flex-1">
                  {getActionBadge(activity.action)}
                  <div>
                    <p className="font-medium text-gray-900">{activity.item}</p>
                    <p className="text-sm text-gray-600">{activity.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-900">{activity.user}</p>
                  <p className="text-xs text-gray-600">
                    {activity.date} • {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
