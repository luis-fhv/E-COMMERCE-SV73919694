// Middleware global de errores
function errorHandler(err, req, res, next) {
  console.error(err.stack); // log en consola
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor',
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}

module.exports = { errorHandler };
