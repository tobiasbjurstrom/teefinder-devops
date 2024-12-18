import { model } from './GolfCourseModel';

const apiKey ='AIzaSyA6i9thnMDGCRhO-EP5-X_yGyRMgHS5gqY';
const apiURL = 'https://maps.googleapis.com/maps/api/js?key=';
//https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS
    
window.clickedCoordinates = null;
 let position = null;

let clickedLat = null;
let clickedLng = null;

function urlBuilder() {

    const url = `${apiURL}${apiKey}&loading=async&libraries=maps,places&callback=initMap`;

    return url;
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response)
    return response;
}

async function fetchGoogleMaps() {
    const url = urlBuilder();
    console.log('fetching:')
    try {
        const script = document.createElement('script');
        script.src = url; 
        script.async = true;
        script.defer = true;
    
        window.initMap = () => {
            console.log('Google Maps API loaded');
              initializeMap(); 
        };
            document.head.appendChild(script);
        } catch (error) {
            console.error('Error fetching data:', error);
        throw error;
        }
}
async function initializeMap(query) {

    if(window.position ==null){
        position = { lat: 59.3293, lng: 18.0686 };
    }

    if (window.google && window.google.maps) {
      const { Map } = window.google.maps;
      const { AdvancedMarkerElement } = await window.google.maps.importLibrary("marker");
      const map = new Map(document.getElementById('map'), {
        center: position,
        zoom: 10,
        mapId: "DEMO_MAP_ID",
      });

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: position,
        map,
        title: "Click to Stockholm",
      });

      map.addListener('click', (event) => {
         clickedLat = event.latLng.lat();
         clickedLng = event.latLng.lng();
        console.log(`Clicked coordinates: Latitude: ${clickedLat}, Longitude: ${clickedLng}`);

        window.clickedCoordinates = { lat: clickedLat, lng: clickedLng };
    });

    let input = document.getElementById("city-search");
    let autocomplete = new window.google.maps.places.Autocomplete(input);
  

    autocomplete.addListener("place_changed", function () {
    let place = autocomplete.getPlace();
        console.log(place.geometry.location.lng)
    if (!place.geometry) {
      console.log("No details available for input: " + place.name);
      return;
    }

    map.setCenter(place.geometry.location);
    map.setZoom(10); 
    const lat = place.geometry.location.lat();
    const lng = place.geometry.location.lng();

    window.clickedCoordinates = { lat: lat, lng: lng };
    position = {lat: lat, lng: lng};

    console.log("Latitude: " + lat);
    console.log("Longitude: " + lng);

    const marker = new window.google.maps.marker.AdvancedMarkerElement({
        position: position,
        map,
      });

  });

      console.log('Map initialized:', map);
    } else {
      console.error('Google Maps API is not available');
    }

  

  }
function getClickedLat(){
    return clickedLat;
}
function getClickedLng(){
  return clickedLng;
}
export { fetchGoogleMaps, initializeMap, getClickedLat, getClickedLng };



