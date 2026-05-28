import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Input } from "../../components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs";
import { MessageSquare, Bell, Send, AlertCircle, Calendar, User } from "lucide-react";
import { toast } from "sonner";

export function StudentCommunication() {
  const [newMessage, setNewMessage] = useState("");
  const [messageSubject, setMessageSubject] = useState("");

  const announcements = [
    {
      id: 1,
      title: "Mid-Term Exam Schedule Released",
      content: "The mid-term examination schedule for all subjects has been published. Exams will begin from June 1, 2026. Please check the timetable section for detailed schedule.",
      date: "2026-05-23",
      type: "academic",
      priority: "high",
      from: "Academic Department",
    },
    {
      id: 2,
      title: "Fee Payment Reminder",
      content: "This is a reminder that the third installment of fees is due by May 31, 2026. Please complete the payment to avoid late fees.",
      date: "2026-05-22",
      type: "fees",
      priority: "high",
      from: "Accounts Department",
    },
    {
      id: 3,
      title: "Sports Day Event",
      content: "Annual sports day will be held on June 15, 2026. Students interested in participating should register with the sports coordinator by June 5.",
      date: "2026-05-20",
      type: "event",
      priority: "medium",
      from: "Sports Department",
    },
    {
      id: 4,
      title: "Library Book Return",
      content: "All library books must be returned by May 28, 2026 before the exam period begins. Late returns will incur fines.",
      date: "2026-05-18",
      type: "general",
      priority: "medium",
      from: "Library",
    },
    {
      id: 5,
      title: "Summer Vacation Schedule",
      content: "Summer vacation will begin from June 20, 2026 and school will reopen on July 15, 2026. Have a great vacation!",
      date: "2026-05-15",
      type: "general",
      priority: "low",
      from: "Administration",
    },
  ];

  const messages = [
    {
      id: 1,
      from: "Mr. Robert Johnson",
      subject: "Assignment Feedback",
      message: "Great work on your recent mathematics assignment. Your approach to solving the trigonometry problems was excellent. Keep it up!",
      date: "2026-05-23",
      time: "10:30 AM",
      read: false,
    },
    {
      id: 2,
      from: "Dr. Sarah Williams",
      subject: "Lab Report Submission",
      message: "Please make sure to submit your physics lab report by tomorrow. Include all the observations and calculations as discussed in class.",
      date: "2026-05-22",
      time: "02:15 PM",
      read: true,
    },
    {
      id: 3,
      from: "Class Teacher",
      subject: "Parent-Teacher Meeting",
      message: "Parent-teacher meeting is scheduled for May 30, 2026. Please inform your parents to attend the meeting.",
      date: "2026-05-21",
      time: "11:00 AM",
      read: true,
    },
  ];

  const handleSendMessage = () => {
    if (!messageSubject.trim() || !newMessage.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success("Message sent successfully!");
    setMessageSubject("");
    setNewMessage("");
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High Priority</Badge>;
      case "medium":
        return <Badge variant="secondary">Medium Priority</Badge>;
      case "low":
        return <Badge variant="outline">Low Priority</Badge>;
      default:
        return null;
    }
  };

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      academic: "bg-blue-100 text-blue-800",
      fees: "bg-green-100 text-green-800",
      event: "bg-purple-100 text-purple-800",
      general: "bg-gray-100 text-gray-800",
    };
    return (
      <Badge variant="secondary" className={colors[type] || ""}>
        {type.charAt(0).toUpperCase() + type.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Communication</h1>
        <p className="text-gray-600 mt-1">Announcements and messages from teachers</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Announcements</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{announcements.length}</p>
              </div>
              <div className="bg-blue-50 p-3 rounded-lg">
                <Bell className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Unread Messages</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {messages.filter((m) => !m.read).length}
                </p>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg">
                <MessageSquare className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">High Priority</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {announcements.filter((a) => a.priority === "high").length}
                </p>
              </div>
              <div className="bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="announcements" className="w-full">
        <TabsList>
          <TabsTrigger value="announcements">
            Announcements ({announcements.length})
          </TabsTrigger>
          <TabsTrigger value="messages">
            Messages ({messages.filter((m) => !m.read).length} unread)
          </TabsTrigger>
          <TabsTrigger value="send">Send Message</TabsTrigger>
        </TabsList>

        <TabsContent value="announcements" className="mt-6 space-y-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg">{announcement.title}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      {getPriorityBadge(announcement.priority)}
                      {getTypeBadge(announcement.type)}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">{announcement.content}</p>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <User className="h-4 w-4" />
                    {announcement.from}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {announcement.date}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="messages" className="mt-6 space-y-4">
          {messages.map((message) => (
            <Card key={message.id} className={!message.read ? "border-blue-300 bg-blue-50/30" : ""}>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <CardTitle className="text-lg">{message.subject}</CardTitle>
                      {!message.read && <Badge variant="default">New</Badge>}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">From: {message.from}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-700">{message.message}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {message.date}
                  </div>
                  <span>{message.time}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="send" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Send className="h-5 w-5" />
                Send Message to Teacher
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Subject</label>
                <Input
                  type="text"
                  placeholder="Enter message subject"
                  value={messageSubject}
                  onChange={(e) => setMessageSubject(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">Message</label>
                <Textarea
                  placeholder="Type your message here..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  rows={8}
                />
              </div>
              <Button onClick={handleSendMessage} className="w-full gap-2">
                <Send className="h-4 w-4" />
                Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
