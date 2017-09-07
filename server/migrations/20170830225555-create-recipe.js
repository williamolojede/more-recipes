module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Recipes', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    description: {
      allowNull: false,
      type: Sequelize.TEXT
    },
    img_url: {
      allowNull: true,
      defaultValue: 'no-img',
      type: Sequelize.STRING
    },
    ingredients: {
      type: Sequelize.ARRAY(Sequelize.TEXT)
    },
    instructions: {
      type: Sequelize.ARRAY(Sequelize.STRING)
    },
    upVoteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    downVoteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    favoriteCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    viewCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    owner: {
      type: Sequelize.INTEGER,
      onDelete: 'CASCADE',
      references: {
        model: 'Users',
        key: 'id',
        as: 'owner',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('Recipes')
};
