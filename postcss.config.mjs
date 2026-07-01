/**
 * PostCSS configuration for Tailwind CSS v4.
 * v4 ships its own PostCSS plugin; theme tokens live in CSS (see globals.css)
 * rather than a JS config file.
 */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
