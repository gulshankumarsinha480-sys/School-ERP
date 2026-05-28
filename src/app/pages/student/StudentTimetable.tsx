import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Calendar, Clock, MapPin, User } from "lucide-react";

const timetable = [
  {
    day: "Monday",
    classes: [
      { time: "08:00 - 09:00", subject: "Mathematics", teacher: "Mr. Robert Johnson", room: "Room 101" },
      { time: "09:00 - 10:00", subject: "Physics", teacher: "Dr. Sarah Williams", room: "Lab 1" },
      { time: "10:00 - 10:30", subject: "Break", teacher: "", room: "" },
      { time: "10:30 - 11:30", subject: "Chemistry", teacher: "Dr. Michael Brown", room: "Lab 2" },
      { time: "11:30 - 12:30", subject: "English", teacher: "Ms. Emily Davis", room: "Room 203" },
      { time: "12:30 - 01:30", subject: "Lunch Break", teacher: "", room: "" },
      { time: "01:30 - 02:30", subject: "Computer Science", teacher: "Mr. James Wilson", room: "Computer Lab" },
    ],
  },
  // ... (rest of your timetable data remains same)
  {
    day: "Tuesday",
    classes: [
      { time: "08:00 - 09:00", subject: "English", teacher: "Ms. Emily Davis", room: "Room 203" },
      { time: "09:00 - 10:00", subject: "Mathematics", teacher: "Mr. Robert Johnson", room: "Room 101" },
      { time: "10:00 - 10:30", subject: "Break", teacher: "", room: "" },
      { time: "10:30 - 11:30", subject: "Physics", teacher: "Dr. Sarah Williams", room: "Lab 1" },
      { time: "11:30 - 12:30", subject: "Computer Science", teacher: "Mr. James Wilson", room: "Computer Lab" },
      { time: "12:30 - 01:30", subject: "Lunch Break", teacher: "", room: "" },
      { time: "01:30 - 02:30", subject: "Chemistry", teacher: "Dr. Michael Brown", room: "Lab 2" },
    ],
  },
  // ... (include all other days as before)
];

const getCurrentDay = () => {
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return days[new Date().getDay()];
};

export function StudentTimetable() {
  const currentDay = getCurrentDay();

  return (
    <div className="space-y-8 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white">Class Timetable</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">Your weekly academic schedule</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-4 py-2 rounded-full">
          <Clock className="h-4 w-4" />
          Today: <span className="font-semibold">{currentDay}</span>
        </div>
      </div>

      {/* Today's Highlight */}
      {timetable.find(d => d.day === currentDay) && (
        <Card className="border-blue-500 dark:border-blue-400 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-blue-700 dark:text-blue-300">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
              Today's Schedule — {currentDay}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {timetable.find(d => d.day === currentDay)?.classes.map((cls, i) => (
                <div
                  key={i}
                  className="p-5 rounded-2xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-gray-900"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-lg text-gray-900 dark:text-white">{cls.subject}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{cls.teacher}</p>
                    </div>
                    <Badge variant="outline" className="font-mono text-xs">
                      {cls.time}
                    </Badge>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <MapPin className="h-4 w-4" />
                    {cls.room}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Weekly Timetable */}
      <div className="space-y-6">
        {timetable.map((day) => {
          const isToday = day.day === currentDay;
          return (
            <Card 
              key={day.day} 
              className={`transition-all duration-300 ${isToday ? "border-blue-500 shadow-md" : "hover:shadow-md"}`}
            >
              <CardHeader className={isToday ? "bg-blue-50 dark:bg-blue-950" : ""}>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>{day.day}</span>
                  {isToday && <Badge className="bg-blue-600 hover:bg-blue-700">Today</Badge>}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-2">
                <div className="space-y-3">
                  {day.classes.map((cls, index) => {
                    const isBreak = cls.subject.includes("Break") || cls.subject.includes("Lunch");
                    return (
                      <div
                        key={index}
                        className={`flex flex-col sm:flex-row sm:items-center gap-4 p-5 rounded-2xl border transition-all hover:shadow-sm ${
                          isBreak 
                            ? "bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700" 
                            : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                        }`}
                      >
                        <div className="flex items-center gap-4 min-w-[140px]">
                          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-lg font-mono text-sm border border-gray-200 dark:border-gray-700">
                            {cls.time}
                          </div>
                        </div>

                        <div className="flex-1 min-w-0">
                          <p className={`font-semibold text-lg ${isBreak ? "text-gray-600 dark:text-gray-400 italic" : "text-gray-900 dark:text-white"}`}>
                            {cls.subject}
                          </p>
                          {!isBreak && (
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mt-1">
                              <User className="h-4 w-4" />
                              {cls.teacher}
                            </p>
                          )}
                        </div>

                        {!isBreak && (
                          <Badge variant="outline" className="font-mono whitespace-nowrap">
                            {cls.room}
                          </Badge>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}