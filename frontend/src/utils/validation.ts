export const emailPattern = {
  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  message: "Enter a valid email address"
};

export const passwordRules = {
  minLength: {
    value: 8,
    message: "Password must be at least 8 characters"
  }
};
