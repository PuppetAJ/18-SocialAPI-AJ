const {Schema, model} = require('mongoose');

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

UserSchema.virtual('friendCount').get(function() {
  return this.friends.length;
});

UserSchema.pre('remove', function(next) {
  this.model('thoughts').remove({ username: this.username }, next)
});

const User = model('User', UserSchema);

module.exports = User;