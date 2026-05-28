import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Badge } from "../components/ui/badge";
import { Plus, Send, Bell, MessageSquare, Users } from "lucide-react";
import { toast } from "sonner";

const classes = ["Class 10-A", "Class 10-B", "Class 9-A", "Class 9-B", "All Classes"];

type Announcement = {
  id: number;
  title: string;
  message: string;
  recipient: string;
  date: string;
  type: "announcement" | "message";
};

const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "Mid-term Exam Schedule",
    message: "The mid-term exams will be conducted from June 1st to June 7th. Please prepare accordingly.",
    recipient: "All Classes",
    date: "2026-05-22",
    type: "announcement"
  },
  {
    id: 2,
    title: "Assignment Submission Reminder",
    message: "Please submit Assignment 3 by this Friday. Late submissions will not be accepted.",
    recipient: "Class 10-A",
    date: "2026-05-23",
    type: "message"
  },
  {
    id: 3,
    title: "Extra Classes",
    message: "Additional doubt clearing sessions will be held on Saturday from 10 AM to 12 PM.",
    recipient: "Class 10-B",
    date: "2026-05-24",
    type: "announcement"
  },
];

const messages = [
  {
    id: 1,
    student: "Alice Johnson",
    class: "Class 10-A",
    message: "Sir, could you please explain the last problem from yesterday's class?",
    time: "2 hours ago",
    unread: true
  },
  {
    id: 2,
    student: "Bob Smith",
    class: "Class 10-A",
    message: "Thank you for the extra notes. They were very helpful!",
    time: "5 hours ago",
    unread: false
  },
  {
    id: 3,
    student: "Diana Prince",
    class: "Class 10-A",
    message: "Will there be a makeup class for the one we missed last week?",
    time: "1 day ago",
    unread: true
  },
];

export function Communication() {
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
    recipient: "",
    type: "announcement" as "announcement" | "message"
  });

  const handleSendAnnouncement = () => {
    if (!formData.title || !formData.message || !formData.recipient) {
      toast.error("Please fill all required fields");
      return;
    }

    const newAnnouncement: Announcement = {
      id: announcements.length + 1,
      ...formData,
      date: new Date().toISOString().split('T')[0]
    };

    setAnnouncements([newAnnouncement, ...announcements]);
    toast.success("Announcement sent successfully!");
    setDialogOpen(false);
    setFormData({ title: "", message: "", recipient: "", type: "announcement" });
  };

  const unreadCount = messages.filter(m => m.unread).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-gray-900">Communication</h1>
          <p className="text-gray-600 mt-1">Send announcements and messages to students</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Announcement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create Announcement</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Type</Label>
                <Select 
                  value={formData.type} 
                  onValueChange={(value: "announcement" | "message") => setFormData({...formData, type: value})}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="announcement">Announcement</SelectItem>
                    <SelectItem value="message">Message</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Recipient *</Label>
                <Select value={formData.recipient} onValueChange={(value) => setFormData({...formData, recipient: value})}>
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select recipient" />
                  </SelectTrigger>
                  <SelectContent>
                    {classes.map(cls => (
                      <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Title *</Label>
                <Input 
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="Announcement title"
                  className="mt-2"
                />
              </div>

              <div>
                <Label>Message *</Label>
                <Textarea 
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Type your message here..."
                  className="mt-2"
                  rows={5}
                />
              </div>

              <Button className="w-full" onClick={handleSendAnnouncement}>
                <Send className="h-4 w-4 mr-2" />
                Send {formData.type === "announcement" ? "Announcement" : "Message"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Bell className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Announcements</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{announcements.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unread Messages</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Users className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Recipients</p>
                <p className="text-2xl font-semibold text-gray-900 mt-1">156</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="announcements" className="space-y-4">
        <TabsList>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="messages">
            Student Messages
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-red-500">{unreadCount}</Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        announcement.type === "announcement" 
                          ? "bg-blue-100" 
                          : "bg-green-100"
                      }`}>
                        {announcement.type === "announcement" ? (
                          <Bell className={`h-5 w-5 ${
                            announcement.type === "announcement" 
                              ? "text-blue-600" 
                              : "text-green-600"
                          }`} />
                        ) : (
                          <MessageSquare className="h-5 w-5 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-lg">{announcement.title}</h3>
                        <p className="text-sm text-gray-600 mt-2">{announcement.message}</p>
                        <div className="flex items-center gap-4 mt-3">
                          <Badge variant="outline">{announcement.recipient}</Badge>
                          <span className="text-xs text-gray-500">{announcement.date}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="messages" className="space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={message.unread ? "border-blue-500" : ""}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-gray-900">{message.student}</h3>
                      <Badge variant="outline" className="text-xs">{message.class}</Badge>
                      {message.unread && (
                        <Badge className="bg-blue-500">New</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{message.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{message.time}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Send className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
