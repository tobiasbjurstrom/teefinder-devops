import React, { useState } from "react";
import "../index.css";

function ReviewForm({ courseId, userId, userName, onSubmit }) {
  const [rating, setRating] = useState(0); 
  const [hoverRating, setHoverRating] = useState(null); 
  const [reviewText, setReviewText] = useState(""); 

  const handleStarClick = (index) => {
    setRating(index + 1); 
  };

  const handleStarMouseEnter = (index) => {
    setHoverRating(index + 1); 
  };

  const handleStarMouseLeave = () => {
    setHoverRating(null); 
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating < 1 || rating > 5) {
      alert("Please select a rating between 1 and 5 stars.");
      return;
    }
    onSubmit(courseId, userId, userName, rating, reviewText);
    setRating(0);
    setHoverRating(null);
    setReviewText("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <span
            key={index}
            className={`star ${index < (hoverRating || rating) ? "filled" : ""}`}
            onClick={() => handleStarClick(index)}
            onMouseEnter={() => handleStarMouseEnter(index)}
            onMouseLeave={handleStarMouseLeave}
          >
            ★
          </span>
        ))}
      </div>
      <textarea
        placeholder="Write your review here..."
        value={reviewText}
        onChange={(e) => setReviewText(e.target.value)}
        rows={4}
        style={{ width: "100%", marginTop: "10px" }}
      />
      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;
