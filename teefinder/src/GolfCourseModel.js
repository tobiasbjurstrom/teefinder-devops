
import { fetchGolfCourses } from './golfCourseSource.js';
import { resolvePromise } from './resolvePromise.js';
import { observable } from 'mobx';
import { fetchGoogleMaps, initializeMap } from './googleMapsSource';
import { saveUserToFirebase, fetchAllUsersFromFirebase, decodeGoogleToken } from './firebaseModel.js';
import { ref, get } from "firebase/database";
import { db } from "./firebaseModel";

const model = observable({
  clubinformation: [],
  favourites: [],
  selectedCourse: null,
    golfCoursesPromiseState: {
    promise: null,
    data: null,
    error: null
  },
  mapsPromiseState: {
    promise: null,
    data: null,
    error: null,
  },
  src: null,
  map: null,
  loading: false,
  clickedCoordinates:{
    lat: null,
    lng: null,
  },
  login: false,
  userLoggedIn: false,
  isMapsLoaded: false,


  loginStore: {
    users: {},
    currentUser: null,
    errors: {},

    setCurrentUser(user) {
      this.currentUser = user;
    },

    setErrors(errorType, errorMessage) {
      this.errors[errorType] = errorMessage;
    },

    reloadCurrentUser() {
      const loggedInUserId = localStorage.getItem("loggedInUserId");
      if (!loggedInUserId) {
        console.log("No logged-in user found in local storage.");
        return;
      }
    
      const userRef = ref(db, `users/${loggedInUserId}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const userData = snapshot.val();
          console.log("Reloaded user from Firebase:", userData);
          this.setCurrentUser(userData);
        } else {
          console.log("No user data found in Firebase for ID:", loggedInUserId);
        }
      });
    },    

    async handleGoogleLogin(response) {
      try {
        const userObject = decodeGoogleToken(response.credential);
        userObject.id = userObject.sub;
        this.setCurrentUser(userObject);
        localStorage.setItem("loggedInUserId", userObject.id);
        await saveUserToFirebase(userObject);
      } catch (error) {
        this.setErrors("google", "Google login failed.");
      }
    },

    async handleGuestLogin() {
      const guestUser = { 
        id: `guest_${Date.now()}`, 
        name: `Guest User ${Object.keys(this.users || {}).length + 1}`,
      };
      this.setCurrentUser(guestUser);
      localStorage.setItem("loggedInUserId", guestUser.id);
      await saveUserToFirebase(guestUser);
    },

    handleSignOut() {
      this.setCurrentUser(null);
      localStorage.removeItem("loggedInUserId");
      //saveUserToFirebase(null);
    },

    fetchAllUsers() {
      fetchAllUsersFromFirebase((data) => {
        this.users = data;
      });
    },
  },

  getCourseNames() {
    if (!Array.isArray(this.clubinformation)) {
      return [];
    }
    return this.clubinformation.map(club => club.club_name);
  },

  setSelectedCourse(course) {
    if (!Array.isArray(this.clubinformation)) {
      this.clubinformation = [];
    }
    this.selectedCourse = this.clubinformation.find(club => club.club_name === course);
  },

  getSelectedCourse() {
    return this.selectedCourse;
  },

  addToFavourites(course) {
    this.favourites.push(course);
    this.favourites = observable.array(this.favourites.slice()); // Ensure MobX notices the change

  },

  removeFavourite(course) {
    this.favourites = this.favourites.filter(fav => fav.club_name !== course.club_name);
  },

  getFavourites() {
    return this.favourites;
  },

  loadGoogleMaps(query) {
    this.loading = true;
    fetchGoogleMaps(query)
    
    },

    async initializeMap() {
      initializeMap();
    },


    getSrcURL() {
      return this.src.url;
    },


   loadCourses() {
    console.log('Loading courses...');
    const prms = fetchGolfCourses();
    resolvePromise(prms, this.golfCoursesPromiseState);
    prms.then((data) => {
      this.clubinformation = data || [];
      console.log('Data:', data);



    }).catch(error => {
      console.error('Error:', error);
    });
  }
});

export { model };