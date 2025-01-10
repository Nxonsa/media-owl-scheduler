import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    contactSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-[5vh] overflow-hidden">
        <div className="stars absolute w-full h-full">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="star absolute w-0.5 h-0.5 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 4 + 2}s linear infinite`,
                opacity: Math.random(),
              }}
            />
          ))}
        </div>
        <div className="shooting-stars">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="shooting-star absolute w-1 h-1 bg-white rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: '0%',
                animation: `shoot ${Math.random() * 3 + 2}s linear infinite ${Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="container px-4 mx-auto">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Transform Your Digital Vision Into Reality
          </h1>
          <p className="text-xl text-muted-foreground mb-8 animate-fade-in">
            With over five years of industry experience, we craft exceptional
            digital experiences that drive growth and innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Button size="lg" className="group" onClick={scrollToContact}>
              Get Started
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate('/schedule')}>
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;