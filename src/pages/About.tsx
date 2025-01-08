import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">About Our Founder</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-6">
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Monwabisi Lutyeku</h2>
                <p className="text-muted-foreground">Born May 2001</p>
                
                <div className="space-y-4">
                  <p>
                    Born with an entrepreneurial spirit, Monwabisi's journey began as what he initially thought was simply being a hustler. Through life experiences and mentorship, he came to understand that his natural inclination towards entrepreneurship was actually a calling to be self-employed and create opportunities for others.
                  </p>
                  
                  <p>
                    As a young Black South African raised by a single mother who worked tirelessly to provide the basics, Monwabisi learned the value of hard work and perseverance early in life. His entrepreneurial journey began in school, where he sold chips to his classmates, and continued after high school when he established his own carwash business.
                  </p>
                  
                  <p>
                    Having experienced different aspects of life, Monwabisi maintains a grateful attitude, choosing to appreciate whatever God provides each day. His experiences shaped his vision to create a platform that helps both businesses and individuals improve themselves, particularly focusing on creating opportunities for disadvantaged communities.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default About;