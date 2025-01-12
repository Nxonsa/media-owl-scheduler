import { useState } from "react";
import { Menu, X, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <a href="/" className="text-2xl font-bold text-foreground md:text-2xl text-lg">
              Media Owl Digital Innovations
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => navigate('/')} className="nav-link flex items-center gap-2">
              <Home size={16} />
              Home
            </button>
            <button onClick={() => scrollToSection('services')} className="nav-link">
              Services
            </button>
            <button onClick={() => navigate('/blog')} className="nav-link">
              Blog
            </button>
            <button onClick={() => navigate('/funders')} className="nav-link">
              Funders
            </button>
            <button onClick={() => navigate('/about')} className="nav-link">
              About
            </button>
            <button onClick={() => scrollToSection('contact')} className="nav-link">
              Contact
            </button>
            <Button 
              onClick={() => navigate('/schedule')}
              className="hover:bg-primary/90 transition-colors hover:scale-105 transform duration-200"
            >
              Schedule a Call
            </Button>
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
              <button 
                onClick={() => {
                  navigate('/');
                  setIsOpen(false);
                }}
                className="nav-link text-left flex items-center gap-2"
              >
                <Home size={16} />
                Home
              </button>
              <button
                onClick={() => {
                  scrollToSection('services');
                  setIsOpen(false);
                }}
                className="nav-link text-left"
              >
                Services
              </button>
              <button 
                onClick={() => {
                  navigate('/blog');
                  setIsOpen(false);
                }}
                className="nav-link text-left"
              >
                Blog
              </button>
              <button 
                onClick={() => {
                  navigate('/funders');
                  setIsOpen(false);
                }}
                className="nav-link text-left"
              >
                Funders
              </button>
              <button 
                onClick={() => {
                  navigate('/about');
                  setIsOpen(false);
                }}
                className="nav-link text-left"
              >
                About
              </button>
              <button
                onClick={() => {
                  scrollToSection('contact');
                  setIsOpen(false);
                }}
                className="nav-link text-left"
              >
                Contact
              </button>
              <Button 
                onClick={() => {
                  navigate('/schedule');
                  setIsOpen(false);
                }}
                className="hover:bg-primary/90 transition-colors hover:scale-105 transform duration-200"
              >
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
