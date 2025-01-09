import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface PricingPlan {
  name: string;
  monthly?: string;
  yearly?: string;
  price?: string;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (amount: number, name: string) => void;
}

export const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        {'monthly' in plan ? (
          <div className="space-y-2">
            <p className="text-2xl font-bold">R{plan.monthly} /month</p>
            <p className="text-sm text-muted-foreground">or R{plan.yearly} /year</p>
          </div>
        ) : (
          <p className="text-2xl font-bold">R{plan.price}</p>
        )}
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {plan.features.map((feature, featureIndex) => (
            <li key={featureIndex} className="flex items-center gap-2">
              <span className="text-primary">•</span>
              {feature}
            </li>
          ))}
        </ul>
        <Button 
          className="w-full mt-6 hover:scale-105 transform duration-200"
          onClick={() => onSelect(
            parseFloat(('monthly' in plan ? plan.monthly : plan.price).replace(',', '')),
            `${plan.name}`
          )}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};