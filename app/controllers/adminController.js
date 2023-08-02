// You can transfer join state from usercontroller to here
const Admin = require("../models/admin");
const User = require("../models/user");

exports.UserJoin = async (req,res,next)=>{


  try {


    const userwithfieldname = await User.aggregate(
      [
        {
          $lookup: {
            from: 'fields',
            localField: 'fieldId',
            foreignField: 'fieldId',
            as: 'fieldData',
          },
        },
        {
          $unwind: '$fieldData',
        },
        {
          $project: {
            _id: 1,
            name: 1,
            email:1,
            fieldname: '$fieldData.fieldname',
          },
        },
      ]
  
    );
  
    req.table_join = userwithfieldname; 
    next();
    
  } catch (error) {

    console.log(error);
    
  }

  
  }


  exports.isLoggedIn = (req,res,next)=>{

    req.user ? next(): res.sendStatus(401);

}


  exports.AdminLogin = (req,res)=>{

    res.render("admin_login");
  }

  exports.isAdmin = async (req,res,next)=>{

    let return_boolean = false;

    const email = req.body.email;
    const password = req.body.password;

   
    try {
      const responde = await Admin.find({
        email:email,
        password:password
      });

      if(responde.length > 0)
      {
        // Creating user for fulfillment purposes
        req.user={};
        return_boolean = true;
        req.user.return_boolean=return_boolean;
        // console.log(req.user);
      }
      

    } catch (error) {

      console.log(error);
      
    }
     

  
    req.user ? next(): res.sendStatus(401);
     
  }


  exports.ProtectedAdminPage = (req,res)=>{



    // Add this on logout page in admin page
  //   req.logout((err)=>{

  //     err ? console.log(err):res.redirect("/");
      
  // });

// Manuel Session Controll
  // setTimeout(()=>{
  //   req.user=null;
  //   console.log("session killed");
  // },8000);

  // Catch the Join Array Here
  
   const join_data_array = req.table_join;
  
  // console.log("Join_data_check",join_data_array);

    req.user ? res.render("admin",{join_data_array}): res.sendStatus(401);



  }



