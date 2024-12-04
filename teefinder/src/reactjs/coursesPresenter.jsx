import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import CoursesView from '../views/coursesView';
import DetailsPresenter from './detailsPresenter';

const CoursesPresenter = observer(function CoursesRender(props) {

  const [selectedCourse, setSelectedCourse] = useState(null);
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
    return <DetailsPresenter model={props.model} goBack={goBack} />;
  }
  

  return (
    <CoursesView 
    model={props.model} 
    clickOnCourse={clickOnCourseACB}
    />
  );
});

export default CoursesPresenter;