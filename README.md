[![Build Status](https://travis-ci.org/williamolojede/more-recipes.svg?branch=dev)](https://travis-ci.org/williamolojede/more-recipes)
[![Coverage Status](https://coveralls.io/repos/github/williamolojede/more-recipes/badge.svg?branch=dev)](https://coveralls.io/github/williamolojede/more-recipes?branch=dev)
[![Code Climate](https://codeclimate.com/github/williamolojede/more-recipes/badges/gpa.svg)](https://codeclimate.com/github/williamolojede/more-recipes)
[![Issue Count](https://codeclimate.com/github/williamolojede/more-recipes/badges/issue_count.svg)](https://codeclimate.com/github/williamolojede/more-recipes)

# more-recipes
A Full-Stack web application built for users to share their awesome and exciting recipes ideas they have learnt or have invented

### Technologies
-----

 1. [Nodejs](https://nodejs.org/en/)
 1. [Postgresql](https://www.postgresql.org/)
 1. [Express](https://expressjs.com/)
 1. [Sequelize](http://docs.sequelizejs.com/)
 1. [React](https://reactjs.org/)
 1. [Redux](https://redux.js.org/)


## API Documentation
 The full documentation for all api end point can be found [here](https://more-recipes.herokuapp.com/api/docs)

## Functionalities
___
Users are grouped into two categories registered users and non registered user, functionalities for each category are listed below

### Non registered Users
* Create an account
* Sign in as a user

### Registered Users
* View Recipes
* Create New recipe
* Update created recipes
* Delete recipe created
* Add recipes to their favorites list
* Upvote a recipe
* downvote a recipe
* Review a recipe
* Update profile

## Limitations
---
This project has some limitations. The most notable ones are:

1. Users can not view other user's profile or see their personal/favorite recipe list.
2. Users can not change their password or reset it if forgotten.
3. Users cannot deactivate their accounts
4. Users need to obtain authentication token every 2 hours.
5. Only authenticated users are allowed to use the app 

## How to Install
___

1. Clone the repo and enter directory 
```sh
git clone git@github.com:williamolojede/more-recipes.git && cd more-recipes
```
2. Install the project's dependecies
```sh
npm install
```
3. Create `.env` file and copy content of `.env.sample` to it and provide the appropriate values
```sh
cp .env.sample .env
```
4. Take a look at [config.json](https://github.com/williamolojede/more-recipes/blob/dev/server/config/config.json) and read [this](https://www.codementor.io/engineerapart/getting-started-with-postgresql-on-mac-osx-are8jcopb) to setup postgres/sequelize to create a db then run migration
```sh
npm run migrate
```
5. Finally, start the server
```sh
npm run start:dev
```

## Demo
___

View the web client live [here](https://more-recipes.herokuapp.com/)

## Test
___

This app uses the following for testing:
* For Backend testing run `npm run test:server:dev`.
* For frontend testing run `npm run test:client`
* For end-to-end test run `npm run test:e2e`


## Contributing to the project
___
* Fork this repository to your github account
* Clone the repository -  `git clone https://github.com/{your_username_goes_here}/dman.git`
* Create your feature branch - `git checkout -b {feature, chore or bug}-short_feature_desscription`
* Commit your changes - `git commit -m “{commit_message_goes_here}“` or `git commit` for the interactive interface
* Push to the remote branch - `git push origin {your_branch_name_as_described_above}`
* Open a pull request 

## FAQ
___
> What language was used to develop this application?
```
This is a full stack javascript application
```
> Who can contribute?
```
Anyone!
```

## Author
___
William Olojede([@williamolojede](https://twitter.com/williamolojede) &mdash; [william.ng](http://william.ng)) 

## License
___
This is licensed for your use, modification and distribution under the [MIT license](https://github.com/williamolojede/more-recipes/blob/dev/LICENSE).
