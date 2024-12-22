import React from 'react';
import { observer } from 'mobx-react-lite';
import CoursesPresenter from './coursesPresenter';
import MapPresenter from './mapPresenter';
import LoginPresenter from './loginPresenter';
import DetailsPresenter from './detailsPresenter';
import FavouritesPresenter from './favouritesPresenter';


const ReactRoot = observer(function ReactRoot(props) {
  if (!props.model.golfCoursesPromiseState.promise) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
  }   
  props.model.loginStore.reloadCurrentUser();
  function onLoginClick(){
     props.model.login = true;
  }
  function onSignOutClick(){
    props.model.loginStore.handleSignOut();
  }
  function goBackACB() {
    props.model.login = false;
    props.model.loginStore.isInitialized = false;
  }

  function onFavouriteClick(){
    props.model.loadFavourites = true;
  }
  function goBackFavorutiteClickACB(){
    props.model.loadFavourites = false;
  }
  function goBackDetailsACB(){
    props.model.setSelectedCourse(null);
  }
  function handleCourseClickACB(event){
    props.model.setSelectedCourse(event);
    console.log(event);
  }

return (
    <div className="flex-parent">
            <div className="top-header">
      <h1 className='header-title'>Teefinder</h1>
      {!props.model.userLoggedIn ? (
        <button className="login-button" onClick={onLoginClick}>
          Login
        </button>
      ) : (
        <><button
            className='favorite-button'
            onClick={onFavouriteClick}
          > Favorites </button>
          <button
            className="sign-out-button"
            onClick={onSignOutClick}
          >
              Sign Out
            </button></>)}
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
          <CoursesPresenter 
          model={props.model}
          onCourseClick={handleCourseClickACB} /></div>
      </div>
      {props.model.selectedCourse && (
      <div className="popup">
        <div className="popup-content">
          <button className="close-button" onClick={goBackDetailsACB}>×</button>
          <DetailsPresenter model={props.model} />
        </div>
      </div>
    )}
      {props.model.loadFavourites && (
      <div className="popup">
        <div className="popup-content">
          <button className="close-button" onClick={goBackFavorutiteClickACB}>×</button>
          <FavouritesPresenter model={props.model} />
        </div>
      </div>
    )}
      
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