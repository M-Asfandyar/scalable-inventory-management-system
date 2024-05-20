// services/taskConsumer.js
const amqp = require('amqplib');
const Item = require('../models/item');

async function consumeTasksFromQueue() {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'tasks';

    await channel.assertQueue(queue, { durable: true });

    console.log('Waiting for tasks in the queue...');

    channel.consume(queue, async (msg) => {
      const task = JSON.parse(msg.content.toString());
      console.log('Received task:', task);

      if (task.type === 'update_inventory_count') {
        // Process the task to update inventory count
        const item = await Item.findById(task.itemId);
        if (item) {
          // Perform the inventory count update logic here
          console.log('Updating inventory count for item:', item);
          // Example logic: item.count += 1;
          await item.save();
        }
      }

      channel.ack(msg);
    });
  } catch (error) {
    console.error('Error consuming tasks from queue:', error);
  }
}

module.exports = consumeTasksFromQueue;
