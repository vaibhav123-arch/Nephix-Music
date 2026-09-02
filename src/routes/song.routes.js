const express = require("express");
const router = express.Router();

const { getSongById, playSong, nextSong, previousSong } = require("../controllers/song.controller");
const verifyJWT = require("../middlewares/auth.middleware");

router.use(verifyJWT);

router.get("/:id", getSongById);
router.post("/:id/play", playSong);
router.get("/:id/next", nextSong);
router.get("/:id/previous", previousSong);

module.exports = router;