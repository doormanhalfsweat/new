
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useToast } from '@/hooks/use-toast';
import AuthGuard from '@/components/auth/AuthGuard';

const SettingsPage = () => {
  const { toast } = useToast();
  
  const handleSaveSettings = (type: string) => {
    toast({
      title: "Settings Saved",
      description: `${type} settings have been updated successfully.`,
    });
  };

  return (
    <AuthGuard allowedRoles={['admin']}>
      <DashboardLayout>
        <div className="space-y-4">
          <h1 className="text-2xl font-bold">Settings</h1>
          
          <Tabs defaultValue="general">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="permissions">Permissions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <CardDescription>
                    Manage your system-wide settings and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="institution-name">Institution Name</Label>
                    <Input id="institution-name" defaultValue="Campus Connect Academy" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution-email">Contact Email</Label>
                    <Input id="institution-email" type="email" defaultValue="contact@campus-connect.edu" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="academic-year">Current Academic Year</Label>
                    <Input id="academic-year" defaultValue="2024-2025" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="institution-description">Institution Description</Label>
                    <Textarea 
                      id="institution-description" 
                      defaultValue="Campus Connect Academy is a leading educational institution providing quality education and modern facilities to students."
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="public-calendar" defaultChecked />
                    <Label htmlFor="public-calendar">Make calendar publicly accessible</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="public-notices" defaultChecked />
                    <Label htmlFor="public-notices">Make notice board publicly accessible</Label>
                  </div>
                  <Button onClick={() => handleSaveSettings('General')}>Save General Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>
                    Configure how notifications are sent to users.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="email-notifications" defaultChecked />
                    <Label htmlFor="email-notifications">Send email notifications for new notices</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="exam-reminders" defaultChecked />
                    <Label htmlFor="exam-reminders">Send exam schedule reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="holiday-reminders" />
                    <Label htmlFor="holiday-reminders">Send holiday reminders</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notification-digest" />
                    <Label htmlFor="notification-digest">Send daily notification digest</Label>
                  </div>
                  <Button onClick={() => handleSaveSettings('Notification')}>Save Notification Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="permissions">
              <Card>
                <CardHeader>
                  <CardTitle>Permission Settings</CardTitle>
                  <CardDescription>
                    Configure role-based permissions for system access.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-lg font-medium">Teacher Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="teacher-add-events" defaultChecked />
                      <Label htmlFor="teacher-add-events">Can add calendar events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="teacher-add-notices" defaultChecked />
                      <Label htmlFor="teacher-add-notices">Can add notices</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="teacher-add-exams" defaultChecked />
                      <Label htmlFor="teacher-add-exams">Can manage exam schedules</Label>
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-medium mt-6">Student Permissions</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch id="student-view-exams" defaultChecked />
                      <Label htmlFor="student-view-exams">Can view exam schedules</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="student-export-calendar" defaultChecked />
                      <Label htmlFor="student-export-calendar">Can export calendar events</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch id="student-download-notices" defaultChecked />
                      <Label htmlFor="student-download-notices">Can download notice attachments</Label>
                    </div>
                  </div>
                  <Button onClick={() => handleSaveSettings('Permission')}>Save Permission Settings</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </DashboardLayout>
    </AuthGuard>
  );
};

export default SettingsPage;
