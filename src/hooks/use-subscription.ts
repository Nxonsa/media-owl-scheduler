import { useEffect, useState } from 'react';

export interface Subscription {
  type: string;
  amount: number;
  id: string;
  startDate: string;
  features: string[];
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);

  useEffect(() => {
    const storedSubscription = localStorage.getItem('subscription');
    if (storedSubscription) {
      setSubscription(JSON.parse(storedSubscription));
    }
  }, []);

  const hasFeature = (feature: string) => {
    return subscription?.features.includes(feature) || false;
  };

  const isSubscribed = () => {
    return subscription !== null;
  };

  return {
    subscription,
    hasFeature,
    isSubscribed
  };
};