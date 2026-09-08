const User = require("../models/User.model");
const asyncHandler = require("../utils/AsyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const { issueTokensForUser, verifyRefreshToken } = require("../services/auth.service");
const { COOKIE_OPTIONS } = require("../config/constants");
const { OAuth2Client } = require("google-auth-library");
const { googleClientId } = require("../config/env");
const googleClient = new OAuth2Client(googleClientId);


const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) throw new ApiError(409, "Username or email already in use");

  const user = await User.create({ username, email, password });
  const { accessToken, refreshToken } = await issueTokensForUser(user._id);

  return res
    .status(201)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(new ApiResponse(201, { user: { _id: user._id, username: user.username, email: user.email }, accessToken }, "User registered successfully"));
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(401, "Invalid email or password");

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid email or password");

  const { accessToken, refreshToken } = await issueTokensForUser(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(new ApiResponse(200, { user: { _id: user._id, username: user.username, email: user.email }, accessToken }, "Login successful"));
});

const logout = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(req.user._id, { $unset: { refreshToken: 1 } });

  return res
    .status(200)
    .clearCookie("accessToken", COOKIE_OPTIONS)
    .clearCookie("refreshToken", COOKIE_OPTIONS)
    .json(new ApiResponse(200, {}, "Logout successful"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingToken = req.cookies?.refreshToken || req.body?.refreshToken;
  const user = await verifyRefreshToken(incomingToken);
  const { accessToken, refreshToken } = await issueTokensForUser(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(new ApiResponse(200, { accessToken }, "Access token refreshed"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res.status(200).json(new ApiResponse(200, { user: req.user }, "Current user fetched"));
});

const googleLogin = asyncHandler(async (req, res) => {
   console.log("1. CONTROLLER HIT");

  const { credential } = req.body;

  console.log("2. CREDENTIAL:", credential ? "received" : "missing");

  if (!credential) throw new ApiError(400, "Google credential missing");

  console.log("3. VERIFYING GOOGLE TOKEN");

  const ticket = await googleClient.verifyIdToken({
    idToken: credential,
    audience: googleClientId,
  });
  

  console.log("4. GOOGLE TOKEN VERIFIED");

  const payload = ticket.getPayload();

  console.log("5. GOOGLE PAYLOAD:", payload);
  
  console.log("6. FINDING USER");

  let user = await User.findOne({ $or: [{ googleId: payload.sub }, { email: payload.email }] });

  console.log("7. USER FOUND:", user);
  console.log("8. CREATING USER");

  if (!user) {
    
     console.log("8. CREATING USER");

  try {
    user = await User.create({
      username: payload.email.split("@")[0] + Math.floor(Math.random() * 1000),
      email: payload.email,
      googleId: payload.sub,
      avatar: payload.picture || "",
    });

    console.log("9. USER CREATED:", user);
  } catch (error) {
    console.error("USER CREATION ERROR:", error);
    throw error;
  }
  } else if (!user.googleId) {
   
    user.googleId = payload.sub;
    await user.save({ validateBeforeSave: false });
  }

  const { accessToken, refreshToken } = await issueTokensForUser(user._id);

  return res
    .status(200)
    .cookie("accessToken", accessToken, COOKIE_OPTIONS)
    .cookie("refreshToken", refreshToken, COOKIE_OPTIONS)
    .json(new ApiResponse(200, { user: { _id: user._id, username: user.username, email: user.email }, accessToken }, "Google login successful"));
});

module.exports = { register, login, logout, refreshAccessToken, getCurrentUser,googleLogin };