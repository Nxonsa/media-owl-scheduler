import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const Schedule = () => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [requirements, setRequirements] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { toast } = useToast();

  // Simulated busy times (in reality, this would come from an API)
  const busyTimes = [
    new Date("2024-03-20T14:00:00"),
    new Date("2024-03-21T15:00:00"),
  ];

  // Public holidays (this would typically come from an API)
  const publicHolidays = [
    new Date("2024-03-21"), // Human Rights Day
    new Date("2024-03-29"), // Good Friday
    new Date("2024-04-01"), // Family Day
    // Add more public holidays as needed
  ];

  const isDateDisabled = (date: Date) => {
    // Disable weekends
    if (date.getDay() === 0 || date.getDay() === 6) return true;
    
    // Disable dates before today
    if (date < new Date()) return true;
    
    // Disable public holidays
    if (publicHolidays.some(holiday => 
      holiday.toDateString() === date.toDateString()
    )) return true;
    
    // Disable busy times
    return busyTimes.some(
      (busyTime) => busyTime.toDateString() === date.toDateString()
    );
  };

  const availableTimes = [
    "09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!date || !time || !requirements || !name || !email || !phone) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Submit to Google Sheets
      const response = await fetch('https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec', {
        method: 'POST',
        body: JSON.stringify({
          name,
          email,
          phone,
          date: date.toISOString(),
          time,
          requirements,
          type: "Meeting Schedule",
          timestamp: new Date().toISOString()
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: "Meeting Scheduled!",
          description: "You will receive a confirmation shortly.",
        });
        // Reset form
        setDate(undefined);
        setTime("");
        setRequirements("");
        setName("");
        setEmail("");
        setPhone("");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule meeting. Please try again.",
        variant: "destructive",
      });
    }
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
              <label className="block text-sm font-medium mb-2">Name</label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone</label>
              <Input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Time
              </label>
              <Select onValueChange={setTime} value={time}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a time" />
                </SelectTrigger>
                <SelectContent>
                  {availableTimes.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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