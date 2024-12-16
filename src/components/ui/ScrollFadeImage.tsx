import { useEffect, useRef, useState } from "react";

interface ScrollFadeImageProps {
  src: string;
  alt: string;
}

const ScrollFadeImage = ({ src, alt }: ScrollFadeImageProps) => {
  const [opacity, setOpacity] = useState(0);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!imageRef.current) return;

      const rect = imageRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far the element is from the viewport center
      const distanceFromCenter = Math.abs(
        rect.top + rect.height / 2 - windowHeight / 2
      );

      // Calculate maximum distance (half viewport height plus half element height)
      const maxDistance = windowHeight / 2 + rect.height / 2;

      // Calculate opacity based on distance from center
      const newOpacity = Math.max(0, 1 - distanceFromCenter / maxDistance);
      setOpacity(newOpacity);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={imageRef}
      className="w-full h-full transition-opacity duration-300"
      style={{ opacity }}
    >
      <img src={src} alt={alt} className="w-full h-full object-cover" />
    </div>
  );
};

export default ScrollFadeImage;