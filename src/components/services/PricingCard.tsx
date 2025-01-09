import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

interface PricingPlan {
  name: string;
  monthly?: string;
  yearly?: string;
  yearlyDiscount?: string;
  price?: string;
  features: string[];
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (amount: number, name: string) => void;
}

export const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  return (
    <Card className="hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        {'monthly' in plan ? (
          <div className="space-y-4">
            <RadioGroup 
              defaultValue="monthly" 
              onValueChange={(value) => setBillingCycle(value as 'monthly' | 'yearly')}
              className="grid grid-cols-2 gap-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id={`${plan.name}-monthly`} />
                <Label htmlFor={`${plan.name}-monthly`}>Monthly</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id={`${plan.name}-yearly`} />
                <Label htmlFor={`${plan.name}-yearly`}>Yearly</Label>
              </div>
            </RadioGroup>
            {billingCycle === 'monthly' ? (
              <p className="text-2xl font-bold">R{plan.monthly} /month</p>
            ) : (
              <div>
                <p className="text-2xl font-bold">R{plan.yearly} /year</p>
                {plan.yearlyDiscount && (
                  <p className="text-sm text-green-600">Save R{plan.yearlyDiscount} yearly!</p>
                )}
              </div>
            )}
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
            parseFloat(('monthly' in plan ? 
              (billingCycle === 'monthly' ? plan.monthly : plan.yearly) : 
              plan.price
            ).replace(',', '')),
            `${plan.name} (${billingCycle === 'monthly' ? 'Monthly' : 'Yearly'})`
          )}
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  );
};