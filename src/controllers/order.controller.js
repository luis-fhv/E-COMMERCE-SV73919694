const Order = require('../models/order.model');
const Product = require('../models/product.model');

exports.createOrder = async (req,res)=>{
  try{
    const { items } = req.body;
    if(!items || !items.length) return res.status(400).json({message:'No hay items'});
    
    let total = 0;
    const orderItems = [];

    for(const i of items){
      const product = await Product.findById(i.product);
      if(!product) return res.status(400).json({message:`Producto ${i.product} no existe`});
      
      const price = product.price;
      total += price * i.qty;

      orderItems.push({
        product: product._id,
        name: product.name,
        size: i.size,
        color: i.color,
        qty: i.qty,
        price
      });
    }

    const order = await Order.create({user:req.user._id,items:orderItems,total});
    res.json(order);
  }catch(err){
    res.status(500).json({message:'Error interno', error:err.message});
  }
};

exports.getHistory = async (req,res)=>{
  try{
    const orders = await Order.find({user:req.user._id}).populate('items.product');
    res.json(orders);
  }catch(err){
    res.status(500).json({message:'Error interno', error:err.message});
  }
};
