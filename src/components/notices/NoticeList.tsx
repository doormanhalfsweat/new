
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { Bell, CalendarIcon, Download, FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Notice } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { Badge } from '@/components/ui/badge';

interface NoticeListProps {
  notices: Notice[];
  onAddNotice?: () => void;
}

const NoticeList = ({ notices, onAddNotice }: NoticeListProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const { user } = useAuth();
  
  const filteredNotices = notices.filter(notice => 
    notice.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notice.content.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const sortedNotices = [...filteredNotices].sort((a, b) => {
    const dateA = new Date(a.postedDate).getTime();
    const dateB = new Date(b.postedDate).getTime();
    return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <Bell className="h-5 w-5 mr-2 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Notice Board</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search notices..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select 
            defaultValue="newest" 
            onValueChange={(value) => setSortBy(value as 'newest' | 'oldest')}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
            </SelectContent>
          </Select>
          
          {user?.role === 'admin' && onAddNotice && (
            <Button onClick={onAddNotice}>
              Add Notice
            </Button>
          )}
        </div>
      </div>
      
      <div className="grid gap-4">
        {sortedNotices.length > 0 ? (
          sortedNotices.map(notice => (
            <Card key={notice.id}>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{notice.title}</CardTitle>
                  {new Date(notice.postedDate) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) && (
                    <Badge variant="outline" className="bg-blue-100">New</Badge>
                  )}
                </div>
                <CardDescription className="flex items-center text-xs">
                  <CalendarIcon className="h-3 w-3 mr-1" />
                  Posted on {format(parseISO(notice.postedDate), 'MMMM d, yyyy')}
                  {notice.expiryDate && (
                    <span className="ml-2">
                      (Expires: {format(parseISO(notice.expiryDate), 'MMMM d, yyyy')})
                    </span>
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4">{notice.content}</p>
                {notice.fileUrl && (
                  <Button variant="outline" size="sm" className="flex items-center gap-1">
                    <FileText className="h-4 w-4" />
                    <span>View Attachment</span>
                    <Download className="h-4 w-4 ml-1" />
                  </Button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <Bell className="h-10 w-10 text-muted-foreground mb-2" />
              <p className="text-lg font-medium">No notices found</p>
              <p className="text-sm text-muted-foreground">
                {searchTerm ? "Try adjusting your search term" : "There are no notices available"}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default NoticeList;
