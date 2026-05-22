import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Sparkles, HelpCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Contact() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !message) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          grade: 'N/A', // contact form has no separate grade dropdown
          subject: subject || 'General Counseling',
          message,
          type: 'General Query Contact'
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setName('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        alert('Could not submit query, please try again or call our numbers.');
      }
    } catch (err) {
      console.error(err);
      alert('Network issue. Please dial our contact phone lines directly!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full bg-[#fcf8f2] min-h-screen">
      
      {/* Header */}
      <div className="pt-20 pb-12 text-center text-[#4a4a4a] relative">
        <h1 className="text-5xl md:text-6xl font-heading font-black mb-6 text-[#8fae6a]">Contact & Query</h1>
        <p className="text-xl text-gray-600 font-medium max-w-2xl mx-auto px-4 leading-relaxed">
          We are here to answer your questions and guide you towards conceptual clarity and academic success.
        </p>
        <Sparkles className="absolute top-10 right-1/4 text-[#f6e191] w-12 h-12 hidden md:block" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mb-20">
        <div className="grid lg:grid-cols-2 gap-12 bg-white rounded-[40px] p-8 md:p-12 shadow-sm border-4 border-[#f2eadc]">
          
          {/* Quick Contact Information */}
          <div>
            <h2 className="text-4xl font-heading font-black text-[#4a4a4a] mb-8">Get In Touch</h2>
            <p className="text-gray-600 mb-10 text-lg leading-relaxed font-medium">
              Have questions about our course timings, teacher backgrounds, or fees? Feel free to call us or leave a message.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
              
              <div className="flex items-start gap-4">
                <div className="bg-[#f0c8e1] p-3.5 rounded-2xl border-2 border-[#cc72ac] shrink-0">
                  <Phone className="w-6 h-6 text-[#cc72ac]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#4a4a4a] mb-1">Phone Helpline</h3>
                  <a href="tel:9555188719" className="text-sm font-bold text-gray-600 block hover:text-[#8fae6a] transition-all">+91 9555188719</a>
                  <a href="tel:9990663380" className="text-sm font-bold text-gray-600 block hover:text-[#8fae6a] transition-all">+91 9990663380</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#d2def3] p-3.5 rounded-2xl border-2 border-[#779dda] shrink-0">
                  <Mail className="w-6 h-6 text-[#779dda]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#4a4a4a] mb-1">Email Support</h3>
                  <a href="mailto:rajeevclasses@outlook.com" className="text-sm font-bold text-gray-600 hover:text-[#8fae6a] transition-all">rajeevclasses@outlook.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#f6e191] p-3.5 rounded-2xl border-2 border-[#d7b224] shrink-0">
                  <MapPin className="w-6 h-6 text-[#d7b224]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#4a4a4a] mb-1">Our Location</h3>
                  <p className="text-xs font-bold text-gray-600 leading-relaxed">
                    Rajnagar Part - II, Palam colony<br />
                    New Delhi, Pincode 110077
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#d9ecd3] p-3.5 rounded-2xl border-2 border-[#8fae6a] shrink-0">
                  <Clock className="w-6 h-6 text-[#8fae6a]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-[#4a4a4a] mb-1">Working Hours</h3>
                  <p className="text-sm font-bold text-gray-600">Monday - Saturday</p>
                  <p className="text-xs font-bold text-gray-500">9:00 AM - 8:00 PM</p>
                </div>
              </div>

            </div>

            {/* Google map iframe inside contact info */}
            <div className="w-full h-64 rounded-3xl overflow-hidden border-4 border-[#e8eddc] shadow-sm relative group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14013.971168128475!2d77.07221081541093!3d28.584988775437876!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1b3ca8e94589%3A0x6b1ea884dc4048ca!2sRaj%20Nagar%20II%2C%20Palam%20Colony%2C%20New%20Delhi%2C%20Delhi%20110077!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                className="w-full h-full" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Rajeev Classes Location Map"
              ></iframe>
            </div>
          </div>

          {/* Interactive support form */}
          <div className="bg-[#fcf8f2]/60 p-6 md:p-8 border-4 border-[#f2eadc] rounded-[36px] flex flex-col justify-center">
            
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div 
                  key="success-card" 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  className="text-center py-12"
                >
                  <div className="mx-auto w-16 h-16 bg-[#d9ecd3] rounded-full flex items-center justify-center mb-6 border-4 border-[#8fae6a]">
                    <CheckCircle className="w-8 h-8 text-[#8fae6a]" />
                  </div>
                  <h3 className="text-2xl font-heading font-black text-[#8fae6a] mb-2">Message Received!</h3>
                  <p className="text-base text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed font-bold">
                    Thank you for writing. Our desk team has received your query and will follow up with notes within a few working hours.
                  </p>
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="bg-[#8fae6a] text-white px-8 py-3 rounded-full font-heading font-bold text-xs uppercase tracking-wider transition-all hover:bg-[#7b9858]"
                  >
                    Send Another Doubt
                  </button>
                </motion.div>
              ) : (
                <form key="form-element" onSubmit={handleSubmit} className="space-y-5">
                  <div className="flex items-center gap-2 mb-2">
                    <HelpCircle className="w-5 h-5 text-[#8fae6a]" />
                    <h3 className="font-heading font-black text-2xl text-gray-800">Support Desk Form</h3>
                  </div>
                  
                  <div>
                    <label htmlFor="usr-name" className="block text-xs font-black uppercase text-gray-500 mb-2">Your Name *</label>
                    <input 
                      type="text" 
                      id="usr-name" 
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Manish Thakur"
                      className="w-full bg-white border-2 border-[#e8eddc] rounded-2xl px-4 py-3 text-sm font-semibold focus:border-[#8fae6a] outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="usr-tel" className="block text-xs font-black uppercase text-gray-500 mb-2">Phone Number *</label>
                    <input 
                      type="tel" 
                      id="usr-tel" 
                      required 
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="w-full bg-white border-2 border-[#e8eddc] rounded-2xl px-4 py-3 text-sm font-semibold focus:border-[#8fae6a] outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="usr-sub" className="block text-xs font-black uppercase text-gray-500 mb-2">Inquiry Topic (Optional)</label>
                    <input 
                      type="text" 
                      id="usr-sub" 
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Class 12 Chemistry fees, batch schedule"
                      className="w-full bg-white border-2 border-[#e8eddc] rounded-2xl px-4 py-3 text-sm font-semibold focus:border-[#8fae6a] outline-none text-gray-700 placeholder-gray-400"
                    />
                  </div>

                  <div>
                    <label htmlFor="usr-msg" className="block text-xs font-black uppercase text-gray-500 mb-2">Detailed Question *</label>
                    <textarea 
                      id="usr-msg" 
                      rows={4}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your doubts, schedule challenges or coaching queries clearly..."
                      className="w-full bg-white border-2 border-[#e8eddc] rounded-2xl px-4 py-3 text-sm font-medium focus:border-[#8fae6a] outline-none text-gray-700 placeholder-gray-400 resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-[#8fae6a] hover:bg-[#7b9858] disabled:bg-gray-400 text-white font-heading font-black py-3.5 rounded-full text-sm uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-1.5"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending inquiry...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 shrink-0" />
                          Submit to counselor Desk
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </AnimatePresence>

          </div>
          
        </div>
      </div>
    </div>
  );
}
