import { DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PricingCard } from "./PricingCard";

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

  return (
    <DialogContent className="max-w-4xl bg-background/95 backdrop-blur-sm">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 overflow-x-auto md:overflow-hidden pb-4">
              {service.pricing?.map((plan, planIndex) => (
                <PricingCard 
                  key={planIndex}
                  plan={plan}
                  onSelect={onPayment}
                />
              ))}
            </div>
          )}
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};