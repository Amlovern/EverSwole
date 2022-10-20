'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = 'everswole';
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Exercises', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users" }
      },
      workoutId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Workouts" }
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(30)
      },
      content: {
        allowNull: false,
        type: Sequelize.TEXT(1000)
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }, options);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Exercises', options);
  }
};
