const jwt = require("jsonwebtoken");
const User = require("../models/User.model");
const ApiError = require("../utils/ApiError");
const { generateAccessToken, generateRefreshToken } = require("../utils/generateTokens");
const { refreshTokenSecret } = require("../config/env");

const issueTokensForUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new ApiError(404, "User not found");

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });

  return { accessToken, refreshToken, user };
};

const verifyRefreshToken = async (incomingToken) => {
  if (!incomingToken) throw new ApiError(401, "Refresh token missing");

  let decoded;
  try {
    decoded = jwt.verify(incomingToken, refreshTokenSecret);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired refresh token");
  }

  const user = await User.findById(decoded._id).select("+refreshToken");
  if (!user || user.refreshToken !== incomingToken) {
    throw new ApiError(401, "Refresh token is invalid or has been revoked");
  }

  return user;
};

module.exports = { issueTokensForUser, verifyRefreshToken };