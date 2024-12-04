import React from 'react';
import '../index.css';


export function CoursesView(props) {
  
  return (
    <div>
      <h1>Golf Courses</h1>
      <ul>
        {props.model.getCourseNames().map((courseName, index) => (
          <li key={index}>
            <span onClick={() => props.clickOnCourse(courseName)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'red' }}>
              {courseName}
            </span>
            <button onClick={() => props.clickOnFavourites(courseName)} className ="align-right">Add to Favourites</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CoursesView;
