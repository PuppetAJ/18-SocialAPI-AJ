// Imports
const {Schema, model} = require('mongoose');
const Thought = require('./Thought');

// Schema declaration
const UserSchema = new Schema(
{
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  thoughts: [{ type: Schema.Types.ObjectId, ref: 'Thought'}],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User'}],
},
{
  toJSON: {
    virtuals: true,
  },
  id: false
}
);

// Virtual
UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

// After deletion of a user, delete all of its thoughts
UserSchema.post('findOneAndDelete', async function(doc) {
  if (doc) {
    const deleteResult = await Thought.deleteMany({ username: doc.username })
  }
});

// Model instantiation
const User = model('User', UserSchema);

// Export mdoel
module.exports = User;