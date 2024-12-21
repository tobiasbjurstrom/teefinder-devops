import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import CoursesView from '../views/coursesView';
import DetailsPresenter from './detailsPresenter';
import FavouritesPresenter from './favouritesPresenter';

import { toJS } from 'mobx';

const CoursesPresenter = observer(function CoursesRender(props) {

  const [selectedCourse, setSelectedCourse] = useState(null); //details
  const [selectedFavourite, setSelectedFavourite] = useState(null); //favourites


  function clickOnCourseACB(courseName) {
    props.model.setSelectedCourse(courseName);
    setSelectedCourse(courseName);
  }

  function goBackACB() {
    setSelectedCourse(null);
    setSelectedFavourite(null);
  }

  function clickOnFavouritesACB(courseName) {
    const course = props.model.clubinformation.find(club => club.club_name === courseName);
    if (course && !props.model.favourites.some(fav => fav.club_name === courseName)) {
      props.model.addToFavourites(course);
      console.log('Current favourites:', toJS(props.model.favourites.slice()));
    }
  }
    
  function showFavouritesACB(){
    setSelectedFavourite(true);
  }

  function removeFavouriteACB(courseName) {
    console.log('Attempting to remove favourite:', courseName);
    console.log('Current favourites:', toJS(props.model.favourites.slice()));

    const course = props.model.favourites.find(fav => fav.club_name === courseName);
    if (course) {
      console.log('Course found in favourites:', course);
      props.model.removeFavourite(course);
      console.log('Current favourites after removal:', props.model.favourites.slice());
    } else {
      console.log('Course not found in favourites:', courseName);
    }
  }



  if (!props.model.golfCoursesPromiseState.promise) {
    return <div>No data</div>;
  }
  else if (props.model.golfCoursesPromiseState.error) {
    return <div>{props.model.golfCoursesPromiseState.error.toString()}</div>;
  }
  else if (!props.model.golfCoursesPromiseState.data) {
    return <img src="https://brfenergi.se/iprog/loading.gif" alt="Loading" />;
  }

  if(selectedFavourite) {
    return <FavouritesPresenter 
    model={props.model} 
    goBack={goBackACB}
    
    />;
  }
  return (
    <div>
    <CoursesView 
    model={props.model} 
    clickOnCourse={clickOnCourseACB}
    clickOnFavourites={clickOnFavouritesACB}
    showFavourites={showFavouritesACB}
    removeFavourite={removeFavouriteACB}
    /> 
     {selectedCourse && (
      <div className="popup">
        <div className="popup-content">
          <button className="close-button" onClick={goBackACB}>×</button>
          <DetailsPresenter model={props.model} goBack={goBackACB} />
        </div>
      </div>
    )}
      
    </div>
    
  );
});

export default CoursesPresenter;