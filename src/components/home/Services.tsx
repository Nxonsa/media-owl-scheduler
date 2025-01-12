import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Laptop, Smartphone, Code, Megaphone, Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { ServiceDialog } from "../services/ServiceDialog";

const services = [
  {
    title: "Website Development",
    description: "Create stunning, responsive websites that capture your brand's essence.",
    icon: Laptop,
    pricing: [
      {
        name: "Simple Website",
        monthly: "243.90",
        yearly: "1325.45",
        yearlyDiscount: "1592.35",
        features: [
          "Simple landing page",
          "Email contact form",
          "No email subscriptions",
          "No admin panel",
          "Personal/business email integration"
        ]
      },
      {
        name: "Standard Website",
        monthly: "375.75",
        yearly: "2780.04",
        yearlyDiscount: "1728.96",
        features: [
          "Everything in Simple Website",
          "Email Subscription",
          "Email Marketing Extension",
          "Online store capability",
          "Marketing Extensions",
          "Up to 5 admin members"
        ]
      },
      {
        name: "Advanced Website",
        monthly: "886.25",
        yearly: "5500.00",
        yearlyDiscount: "5135.00",
        features: [
          "Everything in Standard Website",
          "Multiple vendor platform",
          "Marketplace functionality",
          "Unlimited admin members",
          "Custom features"
        ]
      }
    ]
  },
  {
    title: "App Development",
    description: "Build powerful mobile applications that engage and delight users.",
    icon: Smartphone,
    consultOnly: true
  },
  {
    title: "Custom Software",
    description: "Develop tailored software solutions to streamline your business processes.",
    icon: Code,
    consultOnly: true,
    consultText: "Custom software development requires a thorough understanding of your business needs. Our team of experts will work closely with you to create a solution that perfectly fits your requirements. Schedule a call with us to discuss your project and get a detailed quote."
  },
  {
    title: "Digital Marketing",
    description: "Drive growth with data-driven digital marketing strategies.",
    icon: Megaphone,
    pricing: [
      {
        name: "Starter Package",
        price: "2,500",
        features: [
          "Social media management",
          "Basic SEO optimization",
          "Monthly analytics report"
        ]
      },
      {
        name: "Growth Package",
        price: "5,000",
        features: [
          "Everything in Starter",
          "Content marketing",
          "Email campaigns",
          "PPC management"
        ]
      },
      {
        name: "Enterprise Package",
        price: "10,000",
        features: [
          "Everything in Growth",
          "Custom strategy",
          "Dedicated manager",
          "Advanced analytics"
        ]
      }
    ]
  },
  {
    title: "Usability Testing",
    description: "Comprehensive usability testing to ensure optimal user experience.",
    icon: Users,
    pricing: [
      {
        name: "Beginner Researcher",
        price: "23,321.48",
        features: [
          "10x users one-on-one (1 hour Zoom)",
          "In-person forum discussion",
          "In-person usability testing for objects and products"
        ]
      },
      {
        name: "Intermediate Researcher",
        price: "29,175.49",
        features: [
          "10x users one-on-one (1 hour Zoom)",
          "10x users video recordings (10 min)"
        ]
      },
      {
        name: "Researcher",
        price: "32,123.25",
        features: [
          "15x users one-on-one (1 hour Zoom)",
          "15x users video recordings (10 min)",
          "15x users survey (10 min projects)"
        ]
      }
    ]
  }
];

interface DemoPaymentResult {
  id: string;
  status: 'success' | 'error';
}

interface PricingPlan {
  name: string;
  monthly?: string;
  yearly?: string;
  yearlyDiscount?: string;
  price?: string;
  features: string[];
}

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePayment = async (amount: number, serviceName: string) => {
    try {
      // Demo payment simulation
      const demoPayment = new Promise<DemoPaymentResult>((resolve) => {
        setTimeout(() => {
          resolve({
            id: `DEMO-${Math.random().toString(36).substr(2, 9)}`,
            status: 'success'
          });
        }, 2000);
      });

      toast({
        title: "Processing Payment...",
        description: "Please wait while we process your payment.",
      });

      const result = await demoPayment;
      
      const service = services.find(s => s.title === serviceName);
      const plan = service?.pricing?.find(p => {
        if ('monthly' in p) {
          return p.monthly === amount.toString() || p.yearly === amount.toString();
        }
        return p.price === amount.toString();
      }) as PricingPlan;

      // Store subscription info in localStorage for demo purposes
      localStorage.setItem('subscription', JSON.stringify({
        type: serviceName,
        amount: amount,
        id: result.id,
        startDate: new Date().toISOString(),
        features: plan?.features || []
      }));

      toast({
        title: "Payment Successful!",
        description: "Redirecting you to schedule a call...",
      });
      
      setTimeout(() => {
        navigate('/schedule', { 
          state: { 
            subject: `Demo Payment for ${serviceName} - Receipt #${result.id}`,
            amount: amount
          }
        });
      }, 2000);
      
    } catch (error) {
      console.error('Payment error:', error);
      toast({
        title: "Error",
        description: "Something went wrong with the payment. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <section id="services" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Services</h2>
          <p className="text-muted-foreground">
            We offer a comprehensive suite of digital services to help your
            business thrive in the digital age.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <Card className="card-hover bg-accent/5 border-accent/10 cursor-pointer">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <service.icon className="w-6 h-6 text-primary" />
                    </div>
                    <CardTitle>{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </DialogTrigger>
              <ServiceDialog 
                service={service}
                onPayment={handlePayment}
              />
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
