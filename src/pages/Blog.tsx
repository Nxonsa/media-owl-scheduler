import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Blog = () => {
  const [expandedPosts, setExpandedPosts] = useState<string[]>([]);

  const togglePost = (slug: string) => {
    setExpandedPosts(prev => 
      prev.includes(slug) 
        ? prev.filter(p => p !== slug)
        : [...prev, slug]
    );
  };

  const blogPosts = [
    {
      title: "Meet Our Founder - Monwabisi Lutyeku",
      description: "The story behind Media Owl's creation",
      content: `Born in May 2001, Monwabisi Lutyeku's journey began with what he initially thought was simply being a hustler. Through life experiences and mentorship, he came to understand that his natural inclination towards entrepreneurship was actually a calling to be self-employed and create opportunities for others.

      As a young Black South African raised by a single mother who worked tirelessly to provide the basics, Monwabisi learned the value of hard work and perseverance early in life. His entrepreneurial journey began in school, where he sold chips to his classmates, and continued after high school when he established his own carwash business.

      Having experienced different aspects of life, Monwabisi maintains a grateful attitude, choosing to appreciate whatever God provides each day. His experiences shaped his vision to create a platform that helps both businesses and individuals improve themselves, particularly focusing on creating opportunities for disadvantaged communities.`,
      slug: "founder-story",
    },
    {
      title: "Work From Home Sales Position",
      description: "Join our team as a remote sales professional",
      content: `We're looking for motivated individuals to join our sales team in a work-from-home capacity. This position offers flexible hours and competitive commission-based compensation.

      Requirements:
      - Strong communication skills
      - Self-motivated and disciplined
      - Basic computer literacy
      - Reliable internet connection
      - Previous sales experience is a plus

      Benefits:
      - Work from anywhere in South Africa
      - Flexible hours
      - Competitive commission structure
      - Training and support provided
      - Opportunity for growth

      To apply, please schedule a call with us to discuss this opportunity.`,
      slug: "sales-position",
    },
    {
      title: "Website Tester Position",
      description: "Join our usability testing team",
      content: `We're seeking detail-oriented individuals to join our website testing team. This role involves conducting thorough website evaluations and organizing user feedback.

      Compensation:
      - R50-R1750 per testing session

      Requirements:
      - Attention to detail
      - Basic understanding of web navigation
      - Ability to provide clear feedback
      - Reliable internet connection
      - Available for scheduled testing sessions

      Benefits:
      - Flexible schedule
      - Work from home
      - Regular payment for completed tests
      - Training provided
      - Opportunity to influence web design

      To apply, please schedule a call with us to discuss this opportunity.`,
      slug: "tester-position",
    },
    {
      title: "This makes your prototype user friendly",
      description: "Essential tips for user-friendly prototypes",
      content: `Creating a user-friendly prototype is crucial for the success of your digital product. Here are key principles to follow:

      1. Clear Navigation: Users should always know where they are
      2. Consistent Design: Maintain visual consistency throughout
      3. Feedback Mechanisms: Provide clear feedback for user actions
      4. Simplified Flows: Remove unnecessary steps and complexity
      5. Accessibility: Ensure your prototype works for all users

      To truly ensure your prototype is user-friendly, professional usability testing is essential. Our usability testing service can help identify potential issues early and save costly revisions later.`,
      slug: "user-friendly-prototype",
      service: "usability-testing"
    },
    {
      title: "Why a friendly website is bound to make more sales",
      description: "The connection between user experience and conversion rates",
      content: `A user-friendly website directly impacts your bottom line. Here's why:

      1. Lower Bounce Rates: Users stay longer on intuitive websites
      2. Higher Conversion Rates: Easy navigation leads to more sales
      3. Better Brand Perception: Professional design builds trust
      4. Increased Return Visits: Good experiences bring customers back
      5. Word-of-Mouth Marketing: Satisfied users recommend your site

      Want to ensure your website is optimized for sales? Our usability testing service can help identify and eliminate friction points in your user journey.`,
      slug: "website-sales",
      service: "usability-testing"
    },
    {
      title: "Why is it important to have a presence online",
      description: "The benefits of digital presence for modern businesses",
      content: `In today's digital age, online presence is no longer optional. Here's why:

      1. 24/7 Availability: Your business never closes
      2. Global Reach: Access customers worldwide
      3. Cost-Effective Marketing: Lower costs than traditional advertising
      4. Better Customer Insights: Track and analyze customer behavior
      5. Competitive Advantage: Stay ahead of offline-only competitors

      Ready to establish or improve your online presence? Our digital marketing services can help you build and maintain a strong online presence.`,
      slug: "online-presence",
      service: "digital-marketing"
    },
    {
      title: "How to have an online presence",
      description: "Steps to establish your digital footprint",
      content: `Building a strong online presence requires a strategic approach:

      1. Professional Website: Your digital storefront
      2. Social Media Presence: Engage with your audience
      3. Content Strategy: Regular, valuable content
      4. SEO Optimization: Be found by your target audience
      5. Online Advertising: Reach specific demographics

      Need help implementing these strategies? Our digital marketing team can create a customized plan for your business.`,
      slug: "build-online-presence",
      service: "digital-marketing"
    },
    {
      title: "How to make a website without coding",
      description: "Modern solutions for website creation",
      content: `While coding knowledge isn't necessary for creating a website, professional development ensures better results:

      1. Custom Design: Unique to your brand
      2. Better Performance: Optimized code and loading times
      3. Enhanced Security: Professional security measures
      4. Scalability: Room for growth
      5. Professional Support: Expert assistance when needed

      Want a professional website without the hassle? Our website development service handles everything for you.`,
      slug: "no-code-website",
      service: "website-development"
    },
    {
      title: "Do I need a website",
      description: "Understanding the importance of websites in modern business",
      content: `In today's digital world, a website is essential for business success:

      1. Credibility: Professional online presence builds trust
      2. Accessibility: Information available 24/7
      3. Marketing Hub: Central point for all marketing efforts
      4. Lead Generation: Capture potential customer information
      5. Cost-Effective: Lower overhead than physical locations

      Ready to take your business online? Our website development team can create the perfect solution for your needs.`,
      slug: "need-website",
      service: "website-development"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
          {blogPosts.map((post) => (
            <Card 
              key={post.slug} 
              className="hover:shadow-lg transition-shadow"
            >
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className={`overflow-hidden transition-all duration-300 ${
                  expandedPosts.includes(post.slug) ? 'max-h-[2000px]' : 'max-h-20'
                }`}>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {post.content}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => togglePost(post.slug)}
                    className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
                  >
                    {expandedPosts.includes(post.slug) ? (
                      <>Read less <ChevronUp className="h-4 w-4" /></>
                    ) : (
                      <>Read more <ChevronDown className="h-4 w-4" /></>
                    )}
                  </button>
                  {post.service && (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="hover:scale-105 transform duration-200">
                          View Our {post.service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Services
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl">
                        <DialogHeader>
                          <DialogTitle>Our {post.service.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')} Services</DialogTitle>
                          <DialogDescription>
                            {/* Service content will be dynamically loaded based on the service type */}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Blog;
