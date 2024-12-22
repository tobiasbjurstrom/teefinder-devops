import React from "react";
import ReviewForm from "../views/reviewForm";
import ReviewList from "../views/reviewList";

export function DetailsView( props) {
  console.log(props.model.reviews);
  const course = props.getCourse();

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


      <ReviewForm
        model={props.model}
        courseId={course.club_name}
        userId={props.model.loginStore.currentUser}
        userName={props.model.reviews.userName}
      />
      <div className="reviews-section">

        <ReviewList reviews={props.model.reviews} />
      </div>

  
    </div>
  );
}

export default DetailsView;
