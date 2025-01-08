import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Funders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Tech Projects for South Africa</h1>
        
        <div className="max-w-4xl mx-auto space-y-12">
          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Our Mission</h2>
            <p className="text-muted-foreground">
              We are dedicated to fighting South Africa's economic crisis, unemployment, and promoting self-development through technology and innovation.
            </p>
          </section>

          <section className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Key Focus Areas</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Economic Development through Technology</li>
                  <li>Youth Employment Initiatives</li>
                  <li>Digital Skills Training</li>
                  <li>Tech Entrepreneurship Support</li>
                </ul>
              </CardContent>
            </Card>
          </section>

          <section className="space-y-6">
            <h2 className="text-2xl font-semibold">Contact Us</h2>
            <div className="space-y-4">
              <p>For funding opportunities and partnerships:</p>
              <ul className="space-y-2">
                <li>Email: admin@mediaowl.co.za</li>
                <li>Location: South Africa</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Funders;