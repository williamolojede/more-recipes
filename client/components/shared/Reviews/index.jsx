/* eslint react/no-array-index-key: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactPaginate from 'react-paginate';

import { fetchReviews } from '../../../actions/reviews';
import {
  reviewPropTypes,
  currentUserPropTypes,
  paginationPropTypes
} from '../../../config/proptypes';

import Review from './Review.jsx';
import AddReviewForm from './AddReviewForm.jsx';
import Preloader from '../Preloader';

class Reviews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      limit: 6,
      fetchingReviews: false
    };
  }

  componentDidMount() {
    const payload = {
      recipeId: this.props.recipeId,
      limit: this.state.limit,
      page: this.state.currentPage
    };
    this.props.dispatch(fetchReviews(payload));
  }


  componentWillReceiveProps(newProps) {
    if (newProps.reviews) {
      const {
        pagination
      } = newProps;
      this.setState({
        last: pagination.last
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      const payload = {
        recipeId: this.props.recipeId,
        limit: this.state.limit,
        page: this.state.currentPage
      };
      this.setState({ fetchingReviews: true });
      this.props.dispatch(fetchReviews(payload))
        .then(() => {
          this.setState({ fetchingReviews: false });
        });
    }
  }

  handlePageClick = ({ selected }) => {
    this.setState({
      currentPage: selected + 1
    });
  }


  render() {
    const { reviews, currentUser, recipeId } = this.props;
    return (
      <div className="recipe__reviews row">
        <h3>Reviews</h3>
        <AddReviewForm
          currentUser={currentUser}
          dispatch={this.props.dispatch}
          recipeId={recipeId}
          limit={this.state.limit}
        />
        <ul className="review__list">
          {
            this.state.fetchingReviews && <Preloader />
          }
          {
            reviews.length === 0 ?
              <li className="no-reviews" >eyah <span role="img" aria-label="sad">😢  </span> no reviews yet</li>
              :
              reviews.map((review, i) => <Review review={review} key={i} />)
          }
        </ul>
        {
          this.state.last > 1 &&
            <ReactPaginate
              previousLabel={<i className="material-icons">chevron_left</i>}
              nextLabel={<i className="material-icons">chevron_right</i>}
              pageCount={this.props.pagination.last}
              marginPagesDisplayed={3}
              pageClassName="waves-effect"
              pageRangeDisplayed={2}
              onPageChange={this.handlePageClick}
              activeClassName="active"
              containerClassName="pagination"
            />
        }
      </div>
    );
  }
}


Reviews.propTypes = {
  reviews: PropTypes.arrayOf(reviewPropTypes.review).isRequired,
  recipeId: PropTypes.number.isRequired,
  ...currentUserPropTypes,
  ...paginationPropTypes
};

export const mapStateToProps = ({
  recipeReviews: { reviews, pagination },
  isFetching,
  auth: { currentUser }
}) => ({
  reviews,
  pagination,
  currentUser,
  isFetching
});

export { Reviews as PureReviews };

export default connect(mapStateToProps)(Reviews);
