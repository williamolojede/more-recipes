module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Recipes', [
      {
        name: 'Hot Chicken Casserole user1v1',
        description: 'A warm, flavor-filled dish that can be prepared far in advance. A good pick for large groups, or small dish that\'s not too heavy of a dinner. It can also be varied in several ways. This dish does not need to be cooked and can be served cold.',
        img_url: 'http://allrecipes.com/recipe/255239/hot-chicken-casserole/photos/3982379/',
        ingredients: [
          '2 cups diced cooked chicken',
          '1 cup mayonnaise',
          '1 cup chopped celery',
          '1 (8 ounce) can sliced water chestnuts',
          '1/2 cup slivered toasted almonds',
          '1 (2 ounce) jar chopped pimento peppers',
          '1 tablespoon dried minced onion'
        ],
        instructions: [
          'Preheat oven to 350 degrees F (175 degrees C).',
          'Combine chicken, mayonnaise, celery, water chestnuts, almonds, pimento peppers, dried onion, lemon juice, salt, and pepper in a 2-quart casserole dish. Top with Cheddar cheese and French fried onions.',
          'Bake in the preheated oven until hot and bubbly, about 30 minutes.'
        ],
        owner: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hot Chicken Casserole',
        description: 'A warm, flavor-filled dish that can be prepared far in advance. A good pick for large groups, or small dish that\'s not too heavy of a dinner. It can also be varied in several ways. This dish does not need to be cooked and can be served cold.',
        img_url: 'http://allrecipes.com/recipe/255239/hot-chicken-casserole/photos/3982379/',
        ingredients: [
          '2 cups diced cooked chicken',
          '1 cup mayonnaise',
          '1 cup chopped celery',
          '1 (8 ounce) can sliced water chestnuts',
          '1/2 cup slivered toasted almonds',
          '1 (2 ounce) jar chopped pimento peppers',
          '1 tablespoon dried minced onion'
        ],
        instructions: [
          'Preheat oven to 350 degrees F (175 degrees C).',
          'Combine chicken, mayonnaise, celery, water chestnuts, almonds, pimento peppers, dried onion, lemon juice, salt, and pepper in a 2-quart casserole dish. Top with Cheddar cheese and French fried onions.',
          'Bake in the preheated oven until hot and bubbly, about 30 minutes.'
        ],
        owner: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hot Chicken Casserole user1v2',
        description: 'A warm, flavor-filled dish that can be prepared far in advance. A good pick for large groups, or small dish that\'s not too heavy of a dinner. It can also be varied in several ways. This dish does not need to be cooked and can be served cold.',
        img_url: 'http://allrecipes.com/recipe/255239/hot-chicken-casserole/photos/3982379/',
        ingredients: [
          '2 cups diced cooked chicken',
          '1 cup mayonnaise',
          '1 cup chopped celery',
          '1 (8 ounce) can sliced water chestnuts',
          '1/2 cup slivered toasted almonds',
          '1 (2 ounce) jar chopped pimento peppers',
          '1 tablespoon dried minced onion'
        ],
        instructions: [
          'Preheat oven to 350 degrees F (175 degrees C).',
          'Combine chicken, mayonnaise, celery, water chestnuts, almonds, pimento peppers, dried onion, lemon juice, salt, and pepper in a 2-quart casserole dish. Top with Cheddar cheese and French fried onions.',
          'Bake in the preheated oven until hot and bubbly, about 30 minutes.'
        ],
        owner: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Hot Chicken Casserole',
        description: 'A warm, flavor-filled dish that can be prepared far in advance. A good pick for large groups, or small dish that\'s not too heavy of a dinner. It can also be varied in several ways. This dish does not need to be cooked and can be served cold.',
        img_url: 'http://allrecipes.com/recipe/255239/hot-chicken-casserole/photos/3982379/',
        ingredients: [
          '2 cups diced cooked chicken',
          '1 cup mayonnaise',
          '1 cup chopped celery',
          '1 (8 ounce) can sliced water chestnuts',
          '1/2 cup slivered toasted almonds',
          '1 (2 ounce) jar chopped pimento peppers',
          '1 tablespoon dried minced onion'
        ],
        instructions: [
          'Preheat oven to 350 degrees F (175 degrees C).',
          'Combine chicken, mayonnaise, celery, water chestnuts, almonds, pimento peppers, dried onion, lemon juice, salt, and pepper in a 2-quart casserole dish. Top with Cheddar cheese and French fried onions.',
          'Bake in the preheated oven until hot and bubbly, about 30 minutes.'
        ],
        owner: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Recipes', null, {})
};
