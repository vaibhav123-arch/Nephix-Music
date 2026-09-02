const express = require("express");
const router = express.Router();

const { getRecentlyPlayed, clearHistory } = require("../controllers/history.controller");
const verifyJWT = require("../middlewares/auth.middleware");

router.use(verifyJWT);

router.get("/", getRecentlyPlayed);
router.delete("/", clearHistory);

module.exports = router;