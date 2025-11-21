const Product = require('../models/product.model');

exports.getAll = async (req,res)=>{
  try{
    const products = await Product.find();
    res.json(products);
  }catch(err){
    res.status(500).json({message:'Error interno', error:err.message});
  }
};

exports.getById = async (req,res)=>{
  try{
    const product = await Product.findById(req.params.id);
    if(!product) return res.status(404).json({message:'Producto no encontrado'});
    res.json(product);
  }catch(err){
    res.status(500).json({message:'Error interno', error:err.message});
  }
};

exports.create = async (req, res) => {
  try {
    const { name, brand, description, price, sizes, colors, images, category } = req.body;
    if (!name || !brand || price === undefined) 
      return res.status(400).json({ message: 'Faltan campos requeridos: name, brand, price' });

    const product = new Product({ name, brand, description, price, sizes, colors, images, category });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error interno', error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    res.json({ message: "Producto eliminado correctamente" });

  } catch (err) {
    res.status(500).json({ message: "Error interno", error: err.message });
  }
};
