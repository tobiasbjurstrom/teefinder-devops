

import { getClickedLat, getClickedLng } from './googleMapsSource';


const API_KEY = '4bb9b4a6cdmshdf2bdb688b02b06p181056jsn00f11448f199';
const API_HOST = 'golf-course-finder.p.rapidapi.com';

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

const miles = 49;

export async function fetchGolfCourses() {
    const clickedLat = getClickedLat();
    const clickedLng = getClickedLng();
    console.log("funkar?", clickedLat);
    if (clickedLat === null || clickedLng === null) {
        console.log('Coordinates not set');
    }
    console.log(`Using coordinates: Latitude: ${clickedLat}, Longitude: ${clickedLng}`);

    const API_URL = `https://golf-course-finder.p.rapidapi.com/api/golf-clubs/?miles=${miles}&latitude=${clickedLat}&longitude=${clickedLng}`;

    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(API_URL, options);
        return handleResponse(response); // Assuming the response has a 'courses' array
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
    
}

