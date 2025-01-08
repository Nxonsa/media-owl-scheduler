import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const Blog = () => {
  const navigate = useNavigate();

  const blogPosts = [
    {
      title: "Web Development Best Practices in 2024",
      description: "Learn about the latest trends and best practices in web development",
      slug: "web-dev-best-practices",
    },
    {
      title: "User Testing in South Africa",
      description: "A guide to user testing for South African developers",
      slug: "user-testing-sa",
    },
    {
      title: "Prototype Testing Guidelines",
      description: "How to effectively test your prototypes",
      slug: "prototype-testing",
    },
    {
      title: "Software Development in South Africa",
      description: "The state of software development in South Africa",
      slug: "software-dev-sa",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-center">Blog</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.map((post) => (
            <Card key={post.slug} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <button 
                  onClick={() => navigate(`/blog/${post.slug}`)}
                  className="text-primary hover:underline transition-colors"
                >
                  Read more →
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