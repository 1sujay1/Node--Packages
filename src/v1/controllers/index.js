const express = require('express');
const router = express.Router();

/**
 * Import Middleware
 */
const { checkAuth } = require('./../../middlewares/requireAuth')
/**
 * Importing  Controller file
 */
const accountController = require('./accountController');
const trackController = require('./trackController');

router.post('/signup', accountController.signUp);
router.post('/signin', accountController.signIn);
router.get('/tracks', checkAuth, trackController.getTrack);
router.post('/tracks', checkAuth, trackController.createTrack);

module.exports = router;

