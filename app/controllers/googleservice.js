const usersController = require("../controllers/usersController.js");
const ms = require("../controllers/microservices.js")
const user = require("../models/user.js");

exports.OauthCheckFromGoogle = async (req,res,next)=>{

    console.log("Google Service controller");
    // console.log(req.user);
    
    // We check google user here , are they enrolled our system or not 

  // const username = req.user.displayName;
  // const email = req.user.emails[0].value;
  // const field_result =ms.FieldCheck(email);

  const data_transfer_obj ={
    email:req.user.emails[0].value,
    name:req.user.displayName,
    fieldId:ms.FieldCheck(req.user.emails[0].value)
  }
//   Check the user are they exist in our server or not 
// If user not exist promise return empty array

        const responde = await usersController.getUser(data_transfer_obj.email);  

          if(responde.length === 0){
            
            // console.log(req.user);

           const res = await usersController.createUserviaGoogle(data_transfer_obj);
            console.log(res);
            next();

          }else{
            next();
          }

}

