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
  playerCount: {
    type: Number,
    default: 0
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
  timeSlots: {
    date: {type: Date},
    amTimeSlots: {
      12: { type: Boolean, default: true },
      1: { type: Boolean, default: true },
      2: { type: Boolean, default: true },
      3: { type: Boolean, default: true },
      4: { type: Boolean, default: true},
      5: { type: Boolean, default: true},
      6: { type: Boolean, default: true},
      7: { type: Boolean, default: true},
      8: { type: Boolean, default: true},
      9: { type: Boolean, default: true},
      10: { type: Boolean, default: true},
      11: { type: Boolean, default: true}
    }, 
    pmTimeSlots: {
      12: { type: Boolean, default: true },
      1: { type: Boolean, default: true },
      2: { type: Boolean, default: true },
      3: { type: Boolean, default: true },
      4: { type: Boolean, default: true},
      5: { type: Boolean, default: true},
      6: { type: Boolean, default: true},
      7: { type: Boolean, default: true},
      8: { type: Boolean, default: true},
      9: { type: Boolean, default: true},
      10: { type: Boolean, default: true},
      11: { type: Boolean, default: true}
    }
  },
  runs: [runSchema]
}, {
  timestamps: true
});

module.exports = mongoose.model('Location', locationSchema);