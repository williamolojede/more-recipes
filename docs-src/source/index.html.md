---
title: API Reference

language_tabs: # must be one of https://git.io/vQNgJ
  - javascript

toc_footers:
  - <a href='#'>Sign Up for a Developer Key</a>
  - <a href='https://github.com/tripit/slate'>Documentation Powered by Slate</a>

includes:
  - errors

search: true
---

# Overview - MoreRecipes API

Welcome to the MoreRecipes API documentation. This is the API used by the MoreRecipes web interface, so everything the web ui is able to do can also be accomplished via the API.

This API provides the means for you to share, view and manage your recipes and those of others.

**`base URI`** is **https://more-recipes.herokuapp.com/api/v1/**

# Making Requests

An authorization token is required to access all endpoints except the signup and Login endpoints. Use the login/signup endpoint to get a token

A token generated expires 48 hours after it has being generated.

The token can be placed in `req.headers`, `req.body` or `req.query` 

`token: averylongrandom.jsonwebtokenstring.requiredforauthentication`

<aside class="notice">
You must replace <code>averylongrandom.jsonwebtokenstring.requiredforauthentication</code> with your personal auth token.
</aside>


# User

## User signup
> Request Body

```json
  {
    "user": {
      "fullname": "William Olojede",
      "email": "william@olojede.com",
      "password": "password"
    }
  }
```

> Response Body

```json
  {
    "status": "success",
    "message": "account created",
    "user": {
        "id": 2,
        "email": "william@olojede.com",
        "fullname": "William Olojede",
        "updatedAt": "2017-09-17T23:21:18.057Z",
        "createdAt": "2017-09-17T23:21:18.057Z",
        "username": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsImlhdCI6MTUwNTY5MDQ3OCwiZXhwIjoxNTA1ODYzMjc4fQ.qT1Ra_sgJYrtYhM--OKh0_8hLbaZnhmqCNRaRLMJNl8"
  }
```

Create a new user

### Request
  - Endpoint: `/users/signin`
  - Verb: `POST`
  - Body: `(application/json)`

### Response
  - StatusCode: `201: Created`
  - Body: `(application/json)`

## User login

> Request Body

```json
  {
    "auth": {
      "email": "william@olojede.com",
      "password": "password"
    }
  }
```

> Response Body

```json
  {
    "status": "success",
    "user": {
        "id": 2,
        "email": "william@olojede.com",
        "fullname": "William Olojede",
        "updatedAt": "2017-09-17T23:21:18.057Z",
        "createdAt": "2017-09-17T23:21:18.057Z",
        "username": null
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOjIsImlhdCI6MTUwNTY5MTI3NCwiZXhwIjoxNTA1ODY0MDc0fQ.V1eGfJiKAzmhCUYID4piatU-FGq4XsShutTb3VMVP2s"
  }
```

Logs in user

### Request
  - Endpoint: `/users/login`
  - Verb: `POST`
  - Body: `(application/json)`

### Response
  - StatusCode: `200: Ok`
  - Body: `(application/json)`

## User detail 
  No endpoint available yet to get a user's detail

## User detail update
  No endpoint available yet to update a user's detail

## User Favorites

> Response Body

```json
  {
    "status": "success",
    "recipes": [
      {
        "id": 1,
        "name": "very delicious dish",
        "description": "This is the recipe for a very delicious dish",
        "img_url": "https://imgurlfordish.com/verydelicousdish.jpg",
        "ingredients": [
          "ingredient 1",
          "ingredient 2",
          ...
        ],
        "instructions": [
          "This is the first step in cooking this delicious dish",
          "This is the next step",
          ...
        ],
        "upVoteCount": 0,
        "downVoteCount": 0,
        "favoriteCount": 1,
        "viewCount": 0,
        "createdAt": "2017-09-17T07:52:15.103Z",
        "updatedAt": "2017-09-18T23:16:21.324Z",
        "owner": 1
      }
    ],
    "message": "1 recipe(s) found in user's favorite list"
  }
```

### Request
  - Endpoint: `/users/:uid/recipes`
  - Verb: `GET`
  - Requires: token

### Response
  - StatusCode: `200: Ok`
  - Body: `(application/json)`


# Recipes

## Create Recipe
> Request Body

```json
  {
    "recipe": {
      "name": "very delicious dish",
      "description": "This is the recipe for a very delicious dish",
      "img_url": "https://imgurlfordish.com/verydelicousdish.jpg",
      "ingredients": [
        "ingredient 1",
        "ingredient 2"
      ],
      "instructions": [
        "This is the first step in cooking this delicious dish",
        "This is the next step"
      ]
    }
  }
```

> Response Body

```json
  {
    "recipe": {
      "upVoteCount": 0,
      "downVoteCount": 0,
      "favoriteCount": 0,
      "viewCount": 0,
      "id": 4,
      "name": "very delicious dish",
      "description": "This is the recipe for a very delicious dish",
      "img_url": "https://imgurlfordish.com/verydelicousdish.jpg",
      "ingredients": [
          "ingredient 1",
          "ingredient 2"
      ],
      "instructions": [
          "This is the first step in cooking this delicious dish",
          "This is the next step"
      ],
      "owner": 2,
      "updatedAt": "2017-09-19T00:01:20.221Z",
      "createdAt": "2017-09-19T00:01:20.221Z"
    },
    "message": "recipe created successfully",
    "status": "success"
  }
```

Creates a new recipe

### Request
  - Endpoint: `/recipes`
  - Verb: `POST`
  - Requires: token

### Response
  - StatusCode: `201: Created`
  - Body: `(application/json)`

## Modify Recipe
> Request Body

```json
  {
    "update": {
      "name": "very distasteful dish"
    }
  }
```

> Response Body

```json
  {
    "message": "success",
    "recipe": {
      "id": 4,
      "name": "very distasteful dish",
      "description": "This is the recipe for a very delicious dish",
      "img_url": "https://imgurlfordish.com/verydelicousdish.jpg",
      ...
      "createdAt": "2017-09-19T00:01:20.221Z",
      "updatedAt": "2017-09-19T00:13:27.991Z",
      "owner": 2
    }
  }
```

### Request
  - Endpoint: `/recipes/:id`
  - Verb: `PUT`
  - Requires: token
  - Must be owner

### Response
  - StatusCode: `200: Ok`
  - Body: `(application/json)`