import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { ChevronDown, ChevronUp } from "lucide-react";

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
      title: "Web Development Best Practices in 2024",
      description: "Learn about the latest trends and best practices in web development",
      content: "Web development continues to evolve rapidly in 2024. Key trends include the rise of AI-powered development tools, increased focus on accessibility, and the growing importance of performance optimization. Stay ahead of the curve by implementing these best practices in your projects.",
      slug: "web-dev-best-practices",
    },
    {
      title: "User Testing in South Africa",
      description: "A guide to user testing for South African developers",
      content: "User testing is crucial for creating successful digital products. In the South African context, it's important to consider our unique market conditions, diverse user base, and varying levels of digital literacy. This guide helps you navigate these challenges effectively.",
      slug: "user-testing-sa",
    },
    {
      title: "Prototype Testing Guidelines",
      description: "How to effectively test your prototypes",
      content: "Effective prototype testing is key to successful product development. Learn about the different stages of testing, from paper prototypes to high-fidelity mockups, and how to gather meaningful feedback that drives product improvement.",
      slug: "prototype-testing",
    },
    {
      title: "Software Development in South Africa",
      description: "The state of software development in South Africa",
      content: "South Africa's software development industry is growing rapidly, with increasing opportunities for local talent. This article explores the current landscape, challenges, and opportunities in the South African tech ecosystem.",
      slug: "software-dev-sa",
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