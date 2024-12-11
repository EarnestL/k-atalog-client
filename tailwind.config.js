/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // Custom scrollbar hiding
    function ({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          /* Hides the scrollbar for Chrome, Edge, and Safari */
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none', /* Firefox */
          '&::-webkit-scrollbar': {
            display: 'none', /* Chrome, Safari, and Edge */
          },
        },
        '.scrollbar-default': {
          /* Resets to default scrollbar */
          '-ms-overflow-style': 'auto',
          'scrollbar-width': 'auto',
          '&::-webkit-scrollbar': {
            display: 'block',
          },
        },
      });
    },
  ],
};

