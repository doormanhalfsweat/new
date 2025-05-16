
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Notice } from '@/types';
import { Bell, CalendarIcon, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';

interface RecentNoticesProps {
  notices: Notice[];
}

const RecentNotices = ({ notices }: RecentNoticesProps) => {
  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl flex items-center">
            <Bell className="h-5 w-5 mr-2" />
            Recent Notices
          </CardTitle>
          <Link to="/notices">
            <Button variant="ghost" size="sm">View all</Button>
          </Link>
        </div>
        <CardDescription>Latest announcements and updates</CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <div className="space-y-4">
          {notices.slice(0, 3).map((notice) => (
            <div key={notice.id} className="border rounded-md p-3">
              <h4 className="font-medium mb-1">{notice.title}</h4>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                {notice.content}
              </p>
              <div className="flex items-center text-xs text-muted-foreground space-x-3">
                <div className="flex items-center">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  <span>{format(parseISO(notice.postedDate), 'MMM d, yyyy')}</span>
                </div>
                {notice.expiryDate && (
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Expires: {format(parseISO(notice.expiryDate), 'MMM d')}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        <Link to="/notices" className="w-full">
          <Button className="w-full" variant="outline">
            View All Notices
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default RecentNotices;
