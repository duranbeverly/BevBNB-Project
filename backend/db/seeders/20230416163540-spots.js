'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '260 Chisholm Way',
        city: 'Alma',
        state: 'Colorado',
        country: 'United States',
        lat: 39.257440,
        lng: 106.070320,
        name: 'Dome Treehouse',
        description: 'Get away from it all in an authentic 1970"s Colorado A-Frame cabin next to a private running stream.',
        price: 235
      },
      {
        ownerId: 1,
        address: '32 Hope Dr',
        city: 'Palm Springs',
        state: 'California',
        country: 'United States',
        lat: 33.754219,
        lng: 116.408089,
        name: 'Waterfall Bungalow',
        description: 'Relax to the sound of waterfalls, lounge in the covered patio, in the sun, or in one of our 7 outdoor seating areas.',
        price: 850
      },
      {
        ownerId: 2,
        address: '416 Geronimo Ln',
        city: 'Taos',
        state: 'New Mexico',
        country: 'United States',
        lat: 36.408410,
        lng: 105.583280,
        name: 'Adobe Luxury Estate',
        description: 'Spectacular 6700 square foot home with two kitchens, 5 bedrooms, 4 bathrooms, pool, spa, sauna',
        price: 600
      }

    ], {}) //should this be the options object?
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots'
    // const Op = Sequelize.Op
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options, null, {}) //how should this delete look?
  }
};
