const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const runSchema = new Schema({
  time: {
    type: Number,
    enum: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    required: true,
  },
  amPm: {
    type: String,
    enum: ['AM', 'PM'],
  },
  date: {
    type: Date,
    required: true
  },
  players: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  creator: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const availabilitySchema = new Schema({
  date: Date,
  hoursAvail: [Number]
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
  schedule: [availabilitySchema],
  runs: [runSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);