const amqp = require('amqplib');

async function sendTaskToQueue(task) {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'tasks';

    await channel.assertQueue(queue, { durable: true });
    await channel.sendToQueue(queue, Buffer.from(JSON.stringify(task)), { persistent: true });

    console.log('Task sent to the queue');
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error sending task to queue:', error);
  }
}

module.exports = sendTaskToQueue;
