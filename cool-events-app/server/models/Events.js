
const { Schema, model } = require('mongoose');
const Note = require('./Note');
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
    // get: function (date) {
    //   return dateFormat(date);
    // },
  },
  notes: 
  [ Note ],
});

const Events = model('Event', eventSchema);

module.exports = Events;
