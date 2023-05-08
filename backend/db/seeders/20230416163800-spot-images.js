'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
    options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
                spotId: 1,
                url: 'https://unsplash.com/photos/14GPEHuhl38',
                preview: false
            },
            {
                spotId: 1,
                url: 'https://unsplash.com/photos/O3zdTFCnHcg',
                preview: false
            },
            {
                spotId: 1,
                url: 'https://unsplash.com/photos/Us2KDzmnUCo',
                preview: false
            },
            {
                spotId: 1,
                url: 'https://unsplash.com/photos/7EqQ1s3wIAI',
                preview: false
            },
            {
                spotId: 1,
                url: 'https://unsplash.com/photos/MDteiLH1CZY',
                preview: false
            },
            {
                spotId: 2,
                url: 'https://unsplash.com/photos/y3_AHHrxUBY',
                preview: true
            },
            {
                spotId: 2,
                url: 'https://unsplash.com/photos/waAAaeC9hns',
                preview: false
            },
            {
                spotId: 2,
                url: 'https://unsplash.com/photos/h8wLc3lbDuA',
                preview: false
            },
            {
                spotId: 2,
                url: 'https://unsplash.com/photos/h0AnGGgseio',
                preview: false
            },
            {
                spotId: 2,
                url: 'https://unsplash.com/photos/oUdt2BJrLJE',
                preview: false
            },
            {
                spotId: 2,
                url: 'https://unsplash.com/photos/64jW2tDpuI8',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://unsplash.com/photos/WJDR8_QxVR8',
                preview: true
            },
            {
                spotId: 3,
                url: 'https://unsplash.com/photos/nWX4pKwzLoE',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://unsplash.com/photos/QHXNWzbghH4',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://unsplash.com/photos/DH_u2aV3nGM',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://unsplash.com/photos/KMn4VEeEPR8',
                preview: false
            },
            {
                spotId: 3,
                url: 'https://unsplash.com/photos/-u-30ap3rEw',
                preview: false
            },
            {
                spotId: 4,
                url: 'https://unsplash.com/photos/EpeNGhitrlc',
                preview: true
            },
            {
                spotId: 4,
                url: 'https://unsplash.com/photos/69C177OYn7c',
                preview: false
            },
            {
                spotId: 4,
                url: 'https://unsplash.com/photos/nXOB-wh4Oyc',
                preview: false
            },
            {
                spotId: 4,
                url: 'https://unsplash.com/photos/nis5gvoboyI',
                preview: false
            },
            {
                spotId: 4,
                url: 'https://unsplash.com/photos/2qLT_Rq-2tk',
                preview: false
            },
            {
                spotId: 4,
                url: 'https://unsplash.com/photos/1za4NHi9zjI',
                preview: false
            },
            {
                spotId: 5,
                url: 'https://unsplash.com/photos/GEv0x00erqU',
                preview: true
            },
            {
                spotId: 5,
                url: 'https://unsplash.com/photos/JpWtmyjMI30',
                preview: false
            },
            {
                spotId: 5,
                url: 'https://unsplash.com/photos/ZkDTz_rAgKw',
                preview: false
            },
            {
                spotId: 5,
                url: 'https://unsplash.com/photos/_u8KhAZRGHs',
                preview: false
            },
            {
                spotId: 5,
                url: 'https://unsplash.com/photos/cjhuXRtRT0Y',
                preview: false
            },
            {
                spotId: 5,
                url: 'https://unsplash.com/photos/OD9EOzfSOh0',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://unsplash.com/photos/nfF5-G6cFwY',
                preview: true
            },
            {
                spotId: 6,
                url: 'https://unsplash.com/photos/Mn5vLHPLTuw',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://unsplash.com/photos/Y3Hbh7wB8CI',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://unsplash.com/photos/-T8tYN-3cMg',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://unsplash.com/photos/OlkXc9xlDks',
                preview: false
            },
            {
                spotId: 6,
                url: 'https://unsplash.com/photos/MrDfuenOS9s',
                preview: false
            },
            {
                spotId: 7,
                url: 'https://unsplash.com/photos/YG2MysGbT_M',
                preview: true
            },
            {
                spotId: 7,
                url: 'https://unsplash.com/photos/iANAdaNu7mg',
                preview: false
            },
            {
                spotId: 7,
                url: 'https://unsplash.com/photos/mw_mj-noYHM',
                preview: false
            },
            {
                spotId: 7,
                url: 'https://unsplash.com/photos/O7WjrXiKy_s',
                preview: false
            },
            {
                spotId: 7,
                url: 'https://unsplash.com/photos/JhYbY9nv0rU',
                preview: false
            },
            {
                spotId: 7,
                url: 'https://unsplash.com/photos/3vv1A8zNG9A',
                preview: false
            },
            {
                spotId: 8,
                url: 'https://unsplash.com/photos/Mhiuw5Rp1WU',
                preview: true
            },
            {
                spotId: 8,
                url: 'https://unsplash.com/photos/ao1ZaY55bvs',
                preview: false
            },
            {
                spotId: 8,
                url: 'https://unsplash.com/photos/MTSILZYVcdw',
                preview: false
            },
            {
                spotId: 8,
                url: 'https://unsplash.com/photos/XtnNrQYC7ts',
                preview: false
            },
            {
                spotId: 8,
                url: 'https://unsplash.com/photos/HmieZw0YOC0',
                preview: false
            },
            {
                spotId: 8,
                url: 'https://unsplash.com/photos/dS1EQ30SQcU',
                preview: false
            },
            {
                spotId: 9,
                url: 'https://unsplash.com/photos/j8J-9D4i9EA',
                preview: true
            },
            {
                spotId: 9,
                url: 'https://unsplash.com/photos/05A3CzImkhw',
                preview: false
            },
            {
                spotId: 9,
                url: 'https://unsplash.com/photos/kSslUrbE2Kc',
                preview: false
            },
            {
                spotId: 9,
                url: 'https://unsplash.com/photos/2jlRllahuMk',
                preview: false
            },
            {
                spotId: 9,
                url: 'https://unsplash.com/photos/ATprPSzYu00',
                preview: false
            },
            {
                spotId: 9,
                url: 'https://unsplash.com/photos/56WKMCORs-0',
                preview: false
            },
            {
                spotId: 10,
                url: 'https://unsplash.com/photos/OgcJIKRnRC8',
                preview: true
            },
            {
                spotId: 10,
                url: 'https://unsplash.com/photos/EbivdbB83Y0',
                preview: false
            },
            {
                spotId: 10,
                url: 'https://unsplash.com/photos/51adhgg5KkE',
                preview: false
            },
            {
                spotId: 10,
                url: 'https://unsplash.com/photos/duo-xV0TU7s',
                preview: false
            },
            {
                spotId: 10,
                url: 'https://unsplash.com/photos/IWenq-4JHqo',
                preview: false
            },
            {
                spotId: 10,
                url: 'https://unsplash.com/photos/DEnuB_zok9M',
                preview: false
            },
            {
                spotId: 11,
                url: 'https://unsplash.com/photos/AQjkC4sax6s',
                preview: true
            },
            {
                spotId: 11,
                url: 'https://unsplash.com/photos/PyFzygP2eNg',
                preview: false
            },
            {
                spotId: 11,
                url: 'https://unsplash.com/photos/-BqB2zptPQo',
                preview: false
            },
            {
                spotId: 11,
                url: 'https://unsplash.com/photos/Y41w7pyxE18',
                preview: false
            },
            {
                spotId: 11,
                url: 'https://unsplash.com/photos/ZWGexQLecAI',
                preview: false
            },
            {
                spotId: 11,
                url: 'https://unsplash.com/photos/58uZCE8zrdk',
                preview: false
            },
            {
                spotId: 12,
                url: 'https://unsplash.com/photos/MTSILZYVcdw',
                preview: true
            },
            {
                spotId: 12,
                url: 'https://unsplash.com/photos/XtnNrQYC7ts',
                preview: false
            },
            {
                spotId: 12,
                url: 'https://unsplash.com/photos/HmieZw0YOC0',
                preview: false
            },
            {
                spotId: 12,
                url: 'https://unsplash.com/photos/dS1EQ30SQcU',
                preview: false
            },
            {
                spotId: 12,
                url: 'https://unsplash.com/photos/Mhiuw5Rp1WU',
                preview: false
            },
            {
                spotId: 12,
                url: 'https://unsplash.com/photos/ao1ZaY55bvs',
                preview: false
            },
            {
                spotId: 13,
                url: 'https://unsplash.com/photos/dyj7RTs85Fs',
                preview: true
            },
            {
                spotId: 13,
                url: 'https://unsplash.com/photos/nwE2CE1ksEE',
                preview: false
            },
            {
                spotId: 13,
                url: 'https://unsplash.com/photos/TlROlpRnRrw',
                preview: false
            },
            {
                spotId: 13,
                url: 'https://unsplash.com/photos/388bwjYQ1Kk',
                preview: false
            },
            {
                spotId: 13,
                url: 'https://unsplash.com/photos/VjpuXU-4UE4',
                preview: false
            },
            {
                spotId: 13,
                url: 'https://unsplash.com/photos/z_lpmqd2t_c',
                preview: false
            },
            {
                spotId: 14,
                url: 'https://unsplash.com/photos/iYVmcIb94gs',
                preview: true
            },
            {
                spotId: 14,
                url: 'https://unsplash.com/photos/P0B9b0mY4W4',
                preview: false
            },
            {
                spotId: 14,
                url: 'https://unsplash.com/photos/HEq2Umht4rE',
                preview: false
            },
            {
                spotId: 14,
                url: 'https://unsplash.com/photos/Bkci_8qcdvQ',
                preview: false
            },
            {
                spotId: 14,
                url: 'https://unsplash.com/photos/avJ9uz9Qhcw',
                preview: false
            },
            {
                spotId: 14,
                url: 'https://unsplash.com/photos/bQTVoJHrkO0',
                preview: false
            },
            {
                spotId: 15,
                url: 'https://unsplash.com/photos/CppuxXh6nxE',
                preview: true
            },
            {
                spotId: 15,
                url: 'https://unsplash.com/photos/IA_BATrHzXo',
                preview: false
            },
            {
                spotId: 15,
                url: 'https://unsplash.com/photos/E3QBpdLAv0k',
                preview: false
            },
            {
                spotId: 15,
                url: 'https://unsplash.com/photos/9yoPEVoSTcA',
                preview: false
            },
            {
                spotId: 15,
                url: 'https://unsplash.com/photos/QVl0nFEp1Dk',
                preview: false
            },
            {
                spotId: 16,
                url: 'https://unsplash.com/photos/OtXADkUh3-I',
                preview: true
            },
            {
                spotId: 16,
                url: 'https://unsplash.com/photos/I4MhWjuf5Xk',
                preview: false
            },
            {
                spotId: 16,
                url: 'https://unsplash.com/photos/sf2ICUgMky0',
                preview: false
            }
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
