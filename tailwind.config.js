/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        paper: '#FAFAF7',
        ink: { DEFAULT: '#18181B', 2: '#3F3F46', 3: '#71717A', 4: '#A1A1AA' },
        line: { DEFAULT: '#E4E4E7', 2: '#F4F4F5' },
        hl: { DEFAULT: '#FDE047', dark: '#CA8A04', bg: '#FEFCE8', border: '#FEF08A' },
        brand: { green: '#15803D', 'green-bg': '#F0FDF4', 'green-border': '#BBF7D0' },
      },
      boxShadow: {
        card: '0 1px 2px rgba(0,0,0,.06),0 1px 3px rgba(0,0,0,.1)',
        'card-md': '0 4px 6px -1px rgba(0,0,0,.07),0 2px 4px -2px rgba(0,0,0,.05)',
        'card-lg': '0 10px 15px -3px rgba(0,0,0,.08),0 4px 6px -4px rgba(0,0,0,.05)',
      },
      animation: {
        ticker: 'ticker 30s linear infinite',
        blink: 'blink 1.4s ease-in-out infinite',
      },
      keyframes: {
        ticker: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        blink: { '0%,100%': { opacity: 1 }, '50%': { opacity: 0.3 } },
      },
    },
  },
  plugins: [],
}
