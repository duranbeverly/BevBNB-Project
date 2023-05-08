'use strict';
/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

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
      },
      {
        ownerId: 1,
        address: '1275 Coast Village Rd',
        city: 'Santa Barbara',
        state: 'California',
        country: 'United States',
        lat: 34.422520,
        lng: -119.637940,
        name: 'Beachfront Treehouse',
        description: 'Experience luxury living in a treehouse steps away from the beach',
        price: 1200
      },
      {
        ownerId: 1,
        address: '8159 Paseo del Ocaso',
        city: 'La Jolla',
        state: 'California',
        country: 'United States',
        lat: 32.860470,
        lng: -117.256390,
        name: 'Oceanview Glass House',
        description: 'Watch the sunset from this modern glass house with sweeping ocean views',
        price: 950
      },
      {
        ownerId: 1,
        address: '327 E Ocean Blvd',
        city: 'Long Beach',
        state: 'California',
        country: 'United States',
        lat: 33.767880,
        lng: -118.189420,
        name: 'Luxury Yacht',
        description: 'Experience the ultimate in luxury on this 100-foot yacht with a private chef and crew',
        price: 5000
      },
      {
        ownerId: 1,
        address: '2 Kukio Nui Dr',
        city: 'Kailua-Kona',
        state: 'Hawaii',
        country: 'United States',
        lat: 19.730940,
        lng: -155.986620,
        name: 'Luxury Hawaiian Estate',
        description: 'Escape to this luxurious estate on the Kohala Coast of Hawaii with breathtaking views of the ocean and mountains',
        price: 1500
      },
      {
        ownerId: 1,
        address: '501 Port Renwick',
        city: 'Newport Beach',
        state: 'California',
        country: 'United States',
        lat: 33.606540,
        lng: -117.879720,
        name: 'Beachfront Villa',
        description: 'Relax in this elegant beachfront villa with stunning ocean views',
        price: 1800
      },
      {
        ownerId: 1,
        address: '1630 Tramonto Dr',
        city: 'Pacific Palisades',
        state: 'California',
        country: 'United States',
        lat: 34.046340,
        lng: -118.539200,
        name: 'Luxury Oceanview Villa',
        description: 'Experience luxury living in this spacious oceanview villa with a private pool and spa',
        price: 2500
      },
      {
        ownerId: 1,
        address: '4255 W Lake Blvd',
        city: 'Homewood',
        state: 'California',
        country: 'United States',
        lat: 39.097380,
        lng: -120.173870,
        name: 'Lakefront Cabin',
        description: 'Get away from it all in this cozy lakefront cabin in the woods',
        price: 350
      },
      {
        ownerId: 1,
        address: '28800 Foothill Dr',
        city: 'Agoura Hills',
        state: 'California',
        country: 'United States',
        lat: 34.144190,
        lng: -118.784230,
        name: 'Luxury Ranch Estate',
        description: 'Live the ranch life in style in this luxurious estate with panoramic views of the mountains and valley',
        price: 3000
      },
      {
        ownerId: 1,
        address: '25 Ocean View Drive',
        city: 'Malibu',
        state: 'California',
        country: 'United States',
        lat: 34.032520,
        lng: -118.784730,
        name: 'Beachfront Villa',
        description: 'Luxury beachfront villa with stunning ocean views and private pool.',
        price: 2000
      },
      {
        ownerId: 1,
        address: '4101 Pine Tree Dr',
        city: 'Miami Beach',
        state: 'Florida',
        country: 'United States',
        lat: 25.820910,
        lng: -80.129060,
        name: 'Tropical Retreat',
        description: 'Escape to this lush tropical retreat with a private pool and outdoor cabana.',
        price: 1200
      },
      {
        ownerId: 1,
        address: '6155 E 52nd Ave',
        city: 'Denver',
        state: 'Colorado',
        country: 'United States',
        lat: 39.802680,
        lng: -104.899740,
        name: 'Modern Mountain House',
        description: 'Stylish and modern mountain house with stunning views of the Rockies.',
        price: 800
      },
      {
        ownerId: 2,
        address: '4567 NW 14th St',
        city: 'Portland',
        state: 'Oregon',
        country: 'United States',
        lat: 45.540740,
        lng: -122.692930,
        name: 'Treehouse Retreat',
        description: 'Cozy and secluded treehouse nestled in the forest of Portland.',
        price: 400
      },
      {
        ownerId: 2,
        address: '102 Cedar St',
        city: 'Seattle',
        state: 'Washington',
        country: 'United States',
        lat: 47.615610,
        lng: -122.327520,
        name: 'Lakefront Cabin',
        description: 'Charming lakefront cabin with private dock and stunning views of Lake Washington.',
        price: 700
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
