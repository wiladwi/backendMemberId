const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'AFTA TRADE CITY',
      description: 'Afta Tradeverse',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Development server',
      },
      {
        url: 'https://aftabackend-dev.iftgroup.id',
        description: 'Development server',
      },
      {
        url: 'https://aftabackend-staging.iftgroup.id',
        description: 'Development server',
      },
    ]
  },
  apis: [
    './app/auditorium/auditorium/router.js',
    './app/banner/router.js',
    './app/brochure/router.js',
    './app/building/router.js',
    './app/catalogue/router.js',
    './app/contact/router.js',
    './app/event/router.js',
    './app/eventpersonals/router.js',
    './app/hall/router.js',
    './app/meetingRoom/meetingRoom/router.js',
  ],
};

const specs = swaggerJsDoc(options);

module.exports = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
};
