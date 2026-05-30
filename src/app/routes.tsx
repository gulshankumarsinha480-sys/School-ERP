import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { StudentLayout } from "./components/StudentLayout";
import { LibrarianLayout } from "./components/LibrarianLayout";
import { InventoryLayout } from "./components/InventoryLayout";
import { Dashboard } from "./pages/Dashboard";
import { Attendance } from "./pages/Attendance";
import { Marks } from "./pages/Marks";
import { Notes } from "./pages/Notes";
import { Timetable } from "./pages/Timetable";
import { Assignments } from "./pages/Assignments";
import { Students } from "./pages/Students";
import { Communication } from "./pages/Communication";
import { StudentDashboard } from "./pages/student/StudentDashboard";
import { StudentMarks } from "./pages/student/StudentMarks";
import { StudentAssignments } from "./pages/student/StudentAssignments";
import { StudentAttendance } from "./pages/student/StudentAttendance";
import { StudentFees } from "./pages/student/StudentFees";
import { StudentTimetable } from "./pages/student/StudentTimetable";
import { StudentResources } from "./pages/student/StudentResources";
import { StudentCommunication } from "./pages/student/StudentCommunication";
import { InventoryDashboard } from "./pages/inventory/InventoryDashboard";
import { InventoryItems } from "./pages/inventory/InventoryItems";
import { LibraryDashboard } from "./pages/library/LibraryDashboard";
import { LibraryBooks } from "./pages/library/LibraryBooks";
import { LibraryIssueReturn } from "./pages/library/LibraryIssueReturn";
import { RoleSelector } from "./pages/RoleSelector";
import { Login } from "./pages/login/login";
import { PrincipalLayout } from "./components/principalLayout";
import { PrincipalDashboard } from "./pages/principal/principalDashboard";
import { PrincipalReports } from "./pages/principal/PrincipalReports";
import { PrincipalStudents } from "./pages/principal/PrincipalStudents";
import { PrincipalTeachers } from "./pages/principal/PrincipalTeachers";
import { PrincipalAttendance } from "./pages/principal/PrincipalAttendance";
import { PrincipalMarks } from "./pages/principal/PrincipalMarks";
import { PrincipalClassSetup } from "./pages/principal/PrincipalClassSetup";
import { PrincipalSectionSetup } from "./pages/principal/PrincipalSectionSetup"
import { PrincipalAssignments } from "./pages/principal/PrincipalAssignments";
import { PrincipalTimetable } from "./pages/principal/PrincipalTimetable";
import { PrincipalFinance } from "./pages/principal/PrincipalFinance";
import { PrincipalInventory } from "./pages/principal/PrincipalInventory";
import { PrincipalLibrary } from "./pages/principal/PrincipalLibrary";
import { PrincipalCommunication } from "./pages/principal/PrincipalCommunication";
import { PrincipalStudentSetup } from "./pages/principal/PrincipalStudentSetup";
import { PrincipalAcademicYear } from "./pages/principal/PrincipalAcademicYear";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Login,
  },
  {
    path: "/role-select",
    Component: RoleSelector,
  },
  {
    path: "/principal",
    Component: PrincipalLayout,
    children: [
      { index: true, Component: PrincipalDashboard },
      { path: "reports", Component: PrincipalReports },
      { path: "students", Component: PrincipalStudents },
      { path: "marks",  Component: PrincipalMarks},
      { path: "setup/AcademicYear", Component:  PrincipalAcademicYear},
      { path: "setup/students", Component: PrincipalStudentSetup },
      { path: "setup/classSetup", Component: PrincipalClassSetup },
      { path: "setup/sectionSetup", Component: PrincipalSectionSetup},

      { path: "teachers", Component: PrincipalTeachers },
      { path: "attendance", Component: PrincipalAttendance },
      { path: "marks", Component: PrincipalMarks },
      { path: "assignments", Component: PrincipalAssignments },
      { path: "timetable", Component: PrincipalTimetable },
      { path: "notes", Component: PrincipalAssignments },

      { path: "finance", Component: PrincipalFinance },
      { path: "inventory", Component: PrincipalInventory },
      { path: "library", Component: PrincipalLibrary },
      { path: "communication", Component: PrincipalCommunication },
    ],
  },
  {
    path: "/teacher",
    Component: Layout,
    children: [
      { index: true, Component: Dashboard },
      { path: "attendance", Component: Attendance },
      { path: "marks", Component: Marks },
      { path: "notes", Component: Notes },
      { path: "timetable", Component: Timetable },
      { path: "assignments", Component: Assignments },
      { path: "students", Component: Students },
      { path: "communication", Component: Communication },
    ],
  },
  {
    path: "/student",
    Component: StudentLayout,
    children: [
      { index: true, Component: StudentDashboard },
      { path: "marks", Component: StudentMarks },
      { path: "assignments", Component: StudentAssignments },
      { path: "attendance", Component: StudentAttendance },
      { path: "fees", Component: StudentFees },
      { path: "timetable", Component: StudentTimetable },
      { path: "resources", Component: StudentResources },
      { path: "communication", Component: StudentCommunication },
    ],
  },
  {
    path: "/librarian",
    Component: LibrarianLayout,
    children: [
      { index: true, Component: LibraryDashboard },
      { path: "books", Component: LibraryBooks },
      { path: "issue-return", Component: LibraryIssueReturn },
    ],
  },
  {
    path: "/inventory",
    Component: InventoryLayout,
    children: [
      { index: true, Component: InventoryDashboard },
      { path: "items", Component: InventoryItems },
    ],
  },
]);

