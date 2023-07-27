const usersController = require("../controllers/usersController.js");
const ms = require("../controllers/microservices.js")
const user = require("../models/user.js");

const uuid = require("uuid");

// Email Test
// ms.SendEmail();

// OAUTH2 IMPLEMENTATION
const { google } = require("googleapis");
const passport = require("passport");

const oauth2Client =(accessToken)=>{

  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({ access_token: accessToken });

  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  return [oauth2Client,calendar];

}

const oauth2ClientGmail =(accessToken)=>{

  const oauth2Client = new google.auth.OAuth2();

  oauth2Client.setCredentials({ access_token: accessToken });

  const gmail = google.gmail({ version: "v1", auth: oauth2Client });

  // 
  return [oauth2Client,gmail];

}




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


exports.CreatNewEvent = async (req,res)=>{
  
  // console.log(req.user);

  const new_event_summary = req.body.input_event;
  const accesstoken = req.user.accessToken;

  // array[0] current time , array[1] half an hour late
  const time_array = ms.getNewEventTime();

  // Even Details

  const event_details = {

    summary: new_event_summary,
    description: new_event_summary+" : "+uuid.v4(),
    start: {
      dateTime: time_array[0], // Change to your preferred start date and time
      timeZone: "Europe/London", // e.g., "America/New_York"
    },
    end: {
      dateTime: time_array[1], // Change to your preferred end date and time
      timeZone: "Europe/London", // e.g., "America/New_York"
    },
  }

  // SetinCredentials Callback
  // Calendar[0] oauth client
   const calendar = oauth2Client(accesstoken);


   try {
    // Insert the event into the calendar
    const response = await calendar[1].events.insert({
      auth: calendar[0],
      calendarId: "primary", // Use "primary" to add the event to the user's primary calendar
      resource: event_details,
    });
    // console.log("Event created:", response.data);
  } catch (error) {
    console.error("Error creating event:", error.message);
  }
   

  res.redirect("/google/calendar");
}



exports.Google_OauthForGmailstarter = passport.authenticate("gmail",{
  scope:["email","profile","https://www.googleapis.com/auth/gmail.readonly"],
});
exports.gmailCallback =  passport.authenticate("gmail",{
  successRedirect:"adminpageviagoogle",
  failureRedirect:"failure"
});


// Connect accesstoken with Google API and send to the admincontroller Page
exports.AdminPage = async (req,res)=>{

  // Check if authentication legit

  // Connect with the Gmail API

   const accesstoken= req.user.accessTokenGMAIL;
   const gmail = oauth2ClientGmail(accesstoken);

   const responde = await gmail[1].users.messages.list(
        {
          userId: 'me',
          q: 'in:inbox',
        }
      );

      const emails = responde.data.messages;

      console.log(emails);
      
      emails[0].id

      for(let i=0; i<emails.length;i++)
      {
        try {
          await gmail.users.messages.get({
            userId: "me",
            id: emails[i].id,
          })
          
        } catch (error) {
          
        }

      }



}



exports.SendingEmailService =(req,res)=>{


}