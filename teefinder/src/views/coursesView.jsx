import React from 'react';

const CoursesView = ({ courses, loading, onCourseClick, onAddToFavourites, onShowFavourites }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Golf Courses</h1>
      <button onClick={onShowFavourites}>Show favourites</button>
         
      <ul>
        {courses.map((course, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span onClick={() => onCourseClick(course)} style={{ cursor: 'pointer' }}>{course}</span>
            <button className="align-right" onClick={() => onAddToFavourites(course.club_name)}  >add to favourites</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesView;