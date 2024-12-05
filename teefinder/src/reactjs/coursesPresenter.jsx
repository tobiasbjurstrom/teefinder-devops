import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CoursesView from '../views/coursesView';
import DetailsPresenter from './detailsPresenter';
import FavouritesPresenter from './favouritesPresenter';
import { set } from 'mobx';

const CoursesPresenter = observer(function CoursesRender(props) {

  const [selectedCourse, setSelectedCourse] = useState(null); //details
  const [selectedFavourite, setSelectedFavourite] = useState(null); //favourites
 /*
  if (!props.model.golfCoursesPromiseState.promise) {
    console.log('Calling loadCourses...');
    props.model.loadCourses();
  }
    */
  function clickOnCourseACB(courseName) {
    props.model.setSelectedCourse(courseName);
    setSelectedCourse(courseName);
  }

  function goBack() {
    setSelectedCourse(null);
    setSelectedFavourite(null);
  }


  function clickOnFavouritesACB(courseName) {
    if (!props.model.favourites.includes(courseName)) {
      props.model.addToFavourites(courseName);
    }
  }
  function showFavouritesACB(){
    setSelectedFavourite(true);

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
  if (selectedCourse) {
    return <DetailsPresenter 
    model={props.model} 
    goBack={goBack} />;
  }
  if(selectedFavourite) {
    return <FavouritesPresenter 
    model={props.model} 
    goBack={goBack}
    />;
  }
  return (
    <CoursesView 
    model={props.model} 
    clickOnCourse={clickOnCourseACB}
    clickOnFavourites={clickOnFavouritesACB}
    showFavourites={showFavouritesACB}
    />
  );
});

export default CoursesPresenter;