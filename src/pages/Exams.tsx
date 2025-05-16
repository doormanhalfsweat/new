
import DashboardLayout from '@/components/layout/DashboardLayout';
import ExamScheduleTable from '@/components/exams/ExamScheduleTable';
import { mockExamSchedules } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ExamSettings from '@/components/admin/ExamSettings';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ExamSchedule } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const ExamsPage = () => {
  const { toast } = useToast();
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("exams");
  const [exams, setExams] = useState<ExamSchedule[]>(mockExamSchedules);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newExam, setNewExam] = useState<Partial<ExamSchedule>>({
    subject: '',
    examType: 'Mid-term',
    date: new Date().toISOString(),
    time: '09:00 AM - 11:00 AM',
    room: 'TBD',
  });
  
  const examTypes = ['Mid-term', 'Final', 'Quiz', 'Assignment'];
  const timeSlots = [
    '09:00 AM - 11:00 AM',
    '11:30 AM - 1:30 PM',
    '2:00 PM - 4:00 PM',
    '4:30 PM - 6:30 PM'
  ];
  
  const handleAddExam = () => {
    if (!hasPermission(['admin'])) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can add exam schedules.",
        variant: "destructive"
      });
      return;
    }
    
    setDialogOpen(true);
  };

  const handleSubmitExam = () => {
    if (!newExam.subject || !newExam.date || !newExam.time || !newExam.room) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const exam: ExamSchedule = {
      id: uuidv4(),
      subject: newExam.subject,
      examType: newExam.examType || 'Mid-term',
      date: newExam.date,
      time: newExam.time,
      room: newExam.room,
      createdBy: user?.id || 'system' // Adding the missing createdBy field
    };

    setExams([...exams, exam]);
    setDialogOpen(false);
    setNewExam({
      subject: '',
      examType: 'Mid-term',
      date: new Date().toISOString(),
      time: '09:00 AM - 11:00 AM',
      room: 'TBD',
    });
    
    toast({
      title: "Exam Added",
      description: "The exam schedule has been added successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Exam Schedule</h1>
        
        {hasPermission(['admin']) && (
          <Tabs defaultValue="exams" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="exams">Exams</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="exams">
              <Card className="border-0 shadow-none">
                <ExamScheduleTable 
                  exams={exams} 
                  onAddExam={handleAddExam} 
                />
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card className="border-0 shadow-none">
                <ExamSettings />
              </Card>
            </TabsContent>
          </Tabs>
        )}
        
        {!hasPermission(['admin']) && (
          <ExamScheduleTable 
            exams={exams} 
            onAddExam={undefined} 
          />
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Exam</DialogTitle>
              <DialogDescription>
                Add a new exam to the exam schedule.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  id="subject"
                  value={newExam.subject}
                  onChange={(e) => setNewExam({...newExam, subject: e.target.value})}
                  placeholder="Enter subject name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="examType">Exam Type</Label>
                <Select
                  value={newExam.examType}
                  onValueChange={(value) => setNewExam({...newExam, examType: value})}
                >
                  <SelectTrigger id="examType">
                    <SelectValue placeholder="Select exam type" />
                  </SelectTrigger>
                  <SelectContent>
                    {examTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : new Date();
                    setNewExam({
                      ...newExam, 
                      date: date.toISOString()
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="time">Time</Label>
                <Select
                  value={newExam.time}
                  onValueChange={(value) => setNewExam({...newExam, time: value})}
                >
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    {timeSlots.map((slot) => (
                      <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="room">Room</Label>
                <Input
                  id="room"
                  value={newExam.room}
                  onChange={(e) => setNewExam({...newExam, room: e.target.value})}
                  placeholder="Enter room number"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitExam}>Add Exam</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default ExamsPage;
