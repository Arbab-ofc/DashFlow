/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        secondary: "#8B5CF6",
        success: "#10B981",
        warning: "#F59E0B",
        error: "#EF4444",
        surface: "#FFFFFF",
        background: "#F9FAFB",
        textPrimary: "#111827",
        textSecondary: "#6B7280",
        border: "#E5E7EB"
      },
      fontFamily: {
        display: ["\"Space Grotesk\"", "sans-serif"],
        body: ["\"Plus Jakarta Sans\"", "sans-serif"]
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)",
        lift: "0 16px 40px rgba(15, 23, 42, 0.12)"
      }
    }
  },
  plugins: []
};
