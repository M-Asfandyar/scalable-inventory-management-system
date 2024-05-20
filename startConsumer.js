const consumeTasksFromQueue = require('./services/taskConsumer');

consumeTasksFromQueue()
  .then(() => console.log('Task consumer started'))
  .catch(error => console.error('Error starting task consumer:', error));
