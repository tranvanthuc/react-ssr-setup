const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categorySchema = Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  description: String,
  parent: {
    type: Schema.Types.ObjectId,
    ref: 'Category'
  },
  courses: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Course'
    }
  ]
});

module.exports = mongoose.model('Category', categorySchema);
