
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { FileText, Settings } from "lucide-react";

const ExamSettings = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center">
        <Settings className="h-5 w-5 mr-2 text-muted-foreground" />
        <h2 className="text-xl font-semibold">Exam Schedule Settings</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Display Settings</CardTitle>
          <CardDescription>
            Configure how exam schedules are displayed to users
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="show-past">Show Past Exams</Label>
              <Switch id="show-past" defaultChecked={false} />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="default-sort">Default Sort</Label>
              <Select defaultValue="date">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date</SelectItem>
                  <SelectItem value="subject">Subject</SelectItem>
                  <SelectItem value="type">Type</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Exam Types</CardTitle>
          <CardDescription>
            Manage the types of exams in the system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-2">
            <Input placeholder="Add new exam type" />
            <Button>Add</Button>
          </div>
          <div className="border rounded-md p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Mid-term</span>
                </div>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Final</span>
                </div>
                <Button variant="ghost" size="sm">Remove</Button>
              </div>
              <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                <div className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  <span>Quiz</span>
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

export default ExamSettings;
