const mongoose = require('mongoose');

/**
 * create the schema for restaurant
 * difne all nedded variable;
 * restaurent name should be ue
 * restaurent address should be unique
 * phone number should be unique
 */

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minLength: 5,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageURL: {
    type: String,
  },
  location: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
    immutable: true,
  },
  updatedAt: {
    type: Date,
    default: () => {
      return Date.now();
    },
  },
});

module.exports = mongoose.model('RESTAURANT', restaurantSchema);
