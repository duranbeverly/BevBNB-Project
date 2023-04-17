'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        options.tableName = 'ReviewImages'
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
                reviewId: 1,
                url: 'https://unsplash.com/photos/dUPfhP18dPI'
            },
            {
                reviewId: 2,
                url: 'https://unsplash.com/photos/DI5eFSYszy0'
            },
            {
                reviewId: 3,
                url: 'https://unsplash.com/photos/2AczZCEfIpo '
            }

        ])
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'ReviewImages'
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete(options, null, {})
    }
};
