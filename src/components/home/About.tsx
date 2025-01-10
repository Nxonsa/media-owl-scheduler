import { useEffect, useRef } from "react";

const About = () => {
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.animate-number');
            numbers.forEach((number) => {
              const target = parseInt(number.getAttribute('data-target') || '0');
              let count = 0;
              const duration = 2000; // 2 seconds
              const increment = target / (duration / 16); // 60fps

              const updateCount = () => {
                if (count < target) {
                  count += increment;
                  (number as HTMLElement).innerText = Math.min(Math.round(count), target).toString();
                  requestAnimationFrame(updateCount);
                }
              };

              updateCount();
            });
          }
        });
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-bold mb-6">About Media Owl Digital Innovations</h2>
            <div className="space-y-6 text-muted-foreground">
              <p>
                Media Owl Digital Innovations is a proudly South African digital agency based in the heart of our vibrant nation. 
                We're committed to driving digital transformation while creating opportunities for our local talent.
              </p>
              <p>
                Our journey began with a vision to bridge the digital divide in South Africa, 
                and today we're proud to be affiliated with various technology initiatives 
                and movements that promote digital literacy and entrepreneurship in our communities.
              </p>
              <p>
                We actively collaborate with local tech hubs, participate in skills development 
                programs, and partner with organizations that share our vision of a digitally 
                empowered South Africa.
              </p>
            </div>
            <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">
                  <span className="animate-number" data-target="4">0</span>+
                </h3>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">
                  <span className="animate-number" data-target="10">0</span>+
                </h3>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold mb-2">
                  <span className="animate-number" data-target="10">0</span>+
                </h3>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;