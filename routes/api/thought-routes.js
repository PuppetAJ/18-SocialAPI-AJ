const router = require('express').Router();
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

module.exports = router;