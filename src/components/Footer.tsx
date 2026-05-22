import { MapPin, Phone, Mail, Clock, BookOpen } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#e8eddc] text-[#4a4a4a] pt-16 pb-8 border-t-4 border-[#d5dec4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          <div>
            <h3 className="text-3xl font-heading font-black text-[#8fae6a] mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-[#8fae6a] rounded-xl flex items-center justify-center">
                 <BookOpen className="h-6 w-6 text-[#fcf8f2]" />
              </div>
              <span>Rajeev Classes</span>
            </h3>
            <p className="text-base leading-relaxed mb-6 font-medium text-gray-600">
              "Education is to teach one to think intensively and to think critically. 
              Intelligence plus character - that is the goal of true education."
            </p>
            <p className="text-sm font-bold text-gray-500">
              Fostering academic excellence, discipline, and character-building since inception.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-heading font-black text-[#8fae6a] mb-6">Quick Links</h4>
            <ul className="space-y-4 text-base font-bold text-gray-700">
              <li><a href="/" className="hover:text-[#8fae6a] transition-colors">Home</a></li>
              <li><a href="/admission" className="hover:text-[#8fae6a] transition-colors">Admissions & Demo</a></li>
              <li><a href="/contact" className="hover:text-[#8fae6a] transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-heading font-black text-[#8fae6a] mb-6">Contact Us</h4>
            <ul className="space-y-4 text-base font-bold text-gray-700">
              <li className="flex items-start gap-4">
                <MapPin className="h-6 w-6 text-[#8fae6a] shrink-0 mt-0.5" />
                <span className="font-medium text-gray-600">Rajnagar Part - II, Palam colony<br />New Delhi, 110077</span>
              </li>
              <li className="flex items-center gap-4">
                <Phone className="h-5 w-5 text-[#8fae6a] shrink-0" />
                <div className="flex flex-col font-medium text-gray-600">
                  <a href="tel:9555188719" className="hover:text-[#8fae6a] transition-colors">+91 9555188719</a>
                  <a href="tel:9990663380" className="hover:text-[#8fae6a] transition-colors">+91 9990663380</a>
                </div>
              </li>
              <li className="flex items-center gap-4 text-gray-600 font-medium">
                <Mail className="h-5 w-5 text-[#8fae6a] shrink-0" />
                <a href="mailto:rajeevclasses@outlook.com" className="hover:text-[#8fae6a] transition-colors">rajeevclasses@outlook.com</a>
              </li>
              <li className="flex items-center gap-4 text-gray-600 font-medium">
                 <Clock className="h-5 w-5 text-[#8fae6a] shrink-0" />
                 <span>Open Mon - Sat</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t-2 border-[#d5dec4] mt-12 pt-8 text-center text-sm font-bold text-gray-500">
          <p>&copy; {new Date().getFullYear()} Rajeev Classes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
