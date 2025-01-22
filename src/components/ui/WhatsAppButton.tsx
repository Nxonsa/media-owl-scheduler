import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  const phoneNumber = "+27645549016";
  const message = encodeURIComponent("Hi! I'm interested in your services.");

  const handleClick = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-8 right-8 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-xl transition-transform duration-200 hover:scale-110 flex items-center gap-2"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="hidden md:inline">Chat with us</span>
    </button>
  );
};

export default WhatsAppButton;