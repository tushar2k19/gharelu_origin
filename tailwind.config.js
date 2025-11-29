/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          // New Order for headings and bold text
          serif: ['New Order', 'serif'], 
          // Benton Mod Display for body text
          sans: ['Benton Mod Display', 'sans-serif'],
        },
        colors: {
          'dark-green': '#034225',
          'golden-yellow': '#f9b000',
          'cream': '#f8f5e3',
        }
      },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
     ],
  }