/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      // Tokens medidos del diseño de referencia (ver _spec/BRIEF.md).
      colors: {
        bg: '#0C2424',
        panel: '#102E2E',
        band: '#102E2E',
        accent: '#BC3A3A',
        'accent-mid': '#7B1D1D',
        'accent-dark': '#3A0E0E',
        ink: '#FFFFFF',
        'ink-muted': '#C9D7DA',
        teal: '#236B6B',
      },
      fontFamily: {
        display: ['"Caveat Brush"', '"Permanent Marker"', 'cursive'],
        hand: ['Caveat', 'cursive'],
        sans: ['Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1240px',
      },
      // Keyframes V2: usarlas SIEMPRE con `motion-safe:` (p. ej.
      // `motion-safe:animate-marquee`); el bloque de reduced-motion de
      // index.css las neutraliza para usuarios que prefieren menos movimiento.
      keyframes: {
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.45' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        marquee: 'marquee 36s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 3.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
