const API_URL = 'https://golf-course-finder.p.rapidapi.com/api/golf-clubs/';
const API_KEY = '4bb9b4a6cdmshdf2bdb688b02b06p181056jsn00f11448f199';
const API_HOST = 'golf-course-finder.p.rapidapi.com';

function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
}

async function fetchGolfCourses(query) {
    const url = `${API_URL}?${new URLSearchParams(query)}`;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': API_HOST
        }
    };

    try {
        const response = await fetch(url, options);
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { fetchGolfCourses };