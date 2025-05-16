
import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import CalendarView from '@/components/calendar/CalendarView';
import { mockEvents } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CalendarSettings from '@/components/admin/CalendarSettings';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarEvent } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const CalendarPage = () => {
  const { toast } = useToast();
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("calendar");
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: '',
    description: '',
    startDate: new Date().toISOString(),
    endDate: new Date().toISOString(),
    eventType: 'class',
  });
  
  const eventTypes = [
    { value: 'class', label: 'Class' },
    { value: 'holiday', label: 'Holiday' },
    { value: 'exam', label: 'Exam' },
    { value: 'seminar', label: 'Seminar' }
  ];
  
  const handleAddEvent = () => {
    if (!hasPermission(['admin'])) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can add events.",
        variant: "destructive"
      });
      return;
    }
    
    setDialogOpen(true);
  };

  const handleSubmitEvent = () => {
    if (!newEvent.title || !newEvent.startDate || !newEvent.eventType) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    // Ensure eventType is of the correct type
    const eventType = newEvent.eventType as "class" | "holiday" | "exam" | "seminar";
    
    const event: CalendarEvent = {
      id: uuidv4(),
      title: newEvent.title,
      description: newEvent.description || '',
      startDate: newEvent.startDate,
      endDate: newEvent.endDate || newEvent.startDate,
      eventType: eventType,
      createdBy: user?.id || 'system',
    };

    setEvents([...events, event]);
    setDialogOpen(false);
    setNewEvent({
      title: '',
      description: '',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      eventType: 'class',
    });
    
    toast({
      title: "Event Added",
      description: "The event has been added to the calendar successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Calendar</h1>
        
        {hasPermission(['admin']) && (
          <Tabs defaultValue="calendar" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="calendar">Calendar</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="calendar">
              <Card className="border-0 shadow-none">
                <CalendarView events={events} />
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card className="border-0 shadow-none">
                <CalendarSettings />
              </Card>
            </TabsContent>
          </Tabs>
        )}
        
        {!hasPermission(['admin']) && (
          <CalendarView events={events} />
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event to be displayed on the calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Event Title</Label>
                <Input
                  id="title"
                  value={newEvent.title || ''}
                  onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                  placeholder="Enter event title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={newEvent.description || ''}
                  onChange={(e) => setNewEvent({...newEvent, description: e.target.value})}
                  placeholder="Enter event description"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : new Date();
                    setNewEvent({
                      ...newEvent, 
                      startDate: date.toISOString()
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : new Date();
                    setNewEvent({
                      ...newEvent, 
                      endDate: date.toISOString()
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="eventType">Event Type</Label>
                <Select
                  value={newEvent.eventType}
                  onValueChange={(value: "class" | "holiday" | "exam" | "seminar") => 
                    setNewEvent({...newEvent, eventType: value})
                  }
                >
                  <SelectTrigger id="eventType">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitEvent}>Add Event</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default CalendarPage;
