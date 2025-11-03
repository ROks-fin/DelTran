import { SVGProps } from 'react';

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

export function Logo({ size = 32, ...props }: LogoProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      {...props}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Black background */}
      <rect width="32" height="32" fill="#000000" rx="6" />

      {/* Unified runic symbol combining D (Dagaz) and T (Tiwaz) */}
      <g
        fill="none"
        stroke="url(#goldGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Central vertical line (common to both runes) */}
        <path d="M 16 8 L 16 24" />

        {/* Diamond/Dagaz element (D) */}
        <path d="M 16 12 L 20 16 L 16 20 L 12 16 L 16 12" />

        {/* Arrow/Tiwaz element (T) at top */}
        <path d="M 11 12 L 16 8 L 21 12" />
      </g>
    </svg>
  );
}
