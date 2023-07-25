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

<img width="1382" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/366a3183-6c88-4643-bac9-b7b12093165d">

<img width="1102" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/ed23b56f-2abf-461e-9e1d-6d85c15942ca">

<img width="691" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/cb52b1b0-1441-44c2-8de0-36e05af3ca5f">

<img width="793" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/9dac85d1-f222-4884-a761-5873af74dd10">




After creating node js environment and provide development environment;

1. Mongo-DB implementation:
As a first step i compliated mongo db connection can be seen in db.js
after i created a mechanism which asking user an email, if user doesnt exit, we navigate user to second screen,
and ask additional information after user enroll the newsletter.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/da9b1b5c-44cd-4800-8964-5fb6337a1777)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/526508c3-add6-4d6d-9c16-154b998fa5f9)




2.Restfull Api 
I am curently practicing my restfull api skills.Hence i created server and user controller.js and seperated business logics.

If i need to make quick conclusion before second comit what our app can do as i mentioned earlier user can enroll with their name and email.
If they already exist app gently tell user you re exist if they not , they can enroll the newsletter.

Next step will be passport.js implementaion. User will be able to enter the app via their google or microsoft email. After succesfully process app navigate user to calendar.
User will be able to see oncoming events.

 ![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/b61fa7d8-f904-40e0-8c88-e62de0fe0e87)
![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/474417de-8fdb-40ad-82ab-46d7605b2726)

3.Google Authentication Implementation

One of the crucial method in this project is google services. This is my first interaction with google services. Google calendar api is used in the application. Workflow is quite simple user , once user has succesfull connection , app redirect user to the calendar page. In this page users are able to see their events. For now user is only allowed to see their events but for the future I am considering to add and delete functionalty in the project.

I insist to mention coding side of the google authentication;

In main page we have a google button. Once user click to button Authentication and fetch the calendar data process is kicked off. Buton trigger a form and form trigger to google route.
![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/14e1962d-27a1-46e6-91d7-55a9b41f647d)

starter has scopes, tell the google what data we are seeking and push the process on passport.js google strategy

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/96bb6386-f6fd-4335-b331-5f52c0f7e307)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/050aa3dc-8f9a-4ad5-95f1-6dd0b8c7ff01)

After authentication process is complited on the google side , goole/callback route is triggered. If the process reach the success , app also transfer accesstoken in to the app scopes.

We can think google/callback like junction function, depends to success navigate the user on calendar or failure route.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/72d1d991-e1a0-449d-bae1-80103356a06d)

If calendar route is triggered , calendar method use the accesstoken and fetch the calendar data from goodle services into the app and redirect users to calendar page.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/e19e0599-95b1-4f9d-8cf1-703fc0b6094b)

I did not like to google date format and slighty changed it with little function 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/48d18f64-5faa-4b9f-9715-a866be6e009d)

4. Calendar Page

   In the calendar page we have a table format says welcome to the user and shows user event. For now we only have demonstrate and delete mechanism. User can see their event and also they can delete their event via checkbox. Edit button trigger to okey button and seletected task can be deleted after okey button is clicked.

   <img width="744" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/3574ff70-a729-4cf6-8080-ac2c9eb49781">
   <img width="716" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/d5b539ae-9228-475a-8f82-2a9ec6e6f4ae">

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








