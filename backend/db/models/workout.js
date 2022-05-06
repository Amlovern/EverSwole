'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('Workout', {
    userId: {
      type:DataTypes.INTEGER,
      allowNull: false
    },
    title: {
      type:DataTypes.STRING(30),
      allowNull:false
    }
  }, {});
  Workout.associate = function(models) {
    // associations can be defined here
    // A workout belongs to a user
    Workout.belongsTo(models.User, {
      foreignKey: 'userId',
    });

    // A workout has many exercises
    Workout.hasMany(models.Exercise, {
      foreignKey: 'workoutId',
      onDelete: 'CASCADE',
      hooks: true
    });
  };
  return Workout;
};
