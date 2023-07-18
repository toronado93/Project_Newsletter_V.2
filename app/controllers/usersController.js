// app/controllers/usersController.js

const User = require("../models/user");

// Check User
// Get user if user exist dont create tell the user you are already enrolled

exports.processUser = async (req, res) => {

  const string_email = req.body.email;
  console.log("We re checking you: ",string_email);
 
  try {

    const responde = await this.getUser(string_email);
    
    // if responde is empty array which means user is not exist 
    // so lets create a user then

    if(responde.length === 0){
      res.render("form");
    }
    else{

      // which means user is exist 
      res.render("existence");
      


    }

  } catch (error) {

    console.log(error);
    
  }


  // Check the user if it is exist redirect you re already exist page

};

// GET /users
exports.getUser = async (string_email) => {
  
  return  await User.find({email:string_email});

};

// POST /users
exports.createUser = async (req, res) => {


  // Logic to create a new user in the database

  const newUser = new User(req.body);

  

  try {

    const creation_responde = await newUser.save();

    if(creation_responde.length!==0){
    
      console.log("New user is created");
      res.render("success.ejs");
    }

   
    
  } catch (error) {
    console.log(error);
  }
  

};

// GET /users/:id
exports.getUserById = (req, res) => {
  // Logic to fetch a user by their ID from the database
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  });
};

// PUT /users/:id
exports.updateUser = (req, res) => {
  // Logic to update a user in the database
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({ error: err });
      }
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      return res.status(200).json(user);
    }
  );
};

// DELETE /users/:id
exports.deleteUser = (req, res) => {
  // Logic to delete a user from the database
  User.findByIdAndDelete(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(204).end();
  });
};
