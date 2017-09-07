module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipe', {
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    img_url: {
      allowNull: true,
      defaultValue: 'no-img',
      type: DataTypes.STRING
    },
    ingredients: {
      type: DataTypes.ARRAY(DataTypes.TEXT)
    },
    instructions: {
      type: DataTypes.ARRAY(DataTypes.STRING)
    },
    upVoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    downVoteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    favoriteCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    viewCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });
  Recipe.associate = (models) => {
    Recipe.belongsTo(models.User, {
      foreignKey: 'owner',
      onDelete: 'CASCADE',
    });

    Recipe.hasMany(models.Vote, {
      foreignKey: 'recipeId',
      as: 'votes',
    });

    Recipe.hasMany(models.Favorite, {
      foreignKey: 'recipeId',
      as: 'favorites',
    });

    Recipe.hasMany(models.Review, {
      foreignKey: 'recipeId',
      as: 'reviews',
    });
  };
  return Recipe;
};
