
import { fetchGolfCourses } from './golfCourseSource.js';
import { resolvePromise } from './resolvePromise.js';
import { observable } from 'mobx';
import { fetchGoogleMaps } from './googleMapsSource';

const model = {
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



/*
  loadGolfCourses() {
    const query = {
      miles: 49,
      latitude: -3.920727,
      longitude: 1.726318
    };
    const prms = fetchGolfCourses(query);
    console.log("loadGolfCourses: ", prms);
    resolvePromise(prms, this.golfCoursesPromiseState);

    prms.then((data) => {
        this.clubinformation = data || [];
        this.loading = false;
      }).catch((error) => {
        this.error = error;
        this.loading = false;
      });
  },
  */
  getCourseNames() {
    return this.clubinformation.map(club => club.club_name);
  },

  setSelectedCourse(course) {
    this.selectedCourse = this.clubinformation.find(club => club.club_name === course);
  },

  getSelectedCourse() {
    return this.selectedCourse;
  },

  addToFavourites(course) {
    this.favourites.push(course);
  },

  removeFavourite(course) {
    this.favourites = this.favourites.filter(fav => fav.club_name !== course.club_name);
  },

  getFavourites() {
    return this.favourites;
  },

  loadGoogleMaps(query) {

    const srcMaps = fetchGoogleMaps(query);
    resolvePromise(srcMaps, this.mapsPromiseState);

    srcMaps.then((data) => {
        console.log("DAta: "+ data);
        this.src = data || [];
        console.log("Promise done: ")
        console.log(this.src)
        this.loading = false;
      }).catch((error) => {
        this.error = error;
        this.loading = false;
      });
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
};

export { model };