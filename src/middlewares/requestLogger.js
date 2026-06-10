const logger = require('../logger');

function requestLogger(req, res, next) {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;

    const meta = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
    };

    if (res.statusCode >= 500) {
      logger.error('Erro no servidor', meta);
    } else if (res.statusCode >= 400) {
      logger.warn('Erro do cliente', meta);
    } else {
      logger.info('Requisição OK', meta);
    }
  });

  next();
}

module.exports = requestLogger;