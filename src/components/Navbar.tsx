import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, PhoneCall } from 'lucide-react';
import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: 'Home', path: '/' },
    { name: 'Admission', path: '/admission' },
    { name: 'Contact & Query', path: '/contact' },
  ];

  return (
    <nav className="bg-[#fcf8f2] text-[#4a4a4a] sticky top-0 z-50 py-4">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#8fae6a] rounded-xl flex items-center justify-center">
               <BookOpen className="h-6 w-6 text-[#fcf8f2]" />
            </div>
            <span className="font-heading font-bold text-2xl tracking-tight text-[#4a4a4a]">Rajeev Classes</span>
          </div>
          
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "px-3 py-2 text-[15px] font-heading font-semibold transition-colors hover:text-[#8fae6a]",
                    location.pathname === link.path && link.path !== '/' ? "text-[#8fae6a]" : "text-[#4a4a4a]"
                  )}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <a href="tel:9555188719" className="text-[#8fae6a] hover:text-[#7b9858] font-heading font-bold text-[15px] transition-colors flex items-center gap-2">
              <PhoneCall className="h-4 w-4" />
              Call Now
            </a>
            <Link to="/admission" className="bg-[#8fae6a] hover:bg-[#7b9858] text-white px-6 py-2.5 rounded-full font-heading font-semibold text-[15px] transition-colors shadow-sm">
              Book Free Demo
            </Link>
          </div>
          
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-[#4a4a4a] hover:text-[#8fae6a] focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-[#fcf8f2] border-t border-[#f2eadc]">
          <div className="px-6 pt-4 pb-6 space-y-3">
            {links.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-lg font-heading font-semibold",
                  location.pathname === link.path && link.path !== '/' ? "text-[#8fae6a]" : "text-[#4a4a4a] hover:text-[#8fae6a]"
                )}
              >
                {link.name}
              </Link>
            ))}
             <Link to="/admission" className="block w-full bg-[#8fae6a] hover:bg-[#7b9858] text-white px-6 py-3 rounded-full font-heading font-semibold mt-4 text-center">
              Book Free Demo
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
