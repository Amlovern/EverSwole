const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const db = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateWorkout = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.'),
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ max: 30 })
        .withMessage('Title must be less than 30 characters.'),
    handleValidationErrors
];

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

router.post('/', restoreUser, validateWorkout, asyncHandler(async (req, res) => {
    const { user } = req;
    const { title } = req.body;

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        const newWorkout = await db.Workout.create({
            userId: user.id,
            title
        });
        return res.json(newWorkout)
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        console.error(errors)
    }
}));

router.delete('/:workoutId', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const workoutId = req.params.workoutId;

    const specificWorkout = await db.Workout.findOne({
        where: {
            userId: user.id,
            id: workoutId
        }
    })

    if (specificWorkout) {
        await specificWorkout.destroy();
        return res.json(specificWorkout);
    }
}));

module.exports = router;
