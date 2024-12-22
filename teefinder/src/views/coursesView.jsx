import React from 'react';
import '../index.css';


export function CoursesView( props ) {
  
  return (
    
    <div>
      <div className='courses-view'>
        {props.model.getCourseNames().map((courseName, index) => (
          <li key={index}>
            <span onClick={() => props.clickOnCourse(courseName)}>
              {courseName}
            </span>
            <div className="button-group">
            <button onClick={() => props.clickOnFavourites(courseName)}>
              Add to Favourites
            </button>
            <button onClick={() => props.removeFavourite(courseName)}>
              Remove Favourite
            </button>
          </div>
          </li>
        ))}
      </div>
    </div>
  );
}
export default CoursesView;
