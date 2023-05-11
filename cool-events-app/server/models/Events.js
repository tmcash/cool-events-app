
const { Schema, model, Types } = require('mongoose');


// const dateFormat = require('../utils/dateFormat');

const eventSchema = new Schema({
  eventText: {
    type: String,
    required: 'Please name your event',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  eventAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  eventTime: {
    type: Date,
    default: Date.now,
  },
  notes: { 
    type: Schema.Types.ObjectId,
    ref: 'Note',
  },
  username:{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

const Event = model('Event', eventSchema);

module.exports = Event;
