
import { CalendarCheck, CalendarDays, Bell, FileText } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { mockEvents, mockNotices, mockExamSchedules } from '@/data/mockData';
import EventTypeCard from '@/components/dashboard/EventTypeCard';
import RecentNotices from '@/components/dashboard/RecentNotices';
import UpcomingEvents from '@/components/dashboard/UpcomingEvents';
import { useAuth } from '@/hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();
  
  // Count events by type
  const holidayEvents = mockEvents.filter(event => event.eventType === 'holiday').length;
  const examEvents = mockEvents.filter(event => event.eventType === 'exam').length;
  const classEvents = mockEvents.filter(event => event.eventType === 'class').length;
  const seminarEvents = mockEvents.filter(event => event.eventType === 'seminar').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <EventTypeCard 
            title="Holidays" 
            count={holidayEvents} 
            icon={<CalendarCheck className="h-5 w-5" />}
            colorClass="bg-[hsl(var(--event-holiday))]"
          />
          <EventTypeCard 
            title="Exams" 
            count={examEvents} 
            icon={<FileText className="h-5 w-5" />}
            colorClass="bg-[hsl(var(--event-exam))]"
          />
          <EventTypeCard 
            title="Classes" 
            count={classEvents} 
            icon={<CalendarDays className="h-5 w-5" />}
            colorClass="bg-[hsl(var(--event-class))]"
          />
          <EventTypeCard 
            title="Seminars" 
            count={seminarEvents} 
            icon={<Bell className="h-5 w-5" />}
            colorClass="bg-[hsl(var(--event-seminar))]"
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-2">
          <RecentNotices notices={mockNotices} />
          <UpcomingEvents events={mockEvents} />
        </div>
        
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Upcoming Exams</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {mockExamSchedules.slice(0, 4).map(exam => (
              <div key={exam.id} className="border rounded-md p-4">
                <h3 className="font-medium text-lg">{exam.subject}</h3>
                <div className="text-sm text-muted-foreground mb-2">{exam.examType}</div>
                <div className="flex items-center justify-between text-sm">
                  <div>Date: {exam.date}</div>
                  <div>Time: {exam.time}</div>
                </div>
                <div className="text-sm mt-1">Room: {exam.room}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
