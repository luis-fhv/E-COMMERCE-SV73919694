const mongoose = require('mongoose');
const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  items: [
    { 
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, 
      name: String, 
      size: Number, 
      color: String, 
      qty: Number, 
      price: Number 
    }
  ],
  total: Number,
  status: { type: String, default: 'pending' },
  paymentInfo: Object,
  createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Order', OrderSchema);
