
export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  eventType: 'holiday' | 'exam' | 'class' | 'seminar';
  startDate: string;
  endDate: string;
  createdBy: string;
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  fileUrl?: string;
  postedBy: string;
  postedDate: string;
  expiryDate?: string;
}

export interface ExamSchedule {
  id: string;
  subject: string;
  examType: string;
  date: string;
  time: string;
  room: string;
  createdBy: string;
}

export interface Holiday {
  id: string;
  title: string;
  description?: string;
  date: string;
}
