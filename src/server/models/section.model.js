const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = mongoose.Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    },
    title: String,
    objective: String,
    lectures: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Lecture'
      }
    ]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Section', SectionSchema);
