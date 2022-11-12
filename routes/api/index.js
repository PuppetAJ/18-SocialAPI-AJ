// Import router & routes
const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtRoutes = require('./thought-routes');

// Prefix to use before routes
router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);

// Export router
module.exports = router;