const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const productRoutes = require('./routes/product.routes');
const orderRoutes = require('./routes/order.routes');
const { errorHandler } = require('./middlewares/error.middleware');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Middleware de errores al final
app.use(errorHandler);

const PORT = process.env.PORT || 3004;
app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));
