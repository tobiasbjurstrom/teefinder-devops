import { observable } from 'mobx';
import { fetchGolfCourses } from './golfCourseSource';
import { resolvePromise } from './resolvePromise';

const model = observable({
  clubinformation: [],
  loading: true,
  error: null,
  ready: true,
  selectedCourse: null,
  showDetails: false,
  golfCoursesPromiseState: {
    promise: null,
    data: null,
    error: null,
  },

  loadGolfCourses() {
    const query = {
      miles: 49,
      latitude: -33.920727,
      longitude: 18.726318
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

  getCourseNames() {
    return this.clubinformation.map(club => club.club_name);
  },

  setSelectedCourse(courseName) {
    this.selectedCourse = this.clubinformation.find(club => club.club_name === courseName);
    this.showDetails = true; 
  },

  getSelectedCourse() {
    return this.selectedCourse;
  },

  isLoading() {
    return this.golfCoursesPromiseState.promise && !this.golfCoursesPromiseState.data && !this.golfCoursesPromiseState.error;
  },

  getError() {
    return this.golfCoursesPromiseState.error;
  },

  isShowingDetails() {
    return this.showDetails;
  },

  hideDetails() {
    this.showDetails = false;
  },


});

export { model };