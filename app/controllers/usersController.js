// app/controllers/usersController.js
const User = require("../models/user");
const Field = require("../models/field");
const microservices = require("../controllers/microservices.js");



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
      res.render("form",{transferred_email:string_email});
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


exports.processUserRefactor = async (req, res , next) => {
  const string_email = req.body.email;
  console.log("We re checking you: ",string_email);

  try {
    const responde = await this.getUser(string_email);
    // if responde is empty array which means user is not exist 
    // so lets create a user then
    if(responde.length === 0){
      next();
    }
    else{
      // which means user is exist 
      // res.render("existence");
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
exports.createUser = async (req, res, next) => {

  console.log("createuser works");
  
  // Catch the Field // Email:1,Gmail:2,Outlook:3;
  const field_result =microservices.FieldCheck(req.body.email);

  // Data transfer obj

  const data_transfer_obj = {
    email:req.body.email,
    name:req.body.name,
    fieldId:field_result
  };

  
  
  // Logic to create a new user in the database
  const newUser = new User(data_transfer_obj);
  try {
    const creation_responde = await newUser.save();


    if(creation_responde.length!==0){
    
      console.log("New user is created");
      
      next();
    }
    
  } catch (error) {
    console.log(error);
  }
  
};

exports.createUserviaGoogle = async (data_obj)=>{

  const newUser = new User(data_obj);

  try {

    const creation_responde = await newUser.save();

    if(creation_responde.length!==0){
    
      return "New user is created";
    }
  } catch (error) {
    
  }

}

exports.fullfillmentforonce = (req,res,next)=>{

  // Create json

  const email = new Field({
    fieldId:1,
    fieldname:"Email"
  });

  const gmail = new Field({
    fieldId:2,
    fieldname:"Gmail"
  });

  const outlook = new Field({
    fieldId:3,
    fieldname:"Outlook"
  });


  const array =[email,gmail,outlook];

  array.forEach(async a=>{

   await a.save();

  });

  next();

}


exports.UpdateUser = async (req,res,next)=>{

  const useremail = {email: req.params.userId};
  const updatedData =  req.body.name;

  try {

   const responde = await User.findOneAndUpdate(
      useremail,
      {
        $set: { name: updatedData }
      }
    );

    console.log("User is updated");

    next();
    
  } catch (error) {

    console.log(error);
    
  }

}


exports.DeleteUser = async (req,res,next)=>{

const useremail = {email:req.params.userId};

try {

  await User.findOneAndDelete(useremail)
      console.log("User is Deleted");
      next();
    
} catch (error) {
  console.log(error);
}

}




// // GET /users/:id
// exports.getUserById = (req, res) => {
//   // Logic to fetch a user by their ID from the database
//   User.findById(req.params.id, (err, user) => {
//     if (err) {
//       return res.status(500).json({ error: err });
//     }
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json(user);
//   });
// };

// // PUT /users/:id
// exports.updateUser = (req, res) => {
//   // Logic to update a user in the database
//   User.findByIdAndUpdate(
//     req.params.id,
//     req.body,
//     { new: true },
//     (err, user) => {
//       if (err) {
//         return res.status(500).json({ error: err });
//       }
//       if (!user) {
//         return res.status(404).json({ message: "User not found" });
//       }
//       return res.status(200).json(user);
//     }
//   );
// };

// // DELETE /users/:id
// exports.deleteUser = (req, res) => {
//   // Logic to delete a user from the database
//   User.findByIdAndDelete(req.params.id, (err, user) => {
//     if (err) {
//       return res.status(500).json({ error: err });
//     }
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(204).end();
//   });
// };
