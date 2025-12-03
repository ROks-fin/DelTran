'use client';

/**
 * FooterAnimated - Client-side animation wrapper for Footer
 * GPU-optimized scroll-triggered animations
 */

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ReactNode, useRef } from 'react';

const premiumEase = [0.22, 1, 0.36, 1] as const;

interface FooterColumnProps {
  children: ReactNode;
  delay?: number;
}

export function FooterColumn({ children, delay = 0 }: FooterColumnProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay, ease: premiumEase }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

interface FooterWrapperProps {
  children: ReactNode;
  className?: string;
}

export function FooterWrapper({ children, className = '' }: FooterWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div ref={ref} className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.6, ease: premiumEase }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

interface FooterLinkItemProps {
  children: ReactNode;
  delay?: number;
}

export function FooterLinkItem({ children, delay = 0 }: FooterLinkItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <li ref={ref}>{children}</li>;
  }

  return (
    <motion.li
      ref={ref}
      initial={{ opacity: 0, x: -8 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      transition={{ duration: 0.4, delay, ease: premiumEase }}
    >
      {children}
    </motion.li>
  );
}

interface FooterDisclaimerProps {
  children: ReactNode;
}

export function FooterDisclaimer({ children }: FooterDisclaimerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
      transition={{ duration: 0.5, delay: 0.3, ease: premiumEase }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

interface FooterBottomBarProps {
  children: ReactNode;
}

export function FooterBottomBar({ children }: FooterBottomBarProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div ref={ref}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.4, delay: 0.4, ease: premiumEase }}
    >
      {children}
    </motion.div>
  );
}
