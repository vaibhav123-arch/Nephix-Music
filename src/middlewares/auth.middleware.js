const jwt = require("jsonwebtoken");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const { accessTokenSecret } = require("../config/env");
const User = require("../models/User.model");

const verifyJWT = asyncHandler(async (req, res, next) => {
  const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
  if (!token) throw new ApiError(401, "Unauthorized request — no token provided");

  let decoded;
  try {
    decoded = jwt.verify(token, accessTokenSecret);
  } catch (err) {
    throw new ApiError(401, "Invalid or expired access token");
  }

  const user = await User.findById(decoded._id);
  if (!user) throw new ApiError(401, "User for this token no longer exists");

  req.user = user;
  next();
});

module.exports = verifyJWT;