module.exports = (sequelize) => {
  const Favorite = sequelize.define('Favorite', {});

  Favorite.associate = (models) => {
    Favorite.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Favorite.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Favorite;
};
