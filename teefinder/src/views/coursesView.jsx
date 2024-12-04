import React from 'react';



export function CoursesView(props) {
  
  return (
    <div>
      <h1>Golf Courses</h1>
      <ul>
        {props.model.getCourseNames().map((courseName, index) => (
          <li key={index}>
            <span onClick={() => props.clickOnCourse(courseName)} style={{ cursor: 'pointer', textDecoration: 'underline', color: 'blue' }}>
              {courseName}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default CoursesView;
