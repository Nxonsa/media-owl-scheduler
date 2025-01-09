import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Laptop, Smartphone, Code, Megaphone, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

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
        price: "From 10,000",
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
        price: "25,345.00",
        features: [
          "10x users one-on-one (1 hour Zoom)",
          "OR",
          "10x users video recordings (10 min)"
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

const Services = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handlePayment = async (amount: number, serviceName: string) => {
    try {
      // Initialize Yoco
      const yoco = new (window as any).YocoSDK({
        publicKey: 'pk_test_a1bb5ea2qWRdJrL8a3d4'
      });
      
      yoco.showPopup({
        amountInCents: amount * 100,
        currency: 'ZAR',
        name: 'Media Owl Digital Innovations',
        description: serviceName,
        callback: async (result: any) => {
          if (result.error) {
            toast({
              title: "Payment Failed",
              description: result.error.message,
              variant: "destructive"
            });
          } else {
            toast({
              title: "Payment Successful!",
              description: "Redirecting you to schedule a call...",
            });
            
            // Wait for 2 seconds before redirecting
            setTimeout(() => {
              navigate('/schedule', { 
                state: { 
                  subject: `Paid ${serviceName} - Receipt #${result.id}`,
                  amount: amount
                }
              });
            }, 2000);
          }
        }
      });
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
          <p className="text-primary mb-4">Your website will be live within 42 hours!</p>
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
              <DialogContent className="max-w-4xl">
                <DialogHeader>
                  <DialogTitle className="text-2xl mb-4">{service.title}</DialogTitle>
                  <DialogDescription>
                    {service.consultOnly ? (
                      <div className="text-center p-6">
                        <p className="mb-6">{service.consultText || "Please schedule a call for a custom quote tailored to your needs."}</p>
                        <Button onClick={() => navigate('/schedule')} className="hover:scale-105 transform duration-200">
                          Schedule a Call
                        </Button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {service.pricing?.map((plan, planIndex) => (
                          <Card key={planIndex} className="hover:shadow-lg transition-all duration-300">
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
                                onClick={() => handlePayment(
                                  parseFloat(('monthly' in plan ? plan.monthly : plan.price).replace(',', '')),
                                  `${service.title} - ${plan.name}`
                                )}
                              >
                                Get Started
                              </Button>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;