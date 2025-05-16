
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { CalendarCheck, Settings } from "lucide-react";

const HolidayListSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Settings className="h-5 w-5 mr-2 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Holiday Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>
            Configure how holidays are displayed to users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-past">Show Past Holidays</Label>
              <Switch id="show-past" defaultChecked={true} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="group-by">Default Grouping</Label>
              <Select defaultValue="month">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Month" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">Month</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Holiday Types</CardTitle>
          <CardDescription>
            Manage the types of holidays
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input placeholder="Add new holiday type" />
            <Button>Add</Button>
          </div>
          <div className="border rounded-md p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  <span>National</span>
                </div>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  <span>Religious</span>
                </div>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <CalendarCheck className="h-4 w-4 mr-2" />
                  <span>Academic</span>
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

export default HolidayListSettings;
