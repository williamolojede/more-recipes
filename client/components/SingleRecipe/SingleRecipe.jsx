import React, { Component } from 'react';

import SiteNav from '../shared/SiteNav.jsx';
import SiteFooter from '../shared/SiteFooter.jsx';
import IngredientsList from '../shared/IngredientsList.jsx';
import InstructionsList from '../shared/InstructionsList.jsx';
import Reviews from '../shared/Reviews/Reviews.jsx';
import RecipeStats from '../shared/RecipeStats.jsx';

class SingleRecipe extends Component {
  render() {
    return (
      <div className="page page__recipe">
        <header className="site-header">
          <SiteNav />
        </header>
        <main>
          <div className="container">
            <div className="row">
              <div className="col s12 m5">
                <img src="https://fthmb.tqn.com/4P30MYPyJYr0fxlkBuHmNZg4NO8=/960x0/filters:no_upscale()/about/3167488129_cc7a303896_o-58a6fe3b5f9b58a3c91bf559.jpg" alt="pancake" />
              </div>
              <div className="col s12 m7">
                <h4 className="recipe__name">Pancake</h4>
                <p className="recipe__description">Who knew that ricotta cheese could make a basic pancake recipe so elevated and chic? These pancakes are sweet, beautiful, and deliciously fluffy.  It's all about the simple and perfect ingredients!  Fresh eggs, in season blueberries, and buying a really nice ricotta cheese make for an amazing dish ( I feel like Ina, when I say that ).  Add in some fresh lemon zest and you've got zesty, sweet, decadent pancakes!</p>
              </div>
            </div>
            <div className="row recipe__stats">
              <RecipeStats />
            </div>
            <div className="row">
              <IngredientsList />
              <div className="hide-on-small-only col m1" />
              <InstructionsList />
            </div>
            <Reviews />
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }
}

export default SingleRecipe;
