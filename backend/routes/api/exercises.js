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
        .notEmpty()
        .withMessage('Please provide a title.'),
    check('title')
        .exists({ checkFalsy: true })
        .isLength({ max: 30 })
        .withMessage('Title must be less than 30 characters.'),
    check('content')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a description.'),
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
        },
        include: db.Workout
    });
    if (exercises) {
        return res.json(exercises)
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

router.post('/', restoreUser, validateExercise, asyncHandler(async (req, res, next) => {
    const { user } = req;
    const { title, content, workoutTitle } = req.body;
    const workout = await db.Workout.findOne({
        where: {
            userId: user.id,
            title: workoutTitle
        }
    });


    const validationErrors = validationResult(req);

    if (validationErrors.isEmpty()) {
        const newExercise = await db.Exercise.create({
            userId: user.id,
            title,
            content,
            workoutId: workout.id
        })

        const foundExercise = await db.Exercise.findOne({
            where: {
                userId: user.id,
                id: newExercise.id
            },
            include: db.Workout
        })
        return res.json(foundExercise);
    } else {
        const err = new Error('Workout Edit Failed');
        err.status = 401;
        err.title = "Workout Edit Failed"
        err.errors = validationErrors.array().map((error) => error.msg);
        return next(err)
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
            const updatedExercise = await specificExercise.update({
                title,
                content
            })
            return res.json(updatedExercise)
        }
    } else {
        const errors = validationErrors.array().map((error) => error.msg);
        console.errors(errors)
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
        return res.json(specificExercise);
    }
}))

module.exports = router;
