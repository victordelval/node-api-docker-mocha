const express = require("express");
const router = express.Router();
const Movie = require("../models/movie");

// Get all movies
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// // Get one movie
// router.get("/:id", getMovie, (req, res) => {
//   res.json(res.movie);
// });

// List movies by genre
router.get("/:genre", async (req, res) => {
  // TODO - param to lowercase
  try {
    const movies = await Movie.find({
      genre: { 
        $elemMatch: { $eq: req.params.genre }
      }
    });
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create one movie
router.post("/", async (req, res) => {
  const movie = new Movie({
    name: req.body.name,
    director: req.body.director,
    yearRelease: req.body.yearRelease,
    genre: req.body.genre.map(item => item.toLowerCase())
  });

  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one movie
router.patch("/:id", getMovie, async (req, res) => {
  if (req.body.name != null) {
    res.movie.name = req.body.name;
  }
  if (req.body.director != null) {
    res.movie.director = req.body.director;
  }
  if (req.body.yearRelease != null) {
    res.movie.yearRelease = req.body.yearRelease;
  }
  if (req.body.genre != null) {
    res.movie.genre = req.body.genre;
  }

  try {
    const updatedMovie = await res.movie.save();
    res.json(updatedMovie);
  } catch {
    res.status(400).json({ message: err.message });
  }
});

// Delete one movie
router.delete("/:id", getMovie, async (req, res) => {
  try {
    await res.movie.remove();
    res.json({ message: "Movie deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function for gettig movie object by ID
async function getMovie(req, res, next) {
  let movie;
  try {
    movie = await Movie.findById(req.params.id);
    if (movie == null) {
      return res.status(404).json({ message: "Cant find movie" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.movie = movie;
  next();
}

module.exports = router;
