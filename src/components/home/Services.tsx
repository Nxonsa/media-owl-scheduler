import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Laptop, Smartphone, Code, Megaphone } from "lucide-react";

const services = [
  {
    title: "Website Development",
    description:
      "Create stunning, responsive websites that capture your brand's essence.",
    icon: Laptop,
  },
  {
    title: "App Development",
    description:
      "Build powerful mobile applications that engage and delight users.",
    icon: Smartphone,
  },
  {
    title: "Custom Software",
    description:
      "Develop tailored software solutions to streamline your business processes.",
    icon: Code,
  },
  {
    title: "Digital Marketing",
    description:
      "Drive growth with data-driven digital marketing strategies.",
    icon: Megaphone,
  },
];

const Services = () => {
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="card-hover bg-accent/5 border-accent/10"
            >
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;