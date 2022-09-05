const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// TODO - complete the run schema
const runSchema = new Schema({
  time: {},
  date: {},
  players: {}
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
  schedule: {},
  timeSlots: {},
  runs: [runSchema]
});

module.exports = mongoose.model('Location', locationSchema);