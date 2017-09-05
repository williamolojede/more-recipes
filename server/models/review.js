module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    content: DataTypes.STRING
  });

  Review.associate = (models) => {
    Review.belongsTo(models.Recipe, {
      foreignKey: 'recipeId',
      onDelete: 'CASCADE',
    });
    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };

  return Review;
};
