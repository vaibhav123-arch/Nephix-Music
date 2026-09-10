const express = require("express");
const router = express.Router();

const verifyJWT = require("../middlewares/auth.middleware");

const {
  getRecentlyPlayed,
  addYouTubeRecentlyPlayed,
} = require("../controllers/recentlyPlayed.controller");

router.get(
  "/",
  verifyJWT,
  getRecentlyPlayed
);

router.post(
  "/youtube",
  verifyJWT,
  addYouTubeRecentlyPlayed
);

module.exports = router;