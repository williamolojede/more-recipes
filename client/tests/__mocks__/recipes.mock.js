const recipesMock = {
  recipes: [
    {
      id: 2,
      name: 'Jollof Rice',
      description: 'It is simply better than ghanian jollof',
      img_url: 'http://www.africanbites.com/wp-content/uploads/2014/05/IMG_9677-2-1-150x150.jpg',
      ingredients: [
        'rice',
        'canola oil'
      ],
      instructions: [
        'Break up the clumpy rice before starting.',
        'Garnish with chopped scallion and serve'
      ],
      upVoteCount: 3,
      downVoteCount: 1,
      favoriteCount: 3,
      viewCount: 6,
      createdAt: '2017-10-23T08:08:47.566Z',
      updatedAt: '2018-01-16T10:02:13.814Z',
      owner: 2,
      User: {
        id: 2,
        username: null,
        fullname: 'example user'
      }
    },
    {
      id: 5,
      name: "Chef John's Spaghetti with Red Clam Sauce dfbefadb nifek fedckltefdkletfdmlefdleff eifdanlkref",
      description: "This is one of my 'go to' recipes and it takes only about 15 minutes from start to finish. The only prep work really is mashing the garlic. The sauce is great on any pasta, but I prefer angel hair or spaghetti.",
      img_url: 'http://images.media-allrecipes.com/userphotos/720x405/4478567.jpg',
      ingredients: [
        '2 tablespoons olive oil',
        '3 cloves garlic',
        '2 tablespoons capers',
        '1 tablespoon anchovy paste',
        '1 teaspoon red pepper flakes',
        '1 (24 ounce) jar tomato pasta sauce',
        '1/4 cup water',
        '1 cup good-quality crisp white wine',
        '2 (6.5 ounce) cans chopped clams, drained with juice reserved',
        'salt and pepper to taste',
        '1 pound dry spaghetti',
        '1/4 cup freshly grated Parmesan cheese',
        'Chopped fresh basil leaves or parsley'
      ],
      instructions: [
        'Pour olive oil into cold skillet. Add garlic, capers, anchovy paste, and red pepper flakes. Place over medium heat and cook and stir until the oil is infused with the flavors of the mixture, about 5 minutes, taking care not to brown the garlic. Add tomato',
        'Bring a large pot of lightly salted water to a boil. Cook spaghetti in the boiling water, stirring occasionally until almost al dente, or about 1 minute less than directed on package. Drain. Return pasta to the pot off heat.',
        'Stir clams into the sauce. Pour sauce over pasta. Stir; cover the pot to allow it to finish cooking off heat and to allow the pasta will absorb some of the sauce, about 3 minutes. Stir in Parmesan cheese. Top with chopped fresh basil and/or parsley.'
      ],
      upVoteCount: 1,
      downVoteCount: 1,
      favoriteCount: 1,
      viewCount: 2,
      createdAt: '2017-11-09T09:08:15.109Z',
      updatedAt: '2018-01-10T10:54:26.519Z',
      owner: 11,
      User: {
        id: 11,
        username: null,
        fullname: 'Email Mail'
      }
    },
    {
      id: 169,
      name: 'some random very delicious dish',
      description: 'This is the recipe for a very delicious dish',
      img_url: 'https://imgurlfordish.com/verydelicousdish.jpg',
      ingredients: [
        'ingredient 1',
        'ingredient 2'
      ],
      instructions: [
        'This is the first step in cooking this delicious dish',
        'This is the next step'
      ],
      upVoteCount: 1,
      downVoteCount: 0,
      favoriteCount: 0,
      viewCount: 2,
      createdAt: '2018-01-13T00:09:15.646Z',
      updatedAt: '2018-01-13T10:50:00.734Z',
      owner: 29,
      User: {
        id: 29,
        username: null,
        fullname: 'William Olojede'
      }
    },
    {
      id: 25,
      name: "Chef John's Spaghetti with Red Clam Sauce dfbefadb nifek fedckltefdkletfdmlefdleff eifdanlkref",
      description: "This is one of my 'go to' recipes ",
      img_url: 'http://images.media-allrecipes.com/userphotos/720x405/4478567.jpg',
      ingredients: [
        '2 tablespoons olive oil',
        '3 cloves garlic',
        '2 tablespoons capers',
        '1 tablespoon anchovy paste',
        '1 teaspoon red pepper flakes',
        '1 (24 ounce) jar tomato pasta sauce',
        '1/4 cup water',
        '1 cup good-quality crisp white wine',
        '2 (6.5 ounce) cans chopped clams, drained with juice reserved',
        'salt and pepper to taste',
        '1 pound dry spaghetti',
        '1/4 cup freshly grated Parmesan cheese',
        'Chopped fresh basil leaves or parsley'
      ],
      instructions: [
        'Pour olive oil into cold skillet. Add garlic, capers, anchovy paste, and red pepper flakes. Place over medium heat and cook and stir until the oil is infused with the flavors of the mixture, about 5 minutes, taking care not to brown the garlic. Add tomato',
        'Bring a large pot of lightly salted water to a boil. Cook spaghetti in the boiling water, stirring occasionally until almost al dente, or about 1 minute less than directed on package. Drain. Return pasta to the pot off heat.',
        'Stir clams into the sauce. Pour sauce over pasta. Stir; cover the pot to allow it to finish cooking off heat and to allow the pasta will absorb some of the sauce, about 3 minutes. Stir in Parmesan cheese. Top with chopped fresh basil and/or parsley.'
      ],
      upVoteCount: 1,
      downVoteCount: 0,
      favoriteCount: 1,
      viewCount: 2,
      createdAt: '2017-11-11T09:07:11.059Z',
      updatedAt: '2017-11-26T15:54:12.531Z',
      owner: 11,
      User: {
        id: 11,
        username: null,
        fullname: 'Email Mail'
      }
    },
    {
      id: 91,
      name: "Chef John's Spaghetti with Red Clam Sauce dfbefadb nifek fedckltefdkletfdmlefdleff eifdanlkref",
      description: "This is one of my 'go to' recipes ",
      img_url: 'http://images.media-allrecipes.com/userphotos/720x405/4478567.jpg',
      ingredients: [
        '2 tablespoons olive oil',
        '3 cloves garlic',
        '2 tablespoons capers',
        '1 tablespoon anchovy paste',
        '1 teaspoon red pepper flakes',
        '1 (24 ounce) jar tomato pasta sauce',
        '1/4 cup water',
        '1 cup good-quality crisp white wine',
        '2 (6.5 ounce) cans chopped clams, drained with juice reserved',
        'salt and pepper to taste',
        '1 pound dry spaghetti',
        '1/4 cup freshly grated Parmesan cheese',
        'Chopped fresh basil leaves or parsley'
      ],
      instructions: [
        'Pour olive oil into cold skillet. Add garlic, capers, anchovy paste, and red pepper flakes. Place over medium heat and cook and stir until the oil is infused with the flavors of the mixture, about 5 minutes, taking care not to brown the garlic. Add tomato',
        'Bring a large pot of lightly salted water to a boil. Cook spaghetti in the boiling water, stirring occasionally until almost al dente, or about 1 minute less than directed on package. Drain. Return pasta to the pot off heat.',
        'Stir clams into the sauce. Pour sauce over pasta. Stir; cover the pot to allow it to finish cooking off heat and to allow the pasta will absorb some of the sauce, about 3 minutes. Stir in Parmesan cheese. Top with chopped fresh basil and/or parsley.'
      ],
      upVoteCount: 1,
      downVoteCount: 0,
      favoriteCount: 1,
      viewCount: 1,
      createdAt: '2017-11-11T09:07:31.983Z',
      updatedAt: '2018-01-04T14:20:59.983Z',
      owner: 11,
      User: {
        id: 11,
        username: null,
        fullname: 'Email Mail'
      }
    },
    {
      id: 28,
      name: "Chef John's Spaghetti with Red Clam Sauce dfbefadb nifek fedckltefdkletfdmlefdleff eifdanlkref",
      description: "This is one of my 'go to' recipes ",
      img_url: 'http://images.media-allrecipes.com/userphotos/720x405/4478567.jpg',
      ingredients: [
        '2 tablespoons olive oil',
        '3 cloves garlic',
        '2 tablespoons capers',
        '1 tablespoon anchovy paste',
        '1 teaspoon red pepper flakes',
        '1 (24 ounce) jar tomato pasta sauce',
        '1/4 cup water',
        '1 cup good-quality crisp white wine',
        '2 (6.5 ounce) cans chopped clams, drained with juice reserved',
        'salt and pepper to taste',
        '1 pound dry spaghetti',
        '1/4 cup freshly grated Parmesan cheese',
        'Chopped fresh basil leaves or parsley'
      ],
      instructions: [
        'Pour olive oil into cold skillet. Add garlic, capers, anchovy paste, and red pepper flakes. Place over medium heat and cook and stir until the oil is infused with the flavors of the mixture, about 5 minutes, taking care not to brown the garlic. Add tomato',
        'Bring a large pot of lightly salted water to a boil. Cook spaghetti in the boiling water, stirring occasionally until almost al dente, or about 1 minute less than directed on package. Drain. Return pasta to the pot off heat.',
        'Stir clams into the sauce. Pour sauce over pasta. Stir; cover the pot to allow it to finish cooking off heat and to allow the pasta will absorb some of the sauce, about 3 minutes. Stir in Parmesan cheese. Top with chopped fresh basil and/or parsley.'
      ],
      upVoteCount: 0,
      downVoteCount: 0,
      favoriteCount: 0,
      viewCount: 1,
      createdAt: '2017-11-11T09:07:12.040Z',
      updatedAt: '2017-11-17T14:02:53.627Z',
      owner: 11,
      User: {
        id: 11,
        username: null,
        fullname: 'Email Mail'
      }
    }
  ],
  pagination: {
    pages: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24],
    totalCount: 139,
    pageSize: 6,
    page: 1,
    last: 24
  },
  message: 'success'
};

export const favoriteRecipes = () => {
  const buffer = [];
  for (let i = 0; i < recipesMock.recipes.length; i += 1) {
    buffer.push({ Recipe: recipesMock.recipes[i] });
  }
  return buffer;
};

export default recipesMock;
