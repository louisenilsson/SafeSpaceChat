const mongoose = require('mongoose');
const Conversation = require('./conversationModel');
const Message = require('./messageModel');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  UserId: String,
  fullName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  conversations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
  }],
  isSupervisor: {
    type: Boolean,
    required: true,
  },
  supervisions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
