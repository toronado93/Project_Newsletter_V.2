Welcome my newbie project

In this project, my aim is making a webbase application which user can connect via google or microsoft service or individual email.
Once user connect to the app via services(google,microsoft) They are able to see their following event in app. They will be also change or add new events via mobile app.

With this project , I will be using following technologies;
-HTML
-CSS
-JAVASCRIPT
-NODE.JS
-RESTFULL API
-MONGO DB

User Screens;

<img width="967" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/a077cae5-3807-43fe-a250-d909979d2363">
<img width="445" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/c793a47b-6c76-4685-a252-571e7a6f72e4">
<img width="812" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/fc21ad49-a542-494a-b7c3-aa2f22a46c26">






After creating node js environment and provide development environment;

1. Mongo-DB implementation:
As a first step i complited mongo db connection can be seen in db.js
after i created a mechanism which asking user an email, if user doesnt exit, we navigate user to second screen,
and ask additional information after user enroll the newsletter.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/615cada6-c4f3-4424-ab6a-304d519099b6)




2.Restfull Api 
I am curently practicing my restfull api skills.Hence i created server and user controller.js and seperated business logics.

If i need to make quick conclusion before second comit what our app can do as i mentioned earlier user can enroll with their name and email.
If they already exist app gently tell user you re exist if they not , they can enroll the newsletter.

Next step will be passport.js implementaion. User will be able to enter the app via their google or microsoft email. After succesfully process app navigate user to calendar.
User will be able to see oncoming events.

<img width="844" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/ce891441-9c92-48c8-b836-a1a0214c9935">


3.Google Authentication Implementation

One of the crucial method in this project is google services. This is my first interaction with google services. Google calendar api is used in the application. Workflow is quite simple user , once user has succesfull connection , app redirect user to the calendar page. In this page users are able to see their events. For now user is only allowed to see their events but for the future I am considering to add and delete functionalty in the project.

I insist to mention coding side of the google authentication;

In main page we have a google button. Once user click to button Authentication and fetch the calendar data process is kicked off. Buton trigger a form and form trigger to google route.

starter has scopes, tell the google what data we are seeking and push the process on passport.js google strategy

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/4d218c7a-aab2-42d1-857a-88c8842e1709)
![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/6377632a-01db-47c2-bc34-6f90fb7d5c2e)



After authentication process is complited on the google side , goole/callback route is triggered. If the process reach the success , app also transfer accesstoken in to the app scopes.

We can think google/callback like junction function, depends to success navigate the user on calendar or failure route.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/0dc6abb7-a4fc-440d-ba4b-a2d10ad2da11)


If calendar route is triggered , calendar method use the accesstoken and fetch the calendar data from goodle services into the app and redirect users to calendar page.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/8fe62ee2-dd9e-4564-b929-64e27a560cfe)


I did not like to google date format and slighty changed it with little function 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/47752a44-4c7e-4054-87e4-753d86e329f9)


4. Calendar Page

   In the calendar page we have a table format says welcome to the user and shows user event. For now we only have demonstrate and delete mechanism. User can see their event and also they can delete their event via checkbox. Edit button trigger to okey button and seletected task can be deleted after okey button is clicked.



In order to have this functionality, I needed to add following code in my profect.

Calendar method provide relevant data from google calendar services , such as profile name, profile id , event id etc. I created a data structure using two objects in one array system and transfer profile info, picture info and events info to the user page via ejs.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/1d65de6a-1dfd-4389-88b9-93e381c0304e)

On the frontend , each checkbox is associated with their relevant event id, this functionality help app to understand which event should be deleted when user trigger the delete function.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/21fd325e-f481-4c3f-b8ab-13dc2064942b)

When delete button is clicked two frontend functions help out to send selected checkbox info to the server side.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/d773a2c7-d37d-4f38-a3ae-4e1113375c4a)

I chosed to send event's id via parametre. On the server side we catch the event id using req.params.eventId


![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/927606fd-d307-411b-82fc-2842bb263d9a)

With the following code , we send user access token and event is to the google service within delete method , google delete the event belonging to sent id.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/6e975f08-4b54-48d2-857d-cd28af264bbe)

Last Work
<<<<<<< HEAD










