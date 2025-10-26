'use client';

import { motion } from 'framer-motion';

export function Diagram() {
  return (
    <div className="relative p-8 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Input Sources */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold mb-4 text-center">Input Sources</h3>
          {['Banks', 'Fintechs', 'Businesses', 'Individuals'].map((source, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-3 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm text-center"
            >
              {source}
            </motion.div>
          ))}
        </div>

        {/* Central Platform */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-gold/10 blur-xl" />
            <div className="relative p-6 rounded-xl bg-gradient-to-br from-gold/30 to-gold/10 border border-gold/50">
              <h3 className="text-white font-bold text-center mb-4">DelTran Platform</h3>
              <div className="space-y-2">
                <div className="p-2 rounded bg-black/30 text-white/80 text-xs text-center">
                  Intelligent Routing
                </div>
                <div className="p-2 rounded bg-black/30 text-white/80 text-xs text-center">
                  Compliance Engine
                </div>
                <div className="p-2 rounded bg-black/30 text-white/80 text-xs text-center">
                  Real-time Settlement
                </div>
                <div className="p-2 rounded bg-black/30 text-white/80 text-xs text-center">
                  API Gateway
                </div>
              </div>
            </div>
          </motion.div>

          {/* Connection lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: -1 }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d4af37" stopOpacity="0" />
                <stop offset="50%" stopColor="#d4af37" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
              </linearGradient>
            </defs>
            {[...Array(4)].map((_, i) => (
              <motion.line
                key={`left-${i}`}
                x1="0"
                y1={50 + i * 60}
                x2="100"
                y2="150"
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
            {[...Array(4)].map((_, i) => (
              <motion.line
                key={`right-${i}`}
                x1="200"
                y1="150"
                x2="300"
                y2={50 + i * 60}
                stroke="url(#lineGradient)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            ))}
          </svg>
        </div>

        {/* Output Destinations */}
        <div className="space-y-4">
          <h3 className="text-white font-semibold mb-4 text-center">Global Corridors</h3>
          {['MENA Region', 'Europe', 'Americas', 'Asia Pacific'].map((dest, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-3 rounded-lg bg-white/5 border border-white/10 text-white/80 text-sm text-center"
            >
              {dest}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 pt-8 border-t border-white/10 grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          '< 10s Settlement',
          '24/7 Availability',
          'Bank-grade Security',
          'Real-time Tracking'
        ].map((feature, i) => (
          <div key={i} className="text-center">
            <div className="text-gold text-xs font-semibold">{feature}</div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
