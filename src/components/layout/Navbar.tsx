import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-foreground">
              Media Owl
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#services" className="nav-link">
              Services
            </a>
            <a href="#about" className="nav-link">
              About
            </a>
            <a href="#contact" className="nav-link">
              Contact
            </a>
            <Button onClick={() => navigate('/schedule')}>Schedule a Call</Button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 py-4">
              <a
                href="#services"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
              <a
                href="#about"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
              <a
                href="#contact"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
              <Button onClick={() => {
                navigate('/schedule');
                setIsOpen(false);
              }}>
                Schedule a Call
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;