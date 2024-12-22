import React from "react";
import ReviewForm from "../views/reviewForm";
import ReviewList from "../views/reviewList";

export function DetailsView({ course, reviews, userId, userName, onAddReview }) {
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

      <div className="reviews-section">
        <ReviewList reviews={reviews} />
      </div>

      <ReviewForm
        courseId={course.club_name}
        userId={userId}
        userName={userName}
        onSubmit={onAddReview}
      />
    </div>
  );
}

export default DetailsView;
