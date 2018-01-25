

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Favorites', [
      {
        userId: 1,
        recipeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Favorites', null, {})
};
