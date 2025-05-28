'use client';

import React, { useEffect, useRef, useState } from 'react';

const Portfolio = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const aboutRef = useRef<HTMLElement>(null);
  const timelineRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToWork = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      workSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const projects = [
    {
      year: '2022',
      title: 'Podcast',
      description: 'Built an audience of 1.5M+ views. Featured 8-figure founders and industry leaders.',
      tags: ['Content', 'Community', 'Networking'],
      url: 'https://www.youtube.com/@entrepreneurshipinsights',
      metrics: '1.5M+ views'
    },
    {
      year: '2023',
      title: 'Entrelink',
      description: 'Algorithmic fundraising exchange. Democratizing access to funding through intelligence.',
      tags: ['Fintech', 'AI', 'Fundraising'],
      url: 'https://entrelink.us',
      metrics: 'Live Platform'
    },
    {
      year: '2025',
      title: 'Mano',
      description: 'VC intelligence browser. AI-powered insights for smarter investment decisions.',
      tags: ['AI', 'VC Tools', 'Chrome Extension'],
      url: 'https://mano.network',
      metrics: 'Active Users'
    },
    {
      year: 'Now',
      title: 'Fundless',
      description: 'VC without capital. Investment memos on people, not companies.',
      tags: ['VC', 'Talent', 'Public Memos'],
      url: 'https://fundless.vercel.app',
      metrics: 'In Development'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 font-light overflow-hidden">
      {/* Cursor */}
      <div 
        className="fixed w-6 h-6 pointer-events-none z-50 mix-blend-difference"
        style={{
          left: mousePosition.x - 12,
          top: mousePosition.y - 12,
          background: 'white',
          borderRadius: '50%',
          transition: 'transform 0.1s ease-out',
        }}
      />

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-1000 ${isLoaded ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
        <div className="flex justify-between items-center p-8">
          <div className="text-sm font-medium tracking-wide">GB</div>
          <div className="flex space-x-8 text-sm">
            <a href="#about" className="hover:text-blue-600 transition-colors duration-300">About</a>
            <a href="#work" className="hover:text-blue-600 transition-colors duration-300">Work</a>
            <a href="mailto:gyanb@berkeley.edu" className="hover:text-blue-600 transition-colors duration-300">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex items-center justify-center relative">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 to-white" />
        
        {/* Floating geometric shapes */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-blue-500/5 rounded-full"
              style={{
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                left: `${20 + i * 15}%`,
                top: `${10 + i * 20}%`,
                animation: `float-${i} ${8 + i * 2}s ease-in-out infinite`,
              }}
            />
          ))}
        </div>

        <div className={`text-center z-10 transition-all duration-2000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="text-7xl md:text-9xl font-extralight mb-6 tracking-tight">
            Gyan
            <span className="block text-blue-600 font-light">Bhambhani</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            I build what I wish existed
          </p>
          <div className="mt-12 flex justify-center space-x-4">
            <button 
              onClick={scrollToWork}
              className="px-8 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            >
              View Work
            </button>
            <button 
              onClick={() => window.open('mailto:gyanb@berkeley.edu')}
              className="px-8 py-3 border border-gray-300 rounded-full hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
            >
              Get in Touch
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" ref={aboutRef} className="py-32 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-extralight mb-8">Building.</h2>
              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>From zero to one. From silence to signal.</p>
                <p>I don't wait for permission. When I see a gap in the market, I fill it. When I need a tool that doesn't exist, I build it.</p>
                <p>Berkeley-trained, battle-tested, and always building the next thing that makes people wonder why it didn't exist before.</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { number: '1.5M+', label: 'Podcast Views' },
                { number: '4', label: 'Companies' },
                { number: 'Berkeley', label: 'Business + Data Science' },
                { number: '2025', label: 'Still Building' }
              ].map((stat, index) => (
                <div 
                  key={index} 
                  className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100 hover:shadow-lg transition-all duration-500 group"
                >
                  <div className="text-3xl font-light text-blue-600 mb-2 group-hover:scale-110 transition-transform duration-300">
                    {stat.number}
                  </div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Work Timeline */}
      <section id="work" ref={timelineRef} className="py-32 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-4xl mx-auto px-8">
          <h2 className="text-5xl font-extralight text-center mb-20">My Journey.</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-blue-200 via-blue-400 to-blue-200" />
            
            {projects.map((project, index) => (
              <div key={index} className="relative mb-16 group">
                {/* Timeline dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-600 rounded-full border-4 border-white shadow-lg group-hover:scale-125 transition-transform duration-300" />
                
                {/* Content */}
                <div className="ml-20">
                  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                    <div className="flex items-center justify-between mb-4">
                      <div className="text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                        {project.year}
                      </div>
                      <div className="text-sm text-gray-500">{project.metrics}</div>
                    </div>
                    
                    <h3 className="text-2xl font-medium mb-3">{project.title}</h3>
                    <p className="text-gray-700 mb-6 leading-relaxed">{project.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag, tagIndex) => (
                        <span 
                          key={tagIndex} 
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <a 
                      href={project.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-300 group"
                    >
                      Explore Project
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-32 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-5xl font-extralight mb-8">Let's Build Something.</h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Got an idea that needs execution? Let's turn it into reality.
          </p>
          
          <div className="flex justify-center space-x-6">
            <a 
              href="mailto:gyanb@berkeley.edu"
              className="px-8 py-4 bg-blue-600 rounded-full hover:bg-blue-700 transition-all duration-300 hover:scale-105"
            >
              Email Me
            </a>
            <a 
              href="https://www.linkedin.com/in/gyanbhambhani/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 border border-gray-600 rounded-full hover:border-white transition-all duration-300 hover:scale-105"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float-0 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-1 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-180deg); }
        }
        @keyframes float-2 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(180deg); }
        }
        @keyframes float-3 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-25px) rotate(-180deg); }
        }
        @keyframes float-4 {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-35px) rotate(180deg); }
        }
      `}</style>
    </div>
  );
};

export default Portfolio;