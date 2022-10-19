'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = "Everswole";
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Workouts';
   return queryInterface.bulkInsert(options, [
     {userId: 1, title: 'Push Day', createdAt: new Date(), updatedAt: new Date()}
   ], {});
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Workouts';
   return queryInterface.bulkDelete(options, null, {});
  }
};
