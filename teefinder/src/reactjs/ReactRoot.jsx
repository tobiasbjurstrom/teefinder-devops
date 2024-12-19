import React from 'react';
import { observer } from 'mobx-react-lite';
import CoursesPresenter from './coursesPresenter';
import MapPresenter from './mapPresenter';
import { useEffect, useState } from 'react';
import {jwtDecode} from 'jwt-decode'; 
import { set } from 'firebase/database';


const ReactRoot = observer(function ReactRoot(props) {
  
  const [user, setUser] = useState({});
  useEffect(() => {
    /* global google */

      google.accounts.id.initialize({
        client_id: "972975531152-qt2lhgudq610n0pk7r8m8gacop2aaogd.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });
      google.accounts.id.renderButton(
        document.getElementById("signInDiv"),
        { theme: "outline", size: "large" }
      );
    
  }, []);

  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID token: " + response.credential);
    var userobject = jwtDecode(response.credential);
    console.log(userobject);
    setUser(userobject);
    document.getElementById("signInDiv").hidden = true;
  }

  if (!props.model.golfCoursesPromiseState.promise) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
  }


  return (
    <div className="flex-parent"><h1>Teefinder </h1>
      <div className="main-content">
        <div className = "maps-content">
        <MapPresenter model ={props.model}/>
        <CoursesPresenter model={props.model} />
       
        
        <div id = "signInDiv"></div>
        </div>
    
      </div>
    </div>
  );
});
//<CoursesPresenter model={props.model} />
//<MapPresenter model ={props.model}/>

export { ReactRoot };
/* <CoursesPresenter model={props.model} />
<MapPresenter model ={props.model}/>
https://www.google.com/maps/embed/v1/view?key=AIzaSyA6i9thnMDGCRhO-EP5-X_yGyRMgHS5gqY&center=59.3293,18.0686&zoom=12&maptype=roadmap
*/