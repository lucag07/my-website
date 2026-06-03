/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#fbbf24',
          hover: '#fcd34d',
          muted: 'rgba(251, 191, 36, 0.15)',
          foreground: '#0f172a',
        },
        surface: {
          dark: '#0f172a',
          'dark-muted': '#1e293b',
          light: '#fafaf9',
          muted: '#f5f5f4',
        },
        success: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        brand: '0 10px 15px -3px rgba(251, 191, 36, 0.25)',
        'brand-hover': '0 10px 15px -3px rgba(251, 191, 36, 0.4)',
      },
    },
  },
  plugins: [],
};
