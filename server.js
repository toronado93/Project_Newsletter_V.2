const express = require("express");
const app = express();
const port = 3000;
const ejs = require("ejs");
const { v4: uuidvrs4 } = require("uuid");
const db = require(__dirname + "/config/db.js");
const serverController = require(__dirname +
  "/app/controllers/serverController.js");
const usersController = require(__dirname +
  "/app/controllers/usersController.js");

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

// Atlas Connection Test
db.Atlas_Connection();

// Routes
app.get("/", serverController.get);
app.post("/", usersController.processUser);
app.post("/form",usersController.createUser);

// Static MiddleWare
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});
