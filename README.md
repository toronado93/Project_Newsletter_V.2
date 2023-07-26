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

<img width="758" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/79917265-ac39-4ae0-ab39-1c84379ea314">



In order to have this functionality, I needed to add following code in my profect.

Calendar method provide relevant data from google calendar services , such as profile name, profile id , event id etc. I created a data structure using two objects in one array system and transfer profile info, picture info and events info to the user page via ejs.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/16909e5f-423d-4a62-a0c0-984c83e81cee)


On the frontend , each checkbox is associated with their relevant event id, this functionality help app to understand which event should be deleted when user trigger the delete function.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/aa7dda8d-83cb-4d59-99d7-dd833069068f)

When delete button is clicked two frontend functions help out to send selected checkbox info to the server side.

I chosed to send event's id via parametre. On the server side we catch the event id using req.params.eventId

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/14be9d20-cd01-4119-bfd4-0b1e7a863c65)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/d1a75642-23c9-4aea-93f8-7bbb05d39485)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/74cd3e65-8c91-452f-bb02-df0bf46019a7)


With the following code , we send user access token and event is to the google service within delete method , google delete the event belonging to sent id.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/7273b365-d8b3-4189-aba1-3e69567bd5b4)

I made some modification for future admin screen. Now when user enter the system via google , we also automatically save them into our database and also i created new mongo model name called field. Some modification is taken place on exist user model , now two model are associated each other for future admin screen features. With the existence of field mongo collection. Admin is able to understand where user comes from email , microsoft or google. Here some screen shoot of my new modifications.

I added a middleware , check the user who comes from google, if they dont exist in our database , function save them in app db.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/c6d70900-49a2-4009-8d22-6747365c61a7)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/8eaf0c21-9ab5-423d-a74a-6508e3caf826)

In order to understand how node.js methods communication with each other , I created a js is called microservices.js help app to distinguish where user comes from.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/7fe298c1-f31a-4799-9edd-488362413ee7)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/fd37a61e-3711-4dd2-91dd-70db25ae4ee2)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/288efe8d-0248-4ed1-bec2-8b840610e3e2)

A join example between two field. This feauture will be added for admin in the future 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/3ee2f843-7616-4d20-80fd-ae99031e526b)



Now User can add entirely new event from the app.
User screen
<img width="598" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/29fab923-b97b-4206-88cd-d17d0e34d150">
<img width="670" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/e5cc438b-6f0b-4863-b5d4-a6b59207b7ba">
<img width="647" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/be711fef-04c8-4bb5-9758-8ca8cfb414a7">

Code side;

Create new event button trigger to route 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/b64a3348-91fb-4240-b819-fc069dd99a2d)

And then after route navigate flow to gs(googleservice js)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/e69ac37c-ac64-4b5e-a4a9-c7ded116e97e)

Our main method is CreatNewEvent in this method we also have getNewEventTime method. This method is located in miscrosercices js.
I created two method there , help us to obtain a date format suitable for google event obj format.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/c8a1ad5f-cff3-40db-b2fb-c84e252f1c50)

In order to get more clear code snippet, I decided to sepearete google api gateway from the main code and call api via additional method which
located in CreatNewEvent

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/49c99bbd-4074-4a59-8b15-e47bd54e15c9)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/c646b835-d9af-41a9-a790-d311e6170c55)

Today We started to implement admin business model , controller and views,

On the main page, if user click Admin , app navigate them into the admin page 

<img width="967" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/ba82c156-b7a8-4cc7-8836-b442558d7671">


Admin login panel 

<img width="1002" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/58daa103-dab4-4dfd-8857-5103f490ea31">

After succesfull authentication we navigate admin to admin panel here , admin can see user info.
Sending email to user logic will be added in next development.

<img width="1130" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/6de6d966-4712-4184-a9cb-c8daa128dad4">

On the coding side;
![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/374edc1a-2280-4f1d-8afe-aea1669d5a59)

adminController.js is created for admin business purposes , We have a userjoin middleware retrieve join data from mongo 
and data is transfered into req object(data will be caught in ProtectedAdminPage method)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/28dd04b4-7d36-450c-bcdf-8ce5032e10b5)

Is admin method matchs the information , if auth success user get through or else recieve unauthorized error

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/308501c5-3295-4c87-a21f-e8552f8290a2)


Then final method , catch the join data(as I mentioned earlier) help us to render admin page 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/924aed1e-caf6-41fc-85cc-bd36da44b78f)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/7b9555cc-5658-4e4b-8c76-4c9ab75d24a7)


I gave really nice shape to admin page. Result is quite satisfying. Admin panel frontend is completed.

<img width="1308" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/02aa9dcf-6576-4f4c-9a13-b1b64d90a9e9">




















