const jwt = require("jsonwebtoken");

const {
  accessTokenSecret,
  accessTokenExpiry,
  refreshTokenSecret,
  refreshTokenExpiry,
} = require("../config/env");

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    accessTokenSecret,
    { expiresIn: accessTokenExpiry }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
    refreshTokenSecret,
    { expiresIn: refreshTokenExpiry }
  );
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
