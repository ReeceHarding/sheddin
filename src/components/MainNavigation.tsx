import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export const MainNavigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-200 
                    ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className={`text-2xl font-bold transition-colors duration-200
                                  ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
              <span className="text-[#FFD700]">STUDIO</span>SHED
            </Link>
            <div className="hidden md:flex ml-10 space-x-8">
              <Link to="/design" className={`transition-colors duration-200
                                          ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>
                Design Your Own
              </Link>
              <Link to="/models" className={`transition-colors duration-200
                                          ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>
                Models
              </Link>
              <Link to="/adus" className={`transition-colors duration-200
                                        ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>
                ADUs
              </Link>
              <Link to="/studios" className={`transition-colors duration-200
                                           ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>
                Studios
              </Link>
              <Link to="/inspiration" className={`transition-colors duration-200
                                               ${isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white hover:text-gray-200'}`}>
                Inspiration
              </Link>
            </div>
          </div>
          <Link
            to="/consultation"
            className="bg-[#B87503] text-white px-6 py-2 rounded-md hover:bg-[#9A6203] transition-colors"
          >
            FREE CONSULTATION
          </Link>
        </div>
      </div>
    </nav>
  );
};