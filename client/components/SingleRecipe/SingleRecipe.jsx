import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchSingleRecipes, vote, favorite } from '../../actions/fetchRecipe';

import Preloader from '../shared/Preloader.jsx';
import SiteNav from '../shared/SiteNav.jsx';
import SiteFooter from '../shared/SiteFooter.jsx';
import IngredientsList from '../shared/IngredientsList.jsx';
import InstructionsList from '../shared/InstructionsList.jsx';
import Reviews from '../shared/Reviews/Reviews.jsx';
import RecipeStats from '../shared/RecipeStats.jsx';

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
    if (Object.keys(this.props.recipe).length === 0) return null;

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
      this.props.isFetching ?
        <Preloader />
        :
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
          <SiteFooter />
        </div>
    );
  }
}

SingleRecipe.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,

  recipe: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    img_url: PropTypes.string.isRequired,
    ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
    instructions: PropTypes.arrayOf(PropTypes.string).isRequired,
    reviews: PropTypes.arrayOf(PropTypes.object).isRequired,
    upVoteCount: PropTypes.number.isRequired,
    downVoteCount: PropTypes.number.isRequired,
    favoriteCount: PropTypes.number.isRequired,
    viewCount: PropTypes.number.isRequired
  }).isRequired,

  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fullname: PropTypes.string.isRequired,
  }).isRequired,

  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  }).isRequired,
};

const mapStateToProps = ({ recipe, isFetching, auth }) => ({
  recipe,
  isFetching,
  user: auth.user
});

export default connect(mapStateToProps)(SingleRecipe);
