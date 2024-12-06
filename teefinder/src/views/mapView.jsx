
import React from 'react';
import {urlBuilder} from '../googleMapsSource';



const MapView = ({  }) => {
    /*const [markerLocation, setMarkerLocation] = useState({
        lat: 59.3293,       //Stockholm default
        lng: 18.0686,
      });*/

console.log("map view");
    const query = {
        long: '59.3293', 
        lat: '18.0686',
        zoom: 12,                 
        maptype: 'roadmap',        
    };

    const embedUrl = urlBuilder(query);
    console.log(embedUrl);



  return (
        <iframe
            title="Google Map"
            width="600"
            height="450"
            style={{ border: 20 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={embedUrl}
            alt= "https://brfenergi.se/iprog/loading.gif"
        ></iframe>
  );
};

export default MapView;