const express = require('express');
const asyncHandler = require('express-async-handler');
const { restoreUser } = require('../../utils/auth');
const db = require('../../db/models');
const { check, validationResult } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

const validateExercise = [
    check('title')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a title.'),
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ max: 256 })
        .withMessage('Title must be less than 256 characters.'),
    check('content')
        .exists({ checkFalsy: true })
        .isLength({ max: 1000 })
        .withMessage('Content must be less than 1,000 characters.'),
        handleValidationErrors
];

router.get('/', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const exercises = await db.Exercise.findAll({
        where: {
            userId: user.id
        }
    });
    if (exercises) {
        const exerciseList = exercises.map((exercise) => {
            console.log(exercise.title)
        })
    } else {
        console.log('That didn\'t work!')
    }
}));

router.get('/:exerciseId', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const exerciseId = req.params.exerciseId;

    const exercise = await db.Exercise.findOne({
        where: {
            userId: user.id,
            id: exerciseId
        }
    });

    if (exercise) {
        console.log('EXERCISE', exercise.title)
    } else {
        console.log('That didn\'t work!')
    }
}));

router.post('/', restoreUser, validateExercise, asyncHandler(async (req, res) => {
    const { user } = req;
    const { title, content, workoutTitle } = req.body;
    const workout = await db.Workout.findOne({
        where: {
            userId: user.id,
            title: workoutTitle
        }
    });

    const newExercise = await db.Exercise.build({
        userId: user.id,
        title,
        content,
        workoutId: workout.id
    })

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        await newExercise.save();
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        console.log(errors)
    }
}))

router.post('/:exerciseId', restoreUser, validateExercise, asyncHandler(async (req, res) => {
    const { user } = req;
    const { title, content } = req.body;
    const exerciseId = req.params.exerciseId

    const specificExercise = await db.Exercise.findOne({
        where: {
            userId: user.id,
            id: exerciseId
        }
    })

    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        if (specificExercise) {
            await specificExercise.update({
                title,
                content
            })
        }
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        console.log(errors)
    }
}))

router.delete('/:exerciseId', restoreUser, asyncHandler(async (req, res) => {
    const { user } = req;
    const exerciseId = req.params.exerciseId;

    const specificExercise = await db.Exercise.findOne({
        where: {
            userId: user.id,
            id: exerciseId
        }
    })

    if (specificExercise) {
        await specificExercise.destroy();
    }
}))

module.exports = router;
