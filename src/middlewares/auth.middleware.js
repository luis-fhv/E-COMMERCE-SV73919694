const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const auth = async (req,res,next)=>{
  try {
    const header = req.headers.authorization;
    if(!header) return res.status(401).json({ message: 'No token' });
    const token = header.replace('Bearer ',''); 
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select('-password');
    if(!user) return res.status(401).json({ message: 'Invalid token' });
    req.user = user;
    next();
  }catch(err){ res.status(401).json({ message:'Unauthorized', error:err.message }); }
};
const authorize = roles=> (req,res,next)=>{ if(roles.length && !roles.includes(req.user.role)) return res.status(403).json({message:'Forbidden'}); next();};
module.exports = { auth, authorize };
