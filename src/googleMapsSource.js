import { model } from './GolfCourseModel';

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const apiKeyTest = "AIzaSyA6i9thnMDGCRhO-EP5-X_yGyRMgHS5fqY";


window.clickedCoordinates = null;
let position = null;
let clickedLat = null;
let clickedLng = null;

function fetchGoogleMaps() {
  if (window.google && window.google.maps) {
    initializeMap();
    return;
  }

  const script = document.createElement('script');
  script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=weekly&libraries=places,marker&callback=initMap`;  script.async = true;
  script.defer = true;

  window.initMap = () => {
    console.log('Google Maps API loaded');
    initializeMap();
  };

  script.onerror = () => {
    console.error('Failed to load Google Maps SDK');
  };

  document.head.appendChild(script);
}

async function initializeMap() {
  if (window.position == null) {
    position = { lat: 59.3293, lng: 18.0686 };
  }

  if (window.google && window.google.maps) {
    const { Map } = window.google.maps;
    const map = new Map(document.getElementById('map'), {
      center: position,
      zoom: 10,
      mapId: 'DEMO_MAP_ID',
    });

    new window.google.maps.marker.AdvancedMarkerElement({
      position: position,
      map,
      title: 'Stockholm',
    });

    map.addListener('click', (event) => {
      clickedLat = event.latLng.lat();
      clickedLng = event.latLng.lng();
      console.log(`Clicked coordinates: Latitude: ${clickedLat}, Longitude: ${clickedLng}`);

      window.clickedCoordinates = { lat: clickedLat, lng: clickedLng };
      model.loadCourses();
    });

    const input = document.getElementById('city-search');
    if (input) {
      const autocomplete = new window.google.maps.places.Autocomplete(input);
      autocomplete.addListener('place_changed', function () {
        const place = autocomplete.getPlace();
        if (!place.geometry) {
          console.log('No details available for input: ' + place.name);
          return;
        }

        map.setCenter(place.geometry.location);
        map.setZoom(10);
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        clickedLat = lat;
        clickedLng = lng;

        window.clickedCoordinates = { lat, lng };
        position = { lat, lng };

        new window.google.maps.marker.AdvancedMarkerElement({
          position,
          map,
        });

        model.loadCourses();
      });
    }

    console.log('Map initialized successfully');
  } else {
    console.error('Google Maps API is not available');
  }
}

function getClickedLat() {
  return clickedLat;
}

function getClickedLng() {
  return clickedLng;
}

export { fetchGoogleMaps, initializeMap, getClickedLat, getClickedLng };