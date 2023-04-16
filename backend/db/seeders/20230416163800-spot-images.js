'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        options.tableName = 'SpotImages'
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
                spotId: 1,
                url: 'https://unsplash.com/photos/BwITbaWSPjk',
                preview: true
            },
            {
                spotId: 2,
                url: 'https://unsplash.com/photos/y3_AHHrxUBY',
                preview: true
            },
            {
                spotId: 3,
                url: 'https://unsplash.com/photos/WJDR8_QxVR8',
                preview: true
            },
        ], {})
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'SpotImages'
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete(options, null, {})
    }
};
