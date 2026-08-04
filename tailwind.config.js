/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#EAFBFD',
          200: '#A8ECF3',
          300: '#5FDDEA',
          400: '#22C4DE',
          600: '#00A5C8',
          700: '#0E7A93',
          900: '#0A5566',
        },
        sun: '#FFD84D',
        coral: '#FF7A9C',
        leaf: '#3FE0A5',
        lime: '#B6F26A',
        ink: { DEFAULT: '#0C3B47', 2: '#4C7A87' },
        line: '#CFEEF3',
        surface: { DEFAULT: '#ffffff', alt: '#F2FBFC' },
      },
      fontFamily: {
        sans: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        accent: ['var(--font-space)', 'sans-serif'],
      },
      borderRadius: { rs: '12px', rm: '20px', rl: '28px', rx: '40px' },
      boxShadow: {
        s1: '0 2px 8px -2px rgba(10,85,102,.08)',
        s2: '0 20px 40px -20px rgba(0,165,200,.28)',
        s3: '0 30px 60px -30px rgba(10,85,102,.28)',
        cta: '0 20px 40px -15px rgba(255,216,77,.7)',
        'cta-hover': '0 26px 50px -18px rgba(255,216,77,.9)',
        'card-hover': '0 40px 80px -30px rgba(0,165,200,.45)',
        nav: '0 12px 40px -20px rgba(10,85,102,.25)',
        'nav-float': '0 20px 60px -20px rgba(10,85,102,.5)',
        mob: '0 20px 40px -12px rgba(10,85,102,.6)',
      },
      transitionTimingFunction: { smooth: 'cubic-bezier(.22,1,.36,1)' },
      animation: {
        'wave-1': 'waveShift 14s linear infinite',
        'wave-2': 'waveShift 22s linear infinite reverse',
        'wave-3': 'waveShift 10s linear infinite',
        rise: 'rise linear infinite',
        cue: 'cue 1.8s cubic-bezier(.22,1,.36,1) infinite',
      },
    },
  },
  plugins: [],
};
