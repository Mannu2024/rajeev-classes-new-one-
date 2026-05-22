import React, { useState, useEffect } from 'react';
import { 
  Send, CheckCircle, Sparkles, BookOpen, Clock, 
  HelpCircle, Lightbulb, Compass, Loader2, ArrowRight,
  TrendingUp, Calendar, AlertCircle, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// Hardcoded future exam dates or custom terms for 2026 prep
const EVENTS = [
  { id: 'boards', name: 'CBSE Class 10 & 12 Board Exams', date: new Date('2027-02-15T09:00:00Z'), desc: 'Ultimate final board exams challenge.' },
  { id: 'midterms', name: 'School Term-1 Midterm Exams', date: new Date('2026-09-15T09:00:00Z'), desc: 'First foundational school assessment.' },
  { id: 'foundation', name: 'Rajeev NTSE & Olympiad Scholarship Test', date: new Date('2026-11-20T10:00:00Z'), desc: 'Competitive talent mapping exam.' },
];

export function Admission() {
  const [activeTab, setActiveTab] = useState<'demo' | 'ai-advisor'>('demo');
  const [selectedEventId, setSelectedEventId] = useState('boards');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // Tab A - Demo registration fields
  const [demoName, setDemoName] = useState('');
  const [demoPhone, setDemoPhone] = useState('');
  const [demoClass, setDemoClass] = useState('');
  const [demoSubject, setDemoSubject] = useState('');
  const [demoMsg, setDemoMsg] = useState('');
  const [isDemoSubmitted, setIsDemoSubmitted] = useState(false);
  const [isDemoSubmitting, setIsDemoSubmitting] = useState(false);
  const [demoStep, setDemoStep] = useState<1 | 2>(1);
  const [demoErrors, setDemoErrors] = useState<{ name?: string; phone?: string; class?: string; subject?: string }>({});

  // Tab B - AI Advisor fields
  const [aiClass, setAiClass] = useState('');
  const [aiInterests, setAiInterests] = useState('');
  const [aiGoals, setAiGoals] = useState('');
  const [aiChallenges, setAiChallenges] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiAdvice, setAiAdvice] = useState('');

  // Calculate countdown
  useEffect(() => {
    const selectedEvent = EVENTS.find(e => e.id === selectedEventId) || EVENTS[0];
    
    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = selectedEvent.date.getTime() - now;
      
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0 });
        return;
      }
      
      const d = Math.floor(difference / (1000 * 60 * 60 * 24));
      const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      
      setTimeLeft({ days: d, hours: h, minutes: m });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, [selectedEventId]);

  const validateStep1 = () => {
    const errs: { name?: string; phone?: string } = {};
    if (!demoName.trim()) {
      errs.name = "Student's full name is required";
    }
    const cleanPhone = demoPhone.replace(/\D/g, '');
    if (!demoPhone.trim()) {
      errs.phone = "Mobile contact number is required";
    } else if (cleanPhone.length < 10) {
      errs.phone = "Phone number should be at least 10 digits";
    }
    setDemoErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setDemoStep(2);
    }
  };

  // Handle book demo form submit
  const handleDemoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (demoStep === 1) {
      if (validateStep1()) {
        setDemoStep(2);
      }
      return;
    }

    // Step 2 validation
    const errs: { class?: string; subject?: string } = {};
    if (!demoClass) {
      errs.class = "Please select current academic standard";
    }
    if (!demoSubject.trim()) {
      errs.subject = "Please enter subjects of interest";
    }
    if (Object.keys(errs).length > 0) {
      setDemoErrors(prev => ({ ...prev, ...errs }));
      return;
    }

    setIsDemoSubmitting(true);
    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: demoName,
          phone: demoPhone,
          grade: demoClass,
          subject: demoSubject,
          message: demoMsg,
          type: 'Demo Class Request'
        }),
      });

      if (response.ok) {
        setIsDemoSubmitted(true);
        // Clear inputs
        setDemoName('');
        setDemoPhone('');
        setDemoClass('');
        setDemoSubject('');
        setDemoMsg('');
        setDemoStep(1);
        setDemoErrors({});
      } else {
        alert('Failed to submit, please try again or call our direct helpline.');
      }
    } catch (err) {
      console.error(err);
      alert('Network issue. Please dial our listed phone numbers directly!');
    } finally {
      setIsDemoSubmitting(false);
    }
  };

  // Handle AI Advisor fetch
  const handleAiAdviseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiClass) return;

    setIsAiLoading(true);
    setAiAdvice('');
    try {
      const response = await fetch('/api/ai/advise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade: aiClass,
          interests: aiInterests,
          studyGoals: aiGoals,
          challenge: aiChallenges
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAiAdvice(data.advice);
      } else {
        setAiAdvice(`### 🌟 Guide Summary for Class ${aiClass}

Currently, our heavy-duty analytical counselors are busy, but here is your instant general guideline:
- Ensure deep practice in board concepts.
- Practice daily testing schedules under strict timers.
- Schedule your custom demo to consult direct mock tests at Rajeev Classes!`);
      }
    } catch (err) {
      console.error(err);
      setAiAdvice("Failed to fetch advice due to a connectivity issue. Feel free to use the phone contact option!");
    } finally {
      setIsAiLoading(false);
    }
  };

  // Render parsed markdown or text beautifully
  const renderAdviceText = (text: string) => {
    if (!text) return null;
    
    // Split by newlines and parse basic formatting (bold, headers)
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const trimmed = line.trim();
      
      // Headers
      if (trimmed.startsWith('###')) {
        return (
          <h4 key={idx} className="text-xl font-heading font-black text-[#8fae6a] mt-6 mb-3 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#f6e191]" />
            {trimmed.replace('###', '').trim()}
          </h4>
        );
      }
      if (trimmed.startsWith('##')) {
        return (
          <h3 key={idx} className="text-2xl font-heading font-black text-[#cc72ac] mt-8 mb-4 border-b border-[#f2eadc] pb-2">
            {trimmed.replace('##', '').trim()}
          </h3>
        );
      }
      if (trimmed.startsWith('#')) {
        return (
          <h2 key={idx} className="text-3xl font-heading font-black text-center text-[#8fae6a] mt-4 mb-6">
            {trimmed.replace('#', '').trim()}
          </h2>
        );
      }
      
      // List items
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        return (
          <div key={idx} className="flex items-start gap-3 my-2.5 pl-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#f6e191] mt-2 shrink-0 border border-amber-400"></div>
            <p className="text-gray-700 font-semibold text-base leading-relaxed">
              {parseBoldText(trimmed.substring(1).trim())}
            </p>
          </div>
        );
      }

      // Check for numbered items
      const numberedRegex = /^\d+\.\s+/;
      if (numberedRegex.test(trimmed)) {
        return (
          <div key={idx} className="flex items-start gap-4 my-3 bg-[#e8eddc]/30 hover:bg-[#e8eddc]/55 p-4 rounded-2xl border-2 border-[#e8eddc] transition-colors">
            <span className="font-heading font-black text-[#8fae6a] text-lg bg-white w-8 h-8 rounded-full border-2 border-[#8fae6a] flex items-center justify-center shrink-0">
              {trimmed.match(/^\d+/)?.[0]}
            </span>
            <p className="text-gray-700 font-bold text-[15px] leading-relaxed mt-1">
              {parseBoldText(trimmed.replace(numberedRegex, ''))}
            </p>
          </div>
        );
      }

      if (trimmed === '') return <div key={idx} className="h-2"></div>;

      return (
        <p key={idx} className="text-gray-600 font-medium text-base leading-relaxed my-2">
          {parseBoldText(trimmed)}
        </p>
      );
    });
  };

  const parseBoldText = (text: string) => {
    // Parse double stars **text** to bold tags
    const parts = text.split(/\*\*([\s\S]*?)\*\*/g);
    return parts.map((part, i) => {
      if (i % 2 === 1) {
        return <strong key={i} className="font-heading font-black text-[#4a4a4a] bg-[#f6e191]/30 px-1 py-0.5 rounded">{part}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="w-full bg-[#fcf8f2] py-16 md:py-24 text-[#4a4a4a] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Header */}
        <div className="text-center mb-16 relative">
          <h1 className="text-5xl md:text-6xl font-heading font-black text-[#8fae6a] mb-6">Admissions & Counseling</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-medium">
            Explore paths to boards and engineering/commerce perfection with New Delhi's top educators.
          </p>
        </div>

        {/* Dynamic Exam Countdown Widget */}
        <div className="max-w-4xl mx-auto bg-white border-4 border-[#f2eadc] rounded-[40px] p-6 md:p-8 shadow-sm mb-16 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 transform translate-x-4 -translate-y-4 opacity-5 rotate-12">
            <Calendar className="w-56 h-56 text-[#8fae6a]" />
          </div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b-2 border-[#f2eadc]">
              <div>
                <span className="text-xs font-black uppercase text-[#8fae6a] tracking-wider bg-[#e8eddc] px-3.5 py-1.5 rounded-full inline-block mb-2">
                  Academic countdown timer
                </span>
                <h3 className="text-2xl font-heading font-bold text-gray-800">Days Remaining for Preparation</h3>
              </div>
              
              {/* Selector */}
              <div className="flex flex-wrap gap-2">
                {EVENTS.map((event) => (
                  <button
                    key={event.id}
                    onClick={() => setSelectedEventId(event.id)}
                    className={`px-4 py-2 text-xs font-black uppercase rounded-full border transition-all ${
                      selectedEventId === event.id 
                        ? 'bg-[#8fae6a] border-[#8fae6a] text-white shadow-sm' 
                        : 'bg-[#fcf8f2] hover:bg-[#e8eddc] text-gray-600 border-[#e8eddc]'
                    }`}
                  >
                    {event.id === 'boards' ? '📝 Boards' : event.id === 'midterms' ? '🏫 Midterms' : '🏆 Scholarship'}
                  </button>
                ))}
              </div>
            </div>

            {/* Countdown grid */}
            <div className="grid grid-cols-3 md:grid-cols-4 gap-4 pt-6 text-center">
              
              <div className="bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl py-4 px-2">
                <span className="text-4xl md:text-5xl font-heading font-black text-[#8fae6a] block">
                  {timeLeft.days}
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 block">Days Left</span>
              </div>

              <div className="bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl py-4 px-2">
                <span className="text-4xl md:text-5xl font-heading font-black text-[#cc72ac] block">
                  {timeLeft.hours}
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 block">Hours</span>
              </div>

              <div className="bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl py-4 px-2">
                <span className="text-4xl md:text-5xl font-heading font-black text-[#779dda] block">
                  {timeLeft.minutes}
                </span>
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1 block">Minutes</span>
              </div>

              <div className="bg-[#f6e191]/40 border-2 border-[#e5d083] rounded-2xl py-4 px-4 col-span-3 md:col-span-1 flex flex-col justify-center text-left">
                <h4 className="font-heading font-black text-sm text-[#8c7418] uppercase tracking-wide">Goal Target</h4>
                <p className="text-xs font-semibold text-gray-700 leading-tight mt-1">
                  {EVENTS.find(e => e.id === selectedEventId)?.desc}
                </p>
              </div>

            </div>
          </div>
        </div>

        {/* Dual Tab Switcher */}
        <div className="max-w-4xl mx-auto flex gap-4 p-2 bg-[#f2eadc]/60 border-2 border-[#f2eadc] rounded-3xl mb-10">
          <button
            onClick={() => setActiveTab('demo')}
            className={`flex-1 py-4 px-4 rounded-2xl text-center font-heading font-black text-base uppercase transition-all flex items-center justify-center gap-2 ${
              activeTab === 'demo'
                ? 'bg-white text-[#8fae6a] shadow-sm border-2 border-[#8fae6a]/20'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            <Calendar className="w-5 h-5 shrink-0" />
            Book Free Demo Class
          </button>
          
          <button
            onClick={() => setActiveTab('ai-advisor')}
            className={`flex-1 py-4 px-4 rounded-2xl text-center font-heading font-black text-base uppercase transition-all flex items-center justify-center gap-2 ${
              activeTab === 'ai-advisor'
                ? 'bg-white text-[#8fae6a] shadow-sm border-2 border-[#cc72ac]/20'
                : 'text-gray-600 hover:text-[#cc72ac]'
            }`}
          >
            <Sparkles className="w-5 h-5 text-amber-400 shrink-0 select-none animate-pulse" />
            AI Counselor & Planner
          </button>
        </div>

        {/* Active Tab Panel */}
        <div className="max-w-4xl mx-auto bg-white rounded-[40px] overflow-hidden shadow-sm border-4 border-[#f2eadc]">
          
          <AnimatePresence mode="wait">
            
            {/* TAB A: Demo form registration */}
            {activeTab === 'demo' && (
              <motion.div
                key="demo-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="transition-all"
              >
                <div className="bg-[#8fae6a] px-8 py-8 text-center text-white border-b-4 border-[#769354]">
                  <h2 className="text-3xl font-heading font-black">Register for Demo</h2>
                  <p className="text-[#e2f0d9] text-base mt-2 font-bold">Experience trial physical/online prep sessions freely.</p>
                </div>

                <div className="p-8 md:p-12">
                  {isDemoSubmitted ? (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
                      <div className="mx-auto w-20 h-20 bg-[#d9ecd3] rounded-full flex items-center justify-center mb-6 border-4 border-[#8fae6a]">
                        <CheckCircle className="w-10 h-10 text-[#8fae6a]" />
                      </div>
                      <h3 className="text-3xl font-heading font-black text-[#8fae6a] mb-3">Registration Successful!</h3>
                      <p className="text-lg text-gray-600 mb-8 max-w-sm mx-auto leading-relaxed font-bold">
                        Rajeev Sir's team will contact you shortly to lock your seat timing and subject goals.
                      </p>
                      <button 
                        onClick={() => {
                          setIsDemoSubmitted(false);
                          setDemoStep(1);
                        }}
                        className="bg-[#8fae6a] text-white px-8 py-3.5 rounded-full font-heading font-bold hover:bg-[#7b9858] transition-colors shadow-sm cursor-pointer"
                      >
                        Submit Another Demo Class Booking
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleDemoSubmit} className="space-y-6">
                      
                      {/* Progress Bar & Steps Badges */}
                      <div className="bg-[#fefcf8] border-2 border-[#f2eadc] rounded-3xl p-5 shadow-xs mb-8">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                          <div className="flex items-center gap-3">
                            <span className="w-8 h-8 rounded-full bg-[#8fae6a] text-white flex items-center justify-center font-heading font-black text-sm shadow-xs select-none">
                              {demoStep}
                            </span>
                            <div>
                              <h4 className="text-sm font-heading font-black text-gray-800 uppercase tracking-wider">
                                {demoStep === 1 ? "Step 1: Contact Details" : "Step 2: Goals & Academic level"}
                              </h4>
                              <p className="text-xs font-semibold text-gray-500">
                                {demoStep === 1 ? "Let us know who we are reaching out to" : "Customize your demo timings and target subjects"}
                              </p>
                            </div>
                          </div>
                          <div className="bg-[#e8eddc] px-3.5 py-1.5 rounded-full border border-[#8fae6a]/20 shrink-0 text-center">
                            <span className="text-xs font-heading font-black text-[#688544] uppercase tracking-wider">
                              {demoStep === 1 ? "50% Complete" : "Almost there!"}
                            </span>
                          </div>
                        </div>
                        
                        <div className="w-full bg-[#f2eadc] rounded-full h-3 overflow-hidden relative font-sans">
                          <motion.div 
                            className="absolute top-0 left-0 bg-[#8fae6a] h-full rounded-full"
                            initial={{ width: "50%" }}
                            animate={{ width: demoStep === 1 ? "50%" : "100%" }}
                            transition={{ type: "spring", stiffness: 120, damping: 14 }}
                          />
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        {demoStep === 1 ? (
                          <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 15 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="student-name" className="block text-sm font-bold text-gray-700 mb-2">Student Name *</label>
                                <input 
                                  type="text" 
                                  id="student-name" 
                                  value={demoName}
                                  onChange={(e) => {
                                    setDemoName(e.target.value);
                                    if (demoErrors.name) setDemoErrors(prev => ({ ...prev, name: undefined }));
                                  }}
                                  className={`w-full bg-[#fcf8f2] border-2 rounded-2xl px-4 py-3.5 focus:border-[#8fae6a] outline-none font-medium text-gray-700 transition-all placeholder-gray-400 ${
                                    demoErrors.name ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-[#e8eddc]'
                                  }`}
                                  placeholder="Full name of student"
                                />
                                {demoErrors.name && (
                                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {demoErrors.name}
                                  </motion.p>
                                )}
                              </div>
                              <div>
                                <label htmlFor="student-phone" className="block text-sm font-bold text-gray-700 mb-2">Phone Number *</label>
                                <input 
                                  type="tel" 
                                  id="student-phone" 
                                  value={demoPhone}
                                  onChange={(e) => {
                                    setDemoPhone(e.target.value);
                                    if (demoErrors.phone) setDemoErrors(prev => ({ ...prev, phone: undefined }));
                                  }}
                                  className={`w-full bg-[#fcf8f2] border-2 rounded-2xl px-4 py-3.5 focus:border-[#8fae6a] outline-none font-medium text-gray-700 transition-all placeholder-gray-400 ${
                                    demoErrors.phone ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-[#e8eddc]'
                                  }`}
                                  placeholder="10-digit primary mobile contact"
                                />
                                {demoErrors.phone && (
                                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {demoErrors.phone}
                                  </motion.p>
                                )}
                              </div>
                            </div>

                            <div className="pt-4 flex justify-end">
                              <button
                                type="button"
                                onClick={handleNextStep}
                                className="px-8 py-3.5 bg-[#8fae6a] hover:bg-[#7b9858] text-white font-heading font-black rounded-full text-base shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                              >
                                Next Step
                                <ArrowRight className="w-5 h-5 shrink-0" />
                              </button>
                            </div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 15 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -15 }}
                            transition={{ duration: 0.25 }}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label htmlFor="student-class" className="block text-sm font-bold text-gray-700 mb-2">Class / Academic standard *</label>
                                <select 
                                  id="student-class" 
                                  value={demoClass}
                                  onChange={(e) => {
                                    setDemoClass(e.target.value);
                                    if (demoErrors.class) setDemoErrors(prev => ({ ...prev, class: undefined }));
                                  }}
                                  className={`w-full bg-[#fcf8f2] border-2 rounded-2xl px-4 py-3.5 focus:border-[#8fae6a] outline-none font-bold text-gray-700 transition-all appearance-none cursor-pointer ${
                                    demoErrors.class ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-[#e8eddc]'
                                  }`}
                                >
                                  <option value="">Select current class</option>
                                  <option value="1-5">Classes 1st to 5th (Foundation)</option>
                                  <option value="6-9">Classes 6th to 9th (Analytical)</option>
                                  <option value="9-10">Classes 9th & 10th (Boards Core Preparation)</option>
                                  <option value="11">Class 11th (Stream Launch)</option>
                                  <option value="12">Class 12th (Boards Focus)</option>
                                </select>
                                {demoErrors.class && (
                                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {demoErrors.class}
                                  </motion.p>
                                )}
                              </div>
                              <div>
                                <label htmlFor="student-subject" className="block text-sm font-bold text-gray-700 mb-2">Subjects interested *</label>
                                <input 
                                  type="text" 
                                  id="student-subject" 
                                  value={demoSubject}
                                  onChange={(e) => {
                                    setDemoSubject(e.target.value);
                                    if (demoErrors.subject) setDemoErrors(prev => ({ ...prev, subject: undefined }));
                                  }}
                                  className={`w-full bg-[#fcf8f2] border-2 rounded-2xl px-4 py-3.5 focus:border-[#8fae6a] outline-none font-medium text-gray-700 transition-all placeholder-gray-400 ${
                                    demoErrors.subject ? 'border-red-400 focus:border-red-500 bg-red-50/10' : 'border-[#e8eddc]'
                                  }`}
                                  placeholder="e.g. Mathematics, Science, Accountancy"
                                />
                                {demoErrors.subject && (
                                  <motion.p initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-red-500 font-bold mt-2 flex items-center gap-1.5">
                                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                                    {demoErrors.subject}
                                  </motion.p>
                                )}
                              </div>
                            </div>

                            <div>
                              <label htmlFor="student-msg" className="block text-sm font-bold text-gray-700 mb-2">Remarks or custom time goals (Optional)</label>
                              <textarea 
                                id="student-msg" 
                                rows={3}
                                value={demoMsg}
                                onChange={(e) => setDemoMsg(e.target.value)}
                                className="w-full bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl px-4 py-3.5 focus:border-[#8fae6a] outline-none font-medium text-gray-700 transition-all placeholder-gray-400 resize-none"
                                placeholder="Tell us about specific goals such as CBSE board scoring 95%+, overcoming math anxiety..."
                              ></textarea>
                            </div>

                            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                              <button
                                type="button"
                                onClick={() => setDemoStep(1)}
                                className="w-full sm:w-auto px-6 py-3 border-2 border-[#e8eddc] hover:bg-[#fcf8f2] text-gray-500 hover:text-gray-700 font-heading font-black rounded-full text-sm transition-all cursor-pointer"
                              >
                                Back to Step 1
                              </button>

                              <button 
                                type="submit" 
                                disabled={isDemoSubmitting}
                                className="w-full sm:w-auto bg-[#8fae6a] hover:bg-[#7b9858] disabled:bg-gray-400 text-white font-heading font-black px-8 py-3.5 rounded-full text-base shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 cursor-pointer"
                              >
                                {isDemoSubmitting ? (
                                  <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Submitting details securely...
                                  </>
                                ) : (
                                  <>
                                    <Send className="w-5 h-5 shrink-0" />
                                    Book Free Demo Class Session
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </form>
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB B: AI advisor & career guide path builder */}
            {activeTab === 'ai-advisor' && (
              <motion.div
                key="ai-form"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="transition-all"
              >
                <div className="bg-[#cc72ac] px-8 py-8 text-center text-white border-b-4 border-[#b25792]">
                  <h2 className="text-3xl font-heading font-black">AI Academic Counselor</h2>
                  <p className="text-[#faedf5] text-base mt-2 font-bold">Get a customized study roadmap, recommended streams, and timetables instantly.</p>
                </div>

                <div className="p-8 md:p-12">
                  <form onSubmit={handleAiAdviseSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ai-class-pick" className="block text-sm font-bold text-gray-700 mb-2">Student Standard / Class *</label>
                        <select 
                          id="ai-class-pick"
                          required
                          value={aiClass}
                          onChange={(e) => setAiClass(e.target.value)}
                          className="w-full bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl px-4 py-3.5 focus:border-[#cc72ac] outline-none font-bold text-gray-700 transition-all appearance-none cursor-pointer"
                        >
                          <option value="">Choose standard</option>
                          <option value="1st to 5th">Classes 1st to 5th (Foundation)</option>
                          <option value="6th to 8th">Classes 6th to 8th (Analytical Boost)</option>
                          <option value="9th & 10th">Classes 9th & 10th (Board Prep Launch)</option>
                          <option value="11th Science">Class 11th - Science (JEE/NEET base)</option>
                          <option value="11th Commerce">Class 11th - Commerce (Accountancy stream)</option>
                          <option value="12th Science">Class 12th - Science (Board & Entrance final)</option>
                          <option value="12th Commerce">Class 12th - Commerce (Strategic board prep)</option>
                        </select>
                      </div>

                      <div>
                        <label htmlFor="ai-hobbies" className="block text-sm font-bold text-gray-700 mb-2">Favorite Subjects & Academic Interests</label>
                        <input 
                          type="text"
                          id="ai-hobbies"
                          value={aiInterests}
                          onChange={(e) => setAiInterests(e.target.value)}
                          placeholder="e.g. Enjoys geometry, problem-solving puzzles, reading science fiction"
                          className="w-full bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl px-4 py-3.5 focus:border-[#cc72ac] outline-none font-medium text-gray-700 transition-all"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="ai-desire" className="block text-sm font-bold text-gray-700 mb-2">Primary Goals</label>
                        <input 
                          type="text"
                          id="ai-desire"
                          value={aiGoals}
                          onChange={(e) => setAiGoals(e.target.value)}
                          placeholder="e.g. Score 98% in boards, crack JEE Mains, build robust logical habits"
                          className="w-full bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl px-4 py-3.5 focus:border-[#cc72ac] outline-none font-medium text-gray-700 transition-all"
                        />
                      </div>

                      <div>
                        <label htmlFor="ai-hinder" className="block text-sm font-bold text-gray-700 mb-2">Biggest Academic Challenge</label>
                        <input 
                          type="text"
                          id="ai-hinder"
                          value={aiChallenges}
                          onChange={(e) => setAiChallenges(e.target.value)}
                          placeholder="e.g. Easily distracted, gets anxious during math exams, weak syllabus roadmap"
                          className="w-full bg-[#fcf8f2] border-2 border-[#e8eddc] rounded-2xl px-4 py-3.5 focus:border-[#cc72ac] outline-none font-medium text-gray-700 transition-all"
                        />
                      </div>
                    </div>

                    <div>
                      <button
                        type="submit"
                        disabled={isAiLoading || !aiClass}
                        className="w-full bg-[#cc72ac] hover:bg-[#b25792] disabled:bg-gray-400 text-white font-heading font-black py-4 rounded-full text-lg shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                      >
                        {isAiLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            GenAI Counselor drafting study path...
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-5 h-5 text-yellow-300" />
                            Generate Personalized Learning Roadmap
                          </>
                        )}
                      </button>
                    </div>
                  </form>

                  {/* AI Response Output Card */}
                  {aiAdvice && (
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-12 p-6 md:p-8 bg-[#fdfafb] rounded-[30px] border-4 border-[#faedf5] shadow-inner"
                    >
                      <div className="flex items-center gap-3 mb-6 bg-white py-3 px-5 rounded-2xl border-2 border-[#cc72ac]/20 shadow-sm w-fit">
                        <Award className="w-6 h-6 text-[#cc72ac]" />
                        <span className="font-heading font-black text-sm text-[#cc72ac] uppercase tracking-wider">AI counselor recommendations</span>
                      </div>
                      
                      <div className="space-y-4">
                        {renderAdviceText(aiAdvice)}
                      </div>

                      <div className="mt-8 pt-6 border-t-2 border-[#faedf5] flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs font-bold text-gray-500 italic">
                          Generated dynamically by Rajeev Classes GenAI model.
                        </p>
                        <button
                          onClick={() => {
                            setDemoClass(aiClass);
                            setDemoSubject(aiInterests || 'As discussed with AI Advisor');
                            setDemoMsg(`Study Plan target: ${aiGoals || 'Standard Prep'}. AI counseling advised schedule review.`);
                            setActiveTab('demo');
                          }}
                          className="bg-[#8fae6a] hover:bg-[#7b9858] text-white px-6 py-2.5 rounded-full font-heading font-semibold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-sm"
                        >
                          Lock and Book Demo Session for this path
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
