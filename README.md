Taken from a previous project for use in the development of a CI/CD pipeline in the DevOps course. The original Readme is found at the bottom.

On successful deployment, the app is reachable at https://teefinder-devops.web.app/

## Get it running

- Download dependencies with `npm install`
- Google Maps API required, create and place in file `.local.env`
- Start locally using `npm start`
- Browser automatically opens. With the right API keys you can log in with Google, otherwise use Guest. Pressing a point on the map shows a list of nearby golf courses. Each also has the option to mark it as a favourite.

Disabling can be done by running `firebase hosting:disable`. Redeploy to enable hosting.



#
> Project in DH2624
This is an app for golf players to find golf courses based on coordinates from an embedded google maps view. The user chose an destination either by clicking the map or search a city. 
The app show golf courses close to the location and the user may interact with the reults to find more info of the courses. The user may rate and save the golf courses to its own favourites. 

>Important: The user has to login to be able to see the details and review the courses.

>The google login does not work for now becuase of googles own security policy. You have to login as a guest.

>What we have done: 
Embedded google maps on the app using an API 
Acquire golf courses from static coordinates (not user given), longitude and latitude. 

>What we plan to do: 
Enable the user to give coordinates to fetch Golf courses. 
UI/UX evaluation to target user group 
Rating and login function 

>GolfCourseModel.js 
Model for the app. 

>golfCourseSource.js
Code for fetching golf courses using API. 

>googleMapsSource.js
Code for fatiching using the Google maps API 

>mapView.js & mapPresenter.js 
View and presenter for google maps. 

>coursesView & coursesPresenter.js 
View and presenter for the gold course API 

>detailsView &  detalsPresenter
View and presenter for individual golf courses, more detailed. 

>favouritesView & favouritesPresenter
View and presenter for the favourites store by the user. 

>loginView & loginPresenter
View and presenter for the login field. 

>firebaseConfig.js
Configuration for firebase

>firebaseModel.js
Model for firebase

>resolvePromises.js
Code to resolve promises. 
