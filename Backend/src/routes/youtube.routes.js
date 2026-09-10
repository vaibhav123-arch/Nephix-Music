const express = require("express");

const router = express.Router();

const {
  searchYouTube,
} = require("../controllers/youtube.controller");

router.get("/search", searchYouTube);

module.exports = router;