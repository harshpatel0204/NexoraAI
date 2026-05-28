/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#F0F7FF',
          100: '#E0EFFF',
          200: '#C2DFFF',
          300: '#93C5FD',
          400: '#5FA8F5',
          500: '#2B7FE8',
          600: '#1D6ED4',
          700: '#1559AE',
          800: '#0F4489',
          900: '#0A3068',
        },
        neutral: {
          0:   '#FFFFFF',
          50:  '#F8F9FB',
          100: '#F1F3F7',
          200: '#E4E8F0',
          300: '#CDD4E0',
          400: '#9BA8BC',
          500: '#6B7A99',
          600: '#4A5568',
          700: '#2D3748',
          800: '#1A202C',
          900: '#0D1117',
        },
        accent: {
          green:  '#00875A',
          teal:   '#0E9F8E',
          orange: '#E86D2B',
        }
      },
      fontFamily: {
        display: ["'Plus Jakarta Sans'", 'sans-serif'],
        body:    ["'Inter'", 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(40px, 5.5vw, 72px)', { lineHeight: '1.08', letterSpacing: '-0.03em', fontWeight: '700' }],
        'display-xl':  ['clamp(32px, 4vw, 56px)',   { lineHeight: '1.1',  letterSpacing: '-0.025em', fontWeight: '700' }],
        'display-lg':  ['clamp(24px, 3vw, 40px)',   { lineHeight: '1.2',  letterSpacing: '-0.02em',  fontWeight: '600' }],
        'display-md':  ['clamp(20px, 2.5vw, 30px)', { lineHeight: '1.3',  letterSpacing: '-0.015em', fontWeight: '600' }],
      },
      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-md': '0 2px 8px rgba(0,0,0,0.07), 0 8px 32px rgba(0,0,0,0.05)',
        'card-lg': '0 4px 16px rgba(0,0,0,0.08), 0 16px 64px rgba(0,0,0,0.06)',
        'btn':     '0 1px 2px rgba(43,127,232,0.2), 0 4px 12px rgba(43,127,232,0.15)',
        'btn-lg':  '0 2px 4px rgba(43,127,232,0.25), 0 8px 24px rgba(43,127,232,0.2)',
      },
      borderRadius: {
        'xl2': '16px',
        'xl3': '20px',
        'xl4': '24px',
      }
    }
  },
  plugins: [],
}
