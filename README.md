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



28.07.2023

I want to add sending email services. Basically when admin decide to send email , admin can send email whenever they want.
In order to implement this service in my project first I need to understand how can i use google gmail api.

I created a basic structure, when admin click to button, app connects admin with google services and fetch the admins email into the app.
Reason why I did , as I mentioned beffore I wantred to the understand how can I cominicate with google gmail service.

Process starts when admin decide connect with email service 

<img width="1022" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/2fd001b5-6f71-4159-98aa-8292e4a01223">
Frontend trigger button

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/b0c651c9-9441-4c76-a548-9ce5307fed2e)
First step of google authentication

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/7e734e21-bd9d-41e0-a52f-32e6951a531d)
Definding scopes

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/e1adbca2-2855-4328-b382-e8cbd6e97d1b)
Creating gmail strategy

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/1144818c-0709-4bfe-8723-2e490be4fd25)
Callback

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/d73a92cd-7901-4cca-a0c2-24e4d79fd506)
![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/613f850b-03d3-480f-9be9-233907351ed5)
![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/afb6b1a1-7354-4d7d-af1a-5d230b7d2fac)

In adminpage function I fetch user email information from google, google send too many information , I eliminated what would i need using 
mapping and filtering array methods

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/814d48ba-6f64-473d-9b20-3e9d8560ebe1)
![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/e3218091-c95b-4250-922a-d5ab5620e482)
And Final result we managed to fetch mails in ideal format

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/2eee67cb-c888-4404-88ce-5f46fa89ae60)



Implementing Email system into the project


I added subject textbox and logout button on admin page and defined checkbox system. Admin can chose whether all user or specific user to send email

<img width="860" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/34cc6ef9-8fe4-4915-8228-d967323f1ac9">

<img width="833" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/33c62b03-7b96-4f2f-8bde-5ad6ed2c28a9">



<img width="947" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/aa036623-ce07-417a-8825-ca33eb12ed67">

I decided to implement expremental js method control mechanizm into the admin page 
New control layer is added after send button is triggered. This send button lead the flow on emailsendercontrol method.
This method basically check the checkboxes, title and messages. We an array here with three false elements in it.
Each appropriate condition turns relevant element up to true, if end up array have three true , process execute the emailSender method
or else ControlPopUp() method is triggered. Gives user a idea what is missing on the process.

Pop up automatically , dissappears in curtain times 

<img width="848" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/e0f38049-32c8-4994-bdb3-d729c9a40055">

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/1df12625-9f04-4efe-a619-e23cfd5df6da)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/5dc6a375-f342-486f-9dbe-616a0daaae1a)

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/70706b90-a4c7-4183-b96f-58f9346edc51)

We push the data via post method, on the server side.
I added new chain mechanism in order to make routing system more clear 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/e4c6a3cb-d248-445f-8744-141fb5e8a81b)
![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/ff56dba2-bd2f-4272-8a96-996258d71fe2)


Route navigates app into sendingemailservice middleware which is located in googleservice.js,
Sendingemailservice method is in charge to take email user , email title and email body information from req.body and 
seperate them into different variable types.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/034bb401-e402-4089-bf43-df26976d36e7)

SendEmail method is ivoked by Sendingemailservice method and takes required email information in order to create raw data 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/505a9164-8b0a-4f2e-aaf2-1ec607b08445)

In SendEmail method, optimal raw data is created within appropriate google specification and sending back to the Sendingemailservice method

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/4f61fd34-bab7-4ba5-bd6c-a09fc3ba3b15)

New promises array is generated from raw data array via array maping method and all promises are executed,

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/966d485d-102f-4ac9-8b2f-b82d8d19be08)


After all routing jump into the second middleware name called adminController.UserJoin , here as I mentioned before user and field data generated into
a object which is used in ejs.

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/60f75566-5483-4048-a1c8-e1fd75b5aa7c)

Then after adminController.ProtectedAminPage middleware is executed and admin user screen is showed up one more time.

<img width="917" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/9f7b782c-09fa-4a97-a01f-8c20d2a27366">

Testing 

<img width="868" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/5d34b752-a862-44f6-ab75-574d99db4337">

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/f6a29433-3aad-4612-9579-823f46ad2452)

Welcome message sender added on the app.

When new user enroll the application , now  app sends welcome mail via nodemailer implementation

That is the route which is triggered once user send their info

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/6eaa5969-3e78-4e28-9dca-7e2818b71594)

Nodemailer implementation

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/7514833a-8a57-4601-aa98-d48dfb1396fc)

Flow;
<img width="913" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/f8bd1bf8-1f81-4f8b-9df9-1321fa3ed4a3">

<img width="612" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/6f3a0a4b-0cf1-4873-b69c-10998bd71239">

<img width="594" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/b929609e-865e-4a4d-af41-f9ed6f67d9e3">

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/dd7bceea-a780-417f-a86b-56a791a42596)

Next development is taken place in admin page.

Now admin be able to update update or delete users.

I added nice front-end mechanism for that as you can see below.

Following method catch clicked buttons info and created new input field in order to customise user name.


![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/22a941db-1ff6-4f25-be6c-0e052043e358)


I created to functions. 
One of them is responsible to trigger patch request and sending user id which is email in this case and updated data information 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/0ea50f92-fc11-4287-aa20-f3001ef755e4)


Other function triggers the delete request 

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/f23fdb32-3200-4c67-a2e1-ac9a94b21207)

On the server side 

Update User

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/c1305e50-ab7f-4b27-927b-0c9eaa02b208)

Delete User

![image](https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/f60a25cc-5334-4eec-b2fb-a9ad1df0c5f4)


Admin screen Final Glence

<img width="1504" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/28531041-c898-40f8-8705-922540680adb">

<img width="1504" alt="image" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/585fd191-f736-46c9-a3da-e83e58529c56">

<img width="1504" alt="Screenshot 2023-08-02 at 22 10 54" src="https://github.com/toronado93/Project_Newsletter_V.2/assets/62039608/ba94a45f-6295-4316-855a-a9293461d21f">


Testing:

You can try the app , you can enroll and recieve welcome mail and even enter the system as a admin and enjoy sending email and crud services.

Glitch link: https://newsletter-v2.glitch.me/

admin email : 01testuser0101@gmail.com
pass:123456;

If you wanna test calendar features

Test user
email: 01testuser0101@gmail.com
pass:  testuser0101.



































