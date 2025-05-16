
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { CalendarCheck, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Holiday } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface HolidayListProps {
  holidays: Holiday[];
  onAddHoliday?: () => void;
}

const HolidayList = ({ holidays, onAddHoliday }: HolidayListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useAuth();
  
  const filteredHolidays = holidays.filter(holiday => 
    holiday.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (holiday.description && holiday.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Sort by date
  const sortedHolidays = [...filteredHolidays].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  
  // Group holidays by month
  const holidaysByMonth = sortedHolidays.reduce((acc, holiday) => {
    const date = parseISO(holiday.date);
    const monthYear = format(date, 'MMMM yyyy');
    
    if (!acc[monthYear]) {
      acc[monthYear] = [];
    }
    
    acc[monthYear].push(holiday);
    return acc;
  }, {} as Record<string, Holiday[]>);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <CalendarCheck className="h-5 w-5 mr-2 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Holidays</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search holidays..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          {user?.role === 'admin' && onAddHoliday && (
            <Button onClick={onAddHoliday}>
              Add Holiday
            </Button>
          )}
        </div>
      </div>
      
      {Object.keys(holidaysByMonth).length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
          {Object.entries(holidaysByMonth).map(([monthYear, monthHolidays]) => (
            <Card key={monthYear}>
              <CardHeader className="bg-muted/50">
                <CardTitle className="text-lg">{monthYear}</CardTitle>
              </CardHeader>
              <CardContent className="pt-4">
                <ul className="space-y-3">
                  {monthHolidays.map(holiday => (
                    <li key={holiday.id} className="flex items-start">
                      <div className="bg-primary/10 text-primary font-medium rounded p-2 w-10 h-10 flex items-center justify-center mr-3">
                        {format(parseISO(holiday.date), 'd')}
                      </div>
                      <div>
                        <h4 className="font-medium">{holiday.title}</h4>
                        {holiday.description && (
                          <p className="text-sm text-muted-foreground">{holiday.description}</p>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">
                          {format(parseISO(holiday.date), 'EEEE, MMMM d, yyyy')}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-8">
            <CalendarCheck className="h-10 w-10 text-muted-foreground mb-2" />
            <p className="text-lg font-medium">No holidays found</p>
            <p className="text-sm text-muted-foreground">
              {searchTerm ? "Try adjusting your search term" : "There are no holidays available"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default HolidayList;
