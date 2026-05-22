import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X } from 'lucide-react';

export function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasPrompted, setHasPrompted] = useState(false);

  // Automatically show a friendly greeting prompt after 3 seconds for higher engagement
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasPrompted(true);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const whatsappUrl = "https://wa.me/919555188719?text=Hello!%20I%20am%20interested%20in%20Rajeev%20Classes%20and%20would%20like%20to%20know%20more.";

  return (
    <div id="whatsapp-floating-widget" className="fixed bottom-6 right-6 z-55 flex flex-col items-end gap-3 select-none">
      
      {/* Friendly floating greeting popover */}
      <AnimatePresence>
        {hasPrompted && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 260, damping: 25 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-[#8fae6a]/20 max-w-xs text-left relative flex flex-col gap-2.5 mr-2"
          >
            {/* Top close indicator */}
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setHasPrompted(false);
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full cursor-pointer outline-none"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-2.5 pr-4">
              <span className="text-xl">👋</span>
              <div>
                <p className="text-xs font-heading font-black text-[#8fae6a] uppercase tracking-wider mb-0.5">Rajeev Classes Support</p>
                <p className="text-sm font-semibold text-gray-700 leading-relaxed">
                  Have questions about our course timings, batches or fees? Direct message us on WhatsApp!
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 justify-end">
              <button 
                onClick={() => setHasPrompted(false)}
                className="text-xs font-heading font-black text-gray-450 hover:text-gray-600 transition-colors cursor-pointer px-2 py-1"
              >
                Dismiss
              </button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => setHasPrompted(false)}
                className="bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-heading font-black px-3.5 py-1.5 rounded-lg inline-flex items-center gap-1.5 shadow-sm transition-all cursor-pointer decoration-transparent"
              >
                Chat Now
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.51 1.451 5.361 1.452h.005c5.518 0 10.007-4.49 10.01-10.011.002-2.675-1.03-5.19-2.91-7.072C17.234 1.64 14.72 1.6 12.011 1.6 6.49 1.6 2.01 6.09 2.007 11.611c0 1.95.508 3.858 1.47 5.564L2.52 21.643l4.127-1.082z" />
                </svg>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main floating action button */}
      <motion.a
        id="whatsapp-chat-button"
        title="Chat on WhatsApp"
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.5 }}
        whileHover={{ scale: 1.1, translateY: -2 }}
        whileTap={{ scale: 0.95 }}
        className="relative w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-white/20 select-none decoration-transparent"
      >
        {/* Dynamic Pulse Accent */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:animate-none group-active:ping pointer-events-none"></span>

        {/* Brand Crisp Icon */}
        <svg className="w-8 h-8 fill-current relative z-10 transition-transform duration-300" viewBox="0 0 24 24">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.51 1.451 5.361 1.452h.005c5.518 0 10.007-4.49 10.01-10.011.002-2.675-1.03-5.19-2.91-7.072C17.234 1.64 14.72 1.6 12.011 1.6 6.49 1.6 2.01 6.09 2.007 11.611c0 1.95.508 3.858 1.47 5.564L2.52 21.643l4.127-1.082zM17.512 14.34c-.302-.15-1.786-.88-2.062-.98-.276-.1-.477-.15-.677.15-.2.3-.777.98-.952 1.18-.176.2-.351.225-.653.075-.302-.15-1.274-.47-2.43-1.502-.9-.8-1.507-1.79-1.285-2.09.224-.3.05-.447-.1-.597-.136-.135-.302-.35-.453-.525-.15-.175-.2-.3-.3-.5-.1-.2-.05-.375.025-.525.075-.15.677-1.63.927-2.23.25-.6.5-.5.677-.5.176-.01.376-.01.576-.01.2 0 .524.075.798.375.275.3 1.05 2.555 1.15 2.756.1.2.175.425.05.675-.125.25-.262.4-.412.575-.15.175-.312.35-.463.5-.15.15-.31.3-.136.6.175.3 1.054 1.737 2.274 2.825 1.574 1.4 2.894 1.838 3.321 2.038.427.2.751.15.977-.1.226-.25.977-1.13 1.227-1.513.25-.38.5-.313.827-.163.327.15 2.077 1.03 2.152 1.18.075.15.075.675-.226.975-.301.3-1.761 1.353-2.5 1.353h-.019z" />
        </svg>

        {/* Hover label for desktop users */}
        <span className="absolute right-16 scale-0 group-hover:scale-100 bg-[#4a4a4a] text-[#fcf8f2] text-xs font-heading font-black px-3.5 py-1.5 rounded-xl transition-all duration-300 origin-right whitespace-nowrap shadow-md border-2 border-white/10 select-none">
          Message Us on WhatsApp
        </span>
      </motion.a>
      
    </div>
  );
}
