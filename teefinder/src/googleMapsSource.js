

const apiKey ='AIzaSyA6i9thnMDGCRhO-EP5-X_yGyRMgHS5gqY';
const apiURL = 'https://www.google.com/maps/embed/v1/view?key=';
//https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS
    

function urlBuilder(query) {
    console.log('Query object:', query);

    if (!query.long || !query.lat) {
        throw new Error('Longitude and latitude must be defined');
    }
    const url = `${apiURL}${apiKey}&center=${query.long},${query.lat}&zoom=${query.zoom}&maptype=${query.maptype}`;

    return url;
}


function handleResponse(response) {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    console.log(response)
    return response;
}

async function fetchGoogleMaps(query) {
    const url = urlBuilder(query);

    try {
        const response = await fetch(url);
        console.log("HandleResponse")
        return handleResponse(response);
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export { fetchGoogleMaps };



