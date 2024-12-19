import React from 'react';
import '../index.css';


export function CoursesView(props) {
  
  return (
    
    <div className='courses-view'>
      <h1>Golf Courses</h1>
      <div className="show-favourites-button">
      <button onClick= {()=> props.showFavourites() } >show Favourites</button>
      </div>
      <ul>
        {props.model.getCourseNames().map((courseName, index) => (
          <li key={index}>
            <span onClick={() => props.clickOnCourse(courseName)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'red' }}>
             <div className='course-title'>{courseName}</div> 
            </span>
            
            <button onClick={() => props.clickOnFavourites(courseName)} className ="align-right">Add to Favourites</button>
            <button onClick={() => props.removeFavourite(courseName)}> Remove Favourite</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CoursesView;
