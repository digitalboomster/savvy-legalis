/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#060908',
        surface: '#0c1210',
        elevated: '#111a17',
        border: 'rgba(148, 163, 148, 0.12)',
        line: 'rgba(148, 163, 148, 0.08)',
        primary: {
          DEFAULT: '#0d7a4d',
          bright: '#12a068',
          dim: '#064c2f',
        },
        gold: {
          DEFAULT: '#c9a227',
          muted: '#8a7220',
        },
        mist: '#a8b5ad',
        ink: '#e8f0ea',
      },
      fontFamily: {
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        label: ['"Public Sans"', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(ellipse 120% 80% at 50% -20%, rgba(13,122,77,0.35), transparent 55%), radial-gradient(ellipse 60% 50% at 100% 0%, rgba(201,162,39,0.08), transparent 45%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(13,122,77,0.12), transparent 50%)',
        'card-shine': 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, transparent 50%)',
      },
      boxShadow: {
        lift: '0 24px 80px -24px rgba(0,0,0,0.65)',
        card: '0 0 0 1px rgba(255,255,255,0.04), 0 16px 48px -12px rgba(0,0,0,0.5)',
      },
    },
  },
  plugins: [],
}
