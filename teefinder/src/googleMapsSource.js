

const apiKey ='AIzaSyA6i9thnMDGCRhO-EP5-X_yGyRMgHS5gqY';
const apiURL = 'www.google.com/maps/embed/v1/view?key=';
//https://www.google.com/maps/embed/v1/MAP_MODE?key=YOUR_API_KEY&PARAMETERS
    

function urlBuilder(query) {
    console.log('Query object:', query);

    if (!query.long || !query.lat) {
        throw new Error('Longitude and latitude must be defined');
    }
    const url = `${apiURL}${apiKey}&center=${query.long},${query.lat}&zoom=${query.zoom}&maptype=${query.maptype}`;

    return url;
}

export { urlBuilder };



