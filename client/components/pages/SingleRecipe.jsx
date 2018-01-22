/* eslint camelcase: 0 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import {
  fetchSingleRecipe,
  vote,
  favorite,
  resetSingleRecipe
} from '../../actions/recipe';


import Preloader from '../shared/Preloader.jsx';
import ConnectedSiteNav from '../shared/SiteNav.jsx';
import SiteFooter from '../shared/SiteFooter.jsx';
import IngredientsList from '../shared/IngredientsList.jsx';
import InstructionsList from '../shared/InstructionsList.jsx';
import Reviews from '../shared/Reviews';
import RecipeStats from '../shared/RecipeStats.jsx';
import Notification from '../shared/Notification.jsx';

import { recipePropTypes, currentUserPropTypes } from '../../config/proptypes';

class SingleRecipe extends Component {
  componentDidMount() {
    this.props.dispatch(fetchSingleRecipe(this.props.match.params.id));
  }

  componentWillUnmount() {
    this.props.dispatch(resetSingleRecipe());
  }

  vote = (dir) => {
    this.props.dispatch(vote(dir, this.props.recipe.id));
  }

  favorite = () => {
    this.props.dispatch(favorite(this.props.recipe.id));
  }

  renderBody = () => {
    const { isFetching } = this.props;
    const {
      name,
      description,
      img_url,
      ingredients,
      instructions,
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

    // the default value of recipe.name => ''
    // which means the recipe hasnt been received yet
    if (isFetching && this.props.recipe.name === '') {
      return (<Preloader />);
    } else if (this.props.errorMessage) {
      return (
        <div className="recipe-not-found">
          <h1>
            <span role="img" aria-label="sad">😢</span> Recipe Not Found
          </h1>
        </div>
      );
    }

    return (
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
          {
            name !== '' && <Reviews recipeId={parseInt(this.props.match.params.id, 10)} />
          }
        </div>
      </main>
    );
  };

  render() {
    return (
      <div className="page page__recipe">
        <header className="site-header">
          <ConnectedSiteNav currentUser={this.props.currentUser} />
        </header>
        {
          this.renderBody()
        }
        <Notification notification={this.props.notification} dispatch={this.props.dispatch} />
        <SiteFooter />
      </div>
    );
  }
}

SingleRecipe.propTypes = {
  dispatch: PropTypes.func.isRequired,

  ...recipePropTypes,
  ...currentUserPropTypes,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }).isRequired,

  notification: PropTypes.string.isRequired
};

export const mapStateToProps = ({
  singleRecipe: { recipe, errorMessage },
  isFetching,
  auth: { currentUser },
  notification
}) => ({
  recipe,
  errorMessage,
  isFetching,
  notification,
  currentUser,
});

export { SingleRecipe as PureSingleRecipe };
export default connect(mapStateToProps)(SingleRecipe);
