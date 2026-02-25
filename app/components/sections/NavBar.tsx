'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/Button';
import { Menu, X } from 'lucide-react';

export const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('Protocol');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Protocol', 'Architecture', 'Privacy', 'Docs'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-navy-deep/85 backdrop-blur-[20px] py-4 border-b border-navy-border/50' : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-brand-orange rounded-sm flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-black/20 transform -skew-x-12 translate-x-2" />
            <span className="font-display font-bold text-white text-lg relative z-10">K</span>
          </div>
          <span className="font-display font-extrabold text-xl tracking-tight text-white">KAGE VAULT</span>
        </div>

        <nav className="hidden md:flex items-center gap-1 bg-navy-surface/50 p-1 rounded-full border border-navy-border/50 relative">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => setActiveItem(item)}
              className={`relative px-5 py-2 text-sm font-medium transition-colors rounded-full z-10 ${
                activeItem === item ? 'text-white' : 'text-brand-blue-gray hover:text-white'
              }`}
            >
              {activeItem === item && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-navy-border rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              {item}
            </button>
          ))}
        </nav>

        <div className="hidden md:block">
          <Button variant="outline" size="sm" className="animate-pulse-ring hover:animate-none">
            Connect Xverse
          </Button>
        </div>

        <button 
          className="md:hidden text-white p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 right-0 bg-navy-deep border-b border-navy-border p-6 flex flex-col gap-4 md:hidden"
        >
          {navItems.map((item, i) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase()}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-lg font-medium text-brand-blue-gray hover:text-white py-2"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item}
            </motion.a>
          ))}
          <Button variant="primary" className="mt-4 w-full">Connect Xverse</Button>
        </motion.div>
      )}
    </header>
  );
};
