import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      viewCount,
      User
    } = this.props.recipe;

    const stats = {
      upVoteCount,
      downVoteCount,
      favoriteCount,
      viewCount
    };

    if (Object.keys(this.props.recipe).length === 0) return null;

    return (
      this.props.isFetching ?
        <Preloader />
        :
        <div className="page page__recipe">
          <header className="site-header">
            <SiteNav />
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
                </div>
              </div>
              <div className="row recipe__stats">
                <RecipeStats stats={stats} vote={this.vote} favorite={this.favorite} />
                <a href="#write-review" className="write-review">
                  Write Review
                </a>
              </div>
              <div className="row">
                <IngredientsList ingredients={ingredients} />
                <div className="hide-on-small-only col m1" />
                <InstructionsList instructions={instructions} />
              </div>
              <Reviews reviews={reviews} user={this.props.user} id={id} />
            </div>
          </main>
          <SiteFooter />
        </div>
    );
  }
}

const mapStateToProps = ({ recipe, isFetching, auth }) => ({
  recipe,
  isFetching,
  user: auth.user
});

export default connect(mapStateToProps)(SingleRecipe);
