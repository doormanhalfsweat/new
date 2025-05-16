
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CalendarDays, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type EventType = {
  id: string;
  name: string;
  color: string;
};

const CalendarSettings = () => {
  const { toast } = useToast();
  const [eventTypes, setEventTypes] = useState<EventType[]>([
    { id: "holiday", name: "Holiday", color: "var(--event-holiday)" },
    { id: "exam", name: "Exam", color: "var(--event-exam)" },
    { id: "class", name: "Class", color: "var(--event-class)" },
    { id: "seminar", name: "Seminar", color: "var(--event-seminar)" },
  ]);
  const [newEventType, setNewEventType] = useState("");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentEditType, setCurrentEditType] = useState<EventType | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState("");
  
  const handleAddEventType = () => {
    if (!newEventType.trim()) {
      toast({
        title: "Error",
        description: "Event type name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    const id = newEventType.toLowerCase().replace(/\s+/g, '-');
    
    if (eventTypes.some(type => type.id === id)) {
      toast({
        title: "Error",
        description: "This event type already exists",
        variant: "destructive",
      });
      return;
    }
    
    setEventTypes([
      ...eventTypes, 
      { id, name: newEventType, color: "var(--primary)" }
    ]);
    setNewEventType("");
    
    toast({
      title: "Success",
      description: "New event type added",
    });
  };
  
  const openEditDialog = (type: EventType) => {
    setCurrentEditType(type);
    setEditName(type.name);
    setEditColor(type.color);
    setIsEditDialogOpen(true);
  };
  
  const handleEditSave = () => {
    if (!editName.trim() || !currentEditType) {
      toast({
        title: "Error",
        description: "Event type name cannot be empty",
        variant: "destructive",
      });
      return;
    }
    
    setEventTypes(eventTypes.map(type => 
      type.id === currentEditType.id 
        ? { ...type, name: editName, color: editColor }
        : type
    ));
    
    setIsEditDialogOpen(false);
    
    toast({
      title: "Success",
      description: "Event type updated successfully",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Settings className="h-5 w-5 mr-2 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Calendar Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>
            Configure how the calendar is displayed to users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="default-view">Default View</Label>
              <Select defaultValue="month">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="week">Week</SelectItem>
                  <SelectItem value="day">Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="start-day">Week Starts On</Label>
              <Select defaultValue="sunday">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Sunday" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sunday">Sunday</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="show-weekends">Show Weekends</Label>
              <Switch id="show-weekends" defaultChecked={true} />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Event Types</CardTitle>
          <CardDescription>
            Manage the types of events that can be added to the calendar
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input 
              placeholder="Add new event type" 
              value={newEventType}
              onChange={(e) => setNewEventType(e.target.value)}
            />
            <Button onClick={handleAddEventType}>Add</Button>
          </div>
          <div className="border rounded-md p-4">
            <div className="space-y-2">
              {eventTypes.map((type) => (
                <div key={type.id} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                  <div className="flex items-center">
                    <div 
                      className="h-3 w-3 rounded-full mr-2"
                      style={{ backgroundColor: type.color }}
                    ></div>
                    <span>{type.name}</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => openEditDialog(type)}>
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Event Type</DialogTitle>
            <DialogDescription>
              Make changes to the event type properties
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <div className="col-span-3 flex gap-2 items-center">
                <input
                  type="color"
                  id="color"
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                  className="w-8 h-8 p-0 border-0"
                />
                <Input
                  value={editColor}
                  onChange={(e) => setEditColor(e.target.value)}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CalendarSettings;
