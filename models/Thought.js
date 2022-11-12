// Imports
const { Schema, model, Types } = require('mongoose');
// Utility function
const dateFormat = require('../utils/dateFormat');

// Schema for reactions
const reactionSchema = new Schema(
{
  reactionId: {
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()
  },
  reactionBody: {
    type: String,
    required: true,
    maxLength: 280
  },
  username: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: createdAtVal => dateFormat(createdAtVal)
  }
},
{
  toJSON: {
    getters: true
  },
  _id: false,
  id: false
}
)

// Schema for thoughts
const ThoughtSchema = new Schema(
{
  thoughtText: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 280
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (createdAtVal) => dateFormat(createdAtVal)
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema]
},
{
  toJSON: {
    virtuals: true,
    getters: true
  },
  id: false
}
)

// virtual
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
})

// model instantiation
const Thought = model('Thought', ThoughtSchema);

// Export model
module.exports = Thought;