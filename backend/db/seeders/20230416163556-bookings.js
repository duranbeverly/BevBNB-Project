'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
    async up(queryInterface, Sequelize) {
        options.tableName = 'Bookings'
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
                userId: 3,
                startDate: new Date('2022-08-01'),
                endDate: new Date('2022-08-10')
            },
            {
                spotId: 2,
                userId: 4,
                startDate: new Date('2022-09-01'),
                endDate: new Date('2022-09-10')
            },
            {
                spotId: 3,
                userId: 1,
                startDate: new Date('2022-10-01'),
                endDate: new Date('2022-10-10')
            },
            {
                spotId: 2,
                userId: 3,
                startDate: new Date('2022-11-01'),
                endDate: new Date('2022-11-10')
            },
            {
                spotId: 1,
                userId: 2,
                startDate: new Date('2022-10-04'),
                endDate: new Date('2022-10-15')
            },
            {
                spotId: 3,
                userId: 1,
                startDate: new Date('2022-10-01'),
                endDate: new Date('2022-10-10')
            }

        ], {}) //should this be options object?
    },

    async down(queryInterface, Sequelize) {
        options.tableName = 'Bookings'
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        return queryInterface.bulkDelete(options, null, {}) //how should this delete look?

    }
};
