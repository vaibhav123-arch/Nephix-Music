const express = require("express");
const router = express.Router();
const recentlyPlayedRoutes = require("./recentlyPlayed.routes");
const searchRoutes = require("./search.routes");
const youtubeRoutes = require("./youtube.routes");


router.use("/auth", require("./auth.routes"));
router.use("/songs", require("./song.routes"));
router.use("/albums", require("./album.routes"));
router.use("/artists", require("./artist.routes"));
router.use("/search", require("./search.routes"),searchRoutes);
router.use("/history", require("./history.routes"));
router.use("/recently-played", recentlyPlayedRoutes);
router.use("/youtube", youtubeRoutes);



module.exports = router;