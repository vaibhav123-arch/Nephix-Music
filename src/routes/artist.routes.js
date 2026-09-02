const express = require("express");
const router = express.Router();

const { getAllArtists, getArtistById } = require("../controllers/artist.controller");
const verifyJWT = require("../middlewares/auth.middleware");

router.use(verifyJWT);

router.get("/", getAllArtists);
router.get("/:id", getArtistById);

module.exports = router;