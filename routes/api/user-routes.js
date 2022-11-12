// Import router & user controller
const router = require('express').Router();
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
  removeUsers
} = require('../../controllers/user-controller');

// Declare routes and functions which they use
router
  .route('/')
  .get(getAllUsers)
  .post(createUser)
  .delete(removeUsers)

router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser)

router
  .route('/:userId/friends/:friendId')
  .post(addFriend)
  .delete(removeFriend)

// Export router
module.exports = router;