import { resolvePromise } from './resolvePromise';
import { observable } from 'mobx';
import { fetchGoogleMaps } from './googleMapsSource';

const model = observable({
  loading: true,
  error: null,
  ready: true,
  src: null,

  mapsPromiseState: {
    promise: null,
    data: null,
    error: null,
  },

  loadGoogleMaps(query) {

    const srcMaps = fetchGoogleMaps(query);
    console.log("Src: ", srcMaps);
    resolvePromise(srcMaps, this.mapsPromiseState);

    srcMaps.then((data) => {
        this.src = data || [];
        this.loading = false;
      }).catch((error) => {
        this.error = error;
        this.loading = false;
      });
  },



});

export { model };