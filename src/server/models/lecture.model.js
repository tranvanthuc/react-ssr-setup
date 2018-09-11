const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LectureSchema = mongoose.Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    name: String,
    duration: Number,
    resources: [
      {
        name: String,
        url: String
      }
    ],
    session: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Session'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Lecture', LectureSchema);
