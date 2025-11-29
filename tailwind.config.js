/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          // Benton Mod Display for headings and bold text
          serif: ['Benton Mod Display', 'serif'], 
          // New Order for body text
          sans: ['New Order', 'sans-serif'],
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