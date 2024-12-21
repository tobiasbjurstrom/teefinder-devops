import React from 'react';
import { observer } from 'mobx-react-lite';
import CoursesPresenter from './coursesPresenter';
import MapPresenter from './mapPresenter';
import LoginPresenter from './loginPresenter';


const ReactRoot = observer(function ReactRoot(props) {
  if (!props.model.golfCoursesPromiseState.promise) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
  }   


  function onLoginClick(){
     props.model.login = true;
  }
  function goBackACB() {
    props.model.login = false;
  }

return (
    <div className="flex-parent">
            <div className="top-header">
      <h1 className='header-title'>Teefinder</h1>
      {!props.model.userLoggedIn ? (
        // Login Button
        <button className="login-button" onClick={onLoginClick}>
          Login
        </button>
      ) : (
        // Sign Out Button
        <button
          className="sign-out-button"
          onClick={onLoginClick}
        >
          User
        </button>)}
    </div>
      <div className="main-content">
        <div className = "maps-content">
          <MapPresenter model ={props.model}/></div>
       {props.model.login && ( <div className="popup">
        <div className="popup-content">
          <button className="close-button" onClick={goBackACB}>×</button>
          <LoginPresenter model={props.model}/>
        </div>
      </div>
    )}
        <div className='courses-content'>
          <CoursesPresenter model={props.model} /></div>
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