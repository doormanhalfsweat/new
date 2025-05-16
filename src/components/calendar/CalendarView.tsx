
import { useState } from 'react';
import { format, parseISO, isWithinInterval, addDays } from 'date-fns';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { CalendarEvent } from '@/types';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface CalendarViewProps {
  events: CalendarEvent[];
  onAddEvent?: () => void;
}

const CalendarView = ({ events, onAddEvent }: CalendarViewProps) => {
  const [date, setDate] = useState<Date>(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedEventTypes, setSelectedEventTypes] = useState<Record<string, boolean>>({
    holiday: true,
    exam: true,
    class: true,
    seminar: true,
  });
  const { user } = useAuth();

  const getEventBadgeClass = (eventType: string) => {
    switch (eventType) {
      case 'holiday': return 'event-holiday';
      case 'exam': return 'event-exam';
      case 'class': return 'event-class';
      case 'seminar': return 'event-seminar';
      default: return 'bg-primary';
    }
  };

  const filteredEvents = events.filter(event => selectedEventTypes[event.eventType]);

  const getEventsForDate = (date: Date) => {
    return filteredEvents.filter(event => {
      const startDate = parseISO(event.startDate);
      const endDate = parseISO(event.endDate);
      return isWithinInterval(date, { start: startDate, end: endDate });
    });
  };

  const getDaysInView = () => {
    const days = [];
    if (view === 'day') {
      days.push(date);
    } else if (view === 'week') {
      const currentDay = date.getDay(); // 0 (Sunday) to 6 (Saturday)
      const sunday = addDays(date, -currentDay);
      for (let i = 0; i < 7; i++) {
        days.push(addDays(sunday, i));
      }
    } else {
      // For month view, we'll just handle it differently
    }
    return days;
  };

  const toggleEventType = (type: string) => {
    setSelectedEventTypes(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const nextView = () => {
    if (view === 'day') {
      setDate(addDays(date, 1));
    } else if (view === 'week') {
      setDate(addDays(date, 7));
    } else {
      const nextMonth = new Date(date);
      nextMonth.setMonth(nextMonth.getMonth() + 1);
      setDate(nextMonth);
    }
  };

  const prevView = () => {
    if (view === 'day') {
      setDate(addDays(date, -1));
    } else if (view === 'week') {
      setDate(addDays(date, -7));
    } else {
      const prevMonth = new Date(date);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      setDate(prevMonth);
    }
  };

  const renderMonthView = () => {
    return (
      <div className="rounded-md border">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(newDate) => newDate && setDate(newDate)}
          className="rounded-md p-3 pointer-events-auto"
          components={{
            DayContent: (props) => {
              const eventsOnDay = getEventsForDate(props.date);
              return (
                <div className="relative">
                  <div>{props.date.getDate()}</div>
                  {eventsOnDay.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 flex justify-center">
                      <div className="flex space-x-0.5">
                        {eventsOnDay.slice(0, 3).map((event, idx) => (
                          <div 
                            key={idx} 
                            className={`h-1 w-1 rounded-full ${getEventBadgeClass(event.eventType)}`}
                          ></div>
                        ))}
                        {eventsOnDay.length > 3 && (
                          <div className="h-1 w-1 rounded-full bg-gray-400"></div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            },
          }}
        />
      </div>
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2">
          <Button onClick={prevView} size="icon" variant="outline">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center">
            <CalendarIcon className="h-5 w-5 mr-2 text-muted-foreground" />
            <h2 className="text-xl font-semibold">
              {view === 'month' && format(date, 'MMMM yyyy')}
              {view === 'week' && `Week of ${format(date, 'MMM d, yyyy')}`}
              {view === 'day' && format(date, 'EEEE, MMMM d, yyyy')}
            </h2>
          </div>
          <Button onClick={nextView} size="icon" variant="outline">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex items-center gap-2">
          <Select 
            defaultValue="month" 
            onValueChange={(value) => setView(value as 'month' | 'week' | 'day')}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="View" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Month</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="day">Day</SelectItem>
            </SelectContent>
          </Select>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter Events</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem 
                checked={selectedEventTypes.holiday}
                onCheckedChange={() => toggleEventType('holiday')}
              >
                <span className="flex items-center">
                  <Badge className="event-holiday mr-2">Holiday</Badge>
                  Holidays
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedEventTypes.exam}
                onCheckedChange={() => toggleEventType('exam')}
              >
                <span className="flex items-center">
                  <Badge className="event-exam mr-2">Exam</Badge>
                  Exams
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedEventTypes.class}
                onCheckedChange={() => toggleEventType('class')}
              >
                <span className="flex items-center">
                  <Badge className="event-class mr-2">Class</Badge>
                  Classes
                </span>
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={selectedEventTypes.seminar}
                onCheckedChange={() => toggleEventType('seminar')}
              >
                <span className="flex items-center">
                  <Badge className="event-seminar mr-2">Seminar</Badge>
                  Seminars
                </span>
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {user?.role === 'admin' && onAddEvent && (
            <Button onClick={onAddEvent}>
              Add Event
            </Button>
          )}
        </div>
      </div>

      {view === 'month' && renderMonthView()}
      
      {/* Events List for Selected Date */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            Events for {format(date, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {getEventsForDate(date).length > 0 ? (
              getEventsForDate(date).map(event => (
                <div key={event.id} className="flex items-start border-l-4 pl-4 py-2 rounded-sm" style={{borderColor: `hsl(var(--event-${event.eventType}))`}}>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-medium">{event.title}</h4>
                      <Badge className={getEventBadgeClass(event.eventType)} variant="secondary">
                        {event.eventType}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                    <p className="text-xs text-muted-foreground mt-2">
                      {format(parseISO(event.startDate), 'MMM d')} - {format(parseISO(event.endDate), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center py-4">No events scheduled for this date</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CalendarView;
