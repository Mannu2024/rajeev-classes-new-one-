const fs = require('fs');
const content = `import React from 'react';
import { ArrowRight, BookOpen, Calculator, Atom, FileText, CheckCircle2, Star, Sparkles, Pencil } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

const courses = [
  {
    title: 'Classes 1st to 5th',
    subjects: ['All Subjects'],
    icon: BookOpen,
    desc: 'Building a strong foundation with interactive and engaging learning methods.',
    bgColor: 'bg-[#f0c8e1]',
    iconColor: 'text-[#cc72ac]'
  },
  {
    title: 'Classes 6th to 9th',
    subjects: ['Mathematics', 'Science', 'English', 'Social Science', 'All Major Subjects'],
    icon: Atom,
    desc: 'Enhancing analytical skills and conceptual clarity for mid-level students.',
    bgColor: 'bg-[#d2def3]',
    iconColor: 'text-[#779dda]'
  },
  {
    title: 'Classes 9th & 10th',
    subjects: ['Mathematics', 'Science'],
    icon: Calculator,
    desc: 'Focused preparation for board exams with rigorous practice and doubt clearing.',
    bgColor: 'bg-[#f6e191]',
    iconColor: 'text-[#d7b224]'
  },
  {
    title: '11th & 12th (Science)',
    subjects: ['Mathematics', 'Biology', 'Computer Science'],
    icon: Atom,
    desc: 'Advanced level coaching designed for competitive edge and board excellence.',
    bgColor: 'bg-[#d9ecd3]',
    iconColor: 'text-[#8fae6a]'
  },
  {
    title: '11th & 12th (Commerce)',
    subjects: ['Accountancy', 'Economics', 'Business Studies'],
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

export function Home() {
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
               <div key={idx} className="bg-[#fcf8f2] rounded-3xl p-6 shadow-sm border-4 border-[#f2eadc]">
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
              <h2 className="text-4xl font-heading font-black text-[#8fae6a]">Why Choose Rajeev Classes?</h2>
            </div>
            <p className="text-gray-600 text-lg mb-10 leading-relaxed font-medium">
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
         <div className="relative h-[500px] hidden md:block">
            {/* Sticker 1 */}
            <div className="absolute top-0 right-10 w-64 h-64 bg-[#fcd2b0] rounded-[40px] transform rotate-6 border-4 border-[#df8c4f] shadow-sm flex items-center justify-center p-6 overflow-hidden">
               <div className="relative z-10 text-center">
                  <BookOpen className="w-20 h-20 text-white mx-auto mb-4" />
                  <p className="font-heading font-bold text-white text-xl">Concept Based</p>
               </div>
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=600')] opacity-30 object-cover rounded-[36px] mix-blend-multiply"></div>
            </div>
            
            {/* Sticker 2 */}
            <div className="absolute bottom-10 left-10 w-72 h-48 bg-[#d2def3] rounded-[40px] transform -rotate-12 border-4 border-[#779dda] shadow-sm flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=600')] opacity-50 object-cover rounded-[36px] mix-blend-multiply"></div>
               <p className="font-heading font-black text-white text-3xl z-10 relative px-6 text-center drop-shadow-md">Teamwork & Dedicated Faculty</p>
            </div>
            
            <svg className="absolute top-1/2 left-1/4 w-24 h-24 text-[#f6e191]" viewBox="0 0 100 100">
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
               <div key={idx} className={\`\${course.bgColor} rounded-[40px] p-10 transform transition-transform hover:-translate-y-2 shadow-sm border-2 border-white\`}>
                  <div className="flex justify-between items-start mb-6">
                     <div className="bg-white/50 p-4 rounded-2xl backdrop-blur-sm">
                        <course.icon className={\`w-8 h-8 \${course.iconColor}\`} />
                     </div>
                     {idx % 2 === 0 && <Star className={\`w-8 h-8 fill-white text-white opacity-50\`} />}
                  </div>
                  <h3 className="text-2xl font-heading font-black text-[#4a4a4a] mb-2">{course.title}</h3>
                  <div className="flex flex-wrap gap-1.5 mb-6">
                     {course.subjects.map((subject, sIdx) => (
                        <span 
                           key={sIdx} 
                           className="bg-white/85 hover:bg-white text-gray-700 text-xs font-bold px-3 py-1.5 rounded-xl border border-white/40 select-none shadow-xs transition-all duration-200"
                        >
                           {subject}
                        </span>
                     ))}
                  </div>
                  <p className="text-gray-700 font-medium text-[15px] leading-relaxed">
                     {course.desc}
                  </p>
               </div>
            ))}
            
            {/* Extra CTA Card */}
            <div className="bg-[#f2eadc] rounded-[40px] p-10 flex flex-col items-center justify-center text-center border-4 border-dashed border-[#dcd1ba]">
               <h3 className="text-3xl font-heading font-black text-[#8fae6a] mb-4">Ready to start learning?</h3>
               <Link to="/admission" className="inline-flex items-center justify-center px-8 py-3 w-full font-heading font-bold rounded-full text-white bg-[#8fae6a] hover:bg-[#7b9858] transition-colors shadow-sm">
                  Book Free Demo
               </Link>
            </div>
         </div>
      </section>

      {/* Footer pre-banner */}
      <section className="bg-[#e8eddc] py-16 mt-12 rounded-t-[60px] max-w-7xl mx-auto relative overflow-hidden">
         <div className="text-center px-4 relative z-10">
            <h2 className="text-4xl font-heading font-black text-[#8fae6a] mb-6">Join Rajeev Classes Today</h2>
            <p className="text-lg font-medium text-gray-600 mb-8 max-w-2xl mx-auto">Get the best guidance for your child's future. Schedule your complimentary demo session and experience our teaching firsthand.</p>
            <div className="flex justify-center gap-4">
               <Link to="/admission" className="bg-[#8fae6a] text-white px-8 py-3 rounded-full font-heading font-bold hover:bg-[#7b9858] transition-colors shadow-sm">
                 Book Demo
               </Link>
               <a href="tel:9555188719" className="bg-white text-[#8fae6a] px-8 py-3 rounded-full font-heading font-bold border-2 border-[#8fae6a] hover:bg-[#fcf8f2] transition-colors">
                 Call Now
               </a>
            </div>
         </div>
         <div className="absolute -bottom-10 -right-10 opacity-20 hidden md:block">
            <Calculator className="w-64 h-64 text-[#8fae6a]" />
         </div>
      </section>
      
    </div>
  );
}
`;

fs.writeFileSync('./src/pages/Home.tsx', content, 'utf8');
console.log('Home.tsx written successfully');
