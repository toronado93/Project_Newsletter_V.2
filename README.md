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
