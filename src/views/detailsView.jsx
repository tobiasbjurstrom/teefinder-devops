import React from "react";
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
      <p>Webbsite: {course.website}</p>
      <p>number of holes: {course.number_of_holes} </p>

      <div>
        <button className="review-button"
        onClick={() => props.reviewClick()}
        >Review</button>
      </div>
      <div className="reviews-section">

        <ReviewList reviews={props.model.reviews} />
      </div>

  
    </div>
  );
}

export default DetailsView;
/*
      <ReviewForm
        model={props.model}
        courseId={course.club_name}
        userId={props.model.loginStore.currentUser.id}
        userName={props.model.loginStore.currentUser.name}
      />*/