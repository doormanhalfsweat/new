
import { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { FileText, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExamSchedule } from '@/types';
import { useAuth } from '@/hooks/useAuth';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExamScheduleTableProps {
  exams: ExamSchedule[];
  onAddExam?: () => void;
}

const ExamScheduleTable = ({ exams, onAddExam }: ExamScheduleTableProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const { user } = useAuth();
  
  // Get unique exam types
  const examTypes = ['all', ...Array.from(new Set(exams.map(exam => exam.examType)))];
  
  const filteredExams = exams.filter(exam => {
    const matchesSearch = 
      exam.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.examType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exam.room.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || exam.examType === filterType;
    
    return matchesSearch && matchesType;
  });
  
  // Sort by date
  const sortedExams = [...filteredExams].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center">
          <FileText className="h-5 w-5 mr-2 text-muted-foreground" />
          <h2 className="text-xl font-semibold">Exam Schedule</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search exams..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <Select 
            defaultValue="all" 
            onValueChange={setFilterType}
          >
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              {examTypes.map(type => (
                <SelectItem key={type} value={type}>
                  {type === 'all' ? 'All Types' : type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {(user?.role === 'admin' || user?.role === 'teacher') && onAddExam && (
            <Button onClick={onAddExam}>
              Add Exam
            </Button>
          )}
        </div>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableCaption>
            {sortedExams.length === 0
              ? "No exams found matching your criteria"
              : `Showing ${sortedExams.length} exam schedules`}
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Room</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedExams.map(exam => (
              <TableRow key={exam.id}>
                <TableCell className="font-medium">{exam.subject}</TableCell>
                <TableCell>{exam.examType}</TableCell>
                <TableCell>{format(parseISO(exam.date), 'MMMM d, yyyy')}</TableCell>
                <TableCell>{exam.time}</TableCell>
                <TableCell>{exam.room}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExamScheduleTable;
