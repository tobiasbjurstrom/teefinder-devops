
import React from 'react';

const MapView = ({ model, src }) => {
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
    

  //  model.loadGoogleMaps(query);

    console.log(model.src.url);
    console.log(model.mapsPromiseState)
    if(!model.src?.url){
       return  <p>Loading</p>;
    }
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