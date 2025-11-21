const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const UserSchema = new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String, role: { type: String, default: 'user' }
});
UserSchema.pre('save', async function(next){
  if(!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
});
UserSchema.methods.comparePassword = function(p){ return bcrypt.compare(p,this.password); };
module.exports = mongoose.model('User', UserSchema);
