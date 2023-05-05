//   const mongoose = require('mongoose');

const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

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
    default: Date,
    get: date(dateFormat),
  },
  notes: [
    {
      notesText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
    },
  ],
});

const Event = model('Event', eventSchema);

module.exports = Event;
