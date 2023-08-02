
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const keyPath = ".credentials/credentials.json";
const fs = require("fs");
const nodeMailer = require("nodemailer");

require("dotenv").config();


exports.FieldCheck = (email)=>{

  const result  = email.split("@");
 
  const field= result[1].split(".");
// console.log("Field result in mc",field);
//   Result1 bring outlook,gmail or others

if(field[0] ==="outlook"){
    return 3;
}else if(field[0] ==="gmail"){
    return 2;

}else{
    return 1;
}
}



exports.getNewEventTime =() =>{

    const d_now = new Date();
    const d_half = new Date(d_now.getTime() + 30 * 60 * 1000);
   

    return [DateTimeObject(d_now),DateTimeObject(d_half)];
}

function DateTimeObject(date_obj){

    const time_object ={
  
        Fullyear:date_obj.getFullYear(),
        Month:date_obj.getMonth(),
        Day:date_obj.getDate(),
        T:"T",
        Hours:date_obj.getHours(),
        Minutes:date_obj.getMinutes(),
        Seconds:date_obj.getSeconds(),
      }
  

      const time_google_string = time_object.Fullyear+
    "-"+time_object.Month+"-"+time_object.Day+time_object.T+
    time_object.Hours+":"+time_object.Minutes+":"+time_object.Seconds;
    
   return time_google_string;

}


// Admin Password Creator
// Add some Salt and Hash to send into the db


// Email Service 

// Gmail SMTP INFO




exports.SendEmail =function (user_array,email_title,email_body){
  // console.log(,process.env.GOOGLE_EMAIL_PASSWORD);

  const raw_array =[];

    //  Example of sending object arguments and match them correctly
    const MessageBodyMaker = (params) =>{
      params.subject = new Buffer.from(params.subject).toString("base64");

      const str = [
        'Content-Type: text/plain; charset="UTF-8"\n',
        "MINE-Version: 1.0\n",
        "Content-Transfer-Encoding: 7bit\n",
        `to: ${params.to} \n`,
        `from: ${params.from} \n`,
        `subject: =?UTF-8?B?${params.subject}?= \n\n`,
        params.message
      ].join("");


      return new Buffer.from(str).toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_");

    }

        for(let i=0; i<user_array.length;i++)
        {

          const raw = MessageBodyMaker({
            to: user_array[i],
            from: process.env.GOOGLE_EMAIL,
            subject: email_title,
            message: email_body
          });
          raw_array.push(raw);
        }

        return raw_array;

}



exports.WelcomeEmail = async (req,res)=>{

  const useremail =req.body.email;
  const username  =req.body.name;

  //  Nodemailer requirement
  //  Make sure in your Google acount 2 factor open
  //  And after create an app password
  //  Use this  password here.

  const transporter = nodeMailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
      user:process.env.GOOGLE_EMAIL,
      pass:process.env.GOOGLE_EMAIL_APP_PASS,
    }
  });


  try {

   const info = await transporter.sendMail({

    from:"eep.tech.design@gmail.com",
    to:useremail,
    subject:`Dear ${username}`,
    text:"Welcome to our family"
    
   });
   console.log("Message sen"+info.messageId);
   res.render("success",{user_email:useremail});
  } catch (error) {

    console.log(error);
    res.status(500).send("Sorry, the requested resource was not found.");
    
  }



  // res.render("success");
}

function FileExistence (path){

   // Checking if the data exist
   fs.access(path, fs.constants.F_OK, (err) => {
    if (err) {
      console.error("File not found or inaccessible:", err);
    } else {
      console.log("File exists and is accessible.");
      
    }
  });

}


function ReadFile (path){

    // Checking data what in it 
    fs.readFile(keyPath, "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the file:", err);
      } else {
        try {
          const jsonContent = JSON.parse(data);
          console.log("File content:", jsonContent);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError);
        }
      }

      });

}