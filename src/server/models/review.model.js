const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = mongoose.Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      default: 0.0
    },
    comment: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Review', ReviewSchema);
