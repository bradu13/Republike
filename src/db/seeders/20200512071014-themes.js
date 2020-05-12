'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Themes', [
      {
        name: 'Music',
        icon: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Sport',
        icon: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Lifestyle',
        icon: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Themes', null, {});
  }
};
