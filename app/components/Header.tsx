'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { LocaleSwitcher } from './LocaleSwitcher';
import { Logo } from './Logo';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'platform', href: '/platform' },
  { name: 'network', href: '/network' },
  { name: 'company', href: '/company' },
  { name: 'contact', href: '/contact' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const locale = useLocale();
  const t = useTranslations('navigation');
  
  // Premium mouse tracking for nav plate
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 150, damping: 15 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 15 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-700',
          isScrolled
            ? 'bg-black/40 backdrop-blur-3xl backdrop-saturate-150'
            : 'bg-transparent'
        )}
      >
        {/* Premium animated gradient line */}
        <div className="absolute inset-x-0 top-0 h-px">
          <div className="h-full bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <motion.div 
            className="h-full bg-gradient-to-r from-transparent via-gold to-transparent"
            animate={{ x: [-1000, 1000] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <nav className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Premium Logo */}
            <Link
              href="https://deltran.ai"
              className="group relative"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative flex items-center gap-3"
              >
                {/* Runic Logo Icon */}
                <div className="relative">
                  <Logo size={40} className="transition-all duration-300" />
                  {/* Glow effect on hover */}
                  <div className="absolute inset-0 bg-gold/30 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>

                {/* DelTran Text */}
                <div className="relative">
                  <span className="text-2xl font-black tracking-tight">
                    <span className="bg-gradient-to-r from-white via-white to-gold/80 bg-clip-text text-transparent">
                      DelTran
                    </span>
                  </span>
                  {/* Subtle glow on hover */}
                  <div className="absolute inset-0 bg-gold/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Premium Plate Design */}
            <div className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                {/* Navigation Plate Container */}
                <div className="relative px-2 py-2 rounded-2xl bg-white/[0.03] backdrop-blur-2xl border border-white/[0.08] shadow-2xl">
                  {/* Inner glow effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-white/[0.05] to-transparent opacity-50" />
                  
                  {/* Navigation items container */}
                  <div className="relative flex items-center space-x-1">
                    {navigation.map((item, index) => (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 + 0.3 }}
                      >
                        <Link
                          href={`/${locale}${item.href}`}
                          onMouseEnter={() => setHoveredItem(item.name)}
                          onMouseLeave={() => setHoveredItem(null)}
                          className="relative px-5 py-2.5 rounded-xl transition-all duration-300"
                        >
                          {/* Hover background with smooth animation */}
                          <AnimatePresence>
                            {hoveredItem === item.name && (
                              <motion.div
                                layoutId="nav-hover-bg"
                                className="absolute inset-0 bg-white/[0.08] rounded-xl"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ 
                                  type: "spring",
                                  stiffness: 500,
                                  damping: 30
                                }}
                              >
                                {/* Gradient overlay for depth */}
                                <div className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent rounded-xl" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                          
                          {/* Text with premium styling */}
                          <span className={cn(
                            "relative z-10 text-sm font-medium transition-all duration-300",
                            hoveredItem === item.name 
                              ? "text-white" 
                              : "text-white/60 hover:text-white/90"
                          )}>
                            {t(item.name)}
                          </span>
                          
                          {/* Active indicator dot */}
                          {hoveredItem === item.name && (
                            <motion.div
                              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gold rounded-full"
                              initial={{ scale: 0, y: 10 }}
                              animate={{ scale: 1, y: 4 }}
                              transition={{ duration: 0.2 }}
                            />
                          )}
                        </Link>
                      </motion.div>
                    ))}
                    
                    {/* Divider */}
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    
                    {/* LocaleSwitcher in plate */}
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="px-3"
                    >
                      <LocaleSwitcher />
                    </motion.div>
                  </div>
                  
                  {/* Plate shine effect */}
                  <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent"
                      animate={{ x: [-500, 500] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                </div>
                
                {/* Plate shadow and glow */}
                <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-gold/5 to-transparent blur-xl" />
              </motion.div>
            </div>

            {/* CTA Button - Premium Design */}
            <div className="hidden lg:block">
              <Link href={`/${locale}/contact`}>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group block cursor-pointer"
                >
                  {/* Button container */}
                  <div className="relative px-7 py-3 rounded-2xl bg-gradient-to-r from-gold via-gold-light to-gold overflow-hidden">
                    {/* Animated gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-gold via-white/20 to-gold-light bg-[size:200%_100%] animate-shimmer" />

                    {/* Glass effect overlay */}
                    <div className="absolute inset-0 bg-black/10" />

                    {/* Top shine */}
                    <div className="absolute inset-x-0 top-0 h-px bg-white/40" />

                    {/* Content */}
                    <span className="relative flex items-center space-x-2 text-black font-bold text-sm">
                      <span>{t('getStarted')}</span>
                      <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>

                  {/* Glow effect */}
                  <div className="absolute inset-0 -z-10 blur-xl bg-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </motion.div>
              </Link>
            </div>

            {/* Mobile menu button - Premium */}
            <motion.button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden relative p-3 rounded-xl bg-white/5 backdrop-blur-xl text-white/80 hover:text-white transition-all duration-300"
            >
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </nav>

        {/* Mobile Navigation - Premium Slide Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.nav
              role="navigation"
              aria-label="Mobile navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="lg:hidden bg-black/60 backdrop-blur-3xl border-t border-white/5"
            >
              <div className="container mx-auto px-6 py-6">
                <motion.div 
                  className="space-y-1"
                  initial="closed"
                  animate="open"
                  exit="closed"
                  variants={{
                    open: { transition: { staggerChildren: 0.05 } },
                    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
                  }}
                >
                  {navigation.map((item) => (
                    <motion.div
                      key={item.name}
                      variants={{
                        open: { x: 0, opacity: 1 },
                        closed: { x: -20, opacity: 0 }
                      }}
                    >
                      <Link
                        href={`/${locale}${item.href}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3.5 rounded-xl text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                      >
                        <span className="font-medium">{t(item.name)}</span>
                      </Link>
                    </motion.div>
                  ))}
                  
                  {/* Mobile Locale Switcher */}
                  <motion.div
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: -20, opacity: 0 }
                    }}
                    className="pt-4 pb-2 border-t border-white/5"
                  >
                    <div className="px-4">
                      <LocaleSwitcher />
                    </div>
                  </motion.div>
                  
                  {/* Mobile CTA */}
                  <motion.div
                    variants={{
                      open: { x: 0, opacity: 1 },
                      closed: { x: -20, opacity: 0 }
                    }}
                  >
                    <Link
                      href={`/${locale}/contact`}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block mx-4 mt-4 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-gold to-gold-light text-black font-bold text-center relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-active:translate-x-full transition-transform duration-700" />
                      <span className="relative">{t('getStarted')}</span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Ultra-thin scroll progress */}
      <motion.div
        className="fixed top-0 left-0 h-[2px] bg-gradient-to-r from-gold via-gold-light to-gold z-[60]"
        style={{
          width: useTransform(
            useSpring(useMotionValue(0), { stiffness: 400, damping: 40 }),
            [0, 1],
            ['0%', '100%']
          ),
        }}
      />

      <style jsx global>{`
        @keyframes shimmer {
          0% { background-position: 200% 50%; }
          100% { background-position: -200% 50%; }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}