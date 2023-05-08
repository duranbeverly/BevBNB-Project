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
            },
            {
                spotId: 4,
                userId: 3,
                review: 'What a beautiful location! We loved the secluded feel and the ocean views. Highly recommend!',
                stars: 5
            },
            {
                spotId: 4,
                userId: 2,
                review: 'The treehouse was amazing! It was clean, cozy, and had all the amenities we needed. We will definitely be back.',
                stars: 4
            },
            {
                spotId: 4,
                userId: 1,
                review: 'The treehouse was beautiful but unfortunately we had some issues with the plumbing. The host was responsive and did their best to help us though.',
                stars: 3
            },
            {
                spotId: 5,
                userId: 4,
                review: 'This place was incredible! The views were amazing and the cabin was super cozy. Highly recommend.',
                stars: 5
            },
            {
                spotId: 5,
                userId: 3,
                review: 'The cabin was beautiful and clean, but the price was a bit steep for us.',
                stars: 3
            },
            {
                spotId: 5,
                userId: 2,
                review: 'The host was great and the cabin was beautiful! We loved the fireplace and the hot tub. Would definitely recommend.',
                stars: 4
            },
            {
                spotId: 6,
                userId: 1,
                review: 'The earth home was really unique and fun to stay in! The host was also super friendly and accommodating.',
                stars: 4
            },
            {
                spotId: 6,
                userId: 2,
                review: 'We loved our stay in the earth home! It was cozy and had all the amenities we needed. Would definitely recommend to others.',
                stars: 5
            },
            {
                spotId: 6,
                userId: 3,
                review: 'The earth home was great but we had some issues with the heating. The host was helpful and did their best to fix the problem though.',
                stars: 3
            },
            {
                spotId: 7,
                userId: 4,
                review: 'The tiny home was so cute and cozy! We loved the off-the-grid feel and the views were incredible.',
                stars: 5
            },
            {
                spotId: 7,
                userId: 2,
                review: 'The tiny home was great but we had some issues with the electricity. The host was responsive and did their best to help us though.',
                stars: 3
            },
            {
                spotId: 7,
                userId: 1,
                review: 'The host was really friendly and helpful, and the tiny home was adorable! Would definitely recommend to others.',
                stars: 4
            },
            {
                spotId: 8,
                userId: 3,
                review: 'The beach house was beautiful and had amazing views. The host was also really friendly and accommodating.',
                stars: 4
            },
            {
                spotId: 8,
                userId: 2,
                review: 'We loved our stay in the beach house! It was clean, spacious, and had all the amenities we needed. Would definitely recommend.',
                stars: 5
            },
            {
                spotId: 8,
                userId: 1,
                review: 'The beach house was nice but unfortunately we had some issues with the noise from the nearby construction. The host did their best to help us though.',
                stars: 3
            },
            {
                spotId: 9,
                userId: 2,
                review: 'This place is a hidden gem, surrounded by beautiful forests and nature. The house itself is cozy and well-equipped with everything you need. Highly recommend!',
                stars: 5
            },
            {
                spotId: 9,
                userId: 3,
                review: 'We had a great time at this cabin in the woods. The owner was very responsive and accommodating, and the location was perfect for hiking and exploring the nearby parks.',
                stars: 4
            },
            {
                spotId: 10,
                userId: 1,
                review: 'This beach house was amazing! The view was breathtaking and the house itself was well-decorated and comfortable. The owner was also very friendly and helpful.',
                stars: 5
            },
            {
                spotId: 10,
                userId: 3,
                review: 'The location of this beach house was unbeatable, right on the ocean. However, the house itself was a bit outdated and could use some upgrades.',
                stars: 3
            },
            {
                spotId: 11,
                userId: 1,
                review: 'This treehouse was such a unique and special experience. We loved being up in the trees and feeling like we were in our own little world. The owner was also very friendly and accommodating.',
                stars: 5
            },
            {
                spotId: 11,
                userId: 4,
                review: 'The treehouse was definitely a cool experience, but it was a bit smaller than we expected. The location was also pretty remote and difficult to get to.',
                stars: 3
            },
            {
                spotId: 12,
                userId: 2,
                review: 'This cabin was the perfect getaway for a peaceful and relaxing vacation. The owner was very responsive and the location was great for exploring the nearby parks and trails.',
                stars: 4
            },
            {
                spotId: 12,
                userId: 3,
                review: 'We had a great time at this cabin, but there were a few minor issues with cleanliness and maintenance. Overall, though, it was a lovely spot and we would recommend it to others.',
                stars: 3
            },
            {
                spotId: 13,
                userId: 1,
                review: 'This off-the-grid tiny home was a really cool experience. We loved being able to disconnect and get away from the world for a bit. The owner was also very friendly and accommodating.',
                stars: 4
            },
            {
                spotId: 13,
                userId: 2,
                review: 'We had a bit of trouble with some of the amenities at this tiny home, but the owner was very responsive and did their best to fix the issues. Overall, it was a fun and unique experience.',
                stars: 3
            },
            {
                spotId: 14,
                userId: 4,
                review: 'While the earth home was definitely unique, it was also pretty rustic and not as comfortable as we would have liked. The location was also a bit remote and hard to get to.',
                stars: 2
            },
            {
                spotId: 15,
                userId: 2,
                review: 'Loved the earth home. Great design and really unique experience. Would definitely recommend!',
                stars: 5
            },
            {
                spotId: 15,
                userId: 3,
                review: 'The location was perfect and the earth home was lovely. The only downside was that the hot tub was not working during our stay.',
                stars: 4
            },
            {
                spotId: 15,
                userId: 4,
                review: 'The earth home was really interesting and fun to stay in. Loved the views and the surrounding nature.',
                stars: 4
            },
            {
                spotId: 16,
                userId: 3,
                review: 'The off the grid tiny home was a great experience. Loved being so close to nature and the unique design of the home.',
                stars: 5
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
