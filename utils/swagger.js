const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Scalable Inventory Management System API',
      version: '1.0.0',
      description: 'API documentation for the Scalable Inventory Management System',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js', './models/*.js'], // paths to files with documentation
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;