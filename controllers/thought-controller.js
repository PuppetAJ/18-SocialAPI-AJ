const { User, Thought } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
    .select('-__v')
    .then(dbThoughtData => res.json(dbThoughtData))
    .catch(err => res.status(400).json(err));
  },

  // GET thought by ID
  getThoughtById({params}, res) {
    Thought.find(
      { _id: params.id }
    )
    .populate(
      {
        path: 'reactions',
        select: '-__v'
      },
    )
    .select('-__v')
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with that id!'})
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // CREATE new thought
  // example data
    // {
    //   "thoughtText": "Here's a cool thought...",
    //   "username": "lernantino",
    // }
  createThought({body}, res) {
    Thought.create(body)
    .then(({ _id, username }) => {
      return User.findOneAndUpdate(
        { username: username },
        { $push: { thoughts: _id } },
        { new: true }
      );
    })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(400).json({message: "No user found with this username!"});
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.json(err));
  },

  // UPDATE a thought by its id
  updateThought({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  // DELETE a thought by its id
  removeThought({params}, res) {
    Thought.findOneAndDelete(
      { _id: params.id }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought found with this id!' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.status(400).json(err));
  },

  // CREATE a reaction
  addReaction({params, body}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body }},
      { new: true, runValidators: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        res.status(404).json({message: 'No thought found with this id!'});
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  },

  // DELETE a reaction
  removeReaction({params}, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId }}},
      { new: true }
    )
    .then(dbThoughtData => {
      if(!dbThoughtData) {
        return res.status(404).json({message: "No thought or reaction with that id found!"});
      }
      res.json(dbThoughtData)
    })
    .catch(err => res.json(err));
  }
} 