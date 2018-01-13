import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  Switch,
  Route,
  Redirect,
  NavLink
} from 'react-router-dom';

import { recipePropTypes, currentUserPropTypes } from '../../config/proptypes';
import fetchUserProfile, { removeRecipeFromUserProfile, deletePersonalRecipe } from '../../actions/userProfile';
import { favorite } from '../../actions/recipe';

import { RECIEVE_USER_PROFILE } from '../../actions/types';
import ConnectedSiteNav from '../shared/SiteNav.jsx';
import Preloader from '../shared/Preloader.jsx';
import AddRecipeForm from './AddRecipeForm.jsx';
import PersonalRecipes from './PersonalRecipes.jsx';
import FavoriteRecipes from './FavoriteRecipes.jsx';
import Notification from '../shared/Notification.jsx';

class Profile extends Component {
  componentDidMount() {
    this.props.dispatch(fetchUserProfile(this.props.match.params.uid, RECIEVE_USER_PROFILE));
  }

  removeRecipe = (e, id, type, index) => {
    e.preventDefault();
    switch (type) {
      case 'favorites':
        this.props.dispatch(favorite(id))
          .then(() => {
            this.props.dispatch(removeRecipeFromUserProfile(index, type));
          });
        break;
      case 'personal-recipes':
        this.props.dispatch(deletePersonalRecipe(id, index));
        break;
      default:
    }
  }

  render() {
    // Handles when a uid is not a number
    const uid = parseInt(this.props.match.params.uid, 10);
    if (!uid) {
      return (
        <Redirect to="/" />
      );
    }

    if (Object.keys(this.props.userProfile).length === 0) return null;

    const { currentUser } = this.props;
    const userUrl = `/user/${uid}`;

    const {
      fullname,
      email,
      recipes,
      favorites
    } = this.props.userProfile.user;
    const { asOwner } = this.props.userProfile;
    const tabClassName = `tab col ${asOwner ? 's4' : 's6'}`;

    return (
      this.props.isFetching ?
        <Preloader />
        :
        <div className="page page__profile">
          <header className="site-header">
            <ConnectedSiteNav currentUser={currentUser} />
          </header>
          <main>
            <div className="container">
              <section className="profile__details">
                <h3>Profile</h3>
                <label htmlFor="fullname">
                  Name
                  <input type="text" id="fullname" value={fullname} disabled />
                </label>
                <label htmlFor="email">
                  Email
                  <input type="text" id="email" value={email} disabled />
                </label>
              </section>
              <section className="profile__actions">
                <div className="row">
                  <h3>Recipes</h3>
                  <div>
                    <ul className="tabs z-depth-1">
                      {
                        asOwner ?
                          <li className="tab col s4">
                            <NavLink
                              to={`${userUrl}/add`}
                              activeClassName="active"
                            >
                              Add
                            </NavLink>
                          </li>
                          :
                          null
                      }
                      <li className={tabClassName}>
                        <NavLink to={`${userUrl}/recipes`} activeClassName="active">
                          {
                            asOwner ? 'Personal Recipes' : 'User\'s Recipes'
                          }
                        </NavLink>
                      </li>
                      <li className={tabClassName}>
                        <NavLink to={`${userUrl}/favorites`} activeClassName="active">Favorites</NavLink>
                      </li>
                    </ul>
                  </div>
                  <Switch>
                    <Route
                      path="/user/:uid/add"
                      component={() => (
                        <AddRecipeForm
                          asOwner={asOwner}
                          isEditMode={false}
                        />)
                      }
                    />
                    <Route
                      path="/user/:uid/modify-recipe"
                      component={() => (
                        <AddRecipeForm
                          asOwner={asOwner}
                          isEditMode
                          recipe={this.props.location.state.recipe}
                          recipeIndex={this.props.location.state.index}
                        />)
                      }
                    />
                    <Route
                      exact
                      path="/user/:uid/recipes"
                      component={() => (
                        <PersonalRecipes
                          personalRecipes={recipes}
                          asOwner={asOwner}
                          removeRecipe={this.removeRecipe}
                        />)
                      }
                    />
                    <Route
                      exact
                      path="/user/:uid/favorites"
                      component={() => (
                        <FavoriteRecipes
                          favoriteRecipes={favorites}
                          asOwner={asOwner}
                          removeRecipe={this.removeRecipe}
                        />)
                      }
                    />
                  </Switch>
                </div>
              </section>
              <Notification notification={this.props.notification} dispatch={this.props.dispatch} />
            </div>
          </main>
        </div>
    );
  }
}

Profile.propTypes = {
  ...currentUserPropTypes,

  match: PropTypes.shape({
    params: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    })
  }).isRequired,

  userProfile: PropTypes.shape({
    user: PropTypes.shape({
      fullname: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      recipes: PropTypes.arrayOf(PropTypes.object).isRequired,
      favorites: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    asOwner: PropTypes.bool.isRequired,
  }).isRequired,

  location: PropTypes.shape({
    state: PropTypes.shape({
      ...recipePropTypes,
      index: PropTypes.number.isRequired
    })
  }).isRequired,

  isFetching: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  notification: PropTypes.string.isRequired
};

const mapStateToProps = ({
  isFetching,
  auth: { currentUser },
  userProfile,
  notification
}) => ({
  currentUser,
  isFetching,
  userProfile,
  notification
});

export default connect(mapStateToProps)(Profile);
