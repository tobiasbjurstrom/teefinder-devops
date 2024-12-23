import React from "react";
import ReviewForm from "../views/reviewForm";
import ReviewList from "../views/reviewList";

export function DetailsView( props) {
  console.log(props.model.reviews);
  const course = props.getCourse();
  console.log("userId: " + props.model.loginStore.currentUser.id);
  console.log(props.model.loginStore.currentUser.id);
  console.log("userName: " + props.model.loginStore.currentUser.name);

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
        userId={props.model.loginStore.currentUser.id}
        userName={props.model.loginStore.currentUser.name}
      />
      <div className="reviews-section">

        <ReviewList reviews={props.model.reviews} />
      </div>

  
    </div>
  );
}

export default DetailsView;
