
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarEvent } from '@/types';
import { CalendarDays, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format, parseISO } from 'date-fns';

interface UpcomingEventsProps {
  events: CalendarEvent[];
}

const getEventBadgeClass = (eventType: string) => {
  switch (eventType) {
    case 'holiday': return 'event-holiday';
    case 'exam': return 'event-exam';
    case 'class': return 'event-class';
    case 'seminar': return 'event-seminar';
    default: return 'bg-primary';
  }
};

const UpcomingEvents = ({ events }: UpcomingEventsProps) => {
  // Sort events by start date and take the nearest 3
  const upcomingEvents = [...events]
    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
    .slice(0, 3);

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <CalendarDays className="h-5 w-5 mr-2" />
            Upcoming Events
          </CardTitle>
          <Link to="/calendar">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </div>
        <CardDescription>Events happening soon</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="border rounded-md p-3">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium">{event.title}</h4>
                <Badge className={getEventBadgeClass(event.eventType)} variant="secondary">
                  {event.eventType}
                </Badge>
              </div>
              <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {event.description}
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                <span>
                  {format(parseISO(event.startDate), 'MMM d')} - {format(parseISO(event.endDate), 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Link to="/calendar" className="w-full">
          <Button className="w-full" variant="outline">
            View Calendar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default UpcomingEvents;
