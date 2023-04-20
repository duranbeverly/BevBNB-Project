'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        options.tableName = 'Reviews'
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
                spotId: 1, //the dome treehouse
                userId: 4,
                review: 'Absolutely beautiful inside and out, responsive host, loved it there',
                stars: 5
            },
            {
                spotId: 2,//the waterfall bungalow
                userId: 3,
                review: ' Very unique home and great location. Would like to visit again but higher price will delay that a bit.',
                stars: 4
            },
            {
                spotId: 3, //the adobe house in NM
                userId: 1,
                review: 'As a host myself it could have been much better. Didn"t get free champagne with my breakfast',
                stars: 2
            },
            {
                spotId: 3, //the adobe house in NM
                userId: 4,
                review: ' This was so cute! Great weekend getaway and true to the culture of NM.',
                stars: 5
            },
            {
                spotId: 1, //the dome treehouse
                userId: 2,
                review: 'The host was awful.This guy clearly only cares about money',
                stars: 1
            }

        ], {})
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Reviews'
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete(options, null, {})
    }
};
