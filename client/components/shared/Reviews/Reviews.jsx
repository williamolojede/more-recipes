import React from 'react';
import PropTypes from 'prop-types';

import { userPrototypes } from '../../../config/proptypes';

import Review from './Review.jsx';
import AddReviewForm from './AddReviewForm.jsx';

const Reviews = ({ reviews, user, id }) => (
  <div className="recipe__reviews row">
    <h3>Reviews</h3>
    <ul className="review__list">
      {
        reviews.length === 0 ?
          <li className="no-reviews" >eyah <span role="img" aria-label="sad">😢  </span> no reviews yet</li>
          :
          reviews.map((review, i) => <Review review={review} key={i} />)
      }
      <AddReviewForm user={user} id={id} />
    </ul>
  </div>
);

Reviews.propTypes = {
  user: PropTypes.shape(userPrototypes).isRequired
};

export default Reviews;
