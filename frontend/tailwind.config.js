import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        eco: {
          50: '#eefdf3',
          100: '#d6f7dd',
          200: '#b6eebf',
          300: '#86e59c',
          400: '#4dcf6b',
          500: '#22a74d',
          600: '#1e8a40',
          700: '#1a6f36',
          800: '#1b5530',
          900: '#18412a'
        }
      }
    }
  },
  plugins: [],
};

export default config;
