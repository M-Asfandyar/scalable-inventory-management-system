// routes/itemRoutes.js
const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');
const validateItem = require('../middlewares/validateItem');
const authenticate = require('../middlewares/authenticate');

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - name
 *         - quantity
 *         - price
 *         - description
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the item
 *         name:
 *           type: string
 *           description: The name of the item
 *         quantity:
 *           type: integer
 *           description: The quantity of the item
 *         price:
 *           type: integer
 *           description: The price of the item
 *         description:
 *           type: integer
 *           description: The description of the item
 * 
 *       example:
 *         id: d5fE_asz
 *         name: Item Name
 *         quantity: 100
 *         price : 200
 *         description : description of item
 */

/**
 * @swagger
 * tags:
 *   name: Items
 *   description: The items managing API
 */

/**
 * @swagger
 * /api/items:
 *   post:
 *     summary: Create a new item
 *     tags: [Items]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       201:
 *         description: The item was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       400:
 *         description: Bad request
 */
router.post('/', authenticate, validateItem, itemController.createItem);

/**
 * @swagger
 * /api/items:
 *   get:
 *     summary: Returns the list of all the items
 *     tags: [Items]
 *     responses:
 *       200:
 *         description: The list of the items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 */
router.get('/', authenticate, itemController.getItems);

/**
 * @swagger
 * /api/items/{id}:
 *   get:
 *     summary: Get the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 */
router.get('/:id', authenticate, itemController.getItem);

/**
 * @swagger
 * /api/items/{id}:
 *   put:
 *     summary: Update the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Item'
 *     responses:
 *       200:
 *         description: The item was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       404:
 *         description: The item was not found
 *       400:
 *         description: Bad request
 */
const process = require('process');
router.put('/:id', authenticate, validateItem, itemController.updateItem);

/**
 * @swagger
 * /api/items/{id}:
 *   delete:
 *     summary: Remove the item by id
 *     tags: [Items]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: The item was not found
 */
router.delete('/:id', authenticate, itemController.deleteItem);

module.exports = router;
