import { ImageResponse } from 'next/og';

// Image metadata
export const size = {
  width: 180,
  height: 180,
};

export const contentType = 'image/png';

export const runtime = 'edge';

// Image generation
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        <svg
          width="140"
          height="140"
          viewBox="0 0 32 32"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
              <stop offset="50%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FFFFFF', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="32" height="32" fill="#000000" />
          <g
            fill="none"
            stroke="url(#goldGradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M 16 8 L 16 24" />
            <path d="M 16 12 L 20 16 L 16 20 L 12 16 L 16 12" />
            <path d="M 11 12 L 16 8 L 21 12" />
          </g>
        </svg>
      </div>
    ),
    {
      ...size,
    }
  );
}
