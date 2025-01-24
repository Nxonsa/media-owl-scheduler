import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ServiceDialog } from "../services/ServiceDialog";
import { services } from "../home/Services";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="hidden md:block">
            <h3 className="text-xl font-bold mb-4">Media Owl Digital Innovations</h3>
            <p className="text-muted-foreground">
              Creating digital experiences that inspire and innovate.
            </p>
            <p className="mt-2 text-muted-foreground">
              Contact us: <a href="mailto:admin@mediaowl.co.za" className="text-primary hover:underline">admin@mediaowl.co.za</a>
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2">
              {services.slice(0, 3).map((service, index) => (
                <li key={index}>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button className="text-muted-foreground hover:text-foreground transition-colors">
                        {service.title}
                      </button>
                    </DialogTrigger>
                    <ServiceDialog 
                      service={service}
                      onPayment={() => {}}
                    />
                  </Dialog>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </a>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground transition-colors">
                      Careers
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Open Positions</DialogTitle>
                      <DialogDescription className="space-y-8 pt-4">
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg">1. Freelance Sales Position</h3>
                          <div className="space-y-2">
                            <p className="font-semibold">Offer:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Commission-based compensation</li>
                              <li>Uncapped earning potential</li>
                              <li>Work From Home Opportunity</li>
                            </ul>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-semibold text-lg">2. Website Tester</h3>
                          <div className="space-y-2">
                            <p className="font-semibold">Responsibilities:</p>
                            <ul className="list-disc pl-5 space-y-1">
                              <li>Testing websites</li>
                              <li>Taking surveys</li>
                              <li>Organizing tree cards</li>
                            </ul>
                            <p className="font-semibold">Earnings:</p>
                            <p>R50 - R1,750 per project</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <p className="font-semibold">How to Apply:</p>
                          <p>
                            Send your CV and motivation to{" "}
                            <a
                              href="mailto:admin@mediaowl.co.za"
                              className="text-primary hover:underline"
                            >
                              admin@mediaowl.co.za
                            </a>
                          </p>
                        </div>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2025 Media Owl Digital Innovations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;