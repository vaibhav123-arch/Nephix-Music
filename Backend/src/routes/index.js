const express = require("express");
const router = express.Router();

router.use("/auth", require("./auth.routes"));
router.use("/songs", require("./song.routes"));
router.use("/albums", require("./album.routes"));
router.use("/artists", require("./artist.routes"));
router.use("/search", require("./search.routes"));
router.use("/history", require("./history.routes"));

module.exports = router;