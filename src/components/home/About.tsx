import { ScrollFadeImage } from "@/components/ui/ScrollFadeImage";

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="h-[600px] relative">
            <ScrollFadeImage
              src="/shaka-zulu.jpg"
              alt="Shaka Zulu looking backwards wearing a crown"
            />
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">About Media Owl</h2>
            <p className="text-muted-foreground mb-6">
              At Media Owl, we're more than just a digital agency. We're your
              partners in digital transformation, bringing over five years of
              industry expertise to every project we undertake.
            </p>
            <p className="text-muted-foreground mb-6">
              Our journey began with a simple mission: to help businesses thrive
              in the digital age. Today, we're proud to have served countless
              clients, delivering innovative solutions that drive real results.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div>
                <h3 className="text-3xl font-bold mb-2">5+</h3>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">100+</h3>
                <p className="text-sm text-muted-foreground">Projects Completed</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold mb-2">50+</h3>
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