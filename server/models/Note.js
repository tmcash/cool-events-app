const { Schema, model, Types } = require('mongoose');
const User = require('./User');


const noteSchema = new Schema(
  {
    username: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    }
    ,
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

const Note = model('Note', noteSchema);


module.exports = Note;

