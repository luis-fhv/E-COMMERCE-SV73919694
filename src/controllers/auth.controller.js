const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

exports.login = async (req,res)=>{
  const {email,password} = req.body;
  try{
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:'el usuario no existe'});
    
    const valid = await bcrypt.compare(password,user.password);
    if(!valid) return res.status(400).json({message:'Contraseña incorrecta'});
    
    const token = jwt.sign(
      {id:user._id, role:user.role},
      process.env.JWT_SECRET,
      {expiresIn:'1d'}
    );

    res.json({
      token,
      user:{
        name:user.name,
        email:user.email,
        role:user.role
      }
    });

  }catch(err){
    res.status(500).json({message:'Error', error:err.message});
  }
};

exports.register = async (req,res)=>{
  const {name,email,password,role} = req.body;
  try{
    let user = await User.findOne({email});
    if(user) return res.status(400).json({message:'el usuario ya existe'});

    user = new User({
  name,
  email,
  password,   
  role: role || "user"
});


    await user.save();

    const token = jwt.sign(
      {id:user._id, role:user.role},
      process.env.JWT_SECRET,
      {expiresIn:'1d'}
    );

    res.json({
      token,
      user:{
        name:user.name,
        email:user.email,
        role:user.role
      }
    });

  }catch(err){
    res.status(500).json({message:'Error interno', error:err.message});
  }
};
