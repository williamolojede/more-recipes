module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Users', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    username: {
      allowNull: true,
      unique: true,
      validate: {
        max: 15,
      },
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
      type: Sequelize.STRING
    },
    fullname: {
      allowNull: false,
      validate: {
        max: 50,
      },
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      validate: {
        min: 6,
      },
      type: Sequelize.STRING
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),

  down: queryInterface => queryInterface.dropTable('Users')
};
