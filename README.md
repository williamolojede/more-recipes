[![Build Status](https://travis-ci.org/williamolojede/more-recipes.svg?branch=dev)](https://travis-ci.org/williamolojede/more-recipes)
[![Coverage Status](https://coveralls.io/repos/github/williamolojede/more-recipes/badge.svg?branch=dev)](https://coveralls.io/github/williamolojede/more-recipes?branch=dev)
[![Code Climate](https://codeclimate.com/github/williamolojede/more-recipes/badges/gpa.svg)](https://codeclimate.com/github/williamolojede/more-recipes)
[![Issue Count](https://codeclimate.com/github/williamolojede/more-recipes/badges/issue_count.svg)](https://codeclimate.com/github/williamolojede/more-recipes)

# more-recipes
A RESTful API built for users to share their awesome and exciting recipes ideas they have learnt or have invented

### Technologies
-----

 1. Nodejs
 1. Postgresql
 1. Express
 1. Sequelize


## Endpoints
-----

**BASE_URL:** `https://more-recipes.herokuapp.com/api/v1/`

### RECIPES
- **`POST` /recipes**
  - Creates new recipe
- **`PUT` /recipes/:id**
  - Updates a recipe
- **`DELETE` /recipes/:id**
  - Deletes a recipe
- **`GET` /recipes**
  - Get all recipes
- **`POST` /recipes/:id/reviews**
  - Post new review for a recipe
- **`POST` /recipes/:id/favorite**
  - Favorite a recipe
- **`POST` /recipes/:id/vote-:dir**
  - Vote a recipe in `dir` {up or down}

### USERS

- **`GET` /users/:uid/recipes**
  - Returns all user's favorite recipes
- **`POST` /users/signin**
  - Creates a new user, returns user token
- **`POST` /users/login**
  - Logs in user, returns user token
