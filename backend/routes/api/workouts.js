const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const db = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

router.get('/', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const workouts = await db.Workout.findAll({
        where: {
            userId: user.id
        }
    });
    if (workouts) {
        return res.json(workouts)
    } else {
        console.log('Try again next time!')
    }
}));

router.get('/:workoutId', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const workoutId = req.params.workoutId;

    const workout = await db.Workout.findOne({
        where: {
            id: workoutId,
            userId: user.id
        }
    });

    if (workout) {
        console.log('WORKOUT', workout.title)
    } else {
        console.log('Try again next time!')
    }
}));

module.exports = router;
