const bcrypt = require('bcrypt');

module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Users', [
      {
        fullname: 'John Doe',
        password: bcrypt.hashSync('john_doe', 10),
        email: 'john_doe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'Janet Doe',
        password: bcrypt.hashSync('janet_doe', 10),
        email: 'janet_doe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'Paul Doe',
        password: bcrypt.hashSync('paul_doe', 10),
        email: 'paul_doe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        fullname: 'Paulina Doe',
        password: bcrypt.hashSync('paulina_doe', 10),
        email: 'paulina_doe@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Users', null, {})
};
