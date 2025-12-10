/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // Ultra dark zinc
        surface: '#18181b',    // Slightly lighter zinc
        surfaceHighlight: '#27272a',

        slate: {
          50: '#f8fafc',
          900: '#0f172a',
        },
        // Industrial Safety Orange (High Vis)
        orange: {
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        emerald: {
          500: '#10b981',
        },
        rose: {
          500: '#f43f5e',
        },
        obsidian: '#000000',
        charcoal: '#121212',
        steel: '#2A2A2A',
      },
      fontFamily: {
        sans: ['Inter', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.3)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 15px rgba(249, 115, 22, 0.3)', // Orange glow
      },
    },
  },
  plugins: [],
}
