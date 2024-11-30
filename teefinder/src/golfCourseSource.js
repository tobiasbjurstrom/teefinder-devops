async function fetchGolfCourses() {
    const url = 'https://golf-course-finder.p.rapidapi.com/api/golf-clubs/?miles=10&latitude=39.569389&longitude=2.650239';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': '4bb9b4a6cdmshdf2bdb688b02b06p181056jsn00f11448f199',
            'x-rapidapi-host': 'golf-course-finder.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        console.log(result); // Log the entire result to see the structure
        return result;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { fetchGolfCourses };