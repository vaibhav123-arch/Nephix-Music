const express = require("express");
const router = express.Router();

const { login, logout, refreshAccessToken, getCurrentUser,googleLogin } = require("../controllers/auth.controller");
const verifyJWT = require("../middlewares/auth.middleware");
const validate = require("../middlewares/validate.middleware");
const rateLimiter = require("../middlewares/rateLimiter.middleware");
const { validateLogin } = require("../validators/auth.validator");


router.post("/login", rateLimiter({ windowMs: 60 * 1000, max: 10 }), validate(validateLogin), login);
router.post("/refresh-token", refreshAccessToken);

router.post("/logout", verifyJWT, logout);
router.get("/me", verifyJWT, getCurrentUser);

router.post("/google", googleLogin);

module.exports = router;