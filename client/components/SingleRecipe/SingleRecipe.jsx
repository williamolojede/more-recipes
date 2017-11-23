/* eslint camelcase: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import { fetchSingleRecipes, vote, favorite } from '../../actions/recipe';

import Preloader from '../shared/Preloader.jsx';
import SiteNav from '../shared/SiteNav.jsx';
import SiteFooter from '../shared/SiteFooter.jsx';
import IngredientsList from '../shared/IngredientsList.jsx';
import InstructionsList from '../shared/InstructionsList.jsx';
import Reviews from '../shared/Reviews/Reviews.jsx';
import RecipeStats from '../shared/RecipeStats.jsx';
import Notification from '../shared/Notification.jsx';
import { recipePropTypes } from '../../config/proptypes';

class SingleRecipe extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleRecipes(this.props.match.params.id));
  }

  vote = (dir) => {
    this.props.dispatch(vote(dir, this.props.recipe.id));
  }

  favorite = () => {
    this.props.dispatch(favorite(this.props.recipe.id));
  }

  render() {
    if (Object.keys(this.props.recipe).length === 0) return (<Preloader />);

    const {
      id,
      name,
      description,
      img_url,
      ingredients,
      instructions,
      reviews,
      upVoteCount,
      downVoteCount,
      favoriteCount,
      viewCount
    } = this.props.recipe;

    const stats = {
      upVoteCount,
      downVoteCount,
      favoriteCount,
      viewCount
    };


    return (
      <div className="page page__recipe">
        <header className="site-header">
          <SiteNav user={this.props.user} />
        </header>
        <main>
          <div className="container">
            <div className="row">
              <div className="col s12 m5">
                <img src={img_url} alt={name} />
              </div>
              <div className="col s12 m7">
                <h4 className="recipe__name">{name}</h4>
                <p className="recipe__description">{description}</p>
                <div className="row recipe__stats">
                  <RecipeStats stats={stats} vote={this.vote} favorite={this.favorite} />
                  <a href="#write-review" className="write-review">
                      Write Review
                  </a>
                </div>
              </div>
            </div>

            <IngredientsList ingredients={ingredients} />
            <InstructionsList instructions={instructions} />
            <Reviews reviews={reviews} user={this.props.user} id={id} />
          </div>
        </main>

        <Notification notification={this.props.notification} dispatch={this.props.dispatch} />
        <SiteFooter />
      </div>
    );
  }
}

SingleRecipe.propTypes = {
  dispatch: PropTypes.func.isRequired,

  ...recipePropTypes,

  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }).isRequired,

  notification: PropTypes.string.isRequired
};

const mapStateToProps = ({
  recipe,
  isFetching,
  auth,
  notification
}) => ({
  recipe,
  isFetching,
  notification,
  user: auth.user
});

export default connect(mapStateToProps)(SingleRecipe);
