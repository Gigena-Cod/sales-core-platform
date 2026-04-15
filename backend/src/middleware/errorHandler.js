const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de sintaxis en JSON
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      error: 'Error de sintaxis JSON',
      message: 'El formato del JSON enviado es inválido',
      details: err.message
    });
  }

  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      message: 'Los datos enviados no son válidos',
      details: err.message
    });
  }

  // Error de referencia (ID no encontrado)
  if (err.name === 'ReferenceError' || err.message.includes('no encontrado')) {
    return res.status(404).json({
      error: 'Recurso no encontrado',
      message: err.message
    });
  }

  // Error de integridad de datos
  if (err.message.includes('integridad') || err.message.includes('relacionado')) {
    return res.status(400).json({
      error: 'Error de integridad de datos',
      message: err.message
    });
  }

  // Error por defecto
  res.status(err.status || 500).json({
    error: 'Error interno del servidor',
    message: err.message || 'Ha ocurrido un error inesperado',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

module.exports = errorHandler;
