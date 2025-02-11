/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app.vue",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
    './node_modules/flowbite/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

