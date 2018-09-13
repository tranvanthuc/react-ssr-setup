const validator = require('validator');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema(
  {
    first_name: {
      type: String,
      trim: true,
      required: [true, 'Please enter first name']
    },
    last_name: {
      type: String,
      trim: true,
      required: [true, 'Please enter last name']
    },
    bio: String,
    email: {
      type: String,
      trim: true,
      index: true,
      unique: true,
      required: true,
      validate: [validator.isEmail, 'Invalid email!']
    },
    password: {
      type: String,
      required: true
    },
    avatart: String,
    join_courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    create_courses: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Course'
      }
    ],
    rating: {
      type: Number,
      default: 0.0
    }
  },
  {
    timestamps: true
  }
);

userSchema.virtual('full_name').get(function() {
  return this.first_name + ' ' + this.last_name;
});

module.exports = mongoose.model('User', userSchema);
