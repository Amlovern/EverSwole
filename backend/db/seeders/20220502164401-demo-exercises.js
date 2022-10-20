'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = 'everswole';
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Exercises';
   return queryInterface.bulkInsert(options, [
     {userId: 1, workoutId: 1, title: 'Pushup', content: 'Done with bodyweight only. 20 Reps per set. Did three total sets.', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, workoutId: 1, title: 'DB SA OH Press', content: 'Done with 20 lb dumbbells. 8 to 10 Reps per set. Did three total sets.', createdAt: new Date(), updatedAt: new Date()},
     {userId: 1, workoutId: 1, title: 'Dips', content: 'Done with bodyweight only. 1 Rep per set, making sure to go nice and deep. Did three total sets.', createdAt: new Date(), updatedAt: new Date()}
   ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Exercises';
   return queryInterface.bulkDelete(options);
  }
};
