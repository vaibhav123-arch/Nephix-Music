const express = require("express");
const router = express.Router();

const { getAllAlbums, getAlbumById, getAlbumsByArtist } = require("../controllers/album.controller");
const verifyJWT = require("../middlewares/auth.middleware");

router.use(verifyJWT);

router.get("/", getAllAlbums);
router.get("/artist/:artistId", getAlbumsByArtist);
router.get("/:id", getAlbumById);

module.exports = router;