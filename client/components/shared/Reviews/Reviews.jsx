import React from 'react';
import ReviewsList from './ReviewsList.jsx';
import AddReviewForm from './AddReviewForm.jsx';

const Reviews = () => (
  <div className="recipe__reviews row">
    <h3>Reviews</h3>
    <ul className="review__list">
      <ReviewsList />
      <AddReviewForm />
    </ul>
  </div>
);

export default Reviews;
