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
const orderController = require('./ordersController');
const trackController = require('./trackController');

router.post('/signup', accountController.signUp);
router.post('/signin', accountController.signIn);
router.get('/tracks', checkAuth, trackController.getTrack);
router.post('/tracks', checkAuth, trackController.createTrack);

router.get('/users', accountController.getUsers);

router.post('/orders', orderController.addOrders);

router.get('/orders', orderController.getOrders);
router.delete('/orders', orderController.deleteOrders);


router.get('/inventory', orderController.getInventory);

module.exports = router;

