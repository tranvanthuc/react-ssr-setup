const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const courseSchema = Schema(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    sub_category: {
      type: Schema.Types.ObjectId,
      ref: 'Category'
    },
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: true
    },
    duration: {
      type: Number
    },
    discount: {
      type: Number,
      default: 0
    },
    level: {
      type: String,
      enum: ['All levels', 'Beginner Level', 'Intermediate Level', 'Expert Level']
    },
    description: String,
    image_preview: String,
    video_preview: String,
    total_lectures: {
      type: Number,
      default: 0
    },
    total_students: {
      type: Number,
      default: 0
    },
    language: String,
    price: {
      type: Number,
      default: 0.0
    },
    currency: String,
    caption: String,
    requires: [
      {
        answer: String
      }
    ],
    archieves: [
      {
        answer: String
      }
    ],
    targets: [
      {
        answer: String
      }
    ],
    rating: {
      type: Number,
      default: 0.0
    },
    sections: [
      {
        title: String,
        objective: String,
        lectures: [{ title: String }]
      }
    ],
    reviews: [String]
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Course', courseSchema);
