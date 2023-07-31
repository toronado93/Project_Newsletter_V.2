
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



