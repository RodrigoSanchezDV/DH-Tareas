const express = require('express');
const router = express.Router();

const apiControllerGenres = require("../../controllers/api/genres.js")
const apiControllerMovies = require("../../controllers/api/movies.js")


router.get("/genres", apiControllerGenres.list)



router.get("/movies",apiControllerMovies.list)

router.post("/movies/create",apiControllerMovies.create)

router.delete("/movies/delete/:id", apiControllerMovies.delete)

module.exports = router