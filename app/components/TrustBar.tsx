/**
 * Trust Bar Component
 * Shows compliance badges and trust indicators below hero
 * Server Component for optimal performance
 */

import { Shield, FileCheck, Lock, CheckCircle } from 'lucide-react';

interface TrustBarProps {
  translations: {
    designed: string;
    iso: string;
    aml: string;
    enterprise: string;
  };
}

export function TrustBar({ translations }: TrustBarProps) {
  const badges = [
    {
      icon: Shield,
      text: translations.designed,
    },
    {
      icon: FileCheck,
      text: translations.iso,
    },
    {
      icon: Lock,
      text: translations.aml,
    },
    {
      icon: CheckCircle,
      text: translations.enterprise,
    },
  ];

  return (
    <section className="relative py-8 sm:py-12 border-y border-white/5 bg-black/40 backdrop-blur-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-10 md:gap-16">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 sm:gap-3 text-white/60 hover:text-white/80 transition-colors"
            >
              <badge.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#d4af37]/70" />
              <span className="text-xs sm:text-sm font-medium whitespace-nowrap">
                {badge.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
