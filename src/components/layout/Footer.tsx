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

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Media Owl</h3>
            <p className="text-muted-foreground">
              Creating digital experiences that inspire and innovate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  App Development
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Website Creation
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Digital Marketing
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </li>
              <li>
                <Dialog>
                  <DialogTrigger asChild>
                    <button className="text-muted-foreground hover:text-foreground">
                      Careers
                    </button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Work From Home Sales Position</DialogTitle>
                      <DialogDescription className="space-y-4 pt-4">
                        <p>
                          We are currently looking for Work From Home Sales Persons to join our team!
                        </p>
                        <div className="space-y-2">
                          <p className="font-semibold">Offer:</p>
                          <ul className="list-disc pl-5 space-y-1">
                            <li>R4,500 Monthly Basic Salary</li>
                            <li>Uncapped Commission Structure</li>
                            <li>Work From Home Opportunity</li>
                          </ul>
                        </div>
                        <p className="font-semibold">How to Apply:</p>
                        <p>
                          Send your CV and motivation to{" "}
                          <a
                            href="mailto:admin@mediaowl.com"
                            className="text-primary hover:underline"
                          >
                            admin@mediaowl.com
                          </a>
                        </p>
                      </DialogDescription>
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
          <p>&copy; 2024 Media Owl. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;