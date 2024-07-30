/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1DB954',   // Verde principal de Spotify
        secondary: '#191414', // Fondo oscuro de Spotify
        accent: '#535353',    // Gris para acentos
        background: '#121212', // Fondo general oscuro
        textPrimary: '#FFFFFF', // Texto principal blanco
        textSecondary: '#B3B3B3' // Texto secundario gris claro
      },
    },
  },
  plugins: [],
}