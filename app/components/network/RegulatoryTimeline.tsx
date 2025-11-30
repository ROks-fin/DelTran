'use client';

import { CheckCircle2, Circle, ArrowRight, Shield, Globe, TrendingUp } from 'lucide-react';
import { licenses } from '@/app/lib/data/licenses';
import { Card } from '../Card';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils';

interface TimelinePhase {
  year: string;
  title: string;
  description: string;
  licenses: typeof licenses;
  status: 'completed' | 'current' | 'planned';
}

export const RegulatoryTimeline = () => {
  const t = useTranslations('network.regulatory.timeline');
  const [expandedPhase, setExpandedPhase] = useState<string | null>('2025');

  const phases: TimelinePhase[] = [
    {
      year: '2025',
      title: t('phases.2025.title'),
      description: t('phases.2025.description'),
      licenses: licenses.filter(l => l.year.includes('2025') && !l.year.includes('2026')),
      status: 'current'
    },
    {
      year: '2026',
      title: t('phases.2026.title'),
      description: t('phases.2026.description'),
      licenses: licenses.filter(l => l.year.includes('2026') && !l.year.includes('2027')),
      status: 'planned'
    },
    {
      year: '2027',
      title: t('phases.2027.title'),
      description: t('phases.2027.description'),
      licenses: licenses.filter(l => l.year.includes('2027') && !l.year.includes('2028')),
      status: 'planned'
    },
    {
      year: '2028+',
      title: t('phases.2028.title'),
      description: t('phases.2028.description'),
      licenses: licenses.filter(l => l.year.includes('2028')),
      status: 'planned'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />;
      case 'current':
        return (
          <div className="w-6 h-6 rounded-full bg-gold flex items-center justify-center animate-pulse">
            <div className="w-3 h-3 rounded-full bg-black" />
          </div>
        );
      case 'planned':
        return <Circle className="w-6 h-6 text-white/40" />;
      default:
        return null;
    }
  };

  const getPhaseColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'from-green-500/20 to-green-500/5 border-green-500/50';
      case 'current':
        return 'from-gold/30 to-gold/10 border-gold/60';
      case 'planned':
        return 'from-white/10 to-white/5 border-white/20';
      default:
        return 'from-white/5 to-transparent border-white/10';
    }
  };

  return (
    <div className="space-y-8">
      {/* Timeline Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 border border-gold/40 backdrop-blur-sm mb-6 animate-fade-in">
          <Shield className="w-5 h-5 text-gold mr-2" />
          <span className="text-gold text-sm font-semibold uppercase tracking-wider">
            {t('badge')}
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {t('title')} <span className="text-gradient">{t('titleAccent')}</span>
        </h2>
        <p className="text-xl text-white/70 max-w-3xl mx-auto">
          {t('subtitle')}
        </p>
      </div>

      {/* Timeline */}
      <div className="relative max-w-6xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold/50 to-transparent" />

        {/* Phase cards */}
        <div className="space-y-12">
          {phases.map((phase, index) => {
            const isExpanded = expandedPhase === phase.year;
            const isLeft = index % 2 === 0;

            return (
              <div
                key={phase.year}
                className={cn(
                  "relative md:flex items-center gap-8 animate-fade-in-up",
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                )}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Timeline node */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-midnight border-4 border-gold/40 flex items-center justify-center z-10">
                  {getStatusIcon(phase.status)}
                </div>

                {/* Content */}
                <div className={`md:w-1/2 ml-20 md:ml-0 ${isLeft ? 'md:pr-16' : 'md:pl-16'}`}>
                  <Card
                    className={cn(
                      "p-8 bg-gradient-to-br transition-all duration-300",
                      getPhaseColor(phase.status),
                      isExpanded && 'ring-2 ring-gold/50'
                    )}
                  >
                    {/* Header */}
                    <div className="mb-6">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-4xl font-bold ${
                          phase.status === 'current' ? 'text-gold' : 'text-white'
                        }`}>
                          {phase.year}
                        </span>
                        {phase.status === 'current' && (
                          <span className="px-3 py-1 rounded-full bg-gold text-black text-xs font-bold animate-pulse">
                            {t('inProgress')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{phase.title}</h3>
                      <p className="text-white/70">{phase.description}</p>
                    </div>

                    {/* License count */}
                    <div className="flex items-center justify-between mb-4 p-4 rounded-lg bg-black/30">
                      <div className="flex items-center gap-2">
                        <Globe className="w-5 h-5 text-gold" />
                        <span className="text-white font-semibold">
                          {phase.licenses.length} {phase.licenses.length === 1 ? t('jurisdiction') : t('jurisdictions')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <span>
                          {phase.licenses.reduce((sum, l) => sum + l.countries, 0)}+ {t('countries')}
                        </span>
                      </div>
                    </div>

                    {/* Licenses list */}
                    <div
                      className={cn(
                        "space-y-3 mt-6 pt-6 border-t border-white/10",
                        "overflow-hidden transition-all duration-300",
                        isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0 pt-0 mt-0 border-t-0"
                      )}
                    >
                      {phase.licenses.map(license => (
                        <div
                          key={license.id}
                          className="p-4 rounded-lg bg-black/20 border border-white/10 hover:border-gold/30 transition-colors"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-bold text-white mb-1">{license.region}</h4>
                              <p className="text-sm text-white/60">{license.license}</p>
                            </div>
                            <span className="px-2 py-1 rounded bg-gold/20 text-gold text-xs font-semibold">
                              {license.countries}+ countries
                            </span>
                          </div>
                          <p className="text-xs text-white/50 mt-2">{license.coverage}</p>
                        </div>
                      ))}
                    </div>

                    {/* Expand button */}
                    <button
                      className="mt-4 text-sm text-gold hover:text-gold-light transition-colors flex items-center gap-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedPhase(isExpanded ? null : phase.year);
                      }}
                    >
                      {isExpanded ? t('showLess') : t('showDetails')}
                      <ArrowRight className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        isExpanded && 'rotate-90'
                      )} />
                    </button>
                  </Card>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom summary */}
      <Card className="p-8 bg-gradient-to-br from-gold/10 to-transparent border-gold/30 mt-12">
        <div className="text-center">
          <TrendingUp className="w-12 h-12 text-gold mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-3">
            {t('summary.title')}
          </h3>
          <p className="text-white/70 max-w-3xl mx-auto mb-6">
            {t('summary.description')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-lg bg-black/30">
              <div className="text-3xl font-bold text-gold mb-1">9</div>
              <div className="text-sm text-white/60">{t('summary.stats.jurisdictions')}</div>
            </div>
            <div className="p-4 rounded-lg bg-black/30">
              <div className="text-3xl font-bold text-gold mb-1">180+</div>
              <div className="text-sm text-white/60">{t('summary.stats.countries')}</div>
            </div>
            <div className="p-4 rounded-lg bg-black/30">
              <div className="text-3xl font-bold text-gold mb-1">4</div>
              <div className="text-sm text-white/60">{t('summary.stats.years')}</div>
            </div>
            <div className="p-4 rounded-lg bg-black/30">
              <div className="text-3xl font-bold text-gold mb-1">100%</div>
              <div className="text-sm text-white/60">{t('summary.stats.compliant')}</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
