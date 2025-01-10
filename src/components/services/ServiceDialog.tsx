import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PricingCard } from "./PricingCard";
import { useToast } from "@/components/ui/use-toast";

interface ServiceDialogProps {
  service: {
    title: string;
    consultOnly?: boolean;
    consultText?: string;
    pricing?: any[];
  };
  onPayment: (amount: number, serviceName: string) => void;
}

export const ServiceDialog = ({ service, onPayment }: ServiceDialogProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePayment = async (amount: number, serviceName: string) => {
    await onPayment(amount, serviceName);
    toast({
      title: "Order Confirmed!",
      description: "Redirecting you to schedule a call...",
    });
  };

  return (
    <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm overflow-y-auto max-h-[90vh] md:max-h-[80vh]">
      <DialogHeader>
        <DialogTitle className="text-2xl mb-4">{service.title}</DialogTitle>
        <DialogDescription>
          {service.title === "Website Development" && (
            <p className="text-primary text-center mb-6">Your website will be live within 42 hours!</p>
          )}
          {service.consultOnly ? (
            <div className="text-center p-6">
              <p className="mb-6">{service.consultText || "Please schedule a call for a custom quote tailored to your needs."}</p>
              <Button onClick={() => navigate('/schedule')} className="hover:scale-105 transform duration-200">
                Schedule a Call
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto pb-4 snap-x snap-mandatory">
              {service.pricing?.map((plan, planIndex) => (
                <div key={planIndex} className="snap-center min-w-[280px] md:min-w-0">
                  <PricingCard 
                    plan={plan}
                    onSelect={handlePayment}
                  />
                </div>
              ))}
            </div>
          )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};