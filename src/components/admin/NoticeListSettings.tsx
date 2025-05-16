
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileText, Settings } from "lucide-react";

const NoticeListSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Settings className="h-5 w-5 mr-2 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Notice Board Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>
            Configure how notices are displayed to users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-expired">Show Expired Notices</Label>
              <Switch id="show-expired" defaultChecked={false} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-archive">Auto-Archive Expired Notices</Label>
              <Switch id="auto-archive" defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="notices-per-page">Notices Per Page</Label>
              <Select defaultValue="10">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="15">15</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notice Categories</CardTitle>
          <CardDescription>
            Manage the categories for notices
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input placeholder="Add new category" />
            <Button>Add</Button>
          </div>
          <div className="border rounded-md p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>General</span>
                </div>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Academic</span>
                </div>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Examinations</span>
                </div>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};

export default NoticeListSettings;
