import React, { useState } from 'react';
import { BookOpen, Calculator, Atom, FileText, CheckCircle2, Star, Sparkles, Pencil, X, Maximize2, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

const courses = [
  {
    title: 'Classes 1st to 5th',
    subjects: 'All Subjects',
    icon: BookOpen,
    desc: 'Building a strong foundation with interactive and engaging learning methods.',
    bgColor: 'bg-[#f0c8e1]',
    iconColor: 'text-[#cc72ac]'
  },
  {
    title: 'Classes 6th to 9th',
    subjects: 'Mathematics, Science, English, Social Science & all major subjects',
    icon: Atom,
    desc: 'Enhancing analytical skills and conceptual clarity for mid-level students.',
    bgColor: 'bg-[#d2def3]',
    iconColor: 'text-[#779dda]'
  },
  {
    title: 'Classes 9th & 10th',
    subjects: 'Mathematics and Science',
    icon: Calculator,
    desc: 'Focused preparation for board exams with rigorous practice and doubt clearing.',
    bgColor: 'bg-[#f6e191]',
    iconColor: 'text-[#d7b224]'
  },
  {
    title: '11th & 12th (Science)',
    subjects: 'Mathematics, Biology and Computer Science',
    icon: Atom,
    desc: 'Advanced level coaching designed for competitive edge and board excellence.',
    bgColor: 'bg-[#d9ecd3]',
    iconColor: 'text-[#8fae6a]'
  },
  {
    title: '11th & 12th (Commerce)',
    subjects: 'Accountancy, Economics and Business Studies',
    icon: FileText,
    desc: 'Comprehensive coverage of core commerce subjects with practical insights.',
    bgColor: 'bg-[#fcd2b0]',
    iconColor: 'text-[#df8c4f]'
  }
];

const stats = [
  { value: '1st-12th', label: 'Classes Taught' },
  { value: '100%', label: 'Commitment' },
  { value: 'All', label: 'Major Subjects' },
  { value: 'Free', label: 'Demo Class' }
];

const reasons = [
  "Experienced & Dedicated Faculty",
  "Concept-Based Learning Approach",
  "Regular Tests & Assignments",
  "Dedicated Doubt-Solving Sessions",
  "Individual Attention to Every Student",
  "Focus on Intelligence & Character Building",
];

const galleryPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800',
    category: 'Classrooms',
    title: 'Smart Learning Spaces',
    desc: 'Bright, colorful air-conditioned chambers designed to make conceptual learning engaging.'
  },
  {
    src: 'https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&q=80&w=800',
    category: 'Study Spaces',
    title: 'Self-Study Library',
    desc: 'Fully loaded with NCERT questions, CBSE past year solutions, and standard reference guides.'
  },
  {
    src: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800',
    category: 'Guidance',
    title: 'One-on-One Mentorship',
    desc: 'Where personal doubts are simplified and standard exam roadmaps are built with Rajeev Sir.'
  },
  {
    src: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=800',
    category: 'Classrooms',
    title: 'Doubt Clearing Circles',
    desc: 'Collaborative desk sessions where school homework doubts are tackled and solved together.'
  },
  {
    src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800',
    category: 'Study Spaces',
    title: 'Interactive Practice Desk',
    desc: 'Equipped with digital assessments to practice mock chapters under real board exam timers.'
  },
  {
    src: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    category: 'Guidance',
    title: 'Direct Counsel Desks',
    desc: 'Regular counseling to guide students over exam blockages and test stress seamlessly.'
  }
];

const categories = ['All', 'Classrooms', 'Study Spaces', 'Guidance'];

export function Home() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activePhoto, setActivePhoto] = useState<typeof galleryPhotos[0] | null>(null);

  return (
    <div className="w-full relative overflow-hidden bg-[#fcf8f2] text-[#4a4a4a]">

      {/* Decorative background squiggles */}
      <div className="absolute top-[10%] left-[5%] opacity-40 pointer-events-none rotate-12">
         <Sparkles className="h-16 w-16 text-[#f6e191]" />
      </div>
      <div className="absolute top-[30%] right-[10%] opacity-40 pointer-events-none -rotate-12">
         <Star className="h-12 w-12 text-[#f0c8e1] fill-[#f0c8e1]" />
      </div>
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-12 flex flex-col items-center text-center max-w-5xl mx-auto z-10">
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="w-full relative">
          <div className="relative inline-block mb-8">
            <h1 className="text-5xl md:text-7xl font-heading font-black text-[#8fae6a] leading-[1.1] z-10 relative">
              Quality Coaching for K-12
            </h1>
            {/* Hand-drawn scribble under heading */}
            <svg className="absolute -bottom-6 left-0 w-full h-8 text-[#f6e191] -z-10" viewBox="0 0 400 20" preserveAspectRatio="none">
              <path d="M5,15 Q100,20 200,5 T395,15" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            </svg>
            {/* Arrow pointing to button */}
            <svg className="absolute -left-16 bottom-0 w-16 h-16 text-[#8fae6a] hidden md:block" viewBox="0 0 100 100">
               <path d="M90,20 Q40,40 30,80 L20,70 M30,80 L50,75" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <p className="mt-8 text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-medium leading-relaxed italic z-20 relative">
            <span className="text-3xl text-[#d2def3] absolute -left-6 -top-4 font-heading font-black">"</span>
            Education is to teach one to think intensively and to think critically. Intelligence plus character - that is the goal of true education.
            <span className="text-3xl text-[#d2def3] absolute -right-2 bottom-0 font-heading font-black">"</span>
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/admission" className="inline-flex items-center justify-center px-8 py-3.5 text-[15px] font-heading font-bold rounded-full text-white bg-[#8fae6a] hover:bg-[#7b9858] transition-colors shadow-sm transform hover:-translate-y-1">
              Book Free Demo Class
            </Link>
          </div>
        </motion.div>

        {/* Playful placeholder for characters */}
        <div className="mt-20 w-full flex justify-center gap-6 flex-wrap relative z-10">
           {/* Doodle Character 1 */}
           <div className="w-40 h-40 bg-[#f0c8e1] rounded-full flex flex-col items-center justify-center shadow-sm border-4 border-[#cc72ac] transform -rotate-6">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#cc72ac] text-4xl mb-2">🤓</div>
             <span className="font-heading font-bold text-[#cc72ac]">Learn</span>
           </div>
           {/* Doodle Character 2 */}
           <div className="w-48 h-48 bg-[#d2def3] rounded-full flex flex-col items-center justify-center shadow-sm border-4 border-[#779dda] transform rotate-3 -mt-6">
             <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-[#779dda] text-5xl mb-2">🤔</div>
             <span className="font-heading font-bold text-[#779dda] text-lg">Think</span>
           </div>
           {/* Doodle Character 3 */}
           <div className="w-40 h-40 bg-[#f6e191] rounded-full flex flex-col items-center justify-center shadow-sm border-4 border-[#d7b224] transform rotate-6">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center text-[#d7b224] text-4xl mb-2">🤩</div>
             <span className="font-heading font-bold text-[#d7b224]">Grow</span>
           </div>
        </div>

      </section>

      {/* Stats Section */}
      <section className="py-16 relative">
         <div className="absolute top-1/2 left-0 w-full h-[6px] text-[#f6e191] -z-10 flex">
           <svg className="w-full h-12 -mt-6" preserveAspectRatio="none" viewBox="0 0 1000 40">
             <path d="M0,20 Q250,50 500,20 T1000,20" fill="none" stroke="currentColor" strokeWidth="4" />
           </svg>
         </div>
         <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
            {stats.map((stat, idx) => (
               <div key={idx} className="bg-[#fcf8f2] rounded-3xl p-6 shadow-sm border-4 border-[#f2eadc] transform transition-transform hover:-translate-y-1">
                  <h3 className="text-4xl font-heading font-black text-[#8fae6a] mb-2">{stat.value}</h3>
                  <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">{stat.label}</p>
               </div>
            ))}
         </div>
      </section>

      {/* Features / Why Choose Us with Sticker Image Style */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8 relative grid lg:grid-cols-2 gap-16 items-center">
         <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-6 h-6 text-[#f6e191]" />
              <h2 className="text-4xl font-heading font-black text-[#8fae6a]">Why Choose<br/>Rajeev Classes?</h2>
            </div>
            <p className="text-[#4a4a4a] text-lg mb-10 leading-relaxed font-medium">
               At Rajeev Classes, we don't just teach for exams; we teach for life. Here are a few reasons why students and parents trust us:
            </p>
            <ul className="space-y-6">
               {reasons.map((reason, idx) => (
                  <li key={idx} className="flex items-start gap-4">
                     <div className="w-8 h-8 rounded-full bg-[#f0c8e1] flex items-center justify-center shrink-0 mt-1">
                        <CheckCircle2 className="w-5 h-5 text-[#cc72ac]" />
                     </div>
                     <span className="text-lg font-bold text-[#4a4a4a]">{reason}</span>
                  </li>
               ))}
            </ul>
         </div>

         {/* Fun Sticker Images Container */}
         <div className="relative h-[500px] hidden lg:block">
            {/* Sticker 1 */}
            <div className="absolute top-0 right-10 w-64 h-64 bg-[#fcd2b0] rounded-[40px] transform rotate-6 border-4 border-[#df8c4f] shadow-sm flex flex-col items-center justify-center p-6 overflow-hidden">
               <div className="relative z-10 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#df8c4f] rounded-full flex items-center justify-center mb-4">
                     <BookOpen className="w-8 h-8 text-white" />
                  </div>
                  <p className="font-heading font-black text-[#8c4f23] text-2xl leading-none">Concept<br/>Based</p>
               </div>
               {/* Pattern overlay */}
               <div className="absolute inset-0 opacity-10 border-8 border-dashed border-[#8c4f23] rounded-[36px] m-4"></div>
            </div>
            
            {/* Sticker 2 */}
            <div className="absolute bottom-10 left-10 w-72 h-48 bg-[#d2def3] rounded-[40px] transform -rotate-12 border-4 border-[#779dda] shadow-sm flex flex-col items-center justify-center overflow-hidden">
               <div className="relative z-10 text-center flex flex-col items-center">
                   <div className="w-12 h-12 bg-[#779dda] rounded-full flex items-center justify-center mb-2">
                     <Star className="w-6 h-6 text-white" />
                  </div>
                 <p className="font-heading font-black text-[#567dba] text-2xl px-6 leading-tight drop-shadow-sm">Dedicated Faculty</p>
               </div>
            </div>
            
            {/* Decorative arrow between stickers */}
            <svg className="absolute top-1/2 left-1/4 w-32 h-32 text-[#f6e191]" viewBox="0 0 100 100">
               <path d="M10,90 Q50,10 90,90 M80,80 L100,90 M80,80 L85,60" fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
         </div>
      </section>

      {/* Courses Cards Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
         <div className="text-center mb-16 relative">
            <h2 className="text-5xl font-heading font-black text-[#8fae6a]">K-12 Programs Offered</h2>
            {/* Little doodle */}
            <Pencil className="absolute -top-6 right-1/4 text-[#f0c8e1] w-10 h-10 rotate-45 hidden md:block" />
         </div>

         <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
               <div key={idx} className={`${course.bgColor} rounded-[40px] p-8 transform transition-transform hover:-translate-y-2 shadow-sm border-2 border-white`}>
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-white/50 p-4 rounded-2xl backdrop-blur-sm">
                        <course.icon className={`w-8 h-8 ${course.iconColor}`} />
                     </div>
                     {idx % 2 === 0 && <Star className={`w-8 h-8 fill-white text-white opacity-50`} />}
                  </div>
                  <h3 className="text-2xl font-heading font-black text-[#4a4a4a] mb-3">{course.title}</h3>
                  <div className="bg-white/60 text-[#4a4a4a] text-[13px] font-bold py-1 px-4 rounded-full inline-block mb-6 uppercase tracking-wider">
                    {course.subjects}
                  </div>
                  <p className="text-gray-700 font-medium text-[15px] leading-relaxed">
                     {course.desc}
                  </p>
               </div>
            ))}
            
            {/* Extra CTA Card */}
            <div className="bg-[#f2eadc] rounded-[40px] p-8 flex flex-col items-center justify-center text-center border-4 border-dashed border-[#dcd1ba]">
               <h3 className="text-3xl font-heading font-black text-[#8fae6a] mb-4 drop-shadow-sm">Ready to start learning?</h3>
               <Link to="/admission" className="inline-flex items-center justify-center px-8 py-3.5 w-full font-heading font-bold rounded-full text-white bg-[#8fae6a] hover:bg-[#7b9858] transition-colors shadow-sm text-lg">
                  Book Free Demo
               </Link>
            </div>
         </div>
      </section>

      {/* Our Campus & Classroom Photo Gallery Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-8 relative z-10 border-t border-[#f2eadc]/60">
         <div className="text-center mb-16 relative">
            <div className="inline-flex items-center gap-2 mb-4 bg-white px-4 py-1.5 rounded-full border border-[#8fae6a]/20 shadow-sm select-none">
              <ImageIcon className="w-5 h-5 text-[#8fae6a]" />
              <span className="text-sm font-heading font-bold text-[#8fae6a] uppercase tracking-wider">Our Environment</span>
            </div>
            <h2 className="text-5xl font-heading font-black text-[#8fae6a] leading-tight">Our Campus & Classroom</h2>
            <p className="text-gray-600 font-medium text-lg max-w-2xl mx-auto mt-4 leading-relaxed">
               Step inside New Delhi's premium learning hub, custom-tailored with spacious, joyful zones to foster focus, clarity, and growth.
            </p>
         </div>

         {/* Category Filters */}
         <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
               <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 text-sm font-heading font-bold rounded-full transition-all border outline-none cursor-pointer ${
                     selectedCategory === category
                        ? 'bg-[#8fae6a] border-[#8fae6a] text-white shadow-md'
                        : 'bg-white hover:bg-[#e8eddc] text-gray-600 border-[#f2eadc]'
                  }`}
               >
                  {category}
               </button>
            ))}
         </div>

         {/* Polaroid Gallery Grid */}
         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12 pt-6">
            {galleryPhotos
               .filter((photo) => selectedCategory === 'All' || photo.category === selectedCategory)
               .map((photo, i) => {
                  // Staggered angles for Polaroid flavor: index-based
                  const angles = ['rotate-1', '-rotate-2', 'rotate-2', '-rotate-1', 'rotate-3', '-rotate-3'];
                  const angleClass = angles[i % angles.length];

                  return (
                     <div
                        key={i}
                        className={`bg-white p-4 pb-6 rounded-2xl shadow-lg border-2 border-[#e8eddc] ${angleClass} hover:rotate-0 hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer relative group flex flex-col justify-between`}
                        onClick={() => setActivePhoto(photo)}
                     >
                        {/* Polaroid Tape Accent */}
                        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-100/70 border-x border-orange-200/40 rotate-1 backdrop-blur-xs z-20 group-hover:opacity-80 transition-opacity"></div>

                        {/* Image Container */}
                        <div className="relative overflow-hidden rounded-lg aspect-[4/3] mb-4 bg-gray-100 border border-[#f2eadc] grow">
                           <img
                              src={photo.src}
                              alt={photo.title}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                           />
                           {/* Hover overlay indicator */}
                           <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <div className="bg-white/90 p-3 rounded-full shadow-sm text-gray-805">
                                 <Maximize2 className="w-5 h-5 text-[#8fae6a]" />
                              </div>
                           </div>

                           <span className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs text-[#8fae6a] text-[10px] font-black uppercase px-2.5 py-1 rounded-md border border-[#e8eddc]">
                              {photo.category}
                           </span>
                        </div>

                        {/* Polaroid Caption Style */}
                        <div className="px-1 shrink-0 pt-2">
                           <h3 className="text-xl font-heading font-black text-gray-800 leading-tight mb-1.5 group-hover:text-[#8fae6a] transition-colors">
                              {photo.title}
                           </h3>
                           <p className="text-gray-500 text-xs font-semibold leading-relaxed">
                              {photo.desc}
                           </p>
                        </div>
                     </div>
                  );
               })}
         </div>

         {/* Lightbox Modal */}
         <AnimatePresence>
            {activePhoto && (
               <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4"
                  onClick={() => setActivePhoto(null)}
               >
                  <button
                     onClick={() => setActivePhoto(null)}
                     className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white hover:text-[#f6e191] rounded-full transition-all border border-white/20 hover:border-white/40 z-50"
                  >
                     <X className="w-6 h-6" />
                  </button>

                  <motion.div
                     initial={{ scale: 0.95, y: 15 }}
                     animate={{ scale: 1, y: 0 }}
                     exit={{ scale: 0.95, y: 15 }}
                     className="bg-white rounded-[32px] overflow-hidden max-w-4xl w-full max-h-[90vh] flex flex-col md:flex-row shadow-2xl border-4 border-[#f2eadc]"
                     onClick={(e) => e.stopPropagation()}
                  >
                     {/* Image View */}
                     <div className="md:w-3/5 bg-gray-900 flex items-center justify-center relative min-h-[300px] max-h-[50vh] md:max-h-[80vh] overflow-hidden">
                        <img
                           src={activePhoto.src}
                           alt={activePhoto.title}
                           referrerPolicy="no-referrer"
                           className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-[#8fae6a] text-white text-[11px] font-black uppercase px-3 py-1 rounded-full shadow-sm">
                           {activePhoto.category}
                        </div>
                     </div>

                     {/* Details Frame */}
                     <div className="md:w-2/5 p-8 flex flex-col justify-between bg-[#fcf8f2] relative">
                        {/* Tiny decorative doodle illustration */}
                        <div className="absolute top-6 right-6 opacity-10">
                           <Star className="w-16 h-16 text-[#cc72ac] fill-[#cc72ac]" />
                        </div>

                        <div className="space-y-4">
                           <span className="text-xs font-black uppercase text-[#8fae6a] tracking-wider block">Rajeev Classes Environment</span>
                           <h3 className="text-3xl font-heading font-black text-gray-800 leading-tight">
                              {activePhoto.title}
                           </h3>
                           <p className="text-gray-600 text-[15px] font-medium leading-relaxed">
                              {activePhoto.desc}
                           </p>

                           <div className="bg-white/80 p-4 border border-[#e8eddc] rounded-2xl space-y-2">
                              <h4 className="text-xs font-black uppercase text-gray-500 tracking-wider">Facility Highlights</h4>
                              <div className="grid grid-cols-2 gap-2 text-xs font-bold text-gray-600">
                                 <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8fae6a]"></div>
                                    Air-conditioned
                                 </div>
                                 <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8fae6a]"></div>
                                    CCTV Secured
                                 </div>
                                 <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8fae6a]"></div>
                                    Modern whiteboard
                                 </div>
                                 <div className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#8fae6a]"></div>
                                    Clean water
                                 </div>
                              </div>
                           </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-[#f2eadc] space-y-4">
                           <p className="text-sm text-gray-500 font-bold italic leading-tight">
                              "Step in during working hours or schedule a demo class to experience this premium setup live!"
                           </p>

                           <Link
                              to="/admission"
                              onClick={() => setActivePhoto(null)}
                              className="w-full bg-[#8fae6a] hover:bg-[#7b9858] text-white font-heading font-bold text-sm uppercase tracking-wide py-3.5 rounded-full shadow-sm transition-all text-center block"
                           >
                              Book Free Demo Here
                           </Link>
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </section>

      {/* Pre-footer Banner */}
      <section className="bg-[#e8eddc] py-16 mt-12 rounded-t-[60px] max-w-7xl mx-auto relative overflow-hidden">
         <div className="text-center px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-heading font-black text-[#8fae6a] mb-6">Join Rajeev Classes Today</h2>
            <p className="text-lg font-medium text-gray-700 mb-10 max-w-2xl mx-auto leading-relaxed">Get the best guidance for your child's future. Schedule your complimentary demo session and experience our teaching firsthand.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link to="/admission" className="inline-block bg-[#8fae6a] text-white px-10 py-4 rounded-full font-heading font-bold hover:bg-[#7b9858] transition-colors shadow-sm text-lg">
                 Book Demo
               </Link>
               <a href="tel:9555188719" className="inline-block bg-white text-[#8fae6a] px-10 py-4 rounded-full font-heading font-bold border-2 border-[#8fae6a] hover:bg-[#fcf8f2] transition-colors text-lg">
                 Call Now
               </a>
            </div>
         </div>
         {/* Background Decor */}
         <div className="absolute -bottom-10 -right-10 opacity-[0.08] pointer-events-none">
            <Calculator className="w-72 h-72 text-[#8fae6a]" />
         </div>
         <div className="absolute -bottom-6 -left-6 opacity-[0.08] pointer-events-none transform -rotate-12">
            <BookOpen className="w-64 h-64 text-[#8fae6a]" />
         </div>
      </section>
      
    </div>
  );
}
