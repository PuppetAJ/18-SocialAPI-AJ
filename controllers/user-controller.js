const { User } = require('../models');

const userController = {
  // GET all users
  getAllUsers(req, res) {
    User.find({})
    .select('-__v')
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.status(400).json(err));
  },

  // GET user by id
  getUserById({params}, res) {
    User.find(
      { _id: params.id }
    )
    .populate(
      {
        path: 'thoughts',
        select: '-__v'
      },
      {
        path: 'friends',
        select: '-__v'
      }
    )
    .select('-__v')
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with that id!'})
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
  },

  // CREATE a user
    // example data
    // {
    //   "username": "lernantino",
    //   "email": "lernantino@gmail.com"
    // }
  createUser({ body }, res) {
    User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
  },

  // UPDATE a user by its id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      body,
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  // DELETE a user by its id
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  // CREATE a friend
  addFriend({ params , body }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId }},
      { new: true, runValidators: true }
    )
    .then(dbUserData => {
      if (!dbUserData) {
        res.status(404).json({ message: 'No user found with this id!' });
        return;
      }
      res.json(dbUserData);
    })
    .catch(err => res.status(400).json(err));
  },

  // DELETE a friend
  removeFriend({ params, body }, res) {
  User.findOneAndUpdate(
    { _id: params.userId },
    { $pull: { friends: params.friendId }},
    { new: true, runValidators: true }
  )
  .then(dbUserData => {
    if(!dbUserData) {
      return res.status(404).json({message: "User or friend not found"});
    }
    res.json(dbUserData)
  })
  .catch(err => res.status(400).json(err))
  }
}

module.exports = userController;