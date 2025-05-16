
import { CalendarEvent, ExamSchedule, Holiday, Notice, User } from "@/types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin User",
    email: "admin@academy.edu",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Admin+User&background=6366F1&color=fff",
  },
  {
    id: "2",
    name: "Teacher Smith",
    email: "teacher@academy.edu",
    role: "teacher",
    avatar: "https://ui-avatars.com/api/?name=Teacher+Smith&background=22C55E&color=fff",
  },
  {
    id: "3",
    name: "Student Doe",
    email: "student@academy.edu",
    role: "student",
    avatar: "https://ui-avatars.com/api/?name=Student+Doe&background=3B82F6&color=fff",
  },
];

export const mockEvents: CalendarEvent[] = [
  {
    id: "1",
    title: "Spring Break",
    description: "Spring break for all students and faculty",
    eventType: "holiday",
    startDate: "2025-03-15",
    endDate: "2025-03-22",
    createdBy: "1",
  },
  {
    id: "2",
    title: "Midterm Examinations",
    description: "Midterm examination period",
    eventType: "exam",
    startDate: "2025-03-07",
    endDate: "2025-03-12",
    createdBy: "1",
  },
  {
    id: "3",
    title: "Final Examinations",
    description: "Final examination period",
    eventType: "exam",
    startDate: "2025-05-20",
    endDate: "2025-05-29",
    createdBy: "1",
  },
  {
    id: "4",
    title: "Computer Science Seminar",
    description: "Guest lecture by Dr. Jane Smith on AI Ethics",
    eventType: "seminar",
    startDate: "2025-04-10",
    endDate: "2025-04-10",
    createdBy: "2",
  },
  {
    id: "5",
    title: "Class Registration Opens",
    description: "Registration begins for next semester",
    eventType: "class",
    startDate: "2025-04-15",
    endDate: "2025-04-30",
    createdBy: "1",
  },
  {
    id: "6",
    title: "New Student Orientation",
    description: "Orientation for all incoming freshmen",
    eventType: "seminar",
    startDate: "2025-06-01",
    endDate: "2025-06-03",
    createdBy: "1",
  },
];

// Alias for mockEvents
export const mockCalendarEvents = mockEvents;

export const mockNotices: Notice[] = [
  {
    id: "1",
    title: "Library Hours Extended During Finals",
    content: "The library will remain open 24/7 during the final examination period from May 20-29, 2025.",
    postedBy: "1",
    postedDate: "2025-05-01",
    expiryDate: "2025-05-30",
  },
  {
    id: "2",
    title: "Campus Wi-Fi Maintenance",
    content: "Campus Wi-Fi will be down for maintenance on Saturday, March 5, from 2:00 AM to 6:00 AM.",
    postedBy: "1",
    postedDate: "2025-03-01",
    expiryDate: "2025-03-06",
  },
  {
    id: "3",
    title: "Scholarship Applications Now Open",
    content: "Applications for the Fall 2025 Merit Scholarship are now open. Deadline is April 15.",
    fileUrl: "/files/scholarship_application.pdf",
    postedBy: "1",
    postedDate: "2025-02-15",
    expiryDate: "2025-04-15",
  },
  {
    id: "4",
    title: "Computer Science Department Faculty Opening",
    content: "The Computer Science Department is accepting applications for Assistant Professor position.",
    postedBy: "2",
    postedDate: "2025-01-20",
    expiryDate: "2025-03-20",
  },
  {
    id: "5",
    title: "Student Council Elections",
    content: "Nominations for Student Council positions are now open. Submit your application by March 30.",
    postedBy: "1",
    postedDate: "2025-03-10",
    expiryDate: "2025-03-30",
  },
];

export const mockExamSchedules: ExamSchedule[] = [
  {
    id: "1",
    subject: "Computer Science 101",
    examType: "Midterm",
    date: "2025-03-09",
    time: "10:00 AM - 12:00 PM",
    room: "Hall A",
    createdBy: "1",
  },
  {
    id: "2",
    subject: "Mathematics 202",
    examType: "Midterm",
    date: "2025-03-10",
    time: "2:00 PM - 4:00 PM",
    room: "Hall B",
    createdBy: "1",
  },
  {
    id: "3",
    subject: "Physics 101",
    examType: "Midterm",
    date: "2025-03-11",
    time: "9:00 AM - 11:00 AM",
    room: "Lab 1",
    createdBy: "1",
  },
  {
    id: "4",
    subject: "Computer Science 101",
    examType: "Final",
    date: "2025-05-22",
    time: "10:00 AM - 1:00 PM",
    room: "Hall A",
    createdBy: "1",
  },
  {
    id: "5",
    subject: "Mathematics 202",
    examType: "Final",
    date: "2025-05-24",
    time: "2:00 PM - 5:00 PM",
    room: "Hall B",
    createdBy: "1",
  },
  {
    id: "6",
    subject: "Physics 101",
    examType: "Final",
    date: "2025-05-26",
    time: "9:00 AM - 12:00 PM",
    room: "Lab 1",
    createdBy: "1",
  },
];

export const mockHolidays: Holiday[] = [
  {
    id: "1",
    title: "New Year's Day",
    description: "New Year's Day national holiday",
    date: "2025-01-01",
  },
  {
    id: "2",
    title: "Martin Luther King Jr. Day",
    description: "Martin Luther King Jr. Day national holiday",
    date: "2025-01-20",
  },
  {
    id: "3",
    title: "Spring Break",
    description: "Spring break for all students and faculty",
    date: "2025-03-15",
  },
  {
    id: "4",
    title: "Memorial Day",
    description: "Memorial Day national holiday",
    date: "2025-05-26",
  },
  {
    id: "5",
    title: "Independence Day",
    description: "Independence Day national holiday",
    date: "2025-07-04",
  },
];
