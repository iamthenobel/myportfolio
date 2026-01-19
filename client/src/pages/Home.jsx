import React, { useState, useEffect } from 'react';
// Use Vite env variable for API URL
const API_URL = import.meta.env.VITE_API_URL;
import { Home, User, FolderDot, Rss, Mail, Linkedin, Github, Menu, X, Tag } from 'lucide-react'; // Using lucide-react for icons

// Utility to simulate navigation
const navigate = (path, setCurrentPath) => {
  setCurrentPath(path);
};

// --- Components ---
// Skill categories for AboutSection
const skillCategories = [
  {
    category: 'Frontend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ),
    skills: [
      { name: 'React.js', percent: 92, color: 'blue-500' },
      { name: 'JavaScript', percent: 90, color: 'yellow-400' },
      { name: 'Tailwind CSS', percent: 85, color: 'cyan-400' },
    ],
  },
  {
    category: 'Backend',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    skills: [
      { name: 'Node.js', percent: 80, color: 'green-500' },
      { name: 'Express', percent: 78, color: 'emerald-400' },
      { name: 'Databases', percent: 75, color: 'purple-400' },
    ],
  },
  {
    category: 'Other',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    skills: [
      { name: 'Git & GitHub', percent: 88, color: 'gray-700' },
      { name: 'UI/UX Design', percent: 80, color: 'pink-400' },
    ],
  },
];

const Navbar = ({ setCurrentPath }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNav = (path) => {
    navigate(path, setCurrentPath);
    setMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-xl bg-opacity-60 shadow-sm p-4 md:px-8 flex justify-between items-center rounded-b-lg border-b border-blue-100">
      <div className="flex items-center justify-between w-full">
        {/* Logo/Brand */}
        <div className="flex items-center gap-3 group cursor-pointer" onClick={() => handleNav('/')}>
          <div className="relative">
            <img
              src="https://i.postimg.cc/cH2Q2ZNs/IMG-1170.png"
              alt="Logo"
              className="h-12 w-12 rounded-full object-cover border-2 border-blue-100 shadow-md group-hover:border-blue-300 transition-all duration-300"
            />
            <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-blue-200/30 transition-all duration-300 pointer-events-none" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
            THE BOSS
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {[
            { path: '/', icon: <Home className="h-5 w-5" />, label: 'Home' },
            { path: '/about', icon: <User className="h-5 w-5" />, label: 'About' },
            { path: '/projects', icon: <FolderDot className="h-5 w-5" />, label: 'Projects' },
            { path: '/blog', icon: <Rss className="h-5 w-5" />, label: 'Blog' },
            { path: '/contact', icon: <Mail className="h-5 w-5" />, label: 'Contact' }
          ].map((item) => (
            <button
              key={item.path}
              onClick={() => handleNav(item.path)}
              className="flex items-center px-4 py-2 rounded-lg transition-all duration-200 hover:bg-blue-50 group"
            >
              <span className="text-gray-600 group-hover:text-blue-600 transition-colors mr-2">
                {item.icon}
              </span>
              <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
      {/* Mobile Hamburger */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
          {menuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-b-lg border border-gray-100 flex flex-col py-2 animate-fade-in z-50 overflow-hidden">
          <button
            onClick={() => handleNav('/')}
            className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 group"
          >
            <div className="p-1.5 mr-3 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Home className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="font-medium">Home</span>
          </button>

          <button
            onClick={() => handleNav('/about')}
            className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 group"
          >
            <div className="p-1.5 mr-3 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
              <User className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="font-medium">About</span>
          </button>

          <button
            onClick={() => handleNav('/projects')}
            className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 group"
          >
            <div className="p-1.5 mr-3 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
              <FolderDot className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="font-medium">Projects</span>
          </button>

          <button
            onClick={() => handleNav('/blog')}
            className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 group"
          >
            <div className="p-1.5 mr-3 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Rss className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="font-medium">Blog</span>
          </button>

          <button
            onClick={() => handleNav('/contact')}
            className="flex items-center w-full px-4 py-3 text-gray-800 hover:bg-gray-50 hover:text-blue-600 transition-colors duration-200 group"
          >
            <div className="p-1.5 mr-3 bg-gray-100 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Mail className="h-5 w-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="font-medium">Contact</span>
          </button>
        </div>
      )}
    </nav>
  );
};

const HeroSection = ({ setCurrentPath }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen text-center bg-gradient-to-br from-gray-50 to-red-50 px-4 pt-20 pb-32 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Floating Gradient Blobs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.4, 0.6, 0.4],
            scale: [1, 1.1, 1],
            x: ["-10%", "10%", "-10%"],
            y: ["-5%", "5%", "-5%"]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full blur-[80px] opacity-40"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
            x: ["5%", "-5%", "5%"],
            y: ["10%", "-10%", "10%"]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-400 to-amber-300 rounded-full blur-[100px] opacity-30"
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        {/* Falling Particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [0.6, 0],
              x: Math.random() > 0.5 ? [0, 50] : [0, -50]
            }}
            transition={{
              duration: 10 + Math.random() * 10,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
            className={`absolute ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-pink-400' : 'bg-amber-400'} rounded-full blur-[1px]`}
            style={{
              left: `${10 + (i * 7)}%`,
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              opacity: 0.6
            }}
          />
        ))}

        {/* Animated Wave */}
        <motion.svg
          initial={{ y: 40 }}
          animate={{ y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="absolute bottom-0 left-0 w-full h-auto z-0"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#3B82F6"
            fillOpacity="0.2"
            d="M0,64L60,74.7C120,85,240,107,360,112C480,117,600,107,720,96C840,85,960,75,1080,69.3C1200,64,1320,64,1380,64L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z"
          />
        </motion.svg>
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut', delay: 0.2 }}
        className="relative z-10 max-w-5xl px-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="inline-flex items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6 border border-gray-100"
        >
          <span className="relative flex h-3 w-3 mr-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
          </span>
          <span className="text-sm font-medium text-gray-700">Now available for new projects</span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Digital Experiences</span><br />That Inspire
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-lg md:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed"
        >
          I blend design and technology to create immersive web experiences.
          Explore my portfolio to see how I transform ideas into digital reality.
        </motion.p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/projects', setCurrentPath)}
            className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Explore My Work
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>

          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
            }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/blog', setCurrentPath)}
            className="relative inline-flex items-center justify-center px-8 py-4 bg-white text-gray-800 font-semibold rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
          >
            <span className="relative z-10 flex items-center">
              Read My Blog
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="flex flex-col items-center">
          <span className="text-sm text-gray-500 mb-2">Read more about me</span>
          <motion.button
            onClick={() => {
              const aboutSection = document.querySelector("section");
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: "smooth" });
              } else {
                setCurrentPath && setCurrentPath("/about");
              }
            }}
            animate={{
              y: [0, 10, 0],
              opacity: [0.6, 1, 0.6]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="focus:outline-none"
            aria-label="Scroll to About Me"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden">
      {/* Enhanced background elements */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full blur-[100px] opacity-40 animate-float-slow"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-100 rounded-full blur-[100px] opacity-30 animate-float-slower"></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-purple-100 rounded-full blur-[80px] opacity-20 animate-float"></div>

        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,white,transparent_70%)]">
          <div className="absolute inset-0 [background-image:linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]"></div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto"
      >
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden border border-gray-200/80">
          {/* Hero section */}
          <div className="flex flex-col lg:flex-row items-center gap-8 px-8 py-12 bg-gradient-to-br from-blue-50/50 to-gray-50/50">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                <img
                  src="https://i.postimg.cc/zDcfTK3B/profile-professional.webp"
                  alt="Profile Photo"
                  className="w-64 h-64 lg:w-80 lg:h-80 rounded-2xl object-cover shadow-2xl border-4 border-white/90"
                  style={{ boxShadow: '0 15px 50px rgba(59,130,246,0.15)' }}
                />
                <div className="absolute -inset-4 rounded-2xl border-2 border-blue-200/30 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-full p-3 shadow-lg border border-gray-200">
                <div className="bg-blue-600 text-white rounded-full p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>
            </motion.div>

            <div className="flex-1 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                  About <span className="text-blue-600">Me</span>
                </h2>
                <div className="w-20 h-1 bg-blue-500 rounded-full mb-6 mx-auto lg:mx-0"></div>

                <p className="text-lg sm:text-xl text-gray-700 my-6 leading-relaxed">
                  Hi! I'm a passionate <span className="font-semibold text-blue-600">full-stack developer</span> focused on building beautiful, functional applications. My expertise covers modern frontend and backend technologies, and I love turning ideas into reality with code and design.
                </p>

                <p className="text-lg sm:text-xl text-gray-700 leading-relaxed mb-8">
                  I constantly seek to learn new tools and trends, and enjoy collaborating on creative projects. When not coding, I explore design, animation, and contribute to open-source.
                </p>

                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                  <a href='CV.html' className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md hover:shadow-lg">
                    View my CV
                  </a>
                  <button
                    className="px-6 py-3 bg-white text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm hover:shadow-md"
                    onClick={() => navigate('/contact', typeof setCurrentPath !== 'undefined' ? setCurrentPath : undefined)}
                  >
                    Contact Me
                  </button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Content area */}
          <div className="pt-20 pb-16 px-8 sm:px-12">
            <div className="max-w-4xl mx-auto">
              {/* Education & Experience */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Education</h3>
                  </div>

                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-blue-100/50 rounded-full p-1 mr-4 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">B.Sc. Chemistry</h4>
                        <p className="text-gray-600">University of Lagos, Nigeria</p>
                        <p className="text-sm text-gray-500 mt-1">2021 - 2025</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100/50 rounded-full p-1 mr-4 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Full Stack Web Development</h4>
                        <p className="text-gray-600">Online Courses and Physical Trainings</p>
                        <p className="text-sm text-gray-500 mt-1">2019 - Present</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, margin: "-50px" }}
                  className="bg-white rounded-xl p-6 shadow-md border border-gray-100 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center mb-6">
                    <div className="bg-blue-100 p-3 rounded-lg mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Experience</h3>
                  </div>

                  <ul className="space-y-6">
                    <li className="flex items-start">
                      <div className="bg-blue-100/50 rounded-full p-1 mr-4 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Freelance Web Developer & Designer</h4>
                        <p className="text-gray-600">Remote</p>
                        <p className="text-sm text-gray-500 mt-1">2021 - Present</p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="bg-blue-100/50 rounded-full p-1 mr-4 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800">Web Development Intern</h4>
                        <p className="text-gray-600">TechStart Africa</p>
                        <p className="text-sm text-gray-500 mt-1">2020</p>
                      </div>
                    </li>
                  </ul>
                </motion.div>
              </div>

              {/* Skills section */}
              <div className="mt-16">
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16"
                >
                  My <span className="text-blue-600">Skills</span> & Expertise
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {skillCategories.map((category, idx) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: idx * 0.15 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="group"
                    >
                      <div className="h-full bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200">
                        <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-5 px-6 border-b border-gray-200">
                          <h4 className="text-xl font-bold text-blue-600 flex items-center">
                            <div className="bg-blue-100 p-2 rounded-lg mr-3">
                              {category.icon}
                            </div>
                            {category.category}
                          </h4>
                        </div>
                        <div className="p-6">
                          <div className="space-y-6">
                            {category.skills.map(skill => (
                              <div key={skill.name} className="flex flex-col">
                                <div className="flex justify-between items-center mb-2">
                                  <span className="font-medium text-gray-700">{skill.name}</span>
                                  <span className="text-sm font-semibold text-blue-600">{skill.percent}%</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.percent}%` }}
                                    transition={{ duration: 1.2, delay: 0.3 }}
                                    viewport={{ once: true }}
                                    className={`h-full rounded-full ${getSkillColor(skill.color)}`}
                                  />
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// Helper function for gradient colors
function getGradientColors(color) {
  const gradients = {
    'blue-500': 'from-blue-500 to-blue-400',
    'yellow-400': 'from-yellow-400 to-yellow-300',
    'cyan-400': 'from-cyan-400 to-cyan-300',
    'green-500': 'from-green-500 to-green-400',
    'emerald-400': 'from-emerald-400 to-emerald-300',
    'purple-400': 'from-purple-400 to-purple-300',
    'gray-700': 'from-gray-700 to-gray-500',
    'pink-400': 'from-pink-400 to-pink-300'
  };
  return gradients[color] || 'from-blue-500 to-blue-400';
}

// Helper function for skill bar colors
function getSkillColor(color) {
  const colors = {
    'blue-500': 'bg-blue-500',
    'yellow-400': 'bg-yellow-400',
    'cyan-400': 'bg-cyan-400',
    'green-500': 'bg-green-500',
    'emerald-400': 'bg-emerald-400',
    'purple-400': 'bg-purple-400',
    'gray-700': 'bg-gray-700',
    'pink-400': 'bg-pink-400'
  };
  return colors[color] || 'bg-blue-500';
}

const ProjectCard = ({ title, description, imageUrl, demoLink, repoLink, onLiveDemo, tags }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2 flex flex-col h-full border border-gray-100 group">
      {/* Image with hover overlay */}
      <div className="relative overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-48 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/F3F4F6/374151?text=Project+Preview";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800"
                >
                  {tag.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-3">{description}</p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3 mt-4">
          {demoLink && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 text-sm font-medium shadow-sm"
              onClick={() => onLiveDemo && onLiveDemo(demoLink, title)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Live Demo
            </motion.button>
          )}

          {repoLink && (
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={repoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors duration-300 text-sm font-medium shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              View Code
            </motion.a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUrl, setModalUrl] = useState("");
  const [modalTitle, setModalTitle] = useState("");

  const projects = [
    {
      title: "MySpace - Digital Space",
      description: "A simple site that allows users to store their favorite links, images, and notes in a personal space.",
      imageUrl: "https://i.postimg.cc/yx87rBNB/myspace.png",
      demoLink: "https://myspacely.netlify.app/",
      repoLink: "#",
    },
    {
      title: "Myuo Boilerplate",
      description: "A responsive boilerplate template for web applications, featuring a clean design and essential components.",
      imageUrl: "https://i.postimg.cc/rwF5CtTY/boiler.png",
      demoLink: "https://myuoboilerplate.netlify.app/",
      repoLink: "#",
    },
    {
      title: "Chemistry Calculator",
      description: "An interactive weather dashboard fetching real-time weather data from an API, displaying forecasts and current conditions.",
      imageUrl: "https://i.postimg.cc/ZRDqS13m/Chemistry-tools.png",
      demoLink: "https://thebosschemlab.netlify.app/",
      repoLink: "https://github.com/iamthenobel/chemlab.git",
    },
    {
      title: "Symmetry Calculator",
      description: "A simple tool that provides interactive resources for studying molecular symmetry. It includes a compound search interface, point group explorer, and mathematical formula reference for symmetry operations, character tables, and group theory.",
      imageUrl: "https://i.postimg.cc/3JG2tB5N/symmetry.png",
      demoLink: "https://symmetrymini.netlify.app/",
      repoLink: "https://github.com/iamthenobel/symmetry-.git",
    },
  ];

  const handleLiveDemo = (url, title) => {
    if (window.innerWidth >= 1024) {
      setModalUrl(url);
      setModalTitle(title);
      setModalOpen(true);
    } else {
      window.open(url, "_blank");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalUrl("");
    setModalTitle("");
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-30 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">My Projects</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Explore my portfolio of professional work and personal projects
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              {...project}
              onLiveDemo={handleLiveDemo}
            />
          ))}
        </div>
      </div>

      {/* Enhanced Project Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
              onClick={handleCloseModal}
            >
              <div className="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm"></div>
            </div>

            {/* Modal container */}
            <div className="inline-block align-bottom bg-white rounded-t-2xl sm:rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full h-screen sm:h-[90vh]">
              <div className="bg-white flex flex-col h-full">
                {/* Modal header */}
                <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{modalTitle}</h3>
                    <p className="text-sm text-gray-500 mt-1">{modalUrl.replace(/^https?:\/\//, '')}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <a
                      href={modalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                    >
                      Open in New Tab
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                    <button
                      onClick={handleCloseModal}
                      className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
                      aria-label="Close"
                    >
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Modal content */}
                <div className="flex-1 relative">
                  <div className="absolute inset-0 bg-gray-100 flex items-center justify-center">
                    <div className="animate-pulse text-gray-500">
                      <svg className="w-10 h-10 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                      </svg>
                      <p className="mt-2">Loading preview...</p>
                    </div>
                  </div>
                  <iframe
                    src={modalUrl}
                    title={modalTitle}
                    className="absolute inset-0 w-full h-full border-0"
                    allowFullScreen
                    loading="eager"
                    onLoad={() => console.log('iframe loaded')}
                  />
                </div>

                {/* Modal footer */}
                <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    <span className="text-sm text-gray-500">{modalUrl}</span>
                  </div>
                  <button
                    onClick={handleCloseModal}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

const BlogSection = () => {
  const [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    fetch(`${API_URL.replace(/\/$/, '')}/posts`)
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const [currentPostId, setCurrentPostId] = React.useState(null);

  if (currentPostId) {
    // Simulate navigation to blog post page
    return <BlogPostPage postId={currentPostId} />;
  }

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-30 px-4 sm:px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            My Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Welcome to my blog where I share insights on web development, technology trends, and personal experiences.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900">No blog posts yet!</h3>
            <p className="mt-2 text-gray-500">Please check back later for new content.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all duration-200 flex flex-col group"
              >
                {post.coverPhoto && (
                  <div className="relative h-48 w-full">
                    <img
                      src={post.coverPhoto}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                  </div>
                )}

                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.split(',').map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-3 leading-snug">
                    <button
                      onClick={() => setCurrentPostId(post.id)}
                      className="text-left hover:text-blue-500 focus:outline-none transition-colors"
                    >
                      {post.title}
                    </button>
                  </h2>

                  <p className="text-gray-600 mb-4 line-clamp-2">
                    <span
                      dangerouslySetInnerHTML={{
                        __html: post.content
                          ? post.content.length > 180
                            ? post.content.slice(0, 180) + "..."
                            : post.content
                          : "Read this interesting post..."
                      }}
                    />
                  </p>

                  <div className="mt-auto pt-4 border-t border-gray-100">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span>
                            {new Date(post.timeUploaded).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                        </span>

                        <span className="flex items-center space-x-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          <span>{post.commentCount}</span>
                        </span>
                      </div>

                      <span className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        <span>{post.likes}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => setCurrentPostId(post.id)}
                      className="mt-4 w-full py-2.5 px-4 bg-gray-50 hover:bg-gray-100 text-gray-800 rounded-lg font-medium flex items-center justify-center transition-colors"
                    >
                      Read post
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

// Blog post page component
function BlogPostPage({ postId }) {
  const [post, setPost] = React.useState(null);
  const [comments, setComments] = React.useState([]);
  const [likeStatus, setLikeStatus] = React.useState('');
  const [hasLiked, setHasLiked] = React.useState(() => {
    try {
      const likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
      // Ensure likedPosts is always an object
      if (typeof likedPosts !== 'object' || likedPosts === null) return false;
      return !!likedPosts[String(postId)];
    } catch {
      return false;
    }
  });
  React.useEffect(() => {
    if (likeStatus) {
      const timer = setTimeout(() => setLikeStatus(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [likeStatus]);
  const [commentForm, setCommentForm] = React.useState({ name: '', email: '', content: '' });
  const [commentStatus, setCommentStatus] = React.useState('');
  React.useEffect(() => {
    if (commentStatus) {
      const timer = setTimeout(() => setCommentStatus(''), 2500);
      return () => clearTimeout(timer);
    }
  }, [commentStatus]);
  const [backToBlog, setBackToBlog] = React.useState(false);

  React.useEffect(() => {
    fetch(`${API_URL.replace(/\/$/, '')}/posts/${postId}`)
      .then(res => res.json())
      .then(data => setPost(data));
    fetch(`${API_URL.replace(/\/$/, '')}/comments?postId=${postId}`)
      .then(res => res.json())
      .then(data => setComments(data));
  }, [postId, likeStatus, commentStatus]);

  if (backToBlog) {
    return <BlogSection />;
  }

  if (!post) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  const handleLike = async () => {
    if (hasLiked) return;
    setLikeStatus('');
    try {
      const response = await fetch(`${API_URL.replace(/\/$/, '')}/posts/${postId}/like`, {
        method: 'POST',
      });
      if (response.ok) {
        setLikeStatus('Liked!');
        setHasLiked(true);
        // Save to localStorage
        try {
          let likedPosts = {};
          try {
            likedPosts = JSON.parse(localStorage.getItem('likedPosts') || '{}');
          } catch {
            likedPosts = {};
          }
          if (typeof likedPosts !== 'object' || likedPosts === null) likedPosts = {};
          likedPosts[String(postId)] = true;
          localStorage.setItem('likedPosts', JSON.stringify(likedPosts));
        } catch { }
      } else {
        setLikeStatus('Failed to like post.');
      }
    } catch {
      setLikeStatus('Error liking post.');
    }
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setCommentForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setCommentStatus('');
    try {
      const response = await fetch(`${API_URL.replace(/\/$/, '')}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...commentForm, postId }),
      });
      if (response.ok) {
        setCommentStatus('Comment added!');
        setCommentForm({ name: '', email: '', content: '' });
      } else {
        setCommentStatus('Failed to add comment.');
      }
    } catch {
      setCommentStatus('Error adding comment.');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-red-50 py-30 px-4 sm:px-6 md:px-12">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <button
            onClick={() => setBackToBlog(true)}
            className="inline-flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110-2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Blog
          </button>
        </div>

        <article className="bg-white rounded-xl shadow-md overflow-hidden">
          {post.coverPhoto && (
            <img
              src={post.coverPhoto}
              alt={post.title}
              className="w-full h-64 sm:h-80 object-cover"
            />
          )}

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.split(',').map((tag, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-[#252525] bg-transparent text-[#252525]"
                  style={{ background: 'rgba(37,37,37,0.05)' }}
                >
                  <Tag className="h-4 w-4 mr-1 text-[#252525]" />
                  {tag.trim()}
                </span>
              ))}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              {post.title}
            </h1>

            <div className="flex items-center text-sm text-gray-500 space-x-4 mb-6">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                {new Date(post.timeUploaded).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                {post.commentCount} comments
              </span>
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {post.likes} likes
              </span>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 mb-8">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </div>

            <div className="flex items-center space-x-6 mb-10">
              {/* Like Button */}
              <button
                onClick={handleLike}
                disabled={hasLiked}
                className={`flex flex-col items-center justify-center group transition-all ${hasLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500'}`}
              >
                <div className={`p-2 rounded-full ${hasLiked ? 'bg-red-100' : 'group-hover:bg-red-100'} transition-colors`}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill={hasLiked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                    />
                  </svg>
                </div>
                <span className="text-xs mt-1">{hasLiked ? 'Liked' : 'Like'}</span>
              </button>

              {/* Share Button */}
              <button
                onClick={() => {
                  if (navigator.share) {
                    navigator.share({
                      title: post.title,
                      text: post.content?.replace(/<[^>]+>/g, '').slice(0, 120) + '...',
                      url: window.location.href
                    });
                  } else {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Post link copied to clipboard!');
                  }
                }}
                className="flex flex-col items-center justify-center group text-gray-500 hover:text-gray-700 transition-all"
              >
                <div className="p-2 rounded-full group-hover:bg-gray-100 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                    />
                  </svg>
                </div>
                <span className="text-xs mt-1">Share</span>
              </button>

              {/* Like Status Indicator */}
              {likeStatus && (
                <div className="flex items-center text-sm text-gray-500 ml-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{likeStatus}</span>
                </div>
              )}
            </div>

            {/* Comments Section */}
            <div className="border-t border-gray-200 pt-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Comments
              </h2>

              {comments.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  <p className="mt-2 text-gray-500">No comments yet. Be the first to share your thoughts!</p>
                </div>
              ) : (
                <div className="space-y-6 mb-8">
                  {comments.map((c) => {
                    // Get initials
                    const initials = c.name
                      ? c.name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase()
                      : '?';
                    // Generate color from name
                    const colors = [
                      'bg-blue-500', 'bg-pink-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500', 'bg-red-500', 'bg-indigo-500', 'bg-teal-500', 'bg-orange-500', 'bg-cyan-500'
                    ];
                    let colorIdx = 0;
                    if (c.name) {
                      colorIdx = c.name.charCodeAt(0) % colors.length;
                    }
                    const avatarColor = colors[colorIdx];
                    return (
                      <div key={c.id} className="bg-gray-50 rounded-lg p-5 shadow-sm">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className={`inline-flex items-center justify-center w-9 h-9 rounded-full font-bold text-white text-lg shadow ${avatarColor}`}>{initials}</span>
                            <h3 className="font-semibold text-gray-900">{c.name}</h3>
                          </div>
                          <span className="text-xs text-gray-500">
                            {new Date(c.created_at).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-gray-700">{c.content}</p>
                      </div>
                    );
                  })}
                </div>
              )}

              <form onSubmit={handleCommentSubmit} className="space-y-4 bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-medium text-gray-900">Leave a comment</h3>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={commentForm.name}
                      onChange={handleCommentChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={commentForm.email}
                      onChange={handleCommentChange}
                      className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                    Comment
                  </label>
                  <textarea
                    name="content"
                    id="content"
                    rows={4}
                    value={commentForm.content}
                    onChange={handleCommentChange}
                    className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Share your thoughts..."
                    required
                  ></textarea>
                </div>
                <div className="flex items-center justify-end">
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Post Comment
                  </button>
                </div>
                {commentStatus && (
                  <div className="rounded-md bg-green-50 p-4 mt-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-green-800">{commentStatus}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending message...');
    try {
      const response = await fetch(`${API_URL.replace(/\/$/, '')}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('Message sent successfully! I will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again later.');
      }
    } catch (error) {
      setStatus('An error occurred. Please try again later.');
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-20 px-4 sm:px-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 sm:p-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Get In Touch</h2>
          <p className="text-gray-500">
            Interested in working together or have something to share?
            <br className="hidden sm:block" /> Send me a message below.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-150 placeholder-gray-400"
              placeholder="Your name"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-150 placeholder-gray-400"
              placeholder="your.email@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-3 text-gray-900 border border-gray-200 rounded-lg focus:ring-1 focus:ring-gray-900 focus:border-gray-900 transition-all duration-150 placeholder-gray-400 resize-none"
              placeholder="What would you like to discuss?"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 active:bg-gray-700 transition-all duration-150 font-medium"
          >
            Send Message
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {status && (
            <div className={`mt-4 text-center text-sm font-medium ${status.includes('success') ? 'text-green-600' : 'text-gray-600'
              }`}>
              {status}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 px-4 sm:px-6 rounded-t-2xl border-t border-gray-700">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center">
          {/* Social Links */}
          <div className="flex space-x-6 mb-6">
            <a
              href="https://www.linkedin.com/in/the-boss-4585b4321/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-white transition-all duration-300 group"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-6 w-6 text-gray-400 group-hover:text-blue-400" />
            </a>
            <a
              href="https://github.com/iamthenobel"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 bg-gray-800 rounded-full hover:bg-gray-700 hover:text-white transition-all duration-300 group"
              aria-label="GitHub"
            >
              <Github className="h-6 w-6 text-gray-400 group-hover:text-white" />
            </a>
            {/* Add more social links with the same pattern */}
          </div>

          {/* Copyright and additional info */}
          <div className="flex flex-col items-center text-center space-y-2">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} THE BOSS. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Built with React and Tailwind CSS.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="mt-6 text-xs text-gray-500 hover:text-white flex items-center transition-colors"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

export default function App() {
  const [currentPath, setCurrentPath] = useState('/');

  // Simulate scroll to top on path change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPath]);

  let PageComponent;
  switch (currentPath) {
    case '/':
      PageComponent = <HeroSection setCurrentPath={setCurrentPath} />;
      break;
    case '/about':
      PageComponent = <AboutSection />;
      break;
    case '/projects':
      PageComponent = <ProjectsSection />;
      break;
    case '/blog':
      PageComponent = <BlogSection />;
      break;
    case '/contact':
      PageComponent = <ContactSection />;
      break;
    default:
      PageComponent = (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 p-4">
          <h2 className="text-4xl font-bold text-red-700 mb-4">404 - Page Not Found</h2>
          <p className="text-lg text-gray-700 mb-6">The page you are looking for does not exist.</p>
          <button
            onClick={() => navigate('/', setCurrentPath)}
            className="inline-flex items-center px-6 py-3 text-white bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            Go to Home
          </button>
        </div>
      );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased">
      <Navbar setCurrentPath={setCurrentPath} />
      <main className="flex-grow">
        {PageComponent}
      </main>
      <Footer />
    </div>
  );
}
