import "../index.css";

function ReviewForm({ courseId, userId, userName, onSubmit }) {
 
  let rating = 0;
  //let reviewText = "";
  let hoverRating = null;

  const form = document.createElement("form");
  form.style.marginTop = "20px";

  const updateStars = () => {
    const starElements = document.querySelectorAll(".star");
    starElements.forEach((star, index) => {
      if (index < (hoverRating || rating)) {
        star.classList.add("filled");
      } else {
        star.classList.remove("filled");
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (rating < 1 || rating > 5) {
      alert("Please select a rating between 1 and 5 stars.");
      return;
    }
    onSubmit(courseId, userId, userName, rating);
    rating = 0;
    hoverRating = null;
    //reviewText = "";
    updateStars();
    //document.querySelector("#reviewText").value = "";
  };
  
  const handleStarClick = (index) => {
    rating = index + 1;
    updateStars();
  };

  const handleStarMouseEnter = (index) => {
    hoverRating = index + 1;
    updateStars();
  };

  const handleStarMouseLeave = () => {
    hoverRating = null;
    updateStars();
  };

  function handleTextChangeACB(){
   // reviewText = textarea.value;  
  };

  const starsContainer = document.createElement("div");
  starsContainer.className = "stars";

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("span");
    star.textContent = "★";
    star.className = "star";
    star.style.cursor = "pointer";

    star.onclick = () => handleStarClick(i);
    star.onmouseenter = () => handleStarMouseEnter(i);
    star.onmouseleave = handleStarMouseLeave();

    starsContainer.appendChild(star);
  }

  /*const textarea = document.createElement("textarea");
  textarea.placeholder = "Write your review here...";
  textarea.id = "reviewText"; 
  textarea.rows = 4;
  textarea.style.width = "100%";
  textarea.style.marginTop = "10px";
  textarea.addEventListener('keyup',handleTextChangeACB); */

  
  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.textContent = "Submit Review";
  submitButton.style.marginTop = "10px";

  form.onsubmit = handleSubmit;
  form.appendChild(starsContainer);
  //form.appendChild(textarea);
  form.appendChild(submitButton);

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

      <br />
      <button type="submit">Submit Review</button>
    </form>
  );
}

export default ReviewForm;

      /*<textarea
        id="reviewText"
        placeholder="Write your review here..."
        value={reviewText}
        onChange={handleTextChangeACB}
        rows={4}
        style={{ width: "100%", marginTop: "10px" }}
      />*/