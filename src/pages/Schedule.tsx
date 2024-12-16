import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [requirements, setRequirements] = useState("");
  const { toast } = useToast();

  // Simulated busy times (in reality, this would come from an API)
  const busyTimes = [
    new Date("2024-03-20T14:00:00"),
    new Date("2024-03-21T15:00:00"),
  ];

  const isDateDisabled = (date: Date) => {
    // Disable weekends
    if (date.getDay() === 0 || date.getDay() === 6) return true;
    
    // Disable dates before today
    if (date < new Date()) return true;
    
    // Disable busy times
    return busyTimes.some(
      (busyTime) => busyTime.toDateString() === date.toDateString()
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !requirements) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    // Here you would typically send this to your backend
    const meetingDetails = {
      date,
      requirements,
      zoomId: "976 421 7931",
    };

    console.log("Scheduling meeting:", meetingDetails);
    
    toast({
      title: "Meeting Scheduled!",
      description: "You will receive a confirmation email shortly.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-4xl font-bold mb-8">Schedule a Call</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Select a Date</h2>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            disabled={isDateDisabled}
            className="rounded-md border"
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Meeting Details</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                What do you require?
              </label>
              <Textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="Please describe your project requirements..."
                className="min-h-[150px]"
              />
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Meeting will be held via Zoom
                <br />
                Personal Meeting ID: 976 421 7931
              </p>
            </div>
            <Button type="submit" className="w-full">
              Schedule Meeting
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Schedule;