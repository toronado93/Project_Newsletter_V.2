const passport = require("passport");
const { google } = require("googleapis");


exports.isLoggedIn = (req,res,next)=>{

    req.user ? next(): res.sendStatus(401);

}

// exports.starter = passport.authenticate("google",{scope:["email","profile","https://www.googleapis.com/auth/calendar.readonly"]});
exports.starter = passport.authenticate("google", {
    scope: ["email", "profile", "https://www.googleapis.com/auth/calendar"],
  });

exports.google_callback = passport.authenticate("google",{
    successRedirect:"calendar",
    failureRedirect:"failure"
});

exports.calendar = async (req, res) => {
    // Check if the user is authenticated before accessing the calendar
    if (!req.isAuthenticated()) {
      res.redirect("/google"); // Redirect to the Google authentication route if not authenticated
      return;
    }
    const accessToken = req.user.accessToken;

        // GOOGLE CALENDAR API ACCESS CODE 
     // Create a new OAuth2 client and set the access token
  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: accessToken });

  // Create a new Google Calendar instance
  const calendar = google.calendar({ version: "v3", auth: oauth2Client });

  try {
    // Use the `calendar` instance to fetch the user's calendar events
    const events = await calendar.events.list({
      calendarId: "primary", // Use "primary" to fetch events from the user's primary calendar
    });
    // Send the events data as the response
    // res.json(events.data);
    // Oganize the datas and send to the calendar screen with ejs 
//    console.log("User Info",req.user);

    // console.log(JSON.stringify(events.data, null, 2));
    // console.log(req.user);
    // Username
    const {name ,picture } = req.user._json;
 
    // How many events 
    const itemlength = events.data.items.length;
    
    let data_trasnfer_array =[];
    let obj_eventid ={};
    let obj ={};

    // Organize the data
    for(let i=1;i<itemlength;i++){

        // Date fixer function
      const fixed_date = date_fixer(events.data.items[i].start.dateTime);

      if(obj.hasOwnProperty(fixed_date)){

        obj[fixed_date].push(events.data.items[i].summary);
      }
      else{
        obj[fixed_date]=[events.data.items[i].summary];
      }

       // Filling event_id
       const event_id = events.data.items[i].id;
       obj_eventid[i] =event_id;
    }
    data_trasnfer_array[0]=obj;
    data_trasnfer_array[1]=obj_eventid;

    // res.render("calendar", { name, picture, obj});
     res.render("calendar", { name, picture, data_trasnfer_array});

  } catch (error) {
    console.error("Error fetching calendar events:", error.message);
    res.status(500).send("Error fetching calendar events");
  }
}


exports.failure = (req,res)=>{
    res.send("Shame on you");
}

exports.logout = (req,res)=>{

    req.logout((err)=>{

        err ? console.log(err):res.redirect("/");
        
    });

}



function date_fixer(date){

    const split_array_first = date.split("T");

    const split_array_second =split_array_first[0].split("-");

    const reverse_split_array_second = split_array_second.reverse();

    const join_date = reverse_split_array_second.join("-");

        return join_date;
}




exports.delete = async (req,res)=>{

    const event_Id = req.params.eventId;
    const accessToken = req.user.accessToken;

    // GOOGLE CALENDAR API ACCESS CODE 
    // Create a new OAuth2 client and set the access token
    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken });

    // Create a new Google Calendar instance
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        try {

            await calendar.events.delete({ calendarId:"primary", eventId:event_Id});

            console.log("Event deleted successfully");
            
        } catch (error) {

            console.error("Error deleting calendar event:", error.message);

        }

        res.redirect("/google/calendar");
       

}