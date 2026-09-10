const express = require("express");

const router = express.Router();

const {
  searchSongsHandler,
  searchAlbumsHandler,
  searchArtistsHandler,
  searchSuggestionsHandler,
} = require("../controllers/search.controller");

const verifyJWT = require("../middlewares/auth.middleware");

router.use(verifyJWT);

router.get("/songs", searchSongsHandler);

router.get("/albums", searchAlbumsHandler);

router.get("/artists", searchArtistsHandler);

router.get("/suggestions", searchSuggestionsHandler);

module.exports = router;