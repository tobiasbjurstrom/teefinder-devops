import React from "react";


export function DetailsView(props) {
    const course = props.model.getSelectedCourse();
    if (!course) {
        return <div>No course selected</div>;
    }
  return (
    <div className="details-content">
      <h1>Details</h1>
        <p>Course: {course.club_name}</p>
        <p>Country: {course.country}</p>
        <p>City: {course.city}</p>
        <p>Address: {course.address}</p>
        <p>Phone: {course.phone}</p>
        <p>Email: {course.email_adress}</p>

    </div>
  );
}
export default DetailsView;