import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Funders = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Join Our Movement</h1>
        
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Why Partner With Us?</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <p>
                  By partnering with Media Owl Digital Innovations, you're not just investing in a company - you're investing in South Africa's digital future. Our mission is to bridge the digital divide and create opportunities for previously disadvantaged individuals through technology and innovation.
                </p>
                
                <h3 className="text-xl font-semibold mt-6">Benefits of Partnership</h3>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Social Impact: Direct contribution to reducing unemployment through digital skills development</li>
                  <li>B-BBEE Scoring: Improve your B-BBEE scorecard through meaningful partnership</li>
                  <li>Market Access: Connect with emerging digital talent and innovative solutions</li>
                  <li>Brand Association: Align with a mission-driven organization focused on social impact</li>
                  <li>Innovation Pipeline: Early access to emerging digital solutions and talent</li>
                </ul>

                <h3 className="text-xl font-semibold mt-6">Our Impact Goals</h3>
                <ul className="space-y-2 list-disc pl-6">
                  <li>Digital Skills Training: Providing practical experience in web development and digital marketing</li>
                  <li>Job Creation: Creating sustainable employment in the digital economy</li>
                  <li>Business Development: Supporting small businesses in their digital transformation</li>
                  <li>Youth Empowerment: Focusing on youth development and entrepreneurship</li>
                  <li>Community Building: Creating a network of digital professionals and mentors</li>
                </ul>

                <div className="mt-8 text-center">
                  <Button 
                    onClick={() => navigate('/schedule')}
                    className="hover:scale-105 transform duration-200"
                  >
                    Schedule a Discussion
                  </Button>
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

export default Funders;