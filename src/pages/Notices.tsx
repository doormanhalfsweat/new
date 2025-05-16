
import DashboardLayout from '@/components/layout/DashboardLayout';
import NoticeList from '@/components/notices/NoticeList';
import { mockNotices } from '@/data/mockData';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NoticeListSettings from '@/components/admin/NoticeListSettings';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Notice } from '@/types';
import { v4 as uuidv4 } from 'uuid';

const NoticesPage = () => {
  const { toast } = useToast();
  const { user, hasPermission } = useAuth();
  const [activeTab, setActiveTab] = useState<string>("notices");
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [newNotice, setNewNotice] = useState<Partial<Notice>>({
    title: '',
    content: '',
    postedDate: new Date().toISOString(),
  });
  
  const handleAddNotice = () => {
    if (!hasPermission(['admin'])) {
      toast({
        title: "Permission Denied",
        description: "Only administrators can add notices.",
        variant: "destructive"
      });
      return;
    }
    
    setDialogOpen(true);
  };

  const handleSubmitNotice = () => {
    if (!newNotice.title || !newNotice.content) {
      toast({
        title: "Missing Information",
        description: "Please provide both title and content for the notice.",
        variant: "destructive"
      });
      return;
    }

    const notice: Notice = {
      id: uuidv4(),
      title: newNotice.title,
      content: newNotice.content,
      postedDate: newNotice.postedDate || new Date().toISOString(),
      expiryDate: newNotice.expiryDate || undefined,
      fileUrl: newNotice.fileUrl || undefined,
      postedBy: user?.id || 'system' // Adding the missing postedBy field
    };

    setNotices([notice, ...notices]);
    setDialogOpen(false);
    setNewNotice({
      title: '',
      content: '',
      postedDate: new Date().toISOString(),
    });
    
    toast({
      title: "Notice Added",
      description: "Your notice has been published successfully.",
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h1 className="text-2xl font-bold">Notice Board</h1>
        
        {hasPermission(['admin']) && (
          <Tabs defaultValue="notices" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="notices">Notices</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="notices">
              <Card className="border-0 shadow-none">
                <NoticeList 
                  notices={notices} 
                  onAddNotice={handleAddNotice} 
                />
              </Card>
            </TabsContent>
            <TabsContent value="settings">
              <Card className="border-0 shadow-none">
                <NoticeListSettings />
              </Card>
            </TabsContent>
          </Tabs>
        )}
        
        {!hasPermission(['admin']) && (
          <NoticeList 
            notices={notices} 
            onAddNotice={undefined} 
          />
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Add New Notice</DialogTitle>
              <DialogDescription>
                Create a new notice to be published on the notice board.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Notice Title</Label>
                <Input
                  id="title"
                  value={newNotice.title}
                  onChange={(e) => setNewNotice({...newNotice, title: e.target.value})}
                  placeholder="Enter notice title"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  value={newNotice.content}
                  onChange={(e) => setNewNotice({...newNotice, content: e.target.value})}
                  placeholder="Enter notice content"
                  rows={5}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="expiry">Expiry Date (Optional)</Label>
                <Input
                  id="expiry"
                  type="date"
                  onChange={(e) => {
                    const date = e.target.value ? new Date(e.target.value) : null;
                    setNewNotice({
                      ...newNotice, 
                      expiryDate: date ? date.toISOString() : undefined
                    });
                  }}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="fileUrl">File URL (Optional)</Label>
                <Input
                  id="fileUrl"
                  value={newNotice.fileUrl || ''}
                  onChange={(e) => setNewNotice({...newNotice, fileUrl: e.target.value})}
                  placeholder="https://example.com/file.pdf"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSubmitNotice}>Publish Notice</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
};

export default NoticesPage;
