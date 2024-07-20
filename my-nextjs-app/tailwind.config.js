/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
      screens: {
        '2xs': '320px',
        'xs': '375px',
        'sm': '425',
        'md': '768px',
        'lg': '1024px',
        'xl': '1440px',
        '2xl': '2560px'
      }
    },
  plugins: [],
}
