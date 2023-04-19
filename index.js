require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

let ENVIRONMENT = process.env.ENVIRONMENT;
let PORT = process.env.APP_LISTEN_PORT || 4000;

// Response headers
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS, HEAD"
  );
  next();
});

// Home route
app.get("/", async (req, res) => {
  res.send(`Running on port ${PORT}`);
});

mongoose
  .connect(
    ENVIRONMENT === "development"
      ? process.env.DATABASE_URL_DEVELOPMENT
      : process.env.DATABASE_URL_PRODUCTION,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    app.listen(PORT, () => {
      console.log(`app is listing on port ${PORT}`);
    });
    // Auth Routes
    app.use(require("./routes/recommendations"));
  })
  .catch((err) => {
    console.log(err);
  });
