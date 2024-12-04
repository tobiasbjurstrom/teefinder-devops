const API_URL = 'https://golf-course-finder.p.rapidapi.com/api/golf-clubs/?miles=10&latitude=36.56910381018662&longitude=-121.95035631683683';
const API_KEY = '4bb9b4a6cdmshdf2bdb688b02b06p181056jsn00f11448f199';
const API_HOST = 'golf-course-finder.p.rapidapi.com';

function handleResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}

export async function fetchGolfCourses() {
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

