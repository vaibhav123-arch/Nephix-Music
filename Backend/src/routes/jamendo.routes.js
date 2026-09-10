const express = require("express");
const router = express.Router();

const { searchJamendo } = require("../controllers/jamendo.controller");

router.get("/", searchJamendo);

module.exports = router;