'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Optional: Prevent background scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [isOpen]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Articles', href: '/articles' },
    { name: 'About Me', href: '/about-me' }
  ];

  return (
    // 1. Added relative, bg-white, and z-50 so the nav sits above the rest of the page
    <nav className="relative z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="shrink-0 flex items-center">
            <Link
              href="/"
              className="text-2xl font-bold tracking-tighter text-teal-600 hover:text-teal-700 transition-colors"
            >
              Kanishk’s Blog
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`border-b-2 px-0.5 pt-1 transition-colors ${
                    isActive
                      ? 'border-teal-600 text-gray-900 hover:border-teal-700 hover:text-black'
                      : 'border-transparent text-gray-400 hover:text-gray-500 hover:border-gray-400'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button (Hamburger) */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-teal-600 focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 2. Added Overlay Backdrop: The greyed-out background */}
      {isOpen && (
        <div 
          className="fixed inset-0 top-16 bg-slate-900/20 backdrop-blur-[2px] z-40 md:hidden"
          onClick={() => setIsOpen(false)} // Clicking the background closes the menu
        />
      )}

      {/* 3. Mobile Menu Dropdown: Changed to absolute positioning */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-white rounded-b-xl z-50 md:hidden pb-4 pt-2">
          <div className="flex flex-col px-4 space-y-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium ${
                    isActive
                      ? 'bg-teal-50 text-teal-600'
                      : 'text-gray-400 hover:bg-gray-50 hover:text-gray-500'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
