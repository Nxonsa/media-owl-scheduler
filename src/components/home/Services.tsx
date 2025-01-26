import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import { ServiceDialog } from "../services/ServiceDialog";

export const services = [
  {
    title: "Website Development",
    description: "Create stunning, responsive websites that capture your brand's essence.",
    price: "R4,999",
    features: [
      "Custom Design",
      "Mobile Responsive",
      "SEO Optimization",
      "Content Management System",
      "Contact Form Integration",
      "Social Media Integration"
    ]
  },
  {
    title: "Digital Marketing",
    description: "Boost your online presence and reach your target audience effectively.",
    price: "R2,499",
    features: [
      "Social Media Management",
      "Content Creation",
      "Email Marketing",
      "SEO Services",
      "Analytics Reporting",
      "Campaign Management"
    ]
  },
  {
    title: "E-commerce Solutions",
    description: "Set up and optimize your online store for maximum sales.",
    price: "R7,999",
    features: [
      "Product Setup",
      "Payment Gateway Integration",
      "Inventory Management",
      "Order Processing System",
      "Customer Database",
      "Security Features"
    ]
  }
];

const Services = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-6">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
              <p className="font-bold mt-2">{service.price}</p>
              <ul className="list-disc pl-5 mt-2">
                {service.features.map((feature, idx) => (
                  <li key={idx}>{feature}</li>
                ))}
              </ul>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="mt-4">Learn More</Button>
                </DialogTrigger>
                <ServiceDialog service={service} onPayment={() => {}} />
              </Dialog>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
