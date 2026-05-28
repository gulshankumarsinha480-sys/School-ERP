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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Search, Plus, Edit, Trash2, Package } from "lucide-react";
import { toast } from "sonner";

export function InventoryItems() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "electronics", label: "Electronics" },
    { value: "furniture", label: "Furniture" },
    { value: "computers", label: "Computers" },
    { value: "office", label: "Office Equipment" },
    { value: "stationery", label: "Stationery" },
    { value: "sports", label: "Sports Equipment" },
    { value: "lab", label: "Lab Equipment" },
  ];

  const items = [
    {
      id: 1,
      name: "Dell Latitude Laptops",
      category: "Computers",
      sku: "COMP-001",
      quantity: 135,
      minQuantity: 100,
      unitPrice: 850,
      totalValue: 114750,
      location: "IT Store Room",
      condition: "Good",
      lastUpdated: "2026-05-24",
    },
    {
      id: 2,
      name: "HP LaserJet Printers",
      category: "Office Equipment",
      sku: "OFF-012",
      quantity: 25,
      minQuantity: 20,
      unitPrice: 450,
      totalValue: 11250,
      location: "Admin Block",
      condition: "Good",
      lastUpdated: "2026-05-23",
    },
    {
      id: 3,
      name: "Student Desks",
      category: "Furniture",
      sku: "FURN-045",
      quantity: 5,
      minQuantity: 20,
      unitPrice: 120,
      totalValue: 600,
      location: "Main Storage",
      condition: "Good",
      lastUpdated: "2026-05-22",
    },
    {
      id: 4,
      name: "Interactive Whiteboards",
      category: "Electronics",
      sku: "ELEC-078",
      quantity: 45,
      minQuantity: 40,
      unitPrice: 1200,
      totalValue: 54000,
      location: "AV Room",
      condition: "Excellent",
      lastUpdated: "2026-05-20",
    },
    {
      id: 5,
      name: "Laboratory Microscopes",
      category: "Lab Equipment",
      sku: "LAB-023",
      quantity: 30,
      minQuantity: 25,
      unitPrice: 650,
      totalValue: 19500,
      location: "Science Lab",
      condition: "Good",
      lastUpdated: "2026-05-18",
    },
    {
      id: 6,
      name: "Whiteboard Markers",
      category: "Stationery",
      sku: "STAT-156",
      quantity: 15,
      minQuantity: 50,
      unitPrice: 2,
      totalValue: 30,
      location: "Supply Closet",
      condition: "Good",
      lastUpdated: "2026-05-15",
    },
    {
      id: 7,
      name: "Basketball Sets",
      category: "Sports Equipment",
      sku: "SPORT-089",
      quantity: 20,
      minQuantity: 15,
      unitPrice: 45,
      totalValue: 900,
      location: "Sports Store",
      condition: "Good",
      lastUpdated: "2026-05-12",
    },
    {
      id: 8,
      name: "Office Chairs",
      category: "Furniture",
      sku: "FURN-067",
      quantity: 180,
      minQuantity: 150,
      unitPrice: 180,
      totalValue: 32400,
      location: "Main Storage",
      condition: "Good",
      lastUpdated: "2026-05-10",
    },
  ];

  const filteredItems = items.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category.toLowerCase() === categories.find((c) => c.value === selectedCategory)?.label.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddItem = () => {
    toast.success("Item added successfully!");
    setIsAddDialogOpen(false);
  };

  const handleEditItem = (itemId: number) => {
    toast.success("Item updated successfully!");
  };

  const handleDeleteItem = (itemId: number) => {
    toast.success("Item deleted successfully!");
  };

  const getStockStatus = (quantity: number, minQuantity: number) => {
    const percentage = (quantity / minQuantity) * 100;
    if (percentage < 50) {
      return <Badge variant="destructive">Critical</Badge>;
    } else if (percentage < 100) {
      return <Badge className="bg-orange-600">Low Stock</Badge>;
    }
    return <Badge variant="default" className="bg-green-600">In Stock</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Items</h1>
          <p className="text-gray-600 mt-1">Manage all inventory items and stock levels</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Item Name</Label>
                <Input placeholder="Enter item name" />
              </div>
              <div className="space-y-2">
                <Label>SKU</Label>
                <Input placeholder="Enter SKU" />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c.value !== "all").map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Quantity</Label>
                <Input type="number" placeholder="Enter quantity" />
              </div>
              <div className="space-y-2">
                <Label>Minimum Quantity</Label>
                <Input type="number" placeholder="Enter minimum quantity" />
              </div>
              <div className="space-y-2">
                <Label>Unit Price ($)</Label>
                <Input type="number" placeholder="Enter unit price" />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input placeholder="Enter storage location" />
              </div>
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                    <SelectItem value="poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddItem}>Add Item</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by item name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Items List */}
      <div className="grid grid-cols-1 gap-4">
        {filteredItems.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <Package className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{item.category}</Badge>
                      {getStockStatus(item.quantity, item.minQuantity)}
                      <span className="text-sm text-gray-600">SKU: {item.sku}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditItem(item.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Current Stock</p>
                  <p className="font-semibold text-gray-900 text-lg">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-gray-600">Min. Required</p>
                  <p className="font-semibold text-gray-900 text-lg">{item.minQuantity}</p>
                </div>
                <div>
                  <p className="text-gray-600">Unit Price</p>
                  <p className="font-semibold text-gray-900 text-lg">${item.unitPrice}</p>
                </div>
                <div>
                  <p className="text-gray-600">Total Value</p>
                  <p className="font-semibold text-gray-900 text-lg">
                    ${item.totalValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Location</p>
                  <p className="font-medium text-gray-900">{item.location}</p>
                </div>
                <div>
                  <p className="text-gray-600">Condition</p>
                  <p className="font-medium text-gray-900">{item.condition}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-gray-600">Last Updated</p>
                  <p className="font-medium text-gray-900">{item.lastUpdated}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No items found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
