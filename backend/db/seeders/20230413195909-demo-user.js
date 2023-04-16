'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        //add first name and last name
        firstName: 'Rich',
        lastName: 'Guy',
        email: 'demo@user.io',
        username: 'Rich-Guy',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        firstName: 'Aram',
        lastName: 'user',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        firstName: 'Ren',
        lastName: 'user',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      },
      {
        firstName: 'Bev',
        lastName: 'Cube',
        email: 'bev@user.io',
        username: 'FakeBev',
        hashedPassword: bcrypt.hashSync('password4')
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Rich-Guy', 'FakeUser1', 'FakeUser2', 'FakeBev'] }
    }, {});
  }
};
