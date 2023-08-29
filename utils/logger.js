const { createLogger } = require('winston');
const fs = require('fs');

const { logger } = require('./../config');

const logDir = logger.dir;

// Create the log directory if it does not exist
if (logDir !== '' && !fs.existsSync(logDir)) {
	fs.mkdirSync(logDir);
}

const loggerWinston = createLogger(logger.config);

module.exports = loggerWinston;
