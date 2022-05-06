'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    workoutId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(30),
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT(1000),
      allowNull: false
    }
  }, {});
  Exercise.associate = function(models) {
    // associations can be defined here
    // An exercise belongs to a single user
    Exercise.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    // An exercise belongs to a single workout
    Exercise.belongsTo(models.Workout, {
      foreignKey: 'workoutId',
    });
  };
  return Exercise;
};
