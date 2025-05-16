
import DashboardLayout from '@/components/layout/DashboardLayout';
import HolidayList from '@/components/holidays/HolidayList';
import { mockHolidays } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import HolidayListSettings from '@/components/admin/HolidayListSettings';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Holiday } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const HolidaysPage = () => {
  const { toast } = useToast();
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("holidays");
  const [holidays, setHolidays] = useState<Holiday[]>(mockHolidays);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newHoliday, setNewHoliday] = useState<Partial<Holiday>>({
    title: '',
    date: new Date().toISOString(),
    description: '',
  });
  
  const handleAddHoliday = () => {
    if (!hasPermission(['admin'])) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can add holidays.",
        variant: "destructive"
      });
      return;
    }
    
    setDialogOpen(true);
  };

  const handleSubmitHoliday = () => {
    if (!newHoliday.title || !newHoliday.date) {
      toast({
        title: "Missing Information",
        description: "Please provide both name and date for the holiday.",
        variant: "destructive"
      });
      return;
    }

    const holiday: Holiday = {
      id: uuidv4(),
      title: newHoliday.title,
      date: newHoliday.date,
      description: newHoliday.description || '',
    };

    setHolidays([...holidays, holiday]);
    setDialogOpen(false);
    setNewHoliday({
      title: '',
      date: new Date().toISOString(),
      description: '',
    });
    
    toast({
      title: "Holiday Added",
      description: "The holiday has been added successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Holidays</h1>
        
        {hasPermission(['admin']) && (
          <Tabs defaultValue="holidays" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="holidays">Holidays</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="holidays">
              <Card className="border-0 shadow-none">
                <HolidayList 
                  holidays={holidays} 
                  onAddHoliday={handleAddHoliday} 
                />
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card className="border-0 shadow-none">
                <HolidayListSettings />
              </Card>
            </TabsContent>
          </Tabs>
        )}
        
        {!hasPermission(['admin']) && (
          <HolidayList 
            holidays={holidays} 
            onAddHoliday={undefined} 
          />
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Holiday</DialogTitle>
              <DialogDescription>
                Create a new holiday to be added to the calendar.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Holiday Name</Label>
                <Input
                  id="title"
                  value={newHoliday.title}
                  onChange={(e) => setNewHoliday({...newHoliday, title: e.target.value})}
                  placeholder="Enter holiday name"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : new Date();
                    setNewHoliday({
                      ...newHoliday, 
                      date: date.toISOString()
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newHoliday.description}
                  onChange={(e) => setNewHoliday({...newHoliday, description: e.target.value})}
                  placeholder="Enter holiday description"
                  rows={3}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitHoliday}>Add Holiday</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default HolidaysPage;
