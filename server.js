const process = require('process');
const fs = require('fs');
const https = require('https');
const express = require('express');
require("./utils/config");
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const promBundle = require("express-prom-bundle");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./utils/swagger');
const logger = require('./services/logger');
const metrics = require('./services/metrics');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Logging middleware
app.use((req, res, next) => {
  logger.info(`${req.method} ${req.url}`);
  next();
});

// Prometheus metrics middleware
const metricsMiddleware = promBundle({ includeMethod: true });
app.use(metricsMiddleware);

// Serve Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Import routes
const itemRoutes = require('./routes/itemRoutes');
const userRoutes = require('./routes/userRoutes');

// Use routes
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);

// Endpoint to get metrics
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.register.contentType);
  res.end(await metrics.register.metrics());
});

// HTTPS server configuration
const sslOptions = {
  key: fs.readFileSync('ssl/server.key'),
  cert: fs.readFileSync('ssl/server.cert')
};

https.createServer(sslOptions, app).listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
