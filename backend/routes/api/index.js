const router = require('express').Router();
const sessionRouter = require('./session');
const usersRouter = require('./users');
const exercisesRouter = require('./exercises');
const workoutsRouter = require('./workouts');
const asyncHandler = require('express-async-handler');
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth.js');
const { User } = require('../../db/models');

router.use('/session', sessionRouter);
router.use('/users', usersRouter);
router.use('/exercises', exercisesRouter);
router.use('/workouts', workoutsRouter);

module.exports = router;
