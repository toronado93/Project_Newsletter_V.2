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
const oauthController =require(__dirname+"/app/controllers/oauth.js");
  // Google Manuel Service
const googleLocalController = require(__dirname+"/app/controllers/googleservice.js");
// Google service implementation
const gs = require(__dirname+'/app/controllers/googleservice.js');
// Admin Service
const adminController = require(__dirname+'/app/controllers/adminController.js');

// Passport
const passport = require("passport");
const localStrategy = require("passport-local");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const session = require("express-session");

// Middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

// Session

app.use(session({
  secret:"your-secret-key",
  resave:false,
  saveUninitialized:false
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


// Passport Skeleton(Motor)

passport.use(
  new GoogleStrategy(
   {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
   },

   function (accessToken,refreshToken,profile,done){

  // Google Calendar API

      profile.accessToken = accessToken;
      profile.refreshToken = refreshToken;
    
    
      done(null,profile)
   }
  )
);


// Serialize-Deserialize

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  if (user) {
    done(null, user);
  } else {
    done(null, null);
  }
});




// Atlas Connection Test
db.Atlas_Connection();

// Test
// app.get("/",usersController.JoinTest,serverController.get);

// Routes
app.get("/",serverController.get);
app.post("/google",oauthController.starter);
app.get("/google/callback",oauthController.google_callback);
app.get("/google/calendar",oauthController.isLoggedIn,googleLocalController.OauthCheckFromGoogle,oauthController.calendar);
app.get("/failure",oauthController.failure);
app.post("/", usersController.processUser);
app.post("/form",usersController.createUser);
app.get("/logout",oauthController.logout);
app.get("/admin",adminController.AdminLogin);
app.post("/adminlogin",adminController.UserJoin,adminController.isAdmin,adminController.ProtectedAdminPage);
// app.get("/adminlogin",adminController.isLoggedIn,(req,res)=>{
//   res.render("admin");
// });
// From Calendar
app.get("/delete_event/:eventId",oauthController.delete);
app.post("/create_event",gs.CreatNewEvent);

// Static MiddleWare
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Server is up and running on port ${port}`);
});


