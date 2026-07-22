/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        accent: {
          DEFAULT: '#E8782A',
          hover: '#D4661F',
          soft: '#FFF1E6',
        },
        secondary: '#111111',
        background: '#F8F6F2',
        card: '#FFFFFF',
        text: {
          DEFAULT: '#111111',
          muted: '#6B7280',
        },
        border: '#E8E2D9',
        charcoal: '#111111',
        gold: '#E8782A',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      borderRadius: {
        luxury: '20px',
      },
      boxShadow: {
        luxury: '0 20px 50px rgba(17, 17, 17, 0.06)',
        'luxury-hover': '0 28px 60px rgba(17, 17, 17, 0.12)',
        soft: '0 8px 24px rgba(17, 17, 17, 0.04)',
        glass: '0 8px 32px rgba(17, 17, 17, 0.08)',
        gold: '0 12px 28px rgba(232, 120, 42, 0.35)',
      },
      transitionDuration: {
        luxury: '250ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        shimmer: 'shimmer 1.6s infinite linear',
        'heart-pop': 'heartPop 0.4s ease',
        ripple: 'ripple 0.6s ease-out',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        heartPop: {
          '0%': { transform: 'scale(1)' },
          '40%': { transform: 'scale(1.35)' },
          '100%': { transform: 'scale(1)' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '0.4' },
          '100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
}
