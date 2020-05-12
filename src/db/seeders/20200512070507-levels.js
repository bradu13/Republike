'use strict';

module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('UserLevels', [
      {
        name: 'Serf',
        icon: '',
        totalPoints: '10',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Apprentice',
        icon: '',
        totalPoints: '20',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Freeman',
        icon: '',
        totalPoints: '30',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Bourgeois',
        icon: '',
        totalPoints: '40',
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        name: 'Knight',
        icon: '',
        totalPoints: '50',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('UserLevels', null, {});
  }
};
