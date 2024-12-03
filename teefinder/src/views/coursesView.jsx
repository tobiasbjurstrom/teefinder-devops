import React from 'react';

const CoursesView = ({ courses, loading, onCourseClick }) => {
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Golf Courses</h1>
      <ul>
        {courses.map((course, index) => (
          <li key={index} onClick={() => onCourseClick(course)}>{course}</li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesView;