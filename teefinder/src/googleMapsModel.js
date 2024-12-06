import { resolvePromise } from './resolvePromise';
import { observable } from 'mobx';
import { fetchMap } from './googleMapsSource';

const model = observable({
  loading: true,
  error: null,
  ready: true,

  mapsPromiseState: {
    promise: null,
    data: null,
    error: null,
  },




});

export { model };