import React from 'react';

const AddReviewForm = () => (
  <li className="review__card review__card-edit card" id="write-review">
    <div className="card-image">
      <img src="https://roadwaytravels.com/img/userDefaultIcon.png" alt="usr-avatar" />
      <h5 className="card-title">Your Name</h5>
    </div>
    <div className="card-content">
      <textarea placeholder="your review..." />
      <button type="submit" className="z-depth-1">Submit</button>
    </div>
  </li>
);

export default AddReviewForm;
