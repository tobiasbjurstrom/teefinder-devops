import { model } from './GolfCourseModel';

const apiKey ='AIzaSyA6i9thnMDGCRhO-EP5-X_yGyRMgHS5gqY';
const apiURL = 'https://maps.googleapis.com/maps/api/js?key=';
const proxURL ='https://brfenergi.se/iprog/group/001/';
//https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS
    
window.clickedCoordinates = null;
 let position = null;

let clickedLat = null;
let clickedLng = null;

function urlBuilder() {

    const url = `${proxURL}${apiURL}${apiKey}&loading=async&libraries=maps,places&callback=initMap`;

    return url;
}

async function fetchGoogleMaps() {
    const url = urlBuilder();
    const headers = {
        'X-DH2642-Key': '3d2a031b4cmsh5cd4e7b939ada54p19f679jsn9a775627d767', 
        'X-DH2642-Group': '001'  
      };
    console.log('fetching:')

    const xhr = new XMLHttpRequest();
    xhr.open('GET', `${url}`, true);
    
    // Attach headers to the request
    for (let key in headers) {
      if (headers.hasOwnProperty(key)) {
        xhr.setRequestHeader(key, headers[key]);
      }
    }

    xhr.onload = function () {
        if (xhr.status === 200) {
          // Dynamically create a script tag to load the Google Maps API
          const scriptTag = document.createElement('script');
          scriptTag.innerHTML = xhr.responseText;  // Add the script content returned from the proxy
          document.body.appendChild(scriptTag);
      
          window.initMap = () => {
            console.log('Google Maps API loaded');
              initializeMap(); 
        };
            document.head.appendChild(scriptTag);
        } else {
          console.error('Error loading Google Maps:', xhr.status, xhr.statusText);
        }
      };
      xhr.onerror = function () {
        console.error('Network error while fetching Google Maps');
      };
      
      xhr.send();
    
    /*try {
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
        */
}
async function initializeMap() {

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
        console.log(window.clickedCoordinates.lat);
        model.loadCourses();
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



