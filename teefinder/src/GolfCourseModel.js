
import { fetchGolfCourses } from './golfCourseSource.js';
import { resolvePromise } from './resolvePromise.js';
import { observable } from 'mobx';
import { fetchGoogleMaps, initializeMap } from './googleMapsSource';

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
  map: null,
  loading: false,
  clickedCoordinates:{
    lat: null,
    lng: null,
  },

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
    this.loading = true;
    fetchGoogleMaps(query)
    
    },

    async initializeMap(query) {
      initializeMap(query);
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