const validateRegister = (body) => {
  const errors = [];
  const { username, email, password } = body;

  if (!username || username.trim().length < 3) errors.push("Username must be at least 3 characters");
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email is required");
  if (!password || password.length < 6) errors.push("Password must be at least 6 characters");
  return errors;
};

const validateLogin = (body) => {
  const errors = [];
  const { email, password } = body;
  if (!email) errors.push("Email is required");
  if (!password) errors.push("Password is required");
  return errors;
};

module.exports = { validateRegister, validateLogin };