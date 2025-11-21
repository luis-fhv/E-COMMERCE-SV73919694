const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
  name: String,
  brand: String,
  description: String,
  price: Number,

  sizes: [
    {
      size: Number,
      stock: Number
    }
  ],

  colors: [String],
  images: [String],
  category: { type: String, default: 'sneakers' }
});

module.exports = mongoose.model('Product', ProductSchema);
