import { useState, useEffect, useRef } from 'react';
import Home from './pages/Home';
import Skills from './components/Skills';
import Projects from './components/Projects';
import ExtraCurricular from './components/ExtraCurricular';
import Contact from './components/Contact';
import Navbar from './components/Navbar';

const App = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const rainContainerRef = useRef<HTMLDivElement>(null);
  const typingCompletedRef = useRef(false); // Add ref to track typing completion

  // Rain animation effect - create only after typing is complete
  useEffect(() => {
    if (!typingComplete || typingCompletedRef.current) return;
    
    typingCompletedRef.current = true; // Mark as completed to prevent re-running
    
    const createRainDots = () => {
      if (!rainContainerRef.current) return;
      
      // Clear any existing dots
      rainContainerRef.current.innerHTML = '';
      
      // Reduced number of dots for less visibility
      const dotCount = 80; // Reduced from 120
      
      for (let i = 0; i < dotCount; i++) {
        const dot = document.createElement('div');
        dot.className = 'raindot';
        
        
        const size = Math.random() * 4 + 2; 
        const left = Math.random() * 100;
        const animationDuration = (Math.random() * 6 + 6) + 's';
        const animationDelay = (Math.random() * 5) + 's'; 
        const opacity = Math.random() * 0.5 + 0.2;
        const startPosition = -20 - (Math.random() * 30); 
        
        dot.style.width = `${size}px`;
        dot.style.height = `${size}px`;
        dot.style.left = `${left}%`;
        dot.style.top = `${startPosition}vh`; 
        dot.style.opacity = `${opacity}`;
        dot.style.animationDuration = animationDuration;
        dot.style.animationDelay = animationDelay;
        
        // Add color variation with reduced visibility
        const colorVariation = Math.random();
        if (colorVariation < 0.3) {
          dot.style.backgroundColor = 'rgba(180, 180, 255, 0.5)'; 
        } else if (colorVariation < 0.6) {
          dot.style.backgroundColor = 'rgba(200, 200, 255, 0.6)'; 
        } else {
          dot.style.backgroundColor = 'rgba(160, 200, 255, 0.4)';
        }
        
        rainContainerRef.current.appendChild(dot);
      }
    };

    // Create rain dots
    createRainDots();
    
    // Recreate dots on window resize to maintain proper distribution
    const handleResize = () => {
      createRainDots();
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [typingComplete]); // Only run when typingComplete changes

  // Scroll section detection effect
  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      sections.forEach((section, index) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          setCurrentSection(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call to set current section
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black relative">
      {/* Rain animation container - covers entire page */}
      {typingComplete && <div ref={rainContainerRef} className="rain-container"></div>}
      
      {/* Navbar Component */}
      <Navbar />

      {/* Navigation Dots */}
      <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 space-y-4">
        {['Home', 'Education', 'Skills', 'Projects', 'Extra', 'Contact'].map((section, index) => (
          <div key={section} className="relative group">
            <div
              className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
                currentSection === index
                  ? 'bg-purple-400 scale-125 shadow-lg shadow-purple-400/50'
                  : 'bg-gray-600 hover:bg-gray-400'
              }`}
              onClick={() => {
                const element = document.getElementById(section.toLowerCase());
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
            <div className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-1 rounded-md text-sm opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap border border-gray-700">
              {section}
            </div>
          </div>
        ))}
      </div>

      {/* Home Section */}
      <section id="home" className="min-h-screen relative z-10">
        <Home onTypingComplete={() => setTypingComplete(true)} />
      </section>

      {/* Projects Section */}
      <section id="projects" className="min-h-screen bg-gray-900 text-white relative z-10">
        <Projects />
      </section>
  

      {/* Skills Section */}
      <section id="skills" className="min-h-screen bg-black text-white px-8 py-16 relative z-10">
        <Skills />
      </section>

     

      {/* Extra Curricular Section */}
      <section id="extra" className="min-h-screen bg-black text-white relative z-10">
        <ExtraCurricular />
      </section>

      {/* Contact Section */}
      <section id="contact" className="min-h-screen bg-gray-900 text-white px-8 py-16 relative z-10">
        <Contact />
      </section>
    </div>
  );
};

export default App;