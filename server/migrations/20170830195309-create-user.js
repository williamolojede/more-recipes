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
      defaultValue: 'username',
      validation: {
        max: 15,
      },
      type: Sequelize.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      validation: {
        isEmail: true,
      },
      type: Sequelize.STRING
    },
    fullname: {
      allowNull: false,
      validation: {
        max: 50,
        isAlpha: true,
      },
      type: Sequelize.STRING
    },
    password: {
      allowNull: false,
      validation: {
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
