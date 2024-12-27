import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import emailjs from '@emailjs/browser';
import { useState } from "react";

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    try {
      // First, send email via EmailJS
      const templateParams = {
        from_name: formData.get('name'),
        from_email: formData.get('email'),
        message: formData.get('message'),
        to_email: "admin@mediaowl.co.za",
      };

      console.log("Sending email to admin@mediaowl.co.za");
      console.log("Message details:", templateParams);

      // Send to EmailJS (you'll need to replace these values)
      await emailjs.send(
        'YOUR_SERVICE_ID',
        'YOUR_TEMPLATE_ID',
        templateParams,
        'YOUR_PUBLIC_KEY'
      );

      // Then, submit to Google Sheets
      const response = await fetch('https://script.google.com/macros/s/YOUR_GOOGLE_SCRIPT_ID/exec', {
        method: 'POST',
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: "Newsletter Signup",
          timestamp: new Date().toISOString()
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast({
          title: "Thank you for signing up!",
          description: "You'll be the first to hear about our sales and upcoming opportunities.",
        });
        form.reset();
      }
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Error",
        description: "Please try again later or contact us directly at admin@mediaowl.co.za",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Sign Up for Updates</h2>
            <p className="text-muted-foreground">
              Be the first to hear about our sales and upcoming opportunities!
            </p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="John Doe"
                  required
                  className="w-full"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  className="w-full"
                />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message (Optional)
              </label>
              <Textarea
                id="message"
                name="message"
                placeholder="Any specific interests or questions?"
                className="w-full min-h-[150px]"
              />
            </div>
            <Button 
              type="submit" 
              size="lg" 
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing Up..." : "Sign Up for Updates"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;