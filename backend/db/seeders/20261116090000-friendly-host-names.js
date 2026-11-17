'use strict';

// Listing pages say "Hosted by <first> <last>". The original seed names ("Rich Guy",
// "Aram user", "Ren user", "Bev Cube") read as placeholders, so give the sample hosts
// believable names. Usernames and logins (the demo button) don't change.

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

const NAMES = [
  ['Rich-Guy', 'Rich', 'Guy', 'Maya', 'Reyes'],
  ['FakeUser1', 'Aram', 'user', 'Aram', 'Petrosyan'],
  ['FakeUser2', 'Ren', 'user', 'Ren', 'Okafor'],
  ['FakeBev', 'Bev', 'Cube', 'Bev', 'Duran'],
];

module.exports = {
  async up(queryInterface) {
    const t = options.schema ? `"${options.schema}"."Users"` : '"Users"';
    for (const [username, , , first, last] of NAMES) {
      await queryInterface.sequelize.query(`UPDATE ${t} SET "firstName" = :first, "lastName" = :last WHERE username = :username`, { replacements: { first, last, username } });
    }
  },

  async down(queryInterface) {
    const t = options.schema ? `"${options.schema}"."Users"` : '"Users"';
    for (const [username, first, last] of NAMES) {
      await queryInterface.sequelize.query(`UPDATE ${t} SET "firstName" = :first, "lastName" = :last WHERE username = :username`, { replacements: { first, last, username } });
    }
  },
};
