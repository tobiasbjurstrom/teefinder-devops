import React from "react";
import "../index.css";

function ReviewList({ reviews }) {
  if (!reviews || Object.keys(reviews).length === 0) {
    return <p>No reviews yet. Be the first to leave one!</p>;
  }

  return (
    <ul className="review-list">
      {Object.entries(reviews).map(([userId, review]) => (
        <li key={userId} className="review-item">
          <div className="stars static"> {}
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                className={`star ${index < review.rating ? "filled" : ""}`}
              >
                ★
              </span>
            ))}
          </div>
          <p className="review-text">{review.reviewText}</p>
          <p className="review-user">
            <small>By: {review.userName || `Guest (${userId})`}</small>
          </p>
        </li>
      ))}
    </ul>
  );
}

export default ReviewList;
