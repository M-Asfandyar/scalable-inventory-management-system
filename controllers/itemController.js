// controllers/itemController.js
const Item = require('../models/item');
const cacheService = require('../services/cacheService');
const sendTaskToQueue = require('../services/taskProducer');
const logger = require('../services/logger');

exports.createItem = async (req, res) => {
  try {
    logger.info(`Request body: ${JSON.stringify(req.body)}`);
    const item = new Item(req.body);
    await item.save();
    logger.info(`Item saved: ${JSON.stringify(item)}`);

    // Enqueue a task to update inventory count asynchronously
    const task = {
      type: 'update_inventory_count',
      itemId: item._id,
    };
    await sendTaskToQueue(task);

    res.status(201).send(item);
  } catch (error) {
    logger.error(`Error saving item: ${error.message}`);
    res.status(400).send({ error: error.message });
  }
};

exports.getItems = async (req, res) => {
  try {
    cacheService.getCache('items', async (err, cachedItems) => {
      if (err) {
        logger.error('Error retrieving items from cache:', err);
        const items = await Item.find();
        res.status(200).send(items);
      } else if (cachedItems) {
        logger.info('Items retrieved from cache:', cachedItems);
        res.status(200).send(JSON.parse(cachedItems));
      } else {
        const items = await Item.find();
        cacheService.setCache('items', JSON.stringify(items), 3600, (cacheErr, reply) => {
          if (cacheErr) {
            logger.error('Error caching items:', cacheErr);
          } else {
            logger.info('Items cached successfully:', reply);
          }
        });
        res.status(200).send(items);
      }
    });
  } catch (error) {
    logger.error(`Error retrieving items: ${error.message}`);
    res.status(500).send(error);
  }
};

exports.getItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      logger.warn(`Item not found: ${req.params.id}`);
      return res.status(404).send();
    }
    res.status(200).send(item);
  } catch (error) {
    logger.error(`Error retrieving item: ${error.message}`);
    res.status(500).send(error);
  }
};

exports.updateItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) {
      logger.warn(`Item not found: ${req.params.id}`);
      return res.status(404).send();
    }
    res.status(200).send(item);
  } catch (error) {
    logger.error(`Error updating item: ${error.message}`);
    res.status(400).send(error);
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);
    if (!item) {
      logger.warn(`Item not found: ${req.params.id}`);
      return res.status(404).send();
    }
    res.status(200).send(item);
  } catch (error) {
    logger.error(`Error deleting item: ${error.message}`);
    res.status(500).send(error);
  }
};
