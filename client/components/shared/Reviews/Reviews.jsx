/* eslint react/no-array-index-key: 0 */
import React from 'react';
import PropTypes from 'prop-types';

import { userPrototypes, reviewPropTypes } from '../../../config/proptypes';

import Review from './Review.jsx';
import AddReviewForm from './AddReviewForm.jsx';

const Reviews = ({ reviews, user, id }) => (
  <div className="recipe__reviews row">
    <h3>Reviews</h3>
    <ul className="review__list">
      <AddReviewForm user={user} id={id} />
      {
        reviews.length === 0 ?
          <li className="no-reviews" >eyah <span role="img" aria-label="sad">😢  </span> no reviews yet</li>
          :
          reviews.map((review, i) => <Review review={review} key={i} />)
      }

    </ul>
  </div>
);

Reviews.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes.review).isRequired,
  user: PropTypes.shape(userPrototypes).isRequired,
  id: PropTypes.number.isRequired
};

export default Reviews;
