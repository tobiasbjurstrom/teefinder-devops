import { fetchGolfCourses } from './golfCourseSource';

const model = {
  clubinformation: [],
  loading: true,
  error: null,
  ready: true, // Add this to simulate readiness for now

  async loadGolfCourses() {
    try {
      this.loading = true;
      this.error = null;
      const data = await fetchGolfCourses();
      this.clubinformation = data || []; // Ensure data is an array
      this.loading = false;
    } catch (error) {
      this.error = error;
      this.loading = false;
    }
  },

  getCourseNames() {
    return this.clubinformation.map(club => club.club_name);
  },

  isLoading() {
    return this.loading;
  },

  getError() {
    return this.error;
  }
};

export  { model };