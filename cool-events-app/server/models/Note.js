const { Schema, model } = require('mongoose');

const noteSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    notesText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
  },
//   {
//     toJSON: {
//       getters: true,
//     },
//     id: false,
//   }
);

module.exports = noteSchema;

