
const nodemailer = require("nodemailer");
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




exports.SendEmail =async function (){
  console.log(process.env.GOOGLE_EMAIL,process.env.GOOGLE_EMAIL_PASSWORD);

// Transport Object

const g_transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465, // Use 465 for SSL/TLS or 587 for STARTTLS
    secure: true, // Set to true for SSL/TLS, false for STARTTLS
    auth: {
      user: process.env.GOOGLE_EMAIL, // Your Gmail email address
      pass: process.env.GOOGLE_EMAIL_PASSWORD, // Your Gmail password or an application-specific password
    },
  });
  

  const g_mailOptions = {
    from: process.env.GOOGLE_EMAIL,
    to: "e.ertac.p@gmail.com",
    subject: "Test Email",
    text: "Hello, this is a test email sent using Nodemailer and Gmail!",
  };


  try {
    await g_transporter.sendMail(g_mailOptions)
    console.log("Email sent:", info.response);
     
  } catch (error) {

    console.error("Error sending email:", error);
  }


//   g_transporter.sendMail(g_mailOptions , (error, info) => {
//     if (error) {
//       console.error("Error sending email:", error);
//     } else {
//       console.log("Email sent:", info.response);
//     }
//   });


}

