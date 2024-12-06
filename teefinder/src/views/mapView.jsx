
import React from 'react';

const MapView = ({ model}) => {
    /*const [markerLocation, setMarkerLocation] = useState({
        lat: 59.3293,       //Stockholm default
        lng: 18.0686,
      });*/
/*
    const query = {
        long: '59.3293', 
        lat: '18.0686',
        zoom: 12,                 
        maptype: 'roadmap',        
    };

    if (!model.src.url || model.mapsPromiseState?.isPending) {
        return (
            <div>
                <p>Loading Google Maps...</p>
                <img 
                    src="https://brfenergi.se/iprog/loading.gif" 
                    alt="Loading Indicator" 
                    width="100"
                    height="100"
                />
            </div>
        );
    }


    model.loadGoogleMaps(query);
    console.log(model.src.url);
*/

  return (
        <iframe
            title="Google Map"
            width="600"
            height="450"
            style={{ border: 20 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src= {model.src.url}
            alt= "https://brfenergi.se/iprog/loading.gif"
        ></iframe>
  );
};

export default MapView;