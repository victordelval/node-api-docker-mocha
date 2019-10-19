const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");

const result = dotenv.config();
if (result.error) {
  throw result.error;
}

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI || "mongodb://movie-db:27017/moviedb";

// Express app
const app = express();

// connect to MongoDB
mongoose.connect(DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", () => console.log("connected to database"));

// adding Helmet to enhance your API's security
app.use(helmet());
// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());
// enabling CORS for all requests
app.use(cors());
// adding morgan to log HTTP requests
app.use(morgan("combined"));

// Routes
const moviesRouter = require("./routes/movies");
app.use("/movies", moviesRouter);

// Listen
app.listen(PORT, err => {
  if (err) {
    throw err;
  }
  console.log(`Api server listening on port ${PORT}!`);
});
