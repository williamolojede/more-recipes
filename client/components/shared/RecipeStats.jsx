/* eslint react/require-default-props: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RecipeStats extends Component {
  constructor() {
    super();
    this.state = {
      activeButton: ''
    };
  }

  onButtonClick = (type, direction) => {
    if (type === 'favorite') {
      this.setState({
        activeButton: 'favoriteButton'
      });
      this.props.favorite();
    }

    if (type === 'vote') {
      this.setState({
        activeButton: `${direction}VoteButton`
      });
      this.props.vote(direction);
    }
  }
  render() {
    const {
      favoriteCount,
      upVoteCount,
      downVoteCount,
      viewCount
    } = this.props.stats;
    return (
      <ul className="recipe-stats">
        <li className="recipe-stats__favorite">
          <button
            onClick={() => this.props.favorite && this.onButtonClick('favorite')}
            className={this.state.activeButton === 'favoriteButton' && 'active'}
          >
            <i className="mdi mdi-heart" />
            <span>{favoriteCount}</span>
          </button>
        </li>
        <li className="recipe-stats__vote-up">
          <button
            onClick={() => this.props.vote && this.onButtonClick('vote', 'up')}
            className={this.state.activeButton === 'upVoteButton' && 'active'}
          >
            <i className="mdi mdi-thumb-up" />
            <span>{upVoteCount}</span>
          </button>
        </li>
        <li className="recipe-stats__vote-down">
          <button
            onClick={() => this.props.vote && this.onButtonClick('vote', 'down')}
            className={this.state.activeButton === 'downVoteButton' && 'active'}
          >
            <i className="mdi mdi-thumb-down" />
            <span>{downVoteCount}</span>
          </button>
        </li>
        <li className="recipe-stats__views">
          <i className="mdi mdi-eye" />
          <span>{viewCount}</span>
        </li>
      </ul>
    );
  }
}

RecipeStats.propTypes = {
  stats: PropTypes.shape({
    downVoteCount: PropTypes.number.isRequired,
    favoriteCount: PropTypes.number.isRequired,
    upVoteCount: PropTypes.number.isRequired,
    viewCount: PropTypes.number.isRequired
  }).isRequired,

  vote: PropTypes.func,
  favorite: PropTypes.func
};


export default RecipeStats;
