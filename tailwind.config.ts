import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#FFFDF7',
          100: '#FDF9F0',
          200: '#FAF3E3',
          300: '#F5EAD1',
          400: '#EDD9B3',
          500: '#E3C896',
        },
        ink: {
          50: '#F5F5F4',
          100: '#E7E5E4',
          200: '#D6D3D1',
          300: '#A8A29E',
          400: '#78716C',
          500: '#57534E',
          600: '#44403C',
          700: '#292524',
          800: '#1C1917',
          900: '#0C0A09',
        },
        accent: {
          gold: '#C9A227',
          copper: '#B87333',
          emerald: '#047857',
          ruby: '#991B1B',
          sapphire: '#1E3A8A',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'Times New Roman', 'serif'],
        sans: ['Source Sans 3', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['Fraunces', 'Playfair Display', 'serif'],
      },
      fontSize: {
        'display-xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-lg': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display-md': ['3rem', { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
        'heading-xl': ['1.875rem', { lineHeight: '1.3' }],
        'heading-lg': ['1.5rem', { lineHeight: '1.35' }],
        'heading-md': ['1.25rem', { lineHeight: '1.4' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75' }],
        'body-md': ['1rem', { lineHeight: '1.75' }],
        'body-sm': ['0.875rem', { lineHeight: '1.6' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      maxWidth: {
        'article': '680px',
        'content': '1200px',
        'wide': '1400px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      boxShadow: {
        'editorial': '0 4px 6px -1px rgba(12, 10, 9, 0.05), 0 2px 4px -2px rgba(12, 10, 9, 0.05)',
        'editorial-lg': '0 10px 15px -3px rgba(12, 10, 9, 0.08), 0 4px 6px -4px rgba(12, 10, 9, 0.05)',
        'editorial-xl': '0 20px 25px -5px rgba(12, 10, 9, 0.1), 0 8px 10px -6px rgba(12, 10, 9, 0.05)',
        'glow-gold': '0 0 40px rgba(201, 162, 39, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
