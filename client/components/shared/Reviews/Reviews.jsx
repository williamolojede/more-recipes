/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchReviews } from '../../../actions/reviews';
import { reviewPropTypes, currentUserPropTypes } from '../../../config/proptypes';

import Review from './Review.jsx';
import AddReviewForm from './AddReviewForm.jsx';

class Reviews extends Component {
  componentDidMount() {
    this.props.dispatch(fetchReviews(this.props.recipeId));
  }

  render() {
    const { reviews, currentUser, recipeId } = this.props;
    return (
      <div className="recipe__reviews row">
        <h3>Reviews</h3>
        <ul className="review__list">
          <AddReviewForm currentUser={currentUser} recipeId={recipeId} />
          {
            reviews.length === 0 ?
              <li className="no-reviews" >eyah <span role="img" aria-label="sad">😢  </span> no reviews yet</li>
              :
              reviews.map((review, i) => <Review review={review} key={i} />)
          }

        </ul>
      </div>
    );
  }
}


Reviews.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes.review).isRequired,
  recipeId: PropTypes.number.isRequired,
  ...currentUserPropTypes
};

const mapStateToProps = ({
  recipeReviews: reviews,
  isFetching,
  auth: { currentUser }
}) => ({
  reviews,
  currentUser,
  isFetching
});

export default connect(mapStateToProps)(Reviews);
