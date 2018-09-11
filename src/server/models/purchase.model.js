const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PurchaseSchema = mongoose.Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    course: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    price: {
      type: Number,
      default: 0.0
    },
    type: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Purchase', PurchaseSchema);
