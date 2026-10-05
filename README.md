Project in DH2624
This is an app for golf players to find golf courses based on coordinates from an embedded google maps view. The user chose an destination either by clicking the map or search a city. 
The app show golf courses close to the location and the user may interact with the reults to find more info of the courses. The user may rate and save the golf courses to its own favourites. 

Important: The user has to login to be able to see the details and review the courses.

The google login does not work for now becuase of googles own security policy. You have to login as a guest.

What we have done: 
Embedded google maps on the app using an API 
Acquire golf courses from static coordinates (not user given), longitude and latitude. 

What we plan to do: 
Enable the user to give coordinates to fetch Golf courses. 
UI/UX evaluation to target user group 
Rating and login function 

GolfCourseModel.js 
Model for the app. 

golfCourseSource.js
Code for fetching golf courses using API. 

googleMapsSource.js
Code for fatiching using the Google maps API 

mapView.js & mapPresenter.js 
View and presenter for google maps. 

coursesView & coursesPresenter.js 
View and presenter for the gold course API 

detailsView &  detalsPresenter
View and presenter for individual golf courses, more detailed. 

favouritesView & favouritesPresenter
View and presenter for the favourites store by the user. 

loginView & loginPresenter
View and presenter for the login field. 

firebaseConfig.js
Configuration for firebase

firebaseModel.js
Model for firebase

resolvePromises.js
Code to resolve promises. 
