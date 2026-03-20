import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: '1rem',
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
          '3xl': '1800px'
        }
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          blue1: '#2b3327',
          blue2: '#386931',
          blue3: '#386931',
          blue4: '#386931',
          blue5: '#386931',
          gray1: '#4A4541',
          gray2: '#36322E',
          gray3: '#8F8D8B',
          gray4: '#485C71',
          gray5: '#15171E',
          accent1: '#bbac8b',
          accent2: '#DE493F',
          soft1: '#000000',
          soft2: '#000000',
          soft3: '#000000',
          soft4: '#000000',
          soft5: '#000000',
        },
      },
      animation: {
        marquee: 'marquee 20s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      fontSize: {
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      }
    },
  },
  plugins: [],
}

export default config
