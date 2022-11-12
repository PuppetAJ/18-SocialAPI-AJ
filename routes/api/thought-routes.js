// Import router
const router = require('express').Router();
// Import thought controller functions
const { 
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  removeThought,
  addReaction,
  removeReaction,
  removeThoughts
} = require('../../controllers/thought-controller');

// declare routes and prefixes which they use
router
  .route('/')
  .get(getAllThoughts)
  .post(createThought)
  .delete(removeThoughts)

router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(removeThought)

router
  .route('/:thoughtId/reactions')
  .post(addReaction)

router
  .route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction)

// export router
module.exports = router;