import { model } from './GolfCourseModel';

const apiKey ='AIzaSyA6i9thnMDGCRhO-EP5-X_yGyRMgHS5gqY';
const apiURL = 'https://maps.googleapis.com/maps/api/js?key=';
//https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS
    
window.clickedCoordinates = null;

let clickedLat = null;
let clickedLng = null;

function urlBuilder() {

    const url = `${apiURL}${apiKey}&loading=async&libraries=maps&callback=initMap`;

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
async function initializeMap() {

    const position = { lat: 59.3293, lng: 18.0686 };
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


        try {
           model.loadCourses();
      } catch (error) {
          console.error('Error fetching golf courses:', error);
      }
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



