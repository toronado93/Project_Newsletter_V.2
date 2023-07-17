const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");
const { v4: uuidvrs4 } = require("uuid");
// Passport
const passport = require("passport");
const localStrategy = require("passport-local");

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Session

// Initialize passport

// Serialize-Deserialize

// Passport Skeleton(Motor)

app.get("/", (req, res) => {
  //   res.render("index.html");
  res.render("index");
});

// Static MiddleWare
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
