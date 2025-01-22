import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Services from "@/components/home/Services";
import About from "@/components/home/About";
import Contact from "@/components/home/Contact";
import GalaxyBackground from "@/components/ui/GalaxyBackground";
import SouthAfricaMap3D from "@/components/ui/SouthAfricaMap3D";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <GalaxyBackground />
      <Navbar />
      <main>
        <Hero />
        <Services />
        <About />
        <Contact />
      </main>
      <SouthAfricaMap3D />
      <Footer />
    </div>
  );
};

export default Index;