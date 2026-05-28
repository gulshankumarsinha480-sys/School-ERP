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
import { Search, Plus, Edit, Trash2, BookOpen } from "lucide-react";
import { toast } from "sonner";

export function LibraryBooks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "fiction", label: "Fiction" },
    { value: "science", label: "Science" },
    { value: "mathematics", label: "Mathematics" },
    { value: "history", label: "History" },
    { value: "technology", label: "Technology" },
    { value: "literature", label: "Literature" },
    { value: "biography", label: "Biography" },
  ];

  const books = [
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      isbn: "978-0262033848",
      category: "Technology",
      publisher: "MIT Press",
      edition: "3rd Edition",
      totalCopies: 15,
      availableCopies: 12,
      rack: "T-15",
      publishYear: 2009,
    },
    {
      id: 2,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      isbn: "978-0061120084",
      category: "Fiction",
      publisher: "Harper Perennial",
      edition: "1st Edition",
      totalCopies: 20,
      availableCopies: 8,
      rack: "F-08",
      publishYear: 1960,
    },
    {
      id: 3,
      title: "A Brief History of Time",
      author: "Stephen Hawking",
      isbn: "978-0553380163",
      category: "Science",
      publisher: "Bantam Books",
      edition: "10th Anniversary",
      totalCopies: 12,
      availableCopies: 5,
      rack: "S-22",
      publishYear: 1988,
    },
    {
      id: 4,
      title: "Calculus: Early Transcendentals",
      author: "James Stewart",
      isbn: "978-1285741550",
      category: "Mathematics",
      publisher: "Cengage Learning",
      edition: "8th Edition",
      totalCopies: 25,
      availableCopies: 18,
      rack: "M-12",
      publishYear: 2015,
    },
    {
      id: 5,
      title: "1984",
      author: "George Orwell",
      isbn: "978-0451524935",
      category: "Fiction",
      publisher: "Signet Classic",
      edition: "1st Edition",
      totalCopies: 18,
      availableCopies: 6,
      rack: "F-12",
      publishYear: 1949,
    },
    {
      id: 6,
      title: "The Diary of a Young Girl",
      author: "Anne Frank",
      isbn: "978-0553577129",
      category: "Biography",
      publisher: "Bantam Books",
      edition: "Definitive Edition",
      totalCopies: 10,
      availableCopies: 7,
      rack: "B-05",
      publishYear: 1947,
    },
    {
      id: 7,
      title: "Sapiens",
      author: "Yuval Noah Harari",
      isbn: "978-0062316097",
      category: "History",
      publisher: "Harper",
      edition: "1st Edition",
      totalCopies: 14,
      availableCopies: 9,
      rack: "H-18",
      publishYear: 2015,
    },
    {
      id: 8,
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      isbn: "978-0743273565",
      category: "Literature",
      publisher: "Scribner",
      edition: "1st Edition",
      totalCopies: 22,
      availableCopies: 11,
      rack: "L-09",
      publishYear: 1925,
    },
  ];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery);
    const matchesCategory =
      selectedCategory === "all" ||
      book.category.toLowerCase() === categories.find((c) => c.value === selectedCategory)?.label.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const handleAddBook = () => {
    toast.success("Book added successfully!");
    setIsAddDialogOpen(false);
  };

  const handleEditBook = (bookId: number) => {
    toast.success("Book updated successfully!");
  };

  const handleDeleteBook = (bookId: number) => {
    toast.success("Book deleted successfully!");
  };

  const getAvailabilityBadge = (available: number, total: number) => {
    const percentage = (available / total) * 100;
    if (percentage === 0) {
      return <Badge variant="destructive">All Issued</Badge>;
    } else if (percentage < 50) {
      return <Badge className="bg-orange-600">Low Availability</Badge>;
    }
    return <Badge variant="default" className="bg-green-600">Available</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Library Books Catalog</h1>
          <p className="text-gray-600 mt-1">Manage all books in the library collection</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Book
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Book</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label>Book Title</Label>
                <Input placeholder="Enter book title" />
              </div>
              <div className="space-y-2">
                <Label>Author</Label>
                <Input placeholder="Enter author name" />
              </div>
              <div className="space-y-2">
                <Label>ISBN</Label>
                <Input placeholder="Enter ISBN" />
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
                <Label>Publisher</Label>
                <Input placeholder="Enter publisher name" />
              </div>
              <div className="space-y-2">
                <Label>Edition</Label>
                <Input placeholder="Enter edition" />
              </div>
              <div className="space-y-2">
                <Label>Publish Year</Label>
                <Input type="number" placeholder="Enter year" />
              </div>
              <div className="space-y-2">
                <Label>Total Copies</Label>
                <Input type="number" placeholder="Enter number of copies" />
              </div>
              <div className="space-y-2">
                <Label>Rack Location</Label>
                <Input placeholder="Enter rack number" />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddBook}>Add Book</Button>
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
                placeholder="Search by title, author, or ISBN..."
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

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBooks.map((book) => (
          <Card key={book.id}>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3 flex-1">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{book.title}</CardTitle>
                    <p className="text-sm text-gray-600 mt-1">{book.author}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="secondary">{book.category}</Badge>
                      {getAvailabilityBadge(book.availableCopies, book.totalCopies)}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditBook(book.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">ISBN</p>
                  <p className="font-medium text-gray-900">{book.isbn}</p>
                </div>
                <div>
                  <p className="text-gray-600">Publisher</p>
                  <p className="font-medium text-gray-900">{book.publisher}</p>
                </div>
                <div>
                  <p className="text-gray-600">Edition</p>
                  <p className="font-medium text-gray-900">{book.edition}</p>
                </div>
                <div>
                  <p className="text-gray-600">Year</p>
                  <p className="font-medium text-gray-900">{book.publishYear}</p>
                </div>
                <div>
                  <p className="text-gray-600">Rack Location</p>
                  <p className="font-medium text-gray-900">{book.rack}</p>
                </div>
                <div>
                  <p className="text-gray-600">Availability</p>
                  <p className="font-semibold text-gray-900">
                    {book.availableCopies} / {book.totalCopies}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No books found matching your criteria</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
