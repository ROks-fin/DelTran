'use client';

import { motion } from 'framer-motion';
import { Globe, Shield, CheckCircle2, Clock } from 'lucide-react';
import { licenses, getTotalCoverage } from '@/app/lib/data/licenses';
import { Card } from '../Card';
import { AnimatedNumber, ParallaxCard, GlowingBorder, PulsingDot } from './AnimatedStats';

export const GlobalCoverageMap = () => {
  const totalCoverage = getTotalCoverage();

  return (
    <div className="space-y-12">
      {/* Global Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <GlowingBorder color="#D4AF37">
          <ParallaxCard>
            <Card className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 border-gold/40">
              <div className="text-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Globe className="w-8 h-8 text-gold mx-auto mb-2" />
                </motion.div>
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedNumber value={totalCoverage} suffix="+" />
                </div>
                <div className="text-sm text-white/70">Countries</div>
              </div>
            </Card>
          </ParallaxCard>
        </GlowingBorder>

        <GlowingBorder color="#D4AF37">
          <ParallaxCard>
            <Card className="p-6 bg-gradient-to-br from-gold/20 to-gold/5 border-gold/40">
              <div className="text-center">
                <Shield className="w-8 h-8 text-gold mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedNumber value={9} />
                </div>
                <div className="text-sm text-white/70">Jurisdictions</div>
              </div>
            </Card>
          </ParallaxCard>
        </GlowingBorder>

        <GlowingBorder color="#22c55e">
          <ParallaxCard>
            <Card className="p-6 bg-gradient-to-br from-green-500/20 to-green-500/5 border-green-500/40">
              <div className="text-center">
                <CheckCircle2 className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedNumber value={licenses.filter(l => l.status === 'active').length} />
                </div>
                <div className="text-sm text-white/70 flex items-center justify-center gap-2">
                  <PulsingDot color="#22c55e" size={8} />
                  Active
                </div>
              </div>
            </Card>
          </ParallaxCard>
        </GlowingBorder>

        <GlowingBorder color="#3b82f6">
          <ParallaxCard>
            <Card className="p-6 bg-gradient-to-br from-blue-500/20 to-blue-500/5 border-blue-500/40">
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-3xl font-bold text-white mb-1">
                  <AnimatedNumber value={licenses.filter(l => l.status === 'planned').length} />
                </div>
                <div className="text-sm text-white/70">In Progress</div>
              </div>
            </Card>
          </ParallaxCard>
        </GlowingBorder>
      </div>


    </div>
  );
};
