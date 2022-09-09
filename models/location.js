const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - complete the run schema
const runSchema = new Schema({
  time: {},
  date: {},
  playerCount: {
    type: Number,
    default: 1
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const locationSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  zipCode: {
    type: String,
    required: true
  }, 
  googleId: {
    type: String,
    default: undefined
  },
  schedule: {},
  timeSlots: {},
  runs: [runSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);